import type { Metadata } from "next";
import Footer from "../_campaign/sections/Footer";
import PageHeader from "../_campaign/components/PageHeader";
import Terms from "../_components/Terms";

export const metadata: Metadata = {
  title: "Terms and Conditions — The Pride Pool · Booming Bulls × Lemonn",
  description:
    "Terms and conditions for The Pride Pool: the Booming Bulls × Lemonn ₹1 Crore brokerage pool and laptop giveaway, 17 Oct to 15 Nov 2026.",
  alternates: { canonical: "/terms-and-conditions" },
};

export default function TermsPage() {
  return (
    <>
      <PageHeader />
      <main id="main" className="relative pt-12 sm:pt-16">
        <Terms />
      </main>
      <Footer />
    </>
  );
}
