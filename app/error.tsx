"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Ori Developer Platform route error", {
      digest: error.digest,
    });
  }, [error]);

  return (
    <main className="systemStatePage">
      <div className="systemStateCard" role="alert">
        <span className="systemStateEyebrow">ORI DEVELOPER PLATFORM</span>
        <h1>This page hit a problem</h1>
        <p>The workspace could not finish loading this view. You can retry without losing your account or project data.</p>
        <button className="primaryButton" type="button" onClick={() => reset()}>Try again</button>
        {error.digest ? <span className="systemStateReference">Reference: {error.digest}</span> : null}
      </div>
    </main>
  );
}
