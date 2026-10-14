"use client";

import { useState } from "react";
import type { BoardEntry } from "../_lib/trading-api";

const PAGE_SIZE = 10;

// Bar = this score as a share of first place's score, derived from the
// figures already shown (not a new metric).
function RankRow({ entry, max }: { entry: BoardEntry; max: number }) {
  const pct = Math.max(4, Math.round((entry.score / max) * 100));
  return (
    <li className="group relative grid grid-cols-[2.75rem_minmax(0,1fr)_auto] items-center gap-3 px-3 py-3 transition-colors duration-200 hover:bg-black/[0.03] sm:grid-cols-[3.5rem_minmax(0,1fr)_auto] sm:gap-5 sm:px-5 sm:py-3.5">
      <span
        className="absolute inset-y-2 left-0 w-[3px] rounded-r-full bg-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      />
      <span className="inline-flex h-8 w-10 items-center justify-center rounded-lg border border-black/10 bg-black/[0.05] font-mono text-[0.8125rem] font-bold tabular-nums text-fg">
        {entry.rank}
      </span>
      <span className="flex min-w-0 items-center gap-3">
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#b145c9] to-[#4a1159] p-[1.5px]"
        >
          <span className="flex h-full w-full items-center justify-center rounded-full bg-white font-mono text-[0.6875rem] font-bold text-fg">
            {entry.participant.slice(0, 2).toUpperCase()}
          </span>
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[0.875rem] font-semibold text-fg sm:text-[0.9375rem]">
            {entry.participant}
          </span>
          <span className="mt-1.5 block h-1.5 w-full max-w-[16rem] overflow-hidden rounded-full bg-black/[0.08]">
            <span
              className="block h-full rounded-full bg-gradient-to-r from-[#7b1f8f] to-[#c45fd8]"
              style={{ width: `${pct}%` }}
            />
          </span>
        </span>
      </span>
      <span className="text-right">
        <span className="block font-mono text-[0.9375rem] font-bold tabular-nums text-fg">
          {entry.display}
        </span>
        <span className="block font-mono text-[0.625rem] tabular-nums text-fg-subtle">
          {pct}% of #1
        </span>
      </span>
    </li>
  );
}

// 1 … 4 5 6 … 10: first, last, and the current page's neighbours.
function pageList(current: number, total: number): (number | "gap")[] {
  const out: (number | "gap")[] = [];
  for (let p = 1; p <= total; p++) {
    if (p === 1 || p === total || Math.abs(p - current) <= 1) out.push(p);
    else if (out.at(-1) !== "gap") out.push("gap");
  }
  return out;
}

const pageBtn =
  "inline-flex h-9 min-w-9 items-center justify-center rounded-lg px-2.5 font-mono text-[0.8125rem] font-bold tabular-nums";

// Must match PODIUM / PAGE_SIZE in _lib/trading-api.ts (server-only, so the
// values can't be imported here).
const PODIUM = 3;

export default function RankTable({
  firstPage,
  total,
  max,
}: {
  /** Ranks PODIUM+1 .. PODIUM+PAGE_SIZE, rendered with the page. */
  firstPage: BoardEntry[];
  /** Total ranked traders, podium included. */
  total: number;
  max: number;
}) {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState<Record<number, BoardEntry[]>>({ 1: firstPage });
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  const pageCount = Math.max(1, Math.ceil((total - PODIUM) / PAGE_SIZE));
  const rows = pages[page] ?? [];
  const from = PODIUM + (page - 1) * PAGE_SIZE + 1;
  const to = from + rows.length - 1;

  // Each page is its own upstream offset/limit, fetched through our proxy.
  async function go(p: number) {
    if (p < 1 || p > pageCount || loading) return;
    setFailed(false);
    if (pages[p]) return setPage(p);
    setLoading(true);
    try {
      const res = await fetch(`/api/leaderboard?page=${p}`);
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(`HTTP ${res.status}${body.reason ? ` - ${body.reason}` : body.error ? ` - ${body.error}` : ""}`);
      }
      const { rows: next } = (await res.json()) as { rows: BoardEntry[] };
      setPages((prev) => ({ ...prev, [p]: next }));
      setPage(p);
    } catch (err) {
      console.error(`[leaderboard] page ${p} failed:`, (err as Error).message);
      setFailed(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <ol
        start={from}
        className={`divide-y divide-black/[0.07] overflow-hidden rounded-2xl border border-black/[0.08] bg-white/70 transition-opacity duration-200 ${
          loading ? "opacity-50" : ""
        }`}
      >
        {rows.map((entry) => (
          <RankRow key={entry.rank} entry={entry} max={max} />
        ))}
      </ol>

      {pageCount > 1 ? (
        <nav
          className="mt-5 flex flex-col items-center justify-between gap-3 pb-1 sm:flex-row"
        >
          <p className="font-mono text-xs font-semibold tabular-nums text-fg">
            {failed ? "Couldn’t load that page. Try again." : `Showing ${from}–${to} of ${total}`}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            <button
              type="button"
              onClick={() => go(page - 1)}
              disabled={page === 1 || loading}
              className={`${pageBtn} page-key`}
            >
              Previous
            </button>
            {pageList(page, pageCount).map((p, i) =>
              p === "gap" ? (
                <span key={`gap-${i}`} className="px-1 text-fg-subtle">
                  …
                </span>
              ) : (
                <button
                  key={p}
                  type="button"
                  onClick={() => go(p)}
                  disabled={loading}
                  className={`${pageBtn} ${p === page ? "btn-key [--k:4px]" : "page-key"}`}
                >
                  {p}
                </button>
              ),
            )}
            <button
              type="button"
              onClick={() => go(page + 1)}
              disabled={page === pageCount || loading}
              className={`${pageBtn} page-key`}
            >
              Next
            </button>
          </div>
        </nav>
      ) : null}
    </>
  );
}
