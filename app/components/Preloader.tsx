"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "../lib/data";

const KEY = "loader-seen";
// Short on purpose: every first visit waits for it, and the hero's own entrance
// animation plays underneath (it used to finish before the loader cleared).
const DURATION = 450; // ms for the 0 → 100 count
const EXIT_MS = 400; // must match `.loader.done` transition in app/globals.css

/**
 * Home-page intro: a counter runs 0 → 100 with a top bar, then the sheet
 * slides up. Shown once per browser session, never under reduced motion.
 *
 * The inline script below runs during HTML parsing (before paint/hydration)
 * and adds `html.loader-seen` when the loader should be skipped, so repeat
 * visitors never see a flash of it. CSS in globals.css hides it in that case.
 */
export default function Preloader() {
  const [n, setN] = useState(0);
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);
  const raf = useRef(0);

  useEffect(() => {
    // Already seen / reduced motion: CSS (html.loader-seen) keeps it hidden.
    if (document.documentElement.classList.contains(KEY)) return;
    const start = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / DURATION);
      // ease-out so the count slows as it approaches 100
      setN(Math.round(100 * (1 - Math.pow(1 - p, 3))));
      if (p < 1) {
        raf.current = requestAnimationFrame(step);
      } else {
        try {
          sessionStorage.setItem(KEY, "1");
        } catch {}
        document.documentElement.classList.add(KEY);
        setDone(true);
      }
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  // Unmount after the slide-up transition finishes.
  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => setGone(true), EXIT_MS);
    return () => clearTimeout(t);
  }, [done]);

  if (gone) return null;

  return (
    <>
      <div className={`loader ${done ? "done" : ""}`} aria-hidden>
        <div className="bar" style={{ width: `${n}%` }} />
        <span className="label tag-line hidden sm:block">
          {profile.name} — {profile.role}
        </span>
        <span className="count">
          {n}
          <small className="ml-[0.1em] text-[0.2em] font-medium tracking-normal">%</small>
        </span>
      </div>
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){try{if(sessionStorage.getItem('${KEY}')||matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('${KEY}');}}catch(e){}})();`,
        }}
      />
    </>
  );
}
