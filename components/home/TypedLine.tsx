"use client";

import { useEffect, useState } from "react";
import styles from "./HomeStage.module.css";

/**
 * Hero second line: holds the first phrase, deletes it character by character, types the next, and
 * loops. Every phrase is stacked invisibly in the same grid cell, so the line reserves room for the
 * longest one and nothing around it moves. Screen readers get the first phrase only.
 * With reduced motion the first phrase simply stays.
 */
const HOLD = 3000;
const DELETE_MS = 38;
const TYPE_MS = 70;
const START_DELAY = 1100; // let the headline's rise-in finish first

export default function TypedLine({ phrases }: { phrases: string[] }) {
  const [text, setText] = useState(phrases[0]);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (phrases.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer = 0;
    let index = 0;
    let shown = phrases[0];
    const wait = (ms: number, next: () => void) => {
      timer = window.setTimeout(next, ms);
    };

    const remove = () => {
      setBusy(true);
      if (shown.length) {
        shown = [...shown].slice(0, -1).join("");
        setText(shown);
        wait(DELETE_MS, remove);
      } else {
        index = (index + 1) % phrases.length;
        wait(260, type);
      }
    };
    const type = () => {
      const target = [...phrases[index]];
      const count = [...shown].length;
      if (count < target.length) {
        shown = target.slice(0, count + 1).join("");
        setText(shown);
        // Slightly uneven rhythm reads as handwritten rather than mechanical.
        wait(TYPE_MS + (target[count] === " " ? 40 : 0), type);
      } else {
        setBusy(false);
        wait(HOLD, remove);
      }
    };

    wait(START_DELAY + HOLD, remove);
    return () => window.clearTimeout(timer);
  }, [phrases]);

  return (
    <span className={styles.typed}>
      <span className={styles.visuallyHidden}>{phrases[0]}</span>
      {phrases.map((phrase) => (
        <span key={phrase} className={styles.typedGhost} aria-hidden="true">
          {phrase}
        </span>
      ))}
      <span className={styles.typedText} aria-hidden="true">
        {text}
        <span className={styles.caret} data-busy={busy || undefined} />
      </span>
    </span>
  );
}
