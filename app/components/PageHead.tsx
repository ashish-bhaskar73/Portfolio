import type { ReactNode } from "react";

/** Top-of-page title block for inner pages (/about, /projects, …). */
export default function PageHead({
  label,
  title,
  children,
}: {
  label: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="wrap pt-[clamp(40px,8vw,110px)] pb-[clamp(32px,5vw,64px)] border-b border-foreground">
      <span className="hero-fade label block mb-6">{label}</span>
      <h1 className="hero-name">
        <span className="ln">
          <span>{title}</span>
        </span>
      </h1>
      {children && (
        <div className="hero-fade mt-8 max-w-2xl text-lg leading-relaxed text-ink-2">
          {children}
        </div>
      )}
    </header>
  );
}
