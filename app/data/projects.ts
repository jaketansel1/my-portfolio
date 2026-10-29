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
  /** Phone overlapping the browser's lower right. */
  mobile?: DeviceScreen;
};

/** An image file with its pixel size, so it can be laid out at its true proportions. */
type SizedImage = { src: string; width: number; height: number };

/**
 * A screenshot for a CSS-built device. Without `src` a styled placeholder screen is shown,
 * so a layout can be designed before real screenshots exist.
 */
export type DeviceScreen = Partial<SizedImage> & {
  /** Silent looping recording in place of the image; width/height are the video's. */
  video?: string;
  /** Still shown before the video plays, and instead of it with reduced motion. */
  poster?: string;
  /** Screen colour behind the image; shows wherever a short screenshot doesn't reach. */
  fill?: string;
  /** Label on a placeholder screen. */
  placeholder?: string;
};

/**
 * Product artwork in place of a flat visual: a CSS backdrop plus devices built in HTML/CSS with
 * screenshots inside. Screenshots are shown whole at their own proportions, so they can be swapped
 * freely. One of:
 *  - `desktop`: a large browser (optionally with a `mobile` overlapping its lower right)
 *  - `phones`: three phones fanned out, the middle one in front
 */
export type ShowcaseArtwork = {
  /** CSS background layers for the whole card (gradients), painted over the card colour. */
  backdrop: string;
  /**
   * Large faded image across the whole panel, behind the text and devices (e.g. a cut-out).
   * Full screen, its focal point (`focusX`, 0–1 across the image) is placed `at` (0–1) across the panel.
   */
  ghost?: SizedImage & { opacity?: number; focusX?: number; at?: number };
  desktop?: DeviceScreen & { url: string };
  mobile?: DeviceScreen;
  phones?: DeviceScreen[];
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
  artwork?: ShowcaseArtwork;
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
      background: "#050505",
      theme: "dark",
      artwork: {
        // Black studio backdrop: a soft charcoal lift behind the browser, a gentle vignette at the
        // edges, and the left side kept near-black behind the text. Neutral greys only.
        backdrop: [
          "radial-gradient(ellipse 70% 85% at 50% 50%, rgb(0 0 0 / 0) 55%, rgb(0 0 0 / 0.55) 100%)",
          "radial-gradient(ellipse 32% 42% at 69% 50%, rgb(44 44 44 / 0.42), rgb(30 30 30 / 0.2) 45%, rgb(20 20 20 / 0) 100%)",
          "radial-gradient(ellipse 58% 75% at 70% 50%, rgb(22 22 22 / 0.85), rgb(14 14 14 / 0.45) 45%, rgb(8 8 8 / 0) 100%)",
        ].join(", "),
        ghost: { src: "/licklibrary/scene-guitarist.webp", width: 1951, height: 1300 },
        desktop: {
          video: "/licklibrary/ll-video.mp4",
          poster: "/licklibrary/screen-desktop.webp",
          width: 1280,
          height: 720,
          url: "licklibrary.com",
        },
      },
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
      background: "#070a10",
      theme: "dark",
      artwork: {
        // Deep ink/navy, near-black at the edges, a cool glow behind the phones and a faint wash of
        // floodlight from above. The colour comes from the club apps themselves.
        backdrop: [
          "radial-gradient(ellipse 75% 90% at 55% 50%, rgb(0 0 0 / 0) 50%, rgb(2 3 6 / 0.7) 100%)",
          "radial-gradient(ellipse 30% 40% at 68% 48%, rgb(70 110 180 / 0.26), rgb(40 70 130 / 0.1) 50%, rgb(20 40 80 / 0) 100%)",
          "radial-gradient(ellipse 45% 32% at 66% -6%, rgb(150 180 230 / 0.1), rgb(150 180 230 / 0) 100%)",
          "linear-gradient(100deg, #06080d 0%, #080c14 35%, #0c1320 65%, #111c2d 100%)",
        ].join(", "),
        // Screens cropped from /fanzine-homepage.jpg. Order: left, centre (front), right.
        phones: [
          { src: "/fanzine/screen-chelsea.webp", width: 515, height: 1105 },
          { src: "/fanzine/screen-arsenal.webp", width: 517, height: 1105 },
          { src: "/fanzine/screen-man-city.webp", width: 517, height: 1105 },
        ],
      },
    },
  },
  {
    title: "Reawakening the Feminine",
    featured: true,
    // PLACEHOLDER copy, tags and period: replace with the real details.
    description:
      "An editorial digital experience for a women's wellbeing practice, designed to feel calm, warm and personal across desktop and mobile.",
    category: "Website, editorial",
    tags: ["Web Design", "UX/UI", "Front-end"],
    period: "2025",
    showcase: {
      background: "#f3e8de",
      theme: "light",
      ink: "#3b2620",
      artwork: {
        // Warm cream into soft blush and dusty rose, a quiet light behind the devices and a low
        // terracotta shadow in the far corner. Restrained, editorial, no decoration.
        backdrop: [
          "radial-gradient(ellipse 80% 95% at 50% 50%, rgb(120 70 50 / 0) 60%, rgb(120 70 50 / 0.07) 100%)",
          "radial-gradient(ellipse 34% 44% at 66% 44%, rgb(255 250 245 / 0.75), rgb(255 250 245 / 0.25) 55%, rgb(255 250 245 / 0) 100%)",
          "radial-gradient(ellipse 40% 34% at 96% 104%, rgb(190 120 96 / 0.22), rgb(190 120 96 / 0) 100%)",
          "linear-gradient(105deg, #f5ece3 0%, #f3e6db 38%, #eed8cb 70%, #e9cdbf 100%)",
        ].join(", "),
        // Desktop: the She Who Mothers Herself landing page (browser scrollbar trimmed). Mobile: Meet Lauren.
        desktop: { src: "/reawakening/screen-desktop.webp", width: 1521, height: 1078, url: "reawakeningthefeminineprograms.com" },
        mobile: { src: "/reawakening/screen-mobile.jpg", width: 945, height: 2048 },
      },
    },
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
