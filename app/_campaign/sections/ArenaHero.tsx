import { useEffect, useRef, useState, type ReactNode } from 'react';
import JoinButton from '../components/JoinButton';
import PoolHeadline from '../components/PoolHeadline';
import { ANCHORS, ANISH, LAPTOPS, POOL } from '../content';

/** First screen: a reward stage where ALL three touchpoints are visible at once. ₹1 Crore → the scoreboard headline (rolls up on load) Anish → on the centre pedestal, with his World #2 medal on the left pedestal Laptops → on the right pedestal, ×20 Animation only builds the scene; once built, nothing disappears — a visitor who looks away during loading still sees everything. Sized in rem on a 390×844 / 1440×900 canvas (see html.scale-artboard in globals.css), so it scales like an image on any screen. */

function Pedestal({
  href,
  item,
  value,
  label,
  className,
  delay,
  tucked = false,
  stamp,
  onStamped,
}: {
  href: string;
  item: ReactNode;
  /** Omit both to show the item without a pedestal card */
  value?: string;
  label?: string;
  className: string;
  delay: string;
  /** Item sits partly behind the card instead of on top of it */
  tucked?: boolean;
  /** Side cards: hidden until their turn, then stamped in (instead of rising with the stage) */
  stamp?: 'wait' | 'play' | 'done';
  onStamped?: () => void;
}) {
  const entrance = stamp === undefined ? 'pedestal-rise' : stamp === 'wait' ? 'invisible' : stamp === 'play' ? 'card-stamp' : '';
  return (
    <a
      href={href}
      onAnimationEnd={(e) => stamp === 'play' && e.target === e.currentTarget && onStamped?.()}
      className={`${entrance} group relative flex flex-col items-center justify-end ${className}`}
      style={stamp === undefined ? { animationDelay: delay } : undefined}
    >
      <div className={`relative flex w-full flex-1 items-end justify-center ${tucked ? 'z-0' : 'z-10'}`}>{item}</div>
      {/* Pedestal block: 3D key, accent rim on top */}
      {value && (
      <div className={`key-cap relative mt-2 flex w-full flex-col items-center justify-center rounded-xl px-1.5 py-3 text-center lg:rounded-2xl lg:py-4 ${tucked ? 'z-10' : ''}`}>
        <span aria-hidden="true" className="absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
        {/* impact ring when the card is stamped down */}
        {stamp === 'play' && <span aria-hidden="true" className="card-stamp-impact pointer-events-none absolute -inset-1.5 rounded-[1rem] border-2 border-accent/70 lg:rounded-[1.25rem]" />}
        <span className="text-[1.125rem] font-extrabold uppercase leading-none tracking-[-0.01em] text-fg lg:text-[1.625rem]">{value}</span>
        <span className="mt-1 text-[0.625rem] font-bold uppercase leading-tight tracking-[0.14em] text-fg-subtle lg:text-[0.75rem]">{label}</span>
      </div>
      )}
    </a>
  );
}

function Medal({ className = '', onLanded }: { className?: string; onLanded?: () => void }) {
  return (
    <div
      onAnimationEnd={(e) => e.target === e.currentTarget && onLanded?.()}
      className={`story-stamp absolute z-20 flex aspect-square flex-col items-center justify-center rounded-full border border-white/60 text-bg shadow-[inset_0_2px_0_rgba(255,255,255,0.9),inset_0_-3px_0_rgba(0,0,0,0.18),0_5px_0_#8f8fa3,0_14px_24px_-6px_rgba(0,0,0,0.8)] ${className}`}
      style={{ background: 'radial-gradient(circle at 35% 28%, #ffffff 0%, var(--color-silver) 45%, #a9a9bd 100%)' }}
      aria-label={`World's ${ANISH.rank} trader`}
    >
      <span aria-hidden="true" className="text-[0.5rem] font-extrabold uppercase leading-none tracking-[0.18em] opacity-70 lg:text-[0.8125rem]">World</span>
      <span aria-hidden="true" className="my-0.5 text-[1.625rem] font-extrabold leading-none tracking-[-0.04em] lg:my-1 lg:text-[2.875rem]">{ANISH.rank}</span>
      <span aria-hidden="true" className="text-[0.5rem] font-extrabold uppercase leading-none tracking-[0.18em] opacity-70 lg:text-[0.8125rem]">Trader</span>
    </div>
  );
}

/** Rubber stamp "WORLD'S #2 TRADER": pressed down onto the page, printed behind Anish (styles: .stamp-press). */
function Stamp({ className = '', onLanded }: { className?: string; onLanded?: () => void }) {
  return (
    <div className={`pointer-events-none absolute z-0 ${className}`} aria-label={`World's ${ANISH.rank} trader`} role="img">
      {/* impact ring when it lands */}
      <span aria-hidden="true" onAnimationEnd={onLanded} className="stamp-press-impact absolute inset-[-12%] rounded-[1.25rem] border-2 border-accent/70" />
      <div
        aria-hidden="true"
        className="stamp-press flex flex-col items-center justify-center rounded-[0.9rem] border-[0.2rem] border-accent px-3 py-2 text-accent lg:rounded-[1.4rem] lg:border-[0.3rem] lg:px-5 lg:py-3.5"
        style={{ boxShadow: 'inset 0 0 0 0.3rem var(--color-bg), inset 0 0 0 0.42rem currentColor, 0 0 1.5rem rgb(var(--accent-glow-rgb) / 0.35)', textShadow: '0 0 1rem rgb(var(--accent-glow-rgb) / 0.55)' }}
      >
        <span className="flex items-center gap-1.5 text-[0.625rem] font-extrabold uppercase leading-none tracking-[0.2em] lg:text-[1rem]">
          <span>★</span>World’s<span>★</span>
        </span>
        <span className="my-1 text-[2.25rem] font-extrabold leading-none tracking-[-0.04em] lg:text-[3.75rem]">{ANISH.rank}</span>
        <span className="text-[0.75rem] font-extrabold uppercase leading-none tracking-[0.24em] lg:text-[1.25rem]">Trader</span>
        <span className="mt-1.5 border-t-2 border-current pt-1.5 text-[0.875rem] font-extrabold uppercase leading-none tracking-[0.2em] lg:mt-2.5 lg:pt-2.5 lg:text-[1.5rem]">{ANISH.name.split(' ')[0]}</span>
      </div>
    </div>
  );
}

/** Stack of ₹ credit coins — the pool, on the left pedestal. */
const BUBBLES = [
  { left: '8%', bottom: '-1.5rem', ms: '3.2s', delay: '1.2s' },
  { left: '62%', bottom: '-1.5rem', ms: '3.8s', delay: '2.1s' },
  { left: '30%', bottom: '-1.5rem', ms: '3.4s', delay: '2.9s' },
  { left: '78%', bottom: '-1.5rem', ms: '3s', delay: '3.6s' },
  { left: '45%', bottom: '-1.5rem', ms: '3.6s', delay: '4.4s' },
];

function CoinBubbles({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    // Zero-height anchor at the card's top edge: coins start hidden behind the card and rise out of it
    <div className="story-pop relative h-0 w-full" style={{ animationDelay: '0.9s' }}>
      <div aria-hidden="true" className="absolute bottom-0 left-1/2 -z-10 h-28 w-28 -translate-x-1/2 translate-y-[80%] rounded-full lg:h-44 lg:w-44" style={{ background: 'radial-gradient(closest-side, rgb(var(--glow)/0.35), transparent)' }} />
      {/* ₹ coins bubbling up from behind the card, forever (same motion as the story version: .story-coin) */}
      {BUBBLES.map((b, i) => (
        <span
          key={`b${i}`}
          aria-hidden="true"
          className="story-coin key-cap-sm pointer-events-none absolute flex h-5 w-5 items-center justify-center rounded-full text-[0.625rem] font-extrabold text-accent lg:h-8 lg:w-8 lg:text-[0.875rem]"
          style={{ left: b.left, bottom: b.bottom, '--c-ms': b.ms, '--c-delay': b.delay, animationFillMode: 'backwards' }}
        >
          ₹
        </span>
      ))}
    </div>
  );
}

/** Small laptop peeking out from behind its card; rises and grows when the card is hovered or focused. */
function Laptop() {
  return (
    <div className="story-pop relative" style={{ animationDelay: '1.15s' }}>
      <div className="translate-y-[45%] transition-[translate,scale] duration-300 ease-out group-hover:-translate-y-[15%] group-hover:scale-125 group-focus-visible:-translate-y-[15%] group-focus-visible:scale-125 motion-reduce:transition-none">
        {/* Warm spotlight so the dark laptop reads on the dark stage */}
        <div aria-hidden="true" className="absolute left-1/2 top-1/2 -z-10 h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: 'radial-gradient(closest-side, rgba(255,201,120,0.45), rgba(255,201,120,0.12) 55%, transparent)' }} />
        <img
          src="/laptop-800.webp"
          alt=""
          width="800"
          height="817"
          decoding="async"
          className="laptop-float w-[4.5rem] select-none brightness-125 drop-shadow-[0_0_1rem_rgba(255,201,120,0.35)] lg:w-[8rem]"
        />
        <span className="story-pop absolute -right-2 -top-1 rounded-full bg-gold px-1.5 py-0.5 text-[0.625rem] font-extrabold text-bg shadow-[0_0.25rem_0.75rem_rgba(0,0,0,0.5)] lg:px-2 lg:text-[0.875rem]" style={{ animationDelay: '1.5s' }}>
          ×{LAPTOPS.count}
        </span>
      </div>
    </div>
  );
}

function Anish({ badge, showBadge, onBadgeLanded }: { badge: 'medal' | 'stamp'; showBadge: boolean; onBadgeLanded: () => void }) {
  return (
    <div className="relative">
      {showBadge && badge === 'medal' && <Medal onLanded={onBadgeLanded} className="-left-[34%] top-[4%] w-[5.25rem] lg:-left-[24%] lg:top-[5%] lg:w-[8.75rem]" />}
      {/* the stamp prints behind his image, at his top-right */}
      {showBadge && badge === 'stamp' && <Stamp onLanded={onBadgeLanded} className="-right-[24%] top-0 lg:-right-[24%] lg:top-[3%]" />}
      <div aria-hidden="true" className="hero-figure-rim figure-glow-in pointer-events-none absolute -inset-x-[35%] -top-[8%] bottom-[5%] -z-10" />
      <img
        src="/anish.webp"
        alt={ANISH.name}
        width="629"
        height="904"
        decoding="async"
        fetchPriority="high"
        className="arena-enter relative z-[1] h-[22rem] w-auto max-w-none select-none lg:h-[31rem]"
        style={{ '--e-delay': '0.55s', maskImage: 'linear-gradient(to bottom, #000 82%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, #000 82%, transparent 100%)' }}
      />
    </div>
  );
}

function Headline({ align, onComplete, replay }: { align: 'center' | 'left'; onComplete: () => void; replay: number }) {
  return (
    <div className={align === 'center' ? 'text-center' : 'text-left'}>
      <PoolHeadline align={align} onComplete={onComplete} replay={replay} />
      <p className="arena-enter mt-1.5 inline-flex items-center gap-1.5 font-mono text-[0.75rem] font-bold uppercase tracking-[0.08em] text-success lg:mt-2 lg:text-[1rem]" style={{ '--e-delay': '0.3s' }}>
        Brokerage credits for India’s traders
      </p>
    </div>
  );
}

/** The title's last shine takes this long to sweep across (PoolHeadline: SWEEP_VISIBLE_MS) */
const JOIN_SHAKE_AFTER_MS = 1100;

export default function ArenaHero({
  badgeStyle = 'medal',
  ready = true,
  onIntroDone,
}: {
  badgeStyle?: 'medal' | 'stamp';
  ready?: boolean;
  /** Fires once the intro's stamps are done (title → badge → both cards), right before the last shine */
  onIntroDone?: () => void;
}) {
  // The rank badge waits until the title animation has fully finished, so the two never compete.
  const [titleDone, setTitleDone] = useState(false);
  const onTitleDone = () => setTitleDone(true);
  // …once the badge has landed, the two side cards are stamped in, one after another (reduced motion: cards are simply there)…
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [cards, setCards] = useState<0 | 1 | 2 | 3>(reduced ? 3 : 0); // 0 waiting · 1 ₹1 Cr stamping · 2 laptops stamping · 3 done
  const onBadgeLanded = () => setCards((c) => (c === 0 ? 1 : c));
  const stampOf = (n: 1 | 2) => (cards < n ? 'wait' : cards === n ? 'play' : 'done') as 'wait' | 'play' | 'done';
  // …and once both cards are down, the title's light sweep plays one more time
  const [sweepReplay, setSweepReplay] = useState(0);
  // …and once that last shine has swept across, the hero's Join button gives one shake
  const [shakeJoin, setShakeJoin] = useState(false);
  const cardsDoneRef = useRef(false);
  const onCardsDone = () => {
    if (cardsDoneRef.current) return;
    cardsDoneRef.current = true;
    setCards(3);
    setSweepReplay((n) => (n === 0 ? 1 : n));
    // both cards are down → the page can be scrolled (the last shine plays as you go)
    onIntroDone?.();
    // the shine finishes → Join shakes
    window.setTimeout(() => setShakeJoin(true), JOIN_SHAKE_AFTER_MS);
  };
  // Reduced motion: no intro to wait for
  useEffect(() => {
    if (reduced) onIntroDone?.();
  }, [reduced, onIntroDone]);
  // Safety net: each step normally advances on its animation's end event; if that event never comes (e.g. motion settings changed mid-intro), these timers move it on well after the animation's own end.
  useEffect(() => {
    if (!titleDone || cards !== 0) return;
    const t = window.setTimeout(onBadgeLanded, 3000);
    return () => window.clearTimeout(t);
  }, [titleDone, cards]);
  useEffect(() => {
    if (cards !== 1 && cards !== 2) return;
    const t = window.setTimeout(() => (cards === 1 ? setCards((c) => (c === 1 ? 2 : c)) : onCardsDone()), 3000);
    return () => window.clearTimeout(t);
  }, [cards]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <section id="hero" aria-labelledby="hero-heading" className="relative isolate flex h-[52.75rem] snap-start flex-col overflow-hidden lg:h-[56.25rem]">
      <h1 id="hero-heading" className="sr-only">
        {POOL.amount} {POOL.title}: Lemonn × Booming Bulls, celebrating {ANISH.name}, World {ANISH.rank}, with {LAPTOPS.count} laptops to win
      </h1>

      {/* The stage lighting, grid and trading chart are the page's fixed background (components/Background) */}

      {/* Room for the fixed Navbar */}
      <div aria-hidden="true" className="h-16 shrink-0 lg:h-20" />

      {/* Mounted after the landing hold, so every entrance animation (CSS and JS) starts together */}
      {/* lg:pb-20 = optical centring: the pedestals and candles weigh the bottom, so sit the content a little high */}
      {ready && (
      <div className="arena-container flex min-h-0 flex-1 flex-col justify-center gap-6 lg:flex-row lg:items-center lg:justify-start lg:gap-12 lg:pb-20">
        {/* Desktop: headline column with the Join button */}
        <div className="hidden w-[36rem] shrink-0 lg:block">
          <Headline align="left" onComplete={onTitleDone} replay={sweepReplay} />
          <p className="arena-enter mt-6 max-w-[30rem] text-[1.25rem] font-medium leading-relaxed text-fg-muted" style={{ '--e-delay': '0.4s' }}>
            Celebrating <strong className="font-bold text-fg">{ANISH.name}</strong>, India’s World {ANISH.rank} at the {ANISH.event}, with {POOL.amount} in brokerage credits and {LAPTOPS.count} laptops.
          </p>
          <div className="arena-enter mt-10" style={{ '--e-delay': '0.6s' }}>
            <div className={`w-fit ${shakeJoin ? 'join-shake' : ''}`}>
              <JoinButton location="hero" />
            </div>
            <p className="mt-4 flex items-center gap-2 text-[1rem] font-semibold text-fg-muted">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-success shadow-[0_0_8px_2px_rgba(61,214,140,0.5)]" />
              Existing Lemonn users are already in.
            </p>
          </div>
        </div>

        {/* Mobile: headline on top */}
        <div className="shrink-0 lg:hidden">
          <Headline align="center" onComplete={onTitleDone} replay={sweepReplay} />
        </div>

        {/* The reward stage — everything stays on screen */}
        <div className="relative mx-auto flex min-h-0 w-full max-w-[22rem] items-end justify-center gap-1.5 lg:max-w-none lg:flex-1 lg:gap-4 lg:pb-0 lg:pt-0">
          {/* Side cards tuck in under the photo's faded bottom edge, towards its centre */}
          <Pedestal
            href={ANCHORS.pool}
            item={<CoinBubbles active={cards >= 2} />}
            tucked
            value={POOL.short}
            label={POOL.label}
            className="z-10 -mr-16 w-[8.75rem] lg:-mr-[7.75rem] lg:w-[13.5rem]"
            delay="0.35s"
            stamp={stampOf(1)}
            onStamped={() => setCards(2)}
          />
          <Pedestal
            href={ANCHORS.champion}
            item={<Anish badge={badgeStyle} showBadge={titleDone} onBadgeLanded={onBadgeLanded} />}
            className="w-[8.75rem] lg:w-[15rem]"
            delay="0.2s"
          />
          <Pedestal
            href={ANCHORS.laptops}
            item={<Laptop />}
            tucked
            value={`${LAPTOPS.count} ${LAPTOPS.label}`}
            label="To win"
            className="z-10 -ml-16 w-[8.75rem] lg:-ml-[7.75rem] lg:w-[13.5rem]"
            delay="0.5s"
            stamp={stampOf(2)}
            onStamped={onCardsDone}
          />
        </div>

        {/* Mobile: Join never leaves the first screen */}
        <div className="arena-enter shrink-0 text-center lg:hidden" style={{ '--e-delay': '0.6s' }}>
          <div className={shakeJoin ? 'join-shake' : ''}>
            <JoinButton location="hero" className="mx-auto max-w-[26rem]" />
          </div>
          <p className="mt-3 flex items-center justify-center gap-2 text-[0.8125rem] font-semibold text-fg-muted">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-success shadow-[0_0_8px_2px_rgba(61,214,140,0.5)]" />
            Existing Lemonn users are already in.
          </p>
        </div>
      </div>
      )}
    </section>
  );
}
