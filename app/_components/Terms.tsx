type Clause = { heading: string; points: string[] };

// Draft, not legally reviewed. [Bracketed] text = details still to be supplied.
const CLAUSES: Clause[] = [
  {
    heading: "Organiser and partner",
    points: [
      "The Pride Pool campaign (\u201cthe Campaign\u201d) is run by [Lemonn legal entity name, registered address and SEBI registration number] (\u201cLemonn\u201d).",
      "The Campaign is run in association with Booming Bulls Academy to celebrate Anish Singh Thakur\u2019s achievement at the World Trading Championship.",
      "[Confirm: Booming Bulls Academy\u2019s role is limited to announcing the Campaign, and it gives no investment advice, recommendations or claims about returns as part of it.]",
    ],
  },
  {
    heading: "Campaign period",
    points: [
      "The Campaign runs from [start date] to [end date], both days inclusive (Indian Standard Time).",
      "Lemonn may extend the Campaign or end it early under clause 10.",
    ],
  },
  {
    heading: "Eligibility",
    points: [
      "The Campaign is open to resident Indian individuals aged 18 or above who hold an active Lemonn trading account with completed KYC.",
      "Existing Lemonn customers are part of the Campaign automatically and do not need to sign up.",
      "New customers join by opening a Lemonn account through the Campaign link. [Account-opening deadline to be confirmed.]",
      "[Exclusions \u2014 e.g. employees, non-individual or algo-trading accounts \u2014 to be confirmed.]",
    ],
  },
  {
    heading: "How to join",
    points: [
      "Tap \u201cJoin the \u20b91 Crore Pool\u201d and follow the steps on Lemonn.",
      "This page does not collect a mobile number, OTP or any other personal details.",
      "[Confirm: joining is free and has no minimum trading or activity requirement.]",
    ],
  },
  {
    heading: "Brokerage credits",
    points: [
      "Credits can be used only to pay brokerage on [eligible segments, e.g. equity delivery, intraday, F&O] trades placed on Lemonn.",
      "Credits have no cash value and cannot be withdrawn, transferred, exchanged or moved to another account.",
      "Taxes and statutory charges still apply, including STT, stamp duty, GST, exchange transaction charges, SEBI turnover fees and DP charges.",
      "Unused credits expire on [expiry date] and lapse without compensation.",
    ],
  },
  {
    heading: "Pool size and allocation",
    points: [
      "Total credits across all participants are capped at \u20b91 Crore. Once the pool is used up, no further credits are issued, even if the Campaign period has not ended.",
      "Joining does not guarantee any credits or a specific amount. [Allocation method, including any per-participant limit, to be published before launch.]",
    ],
  },
  {
    heading: "Laptop giveaway",
    points: [
      "20 laptops will be given away to participants. [Selection method \u2014 e.g. random draw or leaderboard rank \u2014 to be confirmed.]",
      "[Eligibility, entry period, results date, winner notification, laptop model and any tax (TDS) on prizes to be confirmed.]",
      "Prizes are non-transferable and cannot be exchanged for cash.",
    ],
  },
  {
    heading: "Leaderboard",
    points: [
      "The leaderboard shows brokerage credits used by participants. It is for information only and does not by itself entitle anyone to a reward.",
      "[Ranking rule, update frequency and tie-break to be published before launch.]",
      "Participants appear as [display format, e.g. first name and last initial]. No phone number or account details are shown.",
    ],
  },
  {
    heading: "Fair use and disqualification",
    points: [
      "Lemonn may disqualify a participant and withdraw or reverse credits in case of fraud, misuse, multiple or fake accounts, trades placed only to use up credits, or any breach of these terms.",
      "Lemonn\u2019s decision on eligibility and disqualification is final, subject to applicable law.",
    ],
  },
  {
    heading: "Changes, suspension and withdrawal",
    points: [
      "Lemonn may modify, extend, suspend or withdraw the Campaign or these terms at any time. Changes take effect when published on this page, with an updated date.",
      "[Confirm: credits already issued stay valid until their expiry date unless withdrawn under clause 9.]",
    ],
  },
  {
    heading: "Limitation of liability",
    points: [
      "To the extent permitted by law, neither Lemonn nor Booming Bulls Academy is liable for any indirect or consequential loss arising from participation, including trading losses.",
      "Brokerage credits and the leaderboard are not investment advice, and are not a recommendation to buy, sell or trade any security or to trade more often.",
    ],
  },
  {
    heading: "Privacy",
    points: [
      "Any personal data is processed under Lemonn\u2019s Privacy Policy [link to privacy policy].",
      "This page itself does not collect personal details.",
    ],
  },
  {
    heading: "Grievances",
    points: [
      "For any complaint about the Campaign, contact [grievance officer name, email and phone].",
      "If your complaint is not resolved, you may escalate it through SEBI SCORES (scores.sebi.gov.in) and the SMART ODR portal (smartodr.in).",
    ],
  },
  {
    heading: "Governing law",
    points: [
      "These terms are governed by the laws of India. Disputes are subject to the exclusive jurisdiction of the courts at [city].",
    ],
  },
  {
    heading: "Risk disclosure",
    points: [
      "Investments in the securities market are subject to market risks; read all the related documents carefully before investing.",
      "Brokerage credits lower trading costs. They do not reduce market risk.",
    ],
  },
];

function ClauseBody({ text }: { text: string }) {
  return text.split(/(\[[^\]]+\])/).map((part, i) =>
    part.startsWith("[") ? (
      <mark
        key={i}
        className="rounded bg-accent/12 px-1 py-px font-medium text-accent"
      >
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

export default function Terms() {
  return (
    <section
      id="terms"
      aria-labelledby="terms-heading"
      className="arena-container relative isolate pb-24 lg:pb-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-16 -z-10 h-[28rem]"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 50% 0%, rgba(177,69,201,0.14), transparent 70%)",
        }}
      />
      <div className="mx-auto max-w-4xl">
        <h1
          id="terms-heading"
          className="text-center text-[clamp(2.25rem,6vw,4rem)] font-bold leading-tight tracking-[-0.02em] text-fg"
        >
          Terms &amp; Conditions
        </h1>
        <span
          aria-hidden
          className="mx-auto mt-8 block h-px w-3/4 bg-gradient-to-r from-transparent via-accent/70 to-transparent"
        />
        <p className="mt-10 flex items-start gap-2.5 text-[0.875rem] font-semibold leading-relaxed text-accent">
          <svg aria-hidden viewBox="0 0 16 16" width="15" height="15" fill="none" className="mt-[0.2rem] shrink-0">
            <path
              fill="currentColor"
              d="M7.1 1.9a1 1 0 0 1 1.8 0l6 11A1 1 0 0 1 14 14.5H2a1 1 0 0 1-.9-1.6l6-11ZM8 5.5a.8.8 0 0 0-.8.9l.3 3a.5.5 0 0 0 1 0l.3-3A.8.8 0 0 0 8 5.5Zm0 5.3a.85.85 0 1 0 0 1.7.85.85 0 0 0 0-1.7Z"
            />
          </svg>
          Draft — these terms have not been legally reviewed or approved for
          publication. Highlighted text marks details still to be supplied.
        </p>
        <p className="mt-6 text-[0.9375rem] text-fg-muted">
          Effective Date: <ClauseBody text="[date]" />
        </p>
        <p className="mt-8 text-pretty text-[0.9375rem] leading-[1.8] text-fg-muted sm:text-base">
          These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern
          participation in the Pride Pool campaign. Please read them carefully.
          By joining the Campaign, you agree to be bound by these Terms and by
          Lemonn&rsquo;s Privacy Policy. If you do not agree, do not join.
        </p>
        <ol className="mt-4">
          {CLAUSES.map((clause, i) => (
            <li key={clause.heading} id={`terms-${i + 1}`} className="scroll-mt-24 pt-10 sm:pt-12">
              <h2 className="text-[1.375rem] font-semibold tracking-[-0.01em] text-fg sm:text-[1.75rem]">
                {i + 1}. {clause.heading}
              </h2>
              {clause.points.map((point, j) => (
                <p
                  key={j}
                  className="mt-4 text-pretty text-[0.9375rem] leading-[1.8] text-fg-muted sm:text-base"
                >
                  <ClauseBody text={point} />
                </p>
              ))}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
