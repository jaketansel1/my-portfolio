export type JourneyStep = {
  period: string;
  title: string;
  body: string;
};

export type Experience = {
  years: string;
  company: string;
  note: string;
};

export type PersonalChapter = {
  kicker: string;
  title: string;
  text: string;
  image: string;
  alt: string;
  /** CSS object-position for the crop. */
  position?: string;
};

export const journey: JourneyStep[] = [
  {
    period: "Where it started",
    title: "Social and eCommerce",
    body: "Learning what makes people stop, click, buy and come back, and how much the small details move the numbers.",
  },
  {
    period: "2017 onwards",
    title: "Product design",
    body: "Apps for millions of football fans, real-money games, and a platform redesign for guitar learners.",
  },
  {
    period: "Now",
    title: "Design and build",
    body: "Designing and shipping end to end. Front-end code and AI-assisted workflows get ideas to real users faster.",
  },
];

export const experience: Experience[] = [
  { years: "2025–now", company: "LickLibrary", note: "Redesigning a 30+ year old guitar learning platform." },
  { years: "2023–2024", company: "SportSkins", note: "Designed a real-money betting product from scratch." },
  { years: "2017–2025", company: "Fanzine", note: "Designed 50+ football club apps used by millions of fans." },
];

export const capabilities = [
  "Product thinking and discovery",
  "UX and interaction design",
  "UI and design systems",
  "Prototyping",
  "Front-end implementation",
  "AI-assisted development",
  "eCommerce",
  "Admin and CMS tooling",
];

// Draft copy and placeholder photography (see public/placeholders/CREDITS.md) — swap in real photos and words.
export const personalChapters: PersonalChapter[] = [
  {
    kicker: "Me",
    title: "Hi, I’m Jake.",
    text: "Product designer in London. Usually somewhere between a design file and a code editor.",
    image: "/about.jpg",
    alt: "Portrait of Jake Tansel",
    position: "center 25%",
  },
  {
    kicker: "Football",
    title: "Football, always.",
    text: "Playing it, watching it, and eight years designing for the fans who live for it.",
    image: "/placeholders/about-football.jpg",
    alt: "",
  },
  {
    kicker: "Training",
    title: "Gym and Jiu-Jitsu.",
    text: "Brazilian Jiu-Jitsu keeps me humble. Small adjustments, big outcomes. A lot like design.",
    image: "/personal-health-hub.jpg",
    alt: "",
  },
  {
    kicker: "Travel",
    title: "Planning the next trip.",
    text: "New places reset how I see things. I always come back with fresh eyes.",
    image: "/placeholders/about-travel.jpg",
    alt: "",
  },
  {
    kicker: "Everyday",
    title: "The small details.",
    text: "Good coffee, well-made things and noticing why they work. The same instinct I bring to products.",
    image: "/placeholders/about-everyday.jpg",
    alt: "",
  },
];
