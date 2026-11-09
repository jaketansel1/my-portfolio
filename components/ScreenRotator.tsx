"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./ScreenRotator.module.css";

type Screen = { src: string; alt: string };

/**
 * Still screenshots stacked in one frame, crossfading on a timer. Advances only while on screen
 * (or, on the immersive homepage, while its scene is active). Reduced motion shows the first only.
 */
export default function ScreenRotator({
  screens,
  interval = 5000,
  width = 2560,
  height = 1440,
  sceneControlled = false,
  fade,
}: {
  screens: Screen[];
  interval?: number;
  width?: number;
  height?: number;
  /** The immersive homepage exposes visibility on the parent scene. */
  sceneControlled?: boolean;
  /** Crossfade length in ms (default 1200, from the stylesheet): shorter for a quick flick through screens. */
  fade?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const immersive = window.matchMedia("(min-width: 900px) and (prefers-reduced-motion: no-preference)");
    const scene = sceneControlled ? el.closest("[data-scene]") : null;
    let visible = false;

    const update = () => {
      const active = scene && immersive.matches ? scene.hasAttribute("data-active") : visible;
      setRunning(active && !reducedMotion.matches && !document.hidden);
      // Leaving the scene rewinds to the first screen, so scrolling back always starts from the top.
      // (Switching tabs only pauses.)
      if (!active || reducedMotion.matches) setIndex(0);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    const sceneObserver = new MutationObserver(update);
    if (scene) sceneObserver.observe(scene, { attributes: true, attributeFilter: ["data-active"] });
    observer.observe(el);
    reducedMotion.addEventListener("change", update);
    immersive.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    update();
    return () => {
      observer.disconnect();
      sceneObserver.disconnect();
      reducedMotion.removeEventListener("change", update);
      immersive.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, [sceneControlled]);

  useEffect(() => {
    if (!running || screens.length < 2) return;
    const imgs = ref.current?.querySelectorAll("img") ?? [];
    // Load and decode every screen up front so none of them stutters or pops in mid-fade.
    imgs.forEach((img) => {
      img.loading = "eager";
      img.decode().catch(() => {});
    });
    const id = window.setInterval(() => {
      // If the next screen still isn't ready, hold the current one for another beat.
      setIndex((i) => {
        const next = (i + 1) % screens.length;
        return imgs[next]?.complete === false ? i : next;
      });
    }, interval);
    return () => window.clearInterval(id);
  }, [running, interval, screens.length]);

  return (
    <div ref={ref} className={styles.rotator} style={fade ? ({ "--fade": `${fade}ms` } as CSSProperties) : undefined}>
      {screens.map((screen, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={screen.src}
          src={screen.src}
          alt={i === index ? screen.alt : ""}
          aria-hidden={i === index ? undefined : true}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          data-active={i === index ? "" : undefined}
        />
      ))}
    </div>
  );
}
