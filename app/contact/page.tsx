import type { Metadata } from "next";
import Image from "next/image";
import SiteHeader from "../../components/SiteHeader";
import { availability, contact } from "../data/contact";
import home from "../home.module.css";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact — Jake Tansel",
  description:
    "Get in touch with Jake Tansel, product designer, about product design, builds, freelance work or just a conversation.",
};

const pad = (n: number) => String(n).padStart(2, "0");

export default function ContactPage() {
  const mailto = `mailto:${contact.email}`;

  return (
    <div className={home.home}>
      <a className={home.skipLink} href="#main-content">Skip to content</a>
      <div className={home.container}>
        <SiteHeader editorial current="contact" />
      </div>

      <main id="main-content">
        <section className={`${home.container} ${styles.hero}`} aria-labelledby="contact-heading">
          <div className={styles.heroText}>
            <p className={styles.eyebrow}>Contact</p>
            <h1 id="contact-heading" className={styles.headline}>
              <span className={home.line}>
                <span>Got something interesting</span>
              </span>
              <span className={`${home.line} ${home.lineMuted}`}>
                <span>in mind?</span>
              </span>
            </h1>
            <p className={styles.intro}>Product design, builds, freelance work or just a conversation.</p>

            <div className={styles.actions}>
              <a href={mailto} className={`${home.primaryButton} ${styles.emailButton}`}>
                Email me
                <span aria-hidden="true">&rarr;</span>
              </a>
              <a href={contact.linkedin} className={styles.linkedin} target="_blank" rel="noreferrer">
                <span className={styles.linkLabel}>LinkedIn</span>
                <span aria-hidden="true">&#8599;</span>
                <span className={styles.visuallyHidden}> (opens in a new tab)</span>
              </a>
            </div>
            <p className={styles.address}>{contact.email}</p>
          </div>

          <div className={styles.visual}>
            {contact.image ? (
              <Image
                src={contact.image}
                alt="Jake Tansel"
                fill
                priority
                sizes="(min-width: 900px) 45vw, 100vw"
                className={styles.visualImage}
                style={contact.imagePosition ? { objectPosition: contact.imagePosition } : undefined}
              />
            ) : (
              <p className={styles.placeholder} aria-hidden="true">
                Photograph to come
              </p>
            )}
          </div>
        </section>

        <section className={`${home.container} ${styles.availability}`} aria-labelledby="availability-heading">
          <h2 id="availability-heading" className={styles.label}>Available for</h2>
          <ul className={styles.availabilityList}>
            {availability.map((item, index) => (
              <li key={item}>
                <span className={styles.availabilityNumber}>{pad(index + 1)}</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.closing} aria-labelledby="closing-heading">
          <div className={home.container}>
            <h2 id="closing-heading" className={styles.closingHeading}>
              Let&rsquo;s make something good.
            </h2>
            <ul className={styles.closingLinks}>
              <li>
                <a href={mailto}>
                  <span className={styles.linkLabel}>Email</span>
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </li>
              <li>
                <a href={contact.linkedin} target="_blank" rel="noreferrer">
                  <span className={styles.linkLabel}>LinkedIn</span>
                  <span aria-hidden="true">&#8599;</span>
                  <span className={styles.visuallyHidden}> (opens in a new tab)</span>
                </a>
              </li>
            </ul>
            <div className={styles.closingInfo}>
              <p>Based {contact.location}</p>
              <p>Available for freelance, contract and the right full-time role.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
