import Link from "next/link";

/** Slim header for the pages that sit beside the campaign (terms, 404): back link and the co-brand lockup. The campaign page itself uses Navbar, which has the section links. */
export default function PageHeader() {
  return (
    <header className="relative z-10 border-b border-white/5 backdrop-blur-sm">
      <div className="arena-container grid grid-cols-[1fr_auto_1fr] items-center gap-4 py-3.5">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 justify-self-start text-[0.8125rem] font-semibold text-fg-muted transition-colors duration-200 hover:text-fg"
        >
          <span aria-hidden="true">←</span>
          <span className="hidden sm:inline">Back to campaign</span>
          <span className="sm:hidden">Back</span>
        </Link>
        <Link href="/" className="flex items-center gap-3 lg:gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="Lemonn" width="193" height="52" className="h-5 w-auto lg:h-6" src="/lemonn-white.svg" />
          <span aria-hidden="true" className="text-xl font-light leading-none text-fg-muted">
            ×
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="Booming Bulls Academy" width="115" height="24" className="h-5 w-auto lg:h-6" src="/booming-bulls-logo.svg" />
        </Link>
      </div>
    </header>
  );
}
