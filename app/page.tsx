import Link from "next/link";
import ProjectGrid from "../components/ProjectGrid";
import SiteHeader from "../components/SiteHeader";
import { projects } from "./data/projects";

const currentlyBuilding = [
  {
    title: "AI Learning Assistant",
    tag: "UX + AI",
    description:
      "A guided discovery tool helping guitar learners find the right lessons faster through personalised recommendations.",
    details: [
      {
        label: "Problem",
        value: "Learners can feel overwhelmed by large content libraries",
      },
      {
        label: "Focus",
        value: "Personalisation, onboarding, recommendation UX",
      },
      {
        label: "Status",
        value: "UX flow / prototype",
      },
    ],
  },
  {
    title: "Personal Health Hub",
    tag: "Health + Training",
    description:
      "A simple, visual dashboard to track workouts, BJJ sessions, runs, and daily activity - all in one place.",
    details: [
      {
        label: "Problem",
        value: "Notes and scattered apps make training hard to track consistently",
      },
      {
        label: "Focus",
        value:
          "A clean interface that makes training feel motivating and effortless",
      },
      {
        label: "Status",
        value: "V1 launching this month",
      },
    ],
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#171717]">
      <SiteHeader />
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10">
        <section id="about" className="page-hero home-hero">
          <div className="max-w-[780px]">
            <h1 className="heading-xl text-[#111111]">
              Product Designer building and launching digital products
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-8 text-black/72 sm:text-2xl sm:leading-9">
              From idea to live product &mdash; across sports, learning
              platforms and AI tools.
            </p>
            <p className="mt-8 text-sm font-medium text-black/48">
              50+ products launched &middot; 5M+ users reached
            </p>
          </div>
        </section>

        <section id="work" className="pb-24 sm:pb-32">
          <ProjectGrid projects={projects} />
        </section>

        <section className="pb-24 sm:pb-32">
          <div className="border-t border-black/8 pt-12 sm:pt-16">
            <div className="mb-10 grid gap-5 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] md:items-end">
              <div>
                <p className="mb-4 text-sm font-medium text-black/48">
                  Currently building
                </p>
                <h2 className="max-w-2xl text-4xl font-semibold leading-[1.08] text-[#111111] sm:text-5xl">
                  What I&rsquo;m building right now
                </h2>
              </div>
              <p className="max-w-xl text-base leading-7 text-black/58 sm:text-lg sm:leading-8 md:justify-self-end">
                Exploring AI-powered product ideas, rapid prototypes, and
                interactive experiences beyond client work.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
              {currentlyBuilding.map((item, index) => (
                <article
                  key={item.title}
                  className="group relative overflow-hidden rounded-[28px] border border-black/8 bg-[#fffdf8]/78 p-6 shadow-[0_18px_50px_rgba(24,21,16,0.06),inset_0_1px_0_rgba(255,255,255,0.75)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-black/12 hover:bg-white hover:shadow-[0_24px_70px_rgba(24,21,16,0.1),0_0_0_1px_rgba(255,255,255,0.8)] sm:p-8"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/16 to-transparent opacity-60" />
                  <div
                    className={`absolute right-6 top-6 h-20 w-20 rounded-full blur-3xl transition-opacity duration-300 group-hover:opacity-80 ${
                      index === 0 ? "bg-[#7fb8ff]/24" : "bg-[#6bf0bc]/24"
                    }`}
                  />

                  <div className="relative flex min-h-full flex-col">
                    <div className="mb-7 flex items-start justify-between gap-4">
                      <div>
                        <span className="inline-flex rounded-full border border-black/8 bg-black/[0.03] px-3 py-1 text-xs font-medium text-black/54">
                          {item.tag}
                        </span>
                        <h3 className="mt-5 text-[26px] font-semibold leading-8 text-[#151515] sm:text-3xl sm:leading-9">
                          {item.title}
                        </h3>
                      </div>
                      <span className="text-xs font-medium text-black/26">
                        0{index + 1}
                      </span>
                    </div>

                    <p className="max-w-xl text-sm leading-6 text-black/58 sm:text-base sm:leading-7">
                      {item.description}
                    </p>

                    <div className="my-7 h-px bg-black/8" />

                    <dl className="grid gap-4">
                      {item.details.map((detail) => (
                        <div
                          key={detail.label}
                          className="grid gap-1 sm:grid-cols-[88px_minmax(0,1fr)] sm:gap-4"
                        >
                          <dt className="text-xs font-medium uppercase tracking-[0.12em] text-black/36">
                            {detail.label}
                          </dt>
                          <dd className="text-sm leading-6 text-black/62">
                            {detail.value}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    <Link
                      href="#"
                      className="mt-8 inline-flex w-fit items-center text-sm font-medium text-[#151515] transition-colors group-hover:text-black"
                    >
                      View concept <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
