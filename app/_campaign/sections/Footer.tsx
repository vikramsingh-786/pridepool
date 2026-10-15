/** Footer: slim — partners, terms, disclaimer. (id="footer" keeps the floating Join button away.) */
export default function Footer() {
  return (
    <footer id="footer" className="snap-end relative border-t border-white/[0.07] bg-bg">
      <div className="arena-container flex flex-col gap-6 py-10 lg:flex-row lg:items-start lg:justify-between lg:py-14">
        <div className="max-w-[34rem]">
          <div className="flex items-center gap-3">
            <img alt="Lemonn" width="193" height="52" loading="lazy" decoding="async" className="h-5 w-auto lg:h-6" src="/lemonn-white.svg" />
            <span aria-hidden="true" className="text-lg font-light leading-none text-fg-muted">×</span>
            <img alt="Booming Bulls Academy" width="115" height="24" loading="lazy" decoding="async" className="h-5 w-auto lg:h-6" src="/booming-bulls-logo.svg" />
          </div>
          <p className="mt-4 text-xs leading-relaxed text-fg-subtle">
            Subject to a final agreement, verification of the championship result, regulatory approvals, and the final campaign terms. Joining the pool doesn’t guarantee a specific credit allocation.
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 text-sm">
          <a href="/terms-and-conditions" className="inline-flex min-h-12 items-center font-semibold text-fg-muted hover:text-fg">Terms &amp; conditions</a>
          <a href="#hero" className="inline-flex min-h-12 items-center font-semibold text-fg-muted hover:text-fg">Back to top ↑</a>
        </nav>
      </div>
      <div className="border-t border-white/[0.05]">
        <p className="arena-container py-4 text-xs text-fg-subtle">© 2026 Lemonn. All rights reserved.</p>
      </div>
    </footer>
  );
}
