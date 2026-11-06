"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import styles from "./ProcessFlow.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

/*
 * The process line, drawn in a 1000-wide box whose nodes line up with the grid columns. At rest it is
 * only the line and four nodes. When it scrolls into view a dot travels it, and at each node a tiny
 * mark draws itself and retracts again: a frame (Design), the frame as code-like strokes (Build), a
 * branch that merges back (Ship), a loop round the last node (Learn). `at` is where on the line, 0–1,
 * a node or mark sits; timing is derived from it.
 */
const at = (x: number) => ({ "--at": x / 1000 }) as CSSProperties;
const nodes = [0, 258.5, 517, 775.5];

/**
 * "How I work": Design → Build → Ship → Learn. It plays once, about three seconds, on entering view,
 * then settles. Without JavaScript, or with reduced motion, only the resting line is shown.
 */
export default function ProcessFlow({ stages }: { stages: { title: string; line: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.dataset.ready = "";
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Also settle it if the page loaded already scrolled past.
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
          el.dataset.in = "";
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={styles.flow}>
      <svg className={styles.journey} viewBox="0 68 1000 46" fill="none" aria-hidden="true" focusable="false">
        <path className={styles.track} d="M0 100H1000" />
        <path className={styles.line} pathLength={1} d="M0 100H1000" />

        {/* Design: a small frame forms. */}
        <g className={styles.moment} style={at(nodes[0])}>
          <path pathLength={1} d="M14 92V76H64V92" />
          <path pathLength={1} d="M22 84H44" />
        </g>
        {/* Build: the same strokes, now indented like code. */}
        <g className={styles.moment} style={at(nodes[1])}>
          <path pathLength={1} d="M272 78H300" />
          <path pathLength={1} d="M282 85H318" />
          <path pathLength={1} d="M282 92H304" />
        </g>
        {/* Ship: the line branches and merges back. */}
        <g className={styles.moment} style={at(nodes[2])}>
          <path pathLength={1} d="M527 100C541 100 543 86 557 86H587C601 86 603 100 617 100" />
        </g>
        {/* Learn: a loop round the last node. */}
        <g className={styles.moment} style={at(nodes[3])}>
          <path pathLength={1} d="M775.5 91A9 9 0 1 1 766.5 100" />
        </g>
        <circle className={styles.pulse} cx={nodes[3]} cy="100" r="3" style={at(nodes[3])} />

        {nodes.map((x, i) => (
          <circle key={x} className={`${styles.node} ${styles[`node${i + 1}`]}`} style={at(x)} cx={x} cy="100" r="3" />
        ))}

        {/* The active dot: it travels from Design to Learn and hands over to the last node. */}
        <circle className={styles.lead} cx="0" cy="100" r="3.2" />
      </svg>

      <ol className={styles.stages} aria-label="Design, then build, then ship, then learn">
        {stages.map((stage, i) => (
          <li key={stage.title} className={styles.stage}>
            <span className={styles.index}>{pad(i + 1)}</span>
            <h3 className={styles.title}>{stage.title}</h3>
            <p className={styles.text}>{stage.line}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
