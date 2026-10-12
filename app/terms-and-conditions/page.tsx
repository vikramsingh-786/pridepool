import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "../_components/Footer";
import Terms from "../_components/Terms";

export const metadata: Metadata = {
  title: "Terms & Conditions — The Pride Pool · Lemonn × Booming Bulls",
  description:
    "Draft terms and conditions for the Lemonn × Booming Bulls ₹1 Crore Brokerage Credits Pool.",
  alternates: { canonical: "/terms-and-conditions" },
};

export default function TermsPage() {
  return (
    <>
      <header className="relative z-10 border-b border-white/5 backdrop-blur-sm">
        <div className="arena-container grid grid-cols-[1fr_auto_1fr] items-center gap-4 py-3.5">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 justify-self-start text-[0.8125rem] font-semibold text-fg-muted transition-colors duration-200 hover:text-fg"
          >
            <span aria-hidden>←</span>
            <span className="hidden sm:inline">Back to campaign</span>
            <span className="sm:hidden">Back</span>
          </Link>
          <Link href="/" aria-label="Lemonn × Booming Bulls — campaign home" className="flex items-center gap-4 sm:gap-6">
            <Image src="/lemonn-white.svg" alt="" width={193} height={52} priority className="h-5 w-auto sm:h-6" />
            <span aria-hidden className="text-xl font-light leading-none text-fg-muted">
              ×
            </span>
            <span className="flex h-9 w-28 items-center justify-center rounded-lg bg-white px-1.5 sm:h-10 sm:w-32">
              <Image
                src="/bomming-bulls-icon.webp"
                alt=""
                width={2170}
                height={725}
                priority
                sizes="128px"
                className="h-full w-full object-contain"
              />
            </span>
          </Link>
        </div>
      </header>
      <main id="main" className="relative pt-12 sm:pt-16">
        <Terms />
      </main>
      <Footer />
    </>
  );
}
