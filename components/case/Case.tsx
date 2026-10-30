import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import SiteHeader from "../SiteHeader";
import ShowcaseVideo from "../ShowcaseVideo";
import home from "../../app/home.module.css";
import styles from "./Case.module.css";

/*
 * Case-study design system. One set of primitives (type, spacing, frames, captions, metrics,
 * next-project) shared by every case study; each page composes them into its own art direction
 * and adds project-specific layout in its own CSS module.
 *
 * Colour comes from a Tone: every <Section> sets --bg / --fg / --muted / --rule, and everything
 * inside reads those, so a section can be night-black, cream or blush without new components.
 */

export type Tone = {
  bg: string;
  fg: string;
  /** Secondary text. Defaults to fg at 66%. */
  muted?: string;
  /** Hairlines. Defaults to fg at 14%. */
  rule?: string;
};

const toneStyle = (tone: Tone): CSSProperties =>
  ({
    "--bg": tone.bg,
    "--fg": tone.fg,
    "--muted": tone.muted ?? `color-mix(in srgb, ${tone.fg} 66%, transparent)`,
    "--rule": tone.rule ?? `color-mix(in srgb, ${tone.fg} 14%, transparent)`,
  }) as CSSProperties;

/* Page */

export function CasePage({
  tone,
  maxWidth,
  className,
  children,
}: {
  tone: Tone;
  /**
   * Width of the main content container (e.g. "1240px"). Defaults to the homepage width.
   * Wrap width="breakout" ignores it, for the visual moments that should go wider.
   */
  maxWidth?: string;
  className?: string;
  children: ReactNode;
}) {
  // The editorial header reads --home-ink / --home-muted, so it follows the opening tone.
  const header = {
    ...toneStyle(tone),
    "--home-ink": tone.fg,
    "--home-muted": tone.muted ?? `color-mix(in srgb, ${tone.fg} 62%, transparent)`,
    ...(maxWidth ? { "--case-max": maxWidth } : {}),
  } as CSSProperties;
  return (
    <div className={`${home.home} ${styles.page} ${className ?? ""}`} style={header} data-contained={maxWidth ? "" : undefined}>
      <div className={styles.headerBand}>
        <div className={home.container}>
          <SiteHeader editorial current="work" />
        </div>
      </div>
      <main id="main-content">
        <article>{children}</article>
      </main>
    </div>
  );
}

/* Layout */

export function Section({
  tone,
  id,
  className,
  space = "regular",
  children,
  style,
}: {
  tone: Tone;
  id?: string;
  className?: string;
  /** Vertical padding: none for full-bleed media, tight / regular / loose otherwise. */
  space?: "none" | "tight" | "regular" | "loose";
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <section
      id={id}
      className={`${styles.section} ${className ?? ""}`}
      data-space={space}
      style={{ ...toneStyle(tone), ...style }}
    >
      {children}
    </section>
  );
}

/**
 * Content container with the homepage gutters. "full" is the page's main container (CasePage maxWidth),
 * "breakout" goes wider for key visuals, "wide" and "text" narrow it for reading.
 */
export function Wrap({
  width = "full",
  className,
  children,
}: {
  width?: "full" | "breakout" | "wide" | "text";
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`${styles.wrap} ${className ?? ""}`} data-width={width}>
      {children}
    </div>
  );
}

/* Type */

export function Label({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={`${styles.label} ${className ?? ""}`}>{children}</p>;
}

export function Heading({
  children,
  size = "l",
  as: Tag = "h2",
  className,
}: {
  children: ReactNode;
  size?: "xl" | "l" | "m" | "s";
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <Tag className={`${styles.heading} ${className ?? ""}`} data-size={size}>
      {children}
    </Tag>
  );
}

export function Prose({ children, size = "m", className }: { children: ReactNode; size?: "l" | "m"; className?: string }) {
  return (
    <div className={`${styles.prose} ${className ?? ""}`} data-size={size}>
      {children}
    </div>
  );
}

/* Opening */

export type MetaItem = { label: string; value: ReactNode };

export function ProjectIntro({
  number,
  category,
  title,
  lede,
  meta,
}: {
  number: string;
  category: string;
  title: string;
  lede: ReactNode;
  /** Omit to place <Meta> elsewhere, e.g. under the hero visual. */
  meta?: MetaItem[];
}) {
  return (
    <Wrap className={styles.intro}>
      <p className={styles.introKicker}>
        <span>{number}</span>
        <span>{category}</span>
      </p>
      <Heading as="h1" size="xl" className={styles.introTitle}>
        {title}
      </Heading>
      <div className={styles.introRow}>
        <p className={styles.introLede}>{lede}</p>
        {meta?.length ? <Meta items={meta} /> : null}
      </div>
    </Wrap>
  );
}

export function Meta({ items, className }: { items: MetaItem[]; className?: string }) {
  return (
    <dl className={`${styles.meta} ${className ?? ""}`}>
      {items.map((item) => (
        <div key={item.label}>
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/* Media */

type Shot = { src: string; width: number; height: number; alt: string };

/** A screenshot or photo at its own proportions, or cropped to `aspect` (anchored by `position`). */
export function Img({
  src,
  width,
  height,
  alt,
  aspect,
  position,
  className,
  priority,
}: Shot & { aspect?: string; position?: string; className?: string; priority?: boolean }) {
  return (
    <span className={`${styles.img} ${className ?? ""}`} style={aspect ? { aspectRatio: aspect } : undefined} data-crop={aspect ? "" : undefined}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        unoptimized
        preload={priority}
        style={position ? { objectPosition: position } : undefined}
      />
    </span>
  );
}

/** Minimal floating browser: slim chrome, screenshot or looping recording flush beneath. */
export function Browser({
  url,
  shot,
  video,
  scheme = "dark",
  aspect,
  position = "top",
  className,
  priority,
}: {
  url: string;
  shot?: Shot;
  video?: { src: string; poster: string; width: number; height: number };
  scheme?: "dark" | "light";
  /** Crop the screen to this ratio instead of showing the whole screenshot. */
  aspect?: string;
  position?: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`${styles.browser} ${className ?? ""}`} data-scheme={scheme}>
      <div className={styles.browserBar} aria-hidden="true">
        <span className={styles.browserDots}>
          <span />
          <span />
          <span />
        </span>
        <span className={styles.browserUrl}>{url}</span>
      </div>
      {video ? (
        <div className={styles.browserVideo} style={{ aspectRatio: aspect ?? `${video.width} / ${video.height}` }}>
          <ShowcaseVideo src={video.src} poster={video.poster} />
        </div>
      ) : shot ? (
        <Img {...shot} aspect={aspect} position={position} priority={priority} />
      ) : null}
    </div>
  );
}

/** Minimal phone: thin dark frame; the screenshot carries its own status bar. */
export function Phone({
  shot,
  className,
  aspect = "9 / 19.5",
  position = "top",
}: {
  shot?: Shot;
  className?: string;
  aspect?: string;
  position?: string;
}) {
  return (
    <div className={`${styles.phone} ${className ?? ""}`}>
      {shot ? <Img {...shot} aspect={aspect} position={position} /> : <span className={styles.phoneEmpty} style={{ aspectRatio: aspect }} />}
    </div>
  );
}

/** Clearly marked gap for a real asset that's still needed. */
export function Placeholder({ label, note, aspect = "16 / 10", className }: { label: string; note?: string; aspect?: string; className?: string }) {
  return (
    <div className={`${styles.placeholder} ${className ?? ""}`} style={{ aspectRatio: aspect }}>
      <span className={styles.placeholderTag}>Asset needed</span>
      <span className={styles.placeholderLabel}>{label}</span>
      {note ? <span className={styles.placeholderNote}>{note}</span> : null}
    </div>
  );
}

export function Figure({ children, caption, className }: { children: ReactNode; caption?: ReactNode; className?: string }) {
  return (
    <figure className={`${styles.figure} ${className ?? ""}`}>
      {children}
      {caption ? <figcaption className={styles.caption}>{caption}</figcaption> : null}
    </figure>
  );
}

/* Story */

/** A decision or feature: short text column beside its visual. */
export function Story({
  label,
  title,
  children,
  media,
  flip,
  align = "center",
  className,
}: {
  label?: string;
  title: ReactNode;
  children: ReactNode;
  media: ReactNode;
  flip?: boolean;
  align?: "start" | "center" | "end";
  className?: string;
}) {
  return (
    <Wrap className={`${styles.story} ${className ?? ""}`}>
      <div className={styles.storyGrid} data-flip={flip || undefined} data-align={align}>
        <div className={styles.storyText}>
          {label ? <Label>{label}</Label> : null}
          <Heading size="m">{title}</Heading>
          <Prose>{children}</Prose>
        </div>
        <div className={styles.storyMedia}>{media}</div>
      </div>
    </Wrap>
  );
}

/** Big statement line, with an optional supporting paragraph. */
export function Statement({ children, aside, className }: { children: ReactNode; aside?: ReactNode; className?: string }) {
  return (
    <Wrap className={`${styles.statement} ${className ?? ""}`}>
      <p className={styles.statementText}>{children}</p>
      {aside ? <div className={styles.statementAside}>{aside}</div> : null}
    </Wrap>
  );
}

export type Metric = { value: string; label: string };

export function Metrics({ items, note, className }: { items: Metric[]; note?: ReactNode; className?: string }) {
  return (
    <Wrap className={className}>
      <dl className={styles.metrics}>
        {items.map((item) => (
          <div key={item.label}>
            <dd>{item.value}</dd>
            <dt>{item.label}</dt>
          </div>
        ))}
      </dl>
      {note ? <p className={styles.metricsNote}>{note}</p> : null}
    </Wrap>
  );
}

/** A short list of things that were actually done, as a quiet two-column index. */
export function Ledger({ items, className }: { items: { title: string; text: ReactNode }[]; className?: string }) {
  return (
    <ul className={`${styles.ledger} ${className ?? ""}`}>
      {items.map((item) => (
        <li key={item.title}>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </li>
      ))}
    </ul>
  );
}

/* Ending */

/** Full-width transition into the next project, painted in that project's colours. */
export function NextProject({
  number,
  title,
  href,
  line,
  tone,
  media,
  label = "Next project",
}: {
  number?: string;
  title: string;
  href: string;
  line?: string;
  tone: Tone;
  media?: ReactNode;
  label?: string;
}) {
  return (
    <section className={styles.next} style={toneStyle(tone)}>
      <Link href={href} className={styles.nextLink}>
        <Wrap className={styles.nextInner}>
          <p className={styles.introKicker}>
            {number ? <span>{number}</span> : null}
            <span>{label}</span>
          </p>
          <p className={styles.nextTitle}>
            {title}
            <span className={styles.nextArrow} aria-hidden="true">
              &rarr;
            </span>
          </p>
          {line ? <p className={styles.nextLine}>{line}</p> : null}
        </Wrap>
        {media ? <div className={styles.nextMedia}>{media}</div> : null}
      </Link>
    </section>
  );
}
