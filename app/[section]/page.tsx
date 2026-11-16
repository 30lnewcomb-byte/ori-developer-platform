import Link from "next/link";
import { auth, currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import WorkspaceShell from "../../components/workspace-shell";

const pages: Record<string, { title: string; subtitle: string; description: string; items: { title: string; description: string; status: string }[] }> = {
  dashboard: {
    title: "Overview", subtitle: "WORKSPACE OVERVIEW",
    description: "A clear view of your projects and the developer services connected to this workspace.",
    items: [
      { title: "Projects", description: "Create and manage project records under your account. Database setup is required before storage is available.", status: "Setup required" },
      { title: "API access", description: "API credentials and project scopes are not available yet.", status: "In development" },
      { title: "Models", description: "No model registry or runtime connection is linked to this workspace yet.", status: "Not connected" },
      { title: "Tools", description: "The tool catalog and permission controls are not available yet.", status: "In development" },
      { title: "Activity", description: "No service or audit event feed is connected yet.", status: "Not connected" },
    ],
  },
  api: { title: "API access", subtitle: "DEVELOPER ACCESS", description: "Manage credentials and project scopes here when the API access service is ready.", items: [
    { title: "API keys", description: "Secure server-side key storage and one-time secret display must be implemented before keys can be issued.", status: "Not implemented" },
    { title: "Scopes", description: "Granular project and capability permissions are not connected yet.", status: "Not configured" },
    { title: "Usage", description: "Request counts and usage history need an API event pipeline.", status: "Not connected" },
  ]},
  models: { title: "Models", subtitle: "MODEL SERVICES", description: "Model inventory and runtime routing are not connected to this workspace yet.", items: [
    { title: "Model registry", description: "No live model inventory is connected to this workspace yet.", status: "Not connected" },
    { title: "Routing", description: "Primary and fallback routing need a runtime control API.", status: "Not configured" },
    { title: "Health", description: "Model health and latency need verified runtime telemetry.", status: "Not connected" },
  ]},
  tools: { title: "Tools", subtitle: "CAPABILITIES", description: "The tool catalog and permission controls are still in development.", items: [
    { title: "Tool catalog", description: "The platform does not have a live tool registry connected yet.", status: "Not connected" },
    { title: "Permissions", description: "Tool-level permission policies need to be defined and enforced server-side.", status: "Not configured" },
    { title: "Availability", description: "Tool health checks and execution status are not connected yet.", status: "Not connected" },
  ]},
  activity: { title: "Activity", subtitle: "WORKSPACE EVENTS", description: "This page will show service and audit events after an event source is connected.", items: [
    { title: "Audit events", description: "A durable audit-event store and event ingestion path are not connected yet.", status: "Not connected" },
    { title: "Service events", description: "Runtime and worker events need a verified event source.", status: "Not connected" },
    { title: "History", description: "No activity history is being reported yet.", status: "Not connected" },
  ]},
  settings: { title: "Settings", subtitle: "WORKSPACE SETTINGS", description: "Account authentication is available through Clerk. Additional workspace controls are not implemented yet.", items: [
    { title: "Account", description: "Authentication and profile controls are managed by Clerk.", status: "Available through Clerk" },
    { title: "Integrations", description: "Service connections and their permissions need a secure integration store.", status: "Not connected" },
    { title: "Security", description: "Workspace audit and access policies are not surfaced here yet.", status: "Not configured" },
  ]},
};

const overviewLinks = [
  { href: "/projects", number: "01", title: "Projects", description: "Create and organize project records.", action: "Open projects", status: "Setup required" },
  { href: "/api", number: "02", title: "API access", description: "Credentials, scopes, and usage.", action: "View API access", status: "In development" },
  { href: "/models", number: "03", title: "Models", description: "Model inventory and runtime connections.", action: "View models", status: "Not connected" },
  { href: "/tools", number: "04", title: "Tools", description: "Tool catalog and permission controls.", action: "View tools", status: "In development" },
  { href: "/activity", number: "05", title: "Activity", description: "Service events and audit history.", action: "View activity", status: "Not connected" },
];

export default async function SectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const page = pages[section];
  if (!page) notFound();
  await auth.protect();
  const user = await currentUser();
  const identity = user?.firstName || user?.primaryEmailAddress?.emailAddress || "Developer";

  return (
    <WorkspaceShell activePath={`/${section}`} title={page.title} identity={identity}>
      <div className="consoleContent">
        <div className="consolePageHeading">
          <div><div className="consoleEyebrow">{page.subtitle}</div><h1>{page.title}</h1><p className="consoleSubtitle">{page.description}</p></div>
          {section === "dashboard" ? <Link className="primaryButton" href="/projects">View projects <span aria-hidden="true">↗</span></Link> : null}
        </div>
        {section === "dashboard" ? <>
          <section className="overviewStatus" aria-label="Workspace setup status">
            <div className="overviewStatusIcon" aria-hidden="true">i</div>
            <div className="overviewStatusCopy"><strong>Workspace setup is in progress</strong><p>Project storage needs a database migration. API access and tools are being built; model and activity services are not connected.</p></div>
            <span className="overviewStatusLabel">SETUP REQUIRED</span>
          </section>
          <div className="overviewSectionHeading"><div><h2>Workspace services</h2><p>Current availability, without hiding unfinished integrations.</p></div><span>5 AREAS</span></div>
          <div className="overviewGrid">
            {overviewLinks.map((item) => <Link className="overviewCard" href={item.href} key={item.href}>
              <div className="overviewCardTop"><span>{item.number}</span><span className="overviewCardStatus">{item.status}</span></div>
              <h3>{item.title}</h3><p>{item.description}</p><span className="overviewCardAction">{item.action} <span aria-hidden="true">→</span></span>
            </Link>)}
          </div>
          <section className="overviewNext"><div><div className="consoleEyebrow">NEXT STEP</div><h2>Finish project storage setup</h2><p>Apply the existing Neon migration before relying on project records. The Projects page will show the setup response if storage is not ready.</p></div><Link className="quietButton" href="/projects">Open Projects <span aria-hidden="true">↗</span></Link></section>
        </> : <>
          <div className="consoleSectionHeader"><div><h2>Configuration areas</h2><p>Current implementation state for this section.</p></div></div>
          <div className="consoleResourceGrid">{page.items.map((item, index) => <article className="consoleResourceCard" key={item.title}>
            <div className="consoleResourceTop"><span className="consoleResourceNumber">{String(index + 1).padStart(2, "0")}</span><span className="consoleResourceStatus">{item.status}</span></div>
            <h3>{item.title}</h3><p>{item.description}</p>
          </article>)}</div>
        </>}
        <footer className="consoleFooter"><span>Ori Developer Platform</span><span>Feature states reflect the current implementation.</span></footer>
      </div>
    </WorkspaceShell>
  );
}
