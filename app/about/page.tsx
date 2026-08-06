import Image from "next/image";
import SiteHeader from "../../components/SiteHeader";

const skills = [
  [
    "Product thinking",
    "Turning messy problems into clear product direction.",
  ],
  [
    "UX/UI design",
    "Designing flows, interfaces and scalable design systems.",
  ],
  [
    "Rapid prototyping",
    "Turning ideas into working prototypes quickly using code and AI tools.",
  ],
  [
    "Delivery",
    "Working closely with developers to get products shipped.",
  ],
];

const experience = [
  [
    "2017–2025",
    "Fanzine",
    "Designed 50+ football apps used by millions of fans.",
  ],
  [
    "2023–2024",
    "SportSkins",
    "Designed a real-money betting product from scratch.",
  ],
  [
    "2025–present",
    "LickLibrary",
    "Redesigning a 30+ year old learning platform.",
  ],
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#111111]">
      <SiteHeader />

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10">
        <section className="page-hero standard-hero grid items-center gap-10 md:grid-cols-[280px_1fr] lg:gap-16">
          <div className="mx-auto h-56 w-56 overflow-hidden rounded-full border border-black/8 bg-white shadow-[0_18px_45px_rgba(0,0,0,0.08)] md:h-64 md:w-64">
            <Image
              src="/about.jpg"
              alt="Jake Tansel"
              width={280}
              height={280}
              priority
              className="h-full w-full object-cover object-center"
            />
          </div>

          <div className="text-center md:text-left">
            <h1 className="heading-xl max-w-4xl">
              Hi, I&rsquo;m Jake
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-8 text-black/68">
              I&rsquo;m a Product Designer working across sports, learning
              platforms and AI tools &mdash; turning ideas into simple, usable
              products.
            </p>
            <p className="mt-5 text-sm font-medium text-black/42">
              Product Designer &middot; London &middot; 8+ years experience
            </p>
          </div>
        </section>

        <section className="py-14 sm:py-18">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map(([title, description]) => (
              <article
                key={title}
                className="rounded-[24px] border border-black/8 bg-white/72 p-6 shadow-sm"
              >
                <h2 className="text-lg font-semibold text-[#151515]">
                  {title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-black/56">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-10 py-16 sm:py-20 lg:grid-cols-[0.35fr_0.65fr] lg:gap-16">
          <div>
            <h2 className="text-3xl font-semibold tracking-[-0.01em]">
              Experience
            </h2>
          </div>

          <div className="divide-y divide-black/8">
            {experience.map(([years, title, description]) => (
              <article
                key={title}
                className="grid gap-3 py-6 first:pt-0 sm:grid-cols-[140px_1fr]"
              >
                <p className="text-sm font-medium text-black/42">{years}</p>
                <div>
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-black/56">
                    {description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="py-14 sm:py-16">
          <h2 className="text-3xl font-semibold tracking-[-0.01em]">
            Outside of work
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-black/62">
            Outside of work, I’m usually in the gym, training Brazilian
            Jiu-Jitsu, playing football or planning the next trip.
          </p>
        </section>

        <section className="py-14">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <a
              href="#"
              className="rounded-full border border-black/8 bg-white px-5 py-3 font-medium text-black/68 transition-all hover:-translate-y-0.5 hover:text-black hover:shadow-sm"
            >
              View CV
            </a>
            <a
              href="https://www.linkedin.com"
              className="rounded-full border border-black/8 bg-white px-5 py-3 font-medium text-black/68 transition-all hover:-translate-y-0.5 hover:text-black hover:shadow-sm"
            >
              LinkedIn
            </a>
            <a
              href="mailto:hello@example.com"
              className="rounded-full border border-black/8 bg-white px-5 py-3 font-medium text-black/68 transition-all hover:-translate-y-0.5 hover:text-black hover:shadow-sm"
            >
              Email
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
