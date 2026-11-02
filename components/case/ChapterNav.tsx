"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { HIDE_NAV_EVENT } from "../StickyNav";
import styles from "./Chapters.module.css";

/**
 * `sub` nests a chapter under the one before it, e.g. the sections of a single initiative.
 * `status` is a short note shown beside the title, e.g. "Soon".
 */
export type NavChapter = { id: string; number: string; title: string; sub?: boolean; status?: string };

type Group = { chapter: NavChapter; sections: NavChapter[] };

/** Folds the flat chapter list into top-level chapters, each with the sections nested under it. */
function group(chapters: NavChapter[]): Group[] {
  const groups: Group[] = [];
  for (const chapter of chapters) {
    if (chapter.sub && groups.length) groups[groups.length - 1].sections.push(chapter);
    else groups.push({ chapter, sections: [] });
  }
  return groups;
}

/** How long a click-to-jump holds the highlight on its target if the browser never reports the scroll ending. */
const JUMP_MS = 1200;

/**
 * Case-study section index. A quiet sticky rail beside the content on wide screens, a slim
 * scrollable bar on smaller ones. Highlights the section in view and smooth-scrolls on click.
 *
 * Chapters with sections behave as an accordion: only the chapter being read shows its sections,
 * so a long, multi-initiative case study stays compact.
 */
export default function ChapterNav({ chapters, title }: { chapters: NavChapter[]; title?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const listRef = useRef<HTMLOListElement>(null);
  // While a clicked jump is scrolling, hold the highlight on its target so the chapters it
  // passes don't open and close on the way.
  const jumpUntil = useRef(0);

  useEffect(() => {
    const sections = chapters
      .map((chapter) => document.getElementById(chapter.id))
      .filter((el): el is HTMLElement => !!el);
    // The active section is the one whose top has most recently passed the upper third of the screen.
    // At the very bottom the last section wins, even if it's too short to reach that line.
    const update = () => {
      if (performance.now() < jumpUntil.current) return;
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
    const onScrollEnd = () => {
      jumpUntil.current = 0;
      update();
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("scrollend", onScrollEnd);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("scrollend", onScrollEnd);
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

  const jump = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (!smoothTo(event, id)) return;
    // The event's timestamp is on the same clock as performance.now().
    jumpUntil.current = event.timeStamp + JUMP_MS;
    setActive(id);
  };

  const groups = group(chapters);
  const open = groups.find((g) => g.chapter.id === active || g.sections.some((s) => s.id === active))?.chapter.id;

  return (
    <nav className={styles.caseNav} aria-label="Case study sections">
      <div className={styles.caseNavInner}>
        <Link href="/work" className={styles.caseNavBack}>
          <span aria-hidden="true">&larr;</span> Work
        </Link>
        {title ? <p className={styles.caseNavTitle}>{title}</p> : null}
        <ol ref={listRef}>
          {groups.map(({ chapter, sections }) => {
            const isOpen = sections.length > 0 && chapter.id === open;
            return (
              <li key={chapter.id}>
                <a
                  href={`#${chapter.id}`}
                  aria-current={active === chapter.id ? "true" : undefined}
                  data-open={isOpen || undefined}
                  onClick={(event) => jump(event, chapter.id)}
                >
                  <span>{chapter.number}</span>
                  {chapter.title}
                  {chapter.status ? <em>{chapter.status}</em> : null}
                </a>
                {sections.length ? (
                  <div className={styles.caseNavSections} data-open={isOpen || undefined} inert={!isOpen}>
                    <ol>
                      {sections.map((section) => (
                        <li key={section.id}>
                          <a
                            href={`#${section.id}`}
                            aria-current={active === section.id ? "true" : undefined}
                            data-sub=""
                            onClick={(event) => jump(event, section.id)}
                          >
                            <span>{section.number}</span>
                            {section.title}
                          </a>
                        </li>
                      ))}
                    </ol>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}

/**
 * Smooth scroll to a section, respecting reduced motion, and keep the hash in the URL. The global
 * header is tucked away for the jump, so the section lands at the top whichever way it scrolls.
 * Returns false (and leaves the link to the browser) if the section isn't on the page.
 */
export function smoothTo(event: React.MouseEvent<HTMLAnchorElement>, id: string) {
  const target = document.getElementById(id);
  if (!target) return false;
  event.preventDefault();
  window.dispatchEvent(new Event(HIDE_NAV_EVENT));
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
  return true;
}
