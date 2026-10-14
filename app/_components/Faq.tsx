"use client";

import { useId, useState } from "react";

const FAQS: { q: string; a: string }[] = [
  {
    q: "What is the Pride Pool?",
    a: "The Pride Pool is a shared ₹1 crore brokerage pool for eligible Lemonn customers, along with a giveaway of 20 laptops.",
  },
  {
    q: "I’m already a Lemonn customer. Do I need to register?",
    a: "No. Existing Lemonn customers are automatically included. No separate campaign registration is needed. Campaign eligibility terms apply.",
  },
  {
    q: "How can new customers participate?",
    a: "Sign up through the campaign link and complete Lemonn’s account-opening process to participate, subject to campaign eligibility.",
  },
  {
    q: "Is there a limit on how much brokerage I can use from the pool?",
    a: "There is no individual usage cap. The total shared pool is ₹1 crore, and benefits are available while the pool lasts during the campaign period.",
  },
  {
    q: "How can I win a laptop?",
    a: "There are 20 laptops in the giveaway. Higher eligible brokerage usage from the pool increases your chance of winning. It does not guarantee a win. The published giveaway rules explain the selection process.",
  },
  {
    q: "Does this mean all trading charges are waived?",
    a: "No. The benefit applies to eligible brokerage. Applicable taxes, statutory charges and other charges still apply, as detailed in the campaign terms.",
  },
  {
    q: "Where can I track my usage?",
    a: "Check the campaign leaderboard above and its last-updated timestamp. Your leaderboard position does not guarantee a laptop.",
  },
];

function Chevron({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-[color,box-shadow] duration-200 ${
        open
          ? "neu-inset text-accent"
          : "neu-raised text-fg-subtle"
      }`}
    >
      <svg
        viewBox="0 0 16 16"
        width="13"
        height="13"
        fill="none"
        className={`transition-transform duration-300 ease-arena-out ${open ? "rotate-180" : ""}`}
      >
        <path
          d="M3.5 6 8 10.5 12.5 6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default function Faq() {
  const baseId = useId();

  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faqs"
      aria-labelledby="faqs-heading"
      className="arena-container relative pb-20 lg:pb-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-4 h-72 w-[40rem] max-w-full -translate-x-1/2 opacity-70 blur-[110px]"
        style={{
          background:
            "radial-gradient(closest-side, var(--color-violet-deep), transparent)",
        }}
      />
      <div className="relative mx-auto max-w-4xl min-[1920px]:max-w-5xl">
        <div data-reveal className="text-center">
          <p className="section-label neu-inset">
            <span aria-hidden className="section-label-dot" />
            FAQ
          </p>
          <h2
            id="faqs-heading"
            className="mt-4 text-[clamp(1.75rem,4.5vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.025em] text-fg [text-shadow:0_0_50px_rgba(177,69,201,0.5)]"
          >
            Frequently Asked Questions
          </h2>
        </div>
        <div className="mt-10">
      <ul className="relative space-y-2.5">
        {FAQS.map((faq, i) => {
          const isOpen = open === i;
          const buttonId = `${baseId}-q-${i}`;
          const panelId = `${baseId}-a-${i}`;

          return (
            <li
              key={faq.q}
              data-reveal="near"
              style={
                { "--reveal-delay": `${Math.min(0.06 + i * 0.05, 0.34).toFixed(3)}s` } as React.CSSProperties
              }
              className={`overflow-hidden rounded-xl md:transition-shadow md:duration-300 ${
                isOpen ? "neu-inset" : "neu-raised"
              }`}
            >
              <h3>
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 rounded-xl px-4 py-4 text-left focus-visible:shadow-[inset_0_0_0_2px_var(--color-focus)] focus-visible:outline-none sm:px-5"
                >
                  <span
                    className={`text-[0.9375rem] font-bold leading-snug transition-colors duration-200 ${
                      isOpen ? "text-accent" : "text-fg"
                    }`}
                  >
                    {faq.q}
                  </span>
                  <Chevron open={isOpen} />
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                inert={!isOpen}
                className={`grid md:transition-[grid-template-rows] md:duration-300 md:ease-arena-out ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className={`max-w-[78ch] px-4 pb-4 pr-10 text-[0.875rem] leading-relaxed text-fg/90 transition-opacity duration-300 sm:px-5 sm:pb-5 sm:pr-12 ${isOpen ? "opacity-100" : "opacity-0"}`}>
                    {faq.a}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
        </div>
      </div>
    </section>
  );
}
