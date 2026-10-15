import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

// What follows the title starts this long into its 1.2s light sweep, so the badge lands while the shine is still crossing
const SWEEP_VISIBLE_MS = 400;
import Odometer from '../components/Odometer';
import { POOL } from '../content';

/** The ₹1 Crore headline: 1. ₹1,00,00,000 rolls up like a slot machine 2. right after it lands, all at once: the zeros turn into "Crore", the line shrinks, the pool title (BROKERAGE POOL) rises in below 3. once it has settled (end of the shrink), a bright light sweeps across the text once, like a reflection The final state stays on screen. With reduced motion it starts at the final state (no sweep). */
type Phase = 'roll' | 'final';

const ROLL_DONE_MS = 950; // last digit has visibly landed (8 × 40 ms stagger + the roll's ease-out; its slow tail is invisible)
const HOLD_MS = 80; // tiny beat so the full number registers
const ease = 'cubic-bezier(0.22, 1, 0.36, 1)';

/** One-time light sweep: a copy of the text, filled only with a bright streak (styles: .shimmer-once). */
function Sweep({ children, delay = '0s', onDone }: { children: React.ReactNode; delay?: string; onDone?: () => void }) {
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  return (
    <span
      aria-hidden="true"
      className="shimmer-once pointer-events-none absolute inset-0 whitespace-nowrap"
      style={{ animationDelay: delay }}
      onAnimationStart={() => onDone && (timer.current = window.setTimeout(onDone, SWEEP_VISIBLE_MS))}
      onAnimationEnd={onDone}
    >
      {children}
    </span>
  );
}

/** onComplete fires once, when the whole title animation — including the light sweep — has finished. Bump `replay` to run the light sweep once more (e.g. after the rank badge lands). */
export default function PoolHeadline({ align = 'center', onComplete, replay = 0 }: { align?: 'center' | 'left'; onComplete?: () => void; replay?: number }) {
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [phase, setPhase] = useState<Phase>(reduced ? 'final' : 'roll');
  const [sweep, setSweep] = useState(false);
  const doneRef = useRef(false);
  const complete = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    onComplete?.();
  }, [onComplete]);

  // Widths of the two tails in em, so the line re-centres smoothly while it shrinks
  const zerosRef = useRef<HTMLSpanElement>(null);
  const croreRef = useRef<HTMLSpanElement>(null);
  const [widths, setWidths] = useState<{ zeros: number; crore: number } | null>(null);

  useLayoutEffect(() => {
    const z = zerosRef.current;
    const c = croreRef.current;
    if (!z || !c) return;
    const fs = parseFloat(getComputedStyle(z).fontSize) || 16;
    setWidths({ zeros: z.scrollWidth / fs, crore: c.scrollWidth / fs });
  }, []);

  useEffect(() => {
    if (reduced) {
      complete();
      return;
    }
    const t = window.setTimeout(() => setPhase('final'), ROLL_DONE_MS + HOLD_MS);
    // Safety net: never hold back what follows the title for more than ~6s
    const fallback = window.setTimeout(complete, 6000);
    return () => {
      window.clearTimeout(t);
      window.clearTimeout(fallback);
    };
  }, [reduced, complete]);

  const final = phase === 'final';

  return (
    <div aria-hidden="true" className={align === 'center' ? 'text-center' : 'text-left'}>
      {/* Line 1: ₹1,00,00,000 → ₹1 Crore, shrinking at the same time */}
      <p
        className={`font-extrabold leading-none tracking-[-0.04em] text-white [filter:drop-shadow(0_0_1.9rem_rgb(var(--glow)/0.55))] ${final ? 'text-[2.25rem] lg:text-[3.25rem]' : 'text-[3.25rem] lg:text-[5.75rem]'}`}
        style={{ transition: `font-size 0.45s ${ease}` }}
        onTransitionEnd={(e) => {
          // The light sweep starts only once the shrink has really finished, so it always lines up with the text
          if (final && e.target === e.currentTarget && e.propertyName === 'font-size') setSweep(true);
        }}
      >
        <span className="relative inline-block">
          <Odometer text="₹1" label={POOL.amount} />
          <span
            className="relative inline-block h-[1em] overflow-hidden align-top"
            style={{ width: widths ? `${final ? widths.crore : widths.zeros}em` : undefined, transition: `width 0.4s ${ease}` }}
          >
            {/* the zeros slide up and out… */}
            <span
              ref={zerosRef}
              className="absolute left-0 top-0 inline-flex whitespace-nowrap"
              style={{ transform: final ? 'translateY(-110%)' : 'none', opacity: final ? 0 : 1, transition: `transform 0.5s ${ease}, opacity 0.35s ease` }}
            >
              <Odometer text=",00,00,000" label="" delayOffset={1} />
            </span>
            {/* …and "Crore" slides up into their place */}
            <span
              ref={croreRef}
              className="absolute left-0 top-0 inline-block whitespace-nowrap pl-[0.22em]"
              style={{ transform: final ? 'none' : 'translateY(110%)', opacity: final ? 1 : 0, transition: `transform 0.5s ${ease} 0.06s, opacity 0.35s ease 0.06s` }}
            >
              Crore
            </span>
            <span className="invisible inline-block">0</span>
          </span>
          {sweep && (
            <Sweep key={replay}>
              <span className="tabular-nums">₹1</span>
              <span className="pl-[0.22em]">Crore</span>
            </Sweep>
          )}
        </span>
      </p>

      {/* Line 2: the pool title rises in, bigger — at the same moment. Clipped top/bottom only (for the rise); never at the sides, so a long title isn't cut off */}
      <div className="grid" style={{ gridTemplateRows: final ? '1fr' : '0fr', transition: `grid-template-rows 0.45s ${ease}` }}>
        <div className="overflow-x-visible overflow-y-clip">
          <p
            // sized for "BROKERAGE POOL" (14 letters) on one line: fits a phone and stays clear of the photo on desktop
            className="whitespace-nowrap pb-[0.08em] pt-[0.12em] text-[2.125rem] font-extrabold uppercase leading-[0.95] tracking-[-0.03em] lg:text-[4.5rem]"
            style={{ transform: final ? 'none' : 'translateY(40%) scale(1.15)', opacity: final ? 1 : 0, transition: `transform 0.5s ${ease}, opacity 0.35s ease`, transformOrigin: align === 'center' ? 'center top' : 'left top' }}
          >
            <span className="relative inline-block">
              <span className="text-grad-silver">{POOL.title}</span>
              {sweep && <Sweep key={replay} delay="0.1s" onDone={complete}>{POOL.title}</Sweep>}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
