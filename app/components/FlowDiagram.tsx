import type { CaseStudy } from "../lib/data";

/** Numbered steps joined by arrows: a row on desktop, a stack on mobile. */
export default function FlowDiagram({ steps }: { steps: CaseStudy["flow"] }) {
  return (
    <ol className="grid gap-3 md:flex md:items-stretch md:gap-0">
      {steps.map((step, i) => (
        <li key={step.title} className="flex flex-col items-center gap-3 md:flex-1 md:flex-row">
          <div className="w-full flex-1 self-stretch rounded-xl border border-border bg-surface/40 p-4">
            <span className="label">{String(i + 1).padStart(2, "0")}</span>
            <p className="mt-2 font-display text-lg font-extrabold tracking-[-0.02em]">
              {step.title}
            </p>
            <p className="mt-1 text-sm leading-snug text-ink-2">{step.detail}</p>
          </div>
          {i < steps.length - 1 && (
            <span aria-hidden className="rotate-90 font-mono text-lg text-accent md:mx-2 md:rotate-0">
              →
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
