import { useEffect, useState, type RefObject } from 'react';

/** Loads the leaderboard artwork (art.ts) as one chunk, after the page has finished loading (so it never competes with the hero) or as soon as the leaderboard comes within a screen, whichever is first. */
let art: Record<string, string> | null = null;
let loading: Promise<void> | null = null;

function loadArt() {
  return (loading ??= import('./art').then((m) => {
    art = m.ART;
  }));
}

/** data: URL for a layer name (e.g. 'gold-crystal'); empty until the art has loaded */
export const artUrl = (name: string) => art?.[name] ?? '';

/** true once the art is loaded. Starts loading after window load (+ idle), or when the section is within a screen. */
export function useLeaderboardArt(ref: RefObject<HTMLElement | null>) {
  const [ready, setReady] = useState(art !== null);
  useEffect(() => {
    if (ready) return;
    let alive = true;
    const go = () => loadArt().then(() => alive && setReady(true));
    const afterLoad = () => {
      const idle = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
      if (idle) idle(go, { timeout: 1500 });
      else window.setTimeout(go, 200);
    };
    if (document.readyState === 'complete') afterLoad();
    else window.addEventListener('load', afterLoad, { once: true });
    let io: IntersectionObserver | null = null;
    const el = ref.current;
    if (el) {
      io = new IntersectionObserver(([e]) => e.isIntersecting && go(), { rootMargin: '100% 0px' });
      io.observe(el);
    }
    return () => {
      alive = false;
      window.removeEventListener('load', afterLoad);
      io?.disconnect();
    };
  }, [ref, ready]);
  return ready;
}
