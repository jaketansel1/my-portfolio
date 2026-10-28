"use client";

import type { FormEvent } from "react";
import { topics } from "../app/data/contact";
import styles from "../app/contact/contact.module.css";

type ContactFormProps = {
  email: string;
};

// No backend yet: the form composes an email in the visitor's mail app.
export default function ContactForm({ email }: ContactFormProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const topic = String(data.get("topic") ?? topics[0]);
    const message = String(data.get("message") ?? "").trim();

    const subject = `${topic} — ${name}`;
    const body = `${message}\n\n${name}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <fieldset className={styles.topics}>
        <legend className={styles.fieldLabel}>What&rsquo;s it about?</legend>
        <div>
          {topics.map((topic, index) => (
            <label key={topic} className={styles.topic}>
              <input type="radio" name="topic" value={topic} defaultChecked={index === 0} />
              <span>{topic}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className={styles.field}>
        <span className={styles.fieldLabel}>Your name</span>
        <input type="text" name="name" autoComplete="name" required />
      </label>

      <label className={styles.field}>
        <span className={styles.fieldLabel}>Message</span>
        <textarea name="message" rows={5} required />
      </label>

      <div className={styles.formFooter}>
        <button type="submit" className={styles.submit}>
          Write email
          <span aria-hidden="true">&rarr;</span>
        </button>
        <p className={styles.formNote}>Opens your email app with your message ready to send.</p>
      </div>
    </form>
  );
}
