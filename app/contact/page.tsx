import type { Metadata } from "next";
import SiteHeader from "../../components/SiteHeader";
import ContactEmail from "../../components/ContactEmail";
import ContactForm from "../../components/ContactForm";
import { contact } from "../data/contact";
import home from "../home.module.css";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact — Jake Tansel",
  description: "Get in touch with Jake Tansel, product designer, about roles, projects or collaborations.",
};

type Channel = { label: string; value: string; href?: string; external?: boolean };

export default function ContactPage() {
  const channels: Channel[] = [
    { label: "LinkedIn", value: "View profile", href: contact.linkedin, external: true },
    ...(contact.phone ? [{ label: "Phone", value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, "")}` }] : []),
    contact.cv
      ? { label: "CV", value: "Download PDF", href: contact.cv }
      : { label: "CV", value: "Available on request" },
    { label: "Based in", value: contact.location },
  ];

  return (
    <div className={home.home}>
      <a className={home.skipLink} href="#main-content">Skip to content</a>
      <div className={home.container}>
        <SiteHeader editorial current="contact" />
      </div>

      <main id="main-content">
        <section className={`${home.container} ${styles.intro}`} aria-labelledby="contact-heading">
          <p className={styles.eyebrow}>Contact</p>
          <h1 id="contact-heading" className={styles.headline}>
            <span className={home.line}>
              <span>Got a product to build?</span>
            </span>
            <span className={`${home.line} ${home.lineMuted}`}>
              <span>Let&rsquo;s talk.</span>
            </span>
          </h1>

          <div className={styles.direct}>
            <p className={styles.directLabel}>Hiring, collaborating or just want to chat. Email is quickest.</p>
            <ContactEmail email={contact.email} />
          </div>

          <div className={styles.elsewhere}>
            <h2 className={styles.directLabel}>Elsewhere</h2>
            <ul className={styles.channels}>
              {channels.map((channel) => (
                <li key={channel.label}>
                  {channel.href ? (
                    <a
                      href={channel.href}
                      className={styles.channel}
                      target={channel.external ? "_blank" : undefined}
                      rel={channel.external ? "noreferrer" : undefined}
                    >
                      <span className={styles.channelLabel}>{channel.label}</span>
                      <span className={styles.channelValue}>{channel.value}</span>
                      <span className={styles.channelArrow} aria-hidden="true">&#8599;</span>
                    </a>
                  ) : (
                    <div className={styles.channel}>
                      <span className={styles.channelLabel}>{channel.label}</span>
                      <span className={styles.channelValue}>{channel.value}</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.message} aria-labelledby="message-heading">
          <div className={`${home.container} ${styles.messageGrid}`}>
            <div>
              <p className={styles.eyebrow}>Message</p>
              <h2 id="message-heading" className={styles.messageHeading}>
                Prefer to write it out?
              </h2>
              <p className={styles.messageIntro}>
                A few lines on the role or project is plenty.
              </p>
            </div>
            <ContactForm email={contact.email} />
          </div>
        </section>
      </main>
    </div>
  );
}
