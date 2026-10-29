import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import ProjectShowcase from "../../components/ProjectShowcase";
import { projects } from "../data/projects";
import home from "../home.module.css";
import styles from "./work.module.css";

export const metadata: Metadata = {
  title: "Work — Jake Tansel",
  description:
    "Selected product design, UX/UI and front-end work by Jake Tansel across sport, music education, property and AI.",
};

const slug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

// Earliest start year across projects through to the present.
const SPAN = `${Math.min(...projects.flatMap((p) => (p.period ? [Number.parseInt(p.period, 10)] : [])))}—now`;

export default function WorkPage() {
  return (
    <div className={home.home}>
      <a className={home.skipLink} href="#main-content">Skip to content</a>
      <div className={home.container}>
        <SiteHeader editorial current="work" />
      </div>

      <main id="main-content">
        <section className={`${home.container} ${styles.intro}`} aria-labelledby="work-heading">
          <p className={styles.eyebrow}>Selected work</p>
          <h1 id="work-heading" className={styles.headline}>
            <span className={home.line}>
              <span>Products I&rsquo;ve designed,</span>
            </span>
            <span className={`${home.line} ${home.lineMuted}`}>
              <span>built and shipped.</span>
            </span>
          </h1>
          <dl className={styles.meta}>
            <div>
              <dt className={styles.visuallyHidden}>Projects</dt>
              <dd>{projects.length} projects</dd>
            </div>
            <div>
              <dt className={styles.visuallyHidden}>Years</dt>
              <dd>{SPAN}</dd>
            </div>
          </dl>
        </section>

        <section className={home.container} aria-label="Projects">
          <ol className={styles.showcases}>
            {projects.map((project, index) => (
              <li key={project.title} id={slug(project.title)}>
                <ProjectShowcase project={project} index={index} priority={index === 0} />
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.closing} aria-labelledby="closing-heading">
          <div className={home.container}>
            <h2 id="closing-heading" className={styles.closingHeading}>
              Have a product in mind?
            </h2>
            <Link href="/contact" className={styles.closingLink}>
              <span>Get in touch</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
