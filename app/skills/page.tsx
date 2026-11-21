import PageHead from "../components/PageHead";
import Skills from "../components/Skills";
import Cta from "../components/home/Cta";
import { pageMetadata } from "../lib/site";

export const metadata = pageMetadata({
  title: "Skills",
  description:
    "Languages, frameworks, cloud services and practices Ashish Bhaskar works with: Java, Spring Boot, PostgreSQL, Redis, RabbitMQ, AWS.",
  path: "/skills",
});

export default function SkillsPage() {
  return (
    <>
      <PageHead label="(Skills) Toolbox" title="Skills">
        The languages, systems, and practices I work with day to day.
      </PageHead>
      <Skills />
      <Cta />
    </>
  );
}
