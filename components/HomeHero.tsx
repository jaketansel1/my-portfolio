import Link from "next/link";
import ExperimentLauncher from "./experiments/ExperimentLauncher";
import styles from "../app/home.module.css";

const facts = [
  { label: "Experience", value: "8 years in digital product" },
  { label: "Practice", value: "Product design, UX/UI and front-end" },
  { label: "Recent work", value: "Sport, music education, property and AI tools" },
];

export default function HomeHero() {
  return (
    <section className={`${styles.container} ${styles.hero}`} aria-labelledby="hero-heading">
      <h1 id="hero-heading" className={styles.headline}>
        <span className={styles.line}>
          <span>Product designer</span>
        </span>
        <span className={`${styles.line} ${styles.lineMuted}`}>
          <span>who builds and ships.</span>
        </span>
      </h1>

      <div className={styles.facts}>
        <dl className={styles.factList}>
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
        <div className={styles.actions}>
          <a href="#work" className={styles.primaryButton}>
            Selected work
            <span aria-hidden="true">&darr;</span>
          </a>
          <ExperimentLauncher />
          <Link href="/contact" className={styles.textLink}>
            Get in touch
          </Link>
        </div>
      </div>
    </section>
  );
}
