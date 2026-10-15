'use client';

import { useCallback, useEffect, useState } from 'react';
import ArenaHero from './sections/ArenaHero';
import Champion from './sections/Champion';
import HowToEnter from './sections/HowToEnter';
import Leaderboard from './leaderboard/Leaderboard';
import Faqs from './sections/Faqs';
import Footer from './sections/Footer';

import FinalCall from './sections/FinalCall';
import StickyJoin from './components/StickyJoin';
import Background from './components/Background';
import RevealRoot from '../_components/RevealRoot';
import Navbar from './components/Navbar';
import CandleCursor from './components/CandleCursor';
import { onLanded } from './components/landed';
import type { Leaderboard as BoardData } from '../_lib/trading-api';

/** Sections the page snaps to, in page order */
const SNAP_SECTIONS = ['hero', 'moment', 'enter', 'leaderboard', 'join', 'faqs'];

// Safety net: scrolling unlocks after this even if the hero intro never reports back
const INTRO_LOCK_MAX_MS = 10000;

// Pause after landing before the hero starts building
const LANDING_HOLD_MS = 500;
// Slow networks: the longest the intro waits for the hero photo + font after the hold
const LANDING_WAIT_MAX_MS = 1500;

// The candle cursor needs a mouse (or trackpad); not in Windows high-contrast mode, which keeps the system cursor
const HAS_MOUSE =
  typeof window !== 'undefined' &&
  window.matchMedia('(any-hover: hover) and (any-pointer: fine)').matches &&
  !window.matchMedia('(forced-colors: active)').matches;

/** The campaign page. First screen: reward stage with all three touchpoints visible. Then the champion's moment, how to enter, the Figma leaderboard, the final call, a short FAQ and a slim footer. The page scales like an image (html.scale-artboard in globals.css). */
export default function Home({ badgeStyle = 'medal', board }: { badgeStyle?: 'medal' | 'stamp'; board?: BoardData | null }) {
  const [ready, setReady] = useState(false);
  // Section snapping, one rule for the whole page: when a scroll stops and ⅓ of the section you're heading into is visible (below the Navbar), it settles on that section; otherwise it settles back. A section can be taller than the screen (e.g. the leaderboard): inside those you scroll freely, so nothing is ever unreachable.
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let settled = window.scrollY;
    let timer = 0;

    /** Scroll positions where each section sits just below the Navbar (the hero sits at 0) */
    const snapPoints = () => {
      const nav = parseFloat(getComputedStyle(root).scrollPaddingTop) || 0;
      const points = SNAP_SECTIONS.map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => !!el)
        .map((el) => Math.max(0, Math.round(el.getBoundingClientRect().top + window.scrollY - nav)));
      return { nav, points };
    };

    const onEnd = () => {
      const y = window.scrollY;
      const { nav, points } = snapPoints();
      const view = window.innerHeight - nav; // the visible area below the Navbar
      const third = view / 3;
      const maxY = root.scrollHeight - window.innerHeight;
      let i = 0;
      for (let k = 0; k < points.length; k++) if (points[k] <= y + 1) i = k;
      const cur = points[i];
      const next = points[i + 1] ?? null;
      const blockEnd = Math.min(next ?? maxY + window.innerHeight, maxY + view);
      const long = blockEnd - cur > view + 2; // section taller than the screen
      const goingDown = y > settled;
      let target: number | null = null;

      if (Math.abs(y - cur) <= 1) target = null; // already on a section
      else if (goingDown) {
        // the next section is ⅓ visible → go to it; otherwise settle back (unless reading a long block)
        if (next !== null && y + view - next >= third) target = next;
        else if (!long) target = cur;
      } else {
        // scrolling up: ⅓ of the section above is back on screen → go to it; otherwise back down
        const revealed = (next ?? blockEnd) - y; // how much of the upper section is visible
        if (!long) target = Math.min(revealed, view) >= third || next === null ? cur : next;
        else if (next !== null && y > next - view && revealed < third) target = next;
      }

      if (target !== null && Math.abs(target - y) > 1) {
        window.scrollTo({ top: Math.min(target, maxY), behavior: reduced ? 'auto' : 'smooth' });
        return; // the snap scroll ends here again and records the settled spot
      }
      settled = y;
    };

    const onScroll = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(onEnd, 140);
    };
    const hasScrollEnd = 'onscrollend' in window;
    if (hasScrollEnd) window.addEventListener('scrollend', onEnd);
    else window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scrollend', onEnd);
      window.removeEventListener('scroll', onScroll);
      window.clearTimeout(timer);
    };
  }, []);
  // Each section's reveal / count-up animations wait until it has landed (see components/landed.ts): the fold gets data-landed, and globals.css holds its animations until then.
  useEffect(() => {
    const stops = Array.from(document.querySelectorAll<HTMLElement>('main .fold')).map((el) =>
      onLanded(el, () => el.setAttribute('data-landed', '')),
    );
    return () => stops.forEach((stop) => stop());
  }, []);
  // Hold the page on the hero until its intro has played (title → badge → card stamps; it lets go as the last shine starts), so the story isn't scrolled past half-built. Only when the page opens at the top; never longer than INTRO_LOCK_MAX_MS. Blocks wheel / touch / keyboard scrolling (no overflow:hidden, so no layout shift) on the hero only; navbar links still work and leaving the hero ends the lock.
  const [introDone, setIntroDone] = useState(false);
  const onIntroDone = useCallback(() => setIntroDone(true), []);
  useEffect(() => {
    if (introDone) return;
    // opened mid-page (e.g. a refresh): no lock, and nothing waits for the hero intro. Read after paint, not during render: the browser restores the scroll position first.
    if (window.scrollY > 10) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot, guarded by `introDone`
      setIntroDone(true);
      return;
    }
    // The lock belongs to the hero only: blocks only while the page is at the hero, and ends for good as soon as the page leaves it (e.g. a navbar link), so other sections always scroll freely.
    const onHero = () => window.scrollY <= 10;
    const block = (e: Event) => {
      if (onHero()) e.preventDefault();
    };
    const onKey = (e: KeyboardEvent) => {
      if (onHero() && [' ', 'PageDown', 'PageUp', 'ArrowDown', 'ArrowUp', 'End', 'Home'].includes(e.key) && !(e.target as Element)?.closest?.('input, textarea, [contenteditable]')) e.preventDefault();
    };
    const onScroll = () => {
      if (!onHero()) setIntroDone(true);
    };
    window.addEventListener('wheel', block, { passive: false });
    window.addEventListener('touchmove', block, { passive: false });
    window.addEventListener('keydown', onKey);
    window.addEventListener('scroll', onScroll, { passive: true });
    const t = window.setTimeout(() => setIntroDone(true), INTRO_LOCK_MAX_MS);
    return () => {
      window.removeEventListener('wheel', block);
      window.removeEventListener('touchmove', block);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('scroll', onScroll);
      window.clearTimeout(t);
    };
  }, [introDone]);
  useEffect(() => {
    // Warm the hero images during the hold. The intro starts after the hold once Anish's photo is decoded and the title font is in (on a normal connection both are ready within the hold, so nothing changes); on a slow network it waits for them, at most LANDING_WAIT_MAX_MS longer, so the photo never pops in after its own fade.
    let alive = true;
    const photo = new Image();
    photo.src = '/anish.webp';
    new Image().src = '/laptop-800.webp';
    const wait = (ms: number) => new Promise<void>((r) => window.setTimeout(r, ms));
    const assets = Promise.all([
      photo.decode().catch(() => undefined),
      document.fonts?.load('800 1em Manrope').catch(() => undefined),
    ]);
    Promise.race([Promise.all([wait(LANDING_HOLD_MS), assets]), wait(LANDING_HOLD_MS + LANDING_WAIT_MAX_MS)]).then(() => alive && setReady(true));
    return () => {
      alive = false;
    };
  }, []);

  return (
    <>
      <Navbar />
      <main id="main" className="relative">
        <Background />
        <ArenaHero badgeStyle={badgeStyle} ready={ready} onIntroDone={onIntroDone} />

        {/* Round 1 · The Champion */}
        <Champion coverReady={introDone} />

        {/* How to enter: the steps to join the pool and grab the prize (replaces The Pool + The Bonus) */}
        <HowToEnter />

        <Leaderboard board={board} />
        <FinalCall />
        <Faqs />
      </main>
      <Footer />
      {/* Mounts with the hero so it can see the hero's Join button */}
      {ready && <StickyJoin />}
      {HAS_MOUSE && <CandleCursor />}
      {/* Last child: its effect runs once every section above has committed, so the scroll-reveal observer actually finds this page's [data-reveal] nodes (the page mounts lazily, after the layout). */}
      <RevealRoot />
    </>
  );
}
