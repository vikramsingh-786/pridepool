import type { Metadata } from "next";
import CampaignHome from "./_components/CampaignHome";
import { getTopBrokerageSavings } from "./_lib/trading-api";

const TITLE = "₹1 Crore Brokerage Pool — Lemonn × Booming Bulls";
const DESCRIPTION =
  "Lemonn × Booming Bulls: a ₹1 Crore brokerage pool marking Anish Singh Thakur's achievement at the World Trading Championship.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,

  alternates: { canonical: "/" },

  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    siteName: "The Pride Pool",
    locale: "en_IN",
    // image: app/opengraph-image.jpg (the ₹1 Crore Brokerage Pool banner), picked up automatically
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    // image: app/twitter-image.jpg
  },
};

// The leaderboard is signed per request and never cached.
export const dynamic = "force-dynamic";

export default async function CampaignPage() {
  const board = await getTopBrokerageSavings();
  return <CampaignHome board={board} />;
}
