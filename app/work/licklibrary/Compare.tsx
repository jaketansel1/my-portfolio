"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./page.module.css";

type Side = { src: string; alt: string; width: number; height: number; label: string };

/** Before/after slider: drag (or use the range input) to wipe between the two screens. */
export default function Compare({ before, after, aspect = "16 / 10" }: { before: Side; after: Side; aspect?: string }) {
  const [split, setSplit] = useState(55);
  return (
    <div className={styles.compare} style={{ aspectRatio: aspect }}>
      <Image src={after.src} alt={after.alt} width={after.width} height={after.height} unoptimized className={styles.compareImg} />
      <div className={styles.compareBefore} style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}>
        <Image src={before.src} alt={before.alt} width={before.width} height={before.height} unoptimized className={styles.compareImg} />
      </div>
      <span className={styles.compareLabel} data-side="before">{before.label}</span>
      <span className={styles.compareLabel} data-side="after">{after.label}</span>
      <span className={styles.compareHandle} style={{ left: `${split}%` }} aria-hidden="true" />
      <input
        type="range"
        min={0}
        max={100}
        value={split}
        onChange={(event) => setSplit(Number(event.target.value))}
        aria-label={`Compare ${before.label.toLowerCase()} and ${after.label.toLowerCase()}`}
        className={styles.compareRange}
      />
    </div>
  );
}
