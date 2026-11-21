import { experience } from "../lib/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Experience({ index = "02" }: { index?: string }) {
  return (
    <section id="experience" className="section">
      <SectionHeading
        index={index}
        title="Experience"
        subtitle="Where I've shipped production systems that enterprises rely on."
      />

      <div className="rows">
        {experience.map((job, i) => (
          <Reveal
            key={job.company}
            delay={i * 80}
            className="grid gap-4 border-b border-border py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] md:gap-6"
          >
            <div className="grid gap-1 content-start">
              <span className="label text-foreground">{job.company}</span>
              <span className="label">{job.period}</span>
              <span className="label">{job.location}</span>
            </div>

            <div>
              <h3 className="text-[clamp(22px,2.6vw,36px)] tracking-[-0.035em]">
                {job.role}
              </h3>
              <ul className="mt-5 grid gap-2.5">
                {job.points.map((point, j) => (
                  <li
                    key={j}
                    className="relative pl-5 text-[15px] leading-relaxed text-ink-2"
                  >
                    <span className="absolute left-0 top-[0.7em] h-1.5 w-1.5 rounded-full bg-accent" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
