import PageHead from "../components/PageHead";
import Contact from "../components/Contact";
import { pageMetadata } from "../lib/site";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Get in touch with Ashish Bhaskar about backend engineering roles, projects, or system design.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHead
        label="(Contact) Say hello"
        title={
          <>
            Let’s <span className="text-accent">talk.</span>
          </>
        }
      >
        Have a role, a project, or a system design problem to talk through? My
        inbox is open.
      </PageHead>
      <Contact />
    </>
  );
}
