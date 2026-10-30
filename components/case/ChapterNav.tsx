"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./Chapters.module.css";

export type NavChapter = { id: string; number: string; title: string };

/**
 * Case-study section index. A quiet sticky rail beside the content on wide screens, a slim
 * scrollable bar on smaller ones. Highlights the section in view and smooth-scrolls on click.
 */
export default function ChapterNav({ chapters, title }: { chapters: NavChapter[]; title?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const sections = chapters
      .map((chapter) => document.getElementById(chapter.id))
      .filter((el): el is HTMLElement => !!el);
    // The active section is the one whose top has most recently passed the upper third of the screen.
    // At the very bottom the last section wins, even if it's too short to reach that line.
    const update = () => {
      const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      const line = window.innerHeight * 0.35;
      let current: string | null = null;
      let best = -Infinity;
      for (const section of sections) {
        const top = section.getBoundingClientRect().top;
        if (top <= line && top > best) {
          best = top;
          current = section.id;
        }
      }
      if (atEnd && sections.length && sections[sections.length - 1].getBoundingClientRect().top < window.innerHeight) {
        current = sections[sections.length - 1].id;
      }
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [chapters]);

  // On the horizontal bar, keep the active item in view without moving the page.
  useEffect(() => {
    const list = listRef.current;
    if (!list || list.scrollWidth <= list.clientWidth) return;
    const link = list.querySelector<HTMLElement>("a[aria-current]");
    if (!link) return;
    const left = link.offsetLeft - (list.clientWidth - link.offsetWidth) / 2;
    list.scrollTo({ left, behavior: "smooth" });
  }, [active]);

  return (
    <nav className={styles.caseNav} aria-label="Case study sections">
      <div className={styles.caseNavInner}>
        <Link href="/work" className={styles.caseNavBack}>
          <span aria-hidden="true">&larr;</span> Work
        </Link>
        {title ? <p className={styles.caseNavTitle}>{title}</p> : null}
        <ol ref={listRef}>
          {chapters.map((chapter) => (
            <li key={chapter.id}>
              <a href={`#${chapter.id}`} aria-current={active === chapter.id ? "true" : undefined} onClick={(event) => smoothTo(event, chapter.id)}>
                <span>{chapter.number}</span>
                {chapter.title}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}

/** Smooth scroll to a section, respecting reduced motion, and keep the hash in the URL. */
export function smoothTo(event: React.MouseEvent<HTMLAnchorElement>, id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  event.preventDefault();
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
}
