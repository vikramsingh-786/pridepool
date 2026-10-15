/** "Landed" = a section has come a quarter of the way up the screen. Section animations wait for this, so they play as you scroll into them, not before they're on screen. A section counts once any part of it is inside the top 75% of the screen (also while you're inside it, e.g. after a nav-link jump). */
const LANDED_OPTIONS: IntersectionObserverInit = { rootMargin: '0px 0px -25% 0px', threshold: 0 };

/** Calls back once, when the element lands (immediately with reduced motion). Returns a cleanup. */
export function onLanded(el: Element, cb: () => void): () => void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    cb();
    return () => {};
  }
  const io = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return;
    io.disconnect();
    cb();
  }, LANDED_OPTIONS);
  io.observe(el);
  return () => io.disconnect();
}
