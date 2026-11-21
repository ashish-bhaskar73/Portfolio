import Link from "next/link";
import type { ReactNode } from "react";
import { blogPostingJsonLd, serializeJsonLd } from "../lib/site";
import { formatDate, getPost } from "./posts";

// Nav, Footer and <main> come from app/layout.tsx — not rendered here.
export default function PostLayout({
  slug,
  children,
}: {
  slug: string;
  children: ReactNode;
}) {
  const post = getPost(slug);

  return (
    <article className="wrap pt-[clamp(32px,6vw,80px)] pb-20">
      <div className="mx-auto max-w-[720px]">
        <Link href="/blog" className="label ulink">
          ← All writing
        </Link>

        {post && (
          <script
            type="application/ld+json"
            // Raw JSON is required inside a JSON-LD script; serializeJsonLd escapes "<".
            dangerouslySetInnerHTML={{ __html: serializeJsonLd(blogPostingJsonLd(post)) }}
          />
        )}

        {post && (
          <header className="mt-8 mb-10 border-b border-foreground pb-10">
            <p className="label">
              <time dateTime={post.date}>{formatDate(post.date)}</time> ·{" "}
              {post.readingTime}
            </p>
            <h1 className="mt-5 text-[clamp(36px,5.4vw,72px)] leading-[0.95] tracking-[-0.045em]">
              {post.title}
            </h1>
            <ul className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <li key={t} className="tag">
                  {t}
                </li>
              ))}
            </ul>
          </header>
        )}

        <div className="text-[17px]">{children}</div>
      </div>
    </article>
  );
}
