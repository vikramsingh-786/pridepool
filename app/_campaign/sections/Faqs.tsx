import { useId, useState } from 'react';

/** FAQ — the questions from the live site, in the V4 accordion. */
const FAQS = [
  {
    q: 'What is the Pride Pool?',
    a: 'The Pride Pool is a shared ₹1 crore brokerage pool for eligible Lemonn customers, along with a giveaway of 20 laptops.',
  },
  {
    q: 'I’m already a Lemonn customer. Do I need to register?',
    a: 'No. Existing Lemonn customers are automatically included. No separate campaign registration is needed. Campaign eligibility terms apply.',
  },
  {
    q: 'How can new customers participate?',
    a: 'Sign up through the campaign link and complete Lemonn’s account-opening process to participate, subject to campaign eligibility.',
  },
  {
    q: 'Is there a limit on how much brokerage I can use from the pool?',
    a: 'There is no individual usage cap. The total shared pool is ₹1 crore, and benefits are available while the pool lasts during the campaign period.',
  },
  {
    q: 'How can I win a laptop?',
    a: 'There are 20 laptops in the giveaway. Higher eligible brokerage usage from the pool increases your chance of winning. It does not guarantee a win. The published giveaway rules explain the selection process.',
  },
  {
    q: 'Does this mean all trading charges are waived?',
    a: 'No. The benefit applies to eligible brokerage. Applicable taxes, statutory charges and other charges still apply, as detailed in the campaign terms.',
  },
  {
    q: 'Where can I track my usage?',
    a: 'Check the campaign leaderboard above and its last-updated timestamp. Your leaderboard position does not guarantee a laptop.',
  },
];

export default function Faqs() {
  const id = useId();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faqs" aria-labelledby="faqs-heading" className="fold arena-container relative py-12 lg:py-16">
      <div className="relative mx-auto max-w-3xl">
        <div data-reveal="true" className="text-center">
          <p className="inline-flex items-center gap-2 rounded-full neu-inset px-3.5 py-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-accent">
            <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-accent" />
            FAQ
          </p>
          <h2 id="faqs-heading" className="mt-4 text-[clamp(1.75rem,5vw,2.5rem)] font-extrabold leading-[1.08] tracking-[-0.025em] text-fg">
            Questions before you join
          </h2>
        </div>

        <ul className="mt-8 space-y-2.5 lg:mt-10">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q} data-reveal="near" style={{ '--reveal-delay': `${0.05 * i}s` }} className={`overflow-hidden rounded-xl ${isOpen ? 'neu-inset' : 'neu-raised'}`}>
                <h3>
                  <button
                    type="button"
                    id={`${id}-q${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`${id}-a${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex min-h-14 w-full items-center justify-between gap-4 px-4 py-3.5 text-left sm:px-5"
                  >
                    <span className={`text-[0.9375rem] font-bold leading-snug ${isOpen ? 'text-accent' : 'text-fg'}`}>{item.q}</span>
                    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true" className={`shrink-0 text-fg-subtle transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                      <path d="M3.5 6 8 10.5 12.5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </h3>
                <div id={`${id}-a${i}`} role="region" aria-labelledby={`${id}-q${i}`} inert={!isOpen} className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden">
                    <p className="px-4 pb-4 text-[0.875rem] leading-relaxed text-fg-muted sm:px-5 sm:pb-5">{item.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <p className="mt-5 text-center text-sm text-fg-subtle">
          Full rules: <a href="/terms-and-conditions" className="inline-flex min-h-12 items-center font-semibold text-fg-muted underline decoration-white/30 underline-offset-4 hover:text-fg">Campaign terms</a>
        </p>
      </div>
    </section>
  );
}
