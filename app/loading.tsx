export default function Loading() {
  return (
    <main className="systemStatePage" aria-busy="true" aria-live="polite">
      <div className="systemStateCard systemLoadingCard">
        <span className="systemStateEyebrow">ORI DEVELOPER PLATFORM</span>
        <div className="systemLoadingBar" />
        <div className="systemLoadingLine" />
        <div className="systemLoadingLine short" />
        <p>Loading your workspace…</p>
      </div>
    </main>
  );
}
