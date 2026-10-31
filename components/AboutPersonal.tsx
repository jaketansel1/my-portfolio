"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { PersonalChapter } from "../app/data/about";
import styles from "../app/about/about.module.css";

type AboutPersonalProps = {
  chapters: PersonalChapter[];
  /** Page heading, shown at the top of the text column beside the photographs. */
  intro?: ReactNode;
};

const pad = (n: number) => String(n).padStart(2, "0");

export default function AboutPersonal({ chapters, intro }: AboutPersonalProps) {
  const [active, setActive] = useState(0);
  const chapterRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    // The last chapter to cross the middle of the viewport drives the image.
    let frame = 0;

    const update = () => {
      frame = 0;
      const line = window.innerHeight / 2;
      let current = 0;
      chapterRefs.current.forEach((el, index) => {
        if (el && el.getBoundingClientRect().top < line) current = index;
      });
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  /** Set by the paging effect on desktop; falls back to a plain smooth scroll elsewhere. */
  const animateTo = useRef<((index: number) => void) | null>(null);

  /*
   * Paged chapters (desktop, motion allowed). One wheel or trackpad gesture or key press moves
   * exactly one chapter as a single eased animation, like the homepage. Chapter 1 is the top of the
   * page; every later chapter rests centred on screen. Past the last chapter the page scrolls normally,
   * and scrolling back up into the chapters picks the paging up again.
   */
  useEffect(() => {
    const PAGED = "(min-width: 901px) and (prefers-reduced-motion: no-preference)";
    const DURATION = 900;
    const paged = () => window.matchMedia(PAGED).matches;
    let animating = false;
    let raf = 0;
    let lastWheel = 0;
    let lastDelta = 0;
    let settleTimer = 0;

    /** Resting scroll position for each chapter. */
    const stops = () =>
      chapterRefs.current.map((el, i) => {
        if (!el || i === 0) return 0;
        const r = el.getBoundingClientRect();
        return Math.round(window.scrollY + r.top + r.height / 2 - window.innerHeight / 2);
      });
    const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
    const jump = (y: number) => window.scrollTo({ top: y, behavior: "instant" as ScrollBehavior });

    const tween = (to: number) => {
      cancelAnimationFrame(raf);
      const from = window.scrollY;
      if (Math.abs(to - from) < 1) return;
      animating = true;
      const t0 = performance.now();
      const duration = Math.min(DURATION + Math.abs(to - from) * 0.15, 1600);
      const tick = (now: number) => {
        const x = Math.min((now - t0) / duration, 1);
        jump(from + (to - from) * ease(x));
        if (x < 1) raf = requestAnimationFrame(tick);
        else animating = false;
      };
      raf = requestAnimationFrame(tick);
    };

    /** Next or previous chapter stop from the current scroll. False when outside the chapters, so native scroll takes over. */
    const page = (dir: 1 | -1) => {
      const s = stops();
      const y = window.scrollY;
      const last = s[s.length - 1];
      if (dir > 0) {
        if (y >= last - 2) return false;
        const next = s.find((v) => v > y + 2);
        if (next === undefined) return false;
        tween(next);
        return true;
      }
      if (y > last + 2 || y <= 2) return false;
      const prev = [...s].reverse().find((v) => v < y - 2);
      if (prev === undefined) return false;
      tween(prev);
      return true;
    };

    animateTo.current = (index: number) => {
      const target = stops()[index];
      if (target === undefined) return;
      if (paged()) tween(target);
      else window.scrollTo({ top: target, behavior: "smooth" });
    };

    const onWheel = (e: WheelEvent) => {
      if (!paged() || e.ctrlKey) return;
      const now = performance.now();
      const delta = Math.abs(e.deltaY);
      // A fresh gesture: a pause since the last event, or a clear acceleration on top of a momentum tail.
      const fresh = now - lastWheel > 160 || (delta > 20 && delta > lastDelta * 1.6);
      lastWheel = now;
      lastDelta = delta;
      const dir = e.deltaY > 0 ? 1 : -1;
      const s = stops();
      const y = window.scrollY;
      const inside = dir > 0 ? y < s[s.length - 1] - 2 : y <= s[s.length - 1] + 2 && y > 2;
      if (!inside && !animating) return;
      if (animating || !fresh || delta < 2) {
        e.preventDefault();
        return;
      }
      if (page(dir)) e.preventDefault();
    };

    const onKey = (e: KeyboardEvent) => {
      if (!paged() || e.altKey || e.ctrlKey || e.metaKey) return;
      const target = e.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable], [role=dialog]")) return;
      if (e.key === " " && target?.closest("a, button")) return;
      const down = e.key === "ArrowDown" || e.key === "PageDown" || (e.key === " " && !e.shiftKey);
      const up = e.key === "ArrowUp" || e.key === "PageUp" || (e.key === " " && e.shiftKey);
      if (!down && !up) return;
      if (animating) {
        e.preventDefault();
        return;
      }
      if (page(down ? 1 : -1)) e.preventDefault();
    };

    /** Stopping between two chapters eases onto the nearer one. */
    const onScroll = () => {
      if (animating || !paged()) return;
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => {
        if (animating) return;
        const s = stops();
        const y = window.scrollY;
        if (y > s[s.length - 1] + 2) return;
        const nearest = s.reduce((a, b) => (Math.abs(b - y) < Math.abs(a - y) ? b : a));
        if (Math.abs(nearest - y) > 2) tween(nearest);
      }, 180);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(settleTimer);
      animateTo.current = null;
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const goTo = (index: number) => {
    if (animateTo.current) {
      animateTo.current(index);
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    chapterRefs.current[index]?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
  };

  return (
    <div className={styles.personalLayout}>
      {/* First in the markup so it leads on mobile; on desktop the grid places it beside the photographs. */}
      {intro ? <div className={styles.personalIntroCol}>{intro}</div> : null}
      <div className={styles.stage}>
        <div className={styles.frame}>
          {chapters.map((chapter, index) => (
            <div
              key={chapter.image}
              className={styles.slide}
              data-state={index < active ? "past" : index === active ? "active" : "next"}
              style={{ zIndex: index }}
            >
              <Image
                src={chapter.image}
                alt={chapter.alt}
                fill
                sizes="(min-width: 900px) 60vw, 100vw"
                className={styles.slideImage}
                style={chapter.position ? { objectPosition: chapter.position } : undefined}
              />
            </div>
          ))}
          <p className={styles.frameCounter} aria-hidden="true">
            <span>{pad(active + 1)}</span> / {pad(chapters.length)}
          </p>
        </div>

        <ol className={styles.stageIndex} aria-label="Chapters">
          {chapters.map((chapter, index) => (
            <li key={chapter.kicker}>
              <button
                type="button"
                onClick={() => goTo(index)}
                aria-current={index === active ? "step" : undefined}
              >
                <span className={styles.thumb} aria-hidden="true">
                  <Image
                    src={chapter.image}
                    alt=""
                    fill
                    sizes="120px"
                    style={{ objectFit: "cover", objectPosition: chapter.position }}
                  />
                </span>
                <span className={styles.thumbLabel}>{chapter.kicker}</span>
              </button>
            </li>
          ))}
        </ol>

        {/* Mobile only: the pinned scene shows the active caption; the chapters below are scroll steps. */}
        <div key={active} className={styles.stageCaption} aria-hidden="true">
          <p className={styles.chapterKicker}>
            {pad(active + 1)} &mdash; {chapters[active].kicker}
          </p>
          <p className={styles.chapterTitle}>{chapters[active].title}</p>
          <p className={styles.chapterText}>{chapters[active].text}</p>
        </div>
      </div>

      <div className={styles.chapters}>
        {chapters.map((chapter, index) => (
          <article
            key={chapter.kicker}
            ref={(el) => {
              chapterRefs.current[index] = el;
            }}
            data-index={index}
            className={styles.chapter}
            data-active={index === active}
          >
            <p className={styles.chapterKicker}>
              {pad(index + 1)} &mdash; {chapter.kicker}
            </p>
            <h3 className={styles.chapterTitle}>{chapter.title}</h3>
            <p className={styles.chapterText}>{chapter.text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
