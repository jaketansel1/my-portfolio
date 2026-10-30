"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./page.module.css";

export type ExplorerMenu = {
  key: string;
  title: string;
  src: string;
  /** Where the screenshot comes from: the live site or the prototype. */
  source: string;
  tabs: string;
  blocks: string[];
};

/**
 * Lets a reviewer flip through the five desktop menus in one frame
 * instead of scrolling past five near-identical screenshots.
 */
export default function MenuExplorer({ menus }: { menus: ExplorerMenu[] }) {
  const [current, setCurrent] = useState(menus[0].key);
  const menu = menus.find((m) => m.key === current) ?? menus[0];

  return (
    <div className={styles.explorer}>
      <div role="tablist" aria-label="Menus" className={styles.explorerTabs}>
        {menus.map((m) => (
          <button key={m.key} type="button" role="tab" aria-selected={m.key === current} onClick={() => setCurrent(m.key)}>
            {m.title}
          </button>
        ))}
      </div>

      <div className={styles.explorerStage} key={menu.key}>
        <div className={styles.explorerBrowser}>
          <div className={styles.explorerChrome} aria-hidden="true">
            <span />
            <span />
            <span />
            <em>licklibrary.com</em>
          </div>
          <div className={styles.explorerCrop}>
            <Image src={menu.src} alt={`The ${menu.title} mega menu`} width={2400} height={1500} unoptimized />
          </div>
        </div>
        <dl className={styles.explorerMeta}>
          <div>
            <dt>Tabs</dt>
            <dd>{menu.tabs}</dd>
          </div>
          <div>
            <dt>Blocks</dt>
            <dd>{menu.blocks.join(" · ")}</dd>
          </div>
          <div>
            <dt>Screenshot</dt>
            <dd>{menu.source}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
