"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { contact } from "../../app/data/contact";
import styles from "./ContactPanel.module.css";
import { useCopyEmail } from "./useCopyEmail";

/*
 * Global contact panel. One instance lives in the root layout; anything can open it with
 * useContact().toggle(element) or the <ContactTrigger> button. On desktop it floats beside the element
 * that opened it (below it, or above when there's no room); on small screens it's a bottom sheet.
 * Visiting /contact (redirected to /?contact) opens it on arrival.
 */

type ContactApi = {
  isOpen: boolean;
  open: (anchor?: HTMLElement | null) => void;
  close: () => void;
  toggle: (anchor?: HTMLElement | null) => void;
};

const ContactContext = createContext<ContactApi | null>(null);

export function useContact() {
  const api = useContext(ContactContext);
  if (!api) throw new Error("useContact must be used inside <ContactProvider>");
  return api;
}

const GAP = 12;
const EDGE = 16;

export function ContactProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const open = useCallback((anchor?: HTMLElement | null) => {
    // Fall back to the nav's Contact item, so programmatic opens still sit under the nav.
    setAnchor(anchor ?? document.querySelector<HTMLElement>("[data-contact-nav]"));
    setClosing(false);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setClosing(true);
  }, []);

  const toggle = useCallback(
    (anchor?: HTMLElement | null) => {
      if (isOpen && !closing) close();
      else open(anchor);
    },
    [isOpen, closing, open, close],
  );

  // Finish closing after the exit animation, then hand focus back to whatever opened it.
  useEffect(() => {
    if (!closing) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = window.setTimeout(() => {
      setIsOpen(false);
      setClosing(false);
      anchor?.focus({ preventScroll: true });
    }, reduce ? 0 : 180);
    return () => window.clearTimeout(id);
  }, [closing, anchor]);

  // /contact redirects to /?contact: open on arrival and tidy the URL.
  useEffect(() => {
    const url = new URL(window.location.href);
    if (!url.searchParams.has("contact")) return;
    url.searchParams.delete("contact");
    history.replaceState(null, "", url.pathname + url.search + url.hash);
    const id = window.setTimeout(() => open(), 300);
    return () => window.clearTimeout(id);
  }, [open]);

  return (
    <ContactContext.Provider value={{ isOpen, open, close, toggle }}>
      {children}
      {isOpen ? <Panel anchor={anchor} closing={closing} onClose={close} /> : null}
    </ContactContext.Provider>
  );
}

/* Icons: functional only. */
function CopyIcon() {
  return (
    <svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <rect x="5.5" y="5.5" width="8" height="8" rx="1.6" />
      <path d="M10.5 5.5V3.6a1.1 1.1 0 0 0-1.1-1.1H3.6a1.1 1.1 0 0 0-1.1 1.1v5.8a1.1 1.1 0 0 0 1.1 1.1h1.9" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
    </svg>
  );
}

function Panel({ anchor, closing, onClose }: { anchor: HTMLElement | null; closing: boolean; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [place, setPlace] = useState<{ top: number; left: number } | null>(null);
  const { copied, copy } = useCopyEmail();

  // Position beside the anchor on desktop; the sheet layout (CSS) takes over on small screens.
  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const measure = () => {
      if (window.matchMedia("(max-width: 640px)").matches || !anchor) {
        setPlace(null);
        return;
      }
      const a = anchor.getBoundingClientRect();
      const w = panel.offsetWidth;
      const h = panel.offsetHeight;
      const below = a.bottom + GAP;
      const top = below + h <= window.innerHeight - EDGE ? below : Math.max(EDGE, a.top - GAP - h);
      const left = Math.min(Math.max(a.right - w, EDGE), window.innerWidth - w - EDGE);
      setPlace({ top, left });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [anchor]);

  // Move focus in once the panel is visible (it stays hidden until it has been positioned).
  const visible = place !== null || !anchor;
  const focused = useRef(false);
  useEffect(() => {
    if (focused.current) return;
    const target = panelRef.current?.querySelector<HTMLElement>("[data-autofocus]");
    if (!target || getComputedStyle(panelRef.current!).visibility === "hidden") return;
    target.focus({ preventScroll: true });
    focused.current = true;
  }, [visible, place]);

  // Escape closes; Tab stays inside the panel.
  useEffect(() => {
    const panel = panelRef.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const items = [...panel.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")];
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  /*
   * While open the page underneath stays put. Scrolling input is blocked rather than hiding the
   * scrollbar, so nothing shifts sideways. Listeners run first (window, capture phase) so page-level
   * handlers such as the homepage's scene paging never see them. Escape and Tab still pass through.
   */
  useEffect(() => {
    const scrollKeys = new Set(["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "]);
    const block = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };
    const onKey = (e: KeyboardEvent) => {
      if (!scrollKeys.has(e.key)) return;
      // Space still presses a focused button or link inside the panel.
      if (e.key === " " && (e.target as HTMLElement | null)?.closest("button, a")) {
        e.stopPropagation();
        return;
      }
      block(e);
    };
    const options = { capture: true, passive: false };
    window.addEventListener("wheel", block, options);
    window.addEventListener("touchmove", block, options);
    window.addEventListener("keydown", onKey, { capture: true });
    return () => {
      window.removeEventListener("wheel", block, options);
      window.removeEventListener("touchmove", block, options);
      window.removeEventListener("keydown", onKey, { capture: true });
    };
  }, []);

  return (
    <div className={styles.layer} data-closing={closing || undefined}>
      <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />
      <div
        ref={panelRef}
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-panel-title"
        data-placed={place ? "" : undefined}
        style={place ? { top: place.top, left: place.left } : undefined}
      >
        <div className={styles.head}>
          <p id="contact-panel-title" className={styles.title}>
            Contact
          </p>
          <button type="button" className={styles.close} onClick={onClose} aria-label="Close contact panel">
            <CloseIcon />
          </button>
        </div>

        <ul className={styles.rows}>
          <li>
            <button type="button" className={styles.row} onClick={copy} data-autofocus="">
              <span className={styles.label}>{copied ? "Copied!" : "Email"}</span>
              <span className={styles.value}>{contact.email}</span>
              <span className={styles.icon} data-done={copied || undefined}>
                {copied ? <span aria-hidden="true">&#10003;</span> : <CopyIcon />}
              </span>
              <span className={styles.visuallyHidden}>{copied ? "Email address copied" : "Copy email address"}</span>
            </button>
          </li>
          <li>
            <a className={styles.row} href={contact.linkedin.href ?? undefined} target="_blank" rel="noreferrer">
              <span className={styles.label}>LinkedIn</span>
              <span className={styles.value}>{contact.linkedin.label}</span>
              <span className={styles.icon} aria-hidden="true">
                &#8599;
              </span>
              <span className={styles.visuallyHidden}> (opens in a new tab)</span>
            </a>
          </li>
          <li>
            {contact.cv.href ? (
              <a className={styles.row} href={contact.cv.href} target="_blank" rel="noreferrer">
                <span className={styles.label}>CV</span>
                <span className={styles.value}>{contact.cv.label}</span>
                <span className={styles.icon} aria-hidden="true">
                  &#8599;
                </span>
                <span className={styles.visuallyHidden}> (opens in a new tab)</span>
              </a>
            ) : (
              <div className={styles.row} data-static="">
                <span className={styles.label}>CV</span>
                <span className={styles.value} data-muted="">
                  Coming soon
                </span>
              </div>
            )}
          </li>
          <li>
            <div className={styles.row} data-static="">
              <span className={styles.label}>Based</span>
              <span className={styles.value}>{contact.based}</span>
            </div>
          </li>
        </ul>
        <span className={styles.visuallyHidden} role="status">
          {copied ? "Email address copied" : ""}
        </span>
      </div>
    </div>
  );
}
