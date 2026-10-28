export type Showcase = {
  /** Main visual for the work-page showcase card. */
  image: string;
  /** Card colour; the visual fades into it behind the text. */
  background: string;
  /** Text colour scheme over the background. */
  theme: "dark" | "light";
  /** CSS object-position for the visual's crop. */
  position?: string;
  /** Where the fade from card colour to visual ends (% of the visual). Longer hides text baked into screenshots. */
  fade?: string;
};

export type Project = {
  title: string;
  description: string;
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
    description:
      "Redesigning a legacy guitar learning platform to improve onboarding, discovery and the overall user experience.",
    link: "/work/licklibrary",
    image: "/licklibrary-homepage5.jpg",
    cover: "/placeholders/licklibrary.jpg",
    category: "Platform redesign",
    tags: ["Product Design", "UX/UI", "Front-end"],
    period: "2025–now",
    showcase: {
      image: "/licklibrary-homepage4.jpg",
      background: "#0b0b0c",
      theme: "dark",
      position: "center",
      fade: "78%",
    },
  },
  {
    title: "Crumble & Co",
    description:
      "An eCommerce brand for dog lovers, combining beautiful design with a seamless shopping experience.",
    link: "/work/crumble-and-co",
    cover: "/placeholders/crumble-and-co.jpg",
    category: "eCommerce, brand",
    tags: ["Product Design", "eCommerce", "Brand"],
    showcase: {
      image: "/placeholders/crumble-and-co.jpg",
      background: "#d9c6ad",
      theme: "light",
      position: "30% center",
    },
  },
  {
    title: "Fanzine",
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
