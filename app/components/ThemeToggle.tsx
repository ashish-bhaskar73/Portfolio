"use client";

import { useEffect, useSyncExternalStore } from "react";
import { BAR_COLOR, type Theme } from "../lib/theme";
import { MoonIcon, SunIcon } from "./icons";

// The theme lives on <html data-theme>, set before paint by the script in
// app/layout.tsx. React reads it from there instead of keeping a copy.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

function getTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

// The server cannot know the theme; null keeps hydration consistent.
function getServerTheme(): Theme | null {
  return null;
}

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore<Theme | null>(subscribe, getTheme, getServerTheme);
  const mounted = theme !== null;

  // The layout's theme-color tags follow the OS; repoint them at the theme
  // actually shown, so the mobile browser bar matches after a toggle.
  useEffect(() => {
    if (!theme) return;
    for (const meta of document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')) {
      meta.content = BAR_COLOR[theme];
    }
  }, [theme]);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      title={`Switch to ${isDark ? "light" : "dark"} theme`}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-ink-2 hover:bg-foreground hover:text-background hover:border-foreground transition-colors ${className}`}
    >
      {/* render both to avoid hydration mismatch; reveal after mount */}
      <span className={mounted ? "" : "opacity-0"}>
        {isDark ? (
          <SunIcon width={17} height={17} />
        ) : (
          <MoonIcon width={17} height={17} />
        )}
      </span>
    </button>
  );
}
