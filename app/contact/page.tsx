import SiteHeader from "../../components/SiteHeader";

const contactLinks = [
  {
    label: "Email",
    icon: "mail",
    href: "mailto:hello@example.com",
  },
  {
    label: "Call me",
    icon: "phone",
    href: "tel:+440000000000",
  },
  {
    label: "LinkedIn",
    icon: "linkedin",
    href: "https://www.linkedin.com",
    external: true,
  },
  {
    label: "View my CV",
    icon: "file",
    href: "#",
  },
];

function ContactIcon({ icon }: { icon: string }) {
  const sharedProps = {
    className:
      "h-7 w-7 text-[#151515] transition-transform duration-300 group-hover:scale-105",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.7,
    viewBox: "0 0 24 24",
  };

  if (icon === "mail") {
    return (
      <svg {...sharedProps} aria-hidden="true">
        <path d="M4 6h16v12H4z" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    );
  }

  if (icon === "phone") {
    return (
      <svg {...sharedProps} aria-hidden="true">
        <path d="M6.5 5.5 9 4l3 5-2 1.5a9 9 0 0 0 3.5 3.5L15 12l5 3-1.5 2.5c-.5.8-1.4 1.2-2.3 1A14 14 0 0 1 5.5 7.8c-.2-.9.2-1.8 1-2.3Z" />
      </svg>
    );
  }

  if (icon === "linkedin") {
    return (
      <svg {...sharedProps} aria-hidden="true">
        <path d="M6.5 10v7" />
        <path d="M10.5 17v-4.2c0-1.7 1-2.8 2.5-2.8s2.5 1.1 2.5 2.8V17" />
        <path d="M6.5 7.2v.1" />
        <path d="M4 4h16v16H4z" />
      </svg>
    );
  }

  return (
    <svg {...sharedProps} aria-hidden="true">
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v5h4" />
      <path d="M10 13h5" />
      <path d="M10 17h4" />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#111111]">
      <SiteHeader />

      <div className="mx-auto w-full max-w-[800px] px-5 sm:px-8">
        <section className="page-hero standard-hero text-center">
          <h1 className="heading-xl">
            Get in touch
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl leading-8 text-black/64">
            Whether you’re hiring, collaborating, or just want to chat, feel
            free to reach out.
          </p>
        </section>

        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {contactLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
              className="group flex min-h-32 flex-col items-center justify-center rounded-[24px] border border-black/8 bg-white px-5 py-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-black/18 hover:shadow-[0_18px_45px_rgba(0,0,0,0.06)]"
            >
              <ContactIcon icon={item.icon} />
              <p className="mt-4 text-sm font-semibold text-[#151515]">
                {item.label}
              </p>
            </a>
          ))}
        </section>

        <section className="py-16 sm:py-24">
          <div className="rounded-[32px] border border-black/8 bg-white/72 p-5 shadow-sm sm:p-8">
            <p className="mb-8 max-w-xl text-lg leading-7 text-black/64">
              Or send me a message and I’ll get back to you as soon as possible.
            </p>

            <form className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium text-black/58">
                  First name
                  <input
                    type="text"
                    name="firstName"
                    className="h-12 rounded-2xl border border-black/10 bg-[#faf9f6] px-4 text-base text-[#111111] outline-none transition-colors placeholder:text-black/28 focus:border-black/28"
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium text-black/58">
                  Last name
                  <input
                    type="text"
                    name="lastName"
                    className="h-12 rounded-2xl border border-black/10 bg-[#faf9f6] px-4 text-base text-[#111111] outline-none transition-colors placeholder:text-black/28 focus:border-black/28"
                  />
                </label>
              </div>

              <label className="grid gap-2 text-sm font-medium text-black/58">
                Email
                <input
                  type="email"
                  name="email"
                  className="h-12 rounded-2xl border border-black/10 bg-[#faf9f6] px-4 text-base text-[#111111] outline-none transition-colors placeholder:text-black/28 focus:border-black/28"
                />
              </label>

              <label className="grid gap-2 text-sm font-medium text-black/58">
                Message
                <textarea
                  name="message"
                  rows={6}
                  className="resize-none rounded-2xl border border-black/10 bg-[#faf9f6] px-4 py-3 text-base leading-7 text-[#111111] outline-none transition-colors placeholder:text-black/28 focus:border-black/28"
                />
              </label>

              <button
                type="submit"
                className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-full bg-[#111111] px-6 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-black/84 sm:w-auto"
              >
                Send message
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
