import PageHead from "../components/PageHead";
import Projects from "../components/Projects";
import Cta from "../components/home/Cta";
import { pageMetadata } from "../lib/site";

export const metadata = pageMetadata({
  title: "Projects",
  description:
    "Production backend platforms built by Ashish Bhaskar — document & e-signature SaaS and identity lifecycle systems.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHead label="(Projects) Selected work" title="Projects">
        Systems I’ve designed and built end to end — the architecture, the
        APIs, and the reliability problems in between.
      </PageHead>
      <Projects />
      <Cta />
    </>
  );
}
