"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Photo } from "../app/data/about";
import styles from "./HeroShuffle.module.css";

/**
 * One photograph that quietly shuffles. While a mouse hovers it, the photos slide through on their own and
 * a small hint shows in the corner; a click (or tap) moves on to the next one.
 * Each change is a short crossfade with a gentle settle. No arrows or dots, and the frame never
 * changes size.
 */
export default function HeroShuffle({ photos, className }: { photos: Photo[]; className?: string }) {
  const [current, setCurrent] = useState(0);
  const [touched, setTouched] = useState(false);
  const [hovering, setHovering] = useState(false);

  /*
   * A deck of photos still to show. Hover and click both draw from it, so every photo appears once
   * before any repeats. The first pass follows the order in the data; later passes are shuffled, and a
   * new pass never starts with the photo already showing.
   */
  const deck = useRef<number[]>(photos.map((_, i) => i).slice(1));
  const advance = useCallback(() => {
    if (photos.length < 2) return;
    if (!deck.current.length) {
      const rest = photos.map((_, i) => i).filter((i) => i !== current);
      for (let i = rest.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [rest[i], rest[j]] = [rest[j], rest[i]];
      }
      deck.current = rest;
    }
    setCurrent(deck.current.shift()!);
  }, [current, photos]);

  const shuffle = () => {
    advance();
    setTouched(true);
  };

  // Slide through the photos while hovered (mouse only, and not with reduced motion).
  useEffect(() => {
    if (!hovering || photos.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(advance, 1400);
    return () => window.clearTimeout(id);
    // Restarts on every change, so a click never gets an instant follow-up slide.
  }, [hovering, photos.length, advance]);

  return (
    <button
      type="button"
      className={`${styles.frame} ${className ?? ""}`}
      onClick={shuffle}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") setHovering(true);
      }}
      onPointerLeave={() => setHovering(false)}
      aria-label={`Shuffle photos. Showing: ${photos[current]?.alt || `photo ${current + 1}`}`}
    >
      {photos.map((photo, i) => (
        <Image
          key={photo.src}
          src={photo.src}
          alt=""
          fill
          sizes="(min-width: 900px) 50vw, 92vw"
          className={styles.photo}
          data-active={i === current || undefined}
          style={photo.position ? { objectPosition: photo.position } : undefined}
          preload={i === 0}
          loading="eager"
          unoptimized
        />
      ))}
      {photos.length > 1 ? (
        <span className={styles.hint} data-touched={touched || undefined} aria-hidden="true">
          <span className={styles.hintMouse}>Click to shuffle</span>
          <span className={styles.hintTouch}>Tap to shuffle</span>
        </span>
      ) : null}
    </button>
  );
}
