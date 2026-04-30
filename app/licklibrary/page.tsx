import Image from "next/image";
import SiteHeader from "../components/SiteHeader";

export default function LickLibraryPage() {
  const featureNav = [
    {
      title: "Landing Page Redesign",
      description: "Improving clarity, hierarchy and conversion",
      href: "#landing-page-redesign",
    },
    {
      title: "Sign up & Onboarding",
      description: "Simplifying the journey and reducing friction",
      href: "#signup-onboarding",
    },
    {
      title: "Guided Discovery (AI Assistant)",
      description: "Helping users find what to learn next",
      href: "#guided-discovery",
    },
  ];

  const objectives = [
    "Modernise key pages including the homepage, sign up flow and onboarding",
    "Help users understand where to start",
    "Make the product feel clearer, more premium and easier to navigate",
  ];

  const workIncluded = [
    "Homepage redesign",
    "Sign up flow",
    "Onboarding",
    "Guided discovery concepts",
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#080808] text-white">
      <style>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[620px] bg-[radial-gradient(circle_at_50%_4%,rgba(214,158,88,0.2),transparent_34%),radial-gradient(circle_at_50%_0%,rgba(89,105,255,0.12),transparent_42%)]" />

      <SiteHeader variant="dark" />

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10">
        <section className="mx-auto max-w-5xl pb-24 pt-28 text-center sm:pb-32 sm:pt-36 lg:pb-36 lg:pt-44">
          <div className="mb-7 flex justify-center">
            <Image
              src="/licklibrary-logo.png"
              alt="LickLibrary logo"
              width={179}
              height={36}
              priority
              className="h-auto w-[179px]"
            />
          </div>

          <p className="mb-5 text-sm font-medium text-white/38">
            Guitar Learning Platform
          </p>
          <h1 className="text-5xl font-semibold leading-[1.08] text-white sm:text-6xl lg:text-7xl">
            LickLibrary Redesign
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-8 text-white/68 sm:text-2xl sm:leading-9">
            Modernising a 30+ year old guitar learning platform
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#"
              className="inline-flex h-11 items-center justify-center rounded-full bg-white px-5 text-sm font-medium text-[#080808] transition-colors hover:bg-white/90"
            >
              View prototype
            </a>
            <a
              href="#overview"
              className="inline-flex h-11 items-center justify-center rounded-full border border-white/14 px-5 text-sm font-medium text-white/82 transition-colors hover:border-white/28 hover:text-white"
            >
              Read case study
            </a>
          </div>

          <div className="mx-auto mt-10 grid max-w-4xl gap-2 rounded-[26px] border border-white/10 bg-white/[0.035] p-2 shadow-[0_24px_80px_rgba(0,0,0,0.26)] backdrop-blur sm:grid-cols-3">
            {featureNav.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="group rounded-[20px] border border-white/[0.08] bg-white/[0.035] px-4 py-3 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d4a15f]/55 hover:bg-white/[0.07] hover:shadow-[0_0_30px_rgba(212,161,95,0.12)] active:translate-y-0 active:border-[#d4a15f]/80 active:bg-[#d4a15f]/10 focus:outline-none focus-visible:border-[#d4a15f] focus-visible:ring-2 focus-visible:ring-[#d4a15f]/30"
              >
                <p className="text-sm font-semibold text-white transition-colors group-hover:text-[#f2cf9d]">
                  {item.title}
                </p>
                <p className="mt-1 text-xs leading-5 text-white/46 transition-colors group-hover:text-white/62">
                  {item.description}
                </p>
              </a>
            ))}
          </div>
        </section>

        <section
          id="overview"
          className="border-t border-white/10 py-16 sm:py-20 lg:pb-28"
        >
          <h2 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
            Project Overview
          </h2>

          <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="grid gap-10">
              <section>
                <h3 className="text-sm font-medium text-white/46">Background</h3>
                <p className="mt-4 max-w-xl text-base leading-7 text-white/68">
                  LickLibrary is an established online guitar learning platform
                  with over 30 years of content, lessons and artist-led courses.
                </p>
              </section>

              <section>
                <h3 className="text-sm font-medium text-white/46">Challenge</h3>
                <p className="mt-4 max-w-xl text-base leading-7 text-white/68">
                  The platform had a huge amount of valuable content, but the
                  experience often felt more like a catalogue than a guided
                  learning journey.
                </p>
              </section>

              <section>
                <h3 className="text-sm font-medium text-white/46">Objectives</h3>
                <ul className="mt-4 grid gap-3 text-base leading-7 text-white/68">
                  {objectives.map((objective) => (
                    <li key={objective} className="flex gap-3">
                      <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d4a15f]" />
                      <span>{objective}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <div className="grid gap-10 lg:border-l lg:border-white/10 lg:pl-16">
              <section>
                <h3 className="text-sm font-medium text-white/46">My role</h3>
                <p className="mt-4 text-base leading-7 text-white/78">
                  UX/UI Designer
                </p>
              </section>

              <section>
                <h3 className="text-sm font-medium text-white/46">Timeline</h3>
                <p className="mt-4 text-base leading-7 text-white/78">
                  2026 &mdash; ongoing
                </p>
              </section>

              <section>
                <h3 className="text-sm font-medium text-white/46">
                  Work included
                </h3>
                <ul className="mt-4 grid gap-3 text-base leading-7 text-white/68">
                  {workIncluded.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-white/28" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="text-sm font-medium text-white/46">Tools</h3>
                <p className="mt-4 text-base leading-7 text-white/68">
                  Figma, ChatGPT, Codex, Base44
                </p>
              </section>
            </div>
          </div>
        </section>

        <section
          id="landing-page-redesign"
          className="scroll-mt-8 border-t border-white/10 py-24 sm:py-32 lg:py-40"
        >
          <div className="mb-14">
            <p className="mb-4 text-sm font-medium text-white/38">
              Transformation
            </p>
            <h2 className="text-5xl font-semibold leading-tight text-white sm:text-6xl">
              Homepage Transformation
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <article>
              <div className="relative h-[440px] overflow-hidden rounded-[34px] border border-white/10 bg-[#141414] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)] sm:h-[540px]">
                <div className="absolute inset-x-6 top-6 grid gap-4">
                  <div className="h-16 rounded-2xl bg-white/10" />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-28 rounded-2xl bg-white/[0.07]" />
                    <div className="h-28 rounded-2xl bg-white/[0.06]" />
                  </div>
                  <div className="grid gap-3">
                    <div className="h-12 rounded-2xl bg-white/[0.07]" />
                    <div className="h-12 rounded-2xl bg-white/[0.06]" />
                    <div className="h-12 rounded-2xl bg-white/[0.05]" />
                    <div className="h-12 rounded-2xl bg-white/[0.05]" />
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-white/56">
                Long, cluttered and hard to scan
              </p>
            </article>

            <article>
              <div className="relative h-[440px] overflow-hidden rounded-[34px] border border-white/10 bg-[#181511] shadow-[0_24px_70px_rgba(212,161,95,0.08),inset_0_0_0_1px_rgba(255,255,255,0.04)] sm:h-[540px]">
                <div className="absolute inset-x-6 top-6 grid gap-5">
                  <div className="h-36 rounded-[26px] bg-[#f3eadf]" />
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-24 rounded-2xl bg-white/14" />
                    <div className="h-24 rounded-2xl bg-white/12" />
                    <div className="h-24 rounded-2xl bg-white/10" />
                  </div>
                  <div className="h-16 rounded-2xl bg-white/10" />
                  <div className="h-16 rounded-2xl bg-white/8" />
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-white/56">
                Clearer hierarchy, stronger entry points and a more premium feel
              </p>
            </article>
          </div>

          <div className="mt-20 sm:mt-24">
            <div className="relative h-[500px] overflow-hidden rounded-[38px] border border-white/10 bg-[#111111] shadow-[0_28px_90px_rgba(0,0,0,0.32),inset_0_0_0_1px_rgba(255,255,255,0.04)] sm:h-[660px]">
              <div className="absolute inset-6 rounded-[30px] bg-[#f4efe8] p-6 text-[#15120e]">
                <div className="mb-6 h-40 rounded-[26px] bg-[#15120e]/10" />
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="h-32 rounded-2xl bg-white/80" />
                  <div className="h-32 rounded-2xl bg-white/80" />
                  <div className="h-32 rounded-2xl bg-white/80" />
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-[1.4fr_0.6fr]">
                  <div className="h-36 rounded-2xl bg-white/76" />
                  <div className="h-36 rounded-2xl bg-[#15120e]/10" />
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-white/56">
              Redesigned homepage showcase
            </p>
          </div>
        </section>

        <section
          id="signup-onboarding"
          className="scroll-mt-8 border-t border-white/10 py-16 sm:py-20 lg:py-28"
        >
          <div className="mb-10">
            <p className="mb-4 text-sm font-medium text-white/38">
              Journey
            </p>
            <h2 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Sign Up &amp; Onboarding
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <article>
              <div className="relative h-[360px] overflow-hidden rounded-[34px] border border-white/10 bg-[#141414] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)] sm:h-[440px]">
                <div className="absolute inset-6 rounded-[26px] bg-white/[0.04] p-5">
                  <div className="mb-5 h-12 rounded-2xl bg-white/10" />
                  <div className="grid gap-3">
                    <div className="h-20 rounded-2xl bg-white/[0.07]" />
                    <div className="h-20 rounded-2xl bg-white/[0.06]" />
                    <div className="h-20 rounded-2xl bg-white/[0.05]" />
                  </div>
                  <div className="mt-5 h-12 rounded-full bg-white/[0.06]" />
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-white/56">
                Existing flow lacked focus and clarity
              </p>
            </article>

            <article>
              <div className="relative h-[360px] overflow-hidden rounded-[34px] border border-white/10 bg-[#181511] shadow-[0_24px_70px_rgba(212,161,95,0.08),inset_0_0_0_1px_rgba(255,255,255,0.04)] sm:h-[440px]">
                <div className="absolute inset-6 rounded-[26px] bg-[#f5efe5] p-5 text-[#171512]">
                  <div className="mb-5 flex gap-2">
                    <div className="h-2 flex-1 rounded-full bg-[#171512]/50" />
                    <div className="h-2 flex-1 rounded-full bg-[#171512]/20" />
                    <div className="h-2 flex-1 rounded-full bg-[#171512]/20" />
                  </div>
                  <div className="h-24 rounded-[24px] bg-[#171512]/10" />
                  <div className="mt-4 grid gap-3">
                    <div className="h-16 rounded-2xl bg-white/78" />
                    <div className="h-16 rounded-2xl bg-white/78" />
                    <div className="h-12 rounded-full bg-[#171512]" />
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-white/56">
                A clearer step-by-step journey from plan selection to onboarding
              </p>
            </article>
          </div>
        </section>

        <section
          id="guided-discovery"
          className="scroll-mt-8 border-t border-white/10 py-16 sm:py-20 lg:py-28"
        >
          <div className="mb-10">
            <p className="mb-4 text-sm font-medium text-white/38">
              Discovery
            </p>
            <h2 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Guided Discovery
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="max-w-xl text-base leading-7 text-white/68">
                An AI-assisted flow to help learners choose the right lessons,
                artists and practice paths based on their goals and current
                ability.
              </p>
              <ul className="mt-8 grid gap-3 text-base leading-7 text-white/68">
                {[
                  "Personalised lesson recommendations",
                  "Clearer starting points for new users",
                  "A more guided path through a deep content library",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d4a15f]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative h-[420px] overflow-hidden rounded-[34px] border border-white/10 bg-[#181511] shadow-[0_24px_70px_rgba(212,161,95,0.08),inset_0_0_0_1px_rgba(255,255,255,0.04)] sm:h-[500px]">
              <div className="absolute inset-6 rounded-[26px] bg-[#f5efe5] p-5 text-[#171512]">
                <div className="mb-5 h-12 rounded-2xl bg-[#171512]/10" />
                <div className="grid gap-4">
                  <div className="max-w-[78%] rounded-[22px] bg-white px-5 py-4 shadow-sm">
                    <div className="mb-2 h-3 w-28 rounded-full bg-[#171512]/18" />
                    <div className="h-3 w-full rounded-full bg-[#171512]/10" />
                  </div>
                  <div className="ml-auto max-w-[72%] rounded-[22px] bg-[#171512] px-5 py-4">
                    <div className="mb-2 h-3 w-24 rounded-full bg-white/35" />
                    <div className="h-3 w-full rounded-full bg-white/18" />
                  </div>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <div className="h-28 rounded-2xl bg-white/78" />
                  <div className="h-28 rounded-2xl bg-white/78" />
                  <div className="h-28 rounded-2xl bg-[#d4a15f]/28" />
                </div>
                <div className="mt-5 h-12 rounded-full bg-[#171512]" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
