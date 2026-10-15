import { useEffect, useRef } from 'react';
import { UP, DOWN } from './trading';

/** Mouse only: while the page scrolls, the cursor turns into one candle from the hero chart; when it's still, it's the normal cursor again. Scrolling pins the candle's far end to the page: scroll down and the page carries that end up, so the candle grows up from the pointer in green; scroll up and it grows down in red. Past a maximum length the pin slips, so it never grows longer than that. When the scrolling stops it springs back to a short candle and hands over to the normal cursor. Never on touch, never while the pointer is over the video player, the scrollbar or outside the window. With reduced motion it keeps the colour but not the stretch. */

const HALF = 8; // half the resting body height (px)
const WICK = 6; // wick beyond each end of the body (px)
const RELEASE_MS = 120; // no scroll for this long = the scrolling has stopped
const SETTLE_MS = 70; // how fast it shrinks back (time constant)

export default function CandleCursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLSpanElement>(null);
  const wickRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const body = bodyRef.current;
    const wick = wickRef.current;
    if (!root || !body || !wick) return;
    const html = document.documentElement;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let x = 0;
    let y = 0;
    // a mouse is in use and the pointer is over the page itself (not touch, the video, the scrollbar or outside)
    let mouse = false;
    let inside = false;
    let active = false; // the candle is standing in for the cursor
    let d = 0; // where the pinned end is, relative to the pointer (px; negative = above it)
    let goingUp = false; // reduced motion: colour from the scroll direction alone
    let scrolling = false;
    let lastScroll = window.scrollY;
    let releaseTimer = 0;
    let frame = 0;
    let lastTime = 0;

    const maxStretch = () => Math.min(180, Math.max(96, window.innerHeight * 0.2));
    const overPage = (cx: number) => cx < html.clientWidth; // right of that is the scrollbar

    const start = () => {
      if (active) return;
      active = true;
      root.style.transform = `translate3d(${x}px, ${y}px, 0)`; // no flash at the last spot it was shown
      root.dataset.on = '';
      html.classList.add('has-candle-cursor');
    };
    // back to the normal cursor
    const stop = () => {
      active = false;
      scrolling = false;
      d = 0;
      window.clearTimeout(releaseTimer);
      delete root.dataset.on;
      html.classList.remove('has-candle-cursor');
    };

    const draw = (time: number) => {
      frame = 0;
      if (!active) return;
      const dt = lastTime ? Math.min(64, time - lastTime) : 16;
      lastTime = time;
      // scrolling stopped: the pin lets go and the candle shrinks back
      if (!scrolling && d !== 0) {
        d *= Math.exp(-dt / SETTLE_MS);
        if (Math.abs(d) < 0.5) d = 0;
      }
      if (!scrolling && d === 0) {
        lastTime = 0;
        stop();
        return;
      }
      const top = Math.min(0, d) - HALF;
      const len = Math.abs(d) + HALF * 2;
      root.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      body.style.transform = `translateY(${top}px)`;
      body.style.height = `${len}px`;
      wick.style.transform = `translateY(${top - WICK}px)`;
      wick.style.height = `${len + WICK * 2}px`;
      // red while scrolling up (the candle grows down), green otherwise
      const red = reduced ? goingUp : d > 0.5;
      if (red) root.dataset.red = '';
      else delete root.dataset.red;
      if (!scrolling) kick();
      else lastTime = 0;
    };
    const kick = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') {
        // touch or pen on a hybrid device: the normal behaviour takes over
        mouse = false;
        if (active) stop();
        return;
      }
      mouse = true;
      x = e.clientX;
      y = e.clientY;
      inside = overPage(x);
      if (!active) return;
      if (inside) kick();
      else stop();
    };
    // the wheel says where the pointer is, even if the mouse hasn't moved since the page opened
    const onWheel = (e: WheelEvent) => {
      mouse = true;
      x = e.clientX;
      y = e.clientY;
      inside = overPage(x);
    };
    // left the window, or went into the video player (an iframe draws its own cursor)
    const onOut = (e: PointerEvent) => {
      const to = e.relatedTarget as Element | null;
      if (to && to.nodeName !== 'IFRAME') return;
      inside = false;
      if (active) stop();
    };

    const onScroll = () => {
      const s = window.scrollY;
      const delta = s - lastScroll;
      lastScroll = s;
      if (!delta || !mouse || !inside) return;
      start();
      const m = maxStretch();
      // the page carries the pinned end with it; past the maximum it slips
      if (!reduced) d = Math.max(-m, Math.min(m, d - delta));
      goingUp = delta < 0;
      scrolling = true;
      window.clearTimeout(releaseTimer);
      releaseTimer = window.setTimeout(() => {
        scrolling = false;
        kick();
      }, RELEASE_MS);
      kick();
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('wheel', onWheel, { passive: true });
    document.addEventListener('pointerout', onOut, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('wheel', onWheel);
      document.removeEventListener('pointerout', onOut);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
      stop();
    };
  }, []);

  return (
    <div ref={rootRef} aria-hidden="true" className="candle-cursor" style={{ '--up': UP, '--down': DOWN }}>
      <span ref={wickRef} className="candle-cursor-wick" />
      <span ref={bodyRef} className="candle-cursor-body" />
    </div>
  );
}
