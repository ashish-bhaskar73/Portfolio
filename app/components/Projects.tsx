import Link from "next/link";
import { projects } from "../lib/data";
import ProjectFacts from "./ProjectFacts";
import Reveal from "./Reveal";

/**
 * Full project list. Each block keeps id={slug} so older /projects#<slug>
 * links still scroll; the canonical link is /projects/<slug>.
 */
export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="rows">
        {projects.map((project, i) => (
          <Reveal
            key={project.slug}
            as="article"
            id={project.slug}
            className="grid gap-6 border-b border-border py-[clamp(32px,5vw,64px)] md:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] scroll-mt-24"
          >
            <div className="grid gap-2 content-start">
              <span className="label">({String(i + 1).padStart(2, "0")})</span>
              <span className="label">{project.meta}</span>
              {project.period && <span className="label">{project.period}</span>}
            </div>

            <div>
              <h2 className="text-[clamp(30px,4.4vw,64px)] tracking-[-0.04em]">
                <Link href={`/projects/${project.slug}`} className="hover:text-accent transition-colors">
                  {project.name}
                </Link>
              </h2>
              <ProjectFacts project={project} />
              <Link href={`/projects/${project.slug}`} className="btn ghost mt-8">
                Case study <span className="arr">→</span>
              </Link>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
