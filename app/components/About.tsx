import { education, profile, stats } from "../lib/data";
import Counter from "./Counter";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function About() {
  return (
    <section id="about" className="section">
      <SectionHeading index="01" title="About" />

      <div className="grid gap-10 lg:grid-cols-5">
        <Reveal className="lg:col-span-3 space-y-5 text-muted leading-relaxed">
          <p>
            I&apos;m a{" "}
            <span className="text-foreground font-medium">
              Java Backend Engineer
            </span>{" "}
            with 2 years of experience designing and building the systems behind
            enterprise SaaS products — from{" "}
            <span className="text-accent">Spring Boot microservices</span> and
            REST APIs to AWS-based distributed architectures.
          </p>
          <p>
            My work centers on the hard, invisible parts of software:
            engineering{" "}
            <span className="text-foreground">2 TB file transfers</span> with
            resilient retry and resume, designing{" "}
            <span className="text-foreground">multi-region architectures</span>{" "}
            for data residency and disaster recovery, and driving down
            production defects by <span className="text-foreground">90%</span>{" "}
            through disciplined testing.
          </p>
          <p>
            I care about clean system design (HLD/LLD), event-driven
            architecture, and observability — building services that are secure,
            traceable, and fast under real-world load.
          </p>

          {/* education card */}
          <div className="card-strong mt-8 p-5">
            <p className="font-mono text-xs uppercase tracking-widest text-faint mb-2">
              Education
            </p>
            <h3 className="text-foreground font-medium">{education.degree}</h3>
            <p className="text-sm text-muted mt-1">
              {education.school} · {education.location}
            </p>
            <p className="text-sm text-faint mt-1 font-mono">
              {education.period} · {education.grade}
            </p>
          </div>
        </Reveal>

        {/* stats grid */}
        <Reveal className="lg:col-span-2" delay={120}>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="card-strong p-5 hover:border-accent/40 transition-colors"
              >
                <div className="text-2xl font-bold text-gradient font-mono">
                  <Counter value={s.value} />
                </div>
                <div className="mt-2 text-xs leading-snug text-muted">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <div className="card-strong mt-4 p-5 font-mono text-xs text-muted">
            <p>
              <span className="text-accent">const</span>{" "}
              <span className="text-cyan">engineer</span> = {"{"}
            </p>
            <p className="pl-4">
              focus: <span className="text-amber">&quot;backend systems&quot;</span>,
            </p>
            <p className="pl-4">
              base: <span className="text-amber">&quot;{profile.location.split(",")[0]}&quot;</span>,
            </p>
            <p className="pl-4">
              status: <span className="text-accent">&quot;open to opportunities&quot;</span>,
            </p>
            <p>{"};"}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
