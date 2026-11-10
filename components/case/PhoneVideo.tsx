"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./PhoneVideo.module.css";

/**
 * A screen recording in a phone frame, with a small play/pause control beside its caption (kept off the screen, so it
 * never covers the recording). Only the poster loads with the page; the video starts downloading as it approaches the
 * viewport, then plays muted on a loop while on screen, pauses when scrolled away and resumes when scrolled back, unless
 * the visitor paused it. With reduced motion nothing loads or plays until they press play.
 *
 * Sources are tried in order, so put the best first: e.g. the original HEVC recording for the browsers that play it
 * (Safari), then an H.264 copy for the rest.
 */
export default function PhoneVideo({
  sources,
  poster,
  width,
  height,
  label,
  caption,
  className,
}: {
  sources: { src: string; type: string }[];
  poster: string;
  /** The recording's own size: sets the frame's ratio up front, so nothing shifts when it loads. */
  width: number;
  height: number;
  /** What the recording shows, for assistive tech. */
  label: string;
  caption?: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  // The visitor's own choice: null until they press the control, then true (play) or false (pause).
  const choice = useRef<boolean | null>(null);
  const visible = useRef(false);
  const loaded = useRef(false);

  const load = () => {
    const video = ref.current;
    if (!video || loaded.current) return;
    for (const { src, type } of sources) {
      const source = document.createElement("source");
      source.src = src;
      source.type = type;
      video.append(source);
    }
    loaded.current = true;
    video.load();
  };

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      const wantsPlay = choice.current ?? !reducedMotion.matches;
      if (wantsPlay && visible.current && !document.hidden) {
        load();
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    };
    // Start downloading a little before it's on screen, so it's ready to play when it arrives.
    const near = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && (choice.current ?? !reducedMotion.matches)) load();
      },
      { rootMargin: "400px 0px" },
    );
    const onScreen = new IntersectionObserver(
      ([e]) => {
        visible.current = e.isIntersecting;
        sync();
      },
      { threshold: 0.35 },
    );
    near.observe(video);
    onScreen.observe(video);
    document.addEventListener("visibilitychange", sync);
    reducedMotion.addEventListener("change", sync);
    return () => {
      near.disconnect();
      onScreen.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reducedMotion.removeEventListener("change", sync);
    };
    // load reads refs and the sources passed once; the observers are set up once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      choice.current = true;
      load();
      video.play().catch(() => {});
    } else {
      choice.current = false;
      video.pause();
    }
  };

  return (
    <figure className={`${styles.figure} ${className ?? ""}`}>
      <div className={styles.phone}>
        <video
          ref={ref}
          className={styles.video}
          poster={poster}
          width={width}
          height={height}
          style={{ aspectRatio: `${width} / ${height}` }}
          muted
          loop
          playsInline
          preload="none"
          aria-label={label}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
      </div>
      <figcaption className={styles.caption}>
        <button
          type="button"
          className={styles.control}
          onClick={toggle}
          aria-label={playing ? "Pause video" : "Play video"}
        >
          {playing ? (
            <svg
              viewBox="0 0 24 24"
              width="14"
              height="14"
              fill="currentColor"
              aria-hidden="true"
            >
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              width="14"
              height="14"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
            </svg>
          )}
        </button>
        {caption}
      </figcaption>
    </figure>
  );
}
