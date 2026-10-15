# The Pride Pool

Lemonn × Booming Bulls — **The Pride Pool**, a ₹1 Crore Brokerage Credits Pool campaign page.

Built with Next.js 16, React 19 and Tailwind CSS 4.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. The leaderboard needs the `LEMONN_TRADING_*` vars below; without them
the section says the standings are unavailable.

## Routes

- `/` — campaign landing page
- `/terms-and-conditions` — draft campaign terms
- `/api/leaderboard?page=N` — one page of the standings, signed server-side

## Layout

- `app/_campaign/` — the page itself: `Home.tsx`, `sections/`, `components/`, `leaderboard/`, and all
  copy and links in `content.ts`.
- `app/_lib/trading-api.ts` — the signed backend feed. Server-only; the keys never reach the browser.
- `app/globals.css` — design tokens, the 3D keycaps, and every animation.

The leaderboard's 93 Figma layers live in `app/_campaign/leaderboard/svg/` and are bundled into one
lazily loaded chunk. After changing any of them:

```bash
node app/_campaign/leaderboard/gen-art.mjs
```

## Before launch

- Confirm `JOIN_URL` and `OPEN_APP_URL` in `app/_campaign/content.ts` are the approved campaign links.
- Set `NEXT_PUBLIC_SITE_URL` to the production domain, and the `LEMONN_TRADING_*` vars to the live backend.
- Drop `robots: { index: false }` from `app/layout.tsx` when the page should be indexed.
- Get legal sign-off on the terms, FAQs and disclaimers.
