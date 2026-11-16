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
  api: { title: "API access", subtitle: "DEVELOPER ACCESS", description: "Explore the signed-in Projects API. Bearer tokens, service accounts, and external application access are not implemented.", items: [
    { title: "Projects endpoints", description: "List and create project records through your authenticated Clerk browser session.", status: "Implemented" },
    { title: "API keys", description: "Ori API bearer keys and service-account credentials are not issued yet.", status: "Not implemented" },
    { title: "Usage and scopes", description: "Request analytics and configurable project scopes need a separate API access service.", status: "Not connected" },
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
  { href: "/api", number: "02", title: "API access", description: "Signed-in Projects endpoints; no bearer keys yet.", action: "View API access", status: "Session API available" },
  { href: "/models", number: "03", title: "Models", description: "Model inventory and runtime connections.", action: "View models", status: "Not connected" },
  { href: "/tools", number: "04", title: "Tools", description: "Tool catalog and permission controls.", action: "View tools", status: "In development" },
  { href: "/activity", number: "05", title: "Activity", description: "Service events and audit history.", action: "View activity", status: "Not connected" },
];

const apiExamples = {
  list: "const response = await fetch(\"/api/projects\", {\n  credentials: \"same-origin\",\n  cache: \"no-store\",\n});\n\nconst result = await response.json();\nif (!response.ok) throw new Error(result.error);\nconsole.log(result.projects);",
  create: "const response = await fetch(\"/api/projects\", {\n  method: \"POST\",\n  credentials: \"same-origin\",\n  headers: { \"Content-Type\": \"application/json\" },\n  body: JSON.stringify({\n    name: \"My application\",\n    description: \"A project built with Ori\",\n  }),\n});\n\nconst result = await response.json();\nif (!response.ok) throw new Error(result.error);\nconsole.log(result.project);"
};
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
            <div className="overviewStatusCopy"><strong>Workspace setup is in progress</strong><p>The signed-in Projects API is implemented, but project storage requires its database migration. Bearer keys, tools, model services, and activity history are not connected.</p></div>
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
        </> : section === "api" ? <>
          <section className="apiAvailability" aria-label="API availability">
            <div className="apiAvailabilityMark" aria-hidden="true">✓</div>
            <div><strong>Projects API · implemented</strong><p>These endpoints are available to signed-in users when the Neon Projects migration and database connection are configured.</p></div>
          </section>
          <section className="apiEndpointSection">
            <div className="apiSectionHeading"><div><h2>Available endpoints</h2><p>Current HTTP routes in this repository.</p></div><span>2 ENDPOINTS</span></div>
            <article className="apiEndpointCard">
              <div className="apiEndpointHeader"><span className="apiMethod get">GET</span><code>/api/projects</code><span className="apiEndpointPurpose">List your projects</span></div>
              <p>Returns up to 100 project records owned by your signed-in account, newest first. No query parameters are supported yet.</p>
              <div className="apiCodeLabel">BROWSER REQUEST</div>
              <pre className="apiCode"><code>{apiExamples.list}</code></pre>
              <div className="apiResponseLine"><span>Success</span><code>200 · projects array</code></div>
            </article>
            <article className="apiEndpointCard">
              <div className="apiEndpointHeader"><span className="apiMethod post">POST</span><code>/api/projects</code><span className="apiEndpointPurpose">Create a project</span></div>
              <p>Creates a project owned by the current signed-in account. The server generates its slug and derives ownership from your Clerk session.</p>
              <div className="apiCodeLabel">BROWSER REQUEST</div>
              <pre className="apiCode"><code>{apiExamples.create}</code></pre>
              <div className="apiResponseLine"><span>Success</span><code>201 · project object</code></div>
              <div className="apiFieldRules"><span><strong>name</strong> Required · 2–60 characters after trimming</span><span><strong>description</strong> Optional · up to 240 characters</span></div>
            </article>
          </section>
          <section className="apiAuthSection">
            <div className="apiSectionHeading"><div><h2>Authentication and limits</h2><p>Know what this API does—and what it does not do.</p></div></div>
            <div className="apiAuthGrid">
              <article><span className="apiDetailLabel">AUTHENTICATION</span><h3>Clerk browser session</h3><p>Requests use the signed-in browser session. Unauthenticated requests receive <code>401</code>. This is not a public developer API credential.</p></article>
              <article><span className="apiDetailLabel">NOT AVAILABLE YET</span><h3>No bearer keys or service accounts</h3><p>Key creation, secret rotation, revocation, project scopes, external app access, and usage analytics have not been implemented.</p></article>
              <article><span className="apiDetailLabel">DATABASE DEPENDENCY</span><h3>Neon project storage</h3><p>The <code>ori_dev_projects</code> table must exist and the server needs <code>DATABASE_URL</code> or <code>POSTGRES_PRISMA_URL</code>. Missing setup returns a clear <code>503</code>.</p></article>
            </div>
          </section>
          <div className="apiDocsLink"><div><strong>Full request and response reference</strong><p>See validation rules, response codes, and current endpoint limitations in the source documentation.</p></div><a href="https://github.com/30lnewcomb-byte/ori-developer-platform/blob/main/docs/API_REFERENCE.md" target="_blank" rel="noopener noreferrer">Open API reference ↗</a></div>
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
