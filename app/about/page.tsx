import Image from "next/image";
import { education, profile } from "../lib/data";
import { pageMetadata } from "../lib/site";
import PageHead from "../components/PageHead";
import Reveal from "../components/Reveal";
import Experience from "../components/Experience";
import Cta from "../components/home/Cta";

export const metadata = pageMetadata({
  title: "About",
  description: profile.summary,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHead label="(About) Who I am" title="About me">
        {profile.tagline}
      </PageHead>

      {/* bio: every claim maps to a line in the resume (public/ashish-bhaskar-resume.pdf) */}
      <section className="section">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:items-center md:gap-20">
          <Reveal className="justify-self-center w-full max-w-[400px]">
            <Image
              src={profile.photo}
              alt={`Portrait of ${profile.name}`}
              width={748}
              height={841}
              sizes="(min-width: 768px) 400px, 90vw"
              className="feather w-full h-auto"
            />
          </Reveal>

          <Reveal delay={100} className="grid gap-6 text-lg leading-relaxed text-ink-2 [&_em]:not-italic [&_em]:text-accent">
            <p className="statement text-[clamp(24px,2.8vw,40px)] text-foreground">
              Backend engineer focused on the <em>hard, invisible parts</em> of
              software.
            </p>
            <p>
              I&apos;m a Java Backend Engineer with 2+ years of experience
              designing scalable backend systems with Java 21, Spring Boot,
              PostgreSQL, and Redis. At Xcelore I&apos;m responsible for backend
              architecture, technical design decisions, and development across{" "}
              <em>six microservices of Docsora</em>, covering document
              management, file transfer, and e-signature workflows.
            </p>
            <p>
              My work centers on engineering <em>2 TB file transfers</em> with
              retry and resume, cutting API response times by <em>35%</em>,
              designing <em>multi-region AWS architecture</em> for data
              residency and disaster recovery, and reducing production defects
              by <em>90%</em> through disciplined testing.
            </p>
            <p>
              I care about clean API and database design, event-driven
              architecture, and observability — building services that are
              secure, traceable, and fast under real-world load.
            </p>
          </Reveal>
        </div>
      </section>

      <Experience index="01" />

      {/* education */}
      <section className="section pt-0">
        <Reveal className="rows grid gap-4 pt-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] md:gap-6">
          <span className="label">(02) Education</span>
          <div>
            <h3 className="text-[clamp(22px,2.6vw,36px)] tracking-[-0.035em]">
              {education.degree}
            </h3>
            <p className="mt-3 text-ink-2">
              {education.school} · {education.location}
            </p>
            <p className="label mt-2">
              {education.period} · {education.grade}
            </p>
          </div>
        </Reveal>
      </section>

      <Cta />
    </>
  );
}
