"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import SiteHeader from "../SiteHeader";
import { Browser, Phone } from "../ui/Device";
import TypedLine from "./TypedLine";
import ShowcaseVideo from "../ShowcaseVideo";
import ScreenRotator from "../ScreenRotator";
import { contact } from "../../app/data/contact";
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

/* LickLibrary scene: rotating screenshots, course storefront first. */
const LL_SCREENS = [
  { src: "/licklibrary/home-course.webp", alt: "LickLibrary course storefront for Classic Albums – Fair Warning" },
  { src: "/licklibrary/home-checkout.webp", alt: "LickLibrary membership checkout: choosing a monthly or annual plan" },
  { src: "/licklibrary/home-confirmation.webp", alt: "LickLibrary checkout confirmation: “You're in!” with next steps" },
  { src: "/licklibrary/home-mega-menu.webp", alt: "LickLibrary admin for curating the Guitar Lessons mega menu" },
  { src: "/licklibrary/home-mega-menu-site.webp", alt: "LickLibrary Guitar Courses mega menu showing featured courses" },
];
/** Hero second line: what I do, then a nudge towards the work. */
const HERO_LINES = ["who builds and ships.", "scroll to see my work ↓"];
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

/**
 * Makes the whole scene clickable. Hidden from keyboard and screen readers: the title and
 * "View case study" links are the accessible routes, so there is no duplicate tab stop.
 */
function SceneLink({ href }: { href: string }) {
  return <Link href={href} className={styles.sceneLink} tabIndex={-1} aria-hidden="true" />;
}

function Info({
  title,
  href,
  meta,
  line,
  className,
}: {
  title: string;
  href: string;
  meta: string;
  line: string;
  className?: string;
}) {
  return (
    <Layer m={{ yi: "6vh", yo: "-5vh", f: 2.4 }} className={`${styles.info} ${className ?? ""}`}>
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
  const markersRef = useRef<HTMLElement>(null);
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
      });
      headerRef.current?.setAttribute("data-theme", SCENES[i].theme);
      markersRef.current?.setAttribute("data-theme", SCENES[i].theme);
      markersRef.current?.setAttribute("data-visible", String(SCENES[i].key !== "closing"));
      markersRef.current?.setAttribute("data-scene", SCENES[i].key);
      markersRef.current?.querySelectorAll("ol a").forEach((a, k) => {
        if (PROJECTS[k].key === SCENES[i].key) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });
    };

    const update = () => {
      frame = 0;
      if (!immersive()) {
        els.forEach((el) => {
          el?.removeAttribute("style");
          el?.removeAttribute("data-video-near");
        });
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
        el.toggleAttribute("data-video-near", p > 0 && Math.abs(p - i) < 1);
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

  /*
   * Warm-up: once the page is idle, fetch and decode every scene's images, so a scene's first
   * appearance doesn't stall on image decoding mid-transition.
   */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const warm = () => {
      for (const img of track.querySelectorAll("img")) {
        img.loading = "eager";
        img.decode().catch(() => {});
      }
    };
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(warm, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(warm, 1200);
    return () => window.clearTimeout(id);
  }, []);

  /*
   * Paged scrolling. One wheel or trackpad gesture, swipe or key press moves exactly one scene, as
   * a single eased animation. The tween skips the held part of each segment (instant jumps there
   * change nothing on screen) and plays only the moving part, so the motion starts immediately.
   * Anything that leaves the page between scenes (scrollbar drag, find-in-page) settles on the nearest one.
   */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const n = SCENES.length - 1;
    const DURATION = 1000;
    let animating = false;
    let raf = 0;
    let lastWheel = 0;
    let lastDelta = 0;
    let settleTimer = 0;
    let touchY: number | null = null;

    const geometry = () => {
      const total = track.offsetHeight - window.innerHeight;
      const top = track.getBoundingClientRect().top + window.scrollY;
      return { top, total, seg: total / n };
    };
    /** Scene position from scroll, as a float (0 … n). */
    const position = () => {
      const { top, seg } = geometry();
      return (window.scrollY - top) / seg;
    };
    const inTrack = () => {
      const pos = position();
      return pos > -0.01 && pos < n + 0.01;
    };
    const jump = (y: number) => window.scrollTo({ top: y, behavior: "instant" as ScrollBehavior });

    /** Animate from scene `from` to its neighbour `to`, playing only the moving middle of the segment. */
    const step = (from: number, to: number) => {
      const { top, seg } = geometry();
      const dir = Math.sign(to - from);
      const start = top + (from + dir * HOLD) * seg;
      const end = top + (to - dir * HOLD) * seg;
      animating = true;
      jump(start);
      const t0 = performance.now();
      const tick = (now: number) => {
        const x = Math.min((now - t0) / DURATION, 1);
        // Linear here: the stage already eases the visible motion across this stretch.
        jump(start + (end - start) * x);
        if (x < 1) raf = requestAnimationFrame(tick);
        else {
          jump(top + to * seg);
          animating = false;
        }
      };
      raf = requestAnimationFrame(tick);
    };

    /** Move one scene in a direction. Returns false at the ends, so native scrolling can take over. */
    const page = (dir: 1 | -1) => {
      const current = Math.round(position());
      const next = current + dir;
      if (next < 0 || next > n) return false;
      step(current, next);
      return true;
    };

    const onWheel = (e: WheelEvent) => {
      if (!immersive() || e.ctrlKey || !inTrack()) return;
      const now = performance.now();
      const delta = Math.abs(e.deltaY);
      const quiet = now - lastWheel > 160;
      // A fresh gesture: either a pause since the last event, or a clear acceleration on top of a momentum tail.
      const fresh = quiet || (delta > 20 && delta > lastDelta * 1.6);
      lastWheel = now;
      lastDelta = delta;
      if (animating || !fresh || delta < 2) {
        e.preventDefault();
        return;
      }
      if (page(e.deltaY > 0 ? 1 : -1)) e.preventDefault();
    };

    const onKey = (e: KeyboardEvent) => {
      if (!immersive() || !inTrack() || e.altKey || e.ctrlKey || e.metaKey) return;
      const target = e.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable], [role=dialog]")) return;
      // Space on a focused button or link activates it; leave that alone.
      if (e.key === " " && target?.closest("a, button")) return;
      const down = e.key === "ArrowDown" || e.key === "PageDown" || (e.key === " " && !e.shiftKey);
      const up = e.key === "ArrowUp" || e.key === "PageUp" || (e.key === " " && e.shiftKey);
      if (!down && !up) return;
      e.preventDefault();
      if (!animating) page(down ? 1 : -1);
    };

    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0]?.clientY ?? null;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (immersive() && inTrack() && touchY !== null) e.preventDefault();
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (touchY === null || !immersive() || !inTrack()) return;
      const dy = touchY - (e.changedTouches[0]?.clientY ?? touchY);
      touchY = null;
      if (!animating && Math.abs(dy) > 40) page(dy > 0 ? 1 : -1);
    };

    /** Anything that stops between scenes eases onto the nearest one. */
    const onScroll = () => {
      if (animating || !immersive()) return;
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => {
        if (animating || !inTrack()) return;
        const pos = position();
        const nearest = Math.round(pos);
        if (Math.abs(pos - nearest) > 0.002) goTo(Math.min(Math.max(nearest, 0), n));
      }, 180);
    };

    // The header name jumps home instantly: drop any paging animation in progress.
    const onHomeReset = () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(settleTimer);
      animating = false;
    };
    window.addEventListener("home:reset", onHomeReset);
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(settleTimer);
      window.removeEventListener("home:reset", onHomeReset);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("scroll", onScroll);
    };
  }, [goTo]);

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
                  <span className={styles.mask}>
                    <span>Product designer</span>
                  </span>
                  <span className={`${styles.mask} ${styles.headlineMuted}`}>
                    <span>
                      <TypedLine phrases={HERO_LINES} />
                    </span>
                  </span>
                </h1>
              </Layer>
              <Layer m={{ yo: "-6vh", f: 2.4 }} className={styles.introFoot}>
                <p className={styles.facts}>8 years in digital product &middot; 50+ products launched &middot; 5M+ users reached</p>
                <div className={styles.introActions}>
                  <a
                    href="#licklibrary"
                    className={home.primaryButton}
                    onClick={(e) => {
                      e.preventDefault();
                      goTo(1);
                    }}
                  >
                    Selected work <span aria-hidden="true">&darr;</span>
                  </a>
                  <Link href="/work" className={home.textLink}>
                    View all work <span aria-hidden="true">&rarr;</span>
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
                <Browser url="licklibrary.com/learn" scheme="dark">
                  <div className={styles.videoBox} style={{ aspectRatio: "16 / 9" }}>
                    <ScreenRotator screens={LL_SCREENS} interval={3000} sceneControlled />
                  </div>
                </Browser>
              </Layer>
              <Info
                title="LickLibrary"
                href="/work/licklibrary"
                meta="Product design · Frontend · 2026–now"
                line="Redesigning and shipping new experiences across an established guitar-learning platform."
                className={styles.llInfo}
              />
            </section>

            {/* ── 02 Crumble & Co: warm cream, real photography, the store ── */}
            <section {...sceneProps(2)} aria-label="Crumble & Co">
              <div className={styles.bg} />
              <SceneLink href="/work/crumble-and-co" />
              <Layer m={{ xi: "12vw", xo: "6vw", yo: "-12vh", s: 0.05 }} className={styles.crBrowser}>
                <Browser url="crumbleandco.club" scheme="light">
                  <div className={styles.videoBox} style={{ aspectRatio: "16 / 9" }}>
                    <ShowcaseVideo src="/crumble-and-co/crumble-video.mp4" webmSrc="/crumble-and-co/crumble-video.webm" poster="/crumble-and-co/crumble-video-poster.webp" sceneControlled />
                  </div>
                </Browser>
              </Layer>
              <Layer m={{ xi: "-6vw", yi: "18vh", xo: "-10vw", yo: "-6vh", s: 0.04, f: 2.1 }} className={styles.crDog}>
                <Image src="/crumble-and-co/scene-dog.webp" alt="Crumble the cocker spaniel wearing an Espresso harness" width={1007} height={1184} unoptimized />
              </Layer>
              <Info
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
              {/* One composition: Arsenal leads, the two blue clubs behind it, Celtic and West Ham smallest at the edges. Its own grid when stacked. */}
              <div className={styles.fzPhones}>
                <Layer m={{ xi: "-12vw", yi: "26vh", xo: "-14vw", yo: "-10vh" }} className={`${styles.fzPhone} ${styles.fzFarLeft}`}>
                  <Phone className={styles.phone}>
                    <Image src="/fanzine/app-celtic.webp" alt="Celtic club app" width={900} height={1954} unoptimized />
                  </Phone>
                </Layer>
                <Layer m={{ xi: "-8vw", yi: "30vh", xo: "-10vw", yo: "-12vh" }} className={`${styles.fzPhone} ${styles.fzLeft}`}>
                  <Phone className={styles.phone}>
                    <Image src="/fanzine/app-chelsea.webp" alt="Chelsea club app" width={900} height={1958} unoptimized />
                  </Phone>
                </Layer>
                <Layer m={{ yi: "36vh", yo: "-22vh", s: 0.04 }} className={`${styles.fzPhone} ${styles.fzCentre}`}>
                  <Phone className={styles.phone}>
                    <Image src="/fanzine/app-arsenal.webp" alt="Arsenal club app" width={900} height={1964} unoptimized />
                  </Phone>
                </Layer>
                <Layer m={{ xi: "8vw", yi: "42vh", xo: "8vw", yo: "-14vh" }} className={`${styles.fzPhone} ${styles.fzRight}`}>
                  <Phone className={styles.phone}>
                    <Image src="/fanzine/app-man-city.webp" alt="Manchester City club app" width={900} height={1958} unoptimized />
                  </Phone>
                </Layer>
                <Layer m={{ xi: "12vw", yi: "46vh", xo: "12vw", yo: "-10vh" }} className={`${styles.fzPhone} ${styles.fzFarRight}`}>
                  <Phone className={styles.phone}>
                    <Image src="/fanzine/app-west-ham.webp" alt="West Ham club app" width={900} height={1955} unoptimized />
                  </Phone>
                </Layer>
              </div>
              <Info
                title="Fanzine"
                href="/work/fanzine"
                meta="Mobile product system · 2017–2025"
                line="One product system powering 50+ football club apps."
                className={styles.fzInfo}
              />
            </section>

            {/* ── 04 Reawakening: soft warm gradient, the website as the focus, browser + phone ── */}
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
              <Layer m={{ yi: "22vh", xo: "-2vw", yo: "-14vh", s: 0.05 }} className={styles.rwPhone}>
                <Phone className={styles.phone}>
                    <Image src="/reawakening/screen-mobile.jpg" alt="She Who Mothers Herself on mobile" width={945} height={2048} unoptimized />
                  </Phone>
              </Layer>
              <Info
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
                <div className={styles.closingHead}>
                  <h2 id="closing-heading" className={styles.closingTitle}>
                    <span>Let&rsquo;s make something</span> <span>good together.</span>
                  </h2>
                  <p className={styles.closingLine}>Have a project, role or idea in mind?</p>
                  <a href={`mailto:${contact.email}`} className={styles.closingCta}>
                    <span className={styles.closingCtaText}>Get in touch</span>
                    <span className={styles.closingCtaArrow} aria-hidden="true">
                      &#8599;
                    </span>
                  </a>
                </div>

                <footer className={styles.closingFoot}>
                  <nav aria-label="Footer">
                    <Link href="/work">Work</Link>
                    <span aria-hidden="true">&middot;</span>
                    <Link href="/about">About</Link>
                    {contact.linkedin.href ? (
                      <>
                        <span aria-hidden="true">&middot;</span>
                        <a href={contact.linkedin.href} target="_blank" rel="noreferrer">
                          LinkedIn
                        </a>
                      </>
                    ) : null}
                  </nav>
                  <p>&copy; {new Date().getFullYear()} Jake Tansel</p>
                </footer>
              </Layer>
            </section>

            {/* Project index: a quiet row of the four projects; click to jump to one. */}
            <nav ref={markersRef} className={styles.rail} data-theme="light" data-visible="true" data-scene="intro" aria-label="Projects">
              <ol className={styles.railList}>
                {PROJECTS.map((project) => {
                  const i = SCENES.indexOf(project);
                  return (
                    <li key={project.key}>
                      <a
                        href={`#${project.key}`}
                        onClick={(e) => {
                          e.preventDefault();
                          goTo(i);
                        }}
                      >
                        <span>{String(i).padStart(2, "0")}</span>
                        {project.label}
                      </a>
                    </li>
                  );
                })}
              </ol>
            </nav>
          </div>
        </div>
      </main>
    </div>
  );
}
