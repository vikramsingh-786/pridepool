import Image from "next/image";
import Placeholder from "./Placeholder";
import { JOIN_HREF } from "../_lib/links";

const LINKS = [
  { href: "/#basis", label: "Why this campaign" },
  { href: "/#giveaway", label: "Laptop giveaway" },
  { href: "/#moment", label: "The moment" },
  { href: "/#leaderboard", label: "Leaderboard" },
  { href: "/#faqs", label: "FAQs" },
  { href: "/terms-and-conditions", label: "Terms & conditions" },
];

export default function Footer() {
  return (
    <footer id="footer" className="relative isolate overflow-hidden border-t border-white/5 bg-bg">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 75% at 50% 100%, rgba(177,69,201,0.30), rgba(177,69,201,0.08) 45%, transparent 75%), radial-gradient(ellipse 45% 40% at 15% 100%, rgba(123,31,143,0.22), transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.09]"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-gold-bright) 1px, transparent 1px), linear-gradient(90deg, var(--color-gold-bright) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "linear-gradient(to bottom, transparent 0%, #000 35%, #000 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, #000 35%, #000 100%)",
          }}
        />
      </div>
      <span
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
      />
      <div className="arena-container py-10 sm:py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-4">
              <Image src="/lemonn-white.svg" alt="Lemonn" width={193} height={52} className="h-6 w-auto" />
              <span className="text-xl font-light leading-none text-fg-muted">
                ×
              </span>
              <span className="flex h-10 w-32 items-center justify-center rounded-xl bg-white px-2">
                <Image
                  src="/bomming-bulls-icon.webp"
                  alt="Booming Bulls Academy"
                  width={2170}
                  height={725}
                  sizes="128px"
                  className="h-full w-full object-contain"
                />
              </span>
            </div>
            <p className="mt-5 text-sm font-semibold text-fg">
              The Pride Pool <span className="text-fg-subtle">·</span>{" "}
              <span className="text-gold-bright">₹1 Crore</span> Brokerage Credits Pool
            </p>
            <p className="mt-1.5 text-sm text-fg-muted">
              Celebrating Anish Singh Thakur&rsquo;s achievement at the World
              Trading Championship.
            </p>
          </div>
          <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
            <nav>
              <p className="text-[0.625rem] font-bold uppercase tracking-[0.18em] text-fg-subtle">
                Campaign
              </p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {LINKS.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-sm text-fg-muted transition-colors duration-200 hover:text-fg"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <p className="text-[0.625rem] font-bold uppercase tracking-[0.18em] text-fg-subtle">
                Join the pool
              </p>
              <a
                href={JOIN_HREF}
                className="arena-cta mt-4 inline-flex h-12 items-center justify-center gap-2 btn-key px-6 text-sm font-extrabold tracking-[-0.01em]"
              >
                Join the ₹1 Crore Pool
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-4 border-t border-white/5 pt-6 sm:flex-row sm:items-start sm:justify-between">
          <p className="max-w-[80ch] text-xs leading-relaxed text-fg-subtle">
            <Placeholder>
              Subject to a final agreement, verification of the championship
              result, regulatory approvals, and the final campaign terms.
              Joining the pool doesn&rsquo;t guarantee a specific credit
              allocation.
            </Placeholder>
          </p>
          <a
            href="#"
            className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-fg-muted transition-colors duration-200 hover:text-fg"
          >
            Back to top
            <span>↑</span>
          </a>
        </div>
        <div className="mt-6 flex flex-col gap-2 text-xs text-fg-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            <Placeholder>© 2026 Lemonn. All rights reserved.</Placeholder>
          </p>
          <p className="flex items-center gap-1.5">
            <span className="text-accent">✦</span>
            Crafted for traders in India
          </p>
        </div>
      </div>
    </footer>
  );
}
