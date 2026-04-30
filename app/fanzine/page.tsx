"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";
import SiteHeader from "../components/SiteHeader";

const clubs = [
  {
    name: "Arsenal",
    accent: "#e11d2e",
    secondary: "#f7d154",
    tone: "Heritage, energy and a bold matchday feel",
  },
  {
    name: "Chelsea",
    accent: "#034694",
    secondary: "#dba111",
    tone: "Premium, confident and editorial",
  },
  {
    name: "Spurs",
    accent: "#132257",
    secondary: "#ffffff",
    tone: "Clean, crisp and minimal",
  },
  {
    name: "Liverpool",
    accent: "#c8102e",
    secondary: "#00b2a9",
    tone: "Fast, passionate and community-led",
  },
  {
    name: "Man City",
    accent: "#6cabdd",
    secondary: "#1c2c5b",
    tone: "Light, modern and data-rich",
  },
];

const impactStats = [
  "50+ apps launched",
  "5M+ fans reached",
  "8 years of iteration",
  "iOS, Android & web",
];

const challengeCards = [
  ["Unique club branding", "Every app needed to feel native to its club and fanbase."],
  ["Shared product journeys", "Core flows had to stay familiar across the whole platform."],
  ["Fast launch process", "New apps needed to move from setup to release quickly."],
];

const systemCards = [
  [
    "Core UX Framework",
    "Reusable navigation, page structures and matchday journeys across every app.",
  ],
  [
    "Design System",
    "Shared components, typography, icons and controls built to stay consistent across platforms.",
  ],
  [
    "Theming Engine",
    "Club colours, logos, textures and content styles could change without breaking the product experience.",
  ],
];

const processSteps = [
  "Research fan behaviour and competitor apps",
  "Map reusable journeys and information architecture",
  "Design scalable UI components and theme rules",
  "Test, refine and support delivery across multiple clubs",
];

function PhonePreview({
  club,
}: {
  club: (typeof clubs)[number];
}) {
  return (
    <div className="mx-auto w-full max-w-[320px] rounded-[38px] border border-white/14 bg-[#08090b] p-3 shadow-[0_28px_90px_rgba(0,0,0,0.42)]">
      <div className="overflow-hidden rounded-[30px] bg-[#f5f6f8] text-[#0b0d10]">
        <div
          className="px-5 pb-6 pt-5 text-white"
          style={{
            background: `linear-gradient(135deg, ${club.accent}, #101114 78%)`,
          }}
        >
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="grid h-9 w-9 place-items-center rounded-full border border-white/30 text-xs font-bold"
                style={{ backgroundColor: club.secondary, color: club.accent }}
              >
                {club.name.slice(0, 2).toUpperCase()}
              </div>
              <span className="text-sm font-semibold">{club.name}</span>
            </div>
            <div className="h-8 w-8 rounded-full bg-white/16" />
          </div>
          <p className="text-xs font-medium text-white/64">Matchday</p>
          <h3 className="mt-2 text-3xl font-semibold leading-none">
            Build your fan experience
          </h3>
        </div>

        <div className="space-y-4 p-4">
          <div className="rounded-3xl bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="h-3 w-24 rounded-full bg-black/16" />
                <div className="mt-2 h-2 w-16 rounded-full bg-black/10" />
              </div>
              <div
                className="h-10 w-10 rounded-2xl"
                style={{ backgroundColor: club.accent }}
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((item) => (
                <div key={item} className="h-16 rounded-2xl bg-black/[0.06]" />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="h-24 rounded-3xl bg-white shadow-sm" />
            <div
              className="h-24 rounded-3xl shadow-sm"
              style={{ backgroundColor: club.accent }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FanzinePage() {
  const [selectedClub, setSelectedClub] = useState(clubs[0]);
  const themeStyle = { "--club-accent": selectedClub.accent } as CSSProperties;

  return (
    <main className="min-h-screen overflow-hidden bg-[#07080a] text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[720px] bg-[radial-gradient(circle_at_25%_8%,rgba(225,29,46,0.28),transparent_32%),radial-gradient(circle_at_78%_0%,rgba(108,171,221,0.18),transparent_34%)]" />

      <SiteHeader variant="dark" />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <section className="pb-20 pt-24 sm:pb-28 sm:pt-32 lg:pb-32 lg:pt-40">
          <div className="max-w-5xl">
            <p className="mb-5 text-sm font-medium text-white/44">
              Fanzine App Platform
            </p>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.04] sm:text-6xl lg:text-7xl">
              Designing a platform powering 50+ football apps
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-8 text-white/68 sm:text-2xl sm:leading-9">
              A scalable white-label product system used by millions of fans
              across iOS, Android and web.
            </p>
          </div>

          <div className="mt-10 grid gap-3 rounded-[28px] border border-white/10 bg-white/[0.04] p-4 backdrop-blur lg:grid-cols-3">
            {[
              ["Role", "Lead UX/UI Designer → Product Designer"],
              ["Timeline", "2017–2025"],
              [
                "Scope",
                "UX strategy, UI design, design system, theming, feature design",
              ],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl bg-white/[0.04] px-5 py-4">
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-white/34">
                  {label}
                </p>
                <p className="mt-2 text-sm leading-6 text-white/76">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {impactStats.map((stat) => (
              <div
                key={stat}
                className="rounded-[26px] border border-white/10 bg-white/[0.035] px-5 py-6 shadow-[0_24px_80px_rgba(0,0,0,0.2)]"
              >
                <p className="text-2xl font-semibold leading-tight sm:text-3xl">
                  {stat}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          className="border-t border-white/10 py-16 sm:py-24"
          style={themeStyle}
        >
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="mb-4 text-sm font-medium text-white/38">
                One platform → many clubs
              </p>
              <h2 className="text-4xl font-semibold leading-tight sm:text-5xl">
                One platform. Many club identities.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/62">
                Each club needed to feel unique, while the product, navigation
                and core journeys had to remain consistent.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 lg:justify-end">
              {clubs.map((club) => {
                const isActive = club.name === selectedClub.name;

                return (
                  <button
                    key={club.name}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setSelectedClub(club)}
                    className="rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--club-accent)] hover:bg-white/[0.07] hover:shadow-[0_0_26px_rgba(255,255,255,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                    style={{
                      borderColor: isActive ? club.accent : "rgba(255,255,255,0.12)",
                      backgroundColor: isActive ? `${club.accent}22` : "transparent",
                      color: isActive ? "white" : "rgba(255,255,255,0.62)",
                    }}
                  >
                    {club.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
            <div className="rounded-[36px] border border-white/10 bg-white/[0.035] p-6 sm:p-8">
              <PhonePreview club={selectedClub} />
            </div>

            <div className="grid gap-4">
              <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
                <p className="text-sm font-medium text-white/42">Active club</p>
                <h3 className="mt-3 text-4xl font-semibold">
                  {selectedClub.name}
                </h3>
                <p className="mt-4 text-base leading-7 text-white/62">
                  {selectedClub.tone}
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
                  <p className="mb-4 text-sm font-medium text-white/42">
                    Primary colour
                  </p>
                  <div
                    className="h-24 rounded-3xl"
                    style={{ backgroundColor: selectedClub.accent }}
                  />
                </div>
                <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
                  <p className="mb-4 text-sm font-medium text-white/42">
                    Badge placeholder
                  </p>
                  <div
                    className="grid h-24 place-items-center rounded-3xl text-2xl font-bold"
                    style={{
                      backgroundColor: selectedClub.secondary,
                      color: selectedClub.accent,
                    }}
                  >
                    {selectedClub.name.slice(0, 2).toUpperCase()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 py-16 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h2 className="text-4xl font-semibold leading-tight sm:text-5xl">
                The challenge
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/64">
                Fanzine needed a scalable app platform that could support any
                football club — from Premier League teams to smaller fan
                communities — without redesigning the product from scratch every
                time.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {challengeCards.map(([title, text]) => (
                <article
                  key={title}
                  className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5"
                >
                  <div className="mb-8 h-10 w-10 rounded-2xl bg-white/10" />
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/56">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 py-16 sm:py-24">
          <div className="mb-10">
            <h2 className="text-4xl font-semibold leading-tight sm:text-5xl">
              The system behind the apps
            </h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {systemCards.map(([title, text], index) => (
              <article
                key={title}
                className="min-h-[260px] rounded-[34px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.18)]"
              >
                <span className="text-sm font-medium text-white/34">
                  0{index + 1}
                </span>
                <div className="my-8 grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div
                      key={item}
                      className="h-12 rounded-2xl bg-white/[0.06]"
                    />
                  ))}
                </div>
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/58">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-white/10 py-16 sm:py-24">
          <div className="mb-10 max-w-3xl">
            <p className="mb-4 text-sm font-medium text-white/38">
              Feature highlight
            </p>
            <h2 className="text-4xl font-semibold leading-tight sm:text-5xl">
              Feature highlight: Pick Your Team
            </h2>
            <p className="mt-5 text-base leading-7 text-white/64">
              One of the most successful features was Pick Your Team — a
              pre-match personalisation flow that let fans build and share their
              ideal starting XI.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {["Choose formation", "Select players", "Share team"].map(
              (screen, index) => (
                <article
                  key={screen}
                  className="rounded-[34px] border border-white/10 bg-white/[0.04] p-4"
                >
                  <div className="rounded-[28px] bg-[#101215] p-4">
                    <div className="mb-5 flex items-center justify-between">
                      <span className="text-sm font-semibold">{screen}</span>
                      <span className="text-xs text-white/36">0{index + 1}</span>
                    </div>
                    <div className="relative h-[360px] overflow-hidden rounded-[26px] bg-[#174c2f]">
                      <div className="absolute inset-5 rounded-[22px] border border-white/22" />
                      <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/22" />
                      {[18, 34, 50, 66, 82].map((top, rowIndex) => (
                        <div
                          key={top}
                          className="absolute left-0 right-0 flex justify-center gap-5"
                          style={{ top: `${top}%` }}
                        >
                          {Array.from({
                            length: rowIndex === 1 || rowIndex === 3 ? 3 : 2,
                          }).map((_, playerIndex) => (
                            <div
                              key={playerIndex}
                              className="h-10 w-10 rounded-full bg-white shadow-lg"
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              ),
            )}
          </div>
          <p className="mt-6 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm leading-6 text-white/68">
            Designed to increase matchday engagement, social sharing and repeat
            app usage.
          </p>
        </section>

        <section className="border-t border-white/10 py-16 sm:py-24">
          <h2 className="text-4xl font-semibold leading-tight sm:text-5xl">
            How I worked
          </h2>
          <div className="mt-10 grid gap-4 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <article
                key={step}
                className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-sm font-semibold text-[#07080a]">
                  {index + 1}
                </span>
                <p className="mt-8 text-base font-medium leading-6 text-white/78">
                  {step}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-white/10 py-16 sm:py-24">
          <div className="rounded-[38px] border border-white/10 bg-white/[0.05] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.26)] sm:p-10 lg:p-12">
            <h2 className="text-4xl font-semibold leading-tight sm:text-5xl">
              What this unlocked
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-7 text-white/66">
              The result was a repeatable product system that allowed new
              football apps to launch faster, stay visually consistent and still
              feel tailored to each club.
            </p>
            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                "50+ branded apps",
                "Millions of fans",
                "Faster club launches",
                "Consistent iOS and Android experience",
              ].map((stat) => (
                <div key={stat} className="rounded-[26px] bg-white px-5 py-6">
                  <p className="text-2xl font-semibold leading-tight text-[#07080a]">
                    {stat}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <nav className="flex flex-col gap-3 border-t border-white/10 py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/work"
            className="inline-flex h-11 items-center justify-center rounded-full border border-white/12 px-5 font-medium text-white/76 transition-colors hover:border-white/26 hover:text-white"
          >
            Back to work
          </Link>
          <Link
            href="#"
            className="inline-flex h-11 items-center justify-center rounded-full bg-white px-5 font-medium text-[#07080a] transition-colors hover:bg-white/88"
          >
            Next project
          </Link>
        </nav>
      </div>
    </main>
  );
}
