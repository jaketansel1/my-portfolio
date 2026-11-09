import type { Metadata } from "next";
import Image from "next/image";
import { Browser, CasePage, Figure, Img, NextProject, Placeholder, type Tone } from "../../../components/case/Case";
import { ChapterHero, ChapterLayout, ChapterOpener, ChapterSection, type Chapter, type Fact } from "../../../components/case/Chapters";
import StepShowcase, { type ShowcaseStep } from "../../../components/case/StepShowcase";
import Walkthrough, { type WalkthroughStep } from "../../../components/case/Walkthrough";
import ShowcaseVideo from "../../../components/ShowcaseVideo";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "LickLibrary — Jake Tansel",
  description:
    "Ongoing product work redesigning LickLibrary, one experience at a time: navigation, checkout and homepage, from UX and UI to frontend implementation.",
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
 * Sign Up & Checkout leads, then Mega Menu. The Mega Menu sections keep their original ids so existing links
 * and styles still hold; the other chapters prefix theirs.
 */
const chapters: Chapter[] = [
  { id: "overview", number: "00", title: "Overview" },

  { id: "checkout", number: "01", title: "Sign Up & Checkout" },
  { id: "checkout-problem", number: "1.1", title: "Problem", sub: true },
  { id: "checkout-direction", number: "1.2", title: "Direction", sub: true },
  { id: "checkout-personalise", number: "1.3", title: "Beyond checkout", sub: true },
  { id: "checkout-outcome", number: "1.4", title: "Ownership", sub: true },

  { id: "mega-menu", number: "02", title: "Mega Menu" },
  { id: "problem", number: "2.1", title: "Problem", sub: true },
  { id: "experience", number: "2.2", title: "Desktop", sub: true },
  { id: "mobile", number: "2.3", title: "Mobile", sub: true },
  { id: "system", number: "2.4", title: "System", sub: true },
  { id: "admin", number: "2.5", title: "Admin", sub: true },
  { id: "delivery", number: "2.6", title: "Outcome", sub: true },

  { id: "homepage", number: "03", title: "Homepage", status: "Soon" },
];
const ch = Object.fromEntries(chapters.map((chapter) => [chapter.id, chapter])) as Record<string, Chapter>;

// The project, in one compact row under the intro.
const project: Fact[] = [
  { label: "Role", value: "Product Designer + Frontend" },
  { label: "Scope", value: "Navigation · Checkout · Homepage" },
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
 * Sign Up & Checkout. Every screen below is a capture: the original from licklibrary.com/sign-up/monthly, the redesign
 * from the build (/checkout-new), walked with nothing submitted, charged or created. No live claims, no metrics.
 * One headline, one short paragraph, one visual per section.
 */

// 1.1 The original sign-up: three problems, each marked on the page (percent of checkout-old-desktop.webp, 1440×900).
const originalIssues = [
  { title: "Membership undersold", text: "A generic header and a plain checklist did little to show what members get.", at: [55, 27] },
  { title: "Competing information", text: "Plan choice, the account form and the benefits all ask to be read first.", at: [60.3, 52.7] },
  { title: "No sense of progression", text: "The account form is only the start: consent, payment and card details follow in one long page.", at: [23.5, 68.3] },
] as const;

// 1.2 The new journey: the checkout itself, then onboarding after purchase.
const journey = [
  { group: "Checkout", steps: [
    { name: "Plan", line: "Monthly or annual" },
    { name: "Account", line: "Create one, or sign in" },
    { name: "Payment", line: "Choose how to pay" },
  ] },
  { group: "After purchase", steps: [{ name: "Personalise", line: "Shape what comes next" }] },
];

// 1.2 The checkout, Plan → Account → Payment, captured at 1440×900. Titles only: the journey above explains each step.
const checkoutSteps: ShowcaseStep[] = [
  {
    title: "Plan",
    note: "",
    src: `${LL}/checkout-new-plan.webp`,
    alt: "Plan step: the All Access membership and its benefits on the left; monthly and annual plans on the right, annual selected as best value",
  },
  {
    title: "Account",
    note: "",
    src: `${LL}/checkout-new-account.webp`,
    alt: "Account step: name, email and password, a sign-in link for returning members, and the chosen annual plan summarised below",
  },
  {
    title: "Payment",
    note: "",
    src: `${LL}/checkout-new-payment.webp`,
    alt: "Payment step: the annual membership summary, payment methods (card, PayPal, Klarna), the card details field and Start membership",
  },
];

// 1.3 After payment: the personalise questions, captured at 1440×900.
const personaliseSteps: ShowcaseStep[] = [
  {
    title: "Level",
    note: "Where they are with their playing",
    src: `${LL}/personalise-level.webp`,
    alt: "Personalise, step 1 of 4: “Where are you with your guitar playing?” with five levels, Confident player looking to improve selected",
  },
  {
    title: "Music",
    note: "Up to three genres, favourite first",
    src: `${LL}/personalise-music.webp`,
    alt: "Personalise, step 2 of 4: “What music do you love?” with Rock, Blues and Classic Rock chosen, ranked 1 to 3",
  },
  {
    title: "Goals",
    note: "Goals that fit their level",
    src: `${LL}/personalise-goals.webp`,
    alt: "Personalise, step 3 of 4: “What would you love to achieve?” with goals for a confident player, Learn my favourite songs and Join a band chosen",
  },
  {
    title: "1-to-1",
    note: "A free video session with a LickLibrary pro",
    src: `${LL}/personalise-support.webp`,
    alt: "Personalise, step 4 of 4: “Want to improve even faster?” offering a free 1-to-1 video session, with Book your free 1-to-1 and Finish setup",
  },
  {
    title: "Ready",
    note: "Straight into learning",
    src: `${LL}/personalise-done.webp`,
    alt: "“You're all set!”: the personalised experience is ready, with Start learning",
  },
];

// 1.4 Designed, built and integrated: what I did, in those three words.
const ownership = [
  { label: "Designed", text: "The end-to-end journey, from choosing a plan through payment and into onboarding, for desktop and mobile." },
  { label: "Built", text: "The frontend for every step, in Blade and Alpine.js inside the existing Laravel platform." },
  {
    label: "Integrated",
    text: "With the site’s own sign-in for returning members, its country-based pricing and currencies, ZeroBounce email validation, a Stripe card field and the existing 1-to-1 booking.",
  },
];

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
              I lead the UX/UI and frontend implementation, working closely with engineering to design, build and ship
              improvements across the platform.
            </>
          }
          facts={project}
        >
          {/* The lead experience, straight after the intro: the redesigned checkout. 1.4 Redesign shows it in full. */}
          <figure className={styles.showcase}>
            <Img
              {...shot(
                "/licklibrary/home-checkout.webp",
                "The redesigned LickLibrary membership checkout, Plan step: membership benefits on the left, monthly and annual plans on the right with annual selected as best value",
                2560,
                1440,
              )}
              priority
            />
            <figcaption>The redesigned membership checkout: choosing a plan, with annual marked as best value.</figcaption>
          </figure>
        </ChapterHero>

        {/* ───────── 01 Sign Up & Checkout ───────── */}
        <ChapterOpener
          chapter={ch.checkout}
          title="Turning checkout into a clearer path to membership."
          intro={
            <p>
              I redesigned the membership journey around three focused steps — Plan, Account and Payment — followed by personalised
              onboarding to help new members start learning.
            </p>
          }
        >
          <p className={styles.roleLine}>UX/UI design · Frontend development · Integration</p>
        </ChapterOpener>

        {/* 1.1 The Problem: the original sign-up page, three problems marked. */}
        <ChapterSection
          chapter={ch["checkout-problem"]}
          title="A checkout that asked too much, too soon."
          intro={<p>The original sign-up asked for everything at once, with nothing guiding a new member through it.</p>}
        >
          <figure className={styles.original}>
            <span className={styles.originalFrame}>
              <Image
                src={`${LL}/checkout-old-desktop.webp`}
                alt="The original LickLibrary sign-up page: a generic membership header, monthly and annual plan buttons, the start of an account form and a checklist of membership benefits"
                width={2880}
                height={1800}
                unoptimized
              />
              {originalIssues.map((issue, i) => (
                <span key={issue.title} className={styles.marker} style={{ left: `${issue.at[0]}%`, top: `${issue.at[1]}%` }} aria-hidden="true">
                  {i + 1}
                </span>
              ))}
            </span>
            <figcaption>
              <ol className={styles.issues}>
                {originalIssues.map((issue, i) => (
                  <li key={issue.title}>
                    <span className={styles.issueIndex}>{i + 1}</span>
                    <h3>{issue.title}</h3>
                    <p>{issue.text}</p>
                  </li>
                ))}
              </ol>
            </figcaption>
          </figure>
        </ChapterSection>

        {/* 1.2 The Direction: the new journey, then the checkout itself. */}
        <ChapterSection
          chapter={ch["checkout-direction"]}
          title="One decision at a time."
          intro={<p>Instead of one long form, each step asks for a single decision before moving on.</p>}
        >
          <ol className={styles.journey} aria-label="Plan, then Account, then Payment, then Personalise">
            {journey.map((group, g) => (
              <li key={group.group} className={styles.journeyGroup} data-after={g > 0 || undefined}>
                <p className={styles.metaLabel}>{group.group}</p>
                <ol className={styles.journeySteps}>
                  {group.steps.map((s) => {
                    const n = journey.slice(0, g).reduce((sum, prev) => sum + prev.steps.length, 0) + group.steps.indexOf(s) + 1;
                    return (
                      <li key={s.name}>
                        <span className={styles.journeyIndex}>{String(n).padStart(2, "0")}</span>
                        <strong>{s.name}</strong>
                        <span>{s.line}</span>
                      </li>
                    );
                  })}
                </ol>
              </li>
            ))}
          </ol>
          <StepShowcase
            url="licklibrary.com"
            steps={checkoutSteps}
            width={2400}
            height={1500}
            stepMs={2800}
            label="Checkout steps"
            compact
            className={styles.showcaseAfterJourney}
          />
        </ChapterSection>

        {/* 1.3 Beyond Checkout: personalised onboarding, and the one decision worth showing. */}
        <ChapterSection
          chapter={ch["checkout-personalise"]}
          title="The experience doesn’t end at payment."
          intro={
            <p>
              After payment, four optional questions shape each member&rsquo;s recommendations and lead straight into learning: a first
              meaningful step, not just a completed purchase.
            </p>
          }
        >
          <StepShowcase url="licklibrary.com" steps={personaliseSteps} width={2400} height={1500} stepMs={2000} label="Personalise steps" />
          <div className={styles.adaptive}>
            <div className={styles.adaptiveText}>
              <p className={styles.metaLabel}>One decision in detail</p>
              <h3>Goals adapt to the member&rsquo;s level.</h3>
              <p>A beginner is offered their first chords and scales; a confident player skips straight past them.</p>
            </div>
            <figure className={styles.adaptiveShot}>
              <Image
                src={`${LL}/personalise-goals-beginner.webp`}
                alt="Goals for a beginner: Learn my first chords and Learn scales first, then eight more goals"
                width={1000}
                height={926}
                unoptimized
              />
              <figcaption>Just starting out</figcaption>
            </figure>
            <figure className={styles.adaptiveShot}>
              <Image
                src={`${LL}/personalise-goals-confident.webp`}
                alt="Goals for a confident player: the same list without Learn my first chords and Learn scales"
                width={1000}
                height={926}
                unoptimized
              />
              <figcaption>Confident player</figcaption>
            </figure>
          </div>
        </ChapterSection>

        {/* 1.4 Ownership & Outcome: designed, built and integrated. */}
        <ChapterSection
          chapter={ch["checkout-outcome"]}
          title="Designed, built and integrated."
          intro={<p>I took the checkout from design to working frontend, inside the platform it runs on.</p>}
        >
          <dl className={styles.ownership}>
            {ownership.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.text}</dd>
              </div>
            ))}
          </dl>
          <p className={styles.stack}>Laravel · Blade · Alpine.js · Stripe Elements</p>
        </ChapterSection>

        {/* ───────── 02 Mega Menu, opening on the problem ───────── */}
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
          {/* 2.1 Problem: the old navigation. */}
          <div id="problem" className={styles.problem}>
            <figure className={styles.beforeExamples}>
              <Img {...shot(`${LL}/mega-menu-before.webp`, "LickLibrary's old desktop navigation, with dense columns of text links for guitar lessons", 1585, 992)} />
              <Img {...shot(`${LL}/mobile-menu-before.webp`, "LickLibrary's old mobile navigation showing stacked expandable text categories", 852, 1846)} />
              <figcaption className={styles.beforeCaption}>Before: the previous desktop and mobile navigation. Text only, every link at the same weight.</figcaption>
            </figure>
          </div>
        </ChapterOpener>

        {/* ───────── 2.2 Desktop: the redesign, straight after the before shots ───────── */}
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

        {/* ───────── 2.3 Mobile: Menu → Section → Category ───────── */}
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

        {/* ───────── 2.4 System: the one structure behind desktop and mobile ───────── */}
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

        {/* ───────── 2.5 Admin: one system, managed by the team ───────── */}
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

        {/* ───────── 2.6 Outcome: what was delivered ───────── */}
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

        {/* ───────── 03 Homepage: coming soon ───────── */}
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
