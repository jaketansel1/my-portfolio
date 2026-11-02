"use client";

import Image from "next/image";
import { useState, type CSSProperties, type MouseEvent } from "react";
import type { Side } from "../app/data/about";
import ShowcaseVideo from "./ShowcaseVideo";
import styles from "./SideGrid.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * "A few sides of me": a 3 × 2 grid of two-sided cards. Each card flips in place to its back on hover
 * or keyboard focus; on touch, a tap flips it (and turns any other open card back). The grid itself
 * never moves.
 */
export default function SideGrid({ sides }: { sides: Side[] }) {
  // Only used for touch, where there is no hover.
  const [flipped, setFlipped] = useState<string | null>(null);

  const onClick = (key: string) => (e: MouseEvent) => {
    const type = (e.nativeEvent as PointerEvent).pointerType;
    if (type === "touch" || type === "pen") setFlipped((current) => (current === key ? null : key));
  };

  return (
    <ul className={styles.grid}>
      {sides.map((side, i) => {
        const isFlipped = flipped === side.key;
        // Groups with nothing in them yet are left out.
        const lists = side.lists?.filter((list) => list.items.length);
        return (
          <li key={side.key} className={styles.tile}>
            <button
              type="button"
              className={styles.card}
              data-flipped={isFlipped || undefined}
              aria-pressed={isFlipped}
              onClick={onClick(side.key)}
              style={{ "--back-bg": side.tone.bg, "--back-fg": side.tone.fg } as CSSProperties}
            >
              <span className={styles.inner}>
                {/* Front: photo, number and title. */}
                <span className={styles.front} data-plain={!side.photo || undefined}>
                  {side.photo ? (
                    <span className={styles.photo}>
                      {side.video ? (
                        <ShowcaseVideo
                          src={side.video}
                          poster={side.photo.src}
                          style={side.photo.position ? { objectPosition: side.photo.position } : undefined}
                        />
                      ) : (
                        <Image
                          src={side.photo.src}
                          alt=""
                          fill
                          sizes="(min-width: 900px) 30vw, (min-width: 600px) 46vw, 92vw"
                          style={side.photo.position ? { objectPosition: side.photo.position } : undefined}
                          unoptimized
                        />
                      )}
                    </span>
                  ) : null}
                  <span className={styles.label}>
                    <span className={styles.number}>{pad(i + 1)}</span>
                    <span className={styles.title}>{side.title}</span>
                    <span className={styles.line}>{side.line}</span>
                  </span>
                </span>

                {/* Back: a little more about this side. */}
                <span className={styles.back}>
                  <span className={styles.kicker}>
                    {pad(i + 1)} &mdash; {side.title}
                  </span>
                  <span className={styles.backMain}>
                    <span className={styles.heading}>{side.heading}</span>
                    <span className={styles.text}>{side.text}</span>
                  </span>
                  {lists?.length ? (
                    <span className={styles.lists}>
                      {lists.map((list) => (
                        <span key={list.label} className={styles.list}>
                          <span className={styles.listLabel}>{list.label}</span>
                          {list.items.map((item) => (
                            <span key={item} className={styles.listItem}>
                              {item}
                            </span>
                          ))}
                        </span>
                      ))}
                    </span>
                  ) : null}
                  {side.tags?.length ? <span className={styles.tags}>{side.tags.join(" · ")}</span> : null}
                  {side.note ? <span className={styles.note}>{side.note}</span> : null}
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
