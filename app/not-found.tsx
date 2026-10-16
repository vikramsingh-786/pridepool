import type { Metadata } from "next";
import Link from "next/link";
import Background from "./_campaign/components/Background";
import PageHeader from "./_campaign/components/PageHeader";
import Footer from "./_campaign/sections/Footer";
import { POOL } from "./_campaign/content";
import { JoinPair } from "./_campaign/components/JoinButton";

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

            {/* back to the campaign on top; under it the site's standard Open Lemonn App + Sign Up & Join pair */}
            <div className="mx-auto mt-8 flex w-full max-w-[30rem] flex-col gap-5">
              <Link
                href="/"
                className="arena-cta btn-key flex h-14 w-full items-center justify-center gap-2 whitespace-nowrap font-extrabold tracking-[-0.01em]"
              >
                Back to the campaign
                <span aria-hidden="true">→</span>
              </Link>
              <JoinPair location="404" inPage={false} />
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
