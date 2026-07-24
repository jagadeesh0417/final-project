"use client";

import { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="shell flex min-h-[70vh] flex-col justify-center py-32">
      <p className="eyebrow">Something broke</p>
      <h1 className="display d-lg mt-8">That page did not draw.</h1>
      <p className="lede mt-6">
        The register is still there. Try again, and if it keeps failing, ring the desk on
        +91 98490 11204.
      </p>
      {error.digest ? <p className="data mt-6">Reference {error.digest}</p> : null}
      <div className="mt-12">
        <button className="btn btn-solid" onClick={reset}>Try again</button>
      </div>
    </section>
  );
}
