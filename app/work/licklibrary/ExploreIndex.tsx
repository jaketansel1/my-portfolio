"use client";

import { smoothTo } from "../../../components/case/ChapterNav";
import styles from "./page.module.css";

export type ExploreItem = { id: string; number: string; title: string; line: string; status: string; live?: boolean };

/** The hero's "Explore the work" index: four chapters, each a smooth-scroll link. */
export default function ExploreIndex({ items }: { items: ExploreItem[] }) {
  return (
    <ol className={styles.explore}>
      {items.map((item) => (
        <li key={item.id}>
          <a href={`#${item.id}`} onClick={(event) => smoothTo(event, item.id)}>
            <span className={styles.exploreNumber}>{item.number}</span>
            <span className={styles.exploreTitle}>{item.title}</span>
            <span className={styles.exploreLine}>{item.line}</span>
            <span className={styles.exploreStatus} data-live={item.live || undefined}>
              {item.status}
            </span>
            <span className={styles.exploreArrow} aria-hidden="true">
              &darr;
            </span>
          </a>
        </li>
      ))}
    </ol>
  );
}
