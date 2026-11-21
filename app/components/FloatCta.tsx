"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/** Phone-only floating "Let's talk" button (hidden ≥901px via .float-cta CSS). */
export default function FloatCta() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const nearEnd =
        window.innerHeight + window.scrollY >
        document.documentElement.scrollHeight - 420;
      setShow(window.scrollY > 500 && !nearEnd);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  if (pathname === "/contact") return null;

  return (
    <Link
      href="/contact"
      className={`btn float-cta ${show ? "show" : ""}`}
      aria-hidden={!show}
      tabIndex={show ? 0 : -1}
    >
      Let’s talk <span className="arr">→</span>
    </Link>
  );
}
