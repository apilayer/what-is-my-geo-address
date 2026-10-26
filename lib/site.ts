/**
 * Canonical facts about this page, deliberately decoupled from routing.
 * NEXT_PUBLIC_BASE_PATH says where Next serves the app from; these say what a
 * crawler should be told about it.
 */
const DEFAULT_ORIGIN = "https://apilayer.com";
const DEFAULT_PATH = "/devtools/what-is-my-geo-address";

export const SITE = {
  name: "What Is My Geo Address",
  origin: (process.env.NEXT_PUBLIC_SITE_ORIGIN || DEFAULT_ORIGIN).replace(/\/$/, ""),
  publicPath: (process.env.NEXT_PUBLIC_SITE_PATH ?? DEFAULT_PATH).replace(/\/$/, ""),
  tagline: "What is the latitude and longitude of my address?",
  description:
    "Convert any street address into latitude and longitude, or turn coordinates back into a readable address. Free forward and reverse geocoding, no sign-up, powered by the Positionstack API.",
  locale: "en_US",
} as const;

export const SITE_URL = `${SITE.origin}${SITE.publicPath}`;
