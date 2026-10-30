"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import SiteHeader from "../SiteHeader";
import ExperimentLauncher from "../experiments/ExperimentLauncher";
import home from "../../app/home.module.css";
import styles from "./HomeStage.module.css";

/*
 * Immersive homepage. A tall, invisible scroll track holds a sticky 100svh stage; native scroll
 * progress through the track drives which scene the stage shows. The viewport never visibly moves:
 * scenes are stacked in the stage and their layers transition in place.
 *
 * Per scene, JS writes three numbers (no React state per frame):
 *   --t   signed offset from the settled state, -1 (upcoming) … 0 (settled) … 1 (past)
 *   --in  how far it still has to come in (0–1), --out how far it has left (0–1)
 * Layers turn those into translate / scale / opacity in CSS, each with its own distances.
 * Below 900px or with reduced motion the track is switched off and scenes stack normally.
 */

type Scene = {
  key: string;
  theme: "light" | "dark";
  label?: string;
};

const SCENES: Scene[] = [
  { key: "intro", theme: "light" },
  { key: "licklibrary", theme: "dark", label: "LickLibrary" },
  { key: "crumble", theme: "light", label: "Crumble & Co" },
  { key: "fanzine", theme: "dark", label: "Fanzine" },
  { key: "reawakening", theme: "light", label: "Reawakening the Feminine" },
  { key: "closing", theme: "light" },
];
const PROJECTS = SCENES.filter((s) => s.label);
/** Share of each transition segment spent settled at either end. */
const HOLD = 0.32;
const IMMERSIVE = "(min-width: 900px) and (prefers-reduced-motion: no-preference)";

const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

/** Layer motion: distances it travels coming in (i) and going out (o), scale loss and fade rate. */
type Motion = { xi?: string; yi?: string; xo?: string; yo?: string; s?: number; f?: number };
const motion = (m: Motion) =>
  ({
    "--xi": m.xi ?? "0px",
    "--yi": m.yi ?? "0px",
    "--xo": m.xo ?? "0px",
    "--yo": m.yo ?? "0px",
    "--sc": m.s ?? 0,
    "--fd": m.f ?? 1.8,
  }) as CSSProperties;

function Layer({ m, className, children }: { m: Motion; className?: string; children: ReactNode }) {
  return (
    <div className={`${styles.layer} ${className ?? ""}`} style={motion(m)}>
      {children}
    </div>
  );
}

function Browser({ url, children, scheme = "dark" }: { url: string; children: ReactNode; scheme?: "dark" | "light" }) {
  return (
    <div className={styles.browser} data-scheme={scheme}>
      <div className={styles.browserBar} aria-hidden="true">
        <span />
        <span />
        <span />
        <em>{url}</em>
      </div>
      {children}
    </div>
  );
}

function Phone({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) {
  return (
    <div className={styles.phone}>
      <Image src={src} alt={alt} width={width} height={height} unoptimized />
    </div>
  );
}

/**
 * Makes the whole scene clickable. Hidden from keyboard and screen readers: the title and
 * "View case study" links are the accessible routes, so there is no duplicate tab stop.
 */
function SceneLink({ href }: { href: string }) {
  return <Link href={href} className={styles.sceneLink} tabIndex={-1} aria-hidden="true" />;
}

function Info({
  index,
  title,
  href,
  meta,
  line,
  className,
}: {
  index: number;
  title: string;
  href: string;
  meta: string;
  line: string;
  className?: string;
}) {
  return (
    <Layer m={{ yi: "6vh", yo: "-5vh", f: 2.4 }} className={`${styles.info} ${className ?? ""}`}>
      <p className={styles.count}>
        <span>{String(index).padStart(2, "0")}</span> / {String(PROJECTS.length).padStart(2, "0")}
      </p>
      <h2 className={styles.title}>
        <Link href={href}>{title}</Link>
      </h2>
      <p className={styles.meta}>{meta}</p>
      <p className={styles.line}>{line}</p>
      <Link href={href} className={styles.cta}>
        View case study <span aria-hidden="true">&rarr;</span>
      </Link>
    </Layer>
  );
}

export default function HomeStage() {
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(-1);

  const immersive = () => window.matchMedia(IMMERSIVE).matches;
  const scenes = () => Array.from(trackRef.current?.querySelectorAll<HTMLElement>("[data-scene]") ?? []);

  /** Scroll so scene i is settled. In the stacked layout, just scroll to the scene. */
  const goTo = useCallback((i: number, behavior: ScrollBehavior = "smooth") => {
    const track = trackRef.current;
    if (!track) return;
    if (!immersive()) {
      scenes()[i]?.scrollIntoView({ behavior, block: "start" });
      return;
    }
    const total = track.offsetHeight - window.innerHeight;
    const top = track.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + (i / (SCENES.length - 1)) * total, behavior });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const els = scenes();

    const setActive = (i: number) => {
      if (i === activeRef.current) return;
      activeRef.current = i;
      els.forEach((el, k) => {
        if (!el) return;
        el.toggleAttribute("data-active", k === i);
        for (const video of el.querySelectorAll("video")) {
          if (k === i) video.play().catch(() => {});
          else video.pause();
        }
      });
      headerRef.current?.setAttribute("data-theme", SCENES[i].theme);
      markersRef.current?.setAttribute("data-theme", SCENES[i].theme);
      markersRef.current?.setAttribute("data-visible", String(!!SCENES[i].label));
      markersRef.current?.querySelectorAll("a").forEach((a, k) => {
        if (PROJECTS[k].key === SCENES[i].key) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });
    };

    const update = () => {
      frame = 0;
      if (!immersive()) {
        els.forEach((el) => el?.removeAttribute("style"));
        setActive(0);
        return;
      }
      const n = SCENES.length - 1;
      const total = track.offsetHeight - window.innerHeight;
      const raw = Math.min(Math.max(-track.getBoundingClientRect().top / total, 0), 1) * n;
      const k = Math.min(Math.floor(raw), n - 1);
      const f = raw - k;
      // Settled at each end of a segment; eased transition in the middle.
      const p = k + (f <= HOLD ? 0 : f >= 1 - HOLD ? 1 : ease((f - HOLD) / (1 - 2 * HOLD)));
      els.forEach((el, i) => {
        if (!el) return;
        const t = Math.min(Math.max(p - i, -1), 1);
        el.style.setProperty("--t", t.toFixed(4));
        el.style.setProperty("--a", Math.abs(t).toFixed(4));
        el.style.setProperty("--in", Math.max(0, -t).toFixed(4));
        el.style.setProperty("--out", Math.max(0, t).toFixed(4));
      });
      setActive(Math.round(p));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  /** Keyboard: focusing a link in another scene brings that scene into its settled state. */
  const onFocus = (i: number) => () => {
    if (immersive() && activeRef.current !== i) goTo(i, "auto");
  };

  const sceneProps = (i: number) => ({
    id: SCENES[i].key,
    className: styles.scene,
    "data-scene": SCENES[i].key,
    "data-theme": SCENES[i].theme,
    onFocusCapture: onFocus(i),
    style: { zIndex: i + 1 } as CSSProperties,
  });

  return (
    <div className={`${home.home} ${styles.root}`}>
      <div ref={headerRef} className={styles.header} data-theme="light">
        <SiteHeader editorial />
      </div>

      <main id="main-content">
        <div ref={trackRef} className={styles.track} style={{ "--scenes": SCENES.length } as CSSProperties}>
          <div className={styles.stage}>
            {/* ── Intro ── */}
            <section {...sceneProps(0)} aria-labelledby="hero-heading">
              <div className={styles.bg} />
              <Layer m={{ yo: "-14vh", f: 1.7 }} className={styles.introText}>
                <h1 id="hero-heading" className={styles.headline}>
                  <span>Product designer</span>
                  <span className={styles.headlineMuted}>who builds and ships.</span>
                </h1>
              </Layer>
              <Layer m={{ yo: "-6vh", f: 2.4 }} className={styles.introFoot}>
                <p className={styles.facts}>8 years in digital product &middot; 50+ products launched &middot; 5M+ users reached</p>
                <div className={styles.introActions}>
                  <a
                    href="#licklibrary"
                    className={styles.primary}
                    onClick={(e) => {
                      e.preventDefault();
                      goTo(1);
                    }}
                  >
                    Selected work <span aria-hidden="true">&darr;</span>
                  </a>
                  <ExperimentLauncher />
                  <Link href="/contact" className={styles.quietLink}>
                    Get in touch <span aria-hidden="true">&#8599;</span>
                  </Link>
                </div>
              </Layer>
            </section>

            {/* ── 01 LickLibrary: black, red light, guitarist as atmosphere, product as evidence ── */}
            <section {...sceneProps(1)} aria-label="LickLibrary">
              <div className={styles.bg} />
              <SceneLink href="/work/licklibrary" />
              <Layer m={{ xi: "-6vw", xo: "-10vw", s: 0.04, f: 2.1 }} className={styles.llGhost}>
                <Image src="/licklibrary/scene-guitarist.webp" alt="" width={1951} height={1300} unoptimized />
              </Layer>
              <Layer m={{ xi: "14vw", yi: "4vh", xo: "-4vw", yo: "-10vh", s: 0.06 }} className={styles.llBrowser}>
                <Browser url="licklibrary.com/learn">
                  <div className={styles.videoBox} style={{ aspectRatio: "16 / 9" }}>
                    <video src="/licklibrary/ll-video.mp4" poster="/case/licklibrary/live-learn.webp" muted loop playsInline preload="metadata" aria-hidden="true" />
                  </div>
                </Browser>
              </Layer>
              <Info
                index={1}
                title="LickLibrary"
                href="/work/licklibrary"
                meta="Product design · Front-end · 2026–now"
                line="Redesigning and rebuilding an established guitar-learning platform, one part at a time."
                className={styles.llInfo}
              />
            </section>

            {/* ── 02 Crumble & Co: warm cream, real photography, the store ── */}
            <section {...sceneProps(2)} aria-label="Crumble & Co">
              <div className={styles.bg} />
              <SceneLink href="/work/crumble-and-co" />
              <Layer m={{ xi: "12vw", xo: "6vw", yo: "-12vh", s: 0.05 }} className={styles.crBrowser}>
                <Browser url="crumbleandco.club" scheme="light">
                  <div className={styles.videoBox} style={{ aspectRatio: "16 / 9.1" }}>
                    <video src="/crumble-and-co/crumble-video.mp4" poster="/crumble-and-co/crumble-video-poster.webp" muted loop playsInline preload="none" aria-hidden="true" />
                  </div>
                </Browser>
              </Layer>
              <Layer m={{ xi: "-6vw", yi: "18vh", xo: "-10vw", yo: "-6vh", s: 0.04, f: 2.1 }} className={styles.crDog}>
                <Image src="/crumble-and-co/scene-dog.webp" alt="Crumble the cocker spaniel wearing an Espresso harness" width={1007} height={1184} unoptimized />
              </Layer>
              <Info
                index={2}
                title="Crumble & Co"
                href="/work/crumble-and-co"
                meta="eCommerce · Design & Shopify build · 2026"
                line="Taking a new dog-accessories brand from a logo to a launched Shopify store."
                className={styles.crInfo}
              />
            </section>

            {/* ── 03 Fanzine: deep navy, a family of club apps ── */}
            <section {...sceneProps(3)} aria-label="Fanzine">
              <div className={styles.bg} />
              <SceneLink href="/work/fanzine" />
              <Layer m={{ yi: "6vh", yo: "-4vh", s: 0.04, f: 2 }} className={styles.fzWall}>
                <Image src="/fanzine-homepage.jpg" alt="" width={2880} height={1650} unoptimized />
              </Layer>
              <Layer m={{ xi: "-8vw", yi: "30vh", xo: "-10vw", yo: "-12vh" }} className={`${styles.fzPhone} ${styles.fzLeft}`}>
                <Phone src="/fanzine/screen-chelsea.webp" alt="Chelsea club app" width={515} height={1105} />
              </Layer>
              <Layer m={{ yi: "36vh", yo: "-22vh", s: 0.04 }} className={`${styles.fzPhone} ${styles.fzCentre}`}>
                <Phone src="/fanzine/screen-arsenal.webp" alt="Arsenal club app" width={517} height={1105} />
              </Layer>
              <Layer m={{ xi: "8vw", yi: "42vh", xo: "8vw", yo: "-14vh" }} className={`${styles.fzPhone} ${styles.fzRight}`}>
                <Phone src="/fanzine/screen-man-city.webp" alt="Manchester City club app" width={517} height={1105} />
              </Layer>
              <Info
                index={3}
                title="Fanzine"
                href="/work/fanzine"
                meta="Mobile product system · 2017–2025"
                line="One product system powering 50+ football club apps."
                className={styles.fzInfo}
              />
            </section>

            {/* ── 04 Reawakening: blush, editorial photography, browser + phone ── */}
            <section {...sceneProps(4)} aria-label="Reawakening the Feminine">
              <div className={styles.bg} />
              <SceneLink href="/work/reawakening-the-feminine" />
              <Layer m={{ xi: "-8vw", xo: "-6vw", s: 0.03, f: 2 }} className={styles.rwPhoto}>
                <Image src="/home/reawakening-sunset.webp" alt="" width={2128} height={1920} unoptimized />
              </Layer>
              <Layer m={{ yi: "14vh", xo: "-4vw", yo: "-10vh", s: 0.05 }} className={styles.rwBrowser}>
                <Browser url="reawakeningthefeminineprograms.com" scheme="light">
                  <Image src="/reawakening/screen-desktop.webp" alt="She Who Mothers Herself homepage" width={1521} height={1078} unoptimized />
                </Browser>
              </Layer>
              <Info
                index={4}
                title="Reawakening the Feminine"
                href="/work/reawakening-the-feminine"
                meta="Website · Design & build · 2026"
                line="A calm, editorial website for a nine-week online programme, designed and built."
                className={styles.rwInfo}
              />
            </section>

            {/* ── Closing ── */}
            <section {...sceneProps(5)} aria-labelledby="closing-heading">
              <div className={styles.bg} />
              <Layer m={{ yi: "10vh", f: 1.6 }} className={styles.closing}>
                <h2 id="closing-heading" className={styles.closingTitle}>
                  Let&rsquo;s make something good.
                </h2>
                <nav className={styles.closingLinks} aria-label="Next steps">
                  <Link href="/contact">Get in touch</Link>
                  <Link href="/about">About</Link>
                  <Link href="/work">View all work</Link>
                </nav>
                <div className={styles.closingTry}>
                  <ExperimentLauncher />
                </div>
              </Layer>
            </section>

            {/* Minimal project index */}
            <div ref={markersRef} className={styles.markers} data-theme="light" data-visible="false">
              <ol aria-label="Projects">
                {PROJECTS.map((p) => {
                  const i = SCENES.indexOf(p);
                  return (
                    <li key={p.key}>
                      <a
                        href={`#${p.key}`}
                        onClick={(e) => {
                          e.preventDefault();
                          goTo(i);
                        }}
                      >
                        <span>{String(i).padStart(2, "0")}</span>
                        <em>{p.label}</em>
                      </a>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
