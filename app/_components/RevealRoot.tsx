"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function RevealRoot() {
  // Re-scan on route change: the layout persists, the [data-reveal] nodes don't.
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;

    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (nodes.length === 0) return;

    if (process.env.NODE_ENV !== "production") {
      const nested = nodes.filter(
        (n) => n.parentElement?.closest("[data-reveal]"),
      );
      if (nested.length > 0) {
        console.warn(
          `[campaign] ${nested.length} element(s) with data-reveal are inside another data-reveal. ` +
            "The ancestor's fade hides their stagger — move the ancestor's reveal onto a child that has no staggered descendants.",
          nested,
        );
      }
    }

    const reveal = (el: HTMLElement) => {
      el.dataset.revealed = "true";
    };

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      nodes.forEach(reveal);
      root.classList.remove("reveal-ready");
      return;
    }

    let observerFired = false;

    const observer = new IntersectionObserver(
      (entries) => {
        observerFired = true;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target as HTMLElement);

          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.1,
      },
    );

    nodes.forEach((node) => observer.observe(node));

    const failsafe = window.setTimeout(() => {
      if (observerFired) return;
      nodes.forEach(reveal);
      observer.disconnect();
    }, 3000);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, [pathname]);

  return null;
}
