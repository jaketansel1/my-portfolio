"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./Walkthrough.module.css";

/** A highlighted area, in percent of the image: [left, top, width, height]. */
export type Box = [number, number, number, number];
export type WalkthroughStep = { title: string; note: string; box: Box };

const INTRO_MS = 1000;
const STEP_MS = 2500;

/**
 * One screenshot with a highlight that steps through areas of it, dimming the rest. Autoplays once on
 * screen (the full screenshot once, then each step), loops from the last step straight back to the first,
 * and keeps going on hover. Choosing a step jumps there and carries on from it; keyboard focus on the steps holds it.
 * Reduced motion: no autoplay, the first step shown, steps still selectable.
 */
export default function Walkthrough({
  src,
  width,
  height,
  alt,
  steps,
  className,
}: {
  /** Optional: position or widen the walkthrough in context. */
  className?: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  steps: WalkthroughStep[];
}) {
  const ref = useRef<HTMLElement>(null);
  // -1: the whole screenshot, nothing highlighted.
  const [step, setStep] = useState(-1);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [hidden, setHidden] = useState(false);
  // Keyboard focus inside the steps holds the autoplay, so it never moves on under someone reading a step.
  const [focused, setFocused] = useState(false);
  // Bumped on every choice (and every restart), so a step's fill restarts from the top even if it was already active.
  const [run, setRun] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotion = () => {
      setReduced(motion.matches);
      if (motion.matches) setStep((s) => (s < 0 ? 0 : s));
    };
    const onVisibility = () => setHidden(document.hidden);
    // Leaving the screen rewinds it: coming back always starts again from the plain screenshot (or step one, with reduced
    // motion), never mid-way.
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (!entry.isIntersecting) {
          setStep(motion.matches ? 0 : -1);
          setRun((r) => r + 1);
        }
      },
      { threshold: 0.35 },
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

  // Autoplay always runs (unless reduced motion); hovering or picking a step doesn't stop it. It holds in a hidden tab,
  // and starts again from the beginning after being scrolled away (see the observer above).
  const autoplay = !reduced;
  const holding = hidden || !inView || focused;

  // The plain screenshot shows once, before the first step. From then on the active step's progress fill is the
  // clock: when it finishes, the next step starts (see onAnimationEnd), so the two can never drift apart.
  useEffect(() => {
    if (!autoplay || holding || step >= 0) return;
    const id = window.setTimeout(() => setStep(0), INTRO_MS);
    return () => window.clearTimeout(id);
  }, [autoplay, holding, step]);

  // Before the first step, the highlight waits (invisible) on step one, so it fades in rather than flying in.
  const [l, t, w, h] = steps[Math.max(step, 0)].box;
  const box = { "--l": `${l}%`, "--t": `${t}%`, "--w": `${w}%`, "--h": `${h}%` } as CSSProperties;
  const active = step >= 0 ? steps[step] : null;

  // Choosing a step jumps there and restarts its fill from the top; autoplay carries on from that step.
  const choose = (i: number) => {
    setStep(i);
    setRun((r) => r + 1);
  };

  return (
    <figure
      ref={ref}
      className={`${styles.walk} ${className ?? ""}`}
      style={{ "--step-ms": `${STEP_MS}ms` } as CSSProperties}
    >
      {/* Wide: steps in a column on the left, screenshot on the right. Narrow: steps in a row beneath. */}
      <div className={styles.inner}>
        <div className={styles.stage} style={{ aspectRatio: `${width} / ${height}` }}>
          <Image src={src} alt={alt} width={width} height={height} unoptimized />
          <span className={styles.highlight} style={box} data-on={step >= 0 || undefined} aria-hidden="true" />
        </div>
        <div
          className={styles.controls}
          onFocus={(e) => setFocused(e.target.matches(":focus-visible"))}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
          }}
        >
          <ol className={styles.steps} aria-label="Walkthrough steps">
            {steps.map((s, i) => (
              <li key={s.title}>
                <button
                  type="button"
                  aria-pressed={i === step}
                  onClick={() => choose(i)}
                  onKeyDown={(e) => {
                    // Arrow keys move between steps (and select them); Tab still moves on through the page.
                    const delta = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
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
                        // Reduced motion: no fill animation, the active step's track is simply full.
                        data-static={reduced || undefined}
                        style={{ animationPlayState: autoplay && holding ? "paused" : "running" }}
                        // Item glides straight back to Menu, forever.
                        onAnimationEnd={() => autoplay && setStep((s) => (s + 1) % steps.length)}
                      />
                    ) : null}
                  </span>
                  <span className={styles.index}>{String(i + 1).padStart(2, "0")}</span>
                  <strong>{s.title}</strong>
                  <span className={styles.note}>{s.note}</span>
                </button>
              </li>
            ))}
          </ol>
          {/* Small screens: the columns drop their notes, and the active one shows here instead. */}
          {/* Announced only once someone has chosen a step, not on every autoplay tick. */}
          <p className={styles.activeNote} aria-live={run > 0 ? "polite" : "off"}>
            {active ? `${active.title}: ${active.note}` : " "}
          </p>
        </div>
      </div>
    </figure>
  );
}
