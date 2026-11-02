"use client";

import { useEffect, useRef, type CSSProperties } from "react";

/**
 * Poster-first silent loop. Media sources are attached only near the viewport,
 * and playback pauses off screen. Reduced motion keeps the poster only.
 */
export default function ShowcaseVideo({
  src,
  webmSrc,
  poster,
  width = 1920,
  height = 1080,
  sceneControlled = false,
  className,
  style,
}: {
  src: string;
  webmSrc?: string;
  poster: string;
  width?: number;
  height?: number;
  /** The immersive homepage exposes proximity and visibility on the parent scene. */
  sceneControlled?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const immersive = window.matchMedia("(min-width: 900px) and (prefers-reduced-motion: no-preference)");
    const scene = sceneControlled ? video.closest("[data-scene]") : null;
    let loaded = false;
    let hasScrolled = false;
    let near = false;
    let visible = false;

    const update = () => {
      const usesScene = scene && immersive.matches;
      const shouldLoad = usesScene ? scene.hasAttribute("data-video-near") : near;
      const shouldPlay = usesScene ? scene.hasAttribute("data-active") : visible;
      if (reducedMotion.matches || document.hidden) {
        video.pause();
        return;
      }
      // Even above-the-fold videos start with a poster on a fresh page load.
      if (!loaded && hasScrolled && shouldLoad) {
        const sources: [string | undefined, string][] = [[webmSrc, "video/webm"], [src, "video/mp4"]];
        for (const [url, type] of sources) {
          if (!url) continue;
          const source = document.createElement("source");
          source.src = url;
          source.type = type;
          video.append(source);
        }
        loaded = true;
        video.preload = "auto";
        video.load();
      }
      // play() may reject when scrolling interrupts it or autoplay is unavailable.
      if (loaded && shouldPlay) video.play().catch(() => {});
      else video.pause();
    };
    const loadObserver = new IntersectionObserver(([entry]) => {
      near = entry.isIntersecting;
      update();
    }, { rootMargin: "300px 0px" });
    const playObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    const onScroll = () => {
      hasScrolled = true;
      update();
    };
    const sceneObserver = new MutationObserver(update);
    if (scene) sceneObserver.observe(scene, { attributes: true, attributeFilter: ["data-video-near", "data-active"] });
    loadObserver.observe(video);
    playObserver.observe(video);
    reducedMotion.addEventListener("change", update);
    immersive.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      loadObserver.disconnect();
      playObserver.disconnect();
      sceneObserver.disconnect();
      reducedMotion.removeEventListener("change", update);
      immersive.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
      window.removeEventListener("scroll", onScroll);
      video.pause();
      video.replaceChildren();
      video.preload = "none";
      video.load();
    };
  }, [src, webmSrc, sceneControlled]);

  return (
    <video
      ref={ref}
      className={className}
      style={{ ...style, objectFit: "contain", objectPosition: "center" }}
      width={width}
      height={height}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
    />
  );
}
