/**
 * Layered campaign scene in place of a flat visual: soft backdrop, a cut-out subject
 * and a browser with the live site playing in it.
 */
export type ShowcaseScene = {
  /** CSS background layers for the whole card (gradients), painted over the card colour. */
  backdrop: string;
  /** Transparent cut-out trimmed to its edges; sizes are the file's pixels. */
  subject: { src: string; width: number; height: number };
  /** Address shown in the browser bar, plus what plays on the screen. */
  browser: { url: string; poster: string; video?: string };
};

export type Showcase = {
  /** Main visual for the work-page showcase card. Falls back to the cover. */
  image?: string;
  /** Card colour; the visual fades into it behind the text. */
  background: string;
  /** Text colour scheme over the background. */
  theme: "dark" | "light";
  /** Text colour in place of the theme's ink; muted text and tag borders follow it. Light theme only. */
  ink?: string;
  /** CSS object-position for the visual's crop. */
  position?: string;
  /** Where the fade from card colour to visual ends (% of the visual). Longer hides text baked into screenshots. */
  fade?: string;
  scene?: ShowcaseScene;
};

export type Project = {
  title: string;
  /** Optional only so a project can be listed before its copy is written. */
  description?: string;
  /** Launch project: shown in the homepage Selected Work sequence. All projects show on /work. */
  featured?: boolean;
  link?: string;
  image?: string;
  /** Homepage image; falls back to `image`. Currently placeholders — see public/placeholders/CREDITS.md. */
  cover?: string;
  /** Short discipline line shown on the homepage. */
  category?: string;
  /** Skill tags shown on the work page. */
  tags?: string[];
  /** Dates shown on the work page. */
  period?: string;
  label?: string;
  showcase?: Showcase;
};

export const projects: Project[] = [
  {
    title: "LickLibrary",
    featured: true,
    description:
      "Redesigning a legacy guitar learning platform to improve onboarding, discovery and the overall user experience.",
    link: "/work/licklibrary",
    image: "/licklibrary-homepage5.jpg",
    cover: "/placeholders/licklibrary.jpg",
    category: "Platform redesign",
    tags: ["Product Design", "UX/UI", "Front-end"],
    period: "2025–now",
    showcase: {
      image: "/licklibrary/showcase-banner.webp",
      background: "#0b0b0c",
      theme: "dark",
      position: "center",
      fade: "45%",
    },
  },
  {
    title: "Crumble & Co",
    featured: true,
    description:
      "An eCommerce brand for dog lovers, combining beautiful design with a seamless shopping experience.",
    link: "/work/crumble-and-co",
    cover: "/crumble-and-co/showcase-hero.webp",
    category: "eCommerce, brand",
    tags: ["Product Design", "eCommerce", "Brand"],
    showcase: {
      background: "#e3d2ba",
      theme: "light",
      ink: "#3d2314",
      scene: {
        // Warm beige behind the text → cream round the dog → off-white behind the browser,
        // with a faint lift of light behind the pair. Many close stops keep it free of banding.
        backdrop: [
          "radial-gradient(ellipse 42% 58% at 66% 52%, rgb(255 252 247 / 0.55), rgb(255 252 247 / 0) 100%)",
          "linear-gradient(90deg, #e3d2ba 0%, #e7d8c3 18%, #eee2d2 36%, #f4ebdf 54%, #f8f1e7 72%, #faf5ee 100%)",
        ].join(", "),
        subject: { src: "/crumble-and-co/scene-dog.webp", width: 1007, height: 1184 },
        browser: {
          url: "crumbleandco.club",
          video: "/crumble-and-co/crumble-video.mp4",
          // The video's first frame, so there's no jump when playback starts.
          poster: "/crumble-and-co/crumble-video-poster.webp",
        },
      },
    },
  },
  {
    title: "Fanzine",
    featured: true,
    description:
      "Scaling 50+ football club apps to millions of fans through a unified product system.",
    link: "/work/fanzine",
    image: "/fanzine-homepage.jpg",
    cover: "/placeholders/fanzine.jpg",
    category: "Mobile apps, product system",
    tags: ["Product Design", "Mobile App", "Design System"],
    period: "2017–2025",
    showcase: {
      image: "/placeholders/fanzine.jpg",
      background: "#0a120d",
      theme: "dark",
      position: "center",
    },
  },
  {
    // Placeholder entry so the project holds its place in the order.
    // Still needed: description, tags, period, imagery (image/cover/showcase), card colour and a case-study link.
    title: "Reawakening the Feminine",
    featured: true,
  },
  {
    title: "SportSkins",
    description:
      "Designing betting game products across mobile and web, turning complex rules into clear user experiences.",
    link: "/work/betting-game-products",
    image: "/sportskins2-homepage.jpg",
    cover: "/placeholders/sportskins.jpg",
    category: "Web and mobile games",
    tags: ["Product Design", "Gaming", "Web App"],
    period: "2023–2024",
    showcase: {
      image: "/betting-homepage.jpg",
      background: "#0f0d0b",
      theme: "dark",
      position: "60% center",
    },
  },
  {
    title: "Maison Augustin",
    description:
      "Designing and launching a premium lead-generation website for an independent real estate consultant specialising in Dubai off-plan investments.",
    image: "/maison-augustin-homepage3.jpg",
    cover: "/placeholders/maison-augustin.jpg",
    category: "Website, lead generation",
    tags: ["Web Design", "Front-end", "Lead Generation"],
    showcase: {
      image: "/maison-augustin-homepage3.jpg",
      background: "#e4e3e1",
      theme: "light",
      position: "center",
    },
  },
  {
    title: "Inspect Design",
    description:
      "Upload any screenshot and receive a structured breakdown of layout, typography, spacing, and UX patterns.",
    label: "Coming soon",
    image: "/inspect-design.png",
    cover: "/placeholders/inspect-design.jpg",
    category: "AI design tool",
    tags: ["Product Design", "AI", "Front-end"],
    showcase: {
      image: "/placeholders/inspect-architecture.jpg",
      background: "#dfe6ea",
      theme: "light",
      position: "center 40%",
    },
  },
];
