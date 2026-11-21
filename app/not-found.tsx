import type { Metadata } from "next";
import Link from "next/link";
import PageHead from "./components/PageHead";

export const metadata: Metadata = {
  title: "Page not found",
};

// Rendered inside app/layout.tsx, so Nav and Footer are already on the page.
export default function NotFound() {
  return (
    <>
      <PageHead label="(404) Not found" title="Lost the thread.">
        This page doesn’t exist, or it moved. Here’s where the good stuff lives:
      </PageHead>
      <section className="section">
        <div className="flex flex-wrap gap-3">
          <Link href="/" className="btn">
            Home <span className="arr">→</span>
          </Link>
          <Link href="/projects" className="btn ghost">
            Projects <span className="arr">→</span>
          </Link>
          <Link href="/blog" className="btn ghost">
            Writing <span className="arr">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
