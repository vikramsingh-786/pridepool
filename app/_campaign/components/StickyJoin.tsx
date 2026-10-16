import { useEffect, useState } from 'react';
import { JoinPair } from './JoinButton';
import JoinChoice from './JoinChoice';
import useInPageJoinVisible from './useInPageJoin';
import { LAPTOPS, POOL } from '../content';

function Corner({ className }: { className: string }) {
  return <span aria-hidden="true" className={`absolute h-4 w-4 border-accent/55 ${className}`} />;
}

/** The floating Join button: a full-width bar on phones, a card on desktop. Rule: it appears from the second fold (once the hero has scrolled away), steps aside for the whole "How to enter" section (which has its own Join), and stays until the "Enter the Pride Pool" section (#join) comes into view — it then hands over to that section's own Join button and stays away for the rest of the page. */
export default function StickyJoin() {
  const [inRange, setInRange] = useState(false);
  // …and it steps aside while a section's own Join button is on screen (one primary Join in view)
  const inPageJoin = useInPageJoinVisible();
  const visible = inRange && !inPageJoin;
  // desktop card: the visitor can close it (stays closed until the page is reloaded)
  const [closed, setClosed] = useState(false);
  const cardShown = visible && !closed;

  useEffect(() => {
    const hero = document.getElementById('hero');
    const finalCall = document.getElementById('join');
    if (!hero || !finalCall) return;

    const update = () => {
      // same rule as the navbar Join: the hero is mostly gone (its last strip may sit under the navbar after the snap)
      const pastHero = hero.getBoundingClientRect().bottom <= window.innerHeight * 0.35;
      const reachedFinal = finalCall.getBoundingClientRect().top < window.innerHeight;
      // "How to enter" has its own Join: stay away for the whole section (back at the leaderboard)
      const enter = document.getElementById('enter')?.getBoundingClientRect();
      const mid = window.innerHeight / 2;
      const inEnter = !!enter && enter.top < mid && enter.bottom > mid;
      setInRange(pastHero && !reachedFinal && !inEnter);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <aside aria-label="Join the pool" aria-hidden={!visible} inert={!visible}>
      {/* Phones: full-width bottom bar */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 transition-transform duration-300 ease-arena-out motion-reduce:transition-none md:hidden ${visible ? 'translate-y-0' : 'translate-y-[calc(100%+1.5rem)]'}`}
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-full h-6 bg-gradient-to-t from-bg to-transparent" />
        <div className="border-t border-white/10 bg-bg/95 px-4 pt-3" style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))' }}>
          <JoinPair location="sticky" inPage={false} />
        </div>
      </div>

      {/* Desktop: floating card */}
      <div
        aria-hidden={!cardShown}
        inert={!cardShown}
        className={`fixed bottom-6 right-6 z-50 hidden w-[23rem] transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none md:block ${cardShown ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'}`}
      >
        <Corner className="-left-1.5 -top-1.5 border-l-2 border-t-2" />
        <Corner className="-right-1.5 -top-1.5 border-r-2 border-t-2" />
        <Corner className="-bottom-1.5 -left-1.5 border-b-2 border-l-2" />
        <Corner className="-bottom-1.5 -right-1.5 border-b-2 border-r-2" />
        <div className="arena-beam rounded-2xl p-px shadow-[0_40px_90px_-40px_rgba(0,0,0,1)]">
          <div className="relative overflow-hidden rounded-[calc(1rem-1px)] bg-bg/95">
            <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <div className="relative flex items-center gap-2 border-b border-white/10 py-1.5 pl-3.5 pr-1.5 text-[0.5rem] font-bold uppercase tracking-[0.18em] text-fg-subtle">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
              Registration open
              <button
                type="button"
                onClick={() => setClosed(true)}
                aria-label="Close"
                className="ml-auto flex size-6 items-center justify-center rounded-full bg-white text-black shadow-[0_2px_6px_rgba(0,0,0,0.5)] transition-colors hover:bg-white/85"
              >
                <svg aria-hidden="true" viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M4 4l8 8M12 4l-8 8" />
                </svg>
              </button>
            </div>
            <div className="relative p-3.5">
              <p className="text-sm font-bold tracking-tight text-fg">Enter the arena</p>
              <p className="mt-0.5 text-[0.6875rem] text-fg-muted">
                {POOL.amount} pool · {LAPTOPS.count} laptops
              </p>
              <JoinChoice location="sticky" compact inPage={false} className="mt-4" />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
