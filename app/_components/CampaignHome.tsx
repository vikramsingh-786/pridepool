"use client";

import dynamic from "next/dynamic";

import type { Leaderboard } from "../_lib/trading-api";

// The V4 page builds itself from the first frame (intro timings, matchMedia, scroll locks), so it runs client-only — same as the design's original Vite build. No server HTML to mismatch.
const Home = dynamic(() => import("../_campaign/Home"), { ssr: false });

export default function CampaignHome({ board }: { board: Leaderboard }) {
  return <Home badgeStyle="stamp" board={board} />;
}
