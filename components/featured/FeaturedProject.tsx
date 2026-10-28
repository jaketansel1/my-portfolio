import Link from "next/link";
import Reveal from "../Reveal";

export type FeaturedProjectTheme = {
  background: string;
  foreground: string;
  accent: string;
};

type FeaturedProjectProps = {
  id?: string;
  title: string;
  disciplines: string[];
  year: string;
  headline: React.ReactNode;
  description: string;
  href: string;
  theme: FeaturedProjectTheme;
  visual: React.ReactNode;
  footnote?: string;
};

// Full-bleed, art-directed project section. Each project supplies its own
// theme and visual; the shell owns layout, gutters and the clickable area.
// The visual slot sits in a container that bleeds to the right viewport edge
// and crops at the bottom hairline.
export default function FeaturedProject({
  id,
  title,
  disciplines,
  year,
  headline,
  description,
  href,
  theme,
  visual,
  footnote,
}: FeaturedProjectProps) {
  return (
    <section
      id={id}
      aria-label={`${title} case study`}
      className="featured-project group relative overflow-hidden bg-fp-bg text-fp"
      style={
        {
          "--fp-bg": theme.background,
          "--fp-fg": theme.foreground,
          "--fp-accent": theme.accent,
        } as React.CSSProperties
      }
    >
      <div className="featured-project-gutter pt-14 sm:pt-16 lg:pt-[clamp(3rem,6vh,5rem)]">
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1.5 text-[13px] lg:grid lg:grid-cols-12 lg:gap-x-8">
          <p className="flex items-center gap-2.5 font-medium text-fp lg:col-span-8">
            <span aria-hidden className="h-1.5 w-1.5 bg-fp-accent" />
            {title}
          </p>
          <p className="order-last basis-full text-fp/50 lg:order-0 lg:col-span-3 lg:basis-auto">
            {disciplines.join(" · ")}
          </p>
          <p className="ml-auto text-fp/50 tabular-nums lg:col-span-1 lg:ml-0 lg:text-right">
            {year}
          </p>
        </div>

        <div className="mt-8 grid gap-6 sm:mt-10 lg:mt-10 lg:grid-cols-12 lg:items-end lg:gap-x-8">
          <h2 className="text-balance text-[clamp(2.4rem,9.5vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.03em] sm:text-[clamp(3.25rem,7.4vw,4.5rem)] lg:col-span-8 lg:text-[clamp(3.5rem,5vw,5.75rem)] lg:leading-[0.98] lg:tracking-[-0.035em]">
            {headline}
          </h2>
          <p className="max-w-[38ch] text-base leading-7 text-fp/62 sm:text-[17px] lg:col-span-4 lg:pb-2">
            {description}
          </p>
        </div>
      </div>

      <Reveal className="featured-project-bleed mt-10 sm:mt-12">
        {visual}
      </Reveal>

      <div className="featured-project-bleed border-t border-fp/12">
        <div className="flex items-center justify-between gap-6 py-5 pr-(--fp-gutter) text-sm sm:py-6">
          <Link
            href={href}
            className="inline-flex items-center gap-2 font-medium text-fp underline decoration-transparent decoration-1 underline-offset-[6px] transition-colors duration-300 after:absolute after:inset-0 after:content-[''] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fp-accent group-hover:decoration-fp-accent"
          >
            View case study
            <span
              aria-hidden
              className="text-fp-accent transition-transform duration-300 ease-out group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </Link>
          {footnote ? (
            <span className="text-[13px] text-fp/40">{footnote}</span>
          ) : null}
        </div>
      </div>
    </section>
  );
}
