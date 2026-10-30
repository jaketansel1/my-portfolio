import type { Metadata } from "next";
import { Browser, CasePage, Figure, Img, NextProject, Phone, type Tone } from "../../../components/case/Case";
import {
  Block,
  ChapterHero,
  ChapterLayout,
  ChapterSection,
  Insight,
  Pair,
  Panel,
  PanelLabel,
  PhoneRow,
  Points,
  type Chapter,
} from "../../../components/case/Chapters";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Reawakening the Feminine — Jake Tansel",
  description: "A calm, editorial website for She Who Mothers Herself, a nine-week online programme, designed and built from the first section to launch.",
};

// Soft / editorial / warm: one blush tone, chocolate type, clay accent borrowed from the site.
const blush: Tone = { bg: "#f1e2d8", fg: "#3b2620", muted: "rgb(59 38 32 / 0.68)", rule: "rgb(59 38 32 / 0.14)" };
const paper: Tone = { bg: "#f3f2ee", fg: "#121211", muted: "#6b6962" };

const R = "/case/reawakening";
const desk = (file: string, alt: string) => ({ src: `${R}/${file}.webp`, alt, width: 2400, height: 1500 });
const mobile = (file: string, alt: string) => ({ src: `${R}/${file}.webp`, alt, width: 900, height: 1948 });
const SITE = "reawakeningthefeminineprograms.com";

const chapters: Chapter[] = [
  { id: "overview", number: "01", title: "Overview" },
  { id: "brief", number: "02", title: "Brief" },
  { id: "direction", number: "03", title: "Direction" },
  { id: "structure", number: "04", title: "Structure" },
  { id: "details", number: "05", title: "Details" },
  { id: "mobile", number: "06", title: "Mobile" },
  { id: "build", number: "07", title: "Build" },
];
const [overview, brief, direction, structure, details, mobileChapter, build] = chapters;

const palette = [
  { name: "Cream", value: "#f7f2e8" },
  { name: "Parchment", value: "#ece1cd" },
  { name: "Clay", value: "#b06a4f" },
  { name: "Sage", value: "#7c8a6f" },
  { name: "Chocolate", value: "#2b1e17" },
];

// The page's running order, from the site's own structure.
const runningOrder = [
  "Hero",
  "A quiet promise",
  "The programme",
  "Is this journey for you?",
  "What changes",
  "What’s included",
  "Meet Lauren",
  "Why this works",
  "Lifeforce activation",
  "The journey, week by week",
  "What lies beneath",
  "Testimonials",
  "The cost of where you are",
  "Pricing",
  "FAQ",
  "Begin the journey",
];

export default function ReawakeningCaseStudy() {
  return (
    <CasePage tone={blush} maxWidth="1240px">
      <ChapterLayout chapters={chapters} title="Reawakening the Feminine" accent="#a85f45" panel="#faf4ee" fill="rgb(59 38 32 / 0.06)">
        {/* ───────── 01 Overview ───────── */}
        <ChapterHero
          chapter={overview}
          brand="She Who Mothers Herself"
          label="Programme website · Design & build"
          title="A calm page for an emotional offer."
          about="Lauren is a feminine awakening guide, psychotherapist and yoga teacher. She Who Mothers Herself is her nine-week online journey: weekly live sessions, embodiment practices and a small group."
          role="I designed and built the website, from the first section to launch, in Vue 3, TypeScript and Tailwind."
          facts={[
            { label: "Role", value: "Design and front-end build" },
            { label: "Built with", value: "Vue 3 · TypeScript · Tailwind" },
            { label: "Status", value: `Live on ${SITE}`, live: true },
          ]}
        >
          <div className={styles.heroStage}>
            <Browser url={SITE} scheme="light" shot={desk("d-hero", "She Who Mothers Herself homepage hero")} priority />
            <Phone shot={mobile("m-hero", "The hero on mobile")} className={styles.heroPhone} />
          </div>
        </ChapterHero>

        {/* ───────── 02 Brief ───────── */}
        <ChapterSection
          chapter={brief}
          title="Calm enough to sit with. Clear enough to book from."
          intro={
            <p>
              It&rsquo;s an emotional, unfamiliar offer. The schedule, what&rsquo;s included and the price all needed a place on
              the page, without leading.
            </p>
          }
        >
          <Insight label="The promise, as written on the site">
            &ldquo;Mothering yourself is how you become the powerful, radiant woman that lives a little deeper within you.&rdquo;
          </Insight>
          <Pair>
            <Figure caption="What’s included: every part of the offer, set out plainly.">
              <Browser url={SITE} scheme="light" shot={desk("d-included", "What’s included section")} />
            </Figure>
            <Figure caption="The cost of where you are: the reason to begin, before the price.">
              <Browser url={SITE} scheme="light" shot={desk("d-cost-of-where-you-are", "The cost of where you are section")} />
            </Figure>
          </Pair>
        </ChapterSection>

        {/* ───────── 03 Direction ───────── */}
        <ChapterSection
          chapter={direction}
          title="Golden hour, cream and chocolate."
          intro={
            <p>
              The photography sets the mood: warm, low sun, soft focus, never clinical. Everything else steps back around it, so
              the page reads like an editorial, not a sales funnel.
            </p>
          }
        >
          <Img src={`${R}/photo-hero-2.webp`} alt="Golden-hour photography from the site: a woman and her daughter at sunset" width={2000} height={1125} aspect="21 / 9" className={styles.photo} />
          <Block className={styles.photoTrio}>
            <Img src={`${R}/photo-card2.webp`} alt="Journal and coffee still life" width={1409} height={2111} aspect="3 / 4" className={styles.photo} />
            <Img src={`${R}/photo-journey1.webp`} alt="A woman sitting above the sea at sunset" width={2000} height={1126} aspect="3 / 4" position="70% center" className={styles.photo} />
            <Img src={`${R}/photo-the-approach.webp`} alt="A woman resting at home with a cup of tea" width={2000} height={2659} aspect="3 / 4" className={styles.photo} />
          </Block>
          <Block>
            <Panel className={styles.identity}>
              <div>
                <PanelLabel>Palette</PanelLabel>
                <ul className={styles.palette}>
                  {palette.map((swatch) => (
                    <li key={swatch.name}>
                      <span style={{ background: swatch.value }} />
                      {swatch.name}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <PanelLabel>Type</PanelLabel>
                <p className={styles.typeSample}>
                  Fraunces <span>Work Sans</span>
                </p>
                <p className={styles.typeNote}>Fraunces for headlines, with italic accents. Work Sans for text.</p>
              </div>
            </Panel>
          </Block>
        </ChapterSection>

        {/* ───────── 04 Structure ───────── */}
        <ChapterSection
          chapter={structure}
          title="Sixteen sections, one long breath."
          intro={
            <p>
              Ordered the way a conversation would go: who it&rsquo;s for, what changes, who Lauren is, how the nine weeks unfold,
              and only then what it costs. Light and dark sections alternate, and the call to begin returns at natural pauses.
            </p>
          }
        >
          <div className={styles.structure}>
            <Panel>
              <PanelLabel>Running order</PanelLabel>
              <ol className={styles.order}>
                {runningOrder.map((item, i) => (
                  <li key={item}>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    {item}
                  </li>
                ))}
              </ol>
            </Panel>
            <div className={styles.structureShots}>
              <Browser url={SITE} scheme="light" shot={desk("d-for-you", "Is this journey for you? section")} />
              <Browser url={SITE} scheme="light" shot={desk("d-program", "The programme section")} />
              <Browser url={SITE} scheme="light" shot={desk("d-meet-lauren", "Meet Lauren section")} />
            </div>
          </div>
        </ChapterSection>

        {/* ───────── 05 Details ───────── */}
        <ChapterSection chapter={details} title="Nine weeks, laid out like a journey.">
          <Figure caption="The journey roadmap: one card per week, with dates, in a swipeable carousel.">
            <Browser url={SITE} scheme="light" shot={desk("d-journey-roadmap", "Journey roadmap carousel")} />
          </Figure>
          <Pair>
            <Figure caption="What changes: before and after, told as a series of cards.">
              <Browser url={SITE} scheme="light" shot={desk("d-transformation", "Transformation section")} />
            </Figure>
            <Figure caption="Three ways to join, all including every week and all materials.">
              <Browser url={SITE} scheme="light" shot={desk("d-pricing", "Pricing section")} />
            </Figure>
          </Pair>
        </ChapterSection>

        {/* ───────── 06 Mobile ───────── */}
        <ChapterSection
          chapter={mobileChapter}
          title="Every section got its own mobile pass."
          intro={<p>Down to separate hero images: the hero, navigation, programme, for-you and transformation sections were reworked for small screens.</p>}
        >
          <PhoneRow columns={5}>
            <Phone shot={mobile("m-for-you", "Is this journey for you? on mobile")} />
            <Phone shot={mobile("m-journey-roadmap", "Journey roadmap on mobile")} />
            <Phone shot={mobile("m-meet-lauren", "Meet Lauren on mobile")} />
            <Phone shot={mobile("m-transformation", "What changes on mobile")} />
            <Phone shot={mobile("m-pricing", "Pricing on mobile")} />
          </PhoneRow>
        </ChapterSection>

        {/* ───────── 07 Build ───────── */}
        <ChapterSection
          chapter={build}
          title="Designed and built by one person."
          intro={
            <p>
              Vue 3 and TypeScript with Tailwind, one component per section, deployed on Vercel. Copy and images live in typed
              data files shaped like an API response, so content can change without touching the design, and could later come
              from a CMS.
            </p>
          }
        >
          <Points
            columns={4}
            items={[
              { title: "16 sections", text: "Each a Vue component, fed by its own data file." },
              { title: "Swipeable carousels", text: "Journey roadmap and transformation cards, with touch swipe on mobile." },
              { title: "Mobile pass", text: "Small-screen layouts and separate mobile hero images." },
              { title: "Live", text: SITE },
            ]}
          />
        </ChapterSection>
      </ChapterLayout>

      <NextProject title="View all work" href="/work" label="That’s the four" line="SportSkins, Maison Augustin, Inspect Design and more." tone={paper} />
    </CasePage>
  );
}
