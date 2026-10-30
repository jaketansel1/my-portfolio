import type { Metadata } from "next";
import Image from "next/image";
import { Browser, CasePage, Figure, Img, NextProject, Placeholder, type Tone } from "../../../components/case/Case";
import {
  Block,
  Bridge,
  ChapterHero,
  ChapterLayout,
  ChapterSection,
  ChipGroups,
  Insight,
  Lists,
  Pair,
  Panel,
  PanelLabel,
  Points,
  Subhead,
  type Chapter,
} from "../../../components/case/Chapters";
import MenuExplorer from "./MenuExplorer";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "LickLibrary Mega Menu — Jake Tansel",
  description:
    "Redesigning LickLibrary's navigation into a visual discovery system across desktop and mobile, from UX and system design to the admin tooling and production frontend.",
};

const night: Tone = { bg: "#0a0a0a", fg: "#f3f2ee", muted: "rgb(243 242 238 / 0.62)" };
const crumble: Tone = { bg: "#efe4d4", fg: "#3d2314", muted: "rgb(61 35 20 / 0.66)" };

const LL = "/case/licklibrary";
const shot = (src: string, alt: string, width = 2400, height = 1500) => ({ src, alt, width, height });

const chapters: Chapter[] = [
  { id: "overview", number: "01", title: "Overview" },
  { id: "problem", number: "02", title: "Problem" },
  { id: "system", number: "03", title: "System" },
  { id: "experience", number: "04", title: "Experience" },
  { id: "admin", number: "05", title: "Admin" },
  { id: "build", number: "06", title: "Build" },
  { id: "outcome", number: "07", title: "Outcome" },
  { id: "next", number: "08", title: "What’s Next" },
];
const [overview, problem, system, experience, admin, build, outcome, next] = chapters;

const menus = [
  {
    key: "lessons",
    title: "Guitar Lessons",
    src: `${LL}/live-mega-lessons.webp`,
    source: "Live, licklibrary.com",
    tabs: "Featured · New · Song Lessons · Genres · Artists · Tutors · Most Watched",
    blocks: ["Browse & skill level", "Popular lessons", "Popular artists", "What's hot"],
  },
  {
    key: "courses",
    title: "Guitar Courses",
    src: `${LL}/live-mega-courses.webp`,
    source: "Live, licklibrary.com",
    tabs: "Featured · New · Classic Albums · Technique · Song Courses · Beginners · Learning Paths · Licks · Genres",
    blocks: ["Browse", "Featured courses, led by album artwork"],
  },
  {
    key: "tracks",
    title: "Backing Tracks",
    src: `${LL}/mega-backing-tracks.webp`,
    source: "Prototype",
    tabs: "Featured · Genres · Jam Tracks · Song Tracks · Video Jams",
    blocks: ["Browse", "Featured jam tracks"],
  },
  { key: "paths", title: "Learning Paths", src: `${LL}/mega-learning-paths.webp`, source: "Prototype", tabs: "Single view", blocks: ["Browse", "Featured learning paths"] },
  { key: "tutors", title: "Tutors", src: `${LL}/mega-tutors.webp`, source: "Prototype", tabs: "Single view", blocks: ["Browse", "Featured tutors with lesson counts"] },
];

// Issues called out on the old navigation. x / y place each marker over the screenshot (percent).
const oldNavIssues = [
  { text: "Text-heavy navigation", x: 18, y: 22 },
  { text: "Limited visual hierarchy", x: 80, y: 24 },
  { text: "Lots of content competing for attention", x: 82, y: 76 },
  { text: "Important content hard to surface", x: 20, y: 78 },
];

// Menu → Tab → Block → Item, and the same path through the live Guitar Lessons menu.
const levels = [
  { name: "Menu", role: "One per area of the library", example: "Guitar Lessons" },
  { name: "Tab", role: "A way to browse that area", example: "Featured" },
  { name: "Block", role: "A group of content inside a tab", example: "Popular artists" },
  { name: "Item", role: "A real lesson, course, artist or tutor", example: "John Mayer" },
];

const coverage = [
  { title: "Lessons", tabs: "7 tabs", blocks: "4 blocks" },
  { title: "Courses", tabs: "9 tabs", blocks: "2 blocks" },
  { title: "Backing Tracks", tabs: "5 tabs", blocks: "2 blocks" },
  { title: "Learning Paths", tabs: "Single view", blocks: "2 blocks" },
  { title: "Tutors", tabs: "Single view", blocks: "2 blocks" },
];

const decisions = [
  { title: "Visual discovery", text: "Content imagery replaces walls of text links and makes browsing easier." },
  { title: "Flexible content", text: "Reusable blocks hold courses, artists, lessons and learning paths alike." },
  { title: "Clear destinations", text: "Find content right in the menu, or move into the full collection." },
];

const tiers: { step: string; line: string; src?: string; video?: string; note: string }[] = [
  { step: "Main", line: "The five areas", src: `${LL}/live-mobile-menu.webp`, note: "" },
  { step: "Section", line: "One area opened", note: "e.g. Guitar Lessons. Can also hold the interaction recording: tap → slide → tap → slide → back." },
  { step: "Category", line: "Content to browse", note: "e.g. Featured, with its content." },
];

type CapKind = "reorder" | "lock" | "pool" | "random" | "search";

const capabilities: { key: CapKind; title: string; text: string }[] = [
  { key: "reorder", title: "Reorder", text: "Drag items into the order customers see." },
  { key: "lock", title: "Lock", text: "Pin items that must always show." },
  { key: "pool", title: "Content pools", text: "Give a block a pool of items to draw from." },
  { key: "random", title: "Randomise", text: "Rotate a pool so the menu stays fresh." },
  { key: "search", title: "Search & add", text: "Find real lessons, courses, artists and tutors." },
];

const pipeline = [
  { step: "Design", who: "me" },
  { step: "Frontend model", who: "me" },
  { step: "Mock service", who: "me" },
  { step: "Backend integration", who: "both" },
  { step: "QA", who: "both" },
  { step: "Production", who: "both" },
];

const owned = ["UX/UI", "Interaction design", "Responsive behaviour", "Frontend content architecture", "Desktop storefront", "Mobile storefront", "Admin frontend", "Manual QA"];
const backend = ["Production data model", "API", "Migrations", "Backend logic", "Automated tests", "Integration support"];

const forCustomers = ["More visual discovery", "Reduced information overload", "Easier access to important content", "A dedicated mobile experience"];
const forTeam = [
  "Self-managed navigation",
  "Content curation",
  "Reordering and locking",
  "Randomised content pools",
  "Less reliance on developers for everyday navigation changes",
];

/* Tiny line icons for the admin capability illustrations. */
const icon = { width: 14, height: 14, viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: 1.5, "aria-hidden": true } as const;
const Grip = () => (
  <svg {...icon}>
    <path d="M6 4h.01M10 4h.01M6 8h.01M10 8h.01M6 12h.01M10 12h.01" strokeWidth={2.4} strokeLinecap="round" />
  </svg>
);
const Lock = () => (
  <svg {...icon}>
    <rect x="3.5" y="7" width="9" height="6.5" rx="1.5" />
    <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
  </svg>
);
const Shuffle = () => (
  <svg {...icon} width={18} height={18}>
    <path d="M2 4h3l6 8h3M2 12h3l6-8h3M12 2l2 2-2 2M12 10l2 2-2 2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const Search = () => (
  <svg {...icon}>
    <circle cx="7" cy="7" r="4.5" />
    <path d="M10.5 10.5 14 14" strokeLinecap="round" />
  </svg>
);

/** A small abstract picture of each admin capability, drawn in the page's own type and rules. */
function CapArt({ kind }: { kind: CapKind }) {
  if (kind === "reorder")
    return (
      <div className={styles.capArt} aria-hidden="true">
        <span className={styles.capRow}><Grip /><i /></span>
        <span className={styles.capRow} data-lifted=""><Grip /><i /></span>
        <span className={styles.capRow}><Grip /><i /></span>
      </div>
    );
  if (kind === "lock")
    return (
      <div className={styles.capArt} aria-hidden="true">
        <span className={styles.capRow} data-on=""><i /><Lock /></span>
        <span className={styles.capRow}><i /></span>
        <span className={styles.capRow}><i /></span>
      </div>
    );
  if (kind === "pool")
    return (
      <div className={styles.capArt} aria-hidden="true">
        <span className={styles.capPool}>
          {Array.from({ length: 8 }, (_, i) => (
            <b key={i} />
          ))}
        </span>
      </div>
    );
  if (kind === "random")
    return (
      <div className={styles.capArt} aria-hidden="true">
        <span className={styles.capShuffle}>
          <span className={styles.capTiles}><b /><b /><b /></span>
          <Shuffle />
          <span className={styles.capTiles} data-mixed=""><b /><b /><b /></span>
        </span>
      </div>
    );
  return (
    <div className={styles.capArt} aria-hidden="true">
      <span className={styles.capSearch}><Search /> Search lessons</span>
      <span className={styles.capRow} data-result=""><i /><em>+</em></span>
      <span className={styles.capRow} data-result=""><i /><em>+</em></span>
    </div>
  );
}

export default function LickLibraryCaseStudy() {
  return (
    <CasePage tone={night} maxWidth="1240px">
      <ChapterLayout chapters={chapters} title="LickLibrary Mega Menu" accent="#ee7267" panel="#121213" fill="rgb(255 255 255 / 0.05)">
        {/* ───────── 01 Overview ───────── */}
        <ChapterHero
          chapter={overview}
          brand={<Image src="/licklibrary-logo.png" alt="LickLibrary" width={597} height={120} preload unoptimized />}
          label="Mega Menu · Navigation & admin"
          title="Making thousands of guitar lessons easier to discover."
          about="LickLibrary is an online guitar-learning platform with thousands of lessons, courses and backing tracks taught by professional guitarists."
          role="I redesigned its navigation into a visual discovery system across desktop and mobile, then designed and built the internal tools that let the team manage it."
          facts={[
            { label: "Role", value: "Product Design · UX/UI · Frontend Development" },
            { label: "Scope", value: "Navigation · Responsive UX · Admin tooling · Production delivery" },
            { label: "Status", value: "Live on licklibrary.com", live: true },
          ]}
        >
          <Figure caption="The Guitar Lessons mega menu, live on licklibrary.com.">
            <Browser url="licklibrary.com" shot={shot(`${LL}/live-mega-lessons.webp`, "The LickLibrary Guitar Lessons mega menu")} aspect="16 / 9.4" priority />
          </Figure>
        </ChapterHero>

        {/* ───────── 02 Problem: old navigation → problems → insight → reasoning ───────── */}
        <ChapterSection
          chapter={problem}
          title="Too much content. Not enough hierarchy."
          intro={
            <p>
              Lessons, courses, artists, tutors and backing tracks had outgrown a navigation made of text. The brief: make it
              more visual, with ASOS as the reference.
            </p>
          }
        >
          <figure className={styles.annotated}>
            <div className={styles.annotatedMedia}>
              <Placeholder label="Old navigation" note="The text-heavy menu before the redesign, open on a dense section." aspect="16 / 8" />
              {oldNavIssues.map((issue, i) => (
                <span key={issue.text} className={styles.pin} style={{ left: `${issue.x}%`, top: `${issue.y}%` }} aria-hidden="true">
                  {i + 1}
                </span>
              ))}
            </div>
            <ol className={styles.issues}>
              {oldNavIssues.map((issue, i) => (
                <li key={issue.text}>
                  <span>{i + 1}</span>
                  {issue.text}
                </li>
              ))}
            </ol>
          </figure>

          <Insight label="Key insight">Rather than adding imagery to the old menu, I saw a chance to turn navigation into a discovery experience.</Insight>

          <div className={styles.reasoning}>
            <div className={styles.reasoningText}>
              <h3>Why not just make the existing menu prettier?</h3>
              <p>
                The catalogue holds fundamentally different things: courses, artists, lessons, tutors, learning paths. Treating
                each as another link wouldn&rsquo;t fix discovery.
              </p>
            </div>
            <div className={styles.compare}>
              <figure className={styles.option} data-chosen="false">
                <figcaption>
                  <strong>Prettier links</strong>
                  <span>Every item looks the same</span>
                </figcaption>
                <div className={styles.optionArt} aria-hidden="true">
                  {Array.from({ length: 6 }, (_, i) => (
                    <span key={i} className={styles.linkRow}>
                      <b />
                      <i style={{ width: `${[62, 48, 70, 54, 66, 44][i]}%` }} />
                    </span>
                  ))}
                </div>
              </figure>
              <figure className={styles.option} data-chosen="true">
                <figcaption>
                  <strong>Content-led discovery</strong>
                  <span>Each type shown its own way</span>
                </figcaption>
                <div className={styles.optionArt} aria-hidden="true">
                  <span className={styles.typeRow}>
                    <em>Courses</em>
                    <span className={styles.squares}><b /><b /><b /></span>
                  </span>
                  <span className={styles.typeRow}>
                    <em>Artists</em>
                    <span className={styles.circles}><b /><b /><b /></span>
                  </span>
                  <span className={styles.typeRow}>
                    <em>Lessons</em>
                    <span className={styles.lines}><i /><i /></span>
                  </span>
                  <span className={styles.typeRow}>
                    <em>Paths</em>
                    <span className={styles.steps}><b /><b /><b /><b /></span>
                  </span>
                </div>
              </figure>
            </div>
          </div>
        </ChapterSection>

        {/* ───────── 03 System ───────── */}
        <ChapterSection
          chapter={system}
          title="Designing something that could scale."
          intro={<p>Before any pixels, a content structure: four levels every area of the library could share.</p>}
        >
          <Panel>
            <ol className={styles.levels} aria-label="Menu, tab, block, item">
              {levels.map((level, i) => (
                <li key={level.name}>
                  <span className={styles.levelIndex}>{String(i + 1).padStart(2, "0")}</span>
                  <strong>{level.name}</strong>
                  <span className={styles.levelRole}>{level.role}</span>
                </li>
              ))}
            </ol>
            <div className={styles.example}>
              <PanelLabel>In the product</PanelLabel>
              <ol aria-label="Guitar Lessons, Featured, Popular artists, John Mayer">
                {levels.map((level, i) => (
                  <li key={level.name} data-last={i === levels.length - 1 || undefined}>
                    {i === levels.length - 1 ? <span className={styles.avatar} aria-hidden="true" /> : null}
                    {level.example}
                  </li>
                ))}
              </ol>
            </div>
            <div className={styles.coverage}>
              <PanelLabel>One structure, five menus</PanelLabel>
              <ul>
                {coverage.map((menu) => (
                  <li key={menu.title}>
                    <strong>{menu.title}</strong>
                    <span>{menu.tabs}</span>
                    <span>{menu.blocks}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Panel>
        </ChapterSection>

        {/* ───────── 04 Experience ───────── */}
        <ChapterSection
          chapter={experience}
          title="One system. Two browsing experiences."
          intro={<p>On desktop, every area opens into a visual menu built on the same pattern.</p>}
        >
          <MenuExplorer menus={menus} />
          <Points items={decisions} />

          <Subhead title="Rethinking it for mobile.">
            <p>
              I deliberately didn&rsquo;t compress the desktop menu onto a phone. Mobile is its own browsing experience, built on
              the same information architecture.
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
                      <video src={tier.video} autoPlay muted loop playsInline />
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
        </ChapterSection>

        {/* ───────── 05 Admin: the reveal ───────── */}
        <ChapterSection
          chapter={admin}
          lead={<Bridge lead="The navigation worked. But it created another problem." question="How does the content team control what users see?" />}
          title="Designing the hidden half of the product."
          intro={<p>I designed and built the admin the LickLibrary team uses to run every menu.</p>}
        >
          <Figure caption="The mega menu admin editor.">
            <Placeholder label="Admin editor" note="A menu open on a tab, showing a block's items with search, drag handles, locks and the randomise toggle." aspect="16 / 9.5" />
          </Figure>
          <ul className={styles.caps}>
            {capabilities.map((cap) => (
              <li key={cap.key}>
                <CapArt kind={cap.key} />
                <h3>{cap.title}</h3>
                <p>{cap.text}</p>
              </li>
            ))}
          </ul>

          <Subhead title="From one editor to a system.">
            <p>As more menu types needed an editor, the first one became shared components and editor logic, reused by every menu.</p>
          </Subhead>
          <Panel className={styles.evolution}>
            <div>
              <PanelLabel>One editor</PanelLabel>
              <div className={styles.evoOne}>Menu editor</div>
            </div>
            <span className={styles.evoArrow} aria-hidden="true">
              &rarr;
            </span>
            <div>
              <PanelLabel>Shared system</PanelLabel>
              <ul className={styles.evoShared}>
                {["Tabs", "Blocks", "Search & add", "Reorder & lock", "Pools", "Limits", "Save"].map((part) => (
                  <li key={part}>{part}</li>
                ))}
              </ul>
            </div>
            <span className={styles.evoArrow} aria-hidden="true">
              &rarr;
            </span>
            <div>
              <PanelLabel>Menu editors</PanelLabel>
              <ul className={styles.evoMany}>
                {["Guitar Lessons", "Guitar Courses", "Backing Tracks", "Learning Paths", "Tutors"].map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </div>
          </Panel>
        </ChapterSection>

        {/* ───────── 06 Build ───────── */}
        <ChapterSection
          chapter={build}
          title="From prototype to production."
          intro={<p>I didn&rsquo;t stop at handoff. I built the frontends against a mock service, then integrated and shipped with backend engineering.</p>}
        >
          <Panel>
            <ol className={styles.pipeline}>
              {pipeline.map((item, i) => (
                <li key={item.step} data-who={item.who}>
                  <span className={styles.levelIndex}>{String(i + 1).padStart(2, "0")}</span>
                  <strong>{item.step}</strong>
                </li>
              ))}
            </ol>
            <div className={styles.key}>
              <span data-who="me">Me</span>
              <span data-who="both">With backend engineering</span>
            </div>
          </Panel>
          <ChipGroups
            groups={[
              { title: "I owned", items: owned },
              { title: "Backend engineering", items: backend },
            ]}
          />
        </ChapterSection>

        {/* ───────── 07 Outcome ───────── */}
        <ChapterSection chapter={outcome} title="One system for customers and the team behind the product.">
          <Lists
            groups={[
              { title: "For customers", items: forCustomers },
              { title: "For the LickLibrary team", items: forTeam },
            ]}
          />
          <Pair>
            <Placeholder label="Team quote" note="A line from the LickLibrary team on running the menu themselves." aspect="16 / 7" />
            <Placeholder label="Analytics" note="Navigation engagement before and after, once there's data to share." aspect="16 / 7" />
          </Pair>
        </ChapterSection>

        {/* ───────── 08 What's Next ───────── */}
        <ChapterSection
          chapter={next}
          title="The menu is one part of a wider redesign."
          intro={
            <p>
              I&rsquo;m working through LickLibrary page by page, modernising an established product and evolving the design
              system this work started. The homepage is next.
            </p>
          }
        >
          <Block>
            <ol className={styles.progress}>
              <li data-state="done">
                <div className={styles.progressMedia}>
                  <Img {...shot(`${LL}/live-mega-lessons.webp`, "The live mega menu")} aspect="16 / 10" position="30% 20%" />
                </div>
                <p>
                  <strong>Mega Menu</strong>
                  <span>Shipped &#10003;</span>
                </p>
              </li>
              <li data-state="next">
                <div className={styles.progressMedia}>
                  <Img {...shot(`${LL}/prototype-home.webp`, "The homepage redesign in progress")} aspect="16 / 10" />
                </div>
                <p>
                  <strong>Homepage</strong>
                  <span>In progress</span>
                </p>
              </li>
              <li data-state="later">
                <div className={styles.progressMedia} data-empty="" />
                <p>
                  <strong>Wider platform</strong>
                  <span>Ongoing</span>
                </p>
              </li>
            </ol>
          </Block>
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
