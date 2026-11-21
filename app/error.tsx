"use client";

import { useEffect } from "react";
import PageHead from "./components/PageHead";
import { profile } from "./lib/data";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <PageHead label="(Error) Something broke" title="That wasn’t supposed to happen.">
        Something went wrong loading this page. Trying again usually fixes it.
      </PageHead>
      <section className="section">
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" onClick={() => unstable_retry()} className="btn">
            Try again <span className="arr">→</span>
          </button>
          <a href={`mailto:${profile.email}`} className="btn ghost">
            Email me instead
          </a>
        </div>
        {/* The digest matches the server log entry for this error. */}
        {error.digest && <p className="label mt-8">Ref: {error.digest}</p>}
      </section>
    </>
  );
}
