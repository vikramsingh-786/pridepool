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

// The backend's contest block, shown as sent (no formatting, no checks): amounts get only a ₹ prefix
export type Contest = {
  name: string;
  status: string;
  poolSize: string;
  used: string;
  remaining: string;
  usersEnrolled: string;
  usersBenefited: string;
  startDate: string;
  endDate: string;
  /** % of the pool used, for the bar: exhausted_amount ÷ pool_size (the backend sends no %); null if either is missing */
  usedPct: number | null;
};

export type Leaderboard = {
  status: LeaderboardStatus;
  entries: BoardEntry[];
  contest: Contest | null;
  updatedAt: string | null;
  total: number;
  error: string | null;
};

// Amounts are shown exactly as the backend sends them, only with ₹ in front (no rounding, trimming or grouping)
const inr = (n: number) => `₹${n}`;

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

// Straight from the backend's contest block: every field as sent
const raw = (v: unknown) => (v === undefined || v === null ? "" : String(v));
function toContest(c: Record<string, unknown> | undefined): Contest | null {
  if (!c) return null;
  return {
    name: raw(c.name),
    status: raw(c.status),
    poolSize: `₹${raw(c.pool_size)}`,
    used: `₹${raw(c.exhausted_amount)}`,
    remaining: `₹${raw(c.remaining)}`,
    usersEnrolled: raw(c.users_enrolled),
    usersBenefited: raw(c.users_benefited),
    startDate: raw(c.start_date),
    endDate: raw(c.end_date),
    usedPct: (() => {
      const pool = num(c.pool_size), used = num(c.exhausted_amount);
      return pool !== null && used !== null && pool > 0 ? Math.min(100, (used * 100) / pool) : null;
    })(),
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
  participant: r.name, // as sent (the podium shrinks long names to fit)
  score: r.brokerage_saved,
  display: inr(r.brokerage_saved),
});

const unavailable = (error: string): Leaderboard => ({ status: "unavailable", entries: [], contest: null, updatedAt: null, total: 0, error });

// Podium + first table page + contest stats, in one call.
export async function getTopBrokerageSavings(): Promise<Leaderboard> {
  const { data, error } = await upstream(config(), 0, PODIUM + PAGE_SIZE);
  if (!data) return unavailable(error);

  const entries = data.rows.slice(0, PODIUM + PAGE_SIZE).map((r, i) => toEntry(r, i + 1));
  const benefited = num(data.contest?.users_benefited);
  // ponytail: the API has no row total; users_benefited (traders with savings) is used as the ranked count. Swap in a real total if the backend adds one.
  const total = Math.max(benefited ?? 0, entries.length);

  return {
    status: entries.length ? "ready" : "empty",
    entries,
    contest: toContest(data.contest),
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
