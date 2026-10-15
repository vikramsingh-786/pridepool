import "server-only";
import { unstable_rethrow } from "next/navigation";
import { createPrivateKey, sign } from "node:crypto";

// Server-only. The API key, private key and request id come from private env vars (never NEXT_PUBLIC_) and never leave this module; only masked names and amounts are returned to the page.

const PATH = "/api-trading/api/v1/top-brokerage-savings";
// Podium = ranks 1-3; the table pages through the rest, PAGE_SIZE at a time, using the backend's own offset/limit (offset is 0-based upstream).
const PODIUM = 3;
const PAGE_SIZE = 10;
const TIMEOUT_MS = 8000;
// DER prefix that wraps a raw 32-byte Ed25519 seed as a PKCS#8 key.
const ED25519_PKCS8_PREFIX = Buffer.from("302e020100300506032b657004220420", "hex");

export type LeaderboardStatus = "ready" | "empty" | "unavailable";

export type BoardEntry = { rank: number; participant: string; score: number; display: string };

export type Contest = {
  name: string;
  status: string;
  poolSize: string;
  used: string;
  remaining: string;
  usedPct: number;
  usersEnrolled: number;
  usersBenefited: number;
  period: string;
};

export type Leaderboard = {
  status: LeaderboardStatus;
  entries: BoardEntry[];
  contest: Contest | null;
  updatedAt: string | null;
  total: number;
  error: string | null;
};

// Every amount on the page is whole rupees, never paise: anything after the decimal point is dropped (49.5 → ₹49, 49.12932 → ₹49).
const rupees = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

// Drops everything after the decimal point, no rounding: 49.99999999 → 49
const whole = (n: number) => Math.trunc(n);
const inr = (n: number) => rupees.format(whole(n));

function config() {
  const env = {
    baseUrl: process.env.LEMONN_TRADING_BASE_URL,
    apiKey: process.env.LEMONN_TRADING_API_KEY,
    privateKey: process.env.LEMONN_TRADING_PRIVATE_KEY,
    requestId: process.env.LEMONN_TRADING_REQUEST_ID,
  };
  return Object.values(env).every(Boolean) ? (env as Record<keyof typeof env, string>) : null;
}

// Ed25519 signature over "<api_key>:<epoch_ms>", hex-encoded (backend spec).
function signRequest(apiKey: string, privateKeyHex: string) {
  const epoch = String(Date.now());
  const key = createPrivateKey({
    key: Buffer.concat([ED25519_PKCS8_PREFIX, Buffer.from(privateKeyHex, "hex")]),
    format: "der",
    type: "pkcs8",
  });
  return { epoch, signature: sign(null, Buffer.from(`${apiKey}:${epoch}`), key).toString("hex") };
}

type Row = { name: string; brokerage_saved: number };

const num = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? v : null);

// usedSum: Σ of every trader's brokerage saved, each with its decimals dropped (see getTopBrokerageSavings). The feed's own
// exhausted_amount is only the fallback when not every row could be fetched; its `remaining` isn't used at all.
function toContest(c: Record<string, unknown> | undefined, usedSum: number | null): Contest | null {
  if (!c) return null;
  const pool = num(c.pool_size), used = usedSum ?? num(c.exhausted_amount);
  const enrolled = num(c.users_enrolled), benefited = num(c.users_benefited);
  const day = (v: unknown) => (typeof v === "string" ? new Date(`${v}T00:00:00+05:30`) : null);
  const start = day(c.start_date), end = day(c.end_date);
  const valid = (d: Date | null): d is Date => !!d && !isNaN(+d);
  if (pool === null || used === null || enrolled === null || benefited === null || !valid(start) || !valid(end)) return null;
  const fmt = (d: Date, withYear: boolean) =>
    d.toLocaleDateString("en-IN", { day: "numeric", month: "short", ...(withYear && { year: "numeric" }), timeZone: "Asia/Kolkata" });
  return {
    name: typeof c.name === "string" ? c.name : "",
    status: typeof c.status === "string" ? c.status : "",
    poolSize: inr(pool),
    used: inr(used),
    // Pool − Used, in the same whole rupees shown (₹50 − ₹49 = ₹1)
    remaining: inr(Math.max(0, whole(pool) - whole(used))),
    // from the same whole-rupee amounts shown on the page, so the % always matches "₹X of ₹Y used"
    // ×100 before ÷ keeps it exact (29/50 → 58, not 57.999…)
    usedPct: whole(pool) > 0 ? Math.min(100, (whole(used) * 100) / whole(pool)) : 0,
    usersEnrolled: enrolled,
    usersBenefited: benefited,
    period: `${fmt(start, false)} – ${fmt(end, true)}`,
  };
}

// When these standings were fetched (every page load fetches fresh): "15 Oct, 1:13 pm IST"
const updatedNow = () =>
  `${new Date().toLocaleString("en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata" })} IST`;

function isRow(r: unknown): r is Row {
  const o = r as Row;
  return !!o && typeof o.name === "string" && Number.isFinite(o.brokerage_saved);
}

type Cfg = NonNullable<ReturnType<typeof config>>;
type Upstream = { rows: Row[]; contest: Record<string, unknown> | undefined };
type Result = { data: Upstream; error: null } | { data: null; error: string };

// One signed call to the backend for a slice of the ranking.
async function upstream(cfg: Cfg | null, offset: number, limit: number): Promise<Result> {
  if (!cfg) {
    console.error("[leaderboard] LEMONN_TRADING_* env vars not configured");
    return { data: null, error: "server not configured (LEMONN_TRADING_* env vars missing)" };
  }
  const url = new URL(PATH, cfg.baseUrl);
  url.search = new URLSearchParams({ offset: String(offset), limit: String(limit) }).toString();
  const { epoch, signature } = signRequest(cfg.apiKey, cfg.privateKey);
  try {
    const res = await fetch(url, {
      headers: {
        "x-api-key": cfg.apiKey,
        "x-epoch-time": epoch,
        "x-signature": signature,
        "x-request-id": cfg.requestId,
      },
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: "no-store",
    });
    const body = await res.json().catch(() => null);
    if (!res.ok || body?.status !== "success" || !Array.isArray(body?.data?.rows)) {
      // Status, error code and message only: never headers, URL or payload.
      const error = `upstream ${res.status} ${body?.error_code ?? ""} ${body?.msg ?? ""}`.trim();
      console.error("[leaderboard]", error);
      return { data: null, error };
    }
    return { data: { rows: (body.data.rows as unknown[]).filter(isRow), contest: body.data.contest }, error: null };
  } catch (err) {
    // Let Next's own control-flow errors (e.g. dynamic-rendering bailout) through.
    unstable_rethrow(err);
    const error = `upstream request failed: ${(err as Error).name}`;
    console.error("[leaderboard]", error);
    return { data: null, error };
  }
}

const toEntry = (r: Row, rank: number): BoardEntry => ({
  rank,
  // Backend pads the mask to the full name length ("SA*****************NA"); keep it short so it fits a podium
  participant: r.name.replace(/\*{4,}/g, "****"),
  score: r.brokerage_saved,
  display: inr(r.brokerage_saved),
});

const unavailable = (error: string): Leaderboard => ({ status: "unavailable", entries: [], contest: null, updatedAt: null, total: 0, error });

// Podium + first table page + contest stats, in one call.
// Every ranked row, for summing "Used": the first call's rows, plus the rest in pages of SUM_PAGE (in parallel) when there are
// more traders than it returned. null if any page fails, so a partial sum is never shown.
// ponytail: one call per SUM_PAGE traders on every page load; ask the backend for a sum-of-whole-rupees field if traders run into the thousands.
const SUM_PAGE = 100;
async function allRows(cfg: Cfg | null, first: Row[], count: number): Promise<Row[] | null> {
  if (first.length < PODIUM + PAGE_SIZE || first.length >= count) return first; // the first call already held them all
  const offsets: number[] = [];
  for (let o = first.length; o < count; o += SUM_PAGE) offsets.push(o);
  const pages = await Promise.all(offsets.map((o) => upstream(cfg, o, SUM_PAGE)));
  if (pages.some((p) => !p.data)) {
    console.error("[leaderboard] couldn't fetch every row to sum Used; showing the feed's exhausted_amount instead");
    return null;
  }
  return first.concat(...pages.map((p) => p.data!.rows));
}

export async function getTopBrokerageSavings(): Promise<Leaderboard> {
  const cfg = config();
  const { data, error } = await upstream(cfg, 0, PODIUM + PAGE_SIZE);
  if (!data) return unavailable(error);

  const entries = data.rows.slice(0, PODIUM + PAGE_SIZE).map((r, i) => toEntry(r, i + 1));
  const benefited = num(data.contest?.users_benefited);
  // ponytail: the API has no row total; users_benefited (traders with savings) is used as the ranked count. Swap in a real total if the backend adds one.
  const total = Math.max(benefited ?? 0, entries.length);
  // Used = Σ whole rupees saved by every trader (29.708 + 20 → 29 + 20 = ₹49)
  const rows = await allRows(cfg, data.rows, total);
  const usedSum = rows ? rows.reduce((sum, r) => sum + whole(r.brokerage_saved), 0) : null;

  return {
    status: entries.length ? "ready" : "empty",
    entries,
    contest: toContest(data.contest, usedSum),
    updatedAt: updatedNow(),
    total,
    error: null,
  };
}

// Table page N (1-based): ranks PODIUM+1 onward, PAGE_SIZE per page.
export async function getPage(page: number): Promise<{ rows: BoardEntry[] } | { error: string }> {
  const offset = PODIUM + (page - 1) * PAGE_SIZE;
  const { data, error } = await upstream(config(), offset, PAGE_SIZE);
  return data ? { rows: data.rows.map((r, i) => toEntry(r, offset + i + 1)) } : { error };
}
