import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import type { DeviceScreen, Project, ShowcaseArtwork, ShowcaseScene } from "../app/data/projects";
import ShowcaseVideo from "./ShowcaseVideo";
import styles from "./ProjectShowcase.module.css";

type ProjectShowcaseProps = {
  project: Project;
  index: number;
  /** Preload the first card's visual. */
  priority?: boolean;
  /** Title level, so cards nest correctly under a section heading. */
  headingLevel?: "h2" | "h3";
  /** Desktop full-screen showcase position: the first grows in, the last shrinks out. */
  immersive?: "first" | "middle" | "last";
};

const pad = (n: number) => String(n).padStart(2, "0");

/** Backdrop → subject (with grounding shadow) → browser → optional phone, positioned in ProjectShowcase.module.css. */
function Scene({ scene, priority }: { scene: ShowcaseScene; priority: boolean }) {
  const { subject, browser, mobile } = scene;
  return (
    <>
      <div className={styles.sceneSubject} style={{ aspectRatio: `${subject.width} / ${subject.height}` }}>
        <Image src={subject.src} alt="" fill sizes="(min-width: 900px) 34vw, 50vw" className={styles.sceneContain} preload={priority} />
      </div>
      <div className={styles.browser}>
        <div className={styles.browserBar}>
          <span className={styles.browserDots}>
            <span />
            <span />
            <span />
          </span>
          <span className={styles.browserNav}>
            <svg viewBox="0 0 16 16"><path d="M10 3.5 5.5 8l4.5 4.5" /></svg>
            <svg viewBox="0 0 16 16"><path d="M6 3.5 10.5 8 6 12.5" /></svg>
          </span>
          <span className={styles.browserUrl}>{browser.url}</span>
        </div>
        <div className={styles.browserScreen}>
          {browser.video ? (
            <ShowcaseVideo src={browser.video} poster={browser.poster} className={styles.sceneFill} />
          ) : (
            <Image src={browser.poster} alt="" fill sizes="(min-width: 900px) 50vw, 60vw" className={styles.sceneFill} preload={priority} />
          )}
        </div>
      </div>
      {mobile ? (
        <div className={styles.scenePhone}>
          <div className={styles.phoneScreen}>
            <Screen screen={mobile} priority={priority} kind="mobile" />
          </div>
        </div>
      ) : null}
    </>
  );
}

/**
 * A screenshot inside a device, or a styled placeholder page when there's no screenshot yet.
 * Images skip the optimiser: files are shown exactly as supplied, and it also avoids an optimiser
 * stall seen locally on some sizes.
 */
function Screen({ screen, priority, kind }: { screen: DeviceScreen; priority: boolean; kind: "desktop" | "mobile" }) {
  if (screen.video) {
    // Box held at the video's proportions (--shot), so nothing shifts while it loads.
    return (
      <div className={styles.videoScreen}>
        <ShowcaseVideo src={screen.video} poster={screen.poster ?? ""} className={styles.sceneFill} />
      </div>
    );
  }
  if (!screen.src || !screen.width || !screen.height) {
    return (
      <div className={styles.placeholderScreen} data-kind={kind} aria-hidden="true">
        <span className={styles.placeholderNav} />
        <span className={styles.placeholderTitle}>{screen.placeholder}</span>
        <span className={styles.placeholderLine} />
        <span className={styles.placeholderImage} />
      </div>
    );
  }
  return (
    <Image
      src={screen.src}
      alt=""
      width={screen.width}
      height={screen.height}
      unoptimized
      className={styles.artScreen}
      preload={priority}
    />
  );
}

const ratio = (screen: DeviceScreen, fallback: number) =>
  screen.width && screen.height ? screen.width / screen.height : fallback;

/**
 * Layered product artwork, positioned in ProjectShowcase.module.css: a large browser (with an
 * optional overlapping phone), or a family of phones. The backdrop is painted on the card itself.
 */
function Artwork({ artwork, priority }: { artwork: ShowcaseArtwork; priority: boolean }) {
  const { desktop, mobile, phones } = artwork;

  if (phones?.length) {
    return (
      <div className={`${styles.artwork} ${styles.phoneFamily}`}>
        {phones.map((phone, i) => (
          <div
            key={phone.src ?? i}
            className={styles.familyPhone}
            data-slot={i}
            style={phone.fill ? ({ "--fill": phone.fill } as CSSProperties) : undefined}
          >
            <div className={styles.phoneScreen}>
              <Screen screen={phone} priority={priority} kind="mobile" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!desktop) return null;
  return (
    <div className={styles.artwork} data-with-mobile={mobile ? "" : undefined}>
      <div className={styles.artBrowser} style={{ "--shot": ratio(desktop, 1.6) } as CSSProperties}>
        <div className={styles.browserBar}>
          <span className={styles.browserDots}>
            <span />
            <span />
            <span />
          </span>
          <span className={styles.browserUrl}>{desktop.url}</span>
        </div>
        <Screen screen={desktop} priority={priority} kind="desktop" />
      </div>
      {mobile ? (
        <div className={styles.artPhone} style={{ "--shot": ratio(mobile, 0.46) } as CSSProperties}>
          <div className={styles.phoneScreen}>
            <Screen screen={mobile} priority={priority} kind="mobile" />
          </div>
        </div>
      ) : null}
    </div>
  );
}

/**
 * Cinematic work card: one shared layout, art-directed per project through `project.showcase`
 * (background colour, text theme, visual and crop).
 */
export default function ProjectShowcase({
  project,
  index,
  priority = false,
  headingLevel: Heading = "h2",
  immersive,
}: ProjectShowcaseProps) {
  const showcase = project.showcase;
  const src = showcase?.image ?? project.cover ?? project.image;
  const style = {
    "--card-bg": showcase?.background ?? "#0f0f0e",
    ...(showcase?.fade ? { "--fade": showcase.fade } : {}),
    ...(showcase?.ink ? { "--fg": showcase.ink } : {}),
    ...(showcase?.scene ? { background: `${showcase.scene.backdrop}, var(--card-bg)` } : {}),
    ...(showcase?.artwork ? { background: `${showcase.artwork.backdrop}, var(--card-bg)` } : {}),
  } as CSSProperties;
  const visualClass = showcase?.artwork
    ? `${styles.visual} ${styles.artworkVisual}`
    : showcase?.scene
      ? `${styles.visual} ${styles.sceneVisual}`
      : styles.visual;

  const ghost = showcase?.artwork?.ghost;
  const content: ReactNode = (
    <>
      {ghost ? (
        <Image
          src={ghost.src}
          alt=""
          width={ghost.width}
          height={ghost.height}
          unoptimized
          className={styles.ghost}
          style={
            {
              ...(ghost.opacity !== undefined ? { "--ghost-opacity": ghost.opacity } : {}),
              ...(ghost.focusX !== undefined ? { "--ghost-anchor": (ghost.focusX * ghost.width) / ghost.height } : {}),
              ...(ghost.at !== undefined ? { "--ghost-at": ghost.at } : {}),
            } as CSSProperties
          }
          preload={priority}
        />
      ) : null}
      <div className={visualClass}>
        {showcase?.artwork ? (
          <Artwork artwork={showcase.artwork} priority={priority} />
        ) : showcase?.scene ? (
          <Scene scene={showcase.scene} priority={priority} />
        ) : src ? (
          <Image
            src={src}
            alt=""
            fill
            sizes="(min-width: 900px) 70vw, 100vw"
            className={styles.image}
            style={showcase?.position ? { objectPosition: showcase.position } : undefined}
            preload={priority}
          />
        ) : null}
      </div>

      <div className={styles.content}>
        <p className={styles.number}>{pad(index + 1)}</p>

        <div>
          <Heading className={styles.title}>{project.title}</Heading>
          {project.description ? <p className={styles.description}>{project.description}</p> : null}
          <div className={styles.meta}>
            {project.tags?.length ? (
              <ul className={styles.tags} aria-label="Disciplines">
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            ) : null}
            {project.period ? <span className={styles.year}>{project.period}</span> : null}
          </div>
        </div>

        <span className={styles.cta}>
          {project.link ? (
            <>
              View case study <span className={styles.arrow} aria-hidden="true">&rarr;</span>
            </>
          ) : (
            project.label ?? "Case study coming soon"
          )}
        </span>
      </div>
    </>
  );

  return project.link ? (
    <Link href={project.link} className={styles.card} data-theme={showcase?.theme ?? "dark"} data-immersive={immersive} data-layout={showcase?.artwork || showcase?.scene ? "artwork" : undefined} style={style}>
      {content}
    </Link>
  ) : (
    <div className={styles.card} data-theme={showcase?.theme ?? "dark"} data-immersive={immersive} data-layout={showcase?.artwork || showcase?.scene ? "artwork" : undefined} style={style}>
      {content}
    </div>
  );
}
