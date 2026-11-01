"use client";

import type { ReactNode } from "react";
import { contact, type ContactLink } from "../app/data/contact";
import { useCopyEmail } from "./contact/useCopyEmail";
import styles from "./SiteFooter.module.css";

function CopyIcon() {
  return (
    <svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <rect x="5.5" y="5.5" width="8" height="8" rx="1.6" />
      <path d="M10.5 5.5V3.6a1.1 1.1 0 0 0-1.1-1.1H3.6a1.1 1.1 0 0 0-1.1 1.1v5.8a1.1 1.1 0 0 0 1.1 1.1h1.9" />
    </svg>
  );
}

/** One labelled detail, laid out like the contact panel and case-study facts: label over value. */
function Detail({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className={styles.detail}>
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

function External({ link }: { link: ContactLink }) {
  if (!link.href) return <span className={styles.pending}>Coming soon</span>;
  return (
    <a className={styles.value} href={link.href} target="_blank" rel="noreferrer">
      {link.label}
      <span className={styles.arrow} aria-hidden="true">
        &#8599;
      </span>
      <span className={styles.visuallyHidden}> (opens in a new tab)</span>
    </a>
  );
}

/**
 * Global footer: the site's closing invitation. One statement on the left; contact details on the right as
 * labelled pairs, the same structure as the contact panel. Details come from app/data/contact.ts.
 */
export default function SiteFooter() {
  const { copied, copy } = useCopyEmail();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <h2 className={styles.statement}>
          Have an idea?
          <span>Let&rsquo;s design and build it.</span>
        </h2>

        <dl className={styles.details}>
          <Detail label={copied ? "Copied!" : "Email"}>
            <button type="button" className={styles.value} onClick={copy}>
              {contact.email}
              <span className={styles.copy} data-done={copied || undefined}>
                {copied ? <span aria-hidden="true">&#10003;</span> : <CopyIcon />}
              </span>
              <span className={styles.visuallyHidden}>{copied ? "" : " (copy email address)"}</span>
            </button>
          </Detail>
          <Detail label="LinkedIn">
            <External link={contact.linkedin} />
          </Detail>
          <Detail label="CV">
            <External link={contact.cv} />
          </Detail>
          <Detail label="GitHub">
            <External link={contact.github} />
          </Detail>
        </dl>
        <span className={styles.visuallyHidden} role="status">
          {copied ? "Email address copied" : ""}
        </span>

        <div className={styles.bottom}>
          <span>Jake Tansel &copy; {new Date().getFullYear()}</span>
          <span>{contact.location}</span>
        </div>
      </div>
    </footer>
  );
}
