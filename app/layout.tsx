import type { Metadata } from "next";
import localFont from "next/font/local";
import RevealRoot from "./_components/RevealRoot";
import "./globals.css";

const manrope = localFont({
  src: "./fonts/Manrope-Variable.woff2",

  weight: "200 800",
  style: "normal",
  display: "swap",
  variable: "--font-campaign",
  adjustFontFallback: "Arial",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
});

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),

  robots: { index: false, follow: false },
};

export default function CampaignRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.variable} data-scroll-behavior="smooth">
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "if('IntersectionObserver' in window)document.documentElement.classList.add('reveal-ready')",
          }}
        />
        {children}
        <RevealRoot />
      </body>
    </html>
  );
}
