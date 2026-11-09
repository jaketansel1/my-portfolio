"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./ScreenToggle.module.css";

export type ToggleOption = { label: string; src: string; alt: string };

/**
 * Two (or a few) versions of the same screen, switched with a small segmented control and a crossfade:
 * for showing how one screen changes with an answer. Reduced motion: an instant switch.
 */
export default function ScreenToggle({
  options,
  width,
  height,
  label,
  className,
}: {
  options: ToggleOption[];
  width: number;
  height: number;
  /** Names the control for assistive tech, e.g. "Playing level". */
  label: string;
  className?: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <figure className={`${styles.toggle} ${className ?? ""}`}>
      <div className={styles.control} role="group" aria-label={label}>
        {options.map((option, i) => (
          <button key={option.label} type="button" aria-pressed={i === active} onClick={() => setActive(i)}>
            {option.label}
          </button>
        ))}
      </div>
      <div className={styles.stage} style={{ aspectRatio: `${width} / ${height}` }}>
        {options.map((option, i) => (
          <Image
            key={option.src}
            src={option.src}
            alt={i === active ? option.alt : ""}
            aria-hidden={i === active ? undefined : true}
            width={width}
            height={height}
            unoptimized
            data-active={i === active || undefined}
          />
        ))}
      </div>
    </figure>
  );
}
