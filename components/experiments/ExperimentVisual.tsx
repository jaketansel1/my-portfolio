import type { CSSProperties } from "react";
import type { ExperimentId } from "../../app/data/experiments";
import styles from "./Experiments.module.css";

const askSample = "What’s Jake’s strongest UX project?";

/**
 * The card's stage: an oversized symbol plus a small preview of the interaction that plays on hover.
 * Purely decorative; the card text carries the meaning.
 */
export default function ExperimentVisual({ id, symbol }: { id: ExperimentId; symbol: string }) {
  return (
    <span className={styles.stage} aria-hidden="true">
      <span className={styles.stageSymbol}>{symbol}</span>

      {id === "ask" && (
        <span className={styles.askField}>
          <span className={styles.askPlaceholder}>Ask anything</span>
          <span className={styles.askTyped} style={{ "--chars": askSample.length } as CSSProperties}>
            {askSample}
          </span>
          <span className={styles.caret} />
        </span>
      )}

      {id === "play" && (
        <span className={styles.choices}>
          <span className={styles.choice}>
            <span className={styles.choiceKey}>A</span>
            Fixed bundles
          </span>
          <span className={styles.choice} data-picked>
            <span className={styles.choiceKey}>B</span>
            Build your own
          </span>
        </span>
      )}
    </span>
  );
}
