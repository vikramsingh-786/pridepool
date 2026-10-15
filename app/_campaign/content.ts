/** Campaign copy and links, kept in one place so they're easy to change. */

/** Where "Sign Up & Join" goes: the Lemonn invite link for this campaign. */
export const JOIN_URL = 'https://stocks.trade-kar.com/invite?data=PridePool';

/** For people who already use Lemonn (they're in the pool automatically). */
export const OPEN_APP_URL = 'https://stocks.trade-kar.com/invite?data=PridePool';

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
  /** The hero's key line, under the headline (next to the laptop badge) */
  pitch: 'The more brokerage you use from the pool, the higher your chances of winning a laptop.',
  /** The two rules stated wherever the pool is pitched (hero, leaderboard, How to enter, final call) */
  noCap: 'No individual usage cap while the shared ₹1 Crore pool lasts',
  noGuarantee: 'Winning a laptop is not guaranteed',
};

export const LAPTOPS = {
  count: 20,
  label: 'Laptops',
};

/** The one Join label, used on every Join button. */
export const JOIN_LABEL = 'Sign Up & Join';

/** Hero and final call: one button for existing customers, one for new ones, with this line above them. */
export const EXISTING_NOTE = 'Existing Lemonn customers are already part of the Pride Pool. Simply open the Lemonn app. New customers can sign up to join.';
export const OPEN_APP_LABEL = 'Open Lemonn App';

/** Page anchors for the three story touchpoints (each hero tile scrolls to one). */
export const ANCHORS = {
  champion: '#moment',
  pool: '#enter',
  laptops: '#enter',
};
