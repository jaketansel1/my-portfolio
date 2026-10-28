import Image from "next/image";
import type { ExperimentId } from "../../app/data/experiments";
import styles from "./Experiments.module.css";

// Real project shots fanned out on the Surprise Me card.
const stack = [
  { src: "/fanzine-homepage.jpg", position: "30% center" },
  { src: "/licklibrary/guided-discovery1.jpg", position: "left center" },
  { src: "/sportskins2-homepage.jpg", position: "20% center" },
];

/** Decorative preview for each experiment card. Purely visual; the card text carries the meaning. */
export default function ExperimentVisual({ id }: { id: ExperimentId }) {
  if (id === "ask") {
    return (
      <span className={`${styles.visual} ${styles.askVisual}`} aria-hidden="true">
        <span className={styles.visualGlyph}>✦</span>
        <span className={styles.askPrompt}>
          What&rsquo;s the story behind Build Your Set?<span className={styles.caret} />
        </span>
      </span>
    );
  }

  if (id === "play") {
    return (
      <span className={`${styles.visual} ${styles.playVisual}`} aria-hidden="true">
        <span className={styles.playStack}>
          <span className={styles.choice}>
            <span className={styles.choiceKey}>A</span>
            <span className={styles.choiceText}>Fixed bundles</span>
          </span>
          <span className={styles.choiceOr}>or</span>
          <span className={styles.choice}>
            <span className={styles.choiceKey}>B</span>
            <span className={styles.choiceText}>Build your own</span>
          </span>
        </span>
      </span>
    );
  }

  return (
    <span className={`${styles.visual} ${styles.surpriseVisual}`} aria-hidden="true">
      <span className={styles.visualGlyph}>◈</span>
      {stack.map((shot) => (
        <span key={shot.src} className={styles.stackCard}>
          <Image src={shot.src} alt="" fill sizes="200px" style={{ objectFit: "cover", objectPosition: shot.position }} />
        </span>
      ))}
    </span>
  );
}
