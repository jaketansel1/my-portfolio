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
 * About hero photos. Hover plays through them in this order; click (or tap) jumps to a random one.
 * Add, remove or reorder freely: the first is shown on load. Supplied at roughly 16:9 (1800 × 1062),
 * which matches the frame; use `position` to adjust a crop, e.g. "center 30%".
 */
const hero = (name: string, alt: string, position?: string) => photo(`hero-${name}`, 1800, 1062, alt, position);

export const heroPhotos: Photo[] = [
  hero("mountain", "Jake on a mountain in the Scottish Highlands, a loch in the valley below"),
  hero("wedding", "Jake walking back down the aisle on his wedding day"),
  hero("summit", "Jake with his arms out at a summit above a lake"),
  hero("beach", "Jake walking along a palm-lined beach"),
  hero("groomsmen", "Jake laughing with his groomsmen on the beach"),
  hero("carry", "Jake carrying a little one in a yellow cap"),
  hero("bjj", "Jake with his Brazilian Jiu-Jitsu class"),
  hero("desert", "Quad biking through the desert"),
  hero("party", "Jake smiling at a party"),
  hero("hike-group", "Jake with a group of friends at the start of a hike"),
];

/*
 * Glimpses of life outside the work, in grid order (left to right, top to bottom).
 * To swap a photo, drop a file in public/about/ and point the card at it; a card without a photo shows
 * its colour instead. Travel, Football and Training currently use stock placeholders (see
 * public/placeholders/CREDITS.md); Making, Books & Film and Currently are waiting for personal photos.
 * List groups with no items are hidden, so they can be filled in whenever.
 */
export const sides: Side[] = [
  {
    key: "travel",
    title: "Travel",
    line: "Usually planning the next trip.",
    photo: photo("travel-lipari", 1600, 1600, "Jake with arms out above a harbour town at sunset", "center 45%"),
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
    heading: "Football, always.",
    text: "Chelsea supporter. I play every week and have spent an unreasonable amount of my life watching and playing football.",
    tags: ["Chelsea", "Playing", "Watching"],
    tone: { bg: "#2c3628", fg: "#eceee6" },
  },
  {
    key: "training",
    title: "Training",
    line: "BJJ, the gym and football.",
    photo: photo("training", 1400, 933),
    heading: "Usually training something.",
    text: "BJJ, the gym or a game of football. Mostly an excuse to stay active, learn something and switch my brain off for a bit.",
    tags: ["BJJ", "Gym", "Football"],
    tone: { bg: "#3a322a", fg: "#efe9e2" },
  },
  {
    key: "making",
    title: "Making",
    line: "Design, code, AI and side projects.",
    // TODO: a behind-the-scenes photo: laptop, Figma, VS Code, a prototype, something half-built.
    heading: "I like making things.",
    text: "Designing, coding, experimenting with AI and building side projects — turning ideas into something real, often over a weekend.",
    tags: ["Design", "Code", "AI", "Side projects"],
    tone: { bg: "#1f2430", fg: "#eceef2" },
  },
  {
    key: "books-film",
    title: "Books & Film",
    line: "Sci-fi, history and psychology.",
    // TODO: a photo of books, films or something cultural.
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
    // TODO: a candid photo of the current desk or a work in progress.
    key: "currently",
    title: "Currently",
    line: "The LickLibrary homepage redesign.",
    heading: "On my desk right now.",
    text: "What I’m working on and building at the moment.",
    lists: [
      { label: "Working on", items: ["The LickLibrary homepage redesign"] },
      { label: "Building", items: ["Inspect Design"] },
      { label: "Learning", items: [] },
      { label: "Reading", items: [] },
    ],
    tone: { bg: "#3b2a25", fg: "#f3ebe6" },
  },
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
