import Link from "next/link";
import { formatDate, posts } from "../blog/posts";
import { ArrowRightIcon } from "./icons";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Writing() {
  const latest = posts.slice(0, 2);

  return (
    <section id="writing" className="section">
      <SectionHeading
        index="06"
        title="Writing"
        subtitle="Notes on backend engineering, distributed systems, and building reliable software at scale."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {latest.map((post, i) => (
          <Reveal key={post.slug} delay={(i % 2) * 90} as="article">
            <Link
              href={`/blog/${post.slug}`}
              className="card-lg group flex h-full flex-col bg-surface/40 p-6 hover:border-accent/40 hover:bg-surface transition-colors"
            >
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-faint">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span>·</span>
                <span>{post.readingTime}</span>
              </div>
              <h3 className="mt-2 text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                {post.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                {post.excerpt}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 font-mono text-xs text-accent">
                read
                <ArrowRightIcon
                  width={14}
                  height={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120} className="mt-8">
        <Link
          href="/blog"
          className="btn-secondary"
        >
          View all posts
          <ArrowRightIcon width={16} height={16} />
        </Link>
      </Reveal>
    </section>
  );
}
