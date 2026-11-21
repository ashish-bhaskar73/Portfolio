import type { Metadata } from "next";
import { rssAlternates } from "../lib/site";

export type Post = {
  slug: string;
  title: string;
  date: string; // ISO yyyy-mm-dd
  excerpt: string;
  tags: string[];
  readingTime: string;
};

// Single source of truth for the /blog listing and the homepage Writing teaser.
// Order newest-first; each slug must match a folder under app/blog/<slug>/page.mdx.
export const posts: Post[] = [
  {
    slug: "engineering-2tb-file-transfers",
    title: "Engineering 2 TB File Transfers with S3 Multipart Uploads",
    date: "2026-06-20",
    excerpt:
      "How to move terabyte-scale files reliably: chunking, parallel part uploads, and retry/resume that survives flaky networks and process restarts.",
    tags: ["AWS S3", "Java", "Resilience"],
    readingTime: "6 min read",
  },
  {
    slug: "multi-region-saas-architecture",
    title: "Designing a Multi-Region SaaS Architecture",
    date: "2026-05-08",
    excerpt:
      "A practical HLD/LLD walkthrough for data residency, disaster recovery, and low-latency access — and the trade-offs that come with going global.",
    tags: ["System Design", "Distributed Systems", "AWS"],
    readingTime: "8 min read",
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

// Metadata merges shallowly: without its own openGraph/twitter objects a post
// inherits the homepage's, and every share card shows the site title instead.
export function postMetadata(slug: string): Metadata {
  const post = getPost(slug);
  if (!post) throw new Error(`No entry in posts.ts for blog slug "${slug}"`);

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { ...rssAlternates, canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${months[m - 1]} ${d}, ${y}`;
}
