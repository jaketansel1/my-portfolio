import Link from "next/link";

type SiteHeaderProps = {
  variant?: "light" | "dark";
};

export default function SiteHeader({ variant = "light" }: SiteHeaderProps) {
  const isDark = variant === "dark";
  const linkClass = isDark
    ? "transition-colors hover:text-white"
    : "transition-colors hover:text-black";
  const navColor = isDark ? "text-white/58" : "text-black/55";

  return (
    <header className="relative z-10">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-7 text-sm sm:px-8 lg:px-10">
        <Link
          href="/"
          className={`font-medium ${isDark ? "text-white/82 hover:text-white" : "text-black hover:text-black"}`}
        >
          Jake Tansel
        </Link>
        <div className={`flex items-center gap-7 text-[13px] ${navColor}`}>
          <Link href="/work" className={linkClass}>
            Work
          </Link>
          <Link href="/about" className={linkClass}>
            About
          </Link>
          <Link href="/contact" className={linkClass}>
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}
