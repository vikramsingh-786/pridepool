import { JOIN_LABEL, JOIN_URL, OPEN_APP_LABEL, OPEN_APP_URL } from '../content';

/** THE Join button. Every Join on the page is this component, so label, link and look stay identical. Tracking: each one carries data-cta="join" (or "open-app" for the existing-customer button) and data-cta-location (hero, round-1…3, steps, final, sticky, navbar), so analytics can count taps per position without extra code (e.g. a click trigger on [data-cta="join"]). */
export type JoinLocation = 'hero' | 'round-1' | 'round-2' | 'round-3' | 'final' | 'sticky' | 'navbar' | 'steps';

const SIZES = {
  /** Hero and final call: full width on phones, auto width on desktop */
  lg: 'flex h-14 w-full text-base lg:inline-flex lg:h-16 lg:w-auto lg:px-10 lg:text-lg',
  /** After each round */
  md: 'flex h-14 w-full text-[0.9375rem] md:inline-flex md:h-[3.25rem] md:w-auto md:shrink-0 md:px-7',
  /** Floating bar (phones) and floating card (desktop) */
  bar: 'flex h-14 w-full text-base',
  /** Top navbar (tablet and desktop) */
  nav: 'inline-flex h-11 px-5 text-[0.875rem]',
  /** Two buttons side by side (JoinChoice): each fills half the row */
  pair: 'flex h-14 w-full px-3 text-[0.875rem] lg:h-16 lg:text-base',
  /** Same pair, compact (floating desktop card) */
  pairSm: 'flex h-10 w-full px-2.5 text-[0.8125rem]',
};

type Props = {
  location: JoinLocation;
  size?: keyof typeof SIZES;
  /** In-page buttons (true) hide the floating Join button while they're on screen, so there's only ever one Join button in view. The floating one itself passes false. */
  inPage?: boolean;
  /** primary = the green 3D key; outline = quiet secondary look (navbar on the first fold) */
  variant?: 'primary' | 'outline';
  /** join = sign-up link (default); open = existing customers' app link, as the white 3D key */
  action?: 'join' | 'open';
  className?: string;
};

const VARIANTS = {
  primary: 'arena-cta btn-key',
  outline: 'rounded-full border border-accent/70 text-accent transition-colors duration-200 hover:bg-accent/10',
};

export default function JoinButton({ location, size = 'lg', inPage = true, variant = 'primary', action = 'join', className = '' }: Props) {
  const open = action === 'open';
  return (
    <a
      href={open ? OPEN_APP_URL : JOIN_URL}
      data-cta={open ? 'open-app' : 'join'}
      data-cta-location={location}
      data-cta-inpage={inPage ? '' : undefined}
      className={`${open ? 'btn-key-light' : VARIANTS[variant]} items-center justify-center gap-2 whitespace-nowrap font-extrabold tracking-[-0.01em] ${SIZES[size]} ${className}`}
    >
      {open ? OPEN_APP_LABEL : JOIN_LABEL}
      <span aria-hidden="true">→</span>
    </a>
  );
}

/** The pair shown wherever there's a Join: "Open Lemonn App" (existing customers, white key) next to "Sign Up & Join" (new customers, green key), each half the row. */
export function JoinPair({ location, inPage = true, compact = false, className = '' }: { location: JoinLocation; inPage?: boolean; /** smaller buttons for tight spots (floating desktop card) */ compact?: boolean; className?: string }) {
  const size = compact ? 'pairSm' : 'pair';
  return (
    <div className={`grid grid-cols-2 gap-2.5 lg:gap-3 ${className}`}>
      <JoinButton location={location} size={size} action="open" inPage={inPage} />
      <JoinButton location={location} size={size} inPage={inPage} />
    </div>
  );
}
