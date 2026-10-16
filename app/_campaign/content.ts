/** Campaign copy and links, kept in one place so they're easy to change. */

/** Where "Sign Up & Join" goes: the Lemonn invite link for this campaign. */
export const JOIN_URL = 'https://stocks.trade-kar.com/invite?data=PridePool';

/** For people who already use Lemonn (they're in the pool automatically). */
export const OPEN_APP_URL = 'https://lemonn.go.link?adj_t=25j8tbn3';

/**
 * The link for this visitor's device. On its own the Adjust link has no Mac destination, so a Mac gets adj_redirect to
 * Lemonn's App Store page (same setup as CoinSwitch). Only Macs: with adj_redirect set, Android's not-installed fallback
 * would also go to the App Store. An iPad in desktop mode also says "Macintosh", but has a touch screen, so it keeps the
 * plain link. Server-side (no browser) it's the plain link.
 */
export function openAppUrl(): string {
  if (typeof navigator === 'undefined') return OPEN_APP_URL;
  const mac = /Macintosh|Mac OS X/i.test(navigator.userAgent) && !/iPhone|iPad|iPod|Android|Mobile/i.test(navigator.userAgent) && navigator.maxTouchPoints <= 1;
  return mac ? `${OPEN_APP_URL}&adj_redirect=${encodeURIComponent('https://apps.apple.com/in/app/lemonn-share-market-app/id6474676842')}` : OPEN_APP_URL;
}

export const ANISH = {
  name: 'Anish Singh Thakur',
  /** TODO (legal): confirm the approved wording for his result, e.g. "World #2" or "Runner-up". */
  rank: '#2',
  rankLabel: 'World rank',
  event: 'World Trading Championship',
  team: 'Booming Bulls',
  /** His words on the championship stage (from the YouTube short below). */
  quoteBefore: 'I came here to become the champion.',
  /** \n = forced line break on the page */
  quoteAfter: 'One more minute and\nI would be the champion.',
  videoId: 'WDVdQ0wyrvI',
};

export const POOL = {
  amount: '₹1 Crore',
  short: '₹1 Cr',
  /** Headline name of the pool in the hero. The campaign itself is still "The Pride Pool". */
  title: 'Brokerage Pool',
  label: 'Brokerage pool',
  /** The hero's key line, under the headline. \n = where phones break the line (desktop keeps it on one) */
  pitch: 'More trades. More brokerage saved.\nHigher chances of winning a laptop.',
};

export const LAPTOPS = {
  count: 20,
  label: 'Laptops',
};

/** The one Join label, used on every Join button. */
export const JOIN_LABEL = 'Sign Up & Join';

/** Hero and final call: one button for existing customers, one for new ones, with this line above them. */
export const EXISTING_NOTE = 'Existing Lemonn customers are already part of the Pride Pool.';
export const OPEN_APP_LABEL = 'Open Lemonn App';
/** Small caption above each button of a pair (standard two-line CTA) */
export const OPEN_APP_CAPTION = 'Existing user';
export const JOIN_CAPTION = 'New user';

/** Page anchors for the three story touchpoints (each hero tile scrolls to one). */
export const ANCHORS = {
  champion: '#moment',
  pool: '#enter',
  laptops: '#enter',
};
