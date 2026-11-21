import Link from "next/link";
import { profile } from "../../lib/data";
import DepthPortrait from "./DepthPortrait";

// A dedicated field, not a lookup into `stats`: the stats list changes with
// the resume, and a missed match would silently render an empty string.
const experience = profile.experience;

export default function HeroStudio() {
  const [first, ...rest] = profile.name.split(" ");
  const city = profile.location.split(",")[0];

  return (
    <section
      aria-label="Introduction"
      className="relative grid overflow-hidden min-h-[min(calc(100svh-68px),980px)]"
    >
      {/* photo: centred on the baseline, edges feathered into the paper,
          with depth-parallax "3D" motion layered on top (DepthPortrait) */}
      <div className="hero-fade pointer-events-none absolute bottom-0 left-1/2 w-[min(78vw,440px)] -translate-x-1/2 md:w-[min(36vw,460px)]">
        <DepthPortrait />
      </div>

      <div className="wrap relative z-10 grid grid-rows-[auto_1fr_auto] pt-6 pb-7">
        {/* side annotations */}
        <div className="hero-fade flex justify-between gap-6 md:mt-[12vh]">
          <div className="grid gap-1.5 max-w-[220px]">
            <span className="label avail">Open to opportunities</span>
            <strong className="text-sm font-semibold">Based in {city}, India</strong>
          </div>
          <div className="grid gap-1.5 max-w-[220px] text-right">
            <span className="label">Experience</span>
            <strong className="text-sm font-semibold">
              {experience} · {profile.role}
            </strong>
          </div>
        </div>

        <div aria-hidden />

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h1 className="hero-name">
            <span className="ln">
              <span>{first}</span>
            </span>
            <span className="ln">
              <span>
                {rest.join(" ")}
                <span className="text-accent">.</span>
              </span>
            </span>
          </h1>
          <div className="hero-fade max-w-[290px] bg-background/70 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none">
            <span className="label mb-2 block">What I do</span>
            <p className="text-sm leading-normal text-ink-2">{profile.tagline}</p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <a href={profile.resume} target="_blank" rel="noopener" className="btn">
                Résumé <span className="arr">↗</span>
              </a>
              <Link href="/contact" className="btn ghost">
                Get in touch <span className="arr">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
