import Link from "next/link";
import { projectsUsing, skills } from "../lib/data";
import Reveal from "./Reveal";

export default function Skills() {
  return (
    <section id="skills" className="section">
      <p className="label mb-8">
        Superscripts link to the projects where I used each skill.
      </p>
      <div className="rows">
        {skills.map((group, i) => (
          <Reveal
            key={group.label}
            delay={(i % 3) * 60}
            className="grid gap-3 border-b border-border py-7 md:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] md:gap-6"
          >
            <span className="label pt-2">
              ({String(i + 1).padStart(2, "0")}) {group.label}
            </span>
            <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 font-display text-[clamp(22px,2.6vw,38px)] font-bold leading-tight tracking-[-0.03em]">
              {group.items.map((item, j) => {
                const usedIn = projectsUsing(item);
                return (
                  <li key={item} className="inline-flex items-center gap-4">
                    {j > 0 && (
                      <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
                    )}
                    <span>
                      {item}
                      {usedIn.length > 0 && (
                        <sup className="ml-1 align-super font-mono text-[11px] font-normal tracking-[0.04em] text-muted">
                          {usedIn.map((p, k) => (
                            <span key={p.slug}>
                              {k > 0 && " · "}
                              <Link href={`/projects/${p.slug}`} className="ulink hover:text-accent">
                                {p.name.split(" — ")[0]}
                              </Link>
                            </span>
                          ))}
                        </sup>
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
