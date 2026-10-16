/** The Pride Pool Terms and Conditions, verbatim from the approved document (Pride-Pool-Terms-and-Conditions.pdf). */
type Section = {
  heading: string;
  /** Numbered clauses (1.1, 1.2…). Sections without numbers in the document use `body` instead. */
  clauses?: string[];
  body?: string;
  /** Shown as a highlighted box (the risk disclosure) */
  callout?: boolean;
};

const SUMMARY = [
  { label: "Organiser", value: "Booming Bulls" },
  { label: "Broking partner", value: "Lemonn" },
  { label: "Campaign period", value: "17 Oct to 15 Nov 2026" },
  { label: "Winners announced", value: "15 Nov 2026" },
];

const SECTIONS: Section[] = [
  {
    heading: "Campaign period",
    clauses: [
      "Booming Bulls organises the Pride Pool campaign (“Campaign”). It runs from 17 October 2026 to 15 November 2026.",
      "Entries after the Campaign closes do not qualify for brokerage credits or laptop prizes.",
    ],
  },
  {
    heading: "Who can take part",
    clauses: [
      "You must be an Indian resident, aged 18 or above.",
      "You must hold a valid PAN and complete KYC with Lemonn.",
      "Employees of Booming Bulls, Lemonn, their group companies and agencies, and their immediate families, cannot take part.",
      "Each person may take part once. One PAN equals one entry.",
    ],
  },
  {
    heading: "How to take part",
    clauses: [
      "Sign up on pridepool.in during the Campaign period.",
      "Open a Lemonn account using the same mobile number and email used to sign up.",
      "Complete KYC and meet the eligibility criteria shown on pridepool.in within the Campaign period.",
    ],
  },
  {
    heading: "Brokerage credits from the ₹1 Crore pool",
    clauses: [
      "The total pool is ₹1,00,00,000 in brokerage credits.",
      "Eligible participants receive brokerage credits as shown on pridepool.in.",
      "Credits are allotted until the pool runs out. The live counter on pridepool.in shows the pool status.",
      "Credits are added to your Lemonn account after Booming Bulls confirms eligibility.",
      "Credits apply to brokerage charges only. They do not cover statutory charges such as STT, exchange charges, SEBI fees, stamp duty or GST.",
      "Credits are valid for the period shown on pridepool.in. Unused credits lapse on expiry.",
      "Credits have no cash value. You cannot withdraw, transfer or exchange them.",
    ],
  },
  {
    heading: "Laptop prizes",
    clauses: [
      "Booming Bulls gives laptops to winners chosen from eligible participants.",
      "One person can win one laptop only.",
      "Prizes cannot be exchanged for cash or any other item.",
      "Booming Bulls may replace a prize with one of equal or higher value.",
    ],
  },
  {
    heading: "Winner selection and announcement",
    clauses: [
      "Booming Bulls selects winners as per the criteria shown on pridepool.in.",
      "Winners are announced on 15 November 2026 on pridepool.in and the official social media channels of Booming Bulls and Lemonn.",
      "Booming Bulls contacts winners on their registered mobile number and email.",
      "Winners must respond within the time given in the message. If they do not, Booming Bulls may choose another winner.",
      "Booming Bulls’ decision on winners is final.",
    ],
  },
  {
    heading: "Prize delivery",
    clauses: [
      "Booming Bulls delivers prizes to the winner’s address in India after verification.",
      "Winners must share a valid ID and address proof before delivery.",
      "Booming Bulls is not responsible for delays caused by courier partners or wrong details shared by the winner.",
    ],
  },
  {
    heading: "Disqualification",
    clauses: [
      "Booming Bulls may disqualify any entry that uses fake details, multiple accounts, bots or any unfair method.",
      "Booming Bulls may take back credits or prizes given through such entries.",
    ],
  },
  {
    heading: "Your data",
    clauses: [
      "Booming Bulls uses your details to run the Campaign and contact winners.",
      "Booming Bulls handles your data as per its Privacy Policy.",
      "By taking part, you allow Booming Bulls to share winners’ names and cities publicly.",
      "By taking part, you allow Booming Bulls to share your details with Lemonn to verify eligibility and add brokerage credits.",
    ],
  },
  {
    heading: "Changes to the Campaign",
    clauses: [
      "Booming Bulls may change, pause or end the Campaign, or change these Terms, at any time. Updates will be posted on pridepool.in.",
      "Booming Bulls is not liable for any loss arising from such changes.",
    ],
  },
  {
    heading: "Liability",
    clauses: [
      "Booming Bulls organises and runs the Campaign. Lemonn is the broking partner.",
      "Booming Bulls is not liable for technical failures, network issues or any event outside its control.",
    ],
  },
  {
    heading: "Risk disclosure",
    body: "Investments in securities markets are subject to market risks. Read all related documents carefully before investing. Brokerage credits and prizes are promotional rewards and do not indicate any assured return.",
    callout: true,
  },
  {
    heading: "Governing law",
    body: "These Terms follow the laws of India.",
  },
  {
    heading: "Contact",
    body: "For questions, reach out to Booming Bulls support through its official website or social media channels.",
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

export default function Terms() {
  return (
    <section id="terms" className="arena-container relative isolate pb-24 lg:pb-32">
      <div
        className="pointer-events-none absolute inset-x-0 -top-16 -z-10 h-[28rem]"
        style={{ background: "radial-gradient(ellipse 60% 70% at 50% 0%, rgb(var(--glow) / 0.14), transparent 70%)" }}
      />
      <div className="mx-auto max-w-4xl">
        <p className="inline-flex rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[0.75rem] font-bold text-accent">Booming Bulls × Lemonn</p>
        <h1 id="terms-heading" className="mt-5 text-[clamp(2.25rem,6vw,4rem)] font-bold leading-[1.05] tracking-[-0.02em] text-fg">
          The Pride Pool
          <br />
          Terms and Conditions
        </h1>
        <p className="mt-3 text-[0.9375rem] font-bold text-fg-muted">pridepool.in</p>

        <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-b border-white/15 pb-8 sm:grid-cols-4">
          {SUMMARY.map((s) => (
            <div key={s.label}>
              <dt className="text-[0.8125rem] text-fg-subtle">{s.label}</dt>
              <dd className="mt-1 text-[0.9375rem] font-bold text-fg">{s.value}</dd>
            </div>
          ))}
        </dl>

        <ol>
          {SECTIONS.map((section, i) => (
            <li key={section.heading} id={`terms-${i + 1}`} className="scroll-mt-24 border-b border-white/[0.08] py-8 sm:py-10">
              <h2 className="flex items-center gap-3 text-[1.25rem] font-semibold tracking-[-0.01em] text-fg sm:text-[1.5rem]">
                <span className="rounded-md bg-accent/15 px-2 py-0.5 font-mono text-[0.75rem] font-bold text-accent sm:text-[0.8125rem]">{pad(i + 1)}</span>
                {section.heading}
              </h2>
              {section.clauses && (
                <ol className="mt-5 space-y-3">
                  {section.clauses.map((clause, j) => (
                    <li key={j} className="flex gap-4 text-pretty text-[0.9375rem] leading-[1.75] text-fg-muted sm:text-base">
                      <span className="w-8 shrink-0 font-bold text-fg-subtle">
                        {i + 1}.{j + 1}
                      </span>
                      <span>{clause}</span>
                    </li>
                  ))}
                </ol>
              )}
              {section.body && (
                <p
                  className={`mt-5 text-pretty text-[0.9375rem] leading-[1.75] sm:text-base ${section.callout ? "rounded-lg border-l-4 border-accent bg-accent/10 px-5 py-4 text-fg" : "text-fg-muted"}`}
                >
                  {section.body}
                </p>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
