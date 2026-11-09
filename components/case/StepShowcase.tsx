"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Browser } from "../ui/Device";
import styles from "./StepShowcase.module.css";

export type ShowcaseStep = { title: string; note: string; src: string; alt: string };

/**
 * A product flow shown in one browser frame: real screens, one per step, moving on by themselves while in view.
 * Each new screen slides in over the last (the way the product itself moves between steps). The active step's
 * progress fill is the clock: when it ends, the next screen comes in. Hovering pauses it; choosing a step jumps
 * there and carries on. Reduced motion: no autoplay or slide, the first screen shown, steps still selectable.
 */
export default function StepShowcase({
  url,
  steps,
  width,
  height,
  stepMs = 3500,
  label,
  compact = false,
  className,
}: {
  url: string;
  steps: ShowcaseStep[];
  width: number;
  height: number;
  stepMs?: number;
  /** Names the step list for assistive tech, e.g. "Checkout steps". */
  label: string;
  /** Step titles only, no notes: for when the page around it already explains the steps. */
  compact?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);
  const [run, setRun] = useState(0);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotion = () => setReduced(motion.matches);
    const onVisibility = () => setHidden(document.hidden);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.4 });
    observer.observe(el);
    motion.addEventListener("change", onMotion);
    document.addEventListener("visibilitychange", onVisibility);
    onMotion();
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", onMotion);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const autoplay = !reduced;
  const holding = hovered || hidden || !inView;

  const choose = (i: number) => {
    setStep(i);
    setRun((r) => r + 1);
  };

  return (
    <figure
      ref={ref}
      className={`${styles.showcase} ${className ?? ""}`}
      data-compact={compact || undefined}
      style={{ "--step-ms": `${stepMs}ms` } as CSSProperties}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setHovered(false)}
    >
      <Browser url={url} scheme="dark">
        <div className={styles.stage} style={{ aspectRatio: `${width} / ${height}` }}>
          {steps.map((s, i) => (
            <Image
              key={s.src}
              src={s.src}
              alt={i === step ? s.alt : ""}
              aria-hidden={i === step ? undefined : true}
              width={width}
              height={height}
              unoptimized
              data-active={i === step || undefined}
              className={styles.screen}
            />
          ))}
        </div>
      </Browser>

      <ol className={styles.steps} aria-label={label} style={{ "--count": steps.length } as CSSProperties}>
        {steps.map((s, i) => (
          <li key={s.title}>
            <button
              type="button"
              aria-pressed={i === step}
              onClick={() => choose(i)}
              onKeyDown={(e) => {
                // Arrow keys move between steps; Tab still moves on through the page.
                const delta = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
                if (!delta) return;
                e.preventDefault();
                const next = (i + delta + steps.length) % steps.length;
                choose(next);
                e.currentTarget.closest("ol")?.querySelectorAll("button")[next]?.focus();
              }}
            >
              <span className={styles.bar} aria-hidden="true">
                {i === step ? (
                  <span
                    key={`${step}-${run}`}
                    className={styles.progress}
                    data-static={reduced || undefined}
                    style={{ animationPlayState: autoplay && holding ? "paused" : "running" }}
                    onAnimationEnd={() => autoplay && setStep((s) => (s + 1) % steps.length)}
                  />
                ) : null}
              </span>
              <span className={styles.head}>
                <span className={styles.index}>{String(i + 1).padStart(2, "0")}</span>
                <strong>{s.title}</strong>
              </span>
              {compact ? null : <span className={styles.note}>{s.note}</span>}
            </button>
          </li>
        ))}
      </ol>
      {/* Small screens: the steps drop their notes, and the active one shows here instead. */}
      {compact ? null : (
        <p className={styles.activeNote} aria-live="polite">
          {steps[step].title}: {steps[step].note}
        </p>
      )}
    </figure>
  );
}
