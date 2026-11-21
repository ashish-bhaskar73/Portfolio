import { ogCard } from "../lib/og";
import { formatDate, getPost } from "./posts";

export { ogSize } from "../lib/og";

// Shared by each post's opengraph-image.tsx.
export function renderPostOg(slug: string) {
  const post = getPost(slug);
  if (!post) throw new Error(`No entry in posts.ts for blog slug "${slug}"`);

  return ogCard({
    kicker: `(Writing) ${formatDate(post.date)} · ${post.readingTime}`,
    title: post.title,
    sub: post.tags.join(" · "),
  });
}
