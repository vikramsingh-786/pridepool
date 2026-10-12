// FICTIONAL DEMO DATA — replace before launch. See _docs/leaderboard-requirements.md.
export const IS_DEMO_DATA = true;

export type LeaderboardStatus = "ready" | "loading" | "empty" | "unavailable";
export const LEADERBOARD_STATUS: LeaderboardStatus = "ready";

export type LeaderboardEntry = {
  rank: number;

  participant: string;

  score: number;
};

export const DEMO_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, participant: "AlphaTrader", score: 9840 },
  { rank: 2, participant: "BullRunner", score: 9210 },
  { rank: 3, participant: "MarketNinja", score: 8760 },
  { rank: 4, participant: "CandleStorm", score: 8120 },
  { rank: 5, participant: "TradePilot", score: 7850 },
  { rank: 6, participant: "BullSignal", score: 7420 },
  { rank: 7, participant: "ChartRider", score: 6980 },
  { rank: 8, participant: "QuantumBull", score: 6540 },
  { rank: 9, participant: "PipHunter", score: 6120 },
  { rank: 10, participant: "TrendSmith", score: 5890 },

  { rank: 11, participant: "GreenCandle", score: 5410 },
  { rank: 12, participant: "RiskRanger", score: 5070 },
];

export function formatScore(score: number): string {
  return score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
