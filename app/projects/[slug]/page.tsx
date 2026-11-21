import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CaseStudy from "../../components/CaseStudy";
import PageHead from "../../components/PageHead";
import ProjectFacts from "../../components/ProjectFacts";
import Cta from "../../components/home/Cta";
import { projects } from "../../lib/data";
import { rssAlternates } from "../../lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: project.name,
    description: project.blurb,
    alternates: { ...rssAlternates, canonical: `/projects/${slug}` },
    openGraph: { title: project.name, description: project.blurb },
    twitter: { title: project.name, description: project.blurb },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const prev = projects[index - 1];
  const next = projects[index + 1];

  return (
    <>
      <PageHead label={`(Project ${String(index + 1).padStart(2, "0")}) Case study`} title={project.name} />

      <article className="section">
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)]">
          <div className="grid gap-2 content-start">
            <Link href="/projects" className="label ulink">
              ← All projects
            </Link>
            <span className="label mt-6">{project.meta}</span>
            {project.period && <span className="label">{project.period}</span>}
          </div>
          <div>
            <ProjectFacts project={project} />
          </div>
        </div>

        {project.caseStudy && <CaseStudy study={project.caseStudy} />}

        <nav
          aria-label="More projects"
          className="mt-16 flex flex-wrap justify-between gap-4 border-t border-border pt-8"
        >
          {prev ? (
            <Link href={`/projects/${prev.slug}`} className="btn ghost">
              ← {prev.name.split(" — ")[0]}
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={`/projects/${next.slug}`} className="btn ghost">
              {next.name.split(" — ")[0]} <span className="arr">→</span>
            </Link>
          )}
        </nav>
      </article>

      <Cta />
    </>
  );
}
