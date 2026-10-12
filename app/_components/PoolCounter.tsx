"use client";

import { useEffect, useRef, useState } from "react";

const TARGET = 1_00_00_000; // ₹1 Crore
const DURATION = 2400;
const fmt = new Intl.NumberFormat("en-IN");

// Counts 0 → ₹1,00,00,000 once, when scrolled into view. Renders the final
// value on the server, so no-JS and reduced-motion visitors see the amount.
export default function PoolCounter() {
  const [value, setValue] = useState(TARGET);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / DURATION, 1);
          const eased = 1 - Math.pow(1 - t, 4); // fast start, settles onto the target
          setValue(Math.round(TARGET * eased));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        setValue(0);
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <span ref={ref} aria-hidden className="tabular-nums">
        ₹{fmt.format(value)}
      </span>
      <span className="sr-only">₹1 Crore</span>
    </>
  );
}
