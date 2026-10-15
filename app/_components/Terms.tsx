type Clause = { heading: string; points: string[] };

// Draft, not legally reviewed. [Bracketed] text = details still to be supplied or confirmed by Lemonn / legal.
// Written against what the campaign page itself says (hero, How to enter, Leaderboard, FAQ, Footer), so the two never disagree.
const CLAUSES: Clause[] = [
  {
    heading: "About these Terms",
    points: [
      "These Terms & Conditions (“Terms”) apply to the Pride Pool campaign (“the Campaign”) and to this campaign website (“the Site”). By joining the Campaign or using any benefit under it, you accept these Terms, Lemonn’s Privacy Policy [link] and the terms of your Lemonn trading account.",
      "If these Terms conflict with anything else on the Site (including the FAQ, banners, leaderboard or social posts), these Terms prevail. Your Lemonn account agreements continue to apply to all trading.",
    ],
  },
  {
    heading: "Definitions",
    points: [
      "“Lemonn”, “we” or “us” means [Lemonn legal entity name], a [SEBI-registered stock broker, registration no. INZ…], having its registered office at [address].",
      "“Booming Bulls” means [Booming Bulls Academy legal entity name], the Campaign partner.",
      "“Participant” or “you” means an individual who meets the eligibility conditions below.",
      "“Pool” means the total of ₹1,00,00,000 (₹1 Crore) of Brokerage Benefits made available under the Campaign. “Brokerage Pool” on the Site refers to this Pool; it is not cash.",
      "“Brokerage Benefits” means the brokerage Lemonn does not charge on Eligible Trades because it is paid from the Pool, as set out in these Terms.",
      "“Eligible Trade” means a trade placed and executed through your Lemonn account during the Campaign Period in [eligible segments, e.g. equity delivery, intraday, F&O].",
      "“Campaign Period” means the period stated in the Campaign period clause below.",
    ],
  },
  {
    heading: "Organiser and partner",
    points: [
      "The Campaign is organised and run by Lemonn. Lemonn alone issues Brokerage Benefits, runs the laptop giveaway and decides any question about the Campaign.",
      "The Campaign is run in association with Booming Bulls to celebrate Anish Singh Thakur’s result at the World Trading Championship. References to his result are [subject to verification of the championship result, as stated in the Site footer]. [Confirm the approved wording of the result, e.g. “World #2”.]",
      "Booming Bulls and Mr. Thakur do not give investment advice, recommendations or any assurance of returns as part of the Campaign, and are not responsible for Lemonn’s services. [Confirm the scope of the partnership.]",
      "The Campaign is subject to [the final agreement between Lemonn and Booming Bulls and any regulatory approvals]. If any of these is not obtained, Lemonn may change or withdraw the Campaign under the Changes clause below.",
    ],
  },
  {
    heading: "Campaign period",
    points: [
      "The Campaign runs from [start date] to [end date], both days inclusive, Indian Standard Time (IST). The live dates are also shown on the Site’s leaderboard.",
      "Brokerage Benefits are available only for Eligible Trades executed within the Campaign Period, and only while the Pool lasts, whichever ends first.",
    ],
  },
  {
    heading: "Eligibility",
    points: [
      "You can take part only if you are an individual resident in India, aged 18 or above, and hold an active Lemonn trading account with KYC completed and in good standing.",
      "Existing Lemonn customers are included automatically; no separate registration is needed.",
      "New customers take part by signing up through the Campaign link on the Site and completing Lemonn’s account-opening process [by deadline, if any]. Account opening is subject to Lemonn’s usual checks and may be refused under its policies and applicable law.",
      "Not eligible: [employees of Lemonn and Booming Bulls and their immediate family members; non-individual, joint, HUF, NRI or institutional accounts; algorithmic or API trading accounts — confirm list]. One Participant may hold only one account for the Campaign.",
    ],
  },
  {
    heading: "How to take part",
    points: [
      "Tap “Join the ₹1 Crore Pool” on the Site and sign up or log in on Lemonn, then place Eligible Trades during the Campaign Period.",
      "Joining the Campaign is free. [Confirm: there is no minimum trade, deposit or activity requirement to join.]",
      "The Site never asks for your mobile number, OTP, password, bank details or any other personal details. Lemonn will never ask for your OTP or password by phone, email or message about the Campaign; do not share them.",
      "Joining does not guarantee any specific amount of Brokerage Benefits or any prize.",
    ],
  },
  {
    heading: "Brokerage Benefits from the Pool",
    points: [
      "The Pool is shared by all Participants. There is no individual cap: Brokerage Benefits are applied to the brokerage on your Eligible Trades as they are executed, until the Pool is used up or the Campaign Period ends, whichever comes first. [Confirm this mechanism.]",
      "Once the Pool is used up, normal brokerage applies to all further trades, even if the Campaign Period has not ended. The amount used and remaining, shown on the Site, is indicative; Lemonn’s records are final.",
      "Brokerage Benefits apply only to brokerage. They do not cover taxes or statutory and other charges, including Securities Transaction Tax (STT), stamp duty, GST, exchange transaction charges, SEBI turnover fees, DP charges, clearing charges, call-and-trade or auto square-off charges, interest or any penalty.",
      "Brokerage Benefits have no cash value. They cannot be withdrawn, transferred, sold, exchanged or moved to another account, and they lapse at the end of the Campaign Period or when the Pool is used up. [Confirm whether any unused balance survives the Campaign Period, and if so, its expiry date.]",
      "If a trade is cancelled, reversed or found not to be an Eligible Trade, Lemonn may reverse the Brokerage Benefit applied to it.",
    ],
  },
  {
    heading: "Leaderboard",
    points: [
      "The leaderboard on the Site ranks Participants by the brokerage they have saved from the Pool during the Campaign Period, as recorded by Lemonn. It is updated periodically and shows a last-updated time; it may lag behind Lemonn’s records. [Confirm the ranking rule, update frequency and tie-break rule.]",
      "Participants are shown by a partly masked name (for example, the first and last letters of each name, with the rest hidden), the amount saved and rank. No phone number, client code or account details are shown. [Confirm Participants are told about, and may opt out of, leaderboard display.]",
      "The leaderboard is for information only. A leaderboard position does not by itself entitle anyone to any reward or guarantee a laptop. Lemonn’s records are final if they differ from the leaderboard.",
    ],
  },
  {
    heading: "Laptop giveaway",
    points: [
      "20 laptops will be given away to Participants. [Model and specifications to be confirmed.]",
      "Winners are selected by [selection method, e.g. a draw in which each Participant’s chances are weighted by their eligible brokerage usage from the Pool]. Higher eligible usage increases a Participant’s chance of winning but does not guarantee a win. [The full giveaway rules, entry cut-off and draw date must be published before launch, and the method confirmed as permissible under applicable law.]",
      "A Participant can win at most [one] laptop. Winners will be announced on Lemonn [channel] by [date] and contacted through their registered Lemonn contact details. A winner who does not respond and complete verification within [7] days may forfeit the prize, and Lemonn may select another winner.",
      "Prizes are non-transferable and cannot be exchanged for cash or another item, except that Lemonn may substitute a laptop of equal or higher value if the stated model is unavailable. Delivery is free to an address in India. Warranty and after-sales service are provided by the manufacturer.",
      "Any tax on prizes, including tax deducted at source under the Income-tax Act, 1961 [section to be confirmed], is borne by the winner and must be paid or deducted before the prize is handed over. Winners may need to provide their PAN and sign an acceptance form.",
    ],
  },
  {
    heading: "Fair use and disqualification",
    points: [
      "Lemonn may disqualify a Participant, withhold or reverse Brokerage Benefits, and withdraw a prize, if it reasonably believes there has been fraud, misuse, multiple or fake accounts, collusion, self-trades, circular, wash or synthetic trades, trades placed mainly to use up the Pool, use of bots or scripts to exploit the Campaign, or any breach of these Terms, Lemonn’s account terms, exchange rules or applicable law.",
      "Lemonn’s decision on eligibility, Brokerage Benefits, rankings and prizes is final, subject to applicable law and your right to raise a grievance below.",
    ],
  },
  {
    heading: "Not investment advice; market risk",
    points: [
      "Investments in the securities market are subject to market risks; read all the related documents carefully before investing.",
      "Nothing on the Site or in the Campaign, including the leaderboard, the championship story or any statement by Mr. Thakur or Booming Bulls, is investment advice, a research recommendation or a solicitation to buy or sell any security, or to trade more or more often. Past performance, including any championship result, does not indicate future returns.",
      "Brokerage Benefits lower your brokerage cost only. They do not reduce market risk, and you remain fully responsible for your trading decisions, losses and margin obligations. Please trade only within your means and risk appetite.",
    ],
  },
  {
    heading: "Third-party links and content",
    points: [
      "The Site links to Lemonn’s sign-up and app pages [stocks.trade-kar.com — confirm domain] and embeds a YouTube video, which loads only when you tap it. Those services are governed by their own terms and privacy policies, and Lemonn is not responsible for third-party content or services.",
    ],
  },
  {
    heading: "Privacy",
    points: [
      "The Site does not ask you for personal details. The leaderboard is built from Lemonn’s records and shows only masked names and amounts.",
      "Lemonn processes your personal data for the Campaign (eligibility, Brokerage Benefits, leaderboard, prize selection, delivery and tax compliance) under its Privacy Policy [link] and the Digital Personal Data Protection Act, 2023. Lemonn does not share your personal data with Booming Bulls except [confirm, e.g. none / winners’ first names for announcements, with consent].",
      "The Site may record anonymous usage, such as which Join button was tapped, to measure the Campaign. [Confirm analytics tools and cookies used, if any.]",
      "Winners may be asked to consent to their name, city and photo being used in Campaign announcements. Refusing consent does not affect the prize.",
    ],
  },
  {
    heading: "Intellectual property",
    points: [
      "The Site, its content, design and artwork, and the Lemonn and Booming Bulls names and logos belong to their respective owners. The championship video belongs to its owner and is shown under YouTube’s terms. You may not copy or reuse them without permission, except to share links to the Site.",
    ],
  },
  {
    heading: "Changes, suspension and withdrawal",
    points: [
      "Lemonn may modify, extend, suspend or withdraw the Campaign or these Terms at any time, including for regulatory reasons, technical failure, suspected fraud or events outside its control. Changes take effect when published on this page with a new “Last updated” date. Continued participation means you accept the change.",
      "Brokerage Benefits already applied to executed Eligible Trades will not be reversed because of a change, except under the Fair use clause above.",
    ],
  },
  {
    heading: "Limitation of liability",
    points: [
      "To the extent permitted by law, Lemonn, Booming Bulls and Mr. Thakur are not liable for any indirect, incidental or consequential loss arising from the Campaign or the Site, including trading losses, lost opportunities, or delays and errors in the leaderboard, Site or app.",
      "Lemonn’s total liability to a Participant in connection with the Campaign is limited to the value of the Brokerage Benefits or prize that Participant was entitled to and did not receive.",
      "Lemonn is not responsible for failure or delay caused by events beyond its reasonable control, including exchange or depository outages, network failures, regulatory action or natural events.",
    ],
  },
  {
    heading: "Grievances",
    points: [
      "For any question or complaint about the Campaign, contact Lemonn’s grievance officer: [name, email, phone]. Lemonn will respond within [timeline as per SEBI norms].",
      "If your complaint is not resolved satisfactorily, you may escalate it through SEBI SCORES (scores.sebi.gov.in) and the Online Dispute Resolution portal, SMART ODR (smartodr.in).",
    ],
  },
  {
    heading: "Governing law and jurisdiction",
    points: [
      "These Terms are governed by the laws of India. Subject to the dispute-resolution mechanisms available under SEBI regulations, the courts at [city] have exclusive jurisdiction.",
    ],
  },
  {
    heading: "General",
    points: [
      "If any part of these Terms is found unenforceable, the rest remains in effect. A delay in enforcing any right is not a waiver of it.",
      "These Terms may be published in other languages; if they differ, the English version prevails.",
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
      className="arena-container relative isolate pb-24 lg:pb-32"
    >
      <div
        className="pointer-events-none absolute inset-x-0 -top-16 -z-10 h-[28rem]"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 50% 0%, rgb(var(--glow) / 0.14), transparent 70%)",
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
          className="mx-auto mt-8 block h-px w-3/4 bg-gradient-to-r from-transparent via-accent/70 to-transparent"
        />
        <p className="mt-10 flex items-start gap-2.5 text-[0.875rem] font-semibold leading-relaxed text-accent">
          <svg viewBox="0 0 16 16" width="15" height="15" fill="none" className="mt-[0.2rem] shrink-0">
            <path
              fill="currentColor"
              d="M7.1 1.9a1 1 0 0 1 1.8 0l6 11A1 1 0 0 1 14 14.5H2a1 1 0 0 1-.9-1.6l6-11ZM8 5.5a.8.8 0 0 0-.8.9l.3 3a.5.5 0 0 0 1 0l.3-3A.8.8 0 0 0 8 5.5Zm0 5.3a.85.85 0 1 0 0 1.7.85.85 0 0 0 0-1.7Z"
            />
          </svg>
          Draft — these terms have not been legally reviewed or approved for
          publication. Highlighted text marks details still to be supplied.
        </p>
        <p className="mt-6 text-[0.9375rem] text-fg-muted">
          Last updated: <ClauseBody text="[date]" />
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
