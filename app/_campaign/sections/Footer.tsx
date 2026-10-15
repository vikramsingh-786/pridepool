/** Footer: partners, terms, disclaimer — in the original footer's design (glow rising from the bottom, faint grid, accent top line, three tiers). (id="footer" keeps the floating Join button away.) */
export default function Footer() {
  return (
    <footer id="footer" className="relative isolate overflow-hidden border-t border-white/5 bg-bg">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 75% at 50% 100%, rgb(var(--glow) / 0.3), rgb(var(--glow) / 0.08) 45%, transparent 75%), radial-gradient(ellipse 45% 40% at 15% 100%, rgb(var(--glow-deep) / 0.22), transparent 70%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.09]"
          style={{
            backgroundImage: 'linear-gradient(var(--color-gold-bright) 1px, transparent 1px), linear-gradient(90deg, var(--color-gold-bright) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage: 'linear-gradient(to bottom, transparent 0%, #000 35%, #000 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, #000 35%, #000 100%)',
          }}
        />
      </div>
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      <div className="arena-container py-10 sm:py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <img alt="Lemonn" width="193" height="52" loading="lazy" decoding="async" className="h-6 w-auto" src="/lemonn-white.svg" />
            <span aria-hidden="true" className="text-xl font-light leading-none text-fg-muted">×</span>
            <img alt="Booming Bulls Academy" width="115" height="24" loading="lazy" decoding="async" className="h-6 w-auto" src="/booming-bulls-logo.svg" />
          </div>
          <nav aria-label="Footer">
            <a href="/terms-and-conditions" className="inline-flex min-h-12 items-center text-sm font-semibold text-fg-muted transition-colors duration-200 hover:text-fg">
              Terms &amp; conditions
            </a>
          </nav>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/5 pt-6 sm:flex-row sm:items-start sm:justify-between">
          <p className="max-w-[80ch] text-xs font-semibold leading-relaxed text-fg-subtle">
            Subject to a final agreement, verification of the championship result, regulatory approvals, and the final campaign terms. Joining the pool doesn’t guarantee a specific brokerage benefit, and winning a laptop is not guaranteed.
          </p>
          <a href="#hero" className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-fg-muted transition-colors duration-200 hover:text-fg">
            Back to top
            <span aria-hidden="true">↑</span>
          </a>
        </div>

        <div className="mt-6 text-xs font-semibold text-fg-muted">
          <p>© 2026 Lemonn. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
