import Link from "next/link";
import type { ReactNode } from "react";
import { getPost } from "../blog/posts";
import type { CaseStudy as CaseStudyData } from "../lib/data";
import FlowDiagram from "./FlowDiagram";

/** Problem → how it works → decisions → outcome. Empty parts are skipped. */
export default function CaseStudy({ study }: { study: CaseStudyData }) {
  const post = study.relatedPost ? getPost(study.relatedPost) : undefined;
  if (study.relatedPost && !post) {
    throw new Error(`caseStudy.relatedPost "${study.relatedPost}" is not in app/blog/posts.ts`);
  }

  const sections: { title: string; body: ReactNode }[] = [];

  if (study.problem) {
    sections.push({
      title: "The problem",
      body: <p className="max-w-2xl text-lg leading-relaxed text-ink-2">{study.problem}</p>,
    });
  }
  if (study.flow.length) {
    sections.push({ title: "How it works", body: <FlowDiagram steps={study.flow} /> });
  }
  if (study.decisions.length) {
    sections.push({
      title: "Key decisions",
      body: (
        <dl className="grid gap-6">
          {study.decisions.map((d) => (
            <div key={d.choice} className="border-t border-border pt-4">
              <dt className="font-display text-xl font-extrabold tracking-[-0.02em]">{d.choice}</dt>
              <dd className="mt-1.5 max-w-2xl leading-relaxed text-ink-2">{d.why}</dd>
            </div>
          ))}
        </dl>
      ),
    });
  }
  if (study.outcome.length) {
    sections.push({
      title: "Outcome",
      body: (
        <ul className="grid gap-3 sm:grid-cols-2">
          {study.outcome.map((o) => (
            <li key={o} className="border-t border-border pt-3 text-[15px] leading-snug text-ink-2">
              {o}
            </li>
          ))}
        </ul>
      ),
    });
  }

  return (
    <div className="mt-16 grid gap-16">
      {sections.map((s, i) => (
        <section
          key={s.title}
          className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)]"
        >
          {/* font-normal: base h2 is 800, and .label does not set a weight */}
          <h2 className="label pt-1 font-normal">
            ({String(i + 1).padStart(2, "0")}) {s.title}
          </h2>
          <div>{s.body}</div>
        </section>
      ))}

      {post && (
        <Link
          href={`/blog/${post.slug}`}
          className="group grid gap-2 rounded-xl border border-border p-6 transition-colors hover:border-accent"
        >
          <span className="label">Read the deep-dive</span>
          <span className="font-display text-[clamp(22px,2.6vw,32px)] font-extrabold tracking-[-0.03em] group-hover:text-accent">
            {post.title} <span className="text-accent">→</span>
          </span>
        </Link>
      )}
    </div>
  );
}
