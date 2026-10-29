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
    title: "Social & eCommerce",
    body: "Learning what makes people stop, click, buy and come back, and how much the small details move the numbers.",
  },
  {
    period: "2017 onwards",
    title: "Product design",
    body: "Apps for millions of football fans, real-money games, and a platform redesign for guitar learners.",
  },
  {
    period: "Now",
    title: "Design & build",
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

// One visual biography: who I am and how I work, rather than another project list.
// Some photography is placeholder (see public/placeholders/CREDITS.md) — swap in real photos.
export const personalChapters: PersonalChapter[] = [
  {
    kicker: "Me",
    title: "Hi, I’m Jake.",
    text: "Product designer based just outside London. I design, prototype and build digital products — usually somewhere between a design file and a code editor.",
    image: "/about.jpg",
    alt: "Portrait of Jake Tansel",
    position: "center 25%",
  },
  {
    kicker: "Work",
    title: "Eight years making things.",
    text: "From football apps used by millions to eCommerce brands and guitar platforms. I like taking ideas all the way from rough concept to something real.",
    image: "/fanzine-homepage.jpg",
    alt: "A family of football club apps designed by Jake",
    position: "30% center",
  },
  {
    kicker: "Football",
    title: "Football, always.",
    text: "Playing it, watching it, talking about it — and somehow spending eight years designing products around it too.",
    image: "/placeholders/about-football.jpg",
    alt: "",
  },
  {
    kicker: "Building",
    title: "I like making things real.",
    text: "I’m happiest when I can go beyond the mockup — prototyping, writing front-end and figuring out how the thing actually works.",
    image: "/inspect-design.png",
    alt: "Inspect Design, a tool Jake is building, breaking down an interface",
    position: "left top",
  },
  {
    kicker: "Training",
    title: "Usually training something.",
    text: "Football, the gym or Brazilian Jiu-Jitsu. Mostly an excuse to compete, learn something and switch my brain off for a bit.",
    image: "/personal-health-hub.jpg",
    alt: "",
  },
  {
    kicker: "Side projects",
    title: "There’s usually something on the go.",
    text: "A website, a brand, a product idea or something I’ve convinced myself I can build over a weekend.",
    image: "/maison-augustin-homepage3.jpg",
    alt: "A website Jake designed and built, shown on laptop and phone",
  },
  {
    kicker: "Travel",
    title: "Getting away is important.",
    text: "New cities, good food and seeing somewhere completely different. I’m usually thinking about the next trip before the current one is over.",
    image: "/placeholders/about-travel.jpg",
    alt: "",
  },
  {
    kicker: "Everyday",
    title: "Away from the screen.",
    text: "Friends, family, football, coffee, music and probably spending too long researching something I’ve suddenly become interested in.",
    image: "/placeholders/about-everyday.jpg",
    alt: "",
  },
];
