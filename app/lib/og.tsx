import { ImageResponse } from "next/og";
import { profile } from "./data";
import { siteUrl } from "./site";

export const ogSize = { width: 1200, height: 630 };

// Paper palette from app/globals.css (:root). Satori cannot read CSS variables.
const paper = "#fdfdfd";
const ink = "#111216";
const muted = "#6c6f7a";
const hairline = "#e3e4ea";
const accent = "#2445ff";

/** One share-card layout for every page: homepage, posts and projects. */
export function ogCard({
  kicker,
  title,
  sub,
}: {
  kicker: string;
  title: string;
  sub?: string;
}) {
  const titleSize = title.length > 60 ? 60 : title.length > 32 ? 72 : 96;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: paper,
          borderTop: `14px solid ${accent}`,
          padding: "64px 80px 56px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "monospace",
            fontSize: 24,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: muted,
          }}
        >
          {kicker}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontSize: titleSize,
            fontWeight: 800,
            letterSpacing: -2.5,
            lineHeight: 1.02,
            color: ink,
            maxWidth: 1040,
          }}
        >
          {title}
        </div>

        {sub && (
          <div
            style={{ display: "flex", marginTop: 28, fontSize: 30, color: muted, maxWidth: 980 }}
          >
            {sub}
          </div>
        )}

        <div
          style={{
            display: "flex",
            marginTop: "auto",
            paddingTop: 28,
            borderTop: `2px solid ${hairline}`,
            justifyContent: "space-between",
            fontSize: 26,
          }}
        >
          <div style={{ display: "flex", color: ink, fontWeight: 700 }}>
            {profile.name} · {profile.role}
          </div>
          <div style={{ display: "flex", color: accent, fontWeight: 700 }}>
            {new URL(siteUrl).host}
          </div>
        </div>
      </div>
    ),
    { ...ogSize },
  );
}
