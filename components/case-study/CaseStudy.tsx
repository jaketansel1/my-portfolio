import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import styles from "./CaseStudy.module.css";

/*
 * Case-study building blocks. The portfolio shell stays Jake's; each case study passes a
 * brand palette to <CaseStudy>, which tinted sections (tone="brand" | "deep") pick up.
 */

export type Tone = "paper" | "brand" | "deep";

export type Brand = {
  /** Soft brand colour for tinted sections and placeholders. */
  soft: string;
  /** Deep brand colour for dark sections. */
  deep: string;
  /** Text colour on the soft brand colour. */
  ink: string;
};

export function CaseStudy({ brand, children }: { brand: Brand; children: ReactNode }) {
  const style = { "--brand-soft": brand.soft, "--brand-deep": brand.deep, "--brand-ink": brand.ink } as CSSProperties;
  return (
    <article className={styles.caseStudy} style={style}>
      {children}
    </article>
  );
}

/* Hero */

export type MetaItem = { label: string; value: ReactNode };

export function CaseHero({
  eyebrow,
  title,
  summary,
  meta,
  visual,
}: {
  eyebrow: string;
  title: string;
  summary: ReactNode;
  meta: MetaItem[];
  visual: ReactNode;
}) {
  return (
    <header className={styles.hero}>
      <div className={styles.container}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1 className={styles.heroTitle}>{title}</h1>
        <p className={styles.heroSummary}>{summary}</p>
        <dl className={styles.heroMeta}>
          {meta.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className={`${styles.container} ${styles.heroVisual}`}>{visual}</div>
    </header>
  );
}

/* Chapter index and chapters */

export type ChapterLink = { id: string; number: string; title: string };

export function ChapterIndex({ chapters }: { chapters: ChapterLink[] }) {
  return (
    <nav className={styles.container} aria-label="Chapters">
      <ol className={styles.chapterIndex}>
        {chapters.map((chapter) => (
          <li key={chapter.id}>
            <a href={`#${chapter.id}`}>
              <span>{chapter.number}</span>
              {chapter.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function Chapter({
  id,
  number,
  title,
  intro,
  topics,
  tone = "paper",
  children,
}: {
  id: string;
  number: string;
  title: string;
  intro?: ReactNode;
  /** The sub-sections this chapter covers, shown as a small list in the opener. */
  topics?: string[];
  tone?: Tone;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`${styles.chapter} ${styles.tone}`} data-tone={tone} aria-labelledby={`${id}-title`}>
      <div className={`${styles.container} ${styles.chapterOpener}`}>
        <p className={styles.chapterNumber}>Chapter {number}</p>
        <h2 id={`${id}-title`} className={styles.chapterTitle}>{title}</h2>
        {intro ? <p className={styles.chapterIntro}>{intro}</p> : null}
        {topics?.length ? (
          <ul className={styles.chapterTopics}>
            {topics.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
        ) : null}
      </div>
      <div className={styles.chapterBody}>{children}</div>
    </section>
  );
}

/** Groups blocks inside a chapter on a different tone, e.g. a brand-coloured band. */
export function Band({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <div className={`${styles.band} ${styles.tone}`} data-tone={tone}>
      {children}
    </div>
  );
}

/* Text */

export function TextBlock({
  label,
  title,
  children,
  tight,
}: {
  label: string;
  title?: string;
  children: ReactNode;
  /** Sit closer to the visual that follows. */
  tight?: boolean;
}) {
  return (
    <div className={`${styles.container} ${styles.textBlock}`} data-tight={tight || undefined}>
      <p className={styles.textLabel}>{label}</p>
      <div className={styles.textBody}>
        {title ? <h3 className={styles.textTitle}>{title}</h3> : null}
        {children}
      </div>
    </div>
  );
}

export function Statement({ children, aside }: { children: ReactNode; aside?: ReactNode }) {
  return (
    <div className={`${styles.container} ${styles.statement}`}>
      <p className={styles.statementText}>{children}</p>
      {aside ? <p className={styles.statementAside}>{aside}</p> : null}
    </div>
  );
}

/** Clearly marked gap in the story: copy that Jake still needs to write or supply. */
export function CopyNeeded({ children }: { children: ReactNode }) {
  return (
    <p className={styles.copyNeeded}>
      <span>Copy needed</span>
      {children}
    </p>
  );
}

/* Media */

export type MediaProps = {
  /** What this slot will show — doubles as the placeholder label. */
  label: string;
  /** Extra direction for the final asset. */
  note?: string;
  /** Placeholder or final image. Without it, a labelled placeholder panel renders. */
  src?: string;
  /** Set once `src` is the real project asset; until then the image is tagged as a placeholder. */
  final?: boolean;
  aspect?: string;
  frame?: "plain" | "browser" | "phone";
  caption?: string;
  position?: string;
  sizes?: string;
};

export function Media({
  label,
  note,
  src,
  final = false,
  aspect = "16 / 10",
  frame = "plain",
  caption,
  position,
  sizes = "(min-width: 900px) 60vw, 100vw",
}: MediaProps) {
  const screen = (
    <div className={styles.screen}>
      {src ? (
        <Image src={src} alt="" fill sizes={sizes} className={styles.mediaImage} style={position ? { objectPosition: position } : undefined} />
      ) : (
        <div className={styles.placeholder}>
          <span className={styles.placeholderTag}>Placeholder</span>
          <span className={styles.placeholderLabel}>{label}</span>
          {note ? <span className={styles.placeholderNote}>{note}</span> : null}
        </div>
      )}
      {src && !final ? <span className={styles.imageTag}>Placeholder image · {label}</span> : null}
    </div>
  );

  return (
    <figure className={styles.media} data-frame={frame}>
      <div className={styles.mediaStage} style={{ aspectRatio: aspect }}>
        {frame === "browser" ? (
          <div className={styles.browser}>
            <div className={styles.browserBar} aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            {screen}
          </div>
        ) : frame === "phone" ? (
          <div className={styles.phone}>{screen}</div>
        ) : (
          screen
        )}
      </div>
      {caption ? <figcaption className={styles.caption}>{caption}</figcaption> : null}
    </figure>
  );
}

export function MediaRow({
  layout = "half",
  bleed,
  children,
}: {
  layout?: "full" | "half" | "wide-left" | "wide-right" | "thirds" | "quarters";
  /** Edge-to-edge instead of inside the container. */
  bleed?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={bleed ? styles.bleed : styles.container}>
      <div className={styles.mediaRow} data-layout={layout}>
        {children}
      </div>
    </div>
  );
}

/* Product storytelling */

export type EvolutionStep = { stage: string; title: string; text: ReactNode; media: ReactNode };

/** A left-to-right sequence showing how a feature changed over time. */
export function Evolution({ steps }: { steps: EvolutionStep[] }) {
  return (
    <div className={styles.container}>
      <ol className={styles.evolution}>
        {steps.map((step) => (
          <li key={step.stage}>
            <p className={styles.evolutionStage}>{step.stage}</p>
            {step.media}
            <h3 className={styles.evolutionTitle}>{step.title}</h3>
            <div className={styles.evolutionText}>{step.text}</div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export type Annotation = { title: string; text: ReactNode };

/** A large visual with numbered notes explaining how it works. */
export function Annotated({ media, notes }: { media: ReactNode; notes: Annotation[] }) {
  return (
    <div className={`${styles.container} ${styles.annotated}`}>
      <div className={styles.annotatedMedia}>{media}</div>
      <ol className={styles.annotations}>
        {notes.map((note, index) => (
          <li key={note.title}>
            <span className={styles.annotationNumber}>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h3>{note.title}</h3>
              <div>{note.text}</div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function BeforeAfter({
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
}: {
  before: ReactNode;
  after: ReactNode;
  beforeLabel?: string;
  afterLabel?: string;
}) {
  return (
    <div className={`${styles.container} ${styles.beforeAfter}`}>
      <div>
        <p className={styles.compareLabel}>{beforeLabel}</p>
        {before}
      </div>
      <div>
        <p className={styles.compareLabel}>{afterLabel}</p>
        {after}
      </div>
    </div>
  );
}

export type Stat = { value: string; label: string };

export function Stats({ items, note }: { items: Stat[]; note?: ReactNode }) {
  return (
    <div className={styles.container}>
      <dl className={styles.stats}>
        {items.map((item) => (
          <div key={item.label}>
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>
      {note ? <p className={styles.statsNote}>{note}</p> : null}
    </div>
  );
}

/* Footer */

export function NextProject({ title, href, label = "Next project" }: { title: string; href: string; label?: string }) {
  return (
    <div className={styles.next}>
      <div className={styles.container}>
        <p className={styles.eyebrow}>{label}</p>
        <Link href={href} className={styles.nextLink}>
          <span>{title}</span>
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </div>
  );
}
