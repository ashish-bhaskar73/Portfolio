import { marquee } from "../../lib/data";

/**
 * Infinite tech-name ticker. The list is rendered twice inside one track and
 * the track animates to translateX(-50%): at that point copy #2 sits exactly
 * where copy #1 began, so the loop restarts invisibly. Copy #2 is aria-hidden
 * so assistive tech reads the list once. Pauses on hover; reduced motion
 * stops it (global rule in globals.css).
 */
export default function Marquee() {
  return (
    <div className="marquee" role="region" aria-label="Technologies I work with">
      <div className="track">
        {[0, 1].map((copy) => (
          <div key={copy} className="inline-flex" aria-hidden={copy === 1 || undefined}>
            {marquee.map((t) => (
              <span key={t} className="item">
                {t}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
