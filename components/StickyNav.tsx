"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./StickyNav.module.css";

/** Ignore scroll movements smaller than this, so the bar doesn't flicker on tiny scrolls. */
const THRESHOLD = 12;
/** How long a programmatic jump (e.g. a case-study section link) keeps the bar out of the way. */
const SUPPRESS_MS = 1200;

/** Dispatch on window to tuck the bar away for an in-page jump, whichever way it scrolls. */
export const HIDE_NAV_EVENT = "site-nav:hide";

/**
 * Keeps the global header within reach on long pages. It sits in the page as normal at the top,
 * then sticks once scrolled, gaining a faint translucent background so content doesn't fight the
 * links. With `hideOnScroll` (case studies) it slides away while reading down and returns on the
 * way back up.
 *
 * The visible height is published as --site-nav-offset on <html>, so other sticky elements (the
 * case-study rail) can sit beneath it without being coupled to it.
 */
export default function StickyNav({
  hideOnScroll = false,
  className,
  children,
}: {
  hideOnScroll?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const bar = ref.current;
    if (!bar) return;
    const root = document.documentElement;
    let lastY = window.scrollY;
    let isHidden = false;
    let suppressUntil = 0;
    let frame = 0;

    const apply = (next: boolean) => {
      isHidden = next;
      setHidden(next);
      root.style.setProperty("--site-nav-offset", next ? "0px" : `${bar.offsetHeight}px`);
    };

    const update = () => {
      frame = 0;
      const y = Math.max(0, window.scrollY);
      setScrolled(y > 4);
      if (!hideOnScroll) return;
      const height = bar.offsetHeight;
      if (y <= height) {
        lastY = y;
        if (isHidden) apply(false);
      } else if (performance.now() < suppressUntil) {
        lastY = y;
        if (!isHidden) apply(true);
      } else if (y - lastY > THRESHOLD) {
        lastY = y;
        if (!isHidden) apply(true);
      } else if (lastY - y > THRESHOLD) {
        lastY = y;
        if (isHidden) apply(false);
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onHide = () => {
      if (hideOnScroll) suppressUntil = performance.now() + SUPPRESS_MS;
    };
    // Tabbing into a hidden bar brings it back.
    const onFocus = () => {
      if (isHidden) apply(false);
    };

    if (hideOnScroll) {
      // Arriving part-way down (an anchor link or a restored scroll) starts with the bar tucked away.
      apply(window.scrollY > bar.offsetHeight);
    } else {
      // Always visible: in-page anchors land clear of it.
      root.style.scrollPaddingTop = `${bar.offsetHeight}px`;
      root.style.setProperty("--site-nav-offset", `${bar.offsetHeight}px`);
    }
    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener(HIDE_NAV_EVENT, onHide);
    bar.addEventListener("focusin", onFocus);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener(HIDE_NAV_EVENT, onHide);
      bar.removeEventListener("focusin", onFocus);
      root.style.removeProperty("--site-nav-offset");
      root.style.removeProperty("scroll-padding-top");
    };
  }, [hideOnScroll]);

  return (
    <div
      ref={ref}
      className={`${styles.bar} ${className ?? ""}`}
      data-scrolled={scrolled || undefined}
      data-hidden={hidden || undefined}
    >
      {children}
    </div>
  );
}
