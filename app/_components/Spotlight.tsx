import Placeholder from "./Placeholder";
import ShortPlayer from "./ShortPlayer";

const VIDEO_ID = "WDVdQ0wyrvI";

export default function Spotlight() {
  return (
    <section
      id="moment"
      aria-labelledby="moment-heading"
      className="arena-container relative pb-20 lg:pb-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute right-[10%] top-10 h-80 w-[36rem] max-w-full opacity-70 blur-[110px]"
        style={{
          background: "radial-gradient(closest-side, var(--color-violet-deep), transparent)",
        }}
      />

      <div className="relative mx-auto grid max-w-5xl grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16 min-[1920px]:max-w-6xl min-[1920px]:grid-cols-[minmax(0,1fr)_25rem]">
        <div data-reveal className="text-center lg:text-left">
          <p className="inline-flex items-center gap-2 rounded-full neu-inset px-3.5 py-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-accent">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_2px_rgba(242,163,60,0.6)]" />
            From the championship stage
          </p>
          <h2
            id="moment-heading"
            className="mt-5 text-[clamp(1.75rem,4.5vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.025em] text-fg [text-shadow:0_0_50px_rgba(167,139,250,0.5)]"
          >
            <Placeholder>One minute from the title</Placeholder>
          </h2>

          <figure className="mx-auto mt-8 max-w-xl lg:mx-0">
            <blockquote className="flex flex-col gap-4">
              <p className="text-[clamp(1.25rem,2.6vw,1.75rem)] font-bold leading-snug text-gold-bright">
                <Placeholder>&ldquo;I came here to become the champion.&rdquo;</Placeholder>
              </p>
              <p className="text-[clamp(1.25rem,2.6vw,1.75rem)] font-bold leading-snug text-fg">
                <Placeholder>&ldquo;One more minute and I would be the champion.&rdquo;</Placeholder>
              </p>
            </blockquote>
            <figcaption className="mt-6 text-[0.9375rem] leading-relaxed text-fg-muted">
              <Placeholder>
                Anish Singh Thakur of Booming Bulls, speaking on stage at the
                World Trading Championship.
              </Placeholder>
            </figcaption>
          </figure>
        </div>

        <div data-reveal style={{ "--reveal-delay": "0.1s" } as React.CSSProperties} className="mx-auto w-full max-w-[20rem] lg:max-w-none">
          <div className="relative isolate">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-6 -z-10 rounded-[3rem] opacity-60 blur-3xl"
              style={{ background: "radial-gradient(closest-side, rgba(242,163,60,0.35), transparent)" }}
            />
            <div className="neu-raised rounded-[2.5rem] p-2.5">
              <div className="relative aspect-[9/16] overflow-hidden rounded-[2rem] bg-bg">
                <ShortPlayer
                  id={VIDEO_ID}
                  title="Anish Singh Thakur on stage at the World Trading Championship"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-2.5 h-5 w-20 -translate-x-1/2 rounded-full bg-black/80"
                />
              </div>
            </div>
          </div>
          <a
            href={`https://www.youtube.com/shorts/${VIDEO_ID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-1.5 text-[0.8125rem] font-semibold text-fg-muted transition-colors duration-200 hover:text-fg"
          >
            Watch on YouTube
            <span aria-hidden>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
