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
import { onLanded } from './components/landed';
import type { Leaderboard as BoardData } from '../_lib/trading-api';

// Safety net: counts the intro as done after this even if the hero never reports back
const INTRO_MAX_MS = 6000;

// Pause after landing before the hero starts building
const LANDING_HOLD_MS = 150;
// Slow networks: the longest the intro waits for the hero photo + font after the hold
const LANDING_WAIT_MAX_MS = 1500;

/** The campaign page. First screen: reward stage with all three touchpoints visible. Then the champion's moment, how to enter, the Figma leaderboard, the final call, a short FAQ and a slim footer. The page scales like an image (html.scale-artboard in globals.css). Scrolling is free: no section snapping, it fought touch momentum. */
export default function Home({ badgeStyle = 'medal', board }: { badgeStyle?: 'medal' | 'stamp'; board?: BoardData | null }) {
  const [ready, setReady] = useState(false);
  // Each section's reveal / count-up animations wait until it has landed (see components/landed.ts): the fold gets data-landed, and globals.css holds its animations until then.
  useEffect(() => {
    const stops = Array.from(document.querySelectorAll<HTMLElement>('main .fold')).map((el) =>
      onLanded(el, () => el.setAttribute('data-landed', '')),
    );
    return () => stops.forEach((stop) => stop());
  }, []);
  // introDone = the hero intro has played, or the visitor scrolled away first (scrolling is never blocked). Until then the Champion cover holds off loading so it doesn't compete with the hero photo.
  const [introDone, setIntroDone] = useState(false);
  const onIntroDone = useCallback(() => setIntroDone(true), []);
  useEffect(() => {
    if (introDone) return;
    const onScroll = () => {
      if (window.scrollY > 10) setIntroDone(true);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const t = window.setTimeout(() => setIntroDone(true), INTRO_MAX_MS);
    return () => {
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
      {/* Last child: its effect runs once every section above has committed, so the scroll-reveal observer actually finds this page's [data-reveal] nodes (the page mounts lazily, after the layout). */}
      <RevealRoot />
    </>
  );
}
