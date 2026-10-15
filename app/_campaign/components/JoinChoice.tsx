import { JoinPair, type JoinLocation } from './JoinButton';
import { EXISTING_NOTE } from '../content';

/** Existing vs new customers: the note, then "Open Lemonn App" (white key) and "Sign Up & Join" (green key) side by side. Used in the hero, the final call and the floating desktop card (compact). */
export default function JoinChoice({ location, align = 'center', shake = false, compact = false, inPage = true, className = '' }: { location: JoinLocation; align?: 'center' | 'left'; /** one shake of the buttons (hero, after its intro) */ shake?: boolean; /** smaller buttons */ compact?: boolean; /** see JoinButton */ inPage?: boolean; className?: string }) {
  const center = align === 'center';
  return (
    <div className={`${center ? 'mx-auto text-center' : 'text-left'} max-w-[30rem] ${className}`}>
      {/* Highlighted callout: green-tinted panel, check icon, bright text */}
      <p className={`flex items-start rounded-xl border border-accent/40 bg-accent/[0.08] text-left font-semibold leading-snug text-fg shadow-[0_0_1.5rem_-0.5rem_rgb(var(--accent-glow-rgb)/0.45)] ${compact ? 'gap-2 px-3 py-2 text-[0.75rem]' : 'gap-2.5 px-3.5 py-2.5 text-[0.8125rem] lg:px-4 lg:py-3 lg:text-[0.9375rem]'}`}>
        <span aria-hidden="true" className={`mt-px flex shrink-0 items-center justify-center rounded-full bg-accent text-[var(--accent-ink)] ${compact ? 'size-4' : 'size-[1.125rem] lg:size-5'}`}>
          <svg viewBox="0 0 16 16" width="11" height="11" fill="none">
            <path d="m3.5 8.5 3 3 6-7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span className="text-pretty">{EXISTING_NOTE}</span>
      </p>
      <JoinPair location={location} compact={compact} inPage={inPage} className={`${compact ? 'mt-3' : 'mt-4'} ${shake ? 'join-shake' : ''}`} />
    </div>
  );
}
