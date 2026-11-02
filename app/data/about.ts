/*
 * About page content. Everything on /about reads from here, so copy, photos and the "Currently"
 * tile can be updated without touching the layout.
 */

export type Photo = { src: string; width: number; height: number; alt: string; position?: string };

/** One two-sided card in the "A few sides of me" grid. */
export type Side = {
  key: string;
  title: string;
  /** One short line under the title on the front, so the gist is visible without flipping. */
  line: string;
  /**
   * Front of the card. Personal, candid photos work best. Leave it out and the front shows the
   * card's colour instead, until a photo is added.
   */
  photo?: Photo;
  /** Optional silent loop with a lightweight poster and the source's native dimensions. */
  video?: { src: string; webmSrc?: string; poster: string; width: number; height: number };
  /** Back of the card: a short heading, two or three sentences and optional tags. */
  heading: string;
  text: string;
  tags?: string[];
  /** Grouped lists on the back (used by "Currently"). Any number of groups and items. */
  lists?: { label: string; items: string[] }[];
  /** Optional small note, e.g. when "Currently" was last updated. */
  note?: string;
  /** Muted colour for the back (and the front when there is no photo). */
  tone: { bg: string; fg: string };
};

const photo = (name: string, width: number, height: number, alt = "", position?: string): Photo => ({
  src: `/about/${name}.webp`,
  width,
  height,
  alt,
  position,
});

/**
 * About hero photos. They rotate on their own in this order, every few seconds, then loop; the first is
 * shown on load (and is the only one shown with reduced motion). Add, remove or reorder freely.
 * Supplied at roughly 16:9 (1800 × 1062), which matches the frame; use `position` to keep a subject in
 * view if the crop ever tightens, e.g. "center 30%".
 *
 * Also in public/about but not in the rotation: hero-mountain, hero-beach, hero-party, hero-hike-group.
 */
const hero = (name: string, alt: string, position?: string) => photo(`hero-${name}`, 1800, 1062, alt, position);

export const heroPhotos: Photo[] = [
  hero("wedding", "Jake and Billie walking back down the aisle on their wedding day", "center 30%"),
  hero("bjj", "Jake with his Brazilian Jiu-Jitsu class"),
  hero("groomsmen", "Jake laughing with his groomsmen on the beach", "center 30%"),
  hero("desert", "Quad biking through the desert"),
  hero("summit", "Jake with his arms out at a summit above a lake"),
  hero("carry", "Jake carrying a little one in a yellow cap", "center 40%"),
];

/*
 * Glimpses of life outside the work, in grid order (left to right, top to bottom).
 * To swap a photo, drop a file in public/about/ and point the card at it; a card without a photo shows
 * its colour instead. Currently still uses a stock placeholder (see public/placeholders/CREDITS.md).
 * List groups with no items are hidden, so they can be filled in whenever.
 */
export const sides: Side[] = [
  {
    key: "travel",
    title: "Travel",
    line: "Usually planning the next trip.",
    photo: photo("travel-terrace", 1920, 1920, "Pizza and a Birra Messina on a terrace, with boats in the bay and a volcano on the horizon", "center 35%"),
    heading: "Getting away is important.",
    text: "New places, good food and somewhere completely different. I’m usually planning the next trip before the current one is over.",
    tags: ["New places", "Good food"],
    tone: { bg: "#46535e", fg: "#edf1f4" },
  },
  {
    key: "football",
    title: "Football",
    line: "Chelsea, and playing every week.",
    photo: photo("football", 1400, 933),
    video: {
      src: "/about/football-video.mp4",
      webmSrc: "/about/football-video.webm",
      poster: "/about/football-video-poster.webp",
      width: 1200,
      height: 1600,
    },
    heading: "Football, always.",
    text: "Chelsea supporter. I play every week and have spent an unreasonable amount of my life watching and playing football.",
    tags: ["Chelsea", "Playing", "Watching"],
    tone: { bg: "#2c3628", fg: "#eceee6" },
  },
  {
    key: "training",
    title: "Training",
    line: "BJJ, the gym and football.",
    photo: photo("training-bjj", 1920, 1920, "Jake with his BJJ teammates on the mats", "center 65%"),
    heading: "Usually training something.",
    text: "BJJ, the gym or a game of football. Mostly an excuse to stay active, learn something and switch my brain off for a bit.",
    tags: ["BJJ", "Gym", "Football"],
    tone: { bg: "#3a322a", fg: "#efe9e2" },
  },
  {
    key: "people",
    title: "People",
    line: "Friends, family and the good stuff.",
    photo: { src: "/about/people-friends.jpg", width: 1600, height: 1200, alt: "Jake and a group of friends crowded together, laughing, on a night out", position: "center 45%" },
    heading: "Friends, family and the good stuff.",
    text: "Time with the people who matter, ideally somewhere warm with not much of a plan.",
    tone: { bg: "#1f2430", fg: "#eceef2" },
  },
  {
    key: "books-film",
    title: "Books & Film",
    line: "Sci-fi, history and psychology.",
    photo: photo("books-film-dune", 1254, 1254, "Two cloaked figures facing off on a dune at sunset", "center 70%"),
    heading: "Always reading or watching something.",
    text: "Usually sci-fi, history or psychology.",
    lists: [
      // Add titles here, e.g. items: ["Book title"]. Empty groups don’t show.
      { label: "Reading", items: [] },
      { label: "Watching", items: [] },
    ],
    tone: { bg: "#ddd3c4", fg: "#2b241d" },
  },
  {
    // The one to keep fresh: change, add or remove any group or item below.
    key: "currently",
    title: "Currently",
    line: "Redesigning LickLibrary, feature by feature.",
    // Placeholder (see public/placeholders/CREDITS.md). TODO: a real photo from the LickLibrary office.
    photo: { src: "/placeholders/about-office.jpg", width: 1800, height: 1200, alt: "A desk with a monitor, keyboard and tablet" },
    heading: "On my desk right now.",
    text: "What I’m working on and building at the moment.",
    lists: [
      { label: "Working on", items: ["Redesigning LickLibrary, feature by feature"] },
      { label: "Building", items: ["Inspect Design"] },
      { label: "Learning", items: [] },
      { label: "Reading", items: [] },
    ],
    tone: { bg: "#3b2a25", fg: "#f3ebe6" },
  },
];

/** "How I work": design through to delivery, in order. One short line each. */
export const workStages: { title: string; line: string }[] = [
  { title: "Design", line: "UX, UI and product thinking." },
  { title: "Build", line: "Frontend implementation and real codebases." },
  { title: "Ship", line: "Git, testing and engineering collaboration." },
  { title: "Learn", line: "Using AI to understand, iterate and improve faster." },
];

export type CareerStep = {
  /** Year the stage starts, shown on the timeline. */
  from: string;
  /** Range shown with the stage. */
  years: string;
  title: string;
  body: string;
  /** Understated companies, products or clients from this stage. */
  places?: string[];
};

/** "How I got here": one progression, oldest first. The timeline ends at "now". */
export const career: CareerStep[] = [
  {
    from: "2017",
    years: "2017–2020",
    title: "Social & eCommerce",
    body: "Where I learned what makes people stop, click, buy and come back, and how much the small details move the numbers.",
    places: ["Fanzine — social growth and eCommerce"],
  },
  {
    from: "2020",
    years: "2020–2025",
    title: "Product Design",
    body: "Designing digital products and experiences used by millions of football fans, and a real-money game from scratch.",
    places: ["Fanzine", "SportSkins"],
  },
  {
    from: "2025",
    years: "2025–now",
    title: "Design & Build",
    body: "Owning more of the process: UX/UI, frontend implementation and shipping products end to end.",
    places: ["LickLibrary", "Crumble & Co", "Reawakening the Feminine", "Maison Augustin"],
  },
];
