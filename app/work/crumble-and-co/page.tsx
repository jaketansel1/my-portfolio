import type { Metadata } from "next";
import { Browser, CasePage, Figure, Img, NextProject, Phone, Placeholder, type Tone } from "../../../components/case/Case";
import {
  Block,
  ChapterHero,
  ChapterLayout,
  ChapterSection,
  Numbers,
  Pair,
  Panel,
  PanelLabel,
  Points,
  Subhead,
  type Chapter,
} from "../../../components/case/Chapters";
import ScrollShot from "../../../components/case/ScrollShot";
import { Browser as BrowserFrame } from "../../../components/ui/Device";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Crumble & Co — Jake Tansel",
  description:
    "Taking a new dog-accessories brand from a name and a logo to a launched Shopify store, including a custom Build Your Set experience.",
};

/*
 * The page's colour, in one place: dark and editorial, an espresso ground, cream headings, beige body, copper details.
 * Everything in the case study (header, rail, chapters, panels, captions) reads these through CSS variables; browser
 * frames keep their own light chrome, so the screenshots stand out.
 */
const espresso: Tone = { bg: "#352219", fg: "#f3e8dc", muted: "#cbb8a6", rule: "rgb(243 232 220 / 0.14)" };
const accent = "#d4946a";
const panel = "#3f2a20";
const fill = "rgb(243 232 220 / 0.06)";

const navy: Tone = { bg: "#070a10", fg: "#eef2f8", muted: "rgb(238 242 248 / 0.62)" };

const C = "/case/crumble";
const PROTOTYPE_URL = "https://crumble-canine-collective.base44.app/";
const desk = (file: string, alt: string) => ({ src: `${C}/${file}.webp`, alt, width: 2400, height: 1500 });
const mobile = (file: string, alt: string) => ({ src: `${C}/${file}.webp`, alt, width: 900, height: 1948 });
const photo = (file: string, alt: string) => ({ src: `${C}/photo-${file}.webp`, alt, width: 1600, height: 1600 });

const chapters: Chapter[] = [
  { id: "overview", number: "00", title: "Overview" },
  { id: "brief", number: "01", title: "Brief" },
  { id: "direction", number: "02", title: "Direction" },
  { id: "storefront", number: "03", title: "Storefront" },
  { id: "sizing", number: "04", title: "Sizing" },
  { id: "build-your-set", number: "05", title: "Build Your Set" },
  { id: "build", number: "06", title: "Build" },
  { id: "outcome", number: "07", title: "Outcome" },
];
const [overview, brief, direction, storefront, sizing, buildYourSet, build, outcome] = chapters;

const setSteps = [
  { date: "30 Sep", title: "Fixed sets", text: "A bundle builder with set combinations and a cart drawer." },
  { date: "2 Oct", title: "Fewer, clearer sets", text: "Collar + Lead and Harness + Lead cards removed from the bundles page." },
  { date: "5 Oct", title: "Build your own", text: "A set panel on every product page: start from the piece you’re looking at." },
  { date: "7 Oct", title: "Redesigned", text: "A purchase choice up front, a piece picker and savings tiers." },
  { date: "8 Oct", title: "Simpler tiers", text: "The 5% two-item tier dropped, so the saving is worth acting on." },
  { date: "11 Oct", title: "Polish", text: "Picker upgrades, auto-scroll and lifestyle images." },
];

const theme = [
  { title: "Custom theme", text: "Built from Shopify’s Skeleton theme: homepage, collections, product, bundles, our story and search." },
  { title: "Product page", text: "Variant picker, colour swatches, size guide drawer and the set panel." },
  { title: "Cart drawer", text: "Add to bag without leaving the page." },
  { title: "Pre-launch", text: "A coming soon page with email signup, on the store’s password page." },
  { title: "Launch emails", text: "A four-email sequence to the signup list." },
  { title: "Shipping & policies", text: "Shipping, returns and contact pages set up for launch." },
];

export default function CrumbleCaseStudy() {
  return (
    <CasePage tone={espresso} maxWidth="1240px" className={styles.page}>
      <ChapterLayout chapters={chapters} accent={accent} panel={panel} fill={fill}>
        {/* ───────── 00 Overview ───────── */}
        <ChapterHero
          chapter={overview}
          brand="Crumble & Co"
          label="Overview"
          title="From brand to storefront."
          about="Crumble & Co is a premium dog accessories brand. Starting with a name, logo and product range, the challenge was to create its entire online shopping experience."
          role="I designed and built the Shopify storefront, from the visual direction and responsive layouts to custom shopping features, including Build Your Set."
          facts={[
            { label: "Role", value: "Design & Development" },
            { label: "Platform", value: "Shopify · Liquid · JavaScript" },
            { label: "Timeline", value: "September – October 2026" },
            { label: "Status", value: "Live — crumbleandco.club", live: true },
          ]}
        >
          <Figure caption="crumbleandco.club, live.">
            <Browser
              url="crumbleandco.club"
              scheme="light"
              video={{ src: "/crumble-and-co/crumble-video.mp4", webmSrc: "/crumble-and-co/crumble-video.webm", poster: "/crumble-and-co/crumble-video-poster.webp", width: 1920, height: 1080 }}
            />
          </Figure>
        </ChapterHero>

        {/* ───────── 01 Brief ───────── */}
        <ChapterSection
          chapter={brief}
          title="Starting from scratch."
          intro={<p>With the brand identity and product range established, the next step was creating the online shopping experience.</p>}
        >
          {/* The two colourways, one product shot each: a quiet starting point, not a gallery. */}
          <Pair className={styles.colourways}>
            <Figure caption="Biscuit">
              <Img {...photo("biscuit-harness-6", "The Biscuit harness in cream")} aspect="3 / 2" className={styles.colourway} />
            </Figure>
            <Figure caption="Espresso">
              <Img {...photo("espresso-harness-set", "The Espresso harness, lead and pouch in brown")} aspect="3 / 2" className={styles.colourway} />
            </Figure>
          </Pair>
        </ChapterSection>

        {/* ───────── 02 Direction ───────── */}
        <ChapterSection
          chapter={direction}
          title="From prototype to production."
          intro={
            <p>
              Before development, I used AI-assisted prototyping to quickly explore the storefront&rsquo;s visual direction and
              shopping experience. The concept helped communicate the direction to the client before I translated it into a
              custom Shopify theme.
            </p>
          }
        >
          {/* The Base44 prototype's whole homepage, scrolled by the visitor under its own pinned header (captured at
              1440 wide; the builder badge hidden). The finished store follows in the next chapter, so none here. */}
          <figure className={styles.prototype}>
            <BrowserFrame url="crumble-canine-collective.base44.app" scheme="light">
              <ScrollShot
                src={`${C}/prototype-base44-long.webp`}
                width={2400}
                height={13480}
                aspect="16 / 10"
                stickyTop={{ src: `${C}/prototype-base44-nav.webp`, width: 2400, height: 173 }}
                alt="The Base44 prototype homepage, top to bottom: a hero of a golden retriever in a leather harness, best-selling pieces, shop by category, a bundles panel, the brand story, value points, the Crumble Club photo grid, a newsletter signup and the footer."
                frameClassName={styles.prototypeFrame}
              />
            </BrowserFrame>
            <figcaption className={styles.prototypeMeta}>
              <span className={styles.prototypeLabel}>Early prototype</span>
              <a href={PROTOTYPE_URL} target="_blank" rel="noopener noreferrer" className={styles.prototypeLink}>
                View the original
                <span aria-hidden="true">↗</span>
              </a>
            </figcaption>
          </figure>
        </ChapterSection>

        {/* ───────── 03 Storefront ───────── */}
        <ChapterSection chapter={storefront} title="A shop that feels like the product.">
          <Figure caption="Homepage: lifestyle hero, an editorial shop-by-category grid, sets and the brand story.">
            <Browser url="crumbleandco.club" scheme="light" shot={{ src: `${C}/home-desktop-long.webp`, alt: "The full Crumble & Co homepage", width: 1440, height: 4200 }} aspect="16 / 10" />
          </Figure>
          <Block className={styles.storeRow}>
            <Figure caption="Collections filter by product type.">
              <Browser url="crumbleandco.club/collections" scheme="light" shot={desk("collection-desktop", "Harnesses collection page")} />
            </Figure>
            <div className={styles.storePhones}>
              <Phone shot={mobile("collection-mobile", "All products on mobile")} />
              <Phone shot={mobile("product-mobile", "Biscuit harness product page on mobile")} />
            </div>
          </Block>
          <Pair>
            <Img {...photo("espresso-harness-crumble", "Crumble the cocker spaniel modelling the Espresso set")} aspect="1 / 1" className={styles.photo} />
            <Img {...photo("espresso-harness-lifestyle", "The Espresso harness on Crumble, close up")} aspect="1 / 1" className={styles.photo} />
          </Pair>
        </ChapterSection>

        {/* ───────── 04 Sizing ───────── */}
        <ChapterSection
          chapter={sizing}
          title="Getting the size right before it ships."
          intro={
            <p>
              Harnesses and collars come in four sizes, XS to L, and a wrong size means a return. So sizing sits right next to
              the size buttons, in a drawer that never leaves the page.
            </p>
          }
        >
          <div className={styles.sizeStage}>
            <Browser url="crumbleandco.club/products/espresso-harness" scheme="light" shot={desk("product-sizeguide-desktop", "Size guide drawer open on a product page")} />
            <Phone shot={mobile("sizeguide-mobile", "Size guide on mobile")} className={styles.sizePhone} />
          </div>
          <Points
            items={[
              { title: "Next to the choice", text: "Sizing lives beside the size buttons, not in a footer link." },
              { title: "Measurements per size", text: "Neck and chest for each size, and how to measure your dog." },
              { title: "One drawer", text: "The size chart tab on the product page opens the same drawer." },
            ]}
          />
        </ChapterSection>

        {/* ───────── 05 Build Your Set ───────── */}
        <ChapterSection
          chapter={buildYourSet}
          title="Matching pieces, picked in the right sizes."
          intro={<p>The range is designed to be worn together. The question was how to sell sets without forcing everyone into the same combinations.</p>}
        >
          <Figure caption="On every product page: buy the piece on its own, or build a set and save up to 20%.">
            <Browser url="crumbleandco.club/products/espresso-harness" scheme="light" shot={desk("product-buildset-desktop", "Product page with the Build a set and save option")} />
          </Figure>
          <Block className={styles.pickerRow}>
            <Figure caption="The piece picker: filter by type, choose a size, add to the set.">
              <Browser url="crumbleandco.club" scheme="light" shot={desk("product-buildset-open-desktop", "The Build Your Set piece picker")} aspect="16 / 10" position="center" />
            </Figure>
            <Figure caption="On mobile, a bottom sheet.">
              <Phone shot={mobile("buildset-mobile", "Build Your Set on mobile as a bottom sheet")} />
            </Figure>
          </Block>

          <Subhead title="Fixed bundles became a set you build yourself.">
            <p>
              Every piece has its own size, and a harness in M with a collar in S isn&rsquo;t a combination you can predefine.
              The version that shipped starts from the product you&rsquo;re looking at, and the saving steps up as the set
              grows.
            </p>
          </Subhead>
          <Panel>
            <PanelLabel>Six iterations in under two weeks</PanelLabel>
            <ol className={styles.timeline}>
              {setSteps.map((step, i) => (
                <li key={step.date} data-final={i === setSteps.length - 1 || undefined}>
                  <span className={styles.timelineDate}>{step.date}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          </Panel>
        </ChapterSection>

        {/* ───────── 06 Build ───────── */}
        <ChapterSection
          chapter={build}
          title="A custom Shopify theme, start to finish."
          intro={
            <p>
              Written section by section in Liquid, so the client edits content in Shopify&rsquo;s editor without touching code.
              Building it myself meant a decision like Build Your Set could change in a day, not a sprint.
            </p>
          }
        >
          <Placeholder label="Coming soon page and launch emails" note="Pre-launch page with signup, plus the four launch emails side by side." aspect="21 / 8" />
          <Points items={theme} />
        </ChapterSection>

        {/* ───────── 07 Outcome ───────── */}
        <ChapterSection chapter={outcome} title="From an open brief to a live store.">
          <Numbers
            items={[
              { value: "150", label: "Email sign-ups within 48 hours of the pre-launch page going up" },
              { value: "10", label: "Products across two colourways" },
              { value: "6", label: "Iterations of Build Your Set before launch" },
            ]}
          />
          <Block>
            <Img {...photo("espresso-harness-lifestyle-sofa", "A cocker spaniel in an Espresso harness on a sofa with its owner")} aspect="21 / 9" className={styles.photo} />
          </Block>
        </ChapterSection>
      </ChapterLayout>

      <NextProject
        number="03"
        title="Fanzine"
        href="/work/fanzine"
        line="Designing one product system for 50+ football club apps."
        tone={navy}
        media={<Img src="/fanzine-homepage.jpg" alt="Fanzine club apps" width={2880} height={1650} aspect="21 / 9" className={styles.nextFanzine} />}
      />
    </CasePage>
  );
}
