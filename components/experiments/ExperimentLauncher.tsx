"use client";

import { useRef, useState } from "react";
import ExperimentPanel from "./ExperimentPanel";
import styles from "./Experiments.module.css";

export default function ExperimentLauncher() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={styles.launcher}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <span className={styles.launcherSymbol} aria-hidden="true">✦</span>
        Try something different
      </button>

      <ExperimentPanel
        open={open}
        onClose={({ navigated }) => {
          setOpen(false);
          // After a navigation the visitor is somewhere new; don't pull focus back to the pill.
          if (!navigated) triggerRef.current?.focus();
        }}
      />
    </>
  );
}
