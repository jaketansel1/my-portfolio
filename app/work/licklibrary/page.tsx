import type { Metadata } from "next";
import Image from "next/image";
import { Browser, CasePage, Figure, Img, NextProject, Placeholder, type Tone } from "../../../components/case/Case";
import { ChapterHero, ChapterLayout, ChapterOpener, ChapterSection, type Chapter } from "../../../components/case/Chapters";
import Walkthrough, { type WalkthroughStep } from "../../../components/case/Walkthrough";
import ShowcaseVideo from "../../../components/ShowcaseVideo";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "LickLibrary — Jake Tansel",
  description:
    "Ongoing product work redesigning LickLibrary, one experience at a time: navigation, checkout, email and homepage, from UX and UI to frontend implementation.",
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

  { id: "mega-menu", number: "01", title: "Mega Menu" },
  { id: "problem", number: "1.1", title: "Problem", sub: true },
  { id: "experience", number: "1.2", title: "Desktop", sub: true },
  { id: "mobile", number: "1.3", title: "Mobile", sub: true },
  { id: "system", number: "1.4", title: "System", sub: true },
  { id: "admin", number: "1.5", title: "Admin", sub: true },
  { id: "delivery", number: "1.6", title: "Outcome", sub: true },

  { id: "checkout", number: "02", title: "Checkout" },
  { id: "checkout-problem", number: "2.1", title: "Problem", sub: true },
  { id: "checkout-exploration", number: "2.2", title: "Directions", sub: true },
  { id: "checkout-experience", number: "2.3", title: "Flow", sub: true },
  { id: "checkout-outcome", number: "2.4", title: "Redesign", sub: true },

  { id: "email-templates", number: "03", title: "Email Templates" },
  { id: "email-problem", number: "3.1", title: "Problem", sub: true },
  { id: "email-system", number: "3.2", title: "System", sub: true },
  { id: "email-outcome", number: "3.3", title: "Outcome", sub: true },

  { id: "homepage", number: "04", title: "Homepage", status: "Soon" },
];
const ch = Object.fromEntries(chapters.map((chapter) => [chapter.id, chapter])) as Record<string, Chapter>;

// The project, in one compact row under the intro.
const project = [
  { label: "Role", value: "Product Designer + Frontend" },
  { label: "Scope", value: "Navigation · Checkout · Email · Homepage" },
  { label: "Timeline", value: "2026 — Present" },
];

/*
 * Mega Menu: problem → desktop → mobile → system → admin → outcome. The redesign is revealed straight after the
 * before shots; the structure behind it follows once the reader has seen what it makes. Each section is a headline, a short
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

// What the admin lets the content team do, as shown in the editor above it.
const adminControls = [
  "Tabs and blocks for every menu",
  "Items picked by searching the real catalogue",
  "Drag to reorder, lock to pin in place",
  "Block settings, such as randomised order",
];

// How the Mega Menu ends: what was delivered, not what it might have done.
const outcomes = [
  { title: "Shipped to production", text: "Live on licklibrary.com on desktop and mobile, built inside the existing platform." },
  { title: "Built for the content team", text: "Menus, tabs, blocks and items are managed in the admin. No hard-coded frontend changes." },
  { title: "Designed to scale", text: "One structure presents lessons, courses, artists, tutors and learning paths in every menu." },
];

/*
 * Checkout: a working prototype, not yet live. Sell → Simplify → Convert → Celebrate is the frame; each stage
 * names what it does in the design, as the prototype screens show it.
 */
const stages = [
  { title: "Sell", job: "Show what membership includes before asking for anything.", detail: "The catalogue and its benefits stay in view beside every step." },
  { title: "Simplify", job: "One decision at a time: Plan, then Account, then Payment.", detail: "Monthly or annual, with annual marked as best value." },
  { title: "Convert", job: "A clear final action, with ways to pay that suit the customer.", detail: "Currency selection, with payment methods shown by region." },
  { title: "Celebrate", job: "A welcome, not a receipt.", detail: "Start learning straight away, or personalise recommendations." },
];

// Honest next step for the checkout: what to measure once it's live. No numbers until there are real ones.
const measures = ["Checkout completion, by step", "Monthly vs annual plan mix", "Drop-off between Plan, Account and Payment", "Uptake of personalisation after joining"];

/*
 * Email Templates is structure only for now: each section's headline and a note on what it will show. As a
 * section is written up, replace its <DraftSection> with a real <ChapterSection>.
 */
type Draft = { id: string; title: string; label: string; note: string };

const emailDraft: Draft[] = [
  { id: "email-problem", title: "Campaign by campaign.", label: "Before the system", note: "How emails were built before the master system." },
  { id: "email-system", title: "A master email system.", label: "Master template", note: "The reusable modules in Campaign Monitor and how they combine." },
  { id: "email-outcome", title: "Campaigns built from the system.", label: "Example campaigns", note: "Emails built from the master template, and what the system changed." },
];

function DraftSection({ id, title, label, note }: Draft) {
  return (
    <ChapterSection chapter={ch[id]} title={title}>
      <Placeholder tag="Write-up needed" label={label} note={note} aspect="16 / 4" />
    </ChapterSection>
  );
}

export default function LickLibraryCaseStudy() {
  return (
    <CasePage tone={night} maxWidth="1240px">
      <ChapterLayout chapters={chapters} accent="#ee7267" panel="#121213" fill="rgb(255 255 255 / 0.05)" className={styles.layout}>
        {/* ───────── 00 Overview: the wider LickLibrary work ───────── */}
        <ChapterHero
          chapter={ch.overview}
          brand={<Image src="/licklibrary-logo.png" alt="LickLibrary" width={597} height={120} preload unoptimized />}
          label="Overview"
          title={
            <>
              Redesigning LickLibrary,
              <br className={styles.titleBreak} /> one experience at a time.
            </>
          }
          about={
            <>
              LickLibrary is a long-established guitar-learning platform with thousands of lessons, courses and backing tracks.{" "}
              <span className={styles.roleLine}>
                I lead the UX/UI and frontend implementation, working closely with engineering to design, build and ship
                improvements across the platform.
              </span>
            </>
          }
        >
          <dl className={styles.projectInfo}>
            {project.map((item) => (
              <div key={item.label}>
                <dt className={styles.metaLabel}>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
          {/* The finished product, straight after the intro: a static preview. 1.2 Desktop is the full demonstration. */}
          <figure className={styles.showcase}>
            <Img
              {...shot(
                `${LL}/live-mega-courses.webp`,
                "The redesigned LickLibrary mega menu, Guitar Courses open on the Featured tab, with a row of course artwork",
                2400,
                1500,
              )}
              priority
            />
            <figcaption>The redesigned Guitar Courses menu, live on licklibrary.com.</figcaption>
          </figure>
        </ChapterHero>

        {/* ───────── 01 Mega Menu, opening on the problem ───────── */}
        <ChapterOpener
          chapter={ch["mega-menu"]}
          title="Making thousands of guitar lessons easier to discover."
          intro={
            <>
              <p>
                As LickLibrary grew, its navigation became a dense, text-heavy list of links. Finding relevant lessons and courses
                was difficult, with little visual hierarchy to guide discovery.
              </p>
              <p>The brief: a more visual way to browse the catalogue, taking its cue from the best ecommerce navigation.</p>
            </>
          }
        >
          {/* 1.1 Problem: the old navigation. */}
          <div id="problem" className={styles.problem}>
            <figure className={styles.beforeExamples}>
              <Img {...shot(`${LL}/mega-menu-before.webp`, "LickLibrary's old desktop navigation, with dense columns of text links for guitar lessons", 1585, 992)} />
              <Img {...shot(`${LL}/mobile-menu-before.webp`, "LickLibrary's old mobile navigation showing stacked expandable text categories", 852, 1846)} />
              <figcaption className={styles.beforeCaption}>Before: the previous desktop and mobile navigation. Text only, every link at the same weight.</figcaption>
            </figure>
          </div>
        </ChapterOpener>

        {/* ───────── 1.2 Desktop: the redesign, straight after the before shots ───────── */}
        <ChapterSection
          chapter={ch.experience}
          title="Browse without leaving the page."
          intro={
            <p>
              The redesign replaces the lists with a visual catalogue. Tabs surface courses, artists, tutors and lessons before anyone
              commits to a page.
            </p>
          }
        >
          <Figure caption="The Guitar Lessons mega menu, live on licklibrary.com." className={styles.wide}>
            <Browser
              url="licklibrary.com"
              video={{ src: "/licklibrary/mega-menu.mp4", webmSrc: "/licklibrary/mega-menu.webm", poster: "/licklibrary/mega-menu-poster.webp", width: 1920, height: 1080 }}
              className={styles.megaMenuVideo}
            />
          </Figure>
        </ChapterSection>

        {/* ───────── 1.3 Mobile: Menu → Section → Category ───────── */}
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
          <p className={styles.swipeHint} aria-hidden="true">
            Swipe through the three levels
          </p>
        </ChapterSection>

        {/* ───────── 1.4 System: the one structure behind desktop and mobile ───────── */}
        <ChapterSection
          chapter={ch.system}
          title="Designing something that could scale."
          intro={
            <p>
              Desktop and mobile run on the same thing. Rather than designing individual, hard-coded menus, I created one reusable
              content structure. Every menu is built from the same four levels, so a block can present artists, courses, lessons or
              learning paths without new design or code.
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

        {/* ───────── 1.5 Admin: one system, managed by the team ───────── */}
        <ChapterSection
          chapter={ch.admin}
          title="The same system, run by the content team."
          intro={
            <p>
              The more flexible the menus became, the more the team needed to control them without a developer. The editor mirrors
              the menu itself, Menu → Tab → Block → Item, so a change in the admin is a change on the site.
            </p>
          }
        >
          <Figure className={styles.wide}>
            <p className={styles.panelStep}>
              <span>01</span>Edit: What&rsquo;s Hot in the admin
            </p>
            <Img
              src={`${LL}/admin-editor.webp`}
              alt="The LickLibrary admin editing the Guitar Lessons mega menu: Featured tab, What's Hot block with draggable, lockable lesson items and a lesson search"
              width={2560}
              height={1440}
              className={styles.adminShot}
            />
          </Figure>

          <div className={`${styles.adminResult} ${styles.wide}`}>
            <Figure>
              <p className={styles.panelStep}>
                <span>02</span>Live: the same block on licklibrary.com
              </p>
              <Img
                src={`${LL}/live-whats-hot.webp`}
                alt="The What's Hot block in the live Guitar Lessons menu, showing Surfing With The Alien by Joe Satriani"
                width={810}
                height={600}
                className={styles.liveShot}
              />
            </Figure>
            <div className={styles.adminNotes}>
              <p className={styles.metaLabel}>What the team controls</p>
              <ul className={styles.controlList}>
                {adminControls.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className={styles.ownership}>
                I designed the editor and the menus it controls, built the frontend for both, and worked with LickLibrary&rsquo;s
                backend developer to connect them to the Laravel platform, test against real catalogue data and ship to production.
              </p>
              <p className={styles.stack}>Vue · Tailwind · Laravel</p>
            </div>
          </div>
        </ChapterSection>

        {/* ───────── 1.6 Outcome: what was delivered ───────── */}
        <ChapterSection
          chapter={ch.delivery}
          title="From navigation to discovery."
          intro={<p>A responsive discovery system across desktop and mobile, run by the team that owns the content.</p>}
        >
          <ul className={styles.outcomes}>
            {outcomes.map((item, i) => (
              <li key={item.title}>
                <span className={styles.outcomeIndex}>{String(i + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </ChapterSection>

        {/* ───────── 02 Checkout: a working prototype ───────── */}
        <ChapterOpener
          chapter={ch.checkout}
          title="Turning checkout into a clearer path to membership."
          intro={
            <>
              <p>
                With discovery improved, the next step was the journey from finding a lesson to becoming a member.
              </p>
              <p>
                I&rsquo;m designing and building a new membership checkout: a focused, three-step flow that keeps selling the
                membership while it takes the order.
              </p>
            </>
          }
        >
          <p className={styles.status}>Working prototype · In development</p>
        </ChapterOpener>

        {/* 2.1 The existing checkout. */}
        <ChapterSection
          chapter={ch["checkout-problem"]}
          title="The existing checkout."
          intro={<p>Membership is where discovery becomes revenue, so the route to it needs to be as clear as the catalogue behind it.</p>}
        >
          <div className={`${styles.beforeExamples} ${styles.wide}`}>
            <Placeholder
              label="Previous checkout, desktop"
              note="The old plan selection through to payment, as one full-page capture. Mark the two or three points where it asks too much or explains too little."
              aspect="1585 / 992"
              spec="16:10 · 2560×1600"
            />
            <Placeholder label="Previous checkout, mobile" note="The same step on a phone." aspect="852 / 1846" spec="9:19.5 · 1170×2532" className={styles.phonePlaceholder} />
          </div>
        </ChapterSection>

        {/* 2.2 Comparing design directions. */}
        <ChapterSection
          chapter={ch["checkout-exploration"]}
          title="Comparing design directions."
          intro={
            <p>
              The direction taken forward pairs the membership proposition with a progressive purchase: what you get on one side, one
              decision at a time on the other. The reasons to join stay in view right up to payment.
            </p>
          }
        >
          <div className={`${styles.directions} ${styles.wide}`}>
            <div>
              <p className={styles.panelStep}>
                <span>A</span>Explored
              </p>
              <Placeholder
                label="An alternative direction"
                note="A direction you didn't take forward, such as a single-page form or a plans page before checkout. One line on what it did well and why it lost."
                aspect="16 / 10"
                spec="16:10 · 2560×1600"
              />
            </div>
            <div>
              <p className={styles.panelStep}>
                <span>B</span>Taken forward
              </p>
              <Placeholder
                label="Early split layout"
                note="An early version of the chosen layout, so the step from first idea to final design is visible."
                aspect="16 / 10"
                spec="16:10 · 2560×1600"
              />
            </div>
          </div>
        </ChapterSection>

        {/* 2.3 Sell → Simplify → Convert → Celebrate. */}
        <ChapterSection
          chapter={ch["checkout-experience"]}
          title="Sell → Simplify → Convert → Celebrate."
          intro={<p>Each stage of the checkout has one job.</p>}
        >
          <ol className={`${styles.stages} ${styles.wide}`}>
            {stages.map((stage, i) => (
              <li key={stage.title}>
                <span className={styles.outcomeIndex}>{String(i + 1).padStart(2, "0")}</span>
                <h3>{stage.title}</h3>
                <p>{stage.job}</p>
                <p className={styles.stageDetail}>{stage.detail}</p>
              </li>
            ))}
          </ol>
          <div className={`${styles.directions} ${styles.wide} ${styles.stageShots}`}>
            <div>
              <p className={styles.panelStep}>
                <span>02</span>Simplify: Account
              </p>
              <Placeholder
                label="Account step"
                note="The Account step of the prototype, with the progress bar showing Plan complete."
                aspect="16 / 9"
                spec="16:9 · 2560×1440"
              />
            </div>
            <div>
              <p className={styles.panelStep}>
                <span>03</span>Convert: Payment
              </p>
              <Placeholder
                label="Payment step"
                note="The Payment step with the currency selector open, showing how the payment methods change by region."
                aspect="16 / 9"
                spec="16:9 · 2560×1440"
              />
            </div>
          </div>
        </ChapterSection>

        {/* 2.4 The redesigned checkout: the climax of the chapter. */}
        <ChapterSection
          chapter={ch["checkout-outcome"]}
          title="The redesigned checkout."
          intro={
            <p>
              Membership on one side, one decision at a time on the other, from choosing a plan to the first lesson. Responsive from
              the start, on desktop and mobile.
            </p>
          }
        >
          <div className={`${styles.checkoutHero} ${styles.wide}`}>
            <Figure caption="Plan: monthly or annual, with annual marked as best value.">
              <Img
                src="/licklibrary/home-checkout.webp"
                alt="The redesigned LickLibrary checkout, Plan step: membership benefits on the left, monthly and annual plans on the right with annual selected as best value"
                width={2560}
                height={1440}
                className={styles.adminShot}
              />
            </Figure>
            <div className={styles.checkoutPhone}>
              <Placeholder
                label="Plan step, mobile"
                note="The same step on a phone, with the plan cards stacked."
                aspect="9 / 19.5"
                spec="1170×2532"
                className={styles.phonePlaceholder}
              />
            </div>
          </div>
          <Figure caption="Celebrate: a welcome that leads straight into learning, or into personalising the membership." className={`${styles.wide} ${styles.followOn}`}>
            <Img
              src="/licklibrary/home-confirmation.webp"
              alt="The checkout confirmation: “You're in!”, with Start learning and Personalise your experience"
              width={2560}
              height={1440}
              className={styles.adminShot}
            />
          </Figure>
          <div className={styles.measure}>
            <p className={styles.metaLabel}>What I&rsquo;ll measure once it&rsquo;s live</p>
            <ul>
              {measures.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </ChapterSection>

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
