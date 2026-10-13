import type { Metadata } from "next";
import JoinDock from "./_components/JoinDock";
import Footer from "./_components/Footer";
import Hero from "./_components/Hero";
import Leaderboard from "./_components/Leaderboard";
import PageBackdrop from "./_components/PageBackdrop";
import CampaignBasis from "./_components/CampaignBasis";
import Faq from "./_components/Faq";
import Giveaway from "./_components/Giveaway";
import Spotlight from "./_components/Spotlight";

const TITLE = "₹1 Crore Brokerage Credits Pool — Lemonn × Booming Bulls";
const DESCRIPTION =
  "Lemonn × Booming Bulls: a ₹1 Crore brokerage credits pool marking Anish Singh Thakur's achievement at the World Trading Championship.";

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
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Lemonn × Booming Bulls — ₹1 Crore Brokerage Credits Pool.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.png"],
  },
};

export default function CampaignPage() {
  return (
    <>
      <main id="main" className="relative">
        <PageBackdrop />
        <Hero />
        <div aria-hidden className="pointer-events-none relative -z-[5] h-0">
          <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-bg to-transparent sm:h-64" />
        </div>
        <CampaignBasis />
        <Spotlight />
        <Giveaway />
        <Leaderboard />
        <Faq />
      </main>
      <Footer />
      <JoinDock />
    </>
  );
}
