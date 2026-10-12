import PoolCounter from "./PoolCounter";

export default function CampaignBasis() {
  return (
    <section
      id="basis"
      aria-labelledby="basis-heading"
      className="arena-container relative pb-16 pt-14 lg:pb-20 lg:pt-24"
    >
      <div
        data-reveal
        className="relative overflow-hidden rounded-2xl neu-raised px-6 py-8 text-center sm:px-10 sm:py-10"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-[40rem] max-w-full -translate-x-1/2 -translate-y-1/2 opacity-60 blur-3xl"
          style={{
            background: "radial-gradient(closest-side, rgba(242,163,60,0.35), transparent)",
          }}
        />
        <div className="relative">
          <h2
            id="basis-heading"
            className="inline-flex items-center gap-2 text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-violet"
          >
            <span aria-hidden className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-success opacity-75 motion-reduce:hidden" />
              <span className="relative h-2 w-2 rounded-full bg-success" />
            </span>
            Live counter
          </h2>
          <p className="mt-4 text-[clamp(2.25rem,6vw,4.5rem)] font-extrabold leading-none tracking-[-0.03em] text-gold-bright [text-shadow:0_0_70px_rgba(255,201,120,0.45)]">
            <PoolCounter />
          </p>
          <p className="mt-2 text-[clamp(1rem,1.8vw,1.25rem)] font-bold text-fg">
            Brokerage Credits Pool
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
