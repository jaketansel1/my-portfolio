"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./ScrollShot.module.css";

export type ScrollShotMarker = { label: string; x: number; y: number };

/**
 * A long full-page screenshot in a fixed frame that the visitor scrolls themselves (wheel, trackpad, touch, keyboard or
 * the thin scrollbar). Nothing moves on its own. A "Scroll to explore" cue and a soft fade at the bottom say there's
 * more; the cue fades once they scroll, returns at the top, and comes back at the bottom with its arrow pointing up; the
 * fade goes at the bottom. Markers sit in the
 * scrolled content (x/y in percent of the full image), so they travel with what they point at. There's no scroll
 * locking: at either end, the page carries on scrolling as normal.
 */
export default function ScrollShot({
  src,
  width,
  height,
  alt,
  aspect,
  markers = [],
  cue = "Scroll to explore",
  stickyTop,
  frameClassName,
  markerClassName,
}: {
  /** The page's own header, cut from the same capture: pinned at the top of the frame while the page scrolls under it. */
  stickyTop?: { src: string; width: number; height: number };
  src: string;
  width: number;
  height: number;
  alt: string;
  /** The frame's ratio, e.g. "17 / 10": the opening view onto the page. */
  aspect: string;
  markers?: ScrollShotMarker[];
  cue?: string;
  frameClassName?: string;
  markerClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [atTop, setAtTop] = useState(true);
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      setAtTop(el.scrollTop < 8);
      setAtBottom(el.scrollTop >= el.scrollHeight - el.clientHeight - 8);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className={`${styles.frame} ${frameClassName ?? ""}`} style={{ aspectRatio: aspect }}>
      <div ref={ref} className={styles.scroller} tabIndex={0} role="region" aria-label={`${alt} Scrollable.`}>
        {stickyTop ? (
          <div className={styles.sticky} aria-hidden="true">
            <Image src={stickyTop.src} alt="" width={stickyTop.width} height={stickyTop.height} unoptimized />
          </div>
        ) : null}
        <div className={styles.page}>
          <Image src={src} alt={alt} width={width} height={height} unoptimized />
          {markers.map((m) => (
            <span key={m.label} className={markerClassName} style={{ left: `${m.x}%`, top: `${m.y}%` }} aria-hidden="true">
              {m.label}
            </span>
          ))}
        </div>
      </div>
      {/* Overlays: fixed to the frame, never in the way of scrolling. */}
      <span className={styles.fade} data-hidden={atBottom || undefined} aria-hidden="true" />
      {/* At the top it points down; at the bottom the same cue returns pointing back up. */}
      <span className={styles.cue} data-hidden={(!atTop && !atBottom) || undefined} data-up={(atBottom && !atTop) || undefined} aria-hidden="true">
        {cue}
        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M6 13l6 6 6-6" />
        </svg>
      </span>
    </div>
  );
}
