"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { PersonalChapter } from "../app/data/about";
import styles from "../app/about/about.module.css";

type AboutPersonalProps = {
  chapters: PersonalChapter[];
};

const pad = (n: number) => String(n).padStart(2, "0");

export default function AboutPersonal({ chapters }: AboutPersonalProps) {
  const [active, setActive] = useState(0);
  const chapterRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    // The last chapter to cross the middle of the viewport drives the image.
    let frame = 0;

    const update = () => {
      frame = 0;
      const line = window.innerHeight / 2;
      let current = 0;
      chapterRefs.current.forEach((el, index) => {
        if (el && el.getBoundingClientRect().top < line) current = index;
      });
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const goTo = (index: number) => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    chapterRefs.current[index]?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
  };

  return (
    <div className={styles.personalLayout}>
      <div className={styles.stage}>
        <div className={styles.frame}>
          {chapters.map((chapter, index) => (
            <div
              key={chapter.image}
              className={styles.slide}
              data-state={index < active ? "past" : index === active ? "active" : "next"}
              style={{ zIndex: index }}
            >
              <Image
                src={chapter.image}
                alt={chapter.alt}
                fill
                sizes="(min-width: 900px) 60vw, 100vw"
                className={styles.slideImage}
                style={chapter.position ? { objectPosition: chapter.position } : undefined}
              />
            </div>
          ))}
          <p className={styles.frameCounter} aria-hidden="true">
            <span>{pad(active + 1)}</span> / {pad(chapters.length)}
          </p>
        </div>

        <ol className={styles.stageIndex} aria-label="Chapters">
          {chapters.map((chapter, index) => (
            <li key={chapter.kicker}>
              <button
                type="button"
                onClick={() => goTo(index)}
                aria-current={index === active ? "step" : undefined}
              >
                <span className={styles.thumb} aria-hidden="true">
                  <Image
                    src={chapter.image}
                    alt=""
                    fill
                    sizes="120px"
                    style={{ objectFit: "cover", objectPosition: chapter.position }}
                  />
                </span>
                <span className={styles.thumbLabel}>{chapter.kicker}</span>
              </button>
            </li>
          ))}
        </ol>

        {/* Mobile only: the pinned scene shows the active caption; the chapters below are scroll steps. */}
        <div key={active} className={styles.stageCaption} aria-hidden="true">
          <p className={styles.chapterKicker}>
            {pad(active + 1)} &mdash; {chapters[active].kicker}
          </p>
          <p className={styles.chapterTitle}>{chapters[active].title}</p>
          <p className={styles.chapterText}>{chapters[active].text}</p>
        </div>
      </div>

      <div className={styles.chapters}>
        {chapters.map((chapter, index) => (
          <article
            key={chapter.kicker}
            ref={(el) => {
              chapterRefs.current[index] = el;
            }}
            data-index={index}
            className={styles.chapter}
            data-active={index === active}
          >
            <p className={styles.chapterKicker}>
              {pad(index + 1)} &mdash; {chapter.kicker}
            </p>
            <h3 className={styles.chapterTitle}>{chapter.title}</h3>
            <p className={styles.chapterText}>{chapter.text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
