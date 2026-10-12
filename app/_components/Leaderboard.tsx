import Placeholder from "./Placeholder";
import {
  DEMO_LEADERBOARD,
  IS_DEMO_DATA,
  LEADERBOARD_STATUS,
  formatScore,
  type LeaderboardEntry,
  type LeaderboardStatus,
} from "../_mock/leaderboard";

type Medal = {
  text: string;
  ring: string;
  glow: string;

  side: string;

  pad: string;
  icon: "crown" | "medal";
  label: string;
};

const MEDALS: Record<number, Medal> = {
  1: {
    text: "text-gold-bright",
    ring: "border-gold-bright/45",
    glow: "rgba(255,201,120,0.40)",
    side: "#5c4116",
    pad: "py-7 sm:py-9",
    icon: "crown",
    label: "First",
  },
  2: {
    text: "text-silver",
    ring: "border-silver/35",
    glow: "rgba(217,217,232,0.26)",
    side: "#34343f",
    pad: "py-5 sm:py-6",
    icon: "medal",
    label: "Second",
  },
  3: {
    text: "text-bronze",
    ring: "border-bronze/35",
    glow: "rgba(224,154,98,0.28)",
    side: "#4a2c18",
    pad: "py-4 sm:py-5",
    icon: "medal",
    label: "Third",
  },
};

const PODIUM_ORDER = ["order-2", "order-1", "order-3"];

const PODIUM_DELAY: Record<number, string> = { 1: "0.48s", 2: "0.34s", 3: "0.22s" };

// ponytail: CSS count-up is exact only for 1,000–999,999; other scores render static.
function canCountUp(score: number) {
  return score >= 1000 && score < 1_000_000;
}

function PodiumCard({
  entry,
  orderClass,
}: {
  entry: LeaderboardEntry;
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
          aria-hidden
          className="pointer-events-none absolute -inset-3 -z-10 rounded-3xl opacity-70 blur-2xl"
          style={{ background: "radial-gradient(closest-side, rgba(255,201,120,0.55), transparent)" }}
        />
      ) : null}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24 rounded-t-xl"
        style={{
          background: `radial-gradient(ellipse 70% 100% at 50% 0%, ${medal.glow}, transparent)`,
        }}
      />
      <span
        aria-hidden
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
      <span className="sr-only">{medal.label} place, demo data</span>
      <p className="relative mt-2.5 truncate text-[0.8125rem] font-bold text-fg sm:text-[0.9375rem]">
        {entry.participant}
      </p>
      <p
        className={`relative mt-1 font-mono text-[0.8125rem] font-bold tabular-nums sm:text-sm ${medal.text}`}
      >
        {canCountUp(entry.score) ? (
          <span
            className="count-up"
            style={{ "--to": entry.score } as React.CSSProperties}
          >
            <span className="count-up-value">{formatScore(entry.score)}</span>
          </span>
        ) : (
          formatScore(entry.score)
        )}
      </p>
    </li>
  );
}

function RankRow({ entry, delay }: { entry: LeaderboardEntry; delay: string }) {
  return (
    <li
      data-reveal="near"
      style={{ "--reveal-delay": delay } as React.CSSProperties}
      className="grid grid-cols-[2.75rem_minmax(0,1fr)_auto] items-center gap-3 rounded-xl neu-raised px-3 py-2.5 sm:grid-cols-[3.5rem_minmax(0,1fr)_auto] sm:gap-4 sm:px-4 sm:py-3"
    >
      <span className="rank-chip font-mono text-[0.8125rem] font-bold tabular-nums">
        <span className="sr-only">Rank </span>
        {entry.rank}
      </span>
      <span className="flex min-w-0 items-center gap-3">
        <span
          aria-hidden
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg key-cap-sm font-mono text-[0.6875rem] font-bold text-violet"
        >
          {entry.participant.slice(0, 2).toUpperCase()}
        </span>
        <span className="truncate text-[0.875rem] font-semibold text-fg sm:text-[0.9375rem]">
          {entry.participant}
        </span>
      </span>
      <span className="font-mono text-[0.875rem] font-bold tabular-nums text-fg-muted">
        <span className="sr-only">score </span>
        {formatScore(entry.score)}
      </span>
    </li>
  );
}

function rowDelay(i: number) {
  return `${Math.min(0.06 + i * 0.045, 0.3).toFixed(3)}s`;
}

const LIST_LABEL = IS_DEMO_DATA
  ? "Demo leaderboard. Illustrative data for design preview only — not actual participants or scores."
  : "Leaderboard";

function RankList({ entries, start }: { entries: LeaderboardEntry[]; start: number }) {
  return (
    <ol start={start} aria-label={LIST_LABEL} className="flex flex-col gap-2.5">
      {entries.map((entry, i) => (
        <RankRow key={entry.rank} entry={entry} delay={rowDelay(i)} />
      ))}
    </ol>
  );
}

const STATUS_CHIP: Record<LeaderboardStatus, string> = {
  ready: "Sample",
  loading: "Loading",
  empty: "No entries yet",
  unavailable: "Unavailable",
};

function Skeleton() {
  return (
    <div aria-busy="true" className="px-4 pb-6 pt-5 sm:px-7 sm:pt-6">
      <p className="sr-only" role="status">
        Loading standings…
      </p>
      <div aria-hidden className="grid grid-cols-3 items-end gap-2 sm:gap-4">
        {["h-32 order-1", "h-40 order-2", "h-28 order-3"].map((c) => (
          <div key={c} className={`neu-inset rounded-xl ${c}`} />
        ))}
      </div>
      <div aria-hidden className="mt-6 flex flex-col gap-2.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="neu-inset h-14 rounded-xl" />
        ))}
      </div>
    </div>
  );
}

const NOTICE: Record<"empty" | "unavailable", { title: string; body: string }> = {
  empty: {
    title: "No standings yet",
    body: "Nobody has been ranked yet. Standings will appear here once entries are counted under the approved rules.",
  },
  unavailable: {
    title: "Standings unavailable",
    body: "The live leaderboard goes up once ranking rules and a verified data source are approved. Nothing is shown until then.",
  },
};

function Notice({ kind }: { kind: "empty" | "unavailable" }) {
  const n = NOTICE[kind];
  return (
    <div className="flex flex-col items-center px-6 py-14 text-center sm:py-20">
      <span
        aria-hidden
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
    </div>
  );
}

export default function Leaderboard() {
  const status: LeaderboardStatus =
    LEADERBOARD_STATUS === "ready" && DEMO_LEADERBOARD.length === 0
      ? "empty"
      : LEADERBOARD_STATUS;
  const showRows = status === "ready";
  const showDemoLabels = IS_DEMO_DATA && showRows;

  const podium = DEMO_LEADERBOARD.slice(0, 3);
  const top = DEMO_LEADERBOARD.slice(3, 10);
  const more = DEMO_LEADERBOARD.slice(10);

  return (
    <section
      id="leaderboard"
      aria-labelledby="leaderboard-heading"
      className="arena-container relative pb-20 lg:pb-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-80 w-[50rem] max-w-full -translate-x-1/2 opacity-80 blur-[110px]"
        style={{
          background:
            "radial-gradient(closest-side, var(--color-violet-deep), transparent)",
        }}
      />
      <div data-reveal className="relative text-center">
        <p className="inline-flex items-center gap-2.5 rounded-full neu-inset px-4 py-2 text-[0.625rem] font-bold uppercase tracking-[0.2em] text-fg-muted backdrop-blur-sm">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-violet" />
          <Placeholder>Tournament standings</Placeholder>
        </p>
        <h2
          id="leaderboard-heading"
          className="mt-5 text-[clamp(1.75rem,5vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-fg [text-shadow:0_0_60px_rgba(167,139,250,0.55)]"
        >
          The Leaderboard
        </h2>
        <p className="mx-auto mt-4 max-w-[52ch] text-pretty text-[0.9375rem] leading-relaxed text-fg-muted">
          A preview of how standings will look. The live leaderboard goes up
          once ranking rules and a verified data source are approved.
        </p>
      </div>
      {showDemoLabels ? (
        <div
          data-reveal
          style={{ "--reveal-delay": "0.08s" } as React.CSSProperties}
          className="relative mt-8 overflow-hidden rounded-xl border border-accent/30 neu-raised"
        >
          <p className="flex flex-col items-center gap-2 px-4 py-3.5 text-center sm:flex-row sm:gap-3.5 sm:px-5 sm:text-left">
            <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-3 py-1 text-[0.625rem] font-extrabold uppercase tracking-[0.14em] text-fg-on-accent">
              Demo data · Preview only
            </span>
            <span className="text-[0.8125rem] leading-relaxed text-accent">
              Illustrative leaderboard data for design preview only. These are
              not actual participants, rankings, or campaign scores.
            </span>
          </p>
        </div>
      ) : null}

      <div className={`relative ${showDemoLabels ? "mt-4" : "mt-8"} overflow-hidden rounded-2xl neu-raised`}>
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent"
        />
        <div
          data-reveal
          style={{ "--reveal-delay": "0.14s" } as React.CSSProperties}
          className="flex items-center justify-between gap-4 border-b border-border-subtle bg-bg/50 px-5 py-4 sm:px-7"
        >
          <p className="flex items-center gap-2.5 text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-fg">
            <span aria-hidden className="text-accent">
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
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
            {STATUS_CHIP[status]}
          </p>
        </div>
        {status === "loading" ? <Skeleton /> : null}
        {status === "empty" || status === "unavailable" ? <Notice kind={status} /> : null}

        {showRows ? (
          <>
            <div className="px-3 pt-5 sm:px-7 sm:pt-6">
              <ol
                aria-label={IS_DEMO_DATA ? "Top three, demo data" : "Top three"}
                className="isolate grid grid-cols-3 items-end gap-2 sm:gap-4"
              >
                {podium.map((entry, i) => (
                  <PodiumCard key={entry.rank} entry={entry} orderClass={PODIUM_ORDER[i]} />
                ))}
              </ol>
            </div>
            {top.length > 0 ? (
              <div className="mt-6 px-3 pb-5 sm:px-7 sm:pb-6">
                <div
                  aria-hidden
                  className="mb-2.5 grid grid-cols-[2.75rem_minmax(0,1fr)_auto] gap-3 border-b border-border-subtle px-3 pb-2.5 text-[0.625rem] font-bold uppercase tracking-[0.16em] text-fg-subtle sm:grid-cols-[3.5rem_minmax(0,1fr)_auto] sm:gap-4 sm:px-4"
                >
                  <Placeholder>Rank</Placeholder>
                  <Placeholder>Participant</Placeholder>
                  <Placeholder>Score</Placeholder>
                </div>
                <RankList entries={top} start={4} />
                {more.length > 0 ? (
                  <details className="group mt-2.5">
                    <summary className="mx-auto flex w-fit cursor-pointer list-none items-center gap-2 rounded-full key-cap relative px-5 py-2.5 text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-fg-muted hover:text-fg [&::-webkit-details-marker]:hidden">
                      <span className="group-open:hidden">
                        Show more ({more.length})
                      </span>
                      <span className="hidden group-open:inline">Show fewer</span>
                      <svg
                        aria-hidden
                        viewBox="0 0 16 16"
                        width="12"
                        height="12"
                        fill="none"
                        className="transition-transform duration-200 group-open:rotate-180"
                      >
                        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </summary>
                    <div className="mt-2.5">
                      <RankList entries={more} start={11} />
                    </div>
                  </details>
                ) : null}
              </div>
            ) : (
              <div className="pb-5 sm:pb-6" />
            )}
          </>
        ) : null}

        {showDemoLabels ? (
          <p className="border-t border-border-subtle bg-bg/40 px-5 py-3 text-center text-[0.6875rem] leading-relaxed text-fg-subtle sm:px-7">
            Sample data shown for layout purposes. Not actual participants,
            rankings, or scores.
          </p>
        ) : null}
      </div>
    </section>
  );
}
