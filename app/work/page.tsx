import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import SiteFooter from "../../components/SiteFooter";
import { Phone as DevicePhone } from "../../components/ui/Device";
import ShowcaseVideo from "../../components/ShowcaseVideo";
import SiteHeader from "../../components/SiteHeader";
import StickyNav from "../../components/StickyNav";
import { projects, type Project } from "../data/projects";
import home from "../home.module.css";
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
type Shot = { src: string; width: number; height: number; video?: { src: string; webmSrc?: string } };

/**
 * How each project's interface is presented. Product UI only: no lifestyle or decorative imagery.
 * "screen": the desktop screenshot on its own, no frame, filling the preview from the top.
 * "phones": an app shown as phones, the one place a device frame stays.
 */
type Visual = { kind: "screen"; shot: Shot } | { kind: "phones"; phones: Shot[] };

type Entry = { discipline: string; year?: string; visual: Visual };

/*
 * Every desktop screenshot is a clean capture (no browser chrome in the file) at 16:10 to about 1.41:1. The
 * preview is 16:10 and anchored to the top, so wider shots fit exactly and taller ones lose a little from the
 * bottom, never the sides. Reawakening and SportSkins used to pair the screen with a phone; both phone assets
 * carry device chrome (Safari's address pill, a baked-in phone frame), so they're left out here.
 */
const entries: Record<string, Entry> = {
  LickLibrary: {
    discipline: "Product Design · UX/UI · Frontend",
    year: "2025–now",
    visual: { kind: "screen", shot: { src: "/work/licklibrary-screen.webp", width: 1400, height: 907 } },
  },
  "Crumble & Co": {
    discipline: "eCommerce · Design · Shopify build",
    year: "2026",
    visual: { kind: "screen", shot: { src: "/work/crumble-screen.webp", width: 1400, height: 875 } },
  },
  Fanzine: {
    discipline: "Product Design · Mobile · Design System",
    year: "2017–2025",
    visual: {
      kind: "phones",
      phones: [
        { src: "/fanzine/app-chelsea.webp", width: 900, height: 1958 },
        { src: "/fanzine/app-arsenal.webp", width: 900, height: 1964 },
        { src: "/fanzine/app-man-city.webp", width: 900, height: 1958 },
      ],
    },
  },
  "Reawakening the Feminine": {
    discipline: "Web Design · UX/UI · Frontend",
    year: "2026",
    visual: { kind: "screen", shot: { src: "/work/reawakening-screen.webp", width: 1400, height: 992 } },
  },
  SportSkins: {
    discipline: "Product Design · Gaming · Web App",
    year: "2023–2024",
    visual: { kind: "screen", shot: { src: "/work/sportskins-screen.webp", width: 1400, height: 930 } },
  },
  "Maison Augustin": {
    discipline: "Web Design · Frontend · Lead Generation",
    visual: { kind: "screen", shot: { src: "/work/maison-screen.webp", width: 1400, height: 875 } },
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
        className={styles.media}
        style={{ objectFit: "cover", objectPosition: "top" }}
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
    case "phones":
      return (
        <div className={styles.stage} data-kind="phones">
          {visual.phones.map((shot) => (
            <DevicePhone key={shot.src} className={styles.phone}>
              <Media shot={shot} sizes="(min-width: 1100px) 10vw, 30vw" />
            </DevicePhone>
          ))}
        </div>
      );
  }
}

function Card({ project, n }: { project: Project; n: number }) {
  const entry = entries[project.title];
  const status = project.link ? entry?.year : project.label ?? "Case study coming soon";
  const body = (
    <>
      <div className={styles.frame}>{entry ? <Visual visual={entry.visual} priority={n <= 3} /> : null}</div>
      <div className={styles.caption}>
        <span className={styles.number}>{pad(n)}</span>
        <h2 className={styles.title}>
          {project.title}
          {project.link ? (
            <span className={styles.arrow} aria-hidden="true">
              &rarr;
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

const keyOf = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

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
          <p className={styles.eyebrow}>Selected work</p>
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
            {projects.map((project, i) => (
              <li key={project.title} id={keyOf(project.title)}>
                <Card project={project} n={i + 1} />
              </li>
            ))}
          </ol>
        </section>

      </main>
      <SiteFooter />
    </div>
  );
}
