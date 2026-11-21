import Link from "next/link";
import Reveal from "../Reveal";

export type RowItem = {
  href: string;
  title: string;
  meta: string;
  kpi: string;
};

/**
 * Linked list rows: title · meta · mono KPI · round arrow. On hover the row
 * nudges right and the arrow turns accent-blue and rotates (styles: `.row`).
 */
export default function WorkRows({ items }: { items: RowItem[] }) {
  return (
    <Reveal className="rows">
      {items.map((it) => (
        <Link key={it.href} href={it.href} className="row">
          <h3>{it.title}</h3>
          <span className="meta">{it.meta}</span>
          <span className="kpi">{it.kpi}</span>
          <span className="go" aria-hidden>
            →
          </span>
        </Link>
      ))}
    </Reveal>
  );
}
