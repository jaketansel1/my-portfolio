"use client";

import Link from "next/link";
import { useState } from "react";
import SiteHeader from "../components/SiteHeader";

const products = [
  {
    id: "sportskins",
    tab: "SportSkins (App)",
    name: "SportSkins",
    platform: "Mobile app",
    accent: "#E94E1A",
    intro:
      "A mobile-first betting game product built around fast entries, clear game states and repeat matchday engagement.",
    decision:
      "I kept the game loop compact: understand the mechanic, make a pick, confirm the stake and track the result without burying users in rule detail.",
    outcome:
      "A clearer mobile flow designed to reduce hesitation and support repeat play.",
    flow: ["Browse games", "Pick skin", "Place entry", "Track outcome"],
    screens: ["Lobby", "Game entry", "Live ticket"],
  },
  {
    id: "predict10n",
    tab: "Predict10n (Web)",
    name: "Predict10n",
    platform: "Web app",
    accent: "#0CB3B3",
    intro:
      "A web betting game experience focused on prediction mechanics, deadline pressure and clear progression across desktop and mobile.",
    decision:
      "I made status and deadlines visible at every step so users could understand what was open, locked, pending or settled.",
    outcome:
      "A more scannable web experience for complex prediction rounds and real-money decisions.",
    flow: ["View round", "Make predictions", "Review slip", "Follow results"],
    screens: ["Desktop round", "Prediction slip", "Mobile status"],
  },
];

const metadata = [
  "Mobile app (SportSkins)",
  "Web app (Predict10n)",
  "End-to-end product design",
  "Real-money gameplay",
];

const learnings = [
  "Designing for trust when real money is involved",
  "Simplifying complex rules before users commit",
  "Managing open, locked, pending and settled states",
  "Reducing friction before time-sensitive deadlines",
];

function FlowDiagram({
  steps,
  accent,
}: {
  steps: string[];
  accent: string;
}) {
  return (
    <div className="grid gap-3 rounded-[30px] border border-white/10 bg-white/[0.05] p-4 shadow-[0_18px_60px_rgba(0,0,0,0.22)] sm:grid-cols-4">
      {steps.map((step, index) => (
        <div key={step} className="relative rounded-3xl bg-white/[0.05] p-4">
          <span
            className="grid h-9 w-9 place-items-center rounded-full text-sm font-semibold text-white"
            style={{ backgroundColor: accent }}
          >
            {index + 1}
          </span>
          <p className="mt-8 text-sm font-semibold leading-5 text-white">
            {step}
          </p>
        </div>
      ))}
    </div>
  );
}

function PhoneMockup({
  title,
  accent,
  compact = false,
}: {
  title: string;
  accent: string;
  compact?: boolean;
}) {
  return (
    <div className="rounded-[30px] border border-white/10 bg-[#110F22] p-2 shadow-[0_18px_50px_rgba(0,0,0,0.3)]">
      <div className="overflow-hidden rounded-[24px] bg-[#f7f6f1]">
        <div className="px-4 pb-5 pt-4 text-white" style={{ backgroundColor: accent }}>
          <div className="mb-8 flex items-center justify-between">
            <div className="h-7 w-7 rounded-full bg-white/24" />
            <div className="h-2 w-16 rounded-full bg-white/30" />
          </div>
          <p className="text-xs font-medium text-white/72">{title}</p>
          <div className="mt-2 h-8 w-3/4 rounded-2xl bg-white/24" />
        </div>
        <div className="space-y-3 p-3">
          <div className="rounded-2xl bg-white p-3 shadow-sm">
            <div className="h-3 w-24 rounded-full bg-black/14" />
            <div className="mt-3 grid grid-cols-3 gap-2">
              <div className="h-14 rounded-xl bg-black/[0.06]" />
              <div className="h-14 rounded-xl bg-black/[0.06]" />
              <div className="h-14 rounded-xl bg-black/[0.06]" />
            </div>
          </div>
          <div className="rounded-2xl bg-white p-3 shadow-sm">
            <div className="grid gap-2">
              <div className="h-3 rounded-full bg-black/12" />
              <div className="h-3 w-2/3 rounded-full bg-black/10" />
            </div>
          </div>
          {!compact && (
            <div
              className="h-10 rounded-full"
              style={{ backgroundColor: accent }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function DesktopMockup({ accent }: { accent: string }) {
  return (
    <div className="rounded-[30px] border border-white/10 bg-white/[0.05] p-3 shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
      <div className="overflow-hidden rounded-[24px] bg-[#f7f6f1]">
        <div className="flex items-center gap-2 border-b border-black/8 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-black/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-black/14" />
          <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
        </div>
        <div className="grid gap-4 p-4 sm:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-3">
            <div
              className="h-28 rounded-3xl"
              style={{ backgroundColor: accent }}
            />
            <div className="grid grid-cols-2 gap-3">
              <div className="h-24 rounded-2xl bg-black/[0.06]" />
              <div className="h-24 rounded-2xl bg-black/[0.06]" />
            </div>
          </div>
          <div className="space-y-3">
            <div className="h-20 rounded-2xl bg-white shadow-sm" />
            <div className="h-20 rounded-2xl bg-white shadow-sm" />
            <div
              className="h-10 rounded-full"
              style={{ backgroundColor: accent }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BettingGameProductsPage() {
  const [activeProduct, setActiveProduct] = useState(products[0]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#110F22] text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[680px] bg-[radial-gradient(circle_at_22%_4%,rgba(233,78,26,0.28),transparent_34%),radial-gradient(circle_at_82%_0%,rgba(12,179,179,0.16),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_58%)]" />
      <SiteHeader variant="dark" />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <section className="page-hero standard-hero">
          <div className="max-w-5xl">
            <p className="mb-5 text-sm font-medium text-white/52">
              Betting Game Products
            </p>
            <h1 className="heading-xl max-w-5xl">
              Designing betting game products across mobile and web
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-8 text-white/80 sm:text-2xl sm:leading-9">
              Turning complex, real-money game mechanics into clear, scalable
              user experiences.
            </p>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {metadata.map((item) => (
              <div
                key={item}
                className="rounded-[26px] border border-white/10 bg-white/[0.05] px-5 py-5 shadow-[0_18px_50px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#E94E1A]/70 hover:shadow-[0_0_34px_rgba(233,78,26,0.16)]"
              >
                <p className="text-sm font-semibold leading-5 text-white">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-white/10 py-12 sm:py-16">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
              Two products. Similar gameplay problems. Different platforms.
            </h2>
            <p className="max-w-2xl text-base leading-7 text-white/64">
              Both products were built for the same client, solving similar
              gameplay challenges across different platforms — one optimised for
              mobile, the other for web.
            </p>
          </div>
        </section>

        <section className="border-t border-white/10 py-12 sm:py-16">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row">
            {products.map((product) => {
              const isActive = activeProduct.id === product.id;

              return (
                <button
                  key={product.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveProduct(product)}
                  className="rounded-full border px-5 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:border-[#E94E1A]/70 hover:shadow-[0_0_28px_rgba(233,78,26,0.18)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E94E1A]/35"
                  style={{
                    borderColor: isActive ? "#E94E1A" : "rgba(255,255,255,0.1)",
                    backgroundColor: isActive ? "#E94E1A" : "rgba(255,255,255,0.05)",
                    color: isActive ? "white" : "rgba(255,255,255,0.6)",
                  }}
                >
                  {product.tab}
                </button>
              );
            })}
          </div>

          <div className="rounded-[38px] border border-white/10 bg-[#141230] p-5 shadow-[0_30px_100px_rgba(0,0,0,0.32)] sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
              <div>
                <p className="text-sm font-medium text-white/48">
                  {activeProduct.platform}
                </p>
                <h2 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">
                  {activeProduct.name}
                </h2>
                <p className="mt-5 max-w-xl text-base leading-7 text-white/66">
                  {activeProduct.intro}
                </p>

                <div className="mt-8 rounded-[28px] border border-white/10 bg-white/[0.05] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.18)]">
                  <p className="text-sm font-semibold text-white/48">
                    Key design decision
                  </p>
                  <p className="mt-3 text-base leading-7 text-white/78">
                    {activeProduct.decision}
                  </p>
                </div>

                <p
                  className="mt-4 rounded-full px-5 py-3 text-sm font-semibold text-white"
                  style={{ backgroundColor: "#E94E1A" }}
                >
                  {activeProduct.outcome}
                </p>
              </div>

              <div className="grid gap-5">
                <FlowDiagram
                  steps={activeProduct.flow}
                  accent={activeProduct.accent}
                />

                {activeProduct.id === "sportskins" ? (
                  <div className="grid gap-4 sm:grid-cols-3">
                    {activeProduct.screens.map((screen) => (
                      <PhoneMockup
                        key={screen}
                        title={screen}
                        accent={activeProduct.accent}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
                    <DesktopMockup accent={activeProduct.accent} />
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                      <PhoneMockup
                        title="Prediction slip"
                        accent={activeProduct.accent}
                        compact
                      />
                      <PhoneMockup
                        title="Mobile status"
                        accent={activeProduct.accent}
                        compact
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 py-16 sm:py-24">
          <div className="mb-10 max-w-2xl">
            <h2 className="text-4xl font-semibold leading-tight sm:text-5xl">
              What I learned designing betting products
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {learnings.map((learning, index) => (
              <article
                key={learning}
                className="rounded-[30px] border border-white/10 bg-white/[0.05] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.18)]"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[#0CB3B3] text-sm font-semibold text-[#110F22]">
                  {index + 1}
                </span>
                <p className="mt-8 text-base font-semibold leading-6 text-white/72">
                  {learning}
                </p>
              </article>
            ))}
          </div>
        </section>

        <nav className="flex flex-col gap-3 border-t border-white/10 py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/work"
            className="inline-flex h-11 items-center justify-center rounded-full border border-white/10 px-5 font-medium text-white/66 transition-colors hover:border-white/24 hover:text-white"
          >
            Back to work
          </Link>
          <Link
            href="/fanzine"
            className="inline-flex h-11 items-center justify-center rounded-full bg-[#E94E1A] px-5 font-medium text-white transition-colors hover:bg-[#f26535]"
          >
            Next project
          </Link>
        </nav>
      </div>
    </main>
  );
}
