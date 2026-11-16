import Link from "next/link";

export default function NotFound() {
  return (
    <main className="systemStatePage">
      <div className="systemStateCard">
        <span className="systemStateEyebrow">ORI DEVELOPER PLATFORM · 404</span>
        <h1>That page isn’t here</h1>
        <p>The address may have changed, or the page may not be part of this workspace.</p>
        <Link className="primaryButton" href="/dashboard">Return to overview</Link>
      </div>
    </main>
  );
}
