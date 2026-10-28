import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import type { Project } from "../app/data/projects";
import styles from "./ProjectShowcase.module.css";

type ProjectShowcaseProps = {
  project: Project;
  index: number;
  /** Preload the first card's visual. */
  priority?: boolean;
  /** Title level, so cards nest correctly under a section heading. */
  headingLevel?: "h2" | "h3";
};

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Cinematic work card: one shared layout, art-directed per project through `project.showcase`
 * (background colour, text theme, visual and crop).
 */
export default function ProjectShowcase({
  project,
  index,
  priority = false,
  headingLevel: Heading = "h2",
}: ProjectShowcaseProps) {
  const showcase = project.showcase;
  const src = showcase?.image ?? project.cover ?? project.image;
  const style = {
    "--card-bg": showcase?.background ?? "#0f0f0e",
    ...(showcase?.fade ? { "--fade": showcase.fade } : {}),
  } as CSSProperties;

  const content: ReactNode = (
    <>
      <div className={styles.visual}>
        {src ? (
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
          <p className={styles.description}>{project.description}</p>
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
    <Link href={project.link} className={styles.card} data-theme={showcase?.theme ?? "dark"} style={style}>
      {content}
    </Link>
  ) : (
    <div className={styles.card} data-theme={showcase?.theme ?? "dark"} style={style}>
      {content}
    </div>
  );
}
