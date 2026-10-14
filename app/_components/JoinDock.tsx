"use client";

import { useEffect, useState } from "react";
import { JOIN_HREF } from "../_lib/links";

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
      aria-label="Join the pool"
      aria-hidden={!visible}
      inert={!visible}
      className={`fixed bottom-8 right-3 z-50 transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none md:bottom-6 md:right-6 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
      style={{ marginBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      {/* A compact pill at every size, so it never covers section content. */}
      <a
        href={JOIN_HREF}
        aria-label="Join the ₹1 Crore Pool"
        className="arena-cta flex h-10 items-center gap-1.5 btn-key px-4 text-[0.8125rem] font-extrabold tracking-[-0.01em] [--k:4px] md:h-12 md:gap-2 md:px-6 md:text-[0.9375rem]"
      >
        <span className="md:hidden">Join ₹1 Cr Pool</span>
        <span className="hidden md:inline">Join the ₹1 Crore Pool</span>
        <span aria-hidden>→</span>
      </a>
    </aside>
  );
}
