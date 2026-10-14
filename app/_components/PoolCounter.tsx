"use client";

import { useEffect, useRef, useState } from "react";

const DURATION = 2400;

// Counts 0 → `to` once, when scrolled into view. Renders the final
// value on the server, so no-JS visitors see the amount.
export default function PoolCounter({ to }: { to: number }) {
  const whole = Number.isInteger(to);
  const fmt = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: whole ? 0 : 2,
    maximumFractionDigits: whole ? 0 : 2,
  });
  const [value, setValue] = useState(to);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / DURATION, 1);
          const eased = 1 - Math.pow(1 - t, 4); // fast start, settles onto the target
          setValue(whole ? Math.round(to * eased) : to * eased);
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
  }, [to, whole]);

  return (
    <span ref={ref} className="tabular-nums">
      {fmt.format(value)}
    </span>
  );
}
