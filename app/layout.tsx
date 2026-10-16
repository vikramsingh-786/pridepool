import type { Metadata } from "next";
import "./globals.css";

// Base for every absolute URL (og:image, og:url, canonical). Share previews (WhatsApp, X, LinkedIn) need a public https
// address; set NEXT_PUBLIC_SITE_URL per environment (e.g. a staging domain). Production falls back to the campaign domain.
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.NODE_ENV === "production" ? "https://pridepool.in" : "http://localhost:3000");

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
              "if('IntersectionObserver' in window)document.documentElement.classList.add('reveal-ready');" +
              // Desktop scales with the width (globals.css), so a wide-but-short window would make the hero taller than the screen.
              // --hero-fit shrinks just the hero to fit the height: its design is 1440×900, so at width W it needs W×900/1440 of height.
              "(function(){var r=document.documentElement;function f(){r.style.setProperty('--hero-fit',String(Math.min(1,innerHeight/(innerWidth*900/1440))))}f();addEventListener('resize',f)})()",
          }}
        />
        {children}
      </body>
    </html>
  );
}
