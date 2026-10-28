"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { surpriseItems, type SurpriseItem } from "../../app/data/surprise";
import type { ExperimentViewProps } from "./ExperimentPanel";
import styles from "./Experiments.module.css";

const SHUFFLE_TICKS = 7;
const SHUFFLE_MS = 55;

function randomItem(excludeId?: string) {
  const pool = surpriseItems.filter((item) => item.id !== excludeId);
  return pool[Math.floor(Math.random() * pool.length)];
}

export default function SurpriseMe({ onNavigate }: ExperimentViewProps) {
  const [shown, setShown] = useState<SurpriseItem | null>(null);
  const [settled, setSettled] = useState(false);
  const [draws, setDraws] = useState(0);
  const lastIdRef = useRef<string | undefined>(undefined);
  const timerRef = useRef<number | undefined>(undefined);
  const headingRef = useRef<HTMLParagraphElement>(null);

  // Picks the next result (never the one just shown), with a brief shuffle through
  // other titles first so the result lands as a small reveal.
  const draw = useCallback(() => {
    window.clearInterval(timerRef.current);
    const result = randomItem(lastIdRef.current);
    lastIdRef.current = result.id;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let tick = reduced ? SHUFFLE_TICKS : 0;
    const step = () => {
      tick += 1;
      if (tick >= SHUFFLE_TICKS) {
        window.clearInterval(timerRef.current);
        setShown(result);
        setSettled(true);
        setDraws((count) => count + 1);
        return;
      }
      setShown(randomItem(result.id));
    };
    timerRef.current = window.setInterval(step, reduced ? 0 : SHUFFLE_MS);
  }, []);

  useEffect(() => {
    draw();
    return () => window.clearInterval(timerRef.current);
  }, [draw]);

  // Move focus to the first result so it is read out; later draws keep focus on "again".
  useEffect(() => {
    if (draws === 1) headingRef.current?.focus({ preventScroll: true });
  }, [draws]);

  return (
    <div className={styles.reveal} data-settled={settled || undefined}>
      {/* Blue while shuffling; the result's image wipes in once it lands. */}
      <div className={styles.revealMedia}>
        <span className={styles.revealMediaGlyph} aria-hidden="true">◈</span>
        {shown && settled && (
          <Image
            key={shown.id}
            src={shown.image}
            alt=""
            fill
            priority
            sizes="(max-width: 600px) 100vw, 440px"
            className={styles.revealImage}
            style={{ objectPosition: shown.position ?? "center" }}
          />
        )}
      </div>

      <div className={styles.revealContent}>
        <p className={styles.revealLabel}>
          <span aria-hidden="true">◈</span> You got
        </p>

        <div aria-live="polite" aria-atomic="true" aria-busy={!settled}>
          <p ref={headingRef} tabIndex={-1} className={styles.revealTitle}>
            {shown?.title ?? " "}
          </p>
          <div className={styles.revealDetail} hidden={!settled}>
            <p className={styles.revealText}>{shown?.description}</p>
            <p className={styles.revealMeta}>
              {shown?.project} <span aria-hidden="true">&middot;</span> {shown?.discipline}
              <span className={styles.revealKind}>{shown?.kind}</span>
            </p>
          </div>
        </div>

        <div className={styles.revealActions}>
          {shown && settled ? (
            <Link
              key={shown.id}
              href={shown.href}
              className={styles.primaryButton}
              onNavigate={onNavigate}
              {...(shown.external
                ? { target: "_blank", rel: "noopener noreferrer", onClick: onNavigate }
                : {})}
            >
              Take me there
              <span aria-hidden="true">{shown.external ? "↗" : "→"}</span>
              {shown.external && <span className={styles.visuallyHidden}> (opens in a new tab)</span>}
            </Link>
          ) : (
            <span className={styles.primaryButton} data-placeholder aria-hidden="true">
              Take me there <span>&rarr;</span>
            </span>
          )}
          <button
            type="button"
            className={styles.againButton}
            onClick={() => {
              if (!settled) return;
              setSettled(false);
              draw();
            }}
          >
            <span className={styles.againLabel}>Surprise me again</span>
            <span className={styles.againIcon} aria-hidden="true">↻</span>
          </button>
        </div>
      </div>
    </div>
  );
}
