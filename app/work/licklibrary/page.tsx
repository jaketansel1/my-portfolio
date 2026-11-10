import type { Metadata } from "next";
import Image from "next/image";
import { Browser, CasePage, Figure, Img, NextProject, Phone, type Tone } from "../../../components/case/Case";
import { ChapterHero, ChapterLayout, ChapterOpener, ChapterSection, type Chapter, type Fact } from "../../../components/case/Chapters";
import Lightbox from "../../../components/case/Lightbox";
import PhoneVideo from "../../../components/case/PhoneVideo";
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
 * Menu → Tab → Block → Item, walked through on the live Guitar Lessons menu, New tab (system-menu.webp, 1510×862).
 * box: [left, top, width, height] in percent of the screenshot, so the highlights scale with it.
 */
const systemSteps: WalkthroughStep[] = [
  { title: "Menu", note: "One per area of the library", box: [11.59, 10.21, 13.77, 6.03] }, // Guitar Lessons
  { title: "Tab", note: "A way to browse that area", box: [14.44, 20.65, 4.9, 8.35] }, // New (the open tab)
  { title: "Block", note: "A group of content inside a tab", box: [27.95, 33.87, 67.55, 54.76] }, // Featured
  { title: "Item", note: "A real lesson, course, artist or tutor", box: [28.34, 39.44, 16.36, 23.78] }, // Strange Brew
];

// 2.3 The three principles behind the mobile menu, beside its recording.
const mobilePrinciples = [
  {
    label: "Structure",
    title: "Three levels. One clear path.",
    text: "A simple hierarchy takes members from broad categories to individual lessons, without overwhelming them with options.",
  },
  {
    label: "Motion",
    title: "Transitions that feel natural.",
    text: "Smooth sliding animations connect each navigation level, giving members a clear sense of direction as they move deeper or back through the menu.",
  },
  {
    label: "Discovery",
    title: "More than a list of links.",
    text: "Visual lesson previews bring the catalogue into the navigation, helping members discover content before opening a page.",
  },
];

// 2.5 The same four levels in the admin (admin-system.webp, 2560×1440). box: [left, top, width, height] in percent;
// Block lights two areas, the selected block and its settings.
const adminSteps: WalkthroughStep[] = [
  {
    title: "Menu",
    note: "Manage each area independently.",
    box: [0.9, 46.4, 15.5, 11.91],
  },
  {
    title: "Tab",
    note: "Organise how members browse.",
    box: [21.4, 23.29, 47.0, 6.93],
  },
  {
    title: "Block",
    note: "Build reusable content groups.",
    box: [
      [22.2, 58.67, 18.9, 8.36],
      [45.25, 35.56, 51.5, 18.84],
    ],
  },
  {
    title: "Item",
    note: "Update content without code.",
    box: [45.6, 58.84, 50.8, 40.6],
  },
];

// 2.6 Results, shown like the checkout's (1.4): the figure and its title. text is kept for reference, not shown.
// PLACEHOLDER: these figures are illustrative, not measured. Replace them with real analytics once measured, then set
// OUTCOMES_ARE_PLACEHOLDER to false to remove the on-page note.
const OUTCOMES_ARE_PLACEHOLDER = true;
const outcomes = [
  { value: "+32%", label: "Menu engagement", text: "More visitors interacting with the navigation to explore the catalogue." },
  { value: "+24%", label: "Course discovery", text: "More visitors reaching course and lesson pages through the navigation." },
  { value: "−18%", label: "Navigation exits", text: "Fewer visitors leaving the site after interacting with the menu." },
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

// 1.2 Beside the phone: three short points, title and one line each.
const checkoutObservations = [
  { title: "Value upfront", text: "Annual savings visible alongside the price." },
  { title: "One clear action", text: "A single primary action at every step." },
  { title: "Progress throughout", text: "Three consistent steps, with the ability to go back." },
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

// 1.3 After payment: the personalise questions, captured at 1440×900.
const personaliseSteps: ShowcaseStep[] = [
  {
    title: "Level",
    note: "",
    src: `${LL}/personalise-level.webp`,
    alt: "Personalise, step 1 of 4: “Where are you with your guitar playing?” with five levels, Confident player looking to improve selected",
  },
  {
    title: "Music",
    note: "",
    src: `${LL}/personalise-music.webp`,
    alt: "Personalise, step 2 of 4: “What music do you love?” with Rock, Blues and Classic Rock chosen, ranked 1 to 3",
  },
  {
    title: "Goals",
    note: "",
    src: `${LL}/personalise-goals.webp`,
    alt: "Personalise, step 3 of 4: “What would you love to achieve?” with goals for a confident player, Learn my favourite songs and Join a band chosen",
  },
  {
    title: "1-to-1",
    note: "",
    src: `${LL}/personalise-support.webp`,
    alt: "Personalise, step 4 of 4: “Want to improve even faster?” offering a free 1-to-1 video session, with Book your free 1-to-1 and Finish setup",
  },
  {
    title: "Ready",
    note: "",
    src: `${LL}/personalise-done.webp`,
    alt: "“You're all set!”: the personalised experience is ready, with Start learning",
  },
];

// 1.4 Results.
// PLACEHOLDER: these figures are illustrative, not measured. Replace them with real post-launch analytics before
// publishing, then set IMPACT_IS_PLACEHOLDER to false to remove the on-page note.
const IMPACT_IS_PLACEHOLDER = true;
const impact = [
  { value: "+18%", label: "Checkout conversion" },
  { value: "−25%", label: "Checkout abandonment" },
  { value: "72%", label: "Onboarding completion" },
];

// 1.5 Designed, built, integrated and tested: the four parts of the work.
const ownership = [
  { label: "Designed", text: "End-to-end UX/UI across all devices." },
  { label: "Built", text: "Frontend development with Blade and Alpine.js." },
  { label: "Integrated", text: "Authentication, payments and onboarding." },
  { label: "Tested", text: "Responsive layouts, validation and checkout flows." },
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
          <BrowserFrame scheme="dark" bar={false}>
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
          <StepShowcase bar={false} steps={checkoutSteps} width={2400} height={1500} stepMs={2600} label="Checkout steps" compact />
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

        {/* 1.3 Beyond Checkout: the onboarding, step by step. */}
        <ChapterSection
          chapter={ch["checkout-personalise"]}
          title="Personalisation starts before the first lesson."
          intro={
            <p>
              Optional onboarding captures each member&rsquo;s playing level, musical interests and goals, creating the foundation for a
              more relevant learning experience.
            </p>
          }
        >
          <StepShowcase bar={false} steps={personaliseSteps} width={2400} height={1500} stepMs={2000} label="Personalise steps" compact />
        </ChapterSection>

        {/* 1.4 Impact: three outcomes, stated plainly. No unverified metrics. */}
        <ChapterSection
          chapter={ch["checkout-impact"]}
          title="A smoother path from sign-up to learning."
        >
          <dl className={styles.impact}>
            {impact.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                {/* The figure leads visually (CSS order); the label comes first for assistive tech. */}
                <dd className={styles.impactValue}>{item.value}</dd>
              </div>
            ))}
          </dl>
          <p className={styles.impactSummary}>
            A redesigned checkout that reduces friction, simplifies decisions and lays the groundwork for personalised learning.
          </p>
          {IMPACT_IS_PLACEHOLDER ? <p className={styles.impactNote}>Illustrative placeholder figures, not measured results.</p> : null}
        </ChapterSection>

        {/* 1.5 Ownership: the conclusion. A lead statement, then the three parts of the work. */}
        <ChapterSection chapter={ch["checkout-outcome"]} title="Designed beyond the handoff.">
          {/* The statement, and beside it the pull request that brought the work into the codebase (opens larger on click). */}
          <div className={styles.ownershipIntro}>
            <div className={styles.ownershipText}>
              <p className={styles.ownershipLead}>
                From UX/UI design to frontend implementation, I took ownership of the checkout experience within LickLibrary&rsquo;s
                existing platform.
              </p>
              <dl className={styles.ownershipCols}>
                {ownership.map((item, i) => (
                  <div key={item.label}>
                    <dt>
                      <span>{String(i + 1).padStart(2, "0")} /</span> {item.label}
                    </dt>
                    <dd>{item.text}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <figure className={styles.ownershipEvidence}>
              <Lightbox
                src={`${LL}/checkout-pull-request-crop.webp`}
                width={1800}
                height={1140}
                alt="Pull request #353, feature/membership-checkout-redesign: 162 commits, what changed and the Blade and Alpine.js implementation"
                label="Open the pull request screenshot"
              />
              <figcaption>PR #353 · 162 commits · Laravel</figcaption>
            </figure>
          </div>
        </ChapterSection>

        {/* ───────── 02 Mega Menu, opening on the problem ───────── */}
        <ChapterOpener
          chapter={ch["mega-menu"]}
          title="Making thousands of guitar lessons easier to discover."
          intro={
            <p>
              As LickLibrary&rsquo;s catalogue grew, its text-heavy navigation made lessons harder to discover. The goal was to create a
              clearer, more visual browsing experience.
            </p>
          }
        >
          {/* 2.1 Problem: the old navigation. */}
          <div id="problem" className={styles.problem}>
            <figure className={styles.beforeExamples}>
              <Img {...shot(`${LL}/mega-menu-before.webp`, "LickLibrary's old desktop navigation, with dense columns of text links for guitar lessons", 1527, 956)} />
              <Img {...shot(`${LL}/mobile-menu-before.webp`, "LickLibrary's old mobile navigation showing stacked expandable text categories", 852, 1846)} />
              <figcaption className={styles.beforeCaption}>Before: the previous desktop and mobile navigation. Text only, every link at the same weight.</figcaption>
            </figure>
          </div>
        </ChapterOpener>

        {/* ───────── 2.2 Desktop: the redesign, straight after the before shots ───────── */}
        <ChapterSection
          chapter={ch.experience}
          title="Discover more, without navigating away."
          intro={
            <p>
              A more intuitive way to explore thousands of lessons. Hover to discover top-level categories, then click between tabs to
              browse lessons, courses, artists and tutors.
            </p>
          }
        >
          <Figure className={styles.wide}>
            {/* The recording on its own: it already shows LickLibrary's header, so no browser frame around it. */}
            <div className={styles.megaMenuVideo}>
              <ShowcaseVideo
                src="/licklibrary/mega-menu.mp4"
                webmSrc="/licklibrary/mega-menu.webm"
                poster="/licklibrary/mega-menu-poster.webp"
                width={1920}
                height={1080}
              />
            </div>
          </Figure>
        </ChapterSection>

        {/* ───────── 2.3 Mobile: Menu → Section → Category ───────── */}
        <ChapterSection
          chapter={ch.mobile}
          title="Rethinking it for mobile."
        >
          {/* The recording on its own, centred. Files in public/licklibrary/: mobile-menu-hevc.mp4 (the original HEVC capture,
              for Safari), mobile-menu.mp4 (an H.264 copy for other browsers) and mobile-menu-poster.webp. */}
          <div className={styles.mobileDetail}>
            <PhoneVideo
              sources={[
                { src: "/licklibrary/mobile-menu-hevc.mp4", type: 'video/mp4; codecs="hvc1"' },
                { src: "/licklibrary/mobile-menu.mp4", type: "video/mp4" },
              ]}
              poster="/licklibrary/mobile-menu-poster.webp"
              width={1290}
              height={2796}
              label="Screen recording of the LickLibrary mobile menu: opening the drawer, choosing an area, then browsing a category"
              caption="Mobile navigation in action."
              className={styles.mobileRecording}
            />
            {/* The three principles behind it, beside the recording. */}
            <ol className={styles.mobilePoints}>
              {mobilePrinciples.map((item, i) => (
                <li key={item.label}>
                  <p className={styles.mobilePointLabel}>
                    <span>{String(i + 1).padStart(2, "0")} /</span> {item.label}
                  </p>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </li>
              ))}
            </ol>
          </div>
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
            src={`${LL}/system-menu.webp`}
            width={1510}
            height={862}
            alt="The live Guitar Lessons mega menu, New tab: Browse and Skill Level links on the left, a Featured block of eight lessons with artwork on the right"
            steps={systemSteps}
            className={styles.systemWalk}
          />
        </ChapterSection>

        {/* ───────── 2.5 Admin: one system, managed by the team ───────── */}
        <ChapterSection
          chapter={ch.admin}
          title="The same system, run by the content team."
          intro={
            <p>
              The same Menu → Tab → Block → Item structure powers the admin, giving the content team full control over what appears
              in the navigation, without needing a developer.
            </p>
          }
        >
          {/* The System walkthrough again, on the admin: the same four steps, highlighted where they live in the editor. */}
          <Walkthrough
            src={`${LL}/admin-system.webp`}
            width={2560}
            height={1440}
            alt="The LickLibrary admin editing the Guitar Lessons mega menu: Mega Menu in the sidebar, the tabs (New selected), the New tab's blocks with Featured selected, its settings and its eight draggable, lockable lesson items"
            steps={adminSteps}
            className={styles.systemWalk}
          />
        </ChapterSection>

        {/* ───────── 2.6 Outcome: what was delivered ───────── */}
        <ChapterSection
          chapter={ch.delivery}
          title="From navigation to discovery."
        >
          {/* The same layout as the checkout's results (1.4). */}
          <dl className={styles.impact}>
            {outcomes.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd className={styles.impactValue}>{item.value}</dd>
              </div>
            ))}
          </dl>
          <p className={styles.impactSummary}>
            Turning a text-heavy navigation into a visual discovery experience, helping members explore more content while giving the
            team complete control over what appears.
          </p>
          {OUTCOMES_ARE_PLACEHOLDER ? <p className={styles.impactNote}>Illustrative placeholder figures, not measured results.</p> : null}
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
        compact
        media={<Browser url="crumbleandco.club" scheme="light" shot={shot("/case/crumble/home-desktop.webp", "Crumble & Co homepage")} />}
      />
    </CasePage>
  );
}
