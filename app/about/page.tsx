import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "../../components/SiteHeader";
import AboutPersonal from "../../components/AboutPersonal";
import { capabilities, experience, journey, personalChapters } from "../data/about";
import home from "../home.module.css";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About — Jake Tansel",
  description:
    "Jake Tansel designs and builds digital products: eight years across social and eCommerce, product design and front-end implementation.",
};

const pad = (n: number) => String(n).padStart(2, "0");

export default function AboutPage() {
  return (
    <div className={home.home}>

      <div className={styles.night}>
        <div className={home.container}>
          <SiteHeader editorial current="about" />
        </div>
      </div>

      <main id="main-content">
        <section className={styles.personal} aria-labelledby="about-heading">
          <div className={`${home.container} ${styles.personalHeader}`}>
            <p className={styles.eyebrow}>About</p>
            <h1 id="about-heading" className={styles.personalHeading}>
              The rest of the picture.
            </h1>
            <p className={styles.personalIntro}>Work and life, in no particular order.</p>
          </div>
          <div className={home.container}>
            <AboutPersonal chapters={personalChapters} />
          </div>
        </section>

        <section className={`${home.container} ${styles.intro}`} aria-labelledby="story-heading">
          <h2 id="story-heading" className={styles.headline}>
            <span className={home.line}>
              <span>Started in social and eCommerce.</span>
            </span>
            <span className={`${home.line} ${home.lineMuted}`}>
              <span>Now I design and build products.</span>
            </span>
          </h2>

          <div className={styles.story}>
            <p className={styles.storyLabel}>The short version</p>
            <div className={styles.storyBody}>
              <p className={styles.lead}>
                I&rsquo;ve spent eight years designing digital products, and the best of them came from
                working right alongside the people building them.
              </p>
              <p>
                I started out in social and eCommerce, where every design decision showed up in the
                numbers: what people clicked, what they bought, what brought them back. It taught me to
                care about outcomes, not just screens.
              </p>
              <p>
                In 2017 I moved into product design, first at Fanzine designing apps for millions of
                football fans, then real-money games at SportSkins and now a platform redesign at
                LickLibrary. Along the way I started building what I design, using front-end code and
                AI-assisted workflows to get ideas in front of real users faster.
              </p>
            </div>
          </div>
        </section>

        <section className={`${home.container} ${styles.path}`} aria-labelledby="path-heading">
          <h2 id="path-heading" className={styles.sectionLabel}>How I got here</h2>
          <ol className={styles.journey}>
            {journey.map((step, index) => (
              <li key={step.title}>
                <p className={styles.journeyMeta}>
                  <span>{pad(index + 1)}</span>
                  {step.period}
                  {index < journey.length - 1 && (
                    <span className={styles.journeyArrow} aria-hidden="true">&rarr;</span>
                  )}
                </p>
                <h3 className={styles.journeyTitle}>{step.title}</h3>
                <p className={styles.journeyBody}>{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className={`${home.container} ${styles.detail}`} aria-label="Experience and capabilities">
          <div>
            <h2 className={styles.sectionLabel}>Where I&rsquo;ve worked</h2>
            <ul className={styles.experience}>
              {experience.map((item) => (
                <li key={item.company}>
                  <span className={styles.years}>{item.years}</span>
                  <span className={styles.company}>{item.company}</span>
                  <span className={styles.note}>{item.note}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className={styles.sectionLabel}>What I can do</h2>
            <ul className={styles.capabilities}>
              {capabilities.map((capability) => (
                <li key={capability}>{capability}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className={`${home.container} ${styles.closing}`} aria-labelledby="closing-heading">
          <p className={styles.eyebrow}>Back to it</p>
          <h2 id="closing-heading" className={styles.closingStatement}>
            Anyway, back to the work.
          </h2>
          <p className={styles.closingText}>See how I turn ideas into shipped products.</p>
          <div className={styles.closingActions}>
            <Link href="/work" className={home.primaryButton}>
              View selected work
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
