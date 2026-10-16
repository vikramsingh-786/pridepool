import { JoinPair, type JoinLocation } from './JoinButton';
import { EXISTING_NOTE } from '../content';

/** Existing vs new customers: "Open Lemonn App" (white key) and "Sign Up & Join" (green key) side by side, then the note below them. Used in the hero, the final call and the floating desktop card (compact). */
export default function JoinChoice({ location, align = 'center', shake = false, compact = false, inPage = true, className = '' }: { location: JoinLocation; align?: 'center' | 'left'; /** one shake of the buttons (hero, after its intro) */ shake?: boolean; /** smaller buttons */ compact?: boolean; /** see JoinButton */ inPage?: boolean; className?: string }) {
  const center = align === 'center';
  return (
    <div className={`${center ? 'mx-auto text-center' : 'text-left'} max-w-[30rem] ${className}`}>
      <JoinPair location={location} compact={compact} inPage={inPage} className={shake ? 'join-shake' : ''} />
      {/* Highlighted callout under the buttons: green-tinted panel, check icon, bright text; one line (10px fits a phone, 13px on desktop) */}
      <p className={`flex rounded-xl border border-accent/40 bg-accent/[0.08] text-left font-semibold leading-snug text-fg shadow-[0_0_1.5rem_-0.5rem_rgb(var(--accent-glow-rgb)/0.45)] ${compact ? 'mt-4 items-center gap-1.5 whitespace-nowrap px-2.5 py-1.5 text-[0.625rem]' : 'mt-5 items-center gap-2 whitespace-nowrap px-3 py-2 text-[0.625rem] lg:mt-6 lg:gap-2.5 lg:px-4 lg:py-2.5 lg:text-[0.8125rem]'}`}>
        <span aria-hidden="true" className={`mt-px flex shrink-0 items-center justify-center rounded-full bg-accent text-[var(--accent-ink)] ${compact ? 'size-3.5' : 'size-4 lg:size-[1.125rem]'}`}>
          <svg viewBox="0 0 16 16" width="11" height="11" fill="none">
            <path d="m3.5 8.5 3 3 6-7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span className="text-pretty">{EXISTING_NOTE}</span>
      </p>
    </div>
  );
}
