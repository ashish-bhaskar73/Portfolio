import Link from "next/link";
import Reveal from "../Reveal";

/** Giant closing call-to-action, shared by the home and inner pages. */
export default function Cta() {
  return (
    <section className="section">
      <Reveal className="cta">
        <span className="label avail">Open to backend roles &amp; collaborations</span>
        <h2>
          Let’s build
          <br />
          something <span>solid.</span>
        </h2>
        <p className="max-w-md text-ink-2">
          Have a role, a system to design, or a gnarly backend problem? I’d like
          to hear about it.
        </p>
        <Link href="/contact" className="btn">
          Get in touch <span className="arr">→</span>
        </Link>
      </Reveal>
    </section>
  );
}
