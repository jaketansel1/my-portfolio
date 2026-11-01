import Link from "next/link";
import HomeLink from "./HomeLink";
import ContactTrigger from "./contact/ContactTrigger";
import styles from "./SiteHeader.module.css";

type SiteHeaderProps = {
  variant?: "light" | "dark";
  editorial?: boolean;
  current?: "work" | "about";
};

const editorialLinks = [
  { key: "work", href: "/work", label: "Work" },
  { key: "about", href: "/about", label: "About" },
] as const;

export default function SiteHeader({ variant = "light", editorial = false, current }: SiteHeaderProps) {
  const isDark = variant === "dark";
  const linkClass = isDark
    ? "transition-colors hover:text-white"
    : "transition-colors hover:text-black";
  const navColor = isDark ? "text-white/58" : "text-black/55";

  if (editorial) {
    return (
      <header className={styles.header}>
        <HomeLink className={styles.wordmark} aria-label="Jake Tansel, home">
          Jake Tansel
        </HomeLink>
        <nav aria-label="Main navigation" className={styles.navigation}>
          {editorialLinks.map((link) => (
            <Link key={link.key} href={link.href} aria-current={current === link.key ? "page" : undefined}>
              {link.label}
            </Link>
          ))}
          {/* Contact opens the global panel rather than a page. */}
          <ContactTrigger nav className={styles.contact}>
            Contact
          </ContactTrigger>
        </nav>
      </header>
    );
  }

  return (
    <header className="relative z-10">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-7 text-sm sm:px-8 lg:px-10">
        <HomeLink className={`font-medium ${isDark ? "text-white/82 hover:text-white" : "text-black hover:text-black"}`}>
          Jake Tansel
        </HomeLink>
        <nav aria-label="Main navigation" className={`flex items-center gap-7 text-[13px] ${navColor}`}>
          <Link href="/work" className={linkClass}>
            Work
          </Link>
          <Link href="/about" className={linkClass}>
            About
          </Link>
          <ContactTrigger nav className={linkClass}>
            Contact
          </ContactTrigger>
        </nav>
      </div>
    </header>
  );
}
