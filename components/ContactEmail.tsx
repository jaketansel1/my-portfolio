"use client";

import { useState } from "react";
import styles from "../app/contact/contact.module.css";

type ContactEmailProps = {
  email: string;
};

export default function ContactEmail({ email }: ContactEmailProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <div className={styles.email}>
      <a href={`mailto:${email}`} className={styles.emailLink}>
        <span>{email}</span>
        <span className={styles.emailArrow} aria-hidden="true">&#8599;</span>
      </a>
      <button type="button" onClick={copy} className={styles.copyButton}>
        {copied ? "Copied" : "Copy address"}
      </button>
      <span className={styles.visuallyHidden} aria-live="polite">
        {copied ? "Email address copied" : ""}
      </span>
    </div>
  );
}
