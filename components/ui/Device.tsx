import type { ReactNode } from "react";
import styles from "./Device.module.css";

/*
 * The portfolio's one browser frame and one phone frame. Used by the homepage scenes, the Work grid and
 * the case studies, so every screenshot is presented the same way. Chrome is sized relative to the frame
 * (container units), so it looks proportionate at any size.
 *
 * Pass `className` to position or elevate a frame in context; the frame styling itself lives here.
 */

export function Browser({
  url,
  scheme = "light",
  bar = true,
  className,
  children,
}: {
  /** Address shown in the bar. Optional: small frames can leave it out. */
  url?: string;
  /** The top bar with its three dots. Pass false for just the rounded screen. */
  bar?: boolean;
  scheme?: "light" | "dark";
  className?: string;
  /** The screen: an image, a video box, a cropped Img… */
  children: ReactNode;
}) {
  return (
    <div className={`${styles.browser} ${className ?? ""}`} data-scheme={scheme}>
      {bar ? (
        <div className={styles.bar} aria-hidden="true">
          <span className={styles.dots}>
            <span />
            <span />
            <span />
          </span>
          {url ? <span className={styles.url}>{url}</span> : null}
        </div>
      ) : null}
      <div className={styles.screen}>{children}</div>
    </div>
  );
}

export function Phone({ className, children }: { className?: string; children?: ReactNode }) {
  return (
    <div className={`${styles.phone} ${className ?? ""}`}>
      <div className={styles.phoneScreen}>{children}</div>
    </div>
  );
}
