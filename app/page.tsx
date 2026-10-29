import type { Metadata } from "next";
import SiteHeader from "../components/SiteHeader";
import HomeHero from "../components/HomeHero";
import HomeWork from "../components/HomeWork";
import { projects } from "./data/projects";
import styles from "./home.module.css";

export const metadata: Metadata = {
  title: "Jake Tansel — Product Designer & Builder",
  description:
    "Product designer with 8 years of experience across UX/UI and front-end implementation. Designing, building and shipping digital products.",
};

export default function Home() {
  return (
    <div className={styles.home}>
      <a className={styles.skipLink} href="#main-content">Skip to content</a>
      <div className={styles.container}>
        <SiteHeader editorial />
      </div>
      <main id="main-content">
        <HomeHero />
        <HomeWork projects={projects.filter((project) => project.featured)} />
      </main>
    </div>
  );
}
