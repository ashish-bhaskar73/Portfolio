import Reveal from "./Reveal";

/**
 * Two-column section header: a small mono label on the left, a big display
 * title on the right (stacks on narrow screens). Styles: `.sec-head` in
 * globals.css.
 */
export default function SectionHeading({
  index,
  title,
  subtitle,
  label,
}: {
  index: string;
  title: string;
  subtitle?: string;
  /** Text for the left label; defaults to the title. */
  label?: string;
}) {
  return (
    <Reveal className="sec-head">
      <span className="label">
        ({index}) {label ?? title}
      </span>
      <div>
        <h2>{title}</h2>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-ink-2 leading-relaxed">{subtitle}</p>
        )}
      </div>
    </Reveal>
  );
}
