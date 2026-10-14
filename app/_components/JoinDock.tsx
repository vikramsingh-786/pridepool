"use client";

import { useEffect, useState } from "react";
import { JOIN_HREF } from "../_lib/links";

function CornerMark({ className }: { className: string }) {
  return <span className={`absolute h-4 w-4 border-accent/55 ${className}`} />;
}

export default function JoinDock() {
  // Hidden while the hero or the footer is on screen (each has its own Join
  // button); shown everywhere else. Phones get a slim bar, larger screens the card.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const footer = document.getElementById("footer");
    if (!hero) return;

    let heroInView = true;
    let footerInView = false;
    const update = () => setVisible(!heroInView && !footerInView);

    const heroIo = new IntersectionObserver(
      ([e]) => {
        heroInView = e.isIntersecting;
        update();
      },
      { threshold: 0.15 },
    );
    heroIo.observe(hero);

    const footerIo = new IntersectionObserver(([e]) => {
      footerInView = e.isIntersecting;
      update();
    });
    if (footer) footerIo.observe(footer);

    return () => {
      heroIo.disconnect();
      footerIo.disconnect();
    };
  }, []);

  return (
    <aside
      inert={!visible}
      className={`fixed bottom-8 right-3 z-50 transition-[opacity,transform] duration-500 ease-out md:bottom-6 md:right-6 md:w-[21rem] ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
      style={{ marginBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      {/* Phones: just a small pill in the corner, so it covers almost nothing. */}
      <a
        href={JOIN_HREF}
        className="arena-cta flex h-10 items-center gap-1.5 btn-key px-4 text-[0.8125rem] font-extrabold tracking-[-0.01em] [--k:4px] md:hidden"
      >
        Join ₹1 Cr Pool
        <span>→</span>
      </a>

      <div className="relative hidden md:block">
      <CornerMark className="-left-1.5 -top-1.5 border-l-2 border-t-2" />
      <CornerMark className="-right-1.5 -top-1.5 border-r-2 border-t-2" />
      <CornerMark className="-bottom-1.5 -left-1.5 border-b-2 border-l-2" />
      <CornerMark className="-bottom-1.5 -right-1.5 border-b-2 border-r-2" />
      <div
        className="arena-halo absolute -inset-px -z-10 rounded-[1.1rem] bg-gradient-to-b from-violet/50 via-violet/15 to-transparent blur-[3px]"
      />
      <div className="arena-beam rounded-2xl p-px shadow-[0_40px_90px_-40px_rgba(0,0,0,1)]">
        <div className="relative overflow-hidden rounded-[calc(1rem-1px)] bg-bg/95">
          <span
            className="pointer-events-none absolute inset-0 opacity-[0.09]"
            style={{
              backgroundImage:
                "linear-gradient(var(--color-violet) 1px, transparent 1px), linear-gradient(90deg, var(--color-violet) 1px, transparent 1px)",
              backgroundSize: "26px 26px",
            }}
          />
          <span
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
          <span
            className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/[0.05] to-transparent"
          />
          <div className="relative flex items-center justify-between border-b border-white/10 px-5 py-3">
            <span className="flex items-center gap-2 text-[0.625rem] font-bold uppercase tracking-[0.18em] text-fg-subtle">
              <span
                className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_2px_rgba(177,69,201,0.7)]"
              />
              Registration
            </span>
          </div>
          <div className="relative p-5">
            <p className="text-xl font-bold tracking-tight text-fg">Enter the arena</p>
            <a
              href={JOIN_HREF}
              className="arena-cta mt-5 flex h-[3.25rem] w-full items-center justify-center gap-2 btn-key text-[0.9375rem] font-extrabold tracking-[-0.01em]"
            >
              Join the ₹1 Crore Pool
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
      </div>
    </aside>
  );
}
