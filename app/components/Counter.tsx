"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animates a numeric value up when it scrolls into view. Values that aren't
 * numeric (e.g. "Multi-region") are rendered as-is. The `value` may include a
 * prefix/suffix around one number, e.g. "2 TB", "90%", "2 yrs".
 */
const NUMBER_RE = /^(\D*)(\d+(?:\.\d+)?)(.*)$/;

export default function Counter({ value }: { value: string }) {
  const match = value.match(NUMBER_RE);
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(match ? 0 : null);

  // Parses `value` itself so the only dependency is the string, not the
  // match array (a new object every render).
  useEffect(() => {
    const m = value.match(NUMBER_RE);
    if (!m) return;
    const el = ref.current;
    if (!el) return;
    const target = parseFloat(m[2]);
    const decimals = (m[2].split(".")[1] || "").length;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          io.unobserve(entry.target);
          if (prefersReduced) {
            setDisplay(target);
            return;
          }
          const duration = 1100;
          let start = 0;
          const step = (ts: number) => {
            if (!start) start = ts;
            const p = Math.min((ts - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setDisplay(parseFloat((target * eased).toFixed(decimals)));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  if (!match) return <span ref={ref}>{value}</span>;

  return (
    <span ref={ref}>
      {match[1]}
      {display}
      {match[3]}
    </span>
  );
}
