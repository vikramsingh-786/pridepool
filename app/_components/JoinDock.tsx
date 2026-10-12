"use client";

import { useEffect, useState } from "react";
import { JOIN_HREF } from "../_lib/links";

function CornerMark({ className }: { className: string }) {
  return <span aria-hidden className={`absolute h-4 w-4 border-accent/55 ${className}`} />;
}

export default function JoinDock() {
  // Hidden over the hero and footer (they have their own CTA), and over the leaderboard on phones.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const board = document.getElementById("leaderboard");
    const small = window.matchMedia("(max-width: 767px)");

    let heroInView = true;
    let boardInView = false;
    let footerInView = false;
    const update = () =>
      setVisible(!heroInView && !footerInView && !(small.matches && boardInView));

    const heroIo = new IntersectionObserver(
      ([e]) => {
        heroInView = e.isIntersecting;
        update();
      },
      { threshold: 0.15 },
    );
    heroIo.observe(hero);

    const boardIo = new IntersectionObserver(([e]) => {
      boardInView = e.isIntersecting;
      update();
    });
    if (board) boardIo.observe(board);

    const footer = document.getElementById("footer");
    const footerIo = new IntersectionObserver(([e]) => {
      footerInView = e.isIntersecting;
      update();
    });
    if (footer) footerIo.observe(footer);

    small.addEventListener("change", update);
    return () => {
      heroIo.disconnect();
      boardIo.disconnect();
      footerIo.disconnect();
      small.removeEventListener("change", update);
    };
  }, []);

  return (
    <aside
      aria-label="Join the pool"
      aria-hidden={!visible}
      inert={!visible}
      className={`fixed bottom-4 right-4 z-50 w-[min(21rem,calc(100vw-2rem))] transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none sm:bottom-6 sm:right-6 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
      style={{ marginBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <CornerMark className="-left-1.5 -top-1.5 border-l-2 border-t-2" />
      <CornerMark className="-right-1.5 -top-1.5 border-r-2 border-t-2" />
      <CornerMark className="-bottom-1.5 -left-1.5 border-b-2 border-l-2" />
      <CornerMark className="-bottom-1.5 -right-1.5 border-b-2 border-r-2" />
      <div
        aria-hidden
        className="arena-halo absolute -inset-px -z-10 rounded-[1.1rem] bg-gradient-to-b from-violet/50 via-violet/15 to-transparent blur-[3px]"
      />
      <div className="arena-beam rounded-2xl p-px shadow-[0_40px_90px_-40px_rgba(0,0,0,1)]">
        <div className="relative overflow-hidden rounded-[calc(1rem-1px)] bg-bg/90 backdrop-blur-xl">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.045]"
            style={{
              backgroundImage:
                "linear-gradient(var(--color-violet) 1px, transparent 1px), linear-gradient(90deg, var(--color-violet) 1px, transparent 1px)",
              backgroundSize: "26px 26px",
            }}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/[0.05] to-transparent"
          />
          <div className="relative flex items-center justify-between border-b border-white/10 px-5 py-3">
            <span className="flex items-center gap-2 text-[0.625rem] font-bold uppercase tracking-[0.18em] text-fg-subtle">
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_2px_rgba(242,163,60,0.7)]"
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
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
