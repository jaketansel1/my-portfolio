import ProjectGrid from "../components/ProjectGrid";
import SiteHeader from "../components/SiteHeader";
import { projects } from "../data/projects";

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#171717]">
      <SiteHeader />

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10">
        <section className="page-hero standard-hero">
          <div className="max-w-3xl">
            <h1 className="heading-xl text-[#111111]">
              Selected work
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-8 text-black/64 sm:text-2xl sm:leading-9">
              A collection of product design, platform and digital product
              projects across sports, learning, betting and eCommerce.
            </p>
          </div>
        </section>

        <section className="pb-24 sm:pb-32">
          <ProjectGrid projects={projects} />
        </section>
      </div>
    </main>
  );
}
