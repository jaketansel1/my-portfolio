export type SurpriseItem = {
  id: string;
  /** What kind of thing this is, e.g. "Feature", "Outcome". */
  kind: string;
  title: string;
  description: string;
  project: string;
  discipline: string;
  href: string;
  /** Shown in the reveal; the same imagery the case studies use. */
  image: string;
  /** CSS object-position for the image crop. */
  position?: string;
  /** Opens in a new tab. */
  external?: boolean;
};

// Every item is drawn from copy that already exists on the case-study pages,
// and every href points at a real route or section id. Keep it that way.
export const surpriseItems: SurpriseItem[] = [
  {
    id: "build-your-set",
    kind: "Feature",
    title: "Build Your Set",
    description: "Turning a fixed offer into something customers build themselves.",
    project: "Crumble & Co",
    discipline: "Product Design",
    href: "/work/crumble-and-co#build-your-set",
    image: "/placeholders/crumble-puppy.jpg",
  },
  {
    id: "crumble-sign-ups",
    kind: "Outcome",
    title: "150 sign-ups in 48 hours",
    description: "Building anticipation with a Coming Soon page and email capture before the store opened.",
    project: "Crumble & Co",
    discipline: "eCommerce",
    href: "/work/crumble-and-co#launch",
    image: "/placeholders/crumble-pug-blanket.jpg",
  },
  {
    id: "crumble-direction",
    kind: "Process",
    title: "Getting to something real, fast",
    description: "Early directions explored in Base44 and Lovable before detailed design.",
    project: "Crumble & Co",
    discipline: "Prototyping",
    href: "/work/crumble-and-co#direction",
    image: "/crumble-and-co/showcase-hero.webp",
    position: "30% center",
  },
  {
    id: "discovery-assistant",
    kind: "Feature",
    title: "10,000+ lessons. One place to start.",
    description: "A guided recommendation journey: four questions, personalised lessons.",
    project: "LickLibrary",
    discipline: "Product Design",
    href: "/work/licklibrary#discovery",
    image: "/licklibrary/guided-discovery1.jpg",
    position: "left center",
  },
  {
    id: "licklibrary-mega-menu",
    kind: "Feature",
    title: "The Mega Menu",
    description: "Navigation reorganised around user intent rather than content type.",
    project: "LickLibrary",
    discipline: "UX/UI",
    href: "/work/licklibrary#highlights",
    image: "/licklibrary-homepage3.jpg",
    position: "left top",
  },
  {
    id: "licklibrary-onboarding",
    kind: "Outcome",
    title: "Sign-up, from 6 steps to 3",
    description: "Converting discovery momentum into membership without adding friction.",
    project: "LickLibrary",
    discipline: "UX/UI",
    href: "/work/licklibrary#highlights",
    image: "/licklibrary-homepage4.jpg",
    position: "70% center",
  },
  {
    id: "licklibrary-build",
    kind: "Process",
    title: "Most designers stop at Figma",
    description: "Designed in Figma, built in Vue 3 and shipped on Vercel as a working prototype.",
    project: "LickLibrary",
    discipline: "Front-end",
    href: "/work/licklibrary#build",
    image: "/licklibrary-homepage5.jpg",
    position: "60% center",
  },
  {
    id: "licklibrary-prototype",
    kind: "Live prototype",
    title: "Try the redesign yourself",
    description: "The discovery flow, homepage and onboarding: working, interactive and deployed.",
    project: "LickLibrary",
    discipline: "Prototype",
    href: "https://licklibrary-sandbox.vercel.app",
    image: "/licklibrary-homepage.jpg",
    external: true,
  },
  {
    id: "fanzine-scale",
    kind: "Stat",
    title: "50+ apps. 5M+ fans.",
    description: "One white-label product system powering football club apps across iOS, Android and web.",
    project: "Fanzine",
    discipline: "Product system",
    href: "/work/fanzine",
    image: "/fanzine-homepage.jpg",
    position: "30% center",
  },
  {
    id: "fanzine-theming",
    kind: "System",
    title: "One platform. Many club identities.",
    description: "Each club needed to feel unique while the core journeys stayed consistent.",
    project: "Fanzine",
    discipline: "Design System",
    href: "/work/fanzine",
    image: "/fanzine-homepage.jpg",
    position: "80% center",
  },
  {
    id: "pick-your-team",
    kind: "Feature",
    title: "Pick Your Team",
    description: "A pre-match flow that let fans build and share their ideal starting XI.",
    project: "Fanzine",
    discipline: "Mobile App",
    href: "/work/fanzine",
    image: "/placeholders/fanzine.jpg",
  },
  {
    id: "sportskins-two-products",
    kind: "Project",
    title: "Two products, two platforms",
    description: "Similar real-money gameplay problems, solved once for mobile and once for web.",
    project: "SportSkins",
    discipline: "Product Design",
    href: "/work/betting-game-products",
    image: "/sportskins2-homepage.jpg",
    position: "20% center",
  },
  {
    id: "predict10n-states",
    kind: "Design decision",
    title: "Open, locked, pending, settled",
    description: "Making status and deadlines visible at every step of a prediction round.",
    project: "Predict10n",
    discipline: "Web App",
    href: "/work/betting-game-products",
    image: "/betting-homepage.jpg",
    position: "40% center",
  },
];
