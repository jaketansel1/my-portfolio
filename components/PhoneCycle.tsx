"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Phone } from "./ui/Device";
import styles from "./PhoneCycle.module.css";

type Screen = { src: string; width: number; height: number };

/** Seconds each set of screens holds before the next. */
const HOLD = 3.2;
/** Delay between neighbouring phones changing, so the change ripples across the row. */
const STAGGER = 0.18;

/**
 * A row of phones whose screens cross-fade through a pool of app screenshots (e.g. one per club). On each
 * step every phone moves on by the row's length, so no screen ever shows on two phones at once and every
 * phone changes. Pauses off screen and while the tab is hidden; with reduced motion the first screens stay
 * and the rest never load.
 */
export default function PhoneCycle({
  screens,
  count,
  sizes,
  phoneClassName,
}: {
  screens: Screen[];
  /** Phones in the row. Keep it below the pool size so every step brings new screens. */
  count: number;
  sizes: string;
  phoneClassName?: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  // The rest of the pool mounts only once the row is near the viewport and motion is allowed.
  const [load, setLoad] = useState(false);

  useEffect(() => {
    // The row is display: contents (its phones sit straight in the parent's layout), so watch the parent.
    const el = root.current?.parentElement;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;
    let timer = 0;
    let visible = false;
    const sync = () => {
      window.clearInterval(timer);
      if (visible && !document.hidden && !reduce.matches) timer = window.setInterval(() => setStep((s) => s + 1), HOLD * 1000);
    };
    // Cycle only while the row is actually on screen. The next screens mount on first sight and have a whole
    // hold (3s+) to load before any of them fades in.
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setLoad(true);
      visible = entry.isIntersecting;
      sync();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    reduce.addEventListener("change", sync);
    return () => {
      window.clearInterval(timer);
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reduce.removeEventListener("change", sync);
    };
  }, []);

  return (
    <div ref={root} className={styles.row}>
      {Array.from({ length: count }, (_, phone) => {
        const active = (step * count + phone) % screens.length;
        return (
          <Phone key={phone} className={phoneClassName}>
            {screens.map((screen, i) =>
              load || i === phone ? (
                <div
                  key={screen.src}
                  className={styles.screen}
                  data-active={i === active || undefined}
                  style={{ transitionDelay: `${phone * STAGGER}s` }}
                >
                  <Image src={screen.src} alt="" width={screen.width} height={screen.height} sizes={sizes} unoptimized />
                </div>
              ) : null,
            )}
          </Phone>
        );
      })}
    </div>
  );
}
