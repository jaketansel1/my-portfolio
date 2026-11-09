"use client";

import Image from "next/image";
import { useEffect, useImperativeHandle, useRef, useState, type CSSProperties, type RefObject } from "react";
import { Browser } from "../ui/Device";
import styles from "./StepShowcase.module.css";

export type ShowcaseStep = { title: string; note: string; src: string; alt: string };

const RESUME_AFTER_MS = 6000;

/**
 * A product flow shown in one browser frame: real screens, one per step, moving on by themselves while in view.
 * Each new screen slides in over the last (the way the product itself moves between steps). The active step's
 * progress fill is the clock: when it ends, the next screen comes in. Hovering does not pause it. Clicking a step shows
 * it and holds, then autoplay resumes a few seconds later; keyboard focus on the steps holds it too.
 * Reduced motion: no autoplay or fade, the first screen shown, steps still selectable.
 */
export default function StepShowcase({
  url,
  steps,
  width,
  height,
  stepMs = 3500,
  label,
  compact = false,
  onStepChange,
  controlRef,
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
  /** Told whenever the showing step changes, so something beside the showcase can follow it. */
  onStepChange?: (step: number) => void;
  /** Lets something beside the showcase choose a step, exactly as clicking its own labels does (it then holds). */
  controlRef?: RefObject<{ choose: (step: number) => void } | null>;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);
  const [run, setRun] = useState(0);
  const [inView, setInView] = useState(false);
  // Keyboard focus on the steps holds it. A mouse click focuses a button too, but that counts as a choice (below).
  const [focused, setFocused] = useState(false);
  // A chosen step holds until the visitor has left it alone for a while.
  const [chosen, setChosen] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotion = () => setReduced(motion.matches);
    const onVisibility = () => setHidden(document.hidden);
    // Leaving the screen rewinds it: coming back always starts again from the first step, with any choice forgotten.
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (!entry.isIntersecting) {
          setStep(0);
          setRun((r) => r + 1);
          setChosen(false);
        }
      },
      { threshold: 0.4 },
    );
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

  // Once the pointer and focus have both left, a chosen step hands back to autoplay after a short wait.
  useEffect(() => {
    if (!chosen || focused) return;
    const id = window.setTimeout(() => setChosen(false), RESUME_AFTER_MS);
    return () => window.clearTimeout(id);
  }, [chosen, focused]);

  const autoplay = !reduced;
  // Hovering does not pause it; clicking a step does, and so does keyboard focus.
  const holding = focused || chosen || hidden || !inView;

  // Choosing a step shows it and holds there; its progress restarts from empty for when autoplay resumes.
  const choose = (i: number) => {
    setStep(i);
    setRun((r) => r + 1);
    setChosen(true);
  };

  // Outside control and outside following share this one state: there is only ever one step.
  useImperativeHandle(controlRef, () => ({ choose }));
  useEffect(() => {
    onStepChange?.(step);
  }, [step, onStepChange]);

  return (
    <figure
      ref={ref}
      className={`${styles.showcase} ${className ?? ""}`}
      data-compact={compact || undefined}
      style={{ "--step-ms": `${stepMs}ms` } as CSSProperties}
      onFocus={(e) => (e.target as HTMLElement).matches(":focus-visible") && setFocused(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node | null) && setFocused(false)}
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
