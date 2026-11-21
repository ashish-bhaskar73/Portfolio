import Link from "next/link";
import { projects, stats } from "./lib/data";
import { formatDate, posts } from "./blog/posts";
import Preloader from "./components/Preloader";
import Reveal from "./components/Reveal";
import Counter from "./components/Counter";
import HeroStudio from "./components/home/HeroStudio";
import Marquee from "./components/home/Marquee";
import WorkRows from "./components/home/WorkRows";
import Cta from "./components/home/Cta";
import SectionHeading from "./components/SectionHeading";

export default function Home() {
  return (
    <>
      <Preloader />
      <HeroStudio />

      {/* intro statement + stats */}
      <section className="section">
        <Reveal className="sec-head items-start">
          <span className="label">(01) What I do</span>
          <div className="grid gap-8 justify-items-start">
            <p className="statement">
              I build the backend systems behind enterprise SaaS — moving{" "}
              <em>2 TB files</em>, spanning <em>multiple regions</em>, and
              shipping with <em>90% fewer defects</em>.
            </p>
            <Link href="/about" className="btn ghost">
              More about me <span className="arr">→</span>
            </Link>
          </div>
        </Reveal>

        <Reveal className="stats mt-[clamp(48px,7vw,96px)]">
          {stats.map((s) => (
            <div key={s.label} className="stat">
              <b>
                <Counter value={s.value} />
              </b>
              <span>{s.label}</span>
            </div>
          ))}
        </Reveal>
      </section>

      <Marquee />

      {/* selected work */}
      <section className="section">
        <SectionHeading
          index="02"
          label="Selected work"
          title="Systems I’ve built"
          subtitle="Production platforms where I owned the backend — architecture, APIs, and the hard reliability problems."
        />
        <WorkRows
          items={projects.slice(0, 4).map((p) => ({
            href: `/projects/${p.slug}`,
            title: p.name,
            meta: p.meta,
            kpi: p.kpi,
          }))}
        />
        <Reveal className="mt-8">
          <Link href="/projects" className="btn ghost">
            All projects <span className="arr">→</span>
          </Link>
        </Reveal>
      </section>

      {/* writing */}
      <section className="section pt-0">
        <SectionHeading index="03" label="Writing" title="Notes from the backend" />
        <WorkRows
          items={posts.slice(0, 3).map((p) => ({
            href: `/blog/${p.slug}`,
            title: p.title,
            meta: p.tags.join(" · "),
            kpi: `${formatDate(p.date)} · ${p.readingTime}`,
          }))}
        />
      </section>

      <Cta />
    </>
  );
}
