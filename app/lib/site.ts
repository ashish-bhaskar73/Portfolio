import type { Metadata } from "next";
import type { Post } from "../blog/posts";
import { profile } from "./data";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ashish-bhaskar.vercel.app";

// Feed autodiscovery link. Any page that sets its own `alternates` replaces the
// layout's object wholesale, so it must spread this back in.
export const rssAlternates = {
  types: { "application/rss+xml": [{ url: "/feed.xml", title: "Writing — RSS" }] },
};

// Metadata merges shallowly: a page that sets only title/description inherits
// the homepage's openGraph and twitter objects, so its share card shows the
// homepage title. Every inner page builds its metadata here instead.
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const shareTitle = `${title} — ${profile.name}`;
  return {
    title,
    description,
    alternates: { ...rssAlternates, canonical: path },
    openGraph: { type: "website", title: shareTitle, description, url: path },
    twitter: { card: "summary_large_image", title: shareTitle, description },
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    description: profile.summary,
    url: siteUrl,
    sameAs: [profile.github, profile.linkedin],
  };
}

// For <script type="application/ld+json">. Escaping "<" stops a value such as
// "</script>" from closing the tag early; JSON parsers read < back as "<".
export function serializeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function blogPostingJsonLd(post: Post) {
  const url = `${siteUrl}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    keywords: post.tags.join(", "),
    url,
    mainEntityOfPage: url,
    image: `${url}/opengraph-image`,
    author: { "@type": "Person", name: profile.name, url: siteUrl },
  };
}
