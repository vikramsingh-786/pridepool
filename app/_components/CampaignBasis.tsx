import PoolCounter from "./PoolCounter";
import { getTopBrokerageSavings } from "../_lib/trading-api";

// Live: counts to the pool amount still remaining (from the contest API).
// No live data: shows a placeholder instead of a number.
export default async function CampaignBasis() {
  const { contest } = await getTopBrokerageSavings();
  return (
    <section
      id="basis"
      className="arena-container relative pb-20 pt-14 lg:pb-28 lg:pt-24"
    >
      <div
        data-reveal
        className="relative overflow-hidden rounded-3xl key-light px-6 py-8 text-center sm:px-10 sm:py-10"
      >
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-[40rem] max-w-full -translate-x-1/2 -translate-y-1/2 opacity-60 blur-3xl"
          style={{
            background: "radial-gradient(closest-side, rgba(177,69,201,0.35), transparent)",
          }}
        />
        <div className="relative">
          {/* Same dark pill as the hero's "The Pride Pool" tab. The card re-maps
              --color-accent darker, so the hero's magenta is restored here. */}
          <h2 id="basis-heading" className="section-label neu-inset !font-extrabold [--color-accent:#c45fd8]">
            {/* Pulsing "live" dot only when the figure really is live. */}
            <span className="relative flex h-1.5 w-1.5">
              {contest ? (
                <span className="absolute inset-0 animate-ping rounded-full bg-success opacity-75" />
              ) : null}
              <span className={`relative h-1.5 w-1.5 rounded-full ${contest ? "bg-success" : "bg-accent"}`} />
            </span>
            Pool remaining
          </h2>
          <p className="mt-4 text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold tabular-nums leading-none tracking-[-0.03em] text-gold-bright [text-shadow:0_0_70px_rgba(231,182,242,0.45)]">
            {contest ? (
              <PoolCounter to={contest.remainingValue} />
            ) : (
              <span>₹ – – –</span>
            )}
          </p>
          <p className="mt-2 text-[clamp(1rem,1.8vw,1.25rem)] font-bold text-fg">
            {contest ? `left in the ${contest.poolSize} Brokerage Credits Pool` : "Brokerage Credits Pool"}
          </p>
          <p className="mx-auto mt-3 max-w-[60ch] text-pretty text-[0.9375rem] leading-relaxed text-fg-muted sm:text-base">
            Marking Anish Singh Thakur&rsquo;s achievement at the{" "}
            <strong className="font-semibold text-fg">World Trading Championship</strong>.
          </p>
        </div>
      </div>
    </section>
  );
}
