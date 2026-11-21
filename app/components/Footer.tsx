import Link from "next/link";
import { navLinks, profile } from "../lib/data";

const elsewhere = [
  { href: profile.linkedin, label: "LinkedIn", external: true },
  { href: profile.github, label: "GitHub", external: true },
  { href: profile.resume, label: "Résumé (PDF)", external: false },
];

export default function Footer() {
  return (
    <footer className="mt-[clamp(40px,6vw,80px)] border-t border-border">
      <div className="wrap grid gap-10 pt-10 pb-7">
        <div className="grid gap-6 md:grid-cols-[minmax(0,1.4fr)_repeat(2,minmax(0,1fr))]">
          <div className="grid gap-3 content-start">
            <span className="label">Say hello</span>
            <a
              href={`mailto:${profile.email}`}
              className="font-display text-[clamp(19px,2.3vw,32px)] font-extrabold tracking-[-0.03em] [overflow-wrap:anywhere] hover:text-accent transition-colors"
            >
              {profile.email}
            </a>
          </div>

          <div>
            <h4 className="label mb-3 font-mono font-medium">Pages</h4>
            <ul className="grid gap-1.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-accent transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="label mb-3 font-mono font-medium">Elsewhere</h4>
            <ul className="grid gap-1.5">
              {elsewhere.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    {...(l.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : { download: true })}
                    className="hover:text-accent transition-colors"
                  >
                    {l.label}
                    {l.external && " ↗"}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-2">
          <span className="label">
            © {new Date().getFullYear()} {profile.name}
          </span>
          <span className="label">{profile.role} · {profile.location.split(",")[0]}</span>
        </div>
      </div>
    </footer>
  );
}
