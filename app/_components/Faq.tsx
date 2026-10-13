"use client";

import { useId, useState } from "react";

const FAQS: { q: string; a: string }[] = [
  {
    q: "What is the Lemonn × Booming Bulls campaign?",
    a: "This campaign celebrates Anish Singh Thakur's achievement at the World Trading Championship. Final campaign details and participation rules are awaiting approval.",
  },
  {
    q: "What is the ₹1 Crore Brokerage Credits Pool?",
    a: "The campaign is planned around a ₹1 Crore brokerage credits pool. The allocation, eligibility, and redemption rules have not yet been finalized.",
  },
  {
    q: "Who can participate?",
    a: "Eligibility requirements for new and existing Lemonn users are awaiting confirmation. Please check the final campaign terms once they are published.",
  },
  {
    q: "How do I join the campaign?",
    a: "Tap “Join the ₹1 Crore Pool”. That is the only step on this page — there is no form to fill in. Existing Lemonn customers are part of the pool automatically.",
  },
  {
    q: "Do I need to share my mobile number or an OTP here?",
    a: "No. This page does not ask for a mobile number, an OTP or any other personal details.",
  },
  {
    q: "How will brokerage credits be allocated?",
    a: "The allocation method, applicable conditions, and any eligibility restrictions have not yet been approved.",
  },
  {
    q: "Is there a laptop giveaway?",
    a: "Yes. 20 laptops will be given away to participants. How winners are chosen, who is eligible and when results are announced are still to be confirmed, and will be published in the terms.",
  },
  {
    q: "Where can I find the campaign rules?",
    a: "The draft terms are on the Terms & Conditions page, linked in the footer. The final terms will be published after business and legal review.",
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
          <p className="inline-flex items-center gap-2 rounded-full neu-inset px-3.5 py-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-accent">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_2px_rgba(177,69,201,0.6)]" />
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
                  <p className={`max-w-[78ch] px-4 pb-4 pr-10 text-[0.875rem] leading-relaxed text-fg-muted transition-opacity duration-300 sm:px-5 sm:pb-5 sm:pr-12 ${isOpen ? "opacity-100" : "opacity-0"}`}>
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
