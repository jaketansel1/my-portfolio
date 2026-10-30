import type { CSSProperties, ReactNode } from "react";
import { Placeholder } from "./Case";
import ChapterNav, { type NavChapter } from "./ChapterNav";
import styles from "./Chapters.module.css";

/*
 * Chaptered case-study layout: a sticky section rail beside a single content column, numbered
 * chapters separated by hairlines, and a small set of editorial pieces (hero, facts, points,
 * panels, insight, bridge, chip groups) shared by every case study.
 *
 * Colour still comes from the page's Tone (--bg / --fg / --muted / --rule). Each case study adds
 * an accent, and optionally the panel and fill colours used by diagrams and quiet surfaces.
 */

export type Chapter = NavChapter;

export function ChapterLayout({
  chapters,
  title,
  accent,
  panel,
  fill,
  className,
  children,
}: {
  chapters: Chapter[];
  /** Shown above the rail. */
  title: string;
  accent: string;
  /** Diagram / stage background. Defaults to a step off the page background. */
  panel?: string;
  /** Quiet fill for small surfaces inside panels. */
  fill?: string;
  className?: string;
  children: ReactNode;
}) {
  const vars = {
    "--accent": accent,
    ...(panel ? { "--panel": panel } : {}),
    ...(fill ? { "--fill": fill } : {}),
  } as CSSProperties;
  return (
    <div className={`${styles.layout} ${className ?? ""}`} style={vars}>
      <ChapterNav chapters={chapters} title={title} />
      <div className={styles.content}>{children}</div>
    </div>
  );
}

export type Fact = { label: string; value: ReactNode; live?: boolean };

/** Chapter 01: brand, label, headline, a short two-part intro (the product, then my part), facts, then the hero visual. */
export function ChapterHero({
  chapter,
  brand,
  label,
  title,
  about,
  role,
  facts,
  children,
}: {
  chapter: Chapter;
  /** A logo image, or the brand name set as a small wordmark. */
  brand: ReactNode;
  label: string;
  title: ReactNode;
  /** What the company or product is. */
  about: ReactNode;
  /** What I did. */
  role: ReactNode;
  facts: Fact[];
  children?: ReactNode;
}) {
  return (
    <section id={chapter.id} className={`${styles.chapter} ${styles.overview}`} aria-labelledby={`${chapter.id}-title`}>
      {typeof brand === "string" ? <p className={styles.wordmark}>{brand}</p> : <div className={styles.brand}>{brand}</div>}
      <p className={styles.chapterLabel}>
        <span>{chapter.number}</span>
        {label}
      </p>
      <h1 id={`${chapter.id}-title`} className={styles.heroTitle}>
        {title}
      </h1>
      <div className={styles.heroLede}>
        <p>{about}</p>
        <p>{role}</p>
      </div>
      <dl className={styles.facts} style={{ "--facts": facts.length } as CSSProperties}>
        {facts.map((fact) => (
          <div key={fact.label}>
            <dt>{fact.label}</dt>
            <dd className={fact.live ? styles.live : undefined}>{fact.value}</dd>
          </div>
        ))}
      </dl>
      {children ? <div className={styles.heroFigure}>{children}</div> : null}
    </section>
  );
}

/** One numbered chapter: label, optional lead-in, headline, short intro, then the work. */
export function ChapterSection({
  chapter,
  title,
  lead,
  intro,
  children,
}: {
  chapter: Chapter;
  title: ReactNode;
  lead?: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section id={chapter.id} className={styles.chapter} aria-labelledby={`${chapter.id}-title`}>
      <header className={styles.chapterHead}>
        <p className={styles.chapterLabel}>
          <span>{chapter.number}</span>
          {chapter.title}
        </p>
        {lead}
        <h2 id={`${chapter.id}-title`} className={styles.chapterTitle}>
          {title}
        </h2>
        {intro ? <div className={styles.chapterIntro}>{intro}</div> : null}
      </header>
      {children}
    </section>
  );
}

/** A follow-on visual or block inside a chapter, with the standard gap above it. */
export function Block({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={`${styles.block} ${className ?? ""}`}>{children}</div>;
}

/** Two visuals side by side. */
export function Pair({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={`${styles.pair} ${className ?? ""}`}>{children}</div>;
}

/** A smaller heading inside a chapter, for its second beat. */
export function Subhead({ title, children }: { title: ReactNode; children?: ReactNode }) {
  return (
    <div className={styles.subhead}>
      <h3 className={styles.subheadTitle}>{title}</h3>
      {children ? <div className={styles.chapterIntro}>{children}</div> : null}
    </div>
  );
}

/** Short titled points in a quiet grid: hairline on top, no boxes. */
export function Points({ items, columns = 3 }: { items: { title: string; text: ReactNode }[]; columns?: number }) {
  return (
    <ul className={styles.points} style={{ "--cols": columns } as CSSProperties}>
      {items.map((item) => (
        <li key={item.title}>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </li>
      ))}
    </ul>
  );
}

/** A single highlighted idea: the key insight or a line worth stopping on. */
export function Insight({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <blockquote className={styles.insight}>
      {label ? <p className={styles.insightLabel}>{label}</p> : null}
      <p>{children}</p>
    </blockquote>
  );
}

/** A quiet stage for diagrams and showcases. */
export function Panel({ children, caption, className }: { children: ReactNode; caption?: ReactNode; className?: string }) {
  return (
    <figure className={`${styles.panel} ${className ?? ""}`}>
      {children}
      {caption ? <figcaption className={styles.panelCaption}>{caption}</figcaption> : null}
    </figure>
  );
}

export function PanelLabel({ children }: { children: ReactNode }) {
  return <p className={styles.panelLabel}>{children}</p>;
}

/** Lead-in before a chapter's headline: a muted line, then a big question. */
export function Bridge({ lead, question }: { lead: ReactNode; question: ReactNode }) {
  return (
    <div className={styles.bridge}>
      <p className={styles.bridgeLead}>{lead}</p>
      <p className={styles.bridgeQuestion}>{question}</p>
    </div>
  );
}

/** Two groups of short tags, e.g. what I owned and what the team owned. The second is muted. */
export function ChipGroups({ groups }: { groups: { title: string; items: string[] }[] }) {
  return (
    <div className={styles.split}>
      {groups.map((group, i) => (
        <div key={group.title} data-muted={i > 0 || undefined}>
          <h3>{group.title}</h3>
          <ul className={styles.chips}>
            {group.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/** Two groups of short lines with hairlines between them. */
export function Lists({ groups }: { groups: { title: string; items: string[] }[] }) {
  return (
    <div className={styles.lists}>
      {groups.map((group) => (
        <div key={group.title}>
          <h3>{group.title}</h3>
          <ul>
            {group.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/** Big numbers over short labels. */
export function Numbers({ items }: { items: { value: string; label: string }[] }) {
  return (
    <dl className={styles.numbers} style={{ "--cols": items.length } as CSSProperties}>
      {items.map((item) => (
        <div key={item.label}>
          <dd>{item.value}</dd>
          <dt>{item.label}</dt>
        </div>
      ))}
    </dl>
  );
}

/** A row of phones with optional labels above each. */
export function PhoneRow({ children, columns }: { children: ReactNode; columns: number }) {
  return (
    <div className={styles.phoneRow} style={{ "--cols": columns } as CSSProperties}>
      {children}
    </div>
  );
}

/** A phone-shaped gap for a screen that's still needed, in the same frame as <Phone>. */
export function PhonePlaceholder({ label, note }: { label: string; note?: string }) {
  return (
    <div className={styles.phoneSlot}>
      <Placeholder label={label} note={note} aspect="9 / 19.5" />
    </div>
  );
}
