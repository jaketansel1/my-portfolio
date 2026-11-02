import type { Metadata } from "next";
import SiteFooter from "../../components/SiteFooter";
import HeroShuffle from "../../components/HeroShuffle";
import SideGrid from "../../components/SideGrid";
import SiteHeader from "../../components/SiteHeader";
import StickyNav from "../../components/StickyNav";
import { career, heroPhotos, sides } from "../data/about";
import home from "../home.module.css";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About — Jake Tansel",
  description:
    "Jake Tansel is a product designer based just outside London who designs, prototypes and builds digital products.",
};

const pad = (n: number) => String(n).padStart(2, "0");

/* Intro → "Pick a side of me" → how I got here → contact. Content lives in app/data/about.ts. */
export default function AboutPage() {
  return (
    <div className={home.home}>
      <StickyNav>
        <div className={home.container}>
          <SiteHeader editorial current="about" />
        </div>
      </StickyNav>

      <main id="main-content">
        <section className={`${home.container} ${styles.intro}`} aria-labelledby="about-heading">
          <div className={styles.introText}>
            <p className={styles.eyebrow}>About</p>
            <h1 id="about-heading" className={styles.heading}>
              <span className={home.line}>
                <span>A bit more</span>
              </span>
              <span className={`${home.line} ${home.lineMuted}`}>
                <span>about me.</span>
              </span>
            </h1>
            <p className={styles.lede}>
              I&rsquo;m a product designer with 8+ years of experience across UX/UI, digital products and frontend
              development, spanning sports, e-commerce and digital learning. My work ranges from large-scale product
              platforms to websites and independent client projects.
            </p>
          </div>
          <HeroShuffle photos={heroPhotos} className={styles.portrait} />
        </section>

        <section className={`${home.container} ${styles.sides}`} aria-labelledby="sides-heading">
          <div className={styles.sidesHead}>
            <h2 id="sides-heading" className={styles.sectionHeading}>
              A few sides of me.
            </h2>

          </div>
          <SideGrid sides={sides} />
        </section>

        <section className={`${home.container} ${styles.career}`} aria-labelledby="career-heading">
          <div className={styles.careerHead}>
            <h2 id="career-heading" className={styles.sectionHeading}>
              How I got here.
            </h2>
            <p className={styles.sectionNote}>From social and eCommerce, to product design, to designing and building.</p>
          </div>
          {/* One continuous line: a node and year where each stage begins, and "now" at the end. */}
          <div className={styles.journey}>
            <div className={styles.track} aria-hidden="true">
              {career.map((step) => (
                <span key={step.from} className={styles.node}>
                  {step.from}
                </span>
              ))}
              <span className={styles.nodeNow}>Now</span>
            </div>
            <ol className={styles.stages}>
              {career.map((step, i) => (
                <li key={step.title} className={styles.stage}>
                  <p className={styles.stageMeta}>
                    <span>{pad(i + 1)}</span>
                    {step.years}
                  </p>
                  <h3 className={styles.stageTitle}>{step.title}</h3>
                  <p className={styles.stageBody}>{step.body}</p>
                  {step.places?.length ? <p className={styles.stagePlaces}>{step.places.join(" · ")}</p> : null}
                </li>
              ))}
            </ol>
          </div>
        </section>

      </main>
      <SiteFooter />
    </div>
  );
}
