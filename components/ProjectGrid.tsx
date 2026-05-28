import Image from "next/image";
import Link from "next/link";
import type { Project } from "../app/data/projects";

type ProjectGridProps = {
  projects: Project[];
  featuredFirst?: boolean;
};

export default function ProjectGrid({
  projects,
  featuredFirst = true,
}: ProjectGridProps) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:gap-x-10">
      {projects.map((project, index) => {
        const isFeatured = featuredFirst && index === 0;
        const cardClassName = `group block ${isFeatured ? "md:col-span-2" : ""}`;
        const cardContent = (
          <>
            <div
              className={`relative mb-5 aspect-video overflow-hidden rounded-[30px] ${project.tone} shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)] transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-[1.01] group-hover:shadow-[0_18px_45px_rgba(0,0,0,0.08),inset_0_0_0_1px_rgba(0,0,0,0.04)] ${isFeatured ? "md:aspect-[16/7]" : ""}`}
            >
              {project.label ? (
                <span
                  className={`absolute left-6 top-6 z-10 rounded-full px-3 py-1 text-xs font-medium ${
                    project.visual === "gym"
                      ? "bg-white/10 text-white/72"
                      : "bg-white/70 text-black/54"
                  }`}
                >
                  {project.label}
                </span>
              ) : null}
              {project.image ? (
                <>
                  <Image
                    src={project.image}
                    alt={`${project.title} homepage`}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/14 via-transparent to-black/6" />
                  {project.overlay ? (
                    <div className={`absolute inset-0 ${project.overlay}`} />
                  ) : null}
                </>
              ) : project.visual === "padel" ? (
                <div className="absolute inset-0 overflow-hidden bg-[#0e56b3] shadow-sm transition-transform duration-500 group-hover:-translate-y-1">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(255,255,255,0.24),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.1),transparent_52%)]" />
                  <div className="absolute inset-x-5 bottom-5 top-16 rounded-[24px] border border-white/35">
                    <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/28" />
                    <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/28" />
                  </div>
                  <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-3">
                    <div className="h-16 rounded-2xl bg-white/18" />
                    <div className="h-16 rounded-2xl bg-[#8fe3ff]/42" />
                    <div className="h-16 rounded-2xl bg-white/18" />
                  </div>
                </div>
              ) : project.visual === "gym" ? (
                <div className="absolute inset-0 overflow-hidden bg-[#1b1f27] shadow-sm transition-transform duration-500 group-hover:-translate-y-1">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_16%,rgba(98,127,255,0.24),transparent_30%)]" />
                  <div className="absolute left-1/2 top-5 h-[88%] w-[50%] -translate-x-1/2 rounded-[28px] border border-white/12 bg-[#080a0e] p-3 shadow-[0_22px_50px_rgba(0,0,0,0.28)]">
                    <div className="mb-5 flex items-center justify-between">
                      <div className="h-2 w-12 rounded-full bg-white/18" />
                      <div className="h-7 w-7 rounded-full bg-[#7cffb2]/20" />
                    </div>
                    <div className="h-24 rounded-[22px] bg-[#7cffb2]/18" />
                    <div className="mt-4 grid gap-2">
                      <div className="h-10 rounded-2xl bg-white/10" />
                      <div className="h-10 rounded-2xl bg-white/8" />
                      <div className="h-10 rounded-2xl bg-white/6" />
                    </div>
                    <div className="mt-4 h-10 rounded-full bg-[#7cffb2]" />
                  </div>
                </div>
              ) : project.visual === "maison" ? (
                <div className="absolute inset-0 overflow-hidden bg-[#efe4d2] shadow-sm transition-transform duration-500 group-hover:-translate-y-1">
                  <div className="absolute inset-x-6 top-6 h-28 rounded-[24px] bg-[#1d1a16]" />
                  <div className="absolute left-6 right-6 top-40 grid gap-3">
                    <div className="h-3 w-28 rounded-full bg-[#1d1a16]/24" />
                    <div className="h-16 rounded-2xl bg-white/80" />
                    <div className="grid grid-cols-2 gap-3">
                      <div className="h-24 rounded-2xl bg-white/70" />
                      <div className="h-24 rounded-2xl bg-[#c5a06e]/28" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 bg-white/55 shadow-sm transition-transform duration-500 group-hover:-translate-y-1">
                  <div className="flex items-center gap-1.5 border-b border-black/6 px-5 py-4">
                    <span className="h-2.5 w-2.5 rounded-full bg-black/12" />
                    <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
                    <span className="h-2.5 w-2.5 rounded-full bg-black/8" />
                  </div>
                  <div className="grid gap-3 p-5">
                    <div className="h-3 w-24 rounded-full bg-black/16" />
                    <div className="h-12 rounded-2xl bg-black/8" />
                    <div className="grid grid-cols-3 gap-3">
                      <div className="h-20 rounded-2xl bg-white/70" />
                      <div className="h-20 rounded-2xl bg-white/70" />
                      <div className="h-20 rounded-2xl bg-white/70" />
                    </div>
                  </div>
                </div>
              )}
              <span
                className={`absolute bottom-6 right-7 text-xs font-medium ${
                  project.visual === "gym" ? "text-white/34" : "text-black/32"
                }`}
              >
                0{index + 1}
              </span>
            </div>
            <div>
              <h3 className="text-[22px] font-semibold leading-7 text-[#151515]">
                {project.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-black/52">
                {project.description}
              </p>
            </div>
          </>
        );

        if (project.link) {
          return (
            <Link key={project.title} href={project.link} className={cardClassName}>
              {cardContent}
            </Link>
          );
        }

        return (
          <article key={project.title} className={cardClassName}>
            {cardContent}
          </article>
        );
      })}
    </div>
  );
}
