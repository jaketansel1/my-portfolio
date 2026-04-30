import ProjectGrid from "./components/ProjectGrid";
import SiteHeader from "./components/SiteHeader";
import { projects } from "./data/projects";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#171717]">
      <SiteHeader />
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10">
        <section id="about" className="pb-20 pt-24 sm:pb-24 sm:pt-32 lg:pb-28">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-semibold leading-[1.1] text-[#111111] sm:text-6xl lg:text-7xl">
              Product Designer building scalable digital products
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-8 text-black/72 sm:text-2xl sm:leading-9">
              8+ years designing and shipping digital products across sports, learning platforms and AI-assisted workflows.
            </p>
            <p className="mt-10 text-sm font-medium text-black/48">
              50+ apps launched &middot; 5M+ users reached &middot; From concept to live product
            </p>
          </div>
        </section>

        <section id="work" className="pb-24 sm:pb-32">
          <h2 className="mb-8 text-sm font-medium text-black/48">Selected work</h2>
          <ProjectGrid projects={projects} />
        </section>
      </div>
    </main>
  );
}
