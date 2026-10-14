import { getPage } from "../../_lib/trading-api";

const MAX_PAGE = 1000;

// GET /api/leaderboard?page=N: one table page, signed server-side. Accepts
// only `page`; never forwards client headers, hosts or params upstream.
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const raw = params.get("page") ?? "";
  const page = Number(raw);
  if ([...params.keys()].some((k) => k !== "page") || !/^\d+$/.test(raw) || page < 1 || page > MAX_PAGE) {
    return Response.json({ error: "invalid_request" }, { status: 400 });
  }

  const result = await getPage(page);
  if ("error" in result) {
    // `reason` is the safe upstream status/code/message (no keys, URLs or headers),
    // so the browser console can show why a page failed.
    return Response.json(
      { error: "unavailable", reason: result.error },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
  const rows = result.rows;

  return Response.json(
    { rows: rows.map(({ rank, participant, score, display }) => ({ rank, participant, score, display })) },
    { headers: { "Cache-Control": "no-store" } },
  );
}
