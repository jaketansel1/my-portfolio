"use client";

import { useState } from "react";
import Image from "next/image";
import SiteHeader from "../../../components/SiteHeader";

// ── Redesign Highlights data ─────────────────────────────────────────────────
// Add real screenshot paths to `img` when ready.
// Each tab: pill label, headline, description, bullets, screenshot.

const HIGHLIGHTS = [
  {
    id: "homepage",
    label: "Homepage Redesign",
    headline: "A clearer entry point to the platform",
    desc: "The original homepage tried to surface everything at once. The redesign establishes a single hierarchy — understand the platform, find your path, start learning.",
    img: null as string | null, // "/licklibrary/homepage-redesign.jpg"
    placeholder: "Homepage redesign screenshot",
    points: ["Improved hierarchy and visual clarity", "Clearer value proposition above the fold", "Discovery Assistant promoted as primary CTA"],
  },
  {
    id: "onboarding",
    label: "Sign Up & Onboarding",
    headline: "Converting momentum into membership",
    desc: "Once users found the right content through Discovery, the sign-up flow needed to convert that momentum — not interrupt it with friction.",
    img: null as string | null, // "/licklibrary/onboarding.jpg"
    placeholder: "Sign up & onboarding screenshot",
    points: ["Reduced from 6 steps to 3", "Simplified member journey", "Mobile-first layout throughout"],
  },
  {
    id: "megamenu",
    label: "Mega Menu",
    headline: "Navigation that reflects how users think",
    desc: "The original navigation was organised by content type. The redesign organises by user intent — making it faster to find the right section from anywhere in the platform.",
    img: null as string | null, // "/licklibrary/megamenu.jpg"
    placeholder: "Mega menu screenshot",
    points: ["Improved navigation structure", "Better content organisation", "Faster path to discovery"],
  },
  {
    id: "learningpaths",
    label: "Learning Paths",
    headline: "A structured route through the library",
    desc: "Instead of individual lessons existing in isolation, Learning Paths give users a clear progression — a beginning, middle and end to their guitar journey.",
    img: null as string | null, // "/licklibrary/learning-paths.jpg"
    placeholder: "Learning paths screenshot",
    points: ["Clear progression through content", "More structured learning experience", "Reduces user overwhelm"],
  },
] as const;

type HighlightId = (typeof HIGHLIGHTS)[number]["id"];

export default function LickLibraryPage() {
  const [showAfter, setShowAfter] = useState(true);
  const [activeHighlight, setActiveHighlight] = useState<HighlightId>("homepage");

  const highlight = HIGHLIGHTS.find((h) => h.id === activeHighlight)!;

  return (
    <main className="min-h-screen overflow-hidden bg-[#080808] text-white">
      <style>{`
        html { scroll-behavior: smooth; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.25s ease-out both; }
      `}</style>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-[620px] bg-[radial-gradient(circle_at_50%_4%,rgba(214,158,88,0.2),transparent_34%),radial-gradient(circle_at_50%_0%,rgba(89,105,255,0.12),transparent_42%)]" />

      <SiteHeader variant="dark" />

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10">

        {/* ── 01. Hero ── */}
        <section className="page-hero case-study-hero mx-auto max-w-5xl pb-0 text-center">
          <div className="mb-7 flex justify-center">
            <Image src="/licklibrary-logo.png" alt="LickLibrary logo" width={179} height={36} priority className="h-auto w-[179px]" />
          </div>
          <p className="mb-5 text-sm font-medium text-white/38">Guitar Learning Platform</p>
          <h1 className="heading-xl text-white">LickLibrary Redesign</h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-8 text-white/60 sm:text-2xl sm:leading-9">
            Discovery flow, homepage and onboarding — redesigned and shipped as a working product.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="https://licklibrary-sandbox.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center rounded-full bg-white px-5 text-sm font-medium text-[#080808] transition-colors hover:bg-white/90"
            >
              View prototype
            </a>
            <a
              href="#transformation"
              className="inline-flex h-11 items-center justify-center rounded-full border border-white/14 px-5 text-sm font-medium text-white/82 transition-colors hover:border-white/28 hover:text-white"
            >
              Read case study
            </a>
          </div>
          <div className="mt-10 flex items-center justify-center gap-3">
            {["Designed", "Built", "Shipped"].map((word, i) => (
              <div key={word} className="flex items-center gap-3">
                <span className={`text-sm font-medium ${i === 2 ? "text-[#d4a15f]" : "text-white/55"}`}>{word}</span>
                {i < 2 && <span className="text-white/20">→</span>}
              </div>
            ))}
          </div>
          <div className="mt-2 flex items-center justify-center gap-3">
            {["Figma", "Vue 3 + Vite", "Vercel"].map((tool, i) => (
              <div key={tool} className="flex items-center gap-3">
                <span className="text-xs text-white/28">{tool}</span>
                {i < 2 && <span className="text-white/12">·</span>}
              </div>
            ))}
          </div>
        </section>

        {/* ── 02. Before & After toggle ── */}
        <section id="transformation" className="border-t border-white/10 py-16 sm:py-20 lg:py-24">
          <div className="mb-10">
            <p className="mb-3 text-sm font-medium text-white/38">The transformation</p>
            <h2 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
              From content library<br />to learning journey.
            </h2>
          </div>

          <div className="mb-6 flex items-center gap-4">
            <button
              onClick={() => setShowAfter(false)}
              className={`text-sm font-medium transition-colors ${!showAfter ? "text-white" : "text-white/35 hover:text-white/60"}`}
            >
              Before
            </button>
            <button
              onClick={() => setShowAfter((v) => !v)}
              className="relative h-7 w-12 rounded-full border border-white/15 bg-white/[0.06] transition-colors hover:bg-white/10 focus:outline-none"
            >
              <span className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all duration-300 ${showAfter ? "left-6" : "left-1"}`} />
            </button>
            <button
              onClick={() => setShowAfter(true)}
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${showAfter ? "text-[#d4a15f]" : "text-white/35 hover:text-white/60"}`}
            >
              After
              {showAfter && (
                <span className="rounded-full border border-[#d4a15f]/30 bg-[#d4a15f]/10 px-2 py-0.5 text-[10px] text-[#d4a15f]">
                  Discovery Assistant
                </span>
              )}
            </button>
          </div>

          <div className="relative overflow-hidden rounded-[20px] border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.5)]">
            {showAfter && (
              <div className="flex items-center gap-3 border-b border-white/8 bg-[#0d0b09] px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-white/10" />
                  <div className="h-3 w-3 rounded-full bg-white/10" />
                  <div className="h-3 w-3 rounded-full bg-white/10" />
                </div>
                <div className="mx-auto flex h-6 w-56 items-center justify-center rounded-md bg-white/[0.05] text-[11px] text-white/30">
                  licklibrary-sandbox.vercel.app
                </div>
                <div className="w-12" />
              </div>
            )}
            <div key={showAfter ? "after" : "before"} className="relative w-full" style={{ aspectRatio: "16/9" }}>
              <Image
                src={showAfter ? "/licklibrary/guided-discovery1.jpg" : "/licklibrary/old-homepage.png"}
                alt={showAfter ? "Redesigned LickLibrary — Discovery Assistant" : "Original LickLibrary homepage"}
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-6">
            <div className={`transition-opacity duration-300 ${!showAfter ? "opacity-100" : "opacity-35"}`}>
              <p className="mb-1 text-sm font-semibold text-white/50">Before</p>
              <p className="text-sm leading-6 text-white/38">A content catalogue. Users arrived and didn't know where to start.</p>
            </div>
            <div className={`transition-opacity duration-300 ${showAfter ? "opacity-100" : "opacity-35"}`}>
              <p className="mb-1 text-sm font-semibold text-[#d4a15f]">After</p>
              <p className="text-sm leading-6 text-white/55">A guided learning experience. Four questions. Personalised recommendations.</p>
            </div>
          </div>
        </section>

        {/* ── 03. Discovery Assistant — deep dive ─────────────────────────────
            Visual storytelling: problem → journey → outcome.
            The flow cards show each step of the recommendation journey.
            No walls of text — the cards do the explaining.
        ── */}
        <section id="discovery" className="border-t border-white/10 py-16 sm:py-20 lg:py-24">

          {/* Section header */}
          <div className="mb-4">
            <span className="rounded-full border border-[#d4a15f]/30 bg-[#d4a15f]/10 px-3 py-1 text-xs font-medium text-[#d4a15f]">
              AI-assisted · Centrepiece feature
            </span>
          </div>
          <div className="mb-6">
            <h2 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
              10,000+ lessons.<br />One place to start.
            </h2>
          </div>
          <p className="mb-14 max-w-2xl text-base leading-7 text-white/55">
            The problem wasn't a lack of content — it was helping users find the <em>right</em> content.
            The Discovery Assistant was designed to reduce decision fatigue and create a guided path
            into the platform through a personalised recommendation journey.
          </p>

          {/* Visual journey — 5 connected flow cards
              Each card represents one step. The final card is the outcome.
              On desktop: horizontal flow with connectors.
              On mobile: vertical stack.
          ── */}
          <div className="mb-14">
            <p className="mb-5 text-xs font-medium uppercase tracking-widest text-white/28">The recommendation journey</p>

            {/* Desktop: horizontal row */}
            <div className="hidden sm:flex sm:items-stretch sm:gap-0">
              {[
                { n: "01", label: "Goal",        q: "What brings you here?",          detail: "Learn songs · Improve technique · Get inspired" },
                { n: "02", label: "Level",        q: "How would you rate yourself?",   detail: "Beginner · Intermediate · Advanced" },
                { n: "03", label: "Time",         q: "How long can you practise?",     detail: "15 min · 30 min · 1 hour+" },
                { n: "04", label: "Artists",      q: "Who inspires your playing?",     detail: "Genre & artist preferences" },
                { n: "→",  label: "Results",      q: "Your personalised lessons",      detail: "Powered by recommendation API", highlight: true },
              ].map((step, i) => (
                <div key={step.n} className="flex flex-1 items-stretch">
                  <div className={`flex flex-1 flex-col rounded-[16px] border p-4 ${
                    step.highlight
                      ? "border-[#d4a15f]/40 bg-[#d4a15f]/[0.07]"
                      : "border-white/8 bg-white/[0.025]"
                  }`}>
                    <span className={`mb-3 text-[10px] font-semibold ${step.highlight ? "text-[#d4a15f]" : "text-white/25"}`}>
                      {step.n}
                    </span>
                    <p className={`mb-1 text-sm font-semibold ${step.highlight ? "text-[#f2cf9d]" : "text-white"}`}>{step.label}</p>
                    <p className={`mb-2 text-xs leading-5 ${step.highlight ? "text-[#f2cf9d]/70" : "text-white/55"}`}>{step.q}</p>
                    <p className="mt-auto text-[10px] leading-4 text-white/30">{step.detail}</p>
                  </div>
                  {/* Connector — not after last card */}
                  {i < 4 && (
                    <div className="flex w-5 shrink-0 items-center justify-center">
                      <span className="text-xs text-white/15">→</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile: vertical stack */}
            <div className="flex flex-col gap-2 sm:hidden">
              {[
                { n: "01", label: "Goal",    q: "What brings you here?",        detail: "Learn songs · Improve · Get inspired",    highlight: false },
                { n: "02", label: "Level",   q: "How would you rate yourself?", detail: "Beginner · Intermediate · Advanced",       highlight: false },
                { n: "03", label: "Time",    q: "How long can you practise?",   detail: "15 min · 30 min · 1 hour+",               highlight: false },
                { n: "04", label: "Artists", q: "Who inspires your playing?",   detail: "Genre and artist preferences",             highlight: false },
                { n: "→",  label: "Results", q: "Your personalised lessons",    detail: "Powered by recommendation API",            highlight: true  },
              ].map((step) => (
                <div key={step.n} className={`flex items-start gap-4 rounded-[14px] border px-4 py-3 ${
                  step.highlight ? "border-[#d4a15f]/40 bg-[#d4a15f]/[0.07]" : "border-white/8 bg-white/[0.025]"
                }`}>
                  <span className={`mt-0.5 shrink-0 text-xs font-semibold ${step.highlight ? "text-[#d4a15f]" : "text-white/25"}`}>{step.n}</span>
                  <div>
                    <p className={`text-sm font-medium ${step.highlight ? "text-[#f2cf9d]" : "text-white/80"}`}>{step.label} — {step.q}</p>
                    <p className="text-xs leading-5 text-white/35">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Three pillars: UX / Product / Technical */}
          <div className="mb-14 grid gap-4 sm:grid-cols-3">
            {[
              {
                label: "UX thinking",
                icon: "↓",
                points: [
                  "Progressive disclosure — one question at a time",
                  "Reduces cognitive load through guided conversation",
                  "Avoids dead ends with flexible, optional steps",
                ],
              },
              {
                label: "Product thinking",
                icon: "◎",
                points: [
                  "Balances guidance with user flexibility",
                  "New users guided, experienced users unblocked",
                  "Recommendation logic accounts for content gaps",
                ],
              },
              {
                label: "Technical build",
                icon: "{ }",
                points: [
                  "Vue 3 component-driven architecture",
                  "Recommendation API wired to user inputs",
                  "Dynamic result generation in real time",
                ],
              },
            ].map((pillar) => (
              <div key={pillar.label} className="rounded-[20px] border border-white/8 bg-white/[0.025] p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-base text-white/20">{pillar.icon}</span>
                  <p className="text-xs font-medium uppercase tracking-widest text-white/30">{pillar.label}</p>
                </div>
                <ul className="grid gap-3">
                  {pillar.points.map((pt) => (
                    <li key={pt} className="flex gap-2.5 text-sm leading-6 text-white/55">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d4a15f]/50" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Prototype CTA */}
          <div className="flex items-center gap-5 rounded-[20px] border border-white/8 bg-white/[0.02] px-6 py-5">
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">See it in action</p>
              <p className="mt-1 text-sm text-white/45">The full recommendation flow is live and interactive in the prototype.</p>
            </div>
            <a
              href="https://licklibrary-sandbox.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-full border border-[#d4a15f]/30 bg-[#d4a15f]/10 px-4 py-2 text-sm font-medium text-[#d4a15f] transition-all hover:border-[#d4a15f]/50 hover:bg-[#d4a15f]/15"
            >
              Explore prototype →
            </a>
          </div>
        </section>

        {/* ── 04. How I Built It ── */}
        <section id="build" className="border-t border-white/10 py-16 sm:py-20 lg:py-24">
          <div className="mb-12">
            <p className="mb-3 text-sm font-medium text-white/38">Process</p>
            <h2 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Most designers stop at Figma.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/55">
              I designed and built a working prototype — real interactions, a live recommendation
              flow, and deployed on Vercel.
            </p>
          </div>

          <div className="mb-10 grid gap-3 sm:grid-cols-4">
            {[
              { step: "01", tool: "Figma",        label: "Design",  desc: "Components, flows and visual system defined before any code." },
              { step: "02", tool: "Vue 3 + Vite", label: "Build",   desc: "Working app with real routing, state and component architecture." },
              { step: "03", tool: "APIs",          label: "Connect", desc: "Recommendation endpoint integrated and wired to user inputs." },
              { step: "04", tool: "Vercel",        label: "Ship",    desc: "Live URL. Shareable and indistinguishable from a real product." },
            ].map((stage, i) => (
              <div key={stage.step} className="relative rounded-[20px] border border-white/8 bg-white/[0.025] p-6">
                {i < 3 && (
                  <div className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-white/15 sm:block">→</div>
                )}
                <p className="mb-1 text-xs font-medium text-white/22">{stage.step}</p>
                <p className="mb-1 text-base font-semibold text-white">{stage.tool}</p>
                <p className="mb-3 text-xs font-medium uppercase tracking-widest text-[#d4a15f]/60">{stage.label}</p>
                <p className="text-sm leading-6 text-white/50">{stage.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <p className="mr-2 self-center text-xs text-white/28">Stack:</p>
            {["Vue 3", "Tailwind CSS", "Vite", "Vercel", "Recommendation API"].map((t) => (
              <span key={t} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-white/50">{t}</span>
            ))}
          </div>
        </section>

        {/* ── 05. Redesign Highlights ──────────────────────────────────────────
            Tabbed showcase. Four pills. Screenshot + description + bullets swap
            on click. key= on the content div triggers fade-up on switch.
            Add real screenshot paths to the HIGHLIGHTS array at the top of file.
        ── */}
        <section id="highlights" className="border-t border-white/10 py-16 sm:py-20 lg:py-24">
          <div className="mb-10">
            <p className="mb-3 text-sm font-medium text-white/38">Platform work</p>
            <h2 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Redesign highlights
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/55">
              Beyond the Discovery Assistant, the redesign touched every major surface of the platform.
            </p>
          </div>

          {/* Pill tabs */}
          <div className="mb-8 flex flex-wrap gap-2">
            {HIGHLIGHTS.map((h) => (
              <button
                key={h.id}
                onClick={() => setActiveHighlight(h.id)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none ${
                  activeHighlight === h.id
                    ? "border-[#d4a15f]/50 bg-[#d4a15f]/10 text-[#f2cf9d]"
                    : "border-white/10 bg-white/[0.03] text-white/50 hover:border-white/20 hover:text-white/80"
                }`}
              >
                {h.label}
              </button>
            ))}
          </div>

          {/* Content — swaps on tab change */}
          <div key={activeHighlight} className="fade-up grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-12">

            {/* Screenshot */}
            <div className="overflow-hidden rounded-[20px] border border-white/8 bg-[#0d0b09]">
              {highlight.img ? (
                <Image src={highlight.img} alt={highlight.label} width={800} height={500} className="w-full" />
              ) : (
                <div className="flex h-72 items-center justify-center px-6 text-center lg:h-full lg:min-h-[320px]">
                  <p className="text-xs text-white/20">{highlight.placeholder}</p>
                </div>
              )}
            </div>

            {/* Copy */}
            <div className="flex flex-col justify-center">
              <p className="mb-2 text-xs font-medium uppercase tracking-widest text-white/30">{highlight.label}</p>
              <h3 className="mb-4 text-2xl font-semibold leading-tight text-white sm:text-3xl">
                {highlight.headline}
              </h3>
              <p className="mb-6 text-base leading-7 text-white/55">{highlight.desc}</p>
              <ul className="grid gap-3">
                {highlight.points.map((pt) => (
                  <li key={pt} className="flex gap-2.5 text-sm leading-6 text-white/55">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d4a15f]/60" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── 06. Key Learnings ── */}
        <section id="learnings" className="border-t border-white/10 py-16 sm:py-20 lg:py-24">
          <div className="mb-12">
            <p className="mb-3 text-sm font-medium text-white/38">Reflection</p>
            <h2 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">Key learnings</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { n: "01", title: "Designing for discovery",  body: "When content is vast, the interface's job is to narrow — not to show everything. One good question is worth ten filters." },
              { n: "02", title: "Prototyping with code",    body: "Static screens can't communicate flow, timing or delight. Building in Vue meant I could validate decisions that Figma can't answer." },
              { n: "03", title: "AI-assisted experiences",  body: "AI works best when it removes a decision rather than adding one. The Discovery Assistant succeeds because it asks less, not more." },
            ].map((card) => (
              <div key={card.n} className="rounded-[20px] border border-white/8 bg-white/[0.025] p-6">
                <p className="mb-4 text-xs font-medium text-white/22">{card.n}</p>
                <p className="mb-3 text-base font-semibold text-white">{card.title}</p>
                <p className="text-sm leading-6 text-white/50">{card.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 07. Final CTA ── */}
        <section className="border-t border-white/10 py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-4 text-sm font-medium text-white/38">See it live</p>
            <h2 className="mb-6 text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Explore the prototype
            </h2>
            <p className="mb-10 text-base leading-7 text-white/55">
              The full discovery flow, homepage redesign, and onboarding — working, interactive, and deployed.
            </p>
            <a
              href="https://licklibrary-sandbox.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-base font-semibold text-[#080808] transition-all hover:bg-[#f2cf9d] hover:shadow-[0_0_40px_rgba(212,161,95,0.3)]"
            >
              Open prototype →
            </a>
            <p className="mt-5 text-xs text-white/28">Live on Vercel · Vue 3 · No login required</p>
          </div>
        </section>

      </div>
    </main>
  );
}