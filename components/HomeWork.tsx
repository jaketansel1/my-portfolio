import Link from "next/link";
import type { Project } from "../app/data/projects";
import styles from "../app/home.module.css";
import ProjectShowcase from "./ProjectShowcase";

type HomeWorkProps = {
  projects: Project[];
};

export default function HomeWork({ projects }: HomeWorkProps) {
  return (
    <section id="work" className={`${styles.container} ${styles.work}`} aria-labelledby="work-heading">
      <div className={styles.workHeader}>
        <h2 id="work-heading" className={styles.workHeading}>Selected work</h2>
        <p className={styles.workIntro}>A selection of products I&rsquo;ve designed, built and shipped.</p>
      </div>

      <ol className={styles.workList}>
        {projects.map((project, index) => (
          <li key={project.title}>
            <ProjectShowcase
              project={project}
              index={index}
              headingLevel="h3"
            />
          </li>
        ))}
      </ol>

      <Link href="/work" className={styles.allWork}>
        <span>View all work</span>
        <span aria-hidden="true">&rarr;</span>
      </Link>
    </section>
  );
}
