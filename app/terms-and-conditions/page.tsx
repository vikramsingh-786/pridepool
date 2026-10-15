import type { Metadata } from "next";
import Footer from "../_campaign/sections/Footer";
import PageHeader from "../_campaign/components/PageHeader";
import Terms from "../_components/Terms";

export const metadata: Metadata = {
  title: "Terms & Conditions — The Pride Pool · Lemonn × Booming Bulls",
  description:
    "Draft terms and conditions for the Lemonn × Booming Bulls ₹1 Crore Brokerage Pool.",
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
