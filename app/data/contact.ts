/*
 * Contact details, in one place. Used by the global contact panel (components/contact/ContactPanel)
 * and the site footer (components/SiteFooter).
 *
 * A link whose href is null isn't shown as a link: it reads "Coming soon" until the href is set.
 */

export type ContactLink = { label: string; href: string | null };

export const contact = {
  email: "hello@jaketansel.com",
  linkedin: {
    label: "Jake Tansel",
    // TODO: replace with the full LinkedIn profile URL.
    href: "https://www.linkedin.com",
  } as ContactLink,
  cv: {
    label: "Jake-Tansel-CV.pdf",
    // TODO: add the PDF to public/ (e.g. public/Jake-Tansel-CV.pdf) and set href to "/Jake-Tansel-CV.pdf".
    href: null,
  } as ContactLink,
  /** Short location, e.g. for the footer. */
  location: "Essex, UK",
  /** Fuller line for the contact panel. */
  based: "Essex, UK · London / Remote",
};
