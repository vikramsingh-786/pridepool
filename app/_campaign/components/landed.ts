/** "Landed" = a section has arrived at the top of the screen, just below the Navbar (the end of a snap). Section animations wait for this, so they play while you look at them, not while you're still scrolling towards them. The observer watches a thin band just under the Navbar (8%–15% of the screen height). A section touches it when its top reaches the band, or while you're inside it (e.g. after a nav-link jump). */
const LANDED_OPTIONS: IntersectionObserverInit = { rootMargin: '-8% 0px -85% 0px', threshold: 0 };

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
