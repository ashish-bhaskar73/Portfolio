import type { Project } from "../lib/data";

/** KPI, blurb, highlights and tech for one project; shared by /projects and /projects/[slug]. */
export default function ProjectFacts({ project }: { project: Project }) {
  return (
    <>
      <p className="mt-4 font-mono text-sm text-accent">{project.kpi}</p>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">{project.blurb}</p>

      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {project.highlights.map((h) => (
          <li key={h} className="border-t border-border pt-3 text-[15px] leading-snug text-ink-2">
            {h}
          </li>
        ))}
      </ul>

      <ul className="mt-8 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <li key={t} className="tag">
            {t}
          </li>
        ))}
      </ul>
    </>
  );
}
