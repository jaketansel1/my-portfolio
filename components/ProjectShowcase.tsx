import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import type { Project, ShowcaseScene } from "../app/data/projects";
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

/** Backdrop → subject (with grounding shadow) → browser, positioned in ProjectShowcase.module.css. */
function Scene({ scene, priority }: { scene: ShowcaseScene; priority: boolean }) {
  const { subject, browser } = scene;
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
    </>
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
  } as CSSProperties;

  const content: ReactNode = (
    <>
      <div className={showcase?.scene ? `${styles.visual} ${styles.sceneVisual}` : styles.visual}>
        {showcase?.scene ? (
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
    <Link href={project.link} className={styles.card} data-theme={showcase?.theme ?? "dark"} data-immersive={immersive} style={style}>
      {content}
    </Link>
  ) : (
    <div className={styles.card} data-theme={showcase?.theme ?? "dark"} data-immersive={immersive} style={style}>
      {content}
    </div>
  );
}
