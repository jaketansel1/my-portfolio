import type { Metadata } from "next";
import Image from "next/image";
import { Browser, CasePage, Figure, Img, NextProject, Placeholder, type Tone } from "../../../components/case/Case";
import { ChapterHero, ChapterLayout, ChapterOpener, ChapterSection, type Chapter } from "../../../components/case/Chapters";
import NextChapter from "../../../components/case/NextChapter";
import Walkthrough, { type WalkthroughStep } from "../../../components/case/Walkthrough";
import ShowcaseVideo from "../../../components/ShowcaseVideo";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "LickLibrary — Jake Tansel",
  description:
    "Ongoing product work redesigning LickLibrary, one experience at a time: navigation, homepage, checkout and email, from UX and UI to frontend implementation.",
};

const night: Tone = { bg: "#0a0a0a", fg: "#f3f2ee", muted: "rgb(243 242 238 / 0.62)" };
const crumble: Tone = { bg: "#efe4d4", fg: "#3d2314", muted: "rgb(61 35 20 / 0.66)" };

const LL = "/case/licklibrary";
const shot = (src: string, alt: string, width = 2400, height = 1500) => ({ src, alt, width, height });

/*
 * One master case study for the ongoing LickLibrary work: an overview, then a chapter per initiative,
 * each with an opener and its own nested sections (the rail shows only the chapter being read). To add
 * an initiative, add its chapter and sections here and its sections to the page in the same order.
 *
 * The Mega Menu sections keep their original ids so existing links and styles still hold; later
 * chapters prefix theirs.
 */
const chapters: Chapter[] = [
  { id: "overview", number: "00", title: "Overview" },

  { id: "mega-menu", number: "01", title: "Mega Menu", theme: "Discovery & Navigation" },
  { id: "problem", number: "1.1", title: "Problem", sub: true },
  { id: "system", number: "1.2", title: "System", sub: true },
  { id: "experience", number: "1.3", title: "Desktop", sub: true },
  { id: "mobile", number: "1.4", title: "Mobile", sub: true },
  { id: "admin", number: "1.5", title: "Admin", sub: true },
  { id: "delivery", number: "1.6", title: "Outcome", sub: true },

  { id: "checkout", number: "02", title: "Checkout", theme: "Conversion & Membership" },
  { id: "checkout-problem", number: "2.1", title: "Problem", sub: true },
  { id: "checkout-exploration", number: "2.2", title: "Exploration", sub: true },
  { id: "checkout-experience", number: "2.3", title: "Experience", sub: true },
  { id: "checkout-outcome", number: "2.4", title: "Outcome", sub: true },

  { id: "email-templates", number: "03", title: "Email Templates", theme: "Marketing & Content Systems" },
  { id: "email-problem", number: "3.1", title: "Problem", sub: true },
  { id: "email-system", number: "3.2", title: "System", sub: true },
  { id: "email-outcome", number: "3.3", title: "Outcome", sub: true },

  { id: "homepage", number: "04", title: "Homepage", status: "Soon" },
];
const ch = Object.fromEntries(chapters.map((chapter) => [chapter.id, chapter])) as Record<string, Chapter>;

// The project, shown once in the overview card.
const project = [
  { label: "My role", value: "Product Designer + Frontend" },
  { label: "Timeline", value: "2026 — Present" },
];

/*
 * The scale of LickLibrary itself, for context. These are not results of this work.
 * Placeholders until the real figures are confirmed: just replace the values.
 */
const platform = [
  { value: "5,000+", label: "Active members" },
  { value: "~10,000", label: "Lessons & courses" },
  { value: "34 years", label: "Guitar education" },
];

/*
 * Mega Menu: problem → system → desktop → mobile → admin → outcome. Each section is a headline, a short
 * paragraph and one strong visual; the depth behind it (data model, block types, the full admin feature
 * set) is implied rather than documented.
 */

/*
 * Menu → Tab → Block → Item, walked through on the live Guitar Lessons menu (system-featured.webp, 2446×1200).
 * box: [left, top, width, height] in percent of the screenshot, so the highlights scale with it.
 */
const systemSteps: WalkthroughStep[] = [
  { title: "Menu", note: "One per area of the library", box: [3.2, 8.77, 12.1, 5.71] }, // Guitar Lessons
  { title: "Tab", note: "A way to browse that area", box: [3.2, 18.14, 6.7, 7.6] }, // Featured
  { title: "Block", note: "A group of content inside a tab", box: [40.75, 29.15, 19.95, 61.57] }, // Popular Artists
  { title: "Item", note: "A real lesson, course, artist or tutor", box: [42.4, 34.25, 7.7, 18.14] }, // Skid Row
];

// Live iPhone screenshots, 738×1600.
const tiers: { step: string; line: string; src?: string; video?: string; alt?: string; note: string }[] = [
  {
    step: "Menu",
    line: "The five areas",
    src: `${LL}/mobile-tier-menu.webp`,
    alt: "LickLibrary's mobile menu: Home, Guitar Lessons, Guitar Courses, Backing Tracks, Learning Paths, Tutors, Community and Blog",
    note: "",
  },
  {
    step: "Section",
    line: "One area opened",
    src: `${LL}/mobile-tier-section.webp`,
    alt: "Guitar Courses opened in the mobile menu, listing Featured, New, Classic Albums, Technique and more",
    note: "",
  },
  {
    step: "Category",
    line: "Content to browse",
    src: `${LL}/mobile-tier-category.webp`,
    alt: "Learning Paths inside Guitar Courses on mobile: a grid of featured learning paths with artwork",
    note: "",
  },
];

// Small closing points for the Mega Menu.
const outcomes = ["Live on desktop and mobile", "Managed by the content team", "One reusable structure behind every menu"];

/*
 * Checkout and Email Templates are structure only for now: each section's headline and a note on what it
 * will show. As a section is written up, replace its <DraftSection> with a real <ChapterSection>.
 */
type Draft = { id: string; title: string; label: string; note: string };

const checkoutDraft: Draft[] = [
  { id: "checkout-problem", title: "The existing checkout.", label: "Existing checkout", note: "The current checkout and where it falls short." },
  { id: "checkout-exploration", title: "Competing design directions.", label: "Design directions", note: "The directions explored, and why one went forward." },
  {
    id: "checkout-experience",
    title: "Sell → Simplify → Convert → Celebrate.",
    label: "Checkout flow",
    note: "Each stage of the new flow, including the emphasis on annual membership and the thinking behind Klarna and payment options.",
  },
  { id: "checkout-outcome", title: "The shipped checkout.", label: "Final checkout", note: "The final responsive experience on desktop and mobile, and what it changed." },
];

const emailDraft: Draft[] = [
  { id: "email-problem", title: "Campaign by campaign.", label: "Before the system", note: "How emails were built before the master system." },
  { id: "email-system", title: "A master email system.", label: "Master template", note: "The reusable modules in Campaign Monitor and how they combine." },
  { id: "email-outcome", title: "Campaigns built from the system.", label: "Example campaigns", note: "Emails built from the master template, and what the system changed." },
];

function DraftSection({ id, title, label, note }: Draft) {
  return (
    <ChapterSection chapter={ch[id]} title={title}>
      <Placeholder tag="Write-up needed" label={label} note={note} aspect="16 / 6" />
    </ChapterSection>
  );
}

export default function LickLibraryCaseStudy() {
  return (
    <CasePage tone={night} maxWidth="1240px">
      <ChapterLayout chapters={chapters} title="LickLibrary" accent="#ee7267" panel="#121213" fill="rgb(255 255 255 / 0.05)" className={styles.layout}>
        {/* ───────── 00 Overview: the wider LickLibrary work ───────── */}
        <ChapterHero
          chapter={ch.overview}
          brand={<Image src="/licklibrary-logo.png" alt="LickLibrary" width={597} height={120} preload unoptimized />}
          label="Ongoing product work"
          title={
            <>
              Redesigning LickLibrary,
              <br className={styles.titleBreak} /> one experience at a time.
            </>
          }
          about="LickLibrary is a long-established guitar-learning platform with thousands of lessons, courses and backing tracks."
          role="I lead the UX/UI and frontend implementation, working closely with engineering to design, build and ship improvements across the platform."
        >
          {/* One card: the project, then the platform's scale. */}
          <div className={styles.platformPanel}>
            <dl className={styles.projectInfo}>
              {project.map((item) => (
                <div key={item.label}>
                  <dt className={styles.metaLabel}>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
            <div className={styles.glance}>
              <p className={styles.metaLabel}>Platform at a glance</p>
              <dl className={styles.platform}>
                {platform.map((item) => (
                  <div key={item.label}>
                    <dd>{item.value}</dd>
                    <dt>{item.label}</dt>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </ChapterHero>

        {/* ───────── 01 Mega Menu, opening on the problem ───────── */}
        <ChapterOpener
          chapter={ch["mega-menu"]}
          title="Making thousands of guitar lessons easier to discover."
          intro={
            <p>
              As LickLibrary grew, its navigation became a dense, text-heavy list of links. Finding relevant lessons and courses
              was difficult, with little visual hierarchy to guide discovery.
            </p>
          }
        >
          {/* 1.1 Problem: the old navigation. */}
          <div id="problem" className={styles.problem}>
            <figure className={styles.beforeExamples}>
              <Img {...shot(`${LL}/mega-menu-before.webp`, "LickLibrary's old desktop navigation, with dense columns of text links for guitar lessons", 1585, 992)} />
              <Img {...shot(`${LL}/mobile-menu-before.webp`, "LickLibrary's old mobile navigation showing stacked expandable text categories", 852, 1846)} />
              <figcaption className={styles.beforeCaption}>Before: the previous desktop and mobile navigation.</figcaption>
            </figure>
          </div>
        </ChapterOpener>

        {/* ───────── 1.2 System: one structure behind every menu ───────── */}
        <ChapterSection
          chapter={ch.system}
          title="Designing something that could scale."
          intro={
            <p>
              Rather than designing individual, hard-coded menus, I created one reusable content structure. Every menu is built from
              the same four levels, so a block can present artists, courses, lessons or learning paths without new design or code.
            </p>
          }
        >
          {/* The live menu, with Menu → Tab → Block → Item highlighted in turn. */}
          <Walkthrough
            src={`${LL}/system-featured.webp`}
            width={2446}
            height={1200}
            alt="The live Guitar Lessons mega menu, Featured tab, with Browse, Popular Lessons, Popular Artists and What's Hot"
            steps={systemSteps}
            className={styles.wide}
          />
        </ChapterSection>

        {/* ───────── 1.3 Desktop: the product leads ───────── */}
        <ChapterSection
          chapter={ch.experience}
          title="Browse without leaving the page."
          intro={<p>Tabs turn the menu into a visual catalogue, surfacing courses, artists, tutors and lessons before anyone commits to a page.</p>}
        >
          <Figure caption="The Guitar Lessons mega menu, live on licklibrary.com." className={styles.wide}>
            <Browser
              url="licklibrary.com"
              video={{ src: "/licklibrary/mega-menu.mp4", webmSrc: "/licklibrary/mega-menu.webm", poster: "/licklibrary/mega-menu-poster.webp", width: 1920, height: 1080 }}
              className={styles.megaMenuVideo}
            />
          </Figure>
        </ChapterSection>

        {/* ───────── 1.4 Mobile: Menu → Section → Category ───────── */}
        <ChapterSection
          chapter={ch.mobile}
          title="Rethinking it for mobile."
          intro={
            <p>
              Mobile isn&rsquo;t a smaller desktop menu. It&rsquo;s a three-level drawer built for touch: from the five areas, to one
              area, to the content inside it.
            </p>
          }
        >
          <ol className={`${styles.tiers} ${styles.wide}`} aria-label="Mobile navigation: Menu, Section, Category">
            {tiers.map((tier, i) => (
              <li key={tier.step}>
                <p className={styles.tierLabel}>
                  <span>{i + 1}</span>
                  <strong>{tier.step}</strong>
                  <em>{tier.line}</em>
                </p>
                <div className={styles.phone}>
                  {tier.video ? (
                    <ShowcaseVideo src={tier.video} poster={tier.src ?? `${LL}/live-mobile-menu.webp`} width={900} height={1948} />
                  ) : tier.src ? (
                    <Img {...shot(tier.src, tier.alt ?? `${tier.step}: ${tier.line.toLowerCase()}`, 738, 1600)} aspect="9 / 19.5" position="top" />
                  ) : (
                    <Placeholder label={tier.step} note={tier.note} aspect="9 / 19.5" className={styles.phonePlaceholder} />
                  )}
                </div>
              </li>
            ))}
          </ol>
        </ChapterSection>

        {/* ───────── 1.5 Admin: the team's half of the product ───────── */}
        <ChapterSection
          chapter={ch.admin}
          title="How does the content team control what users see?"
          intro={
            <p>
              The visible navigation was only half the problem. The more flexible the menus became, the more the team needed to
              control tabs, blocks and content themselves, without a developer.
            </p>
          }
        >
          <Figure caption="The mega menu admin editor." className={styles.wide}>
            <Placeholder label="Admin editor" note="A menu open on a tab, showing a block's items with search, drag handles, locks and the randomise toggle." aspect="16 / 9.5" />
          </Figure>
          <p className={styles.ownership}>
            I designed the editor and the menus it controls, built the frontend for both, and worked with LickLibrary&rsquo;s backend
            developer to connect them to the Laravel platform, test against real catalogue data and ship to production.
          </p>
          <p className={styles.stack}>Vue · Tailwind · Laravel</p>
        </ChapterSection>

        {/* ───────── 1.6 Outcome: a short ending, then on to Checkout ───────── */}
        <ChapterSection
          chapter={ch.delivery}
          title="From navigation to discovery."
          intro={
            <p>
              The result is a responsive discovery system across desktop and mobile, backed by a flexible content model the
              LickLibrary team manages themselves. New tabs and blocks go live without frontend changes.
            </p>
          }
        >
          <ul className={styles.outcomes}>
            {outcomes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <NextChapter chapter={ch.checkout} />
        </ChapterSection>

        {/* ───────── 02 Checkout: structure only until the write-up lands ───────── */}
        <ChapterOpener
          chapter={ch.checkout}
          title="Turning checkout into a clearer path to membership."
          intro={<p>Reducing friction between discovering content and purchasing it.</p>}
        />
        {checkoutDraft.map((section) => (
          <DraftSection key={section.id} {...section} />
        ))}

        {/* ───────── 03 Email Templates: structure only until the write-up lands ───────── */}
        <ChapterOpener
          chapter={ch["email-templates"]}
          title="From one-off campaigns to a reusable email system."
          intro={<p>A master email system in Campaign Monitor for campaigns, product launches and customer retention.</p>}
        />
        {emailDraft.map((section) => (
          <DraftSection key={section.id} {...section} />
        ))}

        {/* ───────── 04 Homepage: coming soon ───────── */}
        <ChapterSection
          chapter={ch.homepage}
          lead={<p className={styles.soon}>Coming soon</p>}
          title="Next: Rethinking the LickLibrary homepage"
          intro={<p>Bringing the new navigation, storefront and membership experience together into a clearer entry point for the platform.</p>}
        >
          <Img {...shot(`${LL}/prototype-home.webp`, "An early prototype of the redesigned LickLibrary homepage")} aspect="16 / 9" position="top" />
        </ChapterSection>
      </ChapterLayout>

      <NextProject
        number="02"
        title="Crumble & Co"
        href="/work/crumble-and-co"
        line="Taking a new dog-accessories brand from a logo to a launched Shopify store."
        tone={crumble}
        media={<Browser url="crumbleandco.club" scheme="light" shot={shot("/case/crumble/home-desktop.webp", "Crumble & Co homepage")} />}
      />
    </CasePage>
  );
}
