import type { Metadata } from "next";
import Link from "next/link";
import Background from "./_campaign/components/Background";
import PageHeader from "./_campaign/components/PageHeader";
import Footer from "./_campaign/sections/Footer";
import { JOIN_LABEL, JOIN_URL, OPEN_APP_LABEL, OPEN_APP_URL, POOL } from "./_campaign/content";

export const metadata: Metadata = {
  title: `Page not found — ${POOL.amount} Pride Pool`,
};

/** Trading red, same as a down candle (components/trading.ts). */
const DOWN = "#f2545b";

export default function NotFound() {
  return (
    <>
      <PageHeader />
      <main id="main" className="relative">
        <Background />
        <section className="fold arena-container relative py-10 text-center lg:py-12">
          <div className="mx-auto max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full neu-inset px-3.5 py-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-accent">
              <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-accent" />
              Error 404
            </p>

            {/* The number is decoration; the sentence below it is the real heading. */}
            <p
              aria-hidden="true"
              className="mt-6 text-[5rem] font-extrabold leading-[0.95] tracking-[-0.04em] lg:text-[9rem]"
            >
              <span className="text-grad-silver">404</span>
            </p>
            <p
              aria-hidden="true"
              className="mt-1 font-mono text-[0.75rem] font-bold uppercase tracking-[0.16em] lg:text-[0.875rem]"
              style={{ color: DOWN }}
            >
              ▼ Page not found
            </p>

            <h1 className="mt-6 text-balance text-[clamp(1.75rem,5vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-fg [text-shadow:0_0_50px_rgb(var(--glow)/0.45)]">
              This page isn’t in the pool
            </h1>
            <p className="mx-auto mt-3 max-w-[44ch] text-pretty text-[0.9375rem] font-medium leading-relaxed text-fg-muted lg:text-lg">
              The link may be old, or mistyped. The {POOL.amount} pool, the leaderboard and the
              campaign terms are all still a tap away.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/"
                className="arena-cta btn-key flex h-14 w-full max-w-[22rem] items-center justify-center gap-2 font-extrabold tracking-[-0.01em] sm:w-auto sm:px-8"
              >
                Back to the campaign
                <span aria-hidden="true">→</span>
              </Link>
              <a
                href={OPEN_APP_URL}
                data-cta="open-app"
                data-cta-location="404"
                className="flex h-14 w-full max-w-[22rem] items-center justify-center gap-2 rounded-full border border-white/40 font-extrabold tracking-[-0.01em] text-fg transition-colors duration-200 hover:bg-white/10 sm:w-auto sm:px-8"
              >
                {OPEN_APP_LABEL}
                <span aria-hidden="true">→</span>
              </a>
              <a
                href={JOIN_URL}
                data-cta="join"
                data-cta-location="404"
                className="flex h-14 w-full max-w-[22rem] items-center justify-center gap-2 rounded-full border border-accent/70 font-extrabold tracking-[-0.01em] text-accent transition-colors duration-200 hover:bg-accent/10 sm:w-auto sm:px-8"
              >
                {JOIN_LABEL}
                <span aria-hidden="true">→</span>
              </a>
            </div>

            <p className="mt-6 text-sm text-fg-subtle">
              Looking for the rules?{" "}
              <Link
                href="/terms-and-conditions"
                className="inline-flex min-h-12 items-center font-semibold text-fg-muted underline decoration-white/30 underline-offset-4 hover:text-fg"
              >
                Campaign terms
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
