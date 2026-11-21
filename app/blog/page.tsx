import PageHead from "../components/PageHead";
import WorkRows from "../components/home/WorkRows";
import { pageMetadata } from "../lib/site";
import { formatDate, posts } from "./posts";

export const metadata = pageMetadata({
  title: "Writing",
  description:
    "Technical writing on backend engineering, distributed systems, and AWS by Ashish Bhaskar.",
  path: "/blog",
});

export default function BlogIndex() {
  return (
    <>
      <PageHead label="(Writing) Notes" title="Writing">
        Notes on backend engineering, distributed systems, and building reliable
        software at scale.
      </PageHead>
      <section className="section">
        <WorkRows
          items={posts.map((p) => ({
            href: `/blog/${p.slug}`,
            title: p.title,
            meta: p.excerpt,
            kpi: `${formatDate(p.date)} · ${p.readingTime}`,
          }))}
        />
      </section>
    </>
  );
}
