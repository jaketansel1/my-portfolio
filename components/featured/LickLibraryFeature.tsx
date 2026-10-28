import Image from "next/image";
import FeaturedProject from "./FeaturedProject";

const theme = {
  background: "#0b0a0a",
  foreground: "#f6f3ef",
  accent: "#ee7267",
};

function LickLibraryVisual() {
  return (
    <div className="relative h-[clamp(320px,92vw,440px)] overflow-hidden sm:h-[clamp(400px,62vw,520px)] lg:h-[clamp(380px,46vh,600px)]">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_8%_100%,rgba(238,114,103,0.16),transparent_70%)]"
      />

      {/* Desktop: anchored top, bleeds off the right edge and below the crop line */}
      <div className="absolute left-[24%] top-0 w-[150%] origin-top-left transition-transform duration-900 ease-out group-hover:scale-[1.012] sm:left-[20%] sm:w-[105%] lg:left-[15%] lg:w-[88%]">
        <div className="overflow-hidden rounded-tl-[10px] shadow-[0_0_0_1px_rgba(255,255,255,0.08)]">
          <Image
            src="/licklibrary/guided-discovery1.jpg"
            alt="Redesigned LickLibrary desktop homepage with the new navigation"
            width={1440}
            height={884}
            sizes="(min-width: 1024px) 82vw, (min-width: 640px) 100vw, 140vw"
            loading="eager"
            className="block h-auto w-full"
          />
        </div>
      </div>

      {/* Mobile: in front, cropped by the same bottom line */}
      <div className="absolute bottom-0 left-0 w-[50%] translate-y-[10%] transition-transform duration-900 ease-out group-hover:translate-y-[8%] sm:w-[34%] lg:w-[clamp(190px,16vw,280px)]">
        <div className="rounded-t-[clamp(22px,7vw,40px)] bg-[#050505] p-[clamp(5px,1.4vw,8px)] pb-0 shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_30px_80px_rgba(0,0,0,0.65)] lg:rounded-t-[clamp(26px,2.4vw,40px)]">
          <div className="overflow-hidden rounded-t-[clamp(17px,5.6vw,32px)] lg:rounded-t-[clamp(20px,1.9vw,32px)]">
            <Image
              src="/licklibrary/mobile-nav.jpg"
              alt="LickLibrary mobile homepage with header, menu and search"
              width={410}
              height={540}
              sizes="(min-width: 1024px) 290px, (min-width: 640px) 34vw, 50vw"
              className="block h-auto w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LickLibraryFeature() {
  return (
    <FeaturedProject
      id="work"
      title="LickLibrary"
      disciplines={["Product Design", "UX/UI", "Frontend"]}
      year="2026"
      headline={
        <>
          Making thousands of guitar lessons{" "}
          <span className="text-fp-accent">easier to discover.</span>
        </>
      }
      description="Redesigning LickLibrary’s navigation across desktop and mobile, from UX and system design through frontend implementation."
      href="/work/licklibrary"
      theme={theme}
      visual={<LickLibraryVisual />}
      footnote="Desktop & mobile"
    />
  );
}
