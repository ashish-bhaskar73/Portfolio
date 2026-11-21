import { projects } from "../../lib/data";
import { ogCard, ogSize } from "../../lib/og";

export const alt = "Project case study";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) throw new Error(`No project with slug "${slug}"`);

  const [name, tagline] = project.name.split(" — ");
  return ogCard({
    kicker: `(Project) ${project.kpi}`,
    title: name,
    sub: tagline ?? project.meta,
  });
}
