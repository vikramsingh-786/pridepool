import Image from "next/image";
import Placeholder from "./Placeholder";

// Draft: the giveaway mechanics are not confirmed yet. Every unknown is shown
// as "To be confirmed" rather than guessed.
const DETAILS = [
  { label: "How winners are picked", value: "To be confirmed" },
  { label: "Who can win", value: "To be confirmed" },
  { label: "Results announced", value: "To be confirmed" },
];

export default function Giveaway() {
  return (
    <section
      id="giveaway"
      aria-labelledby="giveaway-heading"
      className="arena-container relative pb-16 lg:pb-20"
    >
      <div
        data-reveal
        className="relative overflow-hidden rounded-2xl neu-raised px-6 py-8 sm:px-10 sm:py-10"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -left-16 top-1/2 h-64 w-[30rem] max-w-full -translate-y-1/2 opacity-60 blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(124,58,237,0.45), transparent)" }}
        />

        <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-12">
          {/* Rawpixel CC0 photo, background cut out and screen filled with the
              campaign violet. Unbranded on purpose: the prize model is not confirmed. */}
          <figure className="group mx-auto flex w-full max-w-sm flex-col items-center [perspective:1000px] lg:max-w-none">
            <div className="relative w-full">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-[12%] -bottom-2 h-10 rounded-[50%] opacity-70 blur-2xl"
                style={{ background: "radial-gradient(closest-side, rgba(242,163,60,0.55), transparent)" }}
              />
              <div className="laptop-float transition-transform duration-500 ease-out motion-reduce:transition-none group-hover:[transform:rotateX(10deg)_rotateY(-14deg)_scale(1.03)]">
                <Image
                  src="/giveaway-laptop-open.webp"
                  alt="An open laptop"
                  width={822}
                  height={690}
                  sizes="(min-width: 1024px) 26rem, (min-width: 448px) 28rem, 100vw"
                  className="h-auto w-full select-none"
                />
              </div>
            </div>
          </figure>

          <div className="text-center lg:text-left">
            <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-start">
              <p className="inline-flex items-center gap-2 rounded-full neu-inset px-3.5 py-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-accent">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                Bonus giveaway
              </p>
              <p className="rounded-full border border-accent/40 px-3 py-1 text-[0.625rem] font-bold uppercase tracking-[0.14em] text-accent">
                Draft · details to be confirmed
              </p>
            </div>
            <h2
              id="giveaway-heading"
              className="mt-4 text-[clamp(1.75rem,4.5vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.025em] text-fg [text-shadow:0_0_50px_rgba(167,139,250,0.5)]"
            >
              <Placeholder>
                <span className="text-gold-bright">20 laptops</span> up for grabs
              </Placeholder>
            </h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-fg-muted sm:text-base">
              <Placeholder>
                On top of the ₹1 Crore brokerage credits pool, 20 laptops will be
                given away to participants.
              </Placeholder>
            </p>

            <dl className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {DETAILS.map((d) => (
                <div key={d.label} className="rounded-xl neu-inset px-4 py-3 text-left">
                  <dt className="text-[0.625rem] font-bold uppercase tracking-[0.14em] text-fg-subtle">
                    {d.label}
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-accent">
                    <Placeholder>{d.value}</Placeholder>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
