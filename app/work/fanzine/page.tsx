import type { Metadata } from "next";
import { Browser, CasePage, Figure, Img, NextProject, Phone, type Tone } from "../../../components/case/Case";
import {
  Bridge,
  ChapterHero,
  ChapterLayout,
  ChapterSection,
  Insight,
  Numbers,
  Panel,
  PhonePlaceholder,
  PhoneRow,
  Points,
  type Chapter,
} from "../../../components/case/Chapters";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Fanzine — Jake Tansel",
  description: "Designing one flexible product system that powered 50+ football club apps across iOS, Android and web.",
};

// Deep navy / energetic / mobile ecosystem. Club colour comes from the interfaces themselves.
const navy: Tone = { bg: "#070a10", fg: "#eef2f8", muted: "rgb(238 242 248 / 0.62)" };
const blush: Tone = { bg: "#f1e2d8", fg: "#3b2620", muted: "rgb(59 38 32 / 0.66)" };

const screen = (club: string, alt: string) => ({ src: `/fanzine/screen-${club}.webp`, alt, width: 517, height: 1105 });

const chapters: Chapter[] = [
  { id: "overview", number: "01", title: "Overview" },
  { id: "system", number: "02", title: "System" },
  { id: "matchday", number: "03", title: "Matchday" },
  { id: "engagement", number: "04", title: "Engagement" },
  { id: "scale", number: "05", title: "Scale" },
];
const [overview, system, matchday, engagement, scale] = chapters;

const clubs = [
  { key: "chelsea", name: "Chelsea", colour: "#28388e" },
  { key: "arsenal", name: "Arsenal", colour: "#c62831" },
  { key: "man-city", name: "Man City", colour: "#85adce" },
];

const engagementScreens = [
  { label: "Choose a formation", note: "Pick Your Team, step one." },
  { label: "Select players", note: "Drag or tap players into position." },
  { label: "Share", note: "The finished XI as a shareable card." },
  { label: "Predictor", note: "Score predictions before kick-off." },
];

export default function FanzineCaseStudy() {
  return (
    <CasePage tone={navy} maxWidth="1240px">
      <ChapterLayout chapters={chapters} title="Fanzine" accent="#6f97ff" panel="#0d1422" fill="rgb(238 242 248 / 0.05)">
        {/* ───────── 01 Overview ───────── */}
        <ChapterHero
          chapter={overview}
          brand="Fanzine"
          label="Mobile product system · Club apps"
          title="One product system for 50+ football club apps."
          about="Fanzine builds apps for football fans: news, matches, stats, video and podcasts for one club, in one place. Each club gets its own app, in its own colours, on iOS, Android and web."
          role="I spent eight years on the platform, first as lead UX/UI designer and then as product designer, designing each feature once so it worked for every club."
          facts={[
            { label: "Role", value: "Lead UX/UI designer, then product designer" },
            { label: "Years", value: "2017–2025" },
            { label: "Platforms", value: "iOS, Android and web" },
            { label: "Scope", value: "UX · UI · Design system · Theming · Features" },
          ]}
        >
          <Figure caption="A family of club apps: Chelsea, Arsenal, Man City, Celtic, West Ham and more.">
            <Img src="/fanzine-homepage.jpg" alt="A family of Fanzine club apps" width={2880} height={1650} className={styles.wall} priority />
          </Figure>
        </ChapterHero>

        {/* ───────── 02 System ───────── */}
        <ChapterSection
          chapter={system}
          lead={<Bridge lead="Dozens of clubs. Dozens of identities." question="One product underneath." />}
          title="The same app, wearing different shirts."
          intro={<p>Every app shares one structure. The club layer on top changes colour, crest and content, and nothing else.</p>}
        >
          <Panel className={styles.clubsPanel}>
            <div className={styles.clubs}>
              {clubs.map((club, i) => (
                <div key={club.key} className={styles.club} data-index={i}>
                  <Phone shot={screen(club.key, `${club.name} app home screen`)} />
                  <p className={styles.token}>
                    <span style={{ background: club.colour }} />
                    {club.name}
                    <code>{club.colour}</code>
                  </p>
                </div>
              ))}
            </div>
          </Panel>
          <Points
            items={[
              { title: "Shared structure", text: "Navigation, templates and journeys: Home, Explore, Match, Watch and Shop in the same place in every app." },
              { title: "Shared components", text: "News carousels, reels, fixtures and stats built once and reused across every club." },
              { title: "Club theme", text: "Primary colour, crest and imagery applied as a theme, so a new club doesn’t mean a new design." },
            ]}
          />
        </ChapterSection>

        {/* ───────── 03 Matchday ───────── */}
        <ChapterSection
          chapter={matchday}
          title="Built around the ninety minutes."
          intro={
            <p>
              Match days are the heart of a football app. The match centre brings fixtures, live scores, the starting XI, stats
              and head-to-head records together, one tap from the Match tab.
            </p>
          }
        >
          <PhoneRow columns={3}>
            <Phone shot={screen("arsenal", "Arsenal app home screen with news and reels")} />
            <PhonePlaceholder label="Match centre" note="Live score, timeline and stats." />
            <PhonePlaceholder label="Head-to-head" note="Previous meetings and form." />
          </PhoneRow>
        </ChapterSection>

        {/* ───────── 04 Engagement ───────── */}
        <ChapterSection
          chapter={engagement}
          title="Giving fans something to do before kick-off."
          intro={
            <p>
              <strong>Pick Your Team</strong> lets fans build their own starting XI before a match: pick a formation, choose
              players and share the result. The <strong>Predictor</strong> asks them to call the score.
            </p>
          }
        >
          <PhoneRow columns={4}>
            {engagementScreens.map((item) => (
              <PhonePlaceholder key={item.label} label={item.label} note={item.note} />
            ))}
          </PhoneRow>
          <Insight>Pick Your Team was one of the platform&rsquo;s most successful features.</Insight>
        </ChapterSection>

        {/* ───────── 05 Scale ───────── */}
        <ChapterSection
          chapter={scale}
          title="One system, many apps."
          intro={<p>Because each app was a theme on a shared system, new clubs could launch faster, and a feature designed once worked for every club.</p>}
        >
          <Numbers
            items={[
              { value: "50+", label: "Club apps on one platform" },
              { value: "750k+", label: "Downloads" },
              { value: "8", label: "Years on the platform" },
              { value: "3", label: "Platforms: iOS, Android and web" },
            ]}
          />
        </ChapterSection>
      </ChapterLayout>

      <NextProject
        number="04"
        title="Reawakening the Feminine"
        href="/work/reawakening-the-feminine"
        line="A calm, editorial website for a nine-week online programme."
        tone={blush}
        media={
          <Browser
            url="reawakeningthefeminineprograms.com"
            scheme="light"
            shot={{ src: "/case/reawakening/d-hero.webp", alt: "Reawakening the Feminine homepage", width: 2400, height: 1500 }}
          />
        }
      />
    </CasePage>
  );
}
