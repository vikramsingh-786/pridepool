import Placeholder from "./Placeholder";
import RankTable from "./RankTable";
import ConsoleError from "./ConsoleError";
import { getTopBrokerageSavings, type BoardEntry, type Contest, type LeaderboardStatus } from "../_lib/trading-api";

type Medal = {
  text: string;
  ring: string;
  glow: string;

  side: string;

  pad: string;
  icon: "crown" | "medal";
};

const MEDALS: Record<number, Medal> = {
  1: {
    text: "text-gold",
    ring: "border-gold/45",
    glow: "rgba(255,201,120,0.40)",
    side: "#d4a24c",
    pad: "py-7 sm:py-9",
    icon: "crown",
  },
  2: {
    text: "text-silver",
    ring: "border-silver/35",
    glow: "rgba(217,217,232,0.26)",
    side: "#b4b4c2",
    pad: "py-5 sm:py-6",
    icon: "medal",
  },
  3: {
    text: "text-bronze",
    ring: "border-bronze/35",
    glow: "rgba(224,154,98,0.28)",
    side: "#c98c5c",
    pad: "py-4 sm:py-5",
    icon: "medal",
  },
};

const PODIUM_ORDER = ["order-2", "order-1", "order-3"];

const PODIUM_DELAY: Record<number, string> = { 1: "0.48s", 2: "0.34s", 3: "0.22s" };

function PodiumCard({
  entry,
  orderClass,
}: {
  entry: BoardEntry;
  orderClass: string;
}) {
  const delay = PODIUM_DELAY[entry.rank];
  const medal = MEDALS[entry.rank];
  return (
    <li
      data-reveal="near"
      style={{ "--reveal-delay": delay, "--key-side": medal.side } as React.CSSProperties}
      className={`relative min-w-0 rounded-xl border ${medal.ring} ${medal.pad} ${orderClass} key-cap mb-2 px-2 text-center sm:px-4`}
    >
      {entry.rank === 1 ? (
        <span
          className="pointer-events-none absolute -inset-3 -z-10 rounded-3xl opacity-70 blur-2xl"
          style={{ background: "radial-gradient(closest-side, rgba(255,201,120,0.55), transparent)" }}
        />
      ) : null}
      <span
        className="pointer-events-none absolute inset-x-0 top-0 h-24 rounded-t-xl"
        style={{
          background: `radial-gradient(ellipse 70% 100% at 50% 0%, ${medal.glow}, transparent)`,
        }}
      />
      <span
        className={`relative mx-auto mb-2.5 flex h-9 w-9 items-center justify-center rounded-full border ${medal.ring} key-cap-sm ${medal.text}`}
      >
        {medal.icon === "crown" ? (
          <svg viewBox="0 0 24 24" width="17" height="17" fill="none">
            <path d="M4 17h16M4 17 3 7l5 3.5L12 5l4 5.5L21 7l-1 10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="17" height="17" fill="none">
            <path d="M12 14a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 0V9M8 3h8l-2.5 6h-3L8 3Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span
        className={`relative block font-mono text-2xl font-bold leading-none sm:text-[1.75rem] ${medal.text}`}
      >
        {entry.rank}
      </span>
      <p className="relative mt-2.5 truncate text-[0.8125rem] font-bold text-fg sm:text-[0.9375rem]">
        {entry.participant}
      </p>
      <p
        className={`relative mt-1 font-mono text-[0.8125rem] font-bold tabular-nums sm:text-sm ${medal.text}`}
      >
        {entry.display}
      </p>
      <p className="relative mt-0.5 text-[0.625rem] font-bold uppercase tracking-[0.12em] text-fg-subtle">
        Brokerage saved
      </p>
    </li>
  );
}

const STATUS_CHIP: Record<LeaderboardStatus, string> = {
  ready: "Live",
  empty: "No entries yet",
  unavailable: "Unavailable",
};

const NOTICE: Record<"empty" | "unavailable", { title: string; body: string }> = {
  empty: {
    title: "No standings yet",
    body: "Nobody has been ranked yet. Standings will appear here once entries are counted under the approved rules.",
  },
  unavailable: {
    title: "Standings unavailable",
    body: "Standings couldn’t be loaded right now. Please check back in a minute.",
  },
};

function Notice({ kind }: { kind: "empty" | "unavailable" }) {
  const n = NOTICE[kind];
  return (
    <div className="flex flex-col items-center px-6 py-8 text-center sm:py-10">
      <span
        className="flex h-14 w-14 items-center justify-center rounded-2xl neu-inset text-violet"
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
          <path
            d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4ZM7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <h3 className="mt-5 text-lg font-bold text-fg">
        <Placeholder>{n.title}</Placeholder>
      </h3>
      <p className="mt-2 max-w-[46ch] text-pretty text-[0.875rem] leading-relaxed text-fg-muted">
        <Placeholder>{n.body}</Placeholder>
      </p>
      {/* Faded preview of the table shape: rank, name, amount. */}
      <div
        className="mt-8 w-full max-w-xl space-y-2 opacity-70 [mask-image:linear-gradient(to_bottom,#000_20%,transparent)]"
      >
        {[72, 58, 46].map((w) => (
          <div key={w} className="flex h-12 items-center gap-4 rounded-xl neu-inset px-4">
            <span className="h-3 w-6 rounded bg-fg-subtle/30" />
            <span className="h-6 w-6 rounded-full bg-fg-subtle/25" />
            <span className="h-3 rounded bg-fg-subtle/30" style={{ width: `${w}%` }} />
            <span className="ml-auto h-3 w-14 rounded bg-fg-subtle/30" />
          </div>
        ))}
      </div>
    </div>
  );
}

// Live pool stats from the contest API: usage bar plus three figures.
function ContestStats({ c }: { c: Contest }) {
  const stats = [
    { label: "Traders enrolled", value: c.usersEnrolled.toLocaleString("en-IN") },
    { label: "Traders benefited", value: c.usersBenefited.toLocaleString("en-IN") },
    { label: "Campaign period", value: c.period },
  ];
  return (
    <div className="border-b border-border-subtle px-5 py-5 sm:px-7">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-[0.625rem] font-bold uppercase tracking-[0.16em] text-fg-subtle">Pool used</p>
        <p className="font-mono text-sm tabular-nums text-fg-muted">
          <span className="font-bold text-fg">{c.used}</span> of {c.poolSize}
        </p>
      </div>
      <div
        className="mt-2 h-2 overflow-hidden rounded-full bg-black/[0.08]"
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#7b1f8f] to-[#c45fd8]"
          style={{ width: `${Math.max(c.usedPct, 1.5)}%` }}
        />
      </div>
      <p className="mt-1.5 text-right font-mono text-xs tabular-nums text-fg-subtle">{c.remaining} remaining</p>
      <dl className="mt-4 grid grid-cols-3 divide-x divide-border-subtle overflow-hidden rounded-xl neu-inset">
        {stats.map((s) => (
          <div key={s.label} className="px-3 py-3 text-center sm:px-4">
            <dt className="text-[0.625rem] font-bold uppercase tracking-[0.12em] text-fg-subtle">{s.label}</dt>
            <dd className="mt-1 font-mono text-base font-bold tabular-nums text-fg sm:text-lg">{s.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default async function Leaderboard() {
  const { status: loaded, entries, contest, updatedAt, total, error } = await getTopBrokerageSavings();
  const status: LeaderboardStatus = loaded === "ready" && entries.length === 0 ? "empty" : loaded;
  const showRows = status === "ready";
  const max = entries[0]?.score || 1;

  const podium = entries.slice(0, 3);
  const rest = entries.slice(3);

  return (
    <section
      id="leaderboard"
      className="arena-container relative pb-20 lg:pb-28"
    >
      {error ? <ConsoleError message={error} /> : null}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-80 w-[50rem] max-w-full -translate-x-1/2 opacity-80 blur-[110px]"
        style={{
          background:
            "radial-gradient(closest-side, var(--color-violet-deep), transparent)",
        }}
      />
      <div data-reveal className="relative text-center">
        <p className="section-label neu-inset">
          <span className="section-label-dot" />
          <Placeholder>Tournament standings</Placeholder>
        </p>
        <h2
          id="leaderboard-heading"
          className="mt-5 text-[clamp(1.75rem,5vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-fg [text-shadow:0_0_60px_rgba(177,69,201,0.55)]"
        >
          The Leaderboard
        </h2>
        <p className="mx-auto mt-4 max-w-[52ch] text-pretty text-[0.9375rem] leading-relaxed text-fg-muted">
          <Placeholder>
            Live standings by brokerage saved from the pool, refreshed every minute.
          </Placeholder>
        </p>
      </div>
      <div className="relative mt-8 overflow-hidden rounded-3xl key-light">
        <span
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent"
        />
        <div
          data-reveal
          style={{ "--reveal-delay": "0.14s" } as React.CSSProperties}
          className="flex items-center justify-between gap-4 border-b border-border-subtle bg-black/[0.025] px-5 py-4 sm:px-7"
        >
          <p className="flex items-center gap-2.5 text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-fg">
            <span className="text-accent">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none">
                <path
                  d="M12 3v18M12 21c-4 0-7-3-7-7 3.5 0 7 2 7 7Zm0 0c4 0 7-3 7-7-3.5 0-7 2-7 7Zm0-8c-3 0-5.5-2.2-5.5-5.5C9.5 7.5 12 9.5 12 13Zm0 0c3 0 5.5-2.2 5.5-5.5C14.5 7.5 12 9.5 12 13Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            Standings
          </p>
          <p className="flex items-center gap-2 rounded-full neu-inset px-3 py-1.5 text-[0.625rem] font-bold uppercase tracking-[0.14em] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {status === "ready"
              ? contest && !contest.isActive
                ? "Campaign ended"
                : `Live${updatedAt ? ` · Updated ${updatedAt}` : ""}`
              : STATUS_CHIP[status]}
          </p>
        </div>
        {contest ? <ContestStats c={contest} /> : null}
        {status === "empty" || status === "unavailable" ? <Notice kind={status} /> : null}

        {showRows ? (
          <>
            <div className="px-3 pt-5 sm:px-7 sm:pt-6">
              <ol
                className="isolate grid grid-cols-3 items-end gap-2 sm:gap-4"
              >
                {podium.map((entry, i) => (
                  <PodiumCard key={entry.rank} entry={entry} orderClass={PODIUM_ORDER[i]} />
                ))}
              </ol>
            </div>
            {rest.length > 0 ? (
              <div className="mt-6 px-3 pb-5 sm:px-7 sm:pb-6">
                <div
                  className="mb-2.5 grid grid-cols-[2.75rem_minmax(0,1fr)_auto] gap-3 border-b border-border-subtle px-3 pb-2.5 text-[0.625rem] font-bold uppercase tracking-[0.16em] text-fg-subtle sm:grid-cols-[3.5rem_minmax(0,1fr)_auto] sm:gap-4 sm:px-4"
                >
                  <Placeholder>Rank</Placeholder>
                  <Placeholder>Participant</Placeholder>
                  <Placeholder>Brokerage saved</Placeholder>
                </div>
                <RankTable firstPage={rest} total={total} max={max} />
              </div>
            ) : (
              <div className="pb-5 sm:pb-6" />
            )}
          </>
        ) : null}

      </div>
    </section>
  );
}
