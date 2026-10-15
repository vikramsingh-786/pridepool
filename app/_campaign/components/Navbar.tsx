import { useEffect, useState } from 'react';
import JoinButton from './JoinButton';
import useInPageJoinVisible from './useInPageJoin';

// Anchor jumps (nav + pedestal links) land below the bar instead of under it
const SCROLL_PADDING = ['scroll-pt-16', 'lg:scroll-pt-20'];

/** Quick links, in page order. Each id is a section on the page. */
const LINKS = [
  { id: 'moment', label: 'Champion' },
  { id: 'enter', label: 'How to enter' },
  { id: 'leaderboard', label: 'Leaderboard' },
  { id: 'faqs', label: 'FAQs' },
];

/** Fixed top bar: co-brand logos, quick links to each section, and a Join button. Transparent over the hero; picks up a dark glass backdrop once the page scrolls. - Desktop: links inline (the one for the section on screen is highlighted). Join is an outline button while a section's own Join is on screen (hero, How to enter, final call) and the primary green one otherwise. - Phones: links in a menu sheet; Join stays in the bottom bar (StickyJoin). The hero keeps a same-height spacer (h-16 / lg:h-20) so nothing sits under the bar. */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  // a section's own Join button is on screen → the navbar Join steps back to its outline style
  const inPageJoin = useInPageJoinVisible();
  const primary = !inPageJoin;
  const [active, setActive] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add(...SCROLL_PADDING);
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      // Active link: the last section whose top has passed the middle of the screen
      const mid = window.innerHeight / 2;
      let current: string | null = null;
      for (const { id } of LINKS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= mid) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      root.classList.remove(...SCROLL_PADDING);
    };
  }, []);

  // Close the phone menu with Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const solid = scrolled || menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color,backdrop-filter] duration-300 motion-reduce:transition-none ${solid ? 'border-white/10 bg-bg/80 backdrop-blur-md' : 'border-transparent'}`}
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
    >
      <div className="arena-container flex h-16 items-center gap-6 lg:h-20">
        <a href="#hero" aria-label="Back to top" className="flex shrink-0 items-center gap-3 lg:gap-4">
          <img alt="Lemonn" width="193" height="52" decoding="async" className="h-5 w-auto lg:h-7" src="/lemonn-white.svg" />
          <span aria-hidden="true" className="text-xl font-light leading-none text-fg-muted lg:text-2xl">×</span>
          <img alt="Booming Bulls Academy" width="115" height="24" decoding="async" className="h-5 w-auto lg:h-7" src="/booming-bulls-logo.svg" />
        </a>

        {/* Desktop quick links */}
        <nav aria-label="Sections" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  aria-current={active === l.id ? 'location' : undefined}
                  className={`rounded-full px-4 py-2 text-[0.9375rem] font-semibold transition-colors duration-200 ${active === l.id ? 'bg-white/[0.08] text-fg' : 'text-fg-muted hover:text-fg'}`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Join: a quiet outline while a section's own Join is on screen, otherwise the primary green button. Both sit in the same spot and crossfade; only the visible one can be tapped. */}
        <div className="hidden shrink-0 md:ml-auto md:grid lg:ml-0">
          <div
            aria-hidden={primary}
            inert={primary}
            className={`col-start-1 row-start-1 transition-opacity duration-300 motion-reduce:transition-none ${primary ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
          >
            <JoinButton size="nav" variant="outline" location="navbar" inPage={false} />
          </div>
          <div
            aria-hidden={!primary}
            inert={!primary}
            className={`col-start-1 row-start-1 transition-opacity duration-300 motion-reduce:transition-none ${primary ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
          >
            <JoinButton size="nav" location="navbar" inPage={false} />
          </div>
        </div>

        {/* Phone menu button */}
        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="nav-menu"
          aria-label={menuOpen ? 'Close sections menu' : 'Open sections menu'}
          onClick={() => setMenuOpen((o) => !o)}
          className="ml-auto flex size-12 items-center justify-center rounded-full text-fg md:ml-0 lg:hidden"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {/* Phone menu sheet */}
      {menuOpen && (
        <nav id="nav-menu" aria-label="Sections" className="arena-container border-t border-white/10 pb-4 lg:hidden">
          <ul className="flex flex-col py-2">
            {LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={() => setMenuOpen(false)}
                  aria-current={active === l.id ? 'location' : undefined}
                  className={`flex h-12 items-center text-base font-semibold ${active === l.id ? 'text-accent' : 'text-fg'}`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
