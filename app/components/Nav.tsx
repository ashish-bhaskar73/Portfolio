"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, profile } from "../lib/data";
import ThemeToggle from "./ThemeToggle";

// A link is "current" for its own route and any child route (/blog/post → Writing).
function isCurrent(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function Brand() {
  return (
    <span className="flex items-center gap-2 font-display text-[15px] font-extrabold tracking-[-0.01em]">
      <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
      {profile.name}
    </span>
  );
}

export default function Nav() {
  const pathname = usePathname();
  // Remember the route the menu was opened on. `open` is derived from it, so
  // navigating anywhere else closes the menu in the same render — no effect.
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const open = menuPath === pathname;
  const setOpen = (v: boolean) => setMenuPath(v ? pathname : null);

  // While open: lock page scroll and let Escape close it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuPath(null);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const city = profile.location.split(",")[0];

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-md">
        <div className="wrap grid grid-cols-[1fr_auto] min-[901px]:grid-cols-[1fr_auto_1fr] items-center gap-4 py-4">
          <Link href="/" aria-current={pathname === "/" ? "page" : undefined}>
            <Brand />
          </Link>

          <span className="hidden min-[901px]:block font-mono text-xs text-muted whitespace-nowrap">
            {city}, IN
          </span>

          <nav aria-label="Main" className="justify-self-end flex items-center gap-[22px]">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isCurrent(pathname, l.href) ? "page" : undefined}
                className="ulink hidden min-[901px]:inline text-sm text-ink-2 aria-[current=page]:text-foreground"
              >
                {l.label}
              </Link>
            ))}
            <ThemeToggle />
            {/* <a>, not <Link>: a PDF is not an app route to prefetch. */}
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener"
              className="btn ghost hidden min-[901px]:inline-flex"
            >
              Résumé <span className="arr">↗</span>
            </a>
            <Link href="/contact" className="btn hidden min-[901px]:inline-flex">
              Let’s talk <span className="arr">→</span>
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="min-[901px]:hidden py-2 text-sm font-semibold"
            >
              Menu
            </button>
          </nav>
        </div>
      </header>

      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="wrap fixed inset-0 z-[70] flex flex-col gap-2 bg-background pt-[18px] pb-8"
        >
          <div className="mb-7 flex items-center justify-between">
            <Brand />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="py-2 text-sm font-semibold"
              autoFocus
            >
              Close
            </button>
          </div>
          {[{ href: "/", label: "Home" }, ...navLinks].map((l) => {
            const current = l.href === "/" ? pathname === "/" : isCurrent(pathname, l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={current ? "page" : undefined}
                className="font-display text-[clamp(40px,12vw,64px)] font-extrabold leading-[1.05] tracking-[-0.04em] aria-[current=page]:text-accent"
              >
                {l.label}
              </Link>
            );
          })}
          <div className="mt-auto grid gap-3 justify-items-start">
            <span className="label avail">Open to opportunities</span>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="btn">
                Let’s talk <span className="arr">→</span>
              </Link>
              <a href={profile.resume} target="_blank" rel="noopener" className="btn ghost">
                Résumé <span className="arr">↗</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
