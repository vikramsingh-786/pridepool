import { useEffect, useRef, useState } from 'react';
import { JoinPair } from '../components/JoinButton';
import CandleBackdrop from '../components/CandleBackdrop';
import { onLanded } from '../components/landed';
import { ANISH, JOIN_LABEL, LAPTOPS, POOL } from '../content';

/** How to enter. The story: Anish finished World #2 → to celebrate, a ₹1 Crore brokerage pool → join it, trade, use brokerage from the shared pool and get a chance at one of 20 laptops. Told as a stepper: 01 Join → 02 Trade → 03 Win. - Once the section lands, the steps play on their own (the rail fills, then moves to the next step). - It keeps playing: tapping a step jumps to it and carries on from there. - Mouse over the active step (its tab or the panel) pauses the fill; it resumes from the same spot on leave. - It also pauses while the section is off screen. id="enter": the hero's ₹1 Cr and 20 Laptops cards and the navbar link land here. TODO (product): the step copy below is a PLACEHOLDER until the product team shares the real steps. TODO (business): final heading. TODO (legal): allocation and winner rules. */
const HEADING = 'How to enter & grab the prize';
const STEP_MS = 5000; // how long each step stays before the stepper moves on

type Step = { n: string; tag: string; title: string; body: string; points: string[] };

const STEPS: Step[] = [
  {
    n: '01',
    tag: 'Join',
    title: `Join the ${POOL.amount} pool`,
    body: `Tap “${JOIN_LABEL}” and create your Lemonn account. It takes a couple of minutes, and your entry is saved straight away.`,
    points: ['Tap the Join button on this page', 'Sign up or log in on the Lemonn app', 'Existing Lemonn users are already in'],
  },
  {
    n: '02',
    tag: 'Trade',
    title: 'Trade while the pool is live',
    body: 'Trade the way you already do. Every trade you place during the campaign counts towards your entry.',
    points: ['Trade on Lemonn during the campaign', 'Brokerage on your trades comes from the shared pool', 'See where you stand on the leaderboard'],
  },
  {
    n: '03',
    tag: 'Win',
    title: 'Win a laptop',
    body: `More trades mean more brokerage saved and higher chances of winning one of ${LAPTOPS.count} laptops.`,
    points: [`${LAPTOPS.count} laptops up for grabs`, 'More trades, more brokerage saved, higher chances', 'Winners are announced at the end of the contest'],
  },
];

/* ───────── One small visual per step ───────── */

function JoinVisual() {
  // the result of joining: a compact entry pass (fits the short phone strip and the tall desktop column)
  return (
    <div className="flex h-full items-center justify-center">
      {/* 3D key like the step-3 pool card: navy side visible against the panel */}
      <div className="key-cap relative w-full max-w-[16rem] rounded-2xl p-4 [--key-side:#2a3366] lg:max-w-[18rem] lg:p-5">
        <div className="flex items-center justify-between gap-3">
          <img src="/lemonn-white.svg" alt="" width="193" height="52" className="h-3.5 w-auto opacity-80 lg:h-4" />
          <span className="font-mono text-[0.5625rem] font-bold tracking-[0.16em] text-fg-subtle lg:text-[0.625rem]">ENTRY</span>
        </div>
        <div className="mt-3 flex items-center gap-3 lg:mt-4">
          <span
            className="story-pop flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-lg font-extrabold text-[var(--accent-ink)] shadow-[0_0_1.5rem_rgb(var(--accent-glow-rgb)/0.5)] lg:size-12 lg:text-xl"
            style={{ animationDelay: '0.25s' }}
          >
            ✓
          </span>
          <div className="min-w-0">
            <p className="text-[0.9375rem] font-extrabold leading-tight text-fg lg:text-base">You’re in the pool</p>
            <p className="mt-1 whitespace-nowrap font-mono text-[0.5625rem] font-bold tracking-[0.12em] text-accent lg:text-[0.625rem]">{POOL.amount.toUpperCase()} {POOL.title.toUpperCase()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TradeVisual() {
  return <CandleBackdrop className="h-full w-full text-fg" />;
}

function WinVisual() {
  return (
    <div className="flex h-full items-center justify-center gap-3 lg:gap-5">
      <div className="key-cap relative flex w-[44%] flex-col items-center justify-center rounded-2xl px-2 py-4 text-center [--key-side:#2a3366]">
        <span className="text-[1.25rem] font-extrabold uppercase leading-none tracking-[-0.01em] text-fg lg:text-[1.75rem]">{POOL.short}</span>
        <span className="mt-1.5 text-[0.5625rem] font-bold uppercase tracking-[0.14em] text-fg-subtle lg:text-[0.75rem]">{POOL.label}</span>
      </div>
      <div className="relative w-[44%]">
        <img src="/laptop-800.webp" alt="" width="800" height="817" loading="lazy" decoding="async" className="h-auto w-full drop-shadow-[0_1rem_1.5rem_rgba(0,0,0,0.6)]" />
        <span className="absolute -right-1 -top-1 rounded-full bg-gold px-2 py-0.5 text-[0.75rem] font-extrabold text-bg lg:text-sm">×{LAPTOPS.count}</span>
      </div>
    </div>
  );
}

const VISUALS = [JoinVisual, TradeVisual, WinVisual];

export default function HowToEnter() {
  const ref = useRef<HTMLElement>(null);
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [active, setActive] = useState(0);
  const [landed, setLanded] = useState(false);
  const auto = !reduced;
  // a new run of the fill bar each time a step becomes active (also when the loop comes back to the same step)
  const [run, setRun] = useState(0);
  // mouse resting on the stepper rail (the tabs with their progress bars) → pause; the card below doesn't pause it
  const [hoverRail, setHoverRail] = useState(false);
  // …and while the section is off screen (no stepping or re-rendering for nobody)
  const [onScreen, setOnScreen] = useState(true);
  const paused = hoverRail || !onScreen;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return onLanded(el, () => setLanded(true));
  }, []);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Auto-play: the active step's fill bar is the clock. When it's full, move on (loops after the last step). Pausing the bar (play-state) pauses the stepper, and it resumes from the same spot.
  const go = (i: number) => {
    setActive(i);
    setRun((r) => r + 1);
  };
  const next = () => go((active + 1) % STEPS.length);
  const pick = (i: number) => go(i);
  const mouseOnly = (e: React.PointerEvent, fn: () => void) => e.pointerType === 'mouse' && fn();

  const step = STEPS[active];
  const Visual = VISUALS[active];

  return (
    <section ref={ref} id="enter" aria-labelledby="enter-heading" className="fold arena-container relative py-12 lg:py-16">
      <div data-reveal="true" className="relative text-center">
        <p className="inline-flex items-center gap-2 rounded-full neu-inset px-3.5 py-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-accent">
          <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-accent" />
          How to enter
        </p>
        <h2
          id="enter-heading"
          className="mx-auto mt-4 max-w-[20ch] text-balance text-[clamp(1.875rem,6vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-fg [text-shadow:0_0_50px_rgb(var(--glow)/0.45)]"
        >
          {HEADING}
        </h2>
        <p className="mx-auto mt-3 max-w-[44ch] text-pretty text-[0.9375rem] font-medium leading-relaxed text-fg-muted lg:text-lg">
          To celebrate {ANISH.name.split(' ')[0]}’s World {ANISH.rank} finish: join the pool, trade, and win your share of {POOL.amount} or one of {LAPTOPS.count} laptops.
        </p>
      </div>

      <div data-reveal="near" className="relative mx-auto mt-8 w-full max-w-4xl lg:mt-10" style={{ '--reveal-delay': '0.1s' }}>
        {/* Stepper rail: three steps, the active one fills while it plays */}
        <div
          role="tablist"
          aria-label="Steps to enter"
          onPointerEnter={(e) => mouseOnly(e, () => setHoverRail(true))}
          onPointerLeave={(e) => mouseOnly(e, () => setHoverRail(false))}
          className="grid grid-cols-3 gap-2 lg:gap-4"
        >
          {STEPS.map((s, i) => {
            const done = i < active;
            const isActive = i === active;
            return (
              <button
                key={s.n}
                type="button"
                role="tab"
                id={`enter-tab-${i}`}
                aria-selected={isActive}
                aria-controls="enter-panel"
                onClick={() => pick(i)}
                className="group flex min-h-12 flex-col gap-2.5 text-left"
              >
                {/* progress bar */}
                <span aria-hidden="true" className="relative block h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <span
                    key={isActive ? `run-${run}-${auto && landed}` : 'idle'}
                    onAnimationEnd={isActive ? next : undefined}
                    className={`absolute inset-y-0 left-0 rounded-full bg-accent ${isActive && auto && landed ? 'step-fill' : ''}`}
                    style={{
                      width: done || (isActive && !(auto && landed)) ? '100%' : isActive ? undefined : '0%',
                      animationDuration: `${STEP_MS}ms`,
                      animationPlayState: paused ? 'paused' : 'running',
                    }}
                  />
                </span>
                <span className="flex items-center gap-2 lg:gap-3">
                  <span
                    className={`flex size-7 shrink-0 items-center justify-center rounded-lg font-mono text-[0.75rem] font-extrabold transition-colors duration-300 lg:size-9 lg:text-[0.875rem] ${isActive ? 'key-cap-sm text-accent' : done ? 'bg-accent/15 text-accent' : 'bg-white/[0.06] text-fg-subtle group-hover:text-fg-muted'}`}
                  >
                    {done ? '✓' : s.n}
                  </span>
                  <span className={`font-mono text-[0.6875rem] font-bold uppercase tracking-[0.14em] transition-colors duration-300 lg:text-[0.8125rem] ${isActive ? 'text-fg' : 'text-fg-subtle group-hover:text-fg-muted'}`}>
                    {s.tag}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* The active step, in detail */}
        <div
          id="enter-panel"
          role="tabpanel"
          aria-labelledby={`enter-tab-${active}`}
          // navy side a step lighter than the page, so the slab's thickness reads on the dark background
          // highlighted like the standings card: accent border, soft accent glow all round, bright top line
          className="neu-raised slab-3d relative mb-[1.125rem] mt-5 overflow-hidden rounded-2xl border-accent/45 [--slab-depth:1rem] [--slab-extra:0_0_3.5rem_-0.5rem_rgb(var(--accent-glow-rgb)/0.35)] [--slab-side:#1a2142] lg:mt-6"
        >
          <span aria-hidden="true" className="pointer-events-none absolute inset-x-6 top-0 z-10 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
          <div key={active} className="step-in grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
            <div className="p-5 lg:p-8">
              <p className="font-mono text-[0.625rem] font-bold tracking-[0.16em] text-success lg:text-[0.6875rem]">
                ▲ STEP {step.n} OF 0{STEPS.length}
              </p>
              <h3 className="mt-1.5 text-[1.375rem] font-extrabold leading-tight tracking-[-0.02em] text-fg lg:text-[1.75rem]">{step.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-fg-muted lg:text-base">{step.body}</p>
              <ul className="mt-4 space-y-2">
                {step.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-[0.875rem] font-semibold text-fg lg:text-[0.9375rem]">
                    <span aria-hidden="true" className="mt-[0.4em] size-1.5 shrink-0 rotate-45 bg-accent" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div aria-hidden="true" className="relative h-44 border-t border-white/[0.07] bg-white/[0.02] p-4 lg:h-auto lg:min-h-[15rem] lg:border-l lg:border-t-0 lg:p-6">
              <Visual />
            </div>
          </div>
        </div>
      </div>

      <div data-reveal="near" className="mt-8 text-center lg:mt-10" style={{ '--reveal-delay': '0.2s' }}>
        <JoinPair location="steps" className="mx-auto max-w-[30rem]" />
        <p className="mx-auto mt-5 max-w-[46ch] text-xs text-fg-subtle lg:mt-6">
          Steps are indicative. Allocation, eligibility and how winners are picked will be in the final campaign terms.
        </p>
      </div>
    </section>
  );
}
