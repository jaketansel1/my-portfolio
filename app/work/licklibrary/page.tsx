import type { Metadata } from "next";
import Image from "next/image";
import { Browser, CasePage, Figure, Img, NextProject, Phone, Placeholder, type Tone } from "../../../components/case/Case";
import { ChapterHero, ChapterLayout, ChapterOpener, ChapterSection, type Chapter, type Fact } from "../../../components/case/Chapters";
import Lightbox from "../../../components/case/Lightbox";
import ScrollShot from "../../../components/case/ScrollShot";
import StepShowcase, { type ShowcaseStep } from "../../../components/case/StepShowcase";
import ScreenRotator from "../../../components/ScreenRotator";
import { Browser as BrowserFrame } from "../../../components/ui/Device";
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
  { id: "checkout-impact", number: "1.4", title: "Impact", sub: true },
  { id: "checkout-outcome", number: "1.5", title: "Ownership", sub: true },

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

// 1.1 The original sign-up: three problems, each marked on the full page (checkout-old-long.webp: everything below the old
// site's navigation down to Agree and Subscribe; 1360×1803 of the 1440-wide capture). at: [x%, y%] of that page.
// The navigation (checkout-old-nav-crop.webp) is pinned above it; visitors scroll the rest themselves.
// Each marker sits on what its observation is about: 1 where plan selection runs straight into the account form, 2 between
// pricing and benefits, 3 on the dated membership header.
const originalIssues = [
  {
    title: "Too much at once",
    text: "Plan selection, account creation and payment were stacked into one long scrolling experience, with no clear sense of progress.",
    at: [25, 27.9],
  },
  {
    title: "Competing visual hierarchy",
    text: "Pricing, benefits and form fields competed for attention, with little distinction between essential information and supporting details.",
    at: [60.9, 20.1],
  },
  {
    title: "An outdated, inflexible layout",
    text: "The visual design lacked polish, and the layout didn’t make effective use of larger screens.",
    at: [56.5, 7.3],
  },
] as const;

// 1.2 What the checkout gets right, in three short lines under it.
const checkoutObservations = [
  { title: "Best value, made clear", text: "Annual is marked as best value, with the saving shown." },
  { title: "One primary action", text: "Every step ends in a single, clear button." },
  { title: "Consistent progress", text: "The same three-step progress bar throughout, with Back to revisit." },
];

// 1.2 The checkout, Plan → Account → Payment → You’re in, captured at 1440×900. Titles only: the screens tell the story.
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
  {
    title: "You’re in",
    note: "",
    src: `${LL}/checkout-new-complete.webp`,
    alt: "The confirmation after payment: “You’re in!”, with Start learning and Personalise your experience",
  },
];

// 1.3 Where onboarding leads: preferences are captured today; recommendations built on them are the next step.
const learningFlow = [
  { title: "Member preferences", line: "Level, music and goals", built: true },
  { title: "Recommendation logic", line: "Matched to the catalogue", built: false },
  { title: "Personalised learning", line: "Lessons, courses and paths", built: false },
];

// 1.4 What the redesign achieved, as outcomes rather than numbers. No analytics yet, so no metrics.
const impact = [
  { title: "Simpler checkout", text: "One lengthy form replaced with three focused steps." },
  { title: "Clearer decisions", text: "Improved hierarchy around membership plans, account creation and payment." },
  { title: "Connected experience", text: "Optional onboarding creates a foundation for more relevant learning recommendations." },
];

// 1.5 Designed, built and integrated: the three parts of the work.
const ownership = [
  { label: "Designed", text: "End-to-end UX/UI and responsive interfaces." },
  { label: "Built", text: "Frontend implementation using Blade and Alpine.js." },
  { label: "Integrated", text: "Existing authentication, membership pricing, email validation, Stripe payment elements and 1-to-1 booking." },
];

// The overview hero: a quick flick through the strongest LickLibrary screens, dark and light in turn. All 16:10, so none
// is letterboxed: all five are 2880×1800 captures (1440×900 at 2x).
const heroScreens = [
  { src: `${LL}/hero-course-page.webp`, alt: "A LickLibrary course page: Classic Albums – Fair Warning with Sam Bell, with Join LickLibrary Now and Buy This Course" },
  { src: `${LL}/hero-checkout-plan.webp`, alt: "The redesigned checkout, Plan step: monthly and annual plans, annual marked as best value" },
  { src: `${LL}/hero-latest-courses.webp`, alt: "Latest Guitar Courses: a row of course artwork with tutors, levels and prices" },
  { src: `${LL}/hero-checkout-confirmation.webp`, alt: "The checkout confirmation: “You’re in!”, with Start learning and Personalise your experience" },
  { src: `${LL}/hero-mega-courses.webp`, alt: "The Guitar Courses mega menu, Featured tab, with a row of featured course artwork" },
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
              LickLibrary is a guitar-learning platform with thousands of lessons and courses. I lead the UX/UI design and
              frontend development, designing, building and improving experiences across the platform.
            </>
          }
          facts={project}
        >
          {/* A quick flick through the best screens from the LickLibrary work, in one browser frame. */}
          <BrowserFrame url="licklibrary.com" scheme="dark">
            <div className={styles.heroScreens}>
              <ScreenRotator screens={heroScreens} interval={2000} fade={500} width={2400} height={1500} />
            </div>
          </BrowserFrame>
        </ChapterHero>

        {/* ───────── 01 Sign Up & Checkout: straight into the work, no separate chapter intro ───────── */}
        {/* The chapter link ("01") lands here: a marker a pixel above 1.1, so the sidebar still highlights 1.1 once reached. */}
        <span id="checkout" className={styles.chapterAnchor} aria-hidden="true" />

        {/* 1.1 The Problem opens the chapter, labelled with it (01 / Sign Up & Checkout). One static crop of the original
            page, three problems marked. Static on purpose: the redesign that follows moves. */}
        <ChapterSection
          chapter={{ ...ch["checkout-problem"], number: "01", title: "Sign Up & Checkout" }}
          title="A checkout that asked too much, too soon."
          intro={<p>The original checkout felt dated, presented too much at once and lacked a clear visual hierarchy to guide new members.</p>}
        >
          <figure className={styles.original}>
            {/* The whole original page, scrolled by the visitor (no autoplay); the markers travel with it. */}
            <ScrollShot
              src={`${LL}/checkout-old-long.webp`}
              width={2400}
              height={3182}
              aspect="16 / 10"
              stickyTop={{ src: `${LL}/checkout-old-nav-crop.webp`, width: 2400, height: 198 }}
              alt="The original LickLibrary sign-up page, top to bottom: the site navigation, an All Access Membership heading, monthly and annual plan buttons beside a checklist of benefits, an account form, a marketing opt-in, payment methods, card details and Agree and Subscribe."
              markers={originalIssues.map((issue, i) => ({ label: String(i + 1), x: issue.at[0], y: issue.at[1] }))}
              frameClassName={styles.originalFrame}
              markerClassName={styles.marker}
            />
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
          intro={<p>I replaced the lengthy sign-up form with three focused steps, giving members a clearer sense of progress.</p>}
        >
          <StepShowcase url="licklibrary.com" steps={checkoutSteps} width={2400} height={1500} stepMs={2600} label="Checkout steps" compact />
          {/* The same flow on a phone, continuing the desktop showcase: the phone leads, the observations follow. */}
          <div className={styles.checkoutDetail}>
            <Phone
              shot={shot(
                `${LL}/checkout-new-mobile-plan.webp`,
                "The Plan step on a phone: annual and monthly plans stacked, annual marked best value, with Continue with Annual",
                780,
                1688,
              )}
              className={styles.checkoutPhone}
            />
            <div className={styles.checkoutNotes}>
              <p className={styles.metaLabel}>The same flow on mobile</p>
              <ul className={styles.observations}>
                {checkoutObservations.map((item) => (
                  <li key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ChapterSection>

        {/* 1.3 Beyond Checkout: the real onboarding screen leads; one flow line beneath shows where it goes next. */}
        <ChapterSection
          chapter={ch["checkout-personalise"]}
          title="The experience doesn’t end at payment."
          intro={
            <p>
              Optional onboarding captures each member&rsquo;s playing level, musical interests and goals, laying the groundwork for a
              more personalised learning experience.
            </p>
          }
        >
          <figure className={styles.onboarding}>
            <BrowserFrame url="licklibrary.com" scheme="dark">
              <Image
                src={`${LL}/personalise-music.webp`}
                alt="Onboarding, step 2 of 4: “What music do you love?” with Rock, Blues and Classic Rock chosen, ranked 1 to 3"
                width={2400}
                height={1500}
                unoptimized
              />
            </BrowserFrame>
          </figure>
          <ol className={styles.flow} aria-label="Member preferences, then recommendation logic, then personalised learning">
            {learningFlow.map((stage) => (
              <li key={stage.title} data-next={!stage.built || undefined}>
                <span className={styles.flowStatus}>{stage.built ? "Built" : "Next step"}</span>
                <strong>{stage.title}</strong>
                <span className={styles.flowLine}>{stage.line}</span>
              </li>
            ))}
          </ol>
        </ChapterSection>

        {/* 1.4 Impact: three outcomes, stated plainly. No unverified metrics. */}
        <ChapterSection
          chapter={ch["checkout-impact"]}
          title="A simpler path from sign-up to learning."
        >
          <ol className={styles.impact}>
            {impact.map((item, i) => (
              <li key={item.title}>
                <span className={styles.impactIndex}>{String(i + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ol>
        </ChapterSection>

        {/* 1.5 Ownership: the conclusion. A lead statement, then the three parts of the work. */}
        <ChapterSection chapter={ch["checkout-outcome"]} title="Designed beyond the handoff.">
          {/* The statement, and beside it the pull request that shipped the work (opens larger on click). */}
          <div className={styles.ownershipIntro}>
            <p className={styles.ownershipLead}>
              I didn&rsquo;t just design the screens. I owned the UX/UI and the frontend implementation, bringing the new journey into
              LickLibrary&rsquo;s existing Laravel platform.
            </p>
            <Lightbox
              src={`${LL}/checkout-pull-request.webp`}
              width={2870}
              height={1694}
              alt="The pull request for the membership checkout redesign on LickLibrary's repository: what changed, the implementation and its status"
              label="Open the pull request screenshot"
              className={styles.ownershipShot}
            />
          </div>
          <dl className={styles.ownershipCols}>
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
