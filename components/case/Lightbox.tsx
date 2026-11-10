"use client";

import Image from "next/image";
import { useRef } from "react";
import styles from "./Lightbox.module.css";

/**
 * A small image that opens larger in a modal when clicked. Uses the native <dialog>, so focus moves into it and back,
 * and Esc closes it; a click on the backdrop or the close button does too.
 */
export default function Lightbox({
  src,
  width,
  height,
  alt,
  label,
  className,
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** What the button does, for assistive tech, e.g. "Open the pull request screenshot". */
  label: string;
  className?: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button type="button" className={`${styles.thumb} ${className ?? ""}`} onClick={() => dialog.current?.showModal()} aria-label={label}>
        <Image src={src} alt={alt} width={width} height={height} unoptimized />
        <span className={styles.expand} aria-hidden="true">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
        </span>
      </button>
      <dialog
        ref={dialog}
        className={styles.dialog}
        aria-label={alt}
        // A click on the backdrop lands on the dialog itself; clicks on the image land inside it.
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
      >
        <Image src={src} alt={alt} width={width} height={height} unoptimized />
        <button type="button" className={styles.close} onClick={() => dialog.current?.close()} aria-label="Close">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </dialog>
    </>
  );
}
