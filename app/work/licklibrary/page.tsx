import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { Browser, CasePage, Figure, Img, NextProject, Placeholder, type Tone } from "../../../components/case/Case";
import { Bridge, ChapterHero, ChapterLayout, ChapterOpener, ChapterSection, Insight, Panel, Subhead, type Chapter } from "../../../components/case/Chapters";
import NextChapter from "../../../components/case/NextChapter";
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
  { id: "experience", number: "1.3", title: "Experience", sub: true },
  { id: "delivery", number: "1.4", title: "Delivery", sub: true },

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
 * Mega Menu. The chapter surfaces only the strongest parts of the story; the depth behind it
 * (data model, every block type, the full admin feature set) is implied rather than documented.
 */

// Menu → Tab → Block → Item, each with the same path through the live Guitar Lessons menu.
const levels = [
  { name: "Menu", role: "One per area of the library", example: "Guitar Lessons" },
  { name: "Tab", role: "A way to browse that area", example: "Featured" },
  { name: "Block", role: "A group of content inside a tab", example: "Popular artists" },
  { name: "Item", role: "A real lesson, course, artist or tutor", example: "John Mayer" },
];

// A few of the presentations a block can take, drawn as small abstract pictures.
const presentations: { title: string; art: ReactNode }[] = [
  { title: "Artist grids", art: <span className={styles.circles}><b /><b /><b /></span> },
  { title: "Course cards", art: <span className={styles.squares}><b /><b /><b /></span> },
  { title: "Lesson lists", art: <span className={styles.lines}><i /><i /><i /></span> },
  { title: "Learning paths", art: <span className={styles.steps}><b /><b /><b /><b /></span> },
  { title: "Backing tracks", art: <span className={styles.wave}>{[40, 75, 55, 95, 65, 85, 45, 70, 35].map((h, i) => <b key={i} style={{ height: `${h}%` }} />)}</span> },
];

const tiers: { step: string; line: string; src?: string; video?: string; note: string }[] = [
  { step: "Main", line: "The five areas", src: `${LL}/live-mobile-menu.webp`, note: "" },
  { step: "Section", line: "One area opened", note: "e.g. Guitar Lessons. Can also hold the interaction recording: tap → slide → tap → slide → back." },
  { step: "Category", line: "Content to browse", note: "e.g. Featured, with its content." },
];

const flow = ["Design", "Frontend", "Backend integration", "QA", "Production"];

const outcomes = [
  { title: "For customers", text: "A clearer, more visual way to discover LickLibrary’s catalogue." },
  { title: "For the team", text: "A reusable navigation system that can be managed without frontend changes." },
];

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
          title="Redesigning LickLibrary, one experience at a time."
          about="LickLibrary is a long-established guitar-learning platform with thousands of lessons, courses and backing tracks."
          role="I’m working through the product feature by feature. I own the UX/UI and frontend implementation, and collaborate with LickLibrary’s backend developer to ship each piece into production."
          facts={[
            { label: "My role", value: "Product Designer + Frontend" },
            { label: "Disciplines", value: "UX/UI · Frontend · eCommerce · Email" },
            { label: "Timeline", value: "2026 — Present" },
            { label: "Status", value: "Ongoing — updated as each experience ships", live: true },
          ]}
        >
          <div className={styles.overviewMeta}>
            <div className={styles.platformPanel}>
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
            <div className={styles.businessModel}>
              <h2 className={styles.metaLabel}>Business model</h2>
              <h3 className={styles.businessTitle}>Membership + individual purchases</h3>
              <p>
                Subscribers can access the wider catalogue through membership, while courses and lessons can also be purchased
                individually.
              </p>
            </div>
          </div>
        </ChapterHero>

        {/* ───────── 01 Mega Menu: the first initiative ───────── */}
        <ChapterOpener
          chapter={ch["mega-menu"]}
          title="Making thousands of guitar lessons easier to discover."
          intro={
            <p>
              I redesigned LickLibrary&rsquo;s navigation into a visual discovery system across desktop and mobile, then designed and
              built the internal tools that let the team manage it.
            </p>
          }
          facts={[
            { label: "Scope", value: "UX/UI · Frontend · Admin" },
            { label: "Shipped", value: "2026" },
            { label: "Status", value: "Live", live: true },
          ]}
        />

        {/* ───────── 1.1 Problem: before → problem → opportunity ───────── */}
        <ChapterSection
          chapter={ch.problem}
          title={<>Too much content.<br />Not enough hierarchy.</>}
          intro={
            <p>
              As LickLibrary&rsquo;s catalogue grew, navigation had become a dense list of links. The original brief was to make it
              more visual, using ecommerce experiences such as ASOS as inspiration.
            </p>
          }
        >
          <figure className={styles.beforeExamples}>
            <Img {...shot(`${LL}/mega-menu-before.webp`, "LickLibrary's old desktop navigation, with dense columns of text links for guitar lessons", 1585, 992)} />
            <Img {...shot(`${LL}/mobile-menu-before.webp`, "LickLibrary's old mobile navigation showing stacked expandable text categories", 852, 1846)} />
            <figcaption className={styles.beforeCaption}>Before: the previous desktop and mobile navigation.</figcaption>
          </figure>

          <Insight label="The opportunity">
            Rethink navigation as a discovery experience, helping members browse courses, artists, tutors and lessons directly from the
            menu.
          </Insight>
        </ChapterSection>

        {/* ───────── 1.2 System: one structure, many presentations ───────── */}
        <ChapterSection
          chapter={ch.system}
          title="Designing something that could scale."
          intro={
            <p>
              The Mega Menu couldn&rsquo;t be a collection of hard-coded layouts. LickLibrary needed one reusable system that could
              present very different kinds of catalogue content.
            </p>
          }
        >
          <Panel>
            <ol className={styles.hierarchy} aria-label="Menu, then tab, then block, then item">
              {levels.map((level, i) => (
                <li key={level.name}>
                  <span className={styles.levelIndex}>{String(i + 1).padStart(2, "0")}</span>
                  <strong>{level.name}</strong>
                  <span className={styles.levelRole}>{level.role}</span>
                  <span className={styles.levelExample} data-last={i === levels.length - 1 || undefined}>
                    {i === levels.length - 1 ? <span className={styles.avatar} aria-hidden="true" /> : null}
                    {level.example}
                  </span>
                </li>
              ))}
            </ol>
          </Panel>

          <Subhead title="One structure, many presentations.">
            <p>
              Each block could use a different presentation while sharing the same underlying structure, giving the team flexibility
              without requiring a new menu to be designed or built each time.
            </p>
          </Subhead>
          <ul className={styles.presentations}>
            {presentations.map((item) => (
              <li key={item.title}>
                <div className={styles.presentationArt} aria-hidden="true">
                  {item.art}
                </div>
                {item.title}
              </li>
            ))}
          </ul>
        </ChapterSection>

        {/* ───────── 1.3 Experience: desktop → mobile → admin ───────── */}
        <ChapterSection
          chapter={ch.experience}
          title="Browse without leaving the page."
          intro={
            <p>
              Tabs turn the navigation into a visual catalogue, surfacing courses, artists, tutors and lessons before the user commits
              to a destination.
            </p>
          }
        >
          <Figure caption="The Guitar Lessons mega menu, live on licklibrary.com.">
            <Browser
              url="licklibrary.com"
              video={{ src: "/licklibrary/mega-menu.mp4", webmSrc: "/licklibrary/mega-menu.webm", poster: "/licklibrary/mega-menu-poster.webp", width: 1920, height: 1080 }}
              className={styles.megaMenuVideo}
            />
          </Figure>

          <Subhead title="Rethinking it for mobile.">
            <p>
              Mobile is its own interaction, not a smaller desktop menu: a progressive, three-level drawer built for touch, moving from
              the five areas, to one area, to the content inside it.
            </p>
          </Subhead>
          <div className={styles.mobileStage}>
            <ol className={styles.tiers} aria-label="Mobile navigation: Main, Section, Category">
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
                      <Img {...shot(tier.src, `${tier.step}: ${tier.line.toLowerCase()}`, 900, 1948)} aspect="9 / 19.5" position="top" />
                    ) : (
                      <Placeholder label={tier.step} note={tier.note} aspect="9 / 19.5" className={styles.phonePlaceholder} />
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* The admin: the reveal, and the team's half of the experience */}
          <div className={styles.adminLead}>
            <Bridge lead="The navigation worked. But it created another problem." question="How does the content team control what users see?" />
            <Subhead title="Designing the hidden half of the product.">
              <p>
                The more flexible the menus became, the harder they would be to manage by hand. So I designed an editor that lets the
                team build tabs, choose block types, select content, reorder sections and manage randomised content pools, without
                touching frontend code.
              </p>
            </Subhead>
          </div>
          <Figure caption="The mega menu admin editor.">
            <Placeholder label="Admin editor" note="A menu open on a tab, showing a block's items with search, drag handles, locks and the randomise toggle." aspect="16 / 9.5" />
          </Figure>
        </ChapterSection>

        {/* ───────── 1.4 Delivery: how it shipped, then what it changed ───────── */}
        <ChapterSection
          chapter={ch.delivery}
          title="From prototype to production."
          intro={
            <>
              <p>
                I owned the UX, UI and frontend implementation, working directly with LickLibrary&rsquo;s backend developer to connect
                the new navigation to the existing Laravel platform and admin tooling.
              </p>
              <p>The system was tested across desktop and mobile, iterated against real catalogue data and shipped into the production product.</p>
            </>
          }
        >
          <ol className={styles.flow} aria-label="Design, frontend, backend integration, QA, production">
            {flow.map((step, i) => (
              <li key={step}>
                <span className={styles.levelIndex}>{String(i + 1).padStart(2, "0")}</span>
                {step}
              </li>
            ))}
          </ol>
          <p className={styles.stack}>Vue · Tailwind · Laravel</p>

          <dl className={styles.outcomes}>
            {outcomes.map((item) => (
              <div key={item.title}>
                <dt>{item.title}</dt>
                <dd>{item.text}</dd>
              </div>
            ))}
          </dl>

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
