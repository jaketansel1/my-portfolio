"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Link to the homepage. Already on the homepage, it jumps straight back to the top (no smooth scroll)
 * instead of doing nothing.
 */
export default function HomeLink({ className, children, ...rest }: { className?: string; children: ReactNode; "aria-label"?: string }) {
  const pathname = usePathname();
  return (
    <Link
      href="/"
      className={className}
      {...rest}
      onClick={(event) => {
        if (pathname !== "/") return;
        event.preventDefault();
        // A home action, not a scroll: stop any page-driven scroll animation, then jump straight to the
        // top so the homepage scenes never animate past on the way.
        window.dispatchEvent(new Event("home:reset"));
        window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
        if (window.location.hash) history.replaceState(null, "", "/");
      }}
    >
      {children}
    </Link>
  );
}
