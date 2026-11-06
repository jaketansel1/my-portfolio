"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Photo } from "../app/data/about";
import styles from "./HeroRotator.module.css";

/** How long each photo stays before the next fades in. */
const HOLD_MS = 3500;
/** If the next photo hasn't loaded when it's due, check again after this long. */
const RETRY_MS = 400;

/**
 * One photograph that quietly changes on its own: every few seconds the next photo crossfades in over
 * the current one, looping back to the first. No controls, no movement, and the frame never changes size.
 *
 * Only the photo after the current one is loaded ahead, and a change waits until it has loaded, so there's
 * never a blank frame. It pauses while the tab is hidden; with reduced motion the first photo simply stays.
 */
export default function HeroRotator({ photos, className }: { photos: Photo[]; className?: string }) {
  const [current, setCurrent] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  // How many photos are mounted: the current one and the next, growing as the rotation reaches them.
  const [mounted, setMounted] = useState(Math.min(2, photos.length));
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (photos.length < 2) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer = 0;
    let index = 0;

    // Read straight from the <img>: the first photos can finish loading before hydration, so a load event could be missed.
    const isReady = (i: number) => {
      const img = frameRef.current?.querySelectorAll("img")[i];
      return !!img && img.complete && img.naturalWidth > 0;
    };
    const advance = () => {
      const next = (index + 1) % photos.length;
      if (!isReady(next)) {
        timer = window.setTimeout(advance, RETRY_MS);
        return;
      }
      setPrevious(index);
      setCurrent(next);
      setMounted((count) => Math.max(count, Math.min(next + 2, photos.length)));
      index = next;
      timer = window.setTimeout(advance, HOLD_MS);
    };
    const start = () => {
      window.clearTimeout(timer);
      if (!motion.matches && !document.hidden) timer = window.setTimeout(advance, HOLD_MS);
    };
    const onMotionChange = () => {
      // Switching reduced motion on mid-rotation settles back on the first photo.
      if (motion.matches) {
        index = 0;
        setPrevious(null);
        setCurrent(0);
      }
      start();
    };

    start();
    document.addEventListener("visibilitychange", start);
    motion.addEventListener("change", onMotionChange);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", start);
      motion.removeEventListener("change", onMotionChange);
    };
  }, [photos.length]);

  return (
    <div ref={frameRef} className={`${styles.frame} ${className ?? ""}`}>
      {photos.slice(0, mounted).map((photo, i) => (
        <Image
          key={photo.src}
          src={photo.src}
          alt={i === current ? photo.alt : ""}
          aria-hidden={i === current ? undefined : true}
          fill
          sizes="(min-width: 900px) 50vw, 92vw"
          className={styles.photo}
          data-active={i === current || undefined}
          data-previous={i === previous || undefined}
          style={photo.position ? { objectPosition: photo.position } : undefined}
          preload={i === 0}
          loading="eager"
          unoptimized
        />
      ))}
    </div>
  );
}
