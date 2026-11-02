"use client";

import { smoothTo, type NavChapter } from "./ChapterNav";
import styles from "./Chapters.module.css";

/** Closes a chapter with a quiet link down to the next one, e.g. "Next chapter · 02 Checkout →". */
export default function NextChapter({ chapter }: { chapter: NavChapter }) {
  return (
    <a href={`#${chapter.id}`} className={styles.nextChapter} onClick={(event) => smoothTo(event, chapter.id)}>
      <span className={styles.nextChapterLabel}>Next chapter</span>
      <span className={styles.nextChapterTitle}>
        <span>{chapter.number}</span>
        {chapter.title}
      </span>
      <span className={styles.nextChapterArrow} aria-hidden="true">
        &darr;
      </span>
    </a>
  );
}
