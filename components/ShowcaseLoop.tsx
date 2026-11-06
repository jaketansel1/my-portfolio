"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./ShowcaseLoop.module.css";

/*
 * A cinematic loop built from real captures: each scene is one screenshot or screen recording, moved with
 * zooms and pans, and each scene dissolves slowly over the one before. Runs on the Web Animations API
 * (transform and opacity only, so the compositor does the work), pauses whenever it's off screen or the tab
 * is hidden, and with reduced motion shows the still poster and never loads the scenes.
 *
 * Coordinates: a view is [x, y, w], the visible window's left and top edges as fractions of the capture's
 * width and height, and its width as a fraction of the capture's width. [0, 0, 1] is the top of the capture
 * at full width; [0.5, 0.3, 0.5] is 2× zoom with the window's corner at the middle, 30% down. A capture wider
 * than the frame's 16:10 needs w below 1 to fill it (16:9 → at most 0.9).
 */

export type View = [x: number, y: number, w: number];

export type ShowcaseScene = {
  /** The screenshot, or for a video scene its poster (shown until the video can play). */
  src: string;
  width: number;
  height: number;
  /** A screen recording to play in this scene, from its start, in real time. Muted, inline. */
  video?: { src: string; webmSrc?: string };
  /** Loop seconds from this scene's start to the next's. The dissolve into the next begins at the end. */
  duration: number;
  /** Camera keyframes: `at` seconds into the scene. Holds the first view before and the last view after. */
  frames: { at: number; view: View }[];
};

/**
 * Dissolve between scenes, in loop seconds: the next scene fades in over the current one, which stays fully
 * visible (and keeps moving) underneath, so the picture never dips or flashes.
 */
const XFADE = 1.3;
/** One easing for every camera move: slow in, long settle. */
const EASE = "cubic-bezier(0.45, 0, 0.15, 1)";
/** The dissolve: gentle at both ends, so neither scene seems to cut. */
const FADE = "cubic-bezier(0.4, 0, 0.2, 1)";

const transformOf = ([x, y, w]: View) => `scale(${1 / w}) translate(${-x * 100}%, ${-y * 100}%)`;

type Kf = Keyframe & { offset: number };

const startsOf = (scenes: ShowcaseScene[]) =>
  scenes.reduce<number[]>((acc, _, k) => [...acc, k ? acc[k - 1] + scenes[k - 1].duration : 0], []);

/**
 * When scene i is on screen, in loop seconds: from the start of its fade-in to the end of the next scene's
 * fade-in over it. The first scene becomes visible under the last as the last fades out, so its window
 * starts XFADE before the loop does.
 */
function windowOf(scenes: ShowcaseScene[], i: number, total: number) {
  const starts = startsOf(scenes);
  const begin = i === 0 ? -XFADE : starts[i];
  const end = (i + 1 < scenes.length ? starts[i + 1] : total) + XFADE;
  return { begin, length: end - begin };
}

/**
 * Camera and opacity keyframes for scene i, across one full loop. Keep each scene's last `at` within its
 * duration + XFADE, so the camera has finished before the scene is covered.
 */
function keyframes(scenes: ShowcaseScene[], i: number, total: number) {
  const starts = startsOf(scenes);
  const start = starts[i];
  const covered = (i + 1 < scenes.length ? starts[i + 1] : total) + XFADE;
  const off = (t: number) => Math.min(1, Math.max(0, t / total));
  const { frames } = scenes[i];
  const first = transformOf(frames[0].view);
  const last = transformOf(frames[frames.length - 1].view);
  const camera = frames.map((f) => ({ offset: off(start + f.at), transform: transformOf(f.view), easing: EASE }));

  let opacity: Kf[];
  let transform: Kf[];
  if (i === 0) {
    // Hidden once the next scene has covered it; back (at its opening view) under the last scene as it fades.
    const gone = off(covered);
    opacity = [
      { offset: 0, opacity: 1 },
      { offset: gone, opacity: 1 },
      { offset: Math.min(1, gone + 0.0001), opacity: 0 },
      { offset: off(total - XFADE - 0.02), opacity: 0 },
      { offset: off(total - XFADE - 0.01), opacity: 1 },
      { offset: 1, opacity: 1 },
    ];
    transform = [
      ...(camera[0].offset > 0 ? [{ offset: 0, transform: first }] : []),
      ...camera,
      { offset: gone, transform: last },
      { offset: Math.min(1, gone + 0.0001), transform: first },
      { offset: 1, transform: first },
    ];
  } else {
    opacity = [
      { offset: 0, opacity: 0 },
      { offset: off(start), opacity: 0, easing: FADE },
      { offset: off(start + XFADE), opacity: 1 },
      ...(i === scenes.length - 1
        ? // The last scene dissolves away at the end of the loop, revealing the first beneath it.
          [
            { offset: off(total - XFADE), opacity: 1, easing: FADE },
            { offset: 1, opacity: 0 },
          ]
        : [
            { offset: off(covered), opacity: 1 },
            { offset: Math.min(1, off(covered) + 0.0001), opacity: 0 },
            { offset: 1, opacity: 0 },
          ]),
    ];
    transform = [{ offset: 0, transform: first }, ...camera, { offset: 1, transform: last }];
  }
  return { opacity, transform };
}

/** Resolves once a scene's media can be shown without a blank frame. */
function ready(el: HTMLImageElement | HTMLVideoElement) {
  if (el instanceof HTMLImageElement) return el.decode().catch(() => {});
  if (el.readyState >= 3) return Promise.resolve();
  return new Promise<void>((resolve) => {
    const done = () => resolve();
    el.addEventListener("canplay", done, { once: true });
    el.addEventListener("error", done, { once: true });
    setTimeout(done, 8000);
  });
}

export default function ShowcaseLoop({
  scenes,
  poster,
  sizes,
  speed = 1,
  className,
}: {
  scenes: ShowcaseScene[];
  /** Shown before the scenes load, and on its own with reduced motion. Fills the frame from the top. */
  poster: { src: string; width: number; height: number };
  sizes: string;
  /** Playback rate for the whole loop: 1.5 runs every move and dissolve half as fast again. */
  speed?: number;
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const layers = useRef<(HTMLDivElement | null)[]>([]);
  // Scenes mount only once the frame is near the viewport and motion is allowed.
  const [load, setLoad] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const near = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setLoad(true);
        near.disconnect();
      }
    }, { rootMargin: "400px 0px" });
    near.observe(el);
    return () => near.disconnect();
  }, []);

  useEffect(() => {
    if (!load) return;
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const total = scenes.reduce((sum, s) => sum + s.duration, 0);
    const videos = scenes.map((_, i) => layers.current[i]?.querySelector("video") ?? null);
    let animations: Animation[] = [];
    let visible = false;
    let playing = false;
    let frame = 0;
    let cancelled = false;

    // Video scenes follow the loop's clock: each plays from its start whenever its scene is on screen.
    const tick = () => {
      const clock = animations[0]?.currentTime;
      if (typeof clock === "number") {
        const t = ((clock / 1000) % total + total) % total;
        videos.forEach((video, i) => {
          if (!video) return;
          const { begin, length } = windowOf(scenes, i, total);
          const into = (((t - begin) % total) + total) % total;
          if (into < length) {
            const target = into / speed;
            if (Math.abs(video.currentTime - target) > 0.35) video.currentTime = target;
            if (video.paused) video.play().catch(() => {});
          } else if (!video.paused || video.currentTime !== 0) {
            video.pause();
            video.currentTime = 0;
          }
        });
      }
      if (playing) frame = requestAnimationFrame(tick);
    };

    const sync = () => {
      const play = !!animations.length && visible && !document.hidden && !reduce.matches;
      for (const a of animations) {
        if (play) a.play();
        else a.pause();
      }
      if (play && !playing) {
        playing = true;
        frame = requestAnimationFrame(tick);
      } else if (!play) {
        playing = false;
        cancelAnimationFrame(frame);
        for (const v of videos) v?.pause();
      }
    };

    // Start only once every scene can be shown, so no dissolve ever reveals a blank frame.
    const media = [...el.querySelectorAll<HTMLImageElement | HTMLVideoElement>("[data-scene] img, [data-scene] video")];
    Promise.all(media.map(ready)).then(() => {
      if (cancelled) return;
      animations = layers.current.flatMap((layer, i) => {
        if (!layer) return [];
        const { opacity, transform } = keyframes(scenes, i, total);
        const timing: KeyframeAnimationOptions = { duration: total * 1000, iterations: Infinity };
        const pair = [layer.animate(opacity, timing), layer.firstElementChild!.animate(transform, timing)];
        for (const a of pair) a.playbackRate = speed;
        return pair;
      });
      setShown(true);
      sync();
    });

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    reduce.addEventListener("change", sync);
    return () => {
      cancelled = true;
      playing = false;
      cancelAnimationFrame(frame);
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reduce.removeEventListener("change", sync);
      for (const a of animations) a.cancel();
      for (const v of videos) v?.pause();
    };
  }, [load, scenes, speed]);

  return (
    <div ref={root} className={`${styles.root} ${className ?? ""}`}>
      <Image src={poster.src} alt="" width={poster.width} height={poster.height} sizes={sizes} unoptimized className={styles.poster} />
      {load ? (
        <div className={styles.scenes} data-ready={shown || undefined} aria-hidden="true">
          {scenes.map((scene, i) => (
            <div
              key={scene.src}
              ref={(node) => {
                layers.current[i] = node;
              }}
              className={styles.layer}
              data-scene=""
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              <div className={styles.camera} style={{ transform: transformOf(scene.frames[0].view) }}>
                {scene.video ? (
                  <video width={scene.width} height={scene.height} poster={scene.src} muted playsInline preload="auto">
                    {scene.video.webmSrc ? <source src={scene.video.webmSrc} type="video/webm" /> : null}
                    <source src={scene.video.src} type="video/mp4" />
                  </video>
                ) : (
                  <Image src={scene.src} alt="" width={scene.width} height={scene.height} unoptimized loading="eager" />
                )}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
