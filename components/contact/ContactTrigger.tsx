"use client";

import type { ReactNode } from "react";
import { useContact } from "./ContactPanel";

/**
 * Any button that opens the global contact panel, e.g. the nav's "Contact" or a "Let's talk →" CTA.
 * `nav` marks the header item, which other opens fall back to for positioning.
 */
export default function ContactTrigger({
  children,
  className,
  nav,
}: {
  children: ReactNode;
  className?: string;
  nav?: boolean;
}) {
  const { toggle, isOpen } = useContact();
  return (
    <button
      type="button"
      className={className}
      onClick={(e) => toggle(e.currentTarget)}
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      data-contact-nav={nav || undefined}
    >
      {children}
    </button>
  );
}
