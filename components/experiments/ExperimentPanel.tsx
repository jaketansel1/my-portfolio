"use client";

import { useCallback, useEffect, useRef, useState, type ComponentType } from "react";
import { experiments, type ExperimentId } from "../../app/data/experiments";
import ExperimentVisual from "./ExperimentVisual";
import SurpriseMe from "./SurpriseMe";
import styles from "./Experiments.module.css";

export type ExperimentViewProps = {
  /** Return to the list of experiments. */
  onBack: () => void;
  /** Close the panel immediately because the visitor is navigating away. */
  onNavigate: () => void;
};

// Each available experiment renders its own view inside the panel.
const views: Partial<Record<ExperimentId, ComponentType<ExperimentViewProps>>> = {
  surprise: SurpriseMe,
};

const EXIT_MS = 180;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function lockScroll() {
  const root = document.documentElement;
  const scrollbar = window.innerWidth - root.clientWidth;
  root.style.overflow = "hidden";
  if (scrollbar > 0) root.style.paddingRight = `${scrollbar}px`;
}

function unlockScroll() {
  const root = document.documentElement;
  root.style.overflow = "";
  root.style.paddingRight = "";
}

type ExperimentPanelProps = {
  open: boolean;
  onClose: (details: { navigated: boolean }) => void;
};

export default function ExperimentPanel({ open, onClose }: ExperimentPanelProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const navigatedRef = useRef(false);
  const lastActiveRef = useRef<ExperimentId | null>(null);
  const [active, setActive] = useState<ExperimentId | null>(null);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog || dialog.open) return;
    navigatedRef.current = false;
    lockScroll();
    dialog.showModal();
  }, [open]);

  // Leaving the page (or unmounting) mid-open must never leave the page unscrollable.
  useEffect(() => unlockScroll, []);

  const requestClose = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog?.open) return;
    if (prefersReducedMotion()) {
      dialog.close();
      return;
    }
    setClosing(true);
    window.setTimeout(() => dialog.close(), EXIT_MS);
  }, []);

  const closeForNavigation = useCallback(() => {
    navigatedRef.current = true;
    // Unlock now rather than on the async close event, so the next page can scroll to its anchor.
    unlockScroll();
    dialogRef.current?.close();
  }, []);

  const handleClosed = () => {
    unlockScroll();
    setClosing(false);
    setActive(null);
    lastActiveRef.current = null;
    onClose({ navigated: navigatedRef.current });
  };

  const showMenu = useCallback(() => {
    setActive(null);
  }, []);

  // Returning to the menu puts focus back on the experiment the visitor came from.
  useEffect(() => {
    if (active) {
      lastActiveRef.current = active;
      return;
    }
    const previous = lastActiveRef.current;
    if (!previous) return;
    dialogRef.current?.querySelector<HTMLElement>(`[data-experiment="${previous}"]`)?.focus();
  }, [active]);

  const ActiveView = active ? views[active] : undefined;

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      data-closing={closing || undefined}
      aria-labelledby="experiments-title"
      onCancel={(event) => {
        // Escape: run the exit transition instead of closing instantly.
        event.preventDefault();
        requestClose();
      }}
      onClose={handleClosed}
      onClick={(event) => {
        // Clicks on the backdrop land on the dialog element itself.
        if (event.target === event.currentTarget) requestClose();
      }}
    >
      <div className={styles.sheet}>
        <div className={styles.topBar}>
          {ActiveView ? (
            <button type="button" className={styles.quietButton} onClick={showMenu}>
              <span aria-hidden="true">&larr;</span> All experiences
            </button>
          ) : (
            <p className={styles.kicker}>Experimental</p>
          )}
          <button type="button" className={styles.quietButton} onClick={requestClose}>
            Close <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <h2
          id="experiments-title"
          className={ActiveView ? styles.visuallyHidden : styles.title}
        >
          Try something different.
        </h2>

        {ActiveView ? (
          <ActiveView onBack={showMenu} onNavigate={closeForNavigation} />
        ) : (
          <div className={styles.menu}>
            <p className={styles.intro}>There&rsquo;s more than one way to explore my work.</p>
            <ol className={styles.options}>
              {experiments.map((experiment) => {
                const available = experiment.status === "available" && views[experiment.id];
                const content = (
                  <>
                    <ExperimentVisual id={experiment.id} />
                    <span className={styles.optionBody}>
                      <span className={styles.optionMeta}>
                        <span className={styles.optionNumber}>{experiment.number}</span>
                        <span className={available ? styles.optionLive : styles.optionSoon}>
                          {available ? "Available now" : "Coming soon"}
                        </span>
                      </span>
                      <span className={styles.optionTitle}>
                        <span className={styles.optionSymbol} aria-hidden="true">{experiment.symbol}</span>
                        {experiment.title}
                      </span>
                      <span className={styles.optionText}>{experiment.description}</span>
                      {available && (
                        <span className={styles.optionAction}>
                          {experiment.action} <span aria-hidden="true">&rarr;</span>
                        </span>
                      )}
                    </span>
                  </>
                );

                return (
                  <li key={experiment.id} className={styles.option}>
                    {available ? (
                      <button
                        type="button"
                        className={styles.optionInner}
                        data-experiment={experiment.id}
                        onClick={() => setActive(experiment.id)}
                      >
                        {content}
                      </button>
                    ) : (
                      <div className={styles.optionInner} data-soon>
                        {content}
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        )}
      </div>
    </dialog>
  );
}
