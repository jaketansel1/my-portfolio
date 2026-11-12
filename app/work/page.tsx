import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import SiteFooter from "../../components/SiteFooter";
import { Phone as DevicePhone } from "../../components/ui/Device";
import ShowcaseLoop, { type ShowcaseScene } from "../../components/ShowcaseLoop";
import PhoneCycle from "../../components/PhoneCycle";
import ShowcaseVideo from "../../components/ShowcaseVideo";
import ScreenRotator from "../../components/ScreenRotator";
import SiteHeader from "../../components/SiteHeader";
import StickyNav from "../../components/StickyNav";
import { projects, type Project } from "../data/projects";
import home from "../home.module.css";
import { crumbleScenes, lickLibraryScenes, reawakeningScenes } from "./showcases";
import styles from "./work.module.css";

export const metadata: Metadata = {
  title: "Work — Jake Tansel",
  description:
    "Selected product design, UX/UI and frontend work by Jake Tansel across sport, music education, property and AI.",
};

/*
 * Project archive, on a dark canvas so the work is the brightest thing on the page. One uniform grid: every
 * project gets the same 16:10 preview of its real interface, unframed, so the product is the only layer. The homepage is the immersive tour; the case studies hold the detail; this page is for
 * scanning.
 */

const pad = (n: number) => String(n).padStart(2, "0");

// Earliest start year across projects through to the present.
const SPAN = `${Math.min(...projects.flatMap((p) => (p.period ? [Number.parseInt(p.period, 10)] : [])))}–now`;

/**
 * One preview: a still, and optionally a short silent loop of the same view. The still is the video's poster
 * and the fallback (before it loads, off screen, and with reduced motion), so add a video without changing src:
 *   { src: "/work/licklibrary-screen.webp", width: 1400, height: 907,
 *     video: { src: "/work/licklibrary-loop.mp4", webmSrc: "/work/licklibrary-loop.webm" } }
 * Record the loop at the still's proportions so the frame doesn't jump when it starts.
 */
type Shot = {
  src: string;
  width: number;
  height: number;
  video?: { src: string; webmSrc?: string };
  /**
   * The part of the capture to show, in its own pixels, for captures with browser bars or other chrome around
   * the site. Keep it 16:10 (w / h = 1.6) so it fills the preview exactly; it's scaled, never stretched.
   */
  crop?: { x: number; y: number; w: number; h: number };
};

/** Positions a capture so only its crop fills the 16:10 preview: sizes as percentages of the frame. */
function cropStyle(shot: Shot): CSSProperties | undefined {
  const c = shot.crop;
  if (!c) return undefined;
  const frameH = c.w / 1.6; // the crop's height at 16:10, in source pixels
  return {
    position: "absolute",
    width: `${(shot.width / c.w) * 100}%`,
    height: "auto",
    maxWidth: "none",
    left: `${(-c.x / c.w) * 100}%`,
    top: `${(-c.y / frameH) * 100}%`,
    objectFit: "fill",
  };
}

/**
 * How each project's interface is presented. Product UI only: no lifestyle or decorative imagery.
 * "screen": the desktop screenshot on its own, no frame, filling the preview from the top.
 * "phones": an app shown as phones, the one place a device frame stays. With `more`, the screens cross-fade
 *   through the whole set (components/PhoneCycle).
 * "phoneSlots": the same phone row with empty screens, for an app whose screenshots are still to come. Swap it
 *   for "phones" (with `more` to cycle) once they're ready.
 * "showcase": a cinematic loop of real screenshots (components/ShowcaseLoop), with the still as its poster.
 */
type Visual =
  | { kind: "screen"; shot: Shot }
  | { kind: "phones"; phones: Shot[]; more?: Shot[] }
  | { kind: "phoneSlots"; labels: string[] }
  | { kind: "showcase"; poster: Shot; scenes: ShowcaseScene[]; speed?: number }
  /* Stills crossfading in turn (components/ScreenRotator), as on the homepage. */
  | { kind: "rotator"; screens: { src: string; alt: string }[]; width: number; height: number; interval?: number };

/** `icon`: the project's own favicon or app icon, square, in /public/work/icons. */
type Entry = { discipline: string; year?: string; icon: string; visual: Visual };


/*
 * Every desktop screenshot is a clean capture (no browser chrome in the file) at 16:10 to about 1.41:1. The
 * preview is 16:10 and anchored to the top, so wider shots fit exactly and taller ones lose a little from the
 * bottom, never the sides. Reawakening and SportSkins used to pair the screen with a phone; both phone assets
 * carry device chrome (Safari's address pill, a baked-in phone frame), so they're left out here.
 */
const entries: Record<string, Entry> = {
  LickLibrary: {
    discipline: "Product Design · UX/UI · Frontend",
    icon: "/work/icons/licklibrary.png",
    year: "2025–now",
    visual: {
      kind: "showcase",
      poster: { src: "/work/licklibrary-screen.webp", width: 1400, height: 907 },
      scenes: lickLibraryScenes,
      speed: 1.45,
    },
  },
  "Crumble & Co": {
    discipline: "eCommerce · Design · Shopify build",
    icon: "/work/icons/crumble-and-co.png",
    year: "2026",
    visual: {
      kind: "showcase",
      poster: { src: "/work/crumble-screen.webp", width: 1400, height: 875 },
      scenes: crumbleScenes,
      speed: 1.45, // the scenes are timed at a reading pace; this plays the ~31s loop in ~21s
    },
  },
  Fanzine: {
    discipline: "Product Design · Mobile · Design System",
    icon: "/work/icons/fanzine.png",
    year: "2017–2025",
    visual: {
      kind: "phones",
      phones: [
        { src: "/fanzine/app-chelsea.webp", width: 900, height: 1958 },
        { src: "/fanzine/app-arsenal.webp", width: 900, height: 1964 },
        { src: "/fanzine/app-man-city.webp", width: 900, height: 1958 },
      ],
      // The same product in other clubs' colours: the screens cycle through every app.
      more: [
        { src: "/fanzine/app-celtic.webp", width: 900, height: 1954 },
        { src: "/fanzine/app-west-ham.webp", width: 900, height: 1955 },
      ],
    },
  },
  "Reawakening the Feminine": {
    discipline: "Web Design · UX/UI · Frontend",
    icon: "/work/icons/reawakening-the-feminine.png",
    year: "2026",
    visual: {
      kind: "showcase",
      poster: { src: "/work/reawakening-screen.webp", width: 1400, height: 992 },
      scenes: reawakeningScenes,
      speed: 1.45,
    },
  },
  SportSkins: {
    discipline: "Product Design · Gaming · Web App",
    icon: "/work/icons/sportskins.png",
    year: "2023–2024",
    // Phones like Fanzine's, waiting on mobile screenshots. The existing sportskins-phone.webp has a phone
    // frame baked in, so it can't sit inside the shared frame; clean screen captures will replace these.
    visual: { kind: "phoneSlots", labels: ["Screen to come", "Screen to come", "Screen to come"] },
  },
  "Maison Augustin": {
    discipline: "Web Design · Frontend · Lead Generation",
    icon: "/work/icons/maison-augustin.png",
    // A screen recording of the live homepage hero. It was recorded with the browser showing, so the crop keeps
    // only the site: below the address bar, above the black band, left of the scrollbar, at 16:10 (logo,
    // headline, call to action and the MENU label in view; the round menu icon falls just outside).
    visual: {
      kind: "screen",
      shot: {
        src: "/work/maison-video-poster.webp",
        width: 1920,
        height: 1280,
        video: { src: "/mason-augustin.mp4" },
        crop: { x: 50, y: 132, w: 1715, h: 1072 },
      },
    },
  },
  "Inspect Design": {
    discipline: "Independent Product · Design & Development",
    icon: "/work/icons/inspect-design.svg",
    // The local app at 1440×900 (2×), in the homepage's order: home, a Learn lesson, then the mega menu lesson.
    visual: {
      kind: "rotator",
      width: 1800,
      height: 1125,
      interval: 3600,
      screens: [
        { src: "/inspect-design/home.webp", alt: "Inspect Design home: paste a website to inspect how it is built" },
        { src: "/inspect-design/lesson-web-apps.webp", alt: "Inspect Design lesson showing how a page load travels between browser, Vue, Laravel and the database" },
        { src: "/inspect-design/lesson-mega-menu.webp", alt: "Inspect Design lesson explaining how the LickLibrary mega menu is structured" },
      ],
    },
  },
};

const SIZES = "(min-width: 1100px) 30vw, (min-width: 700px) 46vw, 92vw";

/** A still, or a poster-first silent loop that plays only while in view (components/ShowcaseVideo). Both cover their box from the top. */
function Media({ shot, sizes = SIZES, priority }: { shot: Shot; sizes?: string; priority?: boolean }) {
  if (shot.video) {
    return (
      <ShowcaseVideo
        src={shot.video.src}
        webmSrc={shot.video.webmSrc}
        poster={shot.src}
        width={shot.width}
        height={shot.height}
        waitForScroll={false}
        className={shot.crop ? undefined : styles.media}
        style={cropStyle(shot) ?? { objectFit: "cover", objectPosition: "top" }}
      />
    );
  }
  return (
    <Image
      src={shot.src}
      alt=""
      width={shot.width}
      height={shot.height}
      sizes={sizes}
      preload={priority}
      unoptimized
      className={styles.media}
    />
  );
}

function Visual({ visual, priority }: { visual: Visual; priority?: boolean }): ReactNode {
  switch (visual.kind) {
    case "screen":
      return (
        <div className={styles.stage} data-kind="screen">
          <Media shot={visual.shot} priority={priority} />
        </div>
      );
    case "showcase":
      return (
        <div className={styles.stage} data-kind="screen">
          <ShowcaseLoop poster={visual.poster} scenes={visual.scenes} speed={visual.speed} sizes={SIZES} />
        </div>
      );
    case "rotator":
      return (
        <div className={styles.stage} data-kind="screen">
          <ScreenRotator screens={visual.screens} width={visual.width} height={visual.height} interval={visual.interval} />
        </div>
      );
    case "phoneSlots":
      return (
        <div className={styles.stage} data-kind="phones">
          {visual.labels.map((label, i) => (
            <DevicePhone key={i} className={styles.phone}>
              <span className={styles.slot}>{label}</span>
            </DevicePhone>
          ))}
        </div>
      );
    case "phones":
      return (
        <div className={styles.stage} data-kind="phones">
          {visual.more ? (
            <PhoneCycle
              screens={[...visual.phones, ...visual.more]}
              count={visual.phones.length}
              sizes="(min-width: 1100px) 10vw, 30vw"
              phoneClassName={styles.phone}
            />
          ) : (
            visual.phones.map((shot) => (
              <DevicePhone key={shot.src} className={styles.phone}>
                <Media shot={shot} sizes="(min-width: 1100px) 10vw, 30vw" />
              </DevicePhone>
            ))
          )}
        </div>
      );
  }
}

function Card({ project, n }: { project: Project; n: number }) {
  const entry = entries[project.title];
  // Only a full web address (the live site, when there's no case study) opens in a new tab; case studies never do.
  const external = !!project.link && /^https?:\/\//.test(project.link);
  const status = project.link ? (entry?.year ?? (external ? "Live site" : undefined)) : project.label ?? "Case study coming soon";
  const body = (
    <>
      <div className={styles.frame}>{entry ? <Visual visual={entry.visual} priority={n <= 3} /> : null}</div>
      <div className={styles.caption}>
        {entry ? <Image src={entry.icon} alt="" width={22} height={22} unoptimized className={styles.icon} /> : null}
        <h2 className={styles.title}>
          {project.title}
          {project.link ? (
            <span className={styles.arrow} aria-hidden="true">
              {external ? <>&#8599;</> : <>&rarr;</>}
            </span>
          ) : null}
        </h2>
        <p className={styles.discipline}>{entry?.discipline}</p>
        {status ? (
          <span className={styles.year} data-soon={!project.link || undefined}>
            {status}
          </span>
        ) : null}
      </div>
    </>
  );
  if (external) {
    return (
      <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.card}>
        {body}
        <span className={styles.visuallyHidden}> (opens the live site in a new tab)</span>
      </a>
    );
  }
  return project.link ? (
    <Link href={project.link} className={styles.card}>
      {body}
    </Link>
  ) : (
    <div className={styles.card} data-static="">
      {body}
    </div>
  );
}

/*
 * A personal product, featured beneath the grid rather than in it: text in the grid's first column, the screen
 * across the other two. It reuses the card's frame and hover; "Explore project" appears once it has a link.
 */
const FEATURE = {
  title: "Inspect Design",
  label: "Currently building · Personal project",
  description: "A visual learning tool I’m building to explore how great websites are designed, structured and developed.",
};

function Feature({ project }: { project: Project }) {
  const entry = entries[project.title];
  const link = project.link;
  const external = !!link && /^https?:\/\//.test(link);
  const body = (
    <>
      <div className={`${styles.frame} ${styles.featureFrame}`}>{entry ? <Visual visual={entry.visual} /> : null}</div>
      <div className={styles.featureText}>
        <p className={styles.featureLabel}>
          <span className={styles.liveDot} aria-hidden="true" />
          {FEATURE.label}
        </p>
        <h2 id="feature-heading" className={styles.featureTitle}>
          {FEATURE.title}
        </h2>
        <p className={styles.featureDescription}>{FEATURE.description}</p>
        {link ? (
          <span className={styles.featureLink}>
            Explore project <span aria-hidden="true">&#8599;</span>
          </span>
        ) : null}
      </div>
    </>
  );
  if (!link) {
    return (
      <div className={`${styles.card} ${styles.feature}`} data-static="">
        {body}
      </div>
    );
  }
  return external ? (
    <a href={link} target="_blank" rel="noopener noreferrer" className={`${styles.card} ${styles.feature}`}>
      {body}
      <span className={styles.visuallyHidden}> (opens in a new tab)</span>
    </a>
  ) : (
    <Link href={link} className={`${styles.card} ${styles.feature}`}>
      {body}
    </Link>
  );
}

const keyOf = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

const gridProjects = projects.filter((p) => p.title !== FEATURE.title);
const featured = projects.find((p) => p.title === FEATURE.title);

export default function WorkPage() {
  return (
    <div className={`${home.home} ${styles.page}`}>
      <StickyNav>
        <div className={home.container}>
          <SiteHeader editorial current="work" />
        </div>
      </StickyNav>

      <main id="main-content">
        <section className={`${home.container} ${styles.intro}`} aria-labelledby="work-heading">
          <h1 id="work-heading" className={styles.headline}>
            <span className={home.line}>
              <span>A few of my favourite</span>
            </span>
            <span className={`${home.line} ${home.lineMuted}`}>
              <span>projects.</span>
            </span>
          </h1>
          <dl className={styles.meta}>
            <div>
              <dt className={styles.visuallyHidden}>Projects</dt>
              <dd>{pad(projects.length)} projects</dd>
            </div>
            <div>
              <dt className={styles.visuallyHidden}>Years</dt>
              <dd>{SPAN}</dd>
            </div>
          </dl>
        </section>

        <section className={home.container} aria-label="Projects">
          <ol className={styles.grid}>
            {gridProjects.map((project, i) => (
              <li key={project.title} id={keyOf(project.title)}>
                <Card project={project} n={i + 1} />
              </li>
            ))}
          </ol>
        </section>

        {featured ? (
          <section
            id={keyOf(featured.title)}
            className={`${home.container} ${styles.featureSection}`}
            aria-labelledby="feature-heading"
          >
            <Feature project={featured} />
          </section>
        ) : null}

      </main>
      <SiteFooter />
    </div>
  );
}
