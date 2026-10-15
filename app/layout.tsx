import type { Metadata } from "next";
import "./globals.css";

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
    // scale-artboard: the page is sized in rem on a 390×844 / 1440×900 canvas and scales like an image (globals.css).
    <html lang="en" className="scale-artboard" data-scroll-behavior="smooth">
      <head>
        <link rel="preload" href="/fonts/Manrope-latin.woff2" as="font" type="font/woff2" crossOrigin="" />
        {/* Hero photo: discovered with the HTML instead of after the JS */}
        <link rel="preload" as="image" href="/anish.webp" type="image/webp" />
      </head>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "if('IntersectionObserver' in window)document.documentElement.classList.add('reveal-ready')",
          }}
        />
        {children}
      </body>
    </html>
  );
}
