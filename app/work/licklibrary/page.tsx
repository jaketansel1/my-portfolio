import type { Metadata } from "next";
import Image from "next/image";
import { Browser, CasePage, Figure, Img, NextProject, Placeholder, type Tone } from "../../../components/case/Case";
import {
  Block,
  Bridge,
  ChapterHero,
  ChapterLayout,
  ChapterOpener,
  ChapterSection,
  ChipGroups,
  Insight,
  Lists,
  Panel,
  PanelLabel,
  Points,
  Subhead,
  type Chapter,
} from "../../../components/case/Chapters";
import MenuExplorer from "./MenuExplorer";
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
 * The page tells two stories: the wider LickLibrary redesign (Overview, What's next) and a deep dive into
 * each initiative as it ships. The Mega Menu is the first; its sections sit under it in the rail. When
 * another initiative ships, give it an opener and its own nested chapters in the same way.
 */
const chapters: Chapter[] = [
  { id: "overview", number: "00", title: "Overview" },
  { id: "mega-menu", number: "01", title: "Mega Menu" },
  { id: "problem", number: "1.1", title: "Problem", sub: true },
  { id: "system", number: "1.2", title: "System", sub: true },
  { id: "experience", number: "1.3", title: "Experience", sub: true },
  { id: "admin", number: "1.4", title: "Admin", sub: true },
  { id: "impact", number: "1.5", title: "Impact", sub: true },
  { id: "delivery", number: "1.6", title: "Delivery", sub: true },
  { id: "next", number: "→", title: "What’s Next" },
];
const [overview, megaMenu, problem, system, experience, admin, impact, delivery, next] = chapters;

/*
 * The scale of LickLibrary itself, for context. These are not results of this work.
 * Placeholders until the real figures are confirmed: just replace the values.
 */
const platform = [
  { value: "5,000+", label: "Active members" },
  { value: "~10,000", label: "Lessons & courses" },
  { value: "34 years", label: "Guitar education" },
];

type Status = "live" | "progress" | "next" | "ongoing";

/** Every LickLibrary initiative, in order. Drives the navigator in the hero and the "What's next" previews. */
const initiatives: { number: string; title: string; status: Status; statusLabel: string; line: string; href?: string; preview?: string }[] = [
  { number: "01", title: "Mega Menu", status: "live", statusLabel: "Live", line: "Making thousands of guitar lessons easier to discover.", href: "#mega-menu" },
  {
    number: "02",
    title: "Homepage",
    status: "progress",
    statusLabel: "In progress",
    line: "Improving the platform’s primary discovery and conversion experience.",
    preview: `${LL}/prototype-home.webp`,
  },
  { number: "03", title: "Checkout", status: "next", statusLabel: "Coming next", line: "Reducing friction between discovering content and purchasing it." },
  {
    number: "04",
    title: "Email Marketing",
    status: "ongoing",
    statusLabel: "Ongoing",
    line: "Building a more consistent system for campaigns, product launches and customer retention.",
  },
];

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

const oldNavFindings = [
  "Text-heavy navigation",
  "Limited visual hierarchy",
  "Too many competing choices",
  "Key content buried",
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

// What customers see, the structure underneath it, and the tools the team runs it with.
const layers = [
  { name: "Customer experience", text: "Five visual menus customers browse, on desktop and mobile." },
  { name: "Content system", text: "Menu → Tab → Block → Item: one structure behind every menu." },
  { name: "Admin tooling", text: "The editor the LickLibrary team uses to decide what customers see." },
];

/*
 * Mega Menu results. Entries marked `pending` are placeholders until analytics are in:
 * replace the value and drop the flag.
 */
const results: { value: string; label: string; pending?: boolean }[] = [
  { value: "+XX%", label: "Navigation engagement", pending: true },
  { value: "+XX%", label: "Content discovery", pending: true },
  { value: "5", label: "Catalogue areas unified" },
  { value: "Desktop + mobile", label: "Shipped to production" },
];

const pipeline = [
  { step: "Brief", who: "me" },
  { step: "UX", who: "me" },
  { step: "UI", who: "me" },
  { step: "System design", who: "me" },
  { step: "Frontend", who: "me" },
  { step: "Backend collaboration", who: "both" },
  { step: "Production", who: "both" },
];

const owned = [
  "UX/UI",
  "Interaction design",
  "Responsive behaviour",
  "Frontend content architecture",
  "Mock service",
  "Desktop storefront",
  "Mobile storefront",
  "Admin frontend",
  "Manual QA",
];
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
      <ChapterLayout chapters={chapters} title="LickLibrary" accent="#ee7267" panel="#121213" fill="rgb(255 255 255 / 0.05)" className={styles.layout}>
        {/* ───────── 00 Overview: the wider LickLibrary work ───────── */}
        <ChapterHero
          chapter={overview}
          brand={<Image src="/licklibrary-logo.png" alt="LickLibrary" width={597} height={120} preload unoptimized />}
          label="Ongoing product work"
          title="Redesigning LickLibrary, one experience at a time."
          about="LickLibrary is a long-established guitar-learning platform with thousands of lessons, courses and backing tracks."
          role="I’m redesigning its core customer experience — from how players discover content to how they purchase, learn and return."
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
            <nav aria-label="LickLibrary work">
              <p className={styles.metaLabel}>The work so far</p>
              <ol className={styles.navigator}>
                {initiatives.map((item) => {
                  const inner = (
                    <>
                      <span className={styles.navTitle}>
                        <span>{item.number} —</span>
                        {item.title}
                      </span>
                      <span className={styles.status} data-status={item.status}>
                        {item.statusLabel}
                      </span>
                    </>
                  );
                  return (
                    <li key={item.number}>
                      {item.href ? (
                        <a href={item.href}>
                          {inner}
                          <span className={styles.navArrow} aria-hidden="true">
                            &darr;
                          </span>
                        </a>
                      ) : (
                        <div>{inner}</div>
                      )}
                    </li>
                  );
                })}
              </ol>
            </nav>
          </div>
        </ChapterHero>

        {/* ───────── 01 Mega Menu: the first initiative ───────── */}
        <ChapterOpener
          chapter={megaMenu}
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
        >
          <Figure caption="The Guitar Lessons mega menu, live on licklibrary.com." className={styles.megaMenuFigure}>
            <Browser url="licklibrary.com" video={{ src: "/licklibrary/mega-menu.mp4", webmSrc: "/licklibrary/mega-menu.webm", poster: "/licklibrary/mega-menu-poster.webp", width: 1920, height: 1080 }} className={styles.megaMenuVideo} />
          </Figure>
        </ChapterOpener>

        {/* ───────── 1.1 Problem: old navigation → problems → insight → reasoning ───────── */}
        <ChapterSection
          chapter={problem}
          title={<>Too much content.<br />Not enough hierarchy.</>}
          intro={
            <p>
              As LickLibrary&apos;s catalogue grew, its navigation became increasingly dense and difficult to scan. The brief was
              simple: make discovery more visual, using ASOS as an initial reference.
            </p>
          }
        >
          <div>
            <figure className={styles.beforeExamples}>
              <Img {...shot(`${LL}/mega-menu-before.webp`, "LickLibrary's old desktop navigation, with dense columns of text links for guitar lessons", 1585, 992)} />
              <Img {...shot(`${LL}/mobile-menu-before.webp`, "LickLibrary's old mobile navigation showing stacked expandable text categories", 852, 1846)} />
              <figcaption className={styles.beforeCaption}>The previous mobile navigation, with Guitar Lessons expanded.</figcaption>
            </figure>
            <ol className={styles.issues}>
              {oldNavFindings.map((finding, i) => (
                <li key={finding}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {finding}
                </li>
              ))}
            </ol>
          </div>

          <Insight label="Key insight">Rather than adding imagery to the old menu, I saw an opportunity to turn navigation into a discovery experience.</Insight>

          <div className={styles.reasoning}>
            <div className={styles.reasoningText}>
              <h3>Why not just make the existing menu prettier?</h3>
              <p>
                The catalogue contains fundamentally different content &mdash; courses, artists, lessons, tutors and learning paths.
                Treating everything as another text link wouldn&rsquo;t solve discovery.
              </p>
            </div>
            <div className={styles.compare} role="group" aria-label="From uniform links to content-led presentation">
              <div className={styles.oldApproach}>
                <p className={styles.metaLabel}>Old approach</p>
                <p className={styles.approachTitle}>Everything treated as a link</p>
                <div className={styles.linkList} aria-hidden="true">
                  {Array.from({ length: 6 }, (_, i) => (
                    <span key={i} className={styles.linkRow}>
                      <i style={{ width: `${[62, 48, 70, 54, 66, 44][i]}%` }} />
                    </span>
                  ))}
                </div>
              </div>
              <span className={styles.compareArrow} aria-hidden="true">&rarr;</span>
              <div>
                <p className={styles.metaLabel}>New approach</p>
                <p className={styles.approachTitle}>Content determines presentation</p>
                <dl className={styles.contentTypes}>
                  <div className={styles.typeRow}>
                    <dt>Courses</dt>
                    <dd className={styles.squares} role="img" aria-label="Cards"><b /><b /><b /></dd>
                  </div>
                  <div className={styles.typeRow}>
                    <dt>Artists</dt>
                    <dd className={styles.circles} role="img" aria-label="Circular imagery"><b /><b /><b /></dd>
                  </div>
                  <div className={styles.typeRow}>
                    <dt>Lessons</dt>
                    <dd className={styles.lines} role="img" aria-label="Compact rows"><i /><i /></dd>
                  </div>
                  <div className={styles.typeRow}>
                    <dt>Learning paths</dt>
                    <dd className={styles.steps} role="img" aria-label="Progression through steps"><b /><b /><b /><b /></dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </ChapterSection>

        {/* ───────── 1.2 System ───────── */}
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

        {/* ───────── 1.3 Experience ───────── */}
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
        </ChapterSection>

        {/* ───────── 1.4 Admin: the reveal ───────── */}
        <ChapterSection
          chapter={admin}
          lead={<Bridge lead="The navigation worked. But it created another problem." question="How does the content team control what users see?" />}
          title="Designing the hidden half of the product."
          intro={
            <p>
              The Mega Menu wasn&rsquo;t only a customer-facing redesign. I also designed and built the admin the LickLibrary team
              uses to run every menu, on the same content system customers browse.
            </p>
          }
        >
          <Panel className={styles.layers} caption="Customers browse the menus. The team runs them, through the same content system.">
            <ol aria-label="Customer experience, content system, admin tooling">
              {layers.map((layer, i) => (
                <li key={layer.name}>
                  <span className={styles.levelIndex}>{String(i + 1).padStart(2, "0")}</span>
                  <strong>{layer.name}</strong>
                  <span>{layer.text}</span>
                </li>
              ))}
            </ol>
          </Panel>
          <Block>
            <Figure caption="The mega menu admin editor.">
              <Placeholder label="Admin editor" note="A menu open on a tab, showing a block's items with search, drag handles, locks and the randomise toggle." aspect="16 / 9.5" />
            </Figure>
          </Block>
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

        {/* ───────── 1.5 Impact ───────── */}
        <ChapterSection
          chapter={impact}
          title="One system for customers and the team behind the product."
          intro={<p>The redesign has to prove itself in use, not just look finished. These are the measures it&rsquo;s tracked against.</p>}
        >
          <dl className={styles.results}>
            {results.map((item) => (
              <div key={item.label} data-pending={item.pending || undefined}>
                <dd>{item.value}</dd>
                <dt>{item.label}</dt>
              </div>
            ))}
          </dl>
          <Lists
            groups={[
              { title: "For customers", items: forCustomers },
              { title: "For the LickLibrary team", items: forTeam },
            ]}
          />
          <Block>
            <Placeholder label="Team quote" note="A line from the LickLibrary team on running the menu themselves." aspect="16 / 5" />
          </Block>
        </ChapterSection>

        {/* ───────── 1.6 Delivery ───────── */}
        <ChapterSection
          chapter={delivery}
          title="From brief to production."
          intro={
            <p>
              I took the Mega Menu from an open brief through UX exploration, system design, responsive interaction and frontend
              implementation, before working with LickLibrary&rsquo;s backend developer to integrate and ship it into the production
              platform.
            </p>
          }
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
              <span data-who="both">With LickLibrary&rsquo;s backend developer</span>
            </div>
          </Panel>
          <ChipGroups
            groups={[
              { title: "I owned", items: owned },
              { title: "Backend engineering", items: backend },
            ]}
          />
        </ChapterSection>

        {/* ───────── What's next: back to the wider redesign ───────── */}
        <ChapterSection
          chapter={next}
          title="The redesign continues."
          intro={
            <p>
              The Mega Menu is one part of a broader redesign of the LickLibrary experience. I&rsquo;m continuing to work through the
              platform feature by feature.
            </p>
          }
        >
          <ol className={styles.upcoming}>
            {initiatives
              .filter((item) => item.status !== "live")
              .map((item) => (
                <li key={item.number}>
                  <div className={styles.upcomingMedia} data-empty={!item.preview || undefined}>
                    {item.preview ? (
                      <Img {...shot(item.preview, `The ${item.title.toLowerCase()} redesign in progress`)} aspect="16 / 10" />
                    ) : (
                      <span aria-hidden="true">{item.number}</span>
                    )}
                  </div>
                  <p className={styles.upcomingHead}>
                    <span>{item.number}</span>
                    <strong>{item.title}</strong>
                    <span className={styles.status} data-status={item.status}>
                      {item.statusLabel}
                    </span>
                  </p>
                  <p className={styles.upcomingLine}>{item.line}</p>
                </li>
              ))}
          </ol>
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
