import { profile } from "./lib/data";
import { ogCard, ogSize } from "./lib/og";

export const alt = `${profile.name} — ${profile.role}`;
export const size = ogSize;
export const contentType = "image/png";

export default function OGImage() {
  return ogCard({
    kicker: "(Portfolio) Backend engineering",
    title: profile.name,
    sub: "Spring Boot microservices · REST APIs · AWS distributed systems",
  });
}
