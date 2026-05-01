export type Project = {
  title: string;
  description: string;
  tone: string;
  link?: string;
  image?: string;
  label?: string;
  overlay?: string;
  visual?: "padel" | "gym" | "maison";
};

export const projects: Project[] = [
  {
    title: "LickLibrary",
    description:
      "Redesigning a legacy guitar learning platform to improve onboarding, discovery and the overall user experience.",
    tone: "bg-[#e9edf1]",
    link: "/licklibrary",
    image: "/licklibrary-homepage4.jpg",
  },
  {
    title: "Fanzine",
    description:
      "Scaling 50+ football club apps to millions of fans through a unified product system.",
    tone: "bg-[#ece8df]",
    link: "/fanzine",
    image: "/fanzine-homepage.jpg",
  },
  {
    title: "SportSkins",
    description:
      "Designing betting game products across mobile and web, turning complex rules into clear user experiences.",
    tone: "bg-[#e8ece7]",
    link: "/betting-game-products",
    image: "/sportskins2-homepage.jpg",
  },
  {
    title: "Maison Augustin",
    description:
      "Designing and launching a premium lead-generation website for an independent real estate consultant specialising in Dubai off-plan investments.",
    tone: "bg-[#eee7dc]",
    image: "/maison-augustin-homepage3.jpg",
  },
  {
    title: "Personal Health Hub",
    description:
      "A simple, visual dashboard to track workouts, BJJ sessions, runs, and daily activity in one place.",
    tone: "bg-[#dcecff]",
    label: "Coming soon",
    image: "/personal-health-hub.jpg",
    overlay: "bg-black/12",
  },
];
