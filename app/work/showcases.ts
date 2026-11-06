import type { ShowcaseScene } from "../../components/ShowcaseLoop";

/*
 * Cinematic previews for the Work grid (components/ShowcaseLoop). Every scene is a real capture of the live
 * site, taken with Playwright and only resized and compressed; the mobile scenes place three real phone
 * screenshots side by side on the site's own background. Views are [x, y, width] in fractions of each image,
 * aimed from element positions recorded during capture. Durations are loop seconds, played at each card's
 * `speed` (1.45 on the Work page).
 */

/*
 * Crumble & Co: the live site, captured with Playwright at a laptop-sized 1100×688 (2.5× scale) so its type and
 * header read at card size, and never edited; it opens on the homepage screen recording. Home, the shop
 * sections, the collection, a product, Build a Set and its piece picker: about 33 loop seconds, played at
 * `speed`. Views are [x, y, width] in fractions of each capture (components/ShowcaseLoop), aimed from the
 * positions of the page elements recorded during capture.
 */
const CP = "/work/crumble-preview";
export const crumbleScenes: ShowcaseScene[] = [
  {
    // Open on the homepage hero playing, the screen recording from the portfolio homepage's Crumble scene
    // (its first ~6.5s, before the hero video cuts to its second shot), framed a little closer so its header
    // matches the laptop-size captures, with a slow, slight push in. 16:9 in a 16:10 frame: w at most 0.9.
    src: "/crumble-and-co/crumble-video-poster.webp", width: 1920, height: 1080, duration: 7,
    video: { src: "/crumble-and-co/crumble-video.mp4", webmSrc: "/crumble-and-co/crumble-video.webm" },
    frames: [
      { at: 0, view: [0.1, 0, 0.8] },
      { at: 1.5, view: [0.1, 0, 0.8] },
      { at: 7.5, view: [0.11, 0.02, 0.76] },
    ],
  },
  {
    // A slow scroll down the homepage, pausing on each section: products, categories, the look, Build Your Set.
    src: `${CP}/home-strip.webp`, width: 1200, height: 3892, duration: 7.6,
    frames: [
      { at: 0, view: [0, 0, 1] },
      { at: 1.3, view: [0, 0, 1] },
      { at: 3.0, view: [0, 0.213, 1] },
      { at: 3.9, view: [0, 0.213, 1] },
      { at: 5.5, view: [0, 0.539, 1] },
      { at: 6.2, view: [0, 0.539, 1] },
      { at: 7.9, view: [0, 0.8, 1] },
    ],
  },
  {
    // From the collection's title and filters out to the whole view.
    src: `${CP}/collection.webp`, width: 1800, height: 1126, duration: 4,
    frames: [
      { at: 0, view: [0, 0.17, 0.6] },
      { at: 0.8, view: [0, 0.17, 0.6] },
      { at: 3.2, view: [0, 0, 1] },
    ],
  },
  {
    // The product page, then in to the title, price, size and how-to-buy choice.
    src: `${CP}/product.webp`, width: 1800, height: 1126, duration: 4.4,
    frames: [
      { at: 0, view: [0, 0, 1] },
      { at: 0.7, view: [0, 0, 1] },
      { at: 3.6, view: [0.5, 0.42, 0.5] },
    ],
  },
  {
    // Build a Set chosen: it opens on the same right-hand framing as the product scene ends on, so the dissolve
    // reads as the page changing state, then moves in to the savings tiers and the set so far.
    src: `${CP}/build-set.webp`, width: 1800, height: 1126, duration: 5,
    frames: [
      { at: 0, view: [0.5, 0.4, 0.5] },
      { at: 1.0, view: [0.5, 0.4, 0.5] },
      { at: 3.4, view: [0.56, 0.4, 0.42] },
    ],
  },
  {
    // The piece picker opens over the page, then the camera moves in and down to "Done — view my set".
    // Then back to the start.
    src: `${CP}/picker.webp`, width: 1800, height: 1126, duration: 5.4,
    frames: [
      { at: 0, view: [0, 0, 1] },
      { at: 0.6, view: [0, 0, 1] },
      { at: 2.1, view: [0.14, 0.02, 0.72] },
      { at: 4.4, view: [0.14, 0.27, 0.72] },
    ],
  },
];

/*
 * LickLibrary: licklibrary.com at 1440×900 (2× scale), logged out. The learn page, both mega menus open on
 * hover, a scroll through the learn page's course rows, a course page, then the mobile menu at its three
 * levels (Menu → Guitar Courses → Learning Paths, iPhone 13 at 3×). About 33 loop seconds.
 */
const LL = "/work/licklibrary-preview";
export const lickLibraryScenes: ShowcaseScene[] = [
  {
    // The learn page's hero, then a slow, slight push in that keeps the whole headline in view.
    src: `${LL}/learn.webp`, width: 1800, height: 1125, duration: 5,
    frames: [
      { at: 0, view: [0, 0, 1] },
      { at: 1.2, view: [0, 0, 1] },
      { at: 4.6, view: [0, 0.08, 0.88] },
    ],
  },
  {
    // The Guitar Lessons mega menu opens, then in to popular artists and What's Hot.
    src: `${LL}/mega-lessons.webp`, width: 1800, height: 1125, duration: 5,
    frames: [
      { at: 0, view: [0, 0, 1] },
      { at: 0.9, view: [0, 0, 1] },
      { at: 3.6, view: [0.38, 0.16, 0.6] },
    ],
  },
  {
    // The Guitar Courses mega menu: in to the course artwork, then a slow pan along the row.
    src: `${LL}/mega-courses.webp`, width: 1800, height: 1125, duration: 5,
    frames: [
      { at: 0, view: [0, 0, 1] },
      { at: 0.8, view: [0, 0, 1] },
      { at: 2.3, view: [0.18, 0.18, 0.5] },
      { at: 5, view: [0.48, 0.18, 0.5] },
    ],
  },
  {
    // A scroll down the learn page's rows: latest courses, latest lessons, Classic Albums, Learn to Play.
    src: `${LL}/learn-strip.webp`, width: 1200, height: 2833, duration: 7.6,
    frames: [
      { at: 0, view: [0, 0, 1] },
      { at: 1.2, view: [0, 0, 1] },
      { at: 2.9, view: [0, 0.27, 1] },
      { at: 3.8, view: [0, 0.27, 1] },
      { at: 5.4, view: [0, 0.5, 1] },
      { at: 6.1, view: [0, 0.5, 1] },
      { at: 7.8, view: [0, 0.735, 1] },
    ],
  },
  {
    // A course page: in to the title, the album artwork and the ways to watch.
    src: `${LL}/course.webp`, width: 1800, height: 1125, duration: 4.8,
    frames: [
      { at: 0, view: [0, 0, 1] },
      { at: 0.8, view: [0, 0, 1] },
      { at: 3.8, view: [0.02, 0.2, 0.66] },
    ],
  },
  {
    // Mobile: the menu's three levels side by side, then in on two at a time, from Menu to Learning Paths.
    src: `${LL}/mobile.webp`, width: 1800, height: 1125, duration: 6,
    frames: [
      { at: 0, view: [0, 0, 1] },
      { at: 1, view: [0, 0, 1] },
      { at: 2.6, view: [0, 0.06, 0.62] },
      { at: 5.2, view: [0.38, 0.06, 0.62] },
    ],
  },
];

/*
 * Reawakening the Feminine: reawakeningthefeminineprograms.com at 1440×900 (2× scale), after every scroll
 * reveal had played. The hero, a scroll through the promise, the programme and "Is this journey for you?",
 * the transformation cards, what's included, the nine-week journey, pricing, then three mobile screens
 * (iPhone 13 at 3×). About 36 loop seconds.
 */
const RF = "/work/reawakening-preview";
export const reawakeningScenes: ShowcaseScene[] = [
  {
    // The hero at golden hour, then a slow push towards the title and its two calls to action.
    src: `${RF}/hero.webp`, width: 1800, height: 1125, duration: 5,
    frames: [
      { at: 0, view: [0, 0, 1] },
      { at: 1.2, view: [0, 0, 1] },
      { at: 4.6, view: [0.02, 0.14, 0.6] },
    ],
  },
  {
    // Down the page: the quiet promise, the programme, "Is this journey for you?".
    src: `${RF}/strip.webp`, width: 1200, height: 2396, duration: 6.4,
    frames: [
      { at: 0, view: [0, 0, 1] },
      { at: 1.3, view: [0, 0, 1] },
      { at: 3, view: [0, 0.42, 1] },
      { at: 3.9, view: [0, 0.42, 1] },
      { at: 5.6, view: [0, 0.687, 1] },
    ],
  },
  {
    // The transformation: in to "Your Worth", then across from Before to After.
    src: `${RF}/transformation.webp`, width: 1800, height: 1125, duration: 5.4,
    frames: [
      { at: 0, view: [0, 0, 1] },
      { at: 0.8, view: [0, 0, 1] },
      { at: 2.6, view: [0.08, 0.4, 0.6] },
      { at: 4.8, view: [0.38, 0.4, 0.6] },
    ],
  },
  {
    // What's included, in to the list of everything the programme holds.
    src: `${RF}/included.webp`, width: 1800, height: 1125, duration: 4.4,
    frames: [
      { at: 0, view: [0, 0, 1] },
      { at: 0.8, view: [0, 0, 1] },
      { at: 3.4, view: [0.5, 0.36, 0.5] },
    ],
  },
  {
    // The nine-week journey: in to the week cards, then a pan along them.
    src: `${RF}/journey.webp`, width: 1800, height: 1125, duration: 5,
    frames: [
      { at: 0, view: [0, 0, 1] },
      { at: 0.8, view: [0, 0, 1] },
      { at: 2.4, view: [0.04, 0.32, 0.62] },
      { at: 4.8, view: [0.34, 0.32, 0.62] },
    ],
  },
  {
    // Pricing: a gentle push in to the three ways to join.
    src: `${RF}/pricing.webp`, width: 1800, height: 1125, duration: 4.2,
    frames: [
      { at: 0, view: [0, 0, 1] },
      { at: 0.8, view: [0, 0, 1] },
      { at: 3.4, view: [0.1, 0.12, 0.8] },
    ],
  },
  {
    // Mobile: the hero, the journey and pricing on a phone, then in on two at a time and across.
    src: `${RF}/mobile.webp`, width: 1800, height: 1125, duration: 6,
    frames: [
      { at: 0, view: [0, 0, 1] },
      { at: 1, view: [0, 0, 1] },
      { at: 2.6, view: [0, 0.06, 0.62] },
      { at: 5.2, view: [0.38, 0.06, 0.62] },
    ],
  },
];
