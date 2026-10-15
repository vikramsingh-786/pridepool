import JoinButton from '../components/JoinButton';
import { ANISH, LAPTOPS, OPEN_APP_URL, POOL } from '../content';

function Corner({ className }: { className: string }) {
  return <span aria-hidden="true" className={`absolute h-5 w-5 border-accent/60 ${className}`} />;
}

function Check() {
  return (
    <span aria-hidden="true" className="neu-inset flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-accent">
      <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
        <path d="m3.5 8.5 3 3 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/** The last, biggest Join moment: a recap of all three touchpoints, the Join button and trust lines. */
export default function FinalCall() {
  const recap = [
    `Celebrate ${ANISH.name}, World ${ANISH.rank}`,
    `${POOL.amount} brokerage credits pool`,
    `${LAPTOPS.count} laptops for participants`,
  ];

  return (
    <section id="join" aria-labelledby="join-heading" className="fold snap-start arena-container relative py-10 lg:py-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-[40rem] max-w-full -translate-x-1/2 -translate-y-1/2 opacity-60 blur-[110px]"
        style={{ background: 'radial-gradient(closest-side, var(--color-violet-deep), transparent)' }}
      />
      <div className="relative mx-auto max-w-2xl">
        <Corner className="-left-2 -top-2 border-l-2 border-t-2" />
        <Corner className="-right-2 -top-2 border-r-2 border-t-2" />
        <Corner className="-bottom-2 -left-2 border-b-2 border-l-2" />
        <Corner className="-bottom-2 -right-2 border-b-2 border-r-2" />

        <div className="arena-beam rounded-3xl p-px shadow-[0_40px_90px_-40px_rgba(0,0,0,1)]">
          <div className="relative overflow-hidden rounded-[calc(1.5rem-1px)] bg-bg/95 px-5 py-9 text-center sm:px-10 sm:py-12">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage: 'linear-gradient(var(--color-violet) 1px, transparent 1px), linear-gradient(90deg, var(--color-violet) 1px, transparent 1px)',
                backgroundSize: '26px 26px',
              }}
            />
            <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

            <div data-reveal="true" className="relative">
              <p className="inline-flex items-center gap-2 rounded-full neu-inset px-3.5 py-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-accent">
                <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-accent" />
                Final call
              </p>
              <h2
                id="join-heading"
                className="mt-4 text-[clamp(1.875rem,6vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-fg [text-shadow:0_0_50px_rgb(var(--glow)/0.45)]"
              >
                Enter the Pride Pool
              </h2>

              <ul className="mx-auto mt-6 inline-flex flex-col gap-3 text-left">
                {recap.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[0.9375rem] font-semibold text-fg sm:text-base">
                    <Check />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Kept outside the fade-in so the button is never invisible while on screen */}
            <div className="relative mt-8">
              <JoinButton location="final" className="mx-auto max-w-[26rem]" />
              <p className="mt-3 text-[0.8125rem] font-semibold text-fg-muted lg:text-sm">
                Already on Lemonn? You’re already in.{' '}
                <a href={OPEN_APP_URL} className="inline-flex min-h-12 items-center text-fg underline decoration-white/30 underline-offset-4 hover:decoration-white">
                  Open the app
                </a>
              </p>
            </div>

            <div className="relative mt-4 flex flex-col items-center justify-center gap-x-6 gap-y-1 border-t border-white/10 pt-5 text-xs text-fg-subtle sm:flex-row">
              <span className="inline-flex items-center gap-2">
                <svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="7" width="10" height="7" rx="1.5" />
                  <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
                </svg>
                No OTP or personal details asked here
              </span>
              <a href="/terms-and-conditions" className="inline-flex min-h-12 items-center gap-1 font-semibold text-fg-muted hover:text-fg sm:min-h-0">
                Campaign terms <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
