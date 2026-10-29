import type { Metadata } from "next";
import SiteHeader from "../../../components/SiteHeader";
import {
  Annotated,
  Band,
  BeforeAfter,
  CaseHero,
  CaseStudy,
  Chapter,
  ChapterIndex,
  CopyNeeded,
  Evolution,
  Media,
  MediaRow,
  NextProject,
  Statement,
  Stats,
  TextBlock,
} from "../../../components/case-study/CaseStudy";
import home from "../../home.module.css";

export const metadata: Metadata = {
  title: "Crumble & Co — Jake Tansel",
  description:
    "Case study: taking Crumble & Co from a logo, a name and a product idea to a complete Shopify store, including a custom Build Your Set experience.",
};

// Stand-in photography until real Crumble & Co assets are supplied (see public/placeholders/CREDITS.md).
const PHOTO = {
  hero: "/crumble-and-co/showcase-hero.webp",
  blanket: "/placeholders/crumble-pug-blanket.jpg",
  puppy: "/placeholders/crumble-puppy.jpg",
  bulldog: "/placeholders/crumble-bulldog.jpg",
};

const brand = { soft: "#e9dccb", deep: "#3a2618", ink: "#3a2618" };

const chapters = [
  { id: "direction", number: "01", title: "From idea to direction" },
  { id: "storefront", number: "02", title: "Creating the storefront" },
  { id: "build-your-set", number: "03", title: "The product challenge" },
  { id: "launch", number: "04", title: "Shipping the brand" },
];

export default function CrumbleCaseStudy() {
  return (
    <div className={home.home}>
      <div className={home.container}>
        <SiteHeader editorial current="work" />
      </div>

      <main id="main-content">
        <CaseStudy brand={brand}>
          <CaseHero
            eyebrow="Case study · eCommerce"
            title="Crumble & Co"
            summary="Taking a new brand for dog lovers from a logo, a name and a product idea to a complete Shopify store, with a custom Build Your Set experience at its heart."
            meta={[
              { label: "Role", value: "Product design, UX/UI and Shopify implementation" },
              { label: "Scope", value: "Research, prototyping, storefront, Build Your Set, launch" },
              { label: "Platform", value: "Shopify" },
              { label: "Outcome", value: "150 email sign-ups within 48 hours of pre-launch" },
            ]}
            visual={
              <Media
                label="Hero composition"
                note="Storefront on desktop and mobile over Crumble & Co brand photography."
                src={PHOTO.hero}
                aspect="16 / 8"
                position="30% center"
                sizes="100vw"
              />
            }
          />

          <ChapterIndex chapters={chapters} />

          {/* 01 — From idea to direction */}
          <Chapter
            id="direction"
            number="01"
            title="From idea to direction"
            intro="Crumble & Co started with a logo, a brand name and a product idea. The first job was turning that into a direction the client could see, react to and commit to."
            topics={["Starting point", "Competitor research", "Base44 / Lovable exploration", "Client buy-in"]}
          >
            <TextBlock label="Starting point" title="A logo, a name and an idea" tight>
              <CopyNeeded>What the client brought, what they wanted the brand to feel like, and what success looked like.</CopyNeeded>
            </TextBlock>
            <MediaRow layout="wide-left">
              <Media label="Original logo and brand assets" note="Exactly as the client supplied them." aspect="4 / 3" />
              <Media label="The product idea" src={PHOTO.puppy} aspect="2 / 3" />
            </MediaRow>

            <TextBlock label="Competitor research" title="Learning from the category" tight>
              <CopyNeeded>Which competitors you reviewed, what you looked at, and the patterns or gaps that shaped the direction.</CopyNeeded>
            </TextBlock>
            <MediaRow layout="thirds">
              <Media label="Competitor storefront" frame="browser" aspect="4 / 3" />
              <Media label="Competitor storefront" frame="browser" aspect="4 / 3" />
              <Media label="Competitor storefront" frame="browser" aspect="4 / 3" />
            </MediaRow>

            <Band tone="brand">
              <Statement aside="Early directions were explored in Base44 and Lovable before detailed design.">
                Getting to something real, fast.
              </Statement>
              <MediaRow layout="half">
                <Media label="Base44 exploration" frame="browser" aspect="16 / 11" />
                <Media label="Lovable exploration" frame="browser" aspect="16 / 11" />
              </MediaRow>
              <TextBlock label="Early direction" title="Client buy-in">
                <CopyNeeded>How the prototypes were presented, what the client responded to, and the direction you agreed.</CopyNeeded>
              </TextBlock>
            </Band>
          </Chapter>

          {/* 02 — Creating the storefront */}
          <Chapter
            id="storefront"
            number="02"
            title="Creating the storefront"
            intro="Designing and building the complete Shopify experience, from homepage to cart, across desktop and mobile."
            topics={["Homepage", "Collections", "Product experience", "Navigation", "Size guides", "Cart", "Responsive"]}
          >
            <MediaRow layout="full">
              <Media label="Homepage — desktop" note="Full-length homepage, the largest storefront visual." frame="browser" aspect="16 / 9" />
            </MediaRow>

            <MediaRow layout="wide-left">
              <Media label="Collection page — desktop" frame="browser" aspect="4 / 3" />
              <Media label="Product page — mobile" frame="phone" aspect="2 / 3" />
            </MediaRow>

            <TextBlock label="Product experience" title="Helping people choose with confidence">
              <CopyNeeded>Key decisions on the product page: imagery, variants, information hierarchy and calls to action.</CopyNeeded>
            </TextBlock>

            <MediaRow layout="thirds">
              <Media label="Navigation" frame="phone" aspect="3 / 4" caption="Navigation" />
              <Media label="Size guide" frame="phone" aspect="3 / 4" caption="Size guides" />
              <Media label="Cart" frame="phone" aspect="3 / 4" caption="Cart" />
            </MediaRow>

            <Band tone="brand">
              <TextBlock label="Responsive" title="Designed for the phone first" tight>
                <CopyNeeded>How the storefront adapts on mobile and why it mattered for this audience.</CopyNeeded>
              </TextBlock>
              <MediaRow layout="quarters">
                <Media label="Homepage" frame="phone" aspect="9 / 16" />
                <Media label="Collection" frame="phone" aspect="9 / 16" />
                <Media label="Product" frame="phone" aspect="9 / 16" />
                <Media label="Cart" frame="phone" aspect="9 / 16" />
              </MediaRow>
            </Band>
          </Chapter>

          {/* 03 — The product challenge: Build Your Set (centrepiece) */}
          <Chapter
            id="build-your-set"
            number="03"
            title="The product challenge"
            intro="The most important product story in the project: how fixed bundles evolved into a custom Build Your Set experience."
            topics={["Fixed bundles", "Build Your Set", "UX iterations", "Discount progression", "Desktop modal", "Mobile bottom sheet", "Client feedback"]}
            tone="deep"
          >
            <TextBlock label="The problem" title="Why fixed bundles weren’t enough">
              <CopyNeeded>What fixed bundles were, what wasn’t working for customers or the client, and how you knew.</CopyNeeded>
            </TextBlock>

            <Evolution
              steps={[
                {
                  stage: "01 Fixed bundles",
                  title: "Where it started",
                  text: <CopyNeeded>The original bundle offer.</CopyNeeded>,
                  media: <Media label="Fixed bundles" aspect="3 / 4" />,
                },
                {
                  stage: "02 Early Build Your Set",
                  title: "First custom flow",
                  text: <CopyNeeded>The first version and what you learned.</CopyNeeded>,
                  media: <Media label="Early Build Your Set" aspect="3 / 4" />,
                },
                {
                  stage: "03 UX iteration",
                  title: "Refining the flow",
                  text: <CopyNeeded>What changed between iterations and why.</CopyNeeded>,
                  media: <Media label="Iteration" aspect="3 / 4" />,
                },
                {
                  stage: "04 Final",
                  title: "Build Your Set",
                  text: <CopyNeeded>The shipped experience in one line.</CopyNeeded>,
                  media: <Media label="Final Build Your Set" aspect="3 / 4" />,
                },
              ]}
            />

            <Statement>Turning a fixed offer into something customers build themselves.</Statement>

            <Annotated
              media={<Media label="Final Build Your Set — desktop" note="Annotated flow of the shipped experience." frame="browser" aspect="16 / 11" />}
              notes={[
                { title: "Choose items", text: <CopyNeeded>How customers select products for their set.</CopyNeeded> },
                { title: "Discount progression", text: <CopyNeeded>How the discount builds as the set grows.</CopyNeeded> },
                { title: "Review and add to cart", text: <CopyNeeded>How the set is confirmed and added.</CopyNeeded> },
              ]}
            />

            <MediaRow layout="full">
              <Media label="Discount progression" note="Close-up of the progress and discount states." aspect="21 / 9" />
            </MediaRow>

            <MediaRow layout="wide-left">
              <Media label="Desktop modal" frame="browser" aspect="4 / 3" caption="Desktop: Build Your Set opens in a modal" />
              <Media label="Mobile bottom sheet" frame="phone" aspect="2 / 3" caption="Mobile: the same flow as a bottom sheet" />
            </MediaRow>

            <TextBlock label="Client feedback" title="Iterating with the client" tight>
              <CopyNeeded>The client’s actual feedback (quoted only if you have it in writing) and what you changed in response.</CopyNeeded>
            </TextBlock>
            <BeforeAfter
              before={<Media label="Before feedback" aspect="4 / 3" />}
              after={<Media label="After feedback" aspect="4 / 3" />}
            />
          </Chapter>

          {/* 04 — Shipping the brand */}
          <Chapter
            id="launch"
            number="04"
            title="Shipping the brand"
            intro="Building anticipation before the store opened, then launching it."
            topics={["Coming Soon", "Email capture", "Launch emails", "Launch", "Results", "Reflection"]}
          >
            <MediaRow layout="wide-left">
              <Media label="Coming Soon page — desktop" frame="browser" aspect="4 / 3" />
              <Media label="Email capture — mobile" frame="phone" aspect="2 / 3" />
            </MediaRow>

            <TextBlock label="Launch emails" title="Four emails to launch" tight>
              <CopyNeeded>The role of each email in the sequence and when it was sent.</CopyNeeded>
            </TextBlock>
            <MediaRow layout="quarters">
              <Media label="Email 1" aspect="3 / 5" caption="Email 01" />
              <Media label="Email 2" aspect="3 / 5" caption="Email 02" />
              <Media label="Email 3" aspect="3 / 5" caption="Email 03" />
              <Media label="Email 4" aspect="3 / 5" caption="Email 04" />
            </MediaRow>

            <MediaRow layout="full">
              <Media label="Launch" note="Launch-night moment: live store or brand photography." src={PHOTO.blanket} aspect="21 / 9" sizes="100vw" />
            </MediaRow>

            <Band tone="deep">
              <Stats
                items={[
                  { value: "150", label: "Email sign-ups within 48 hours of pre-launch" },
                  { value: "2", label: "Sales on launch night" },
                ]}
                note="Supporting evidence to be added."
              />
            </Band>

            <TextBlock label="Reflection" title="What I learned">
              <CopyNeeded>What worked, what you’d do differently, and what’s next for Crumble & Co.</CopyNeeded>
            </TextBlock>
          </Chapter>

          <NextProject title="Fanzine" href="/work/fanzine" />
        </CaseStudy>
      </main>
    </div>
  );
}
