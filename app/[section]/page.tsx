import { auth, currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import WorkspaceShell from "../../components/workspace-shell";


const pages: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  items: { title: string; description: string; status: string }[];
}> = {
  dashboard: {
    title: "Overview",
    subtitle: "Your Ori developer workspace",
    description: "Manage project records and review the implementation state of developer services.",
    items: [
      { title: "Projects", description: "Create and manage project records under your account. Database setup is required.", status: "Setup required" },
      { title: "API access", description: "Scoped API credentials are still being implemented.", status: "In development" },
      { title: "Model services", description: "View model availability and routing across connected runtimes.", status: "Not connected" },
      { title: "Tools", description: "The tool registry and permission controls are still being implemented.", status: "In development" },
    ],
  },
  api: {
    title: "API access",
    subtitle: "API credentials",
    description: "API keys are not available yet. This section describes the planned key, scope, rotation, and revocation controls.",
    items: [
      { title: "API keys", description: "Secure server-side key storage and one-time secret display must be implemented before keys can be issued.", status: "Not implemented" },
      { title: "Scopes", description: "Granular project and capability permissions are not connected yet.", status: "Not configured" },
      { title: "Usage", description: "Request counts and usage history need an API event pipeline.", status: "Not connected" },
    ],
  },
  models: {
    title: "Models",
    subtitle: "Model services",
    description: "A model registry and runtime routing are not connected to this workspace.",
    items: [
      { title: "Model registry", description: "No live model inventory is connected to this workspace yet.", status: "Not connected" },
      { title: "Routing", description: "Primary and fallback routing need a runtime control API.", status: "Not configured" },
      { title: "Health", description: "Model health and latency need verified runtime telemetry.", status: "Not connected" },
    ],
  },
  tools: {
    title: "Tools",
    subtitle: "Capabilities and permissions",
    description: "The tool catalog and permission controls are still in development.",
    items: [
      { title: "Tool catalog", description: "The platform does not have a live tool registry connected yet.", status: "Not connected" },
      { title: "Permissions", description: "Tool-level permission policies need to be defined and enforced server-side.", status: "Not configured" },
      { title: "Availability", description: "Tool health checks and execution status are not connected yet.", status: "Not connected" },
    ],
  },
  activity: {
    title: "Activity",
    subtitle: "Service and audit events",
    description: "Audit events, runtime events, and activity history are not connected yet.",
    items: [
      { title: "Audit events", description: "A durable audit-event store and event ingestion path are not connected yet.", status: "Not connected" },
      { title: "Service events", description: "Runtime and worker events need a verified event source.", status: "Not connected" },
      { title: "History", description: "No activity history is being reported yet.", status: "Not connected" },
    ],
  },
  settings: {
    title: "Settings",
    subtitle: "Account and integration settings",
    description: "Additional profile controls, service integrations, and workspace security settings are not available yet.",
    items: [
      { title: "Account", description: "Authentication is handled by Clerk. Additional workspace profile controls are not implemented.", status: "Partial" },
      { title: "Integrations", description: "Service connections and their permissions need a secure integration store.", status: "Not connected" },
      { title: "Security", description: "Audit, session, and access policies need to be surfaced here.", status: "Not configured" },
    ],
  },
};

export default async function SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const page = pages[section];
  if (!page) notFound();

  await auth.protect();
  const user = await currentUser();
  const identity =
    user?.firstName ||
    user?.primaryEmailAddress?.emailAddress ||
    "Developer";

  return (
    <WorkspaceShell activePath={`/${section}`} title={page.title} identity={identity}>
          <div className="consolePageHeading">
            <div>
              <div className="consoleEyebrow">ORI DEVELOPER PLATFORM</div>
              <h1>{page.title}</h1>
              <p className="consoleSubtitle">{page.description}</p>
            </div>
          </div>

          {section === "dashboard" && (
            <div className="consoleWelcome">
              <div className="consoleWelcomeMark">O</div>
              <div>
                <strong>Project records are implemented; other services are not connected yet.</strong>
                <p>Project storage requires the Neon migration. API access and tools are still in development; model and activity data are not connected.</p>
              </div>
              <span className="consoleStatusPill">SETUP INCOMPLETE</span>
            </div>
          )}

          <div className="consoleSectionHeader">
            <div>
              <h2>{section === "dashboard" ? "Workspace areas" : "Configuration areas"}</h2>
              <p>{section === "dashboard" ? "The main parts of your developer platform." : "Current implementation state for this section."}</p>
            </div>
          </div>

          <div className="consoleResourceGrid">
            {page.items.map((item, index) => (
              <article className="consoleResourceCard" key={item.title}>
                <div className="consoleResourceTop">
                  <span className="consoleResourceNumber">{String(index + 1).padStart(2, "0")}</span>
                  <span className="consoleResourceStatus">{item.status}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>

          {section === "dashboard" && (
            <section className="consoleNextSteps">
              <div>
                <div className="consoleEyebrow">FOUNDATION</div>
                <h2>What comes next</h2>
                <p>Finish database setup, then implement each integration before showing live data or enabling sensitive actions.</p>
              </div>
              <div className="consoleStepList">
                <div><span>01</span><strong>Persistent project data</strong><small>Database and project ownership</small></div>
                <div><span>02</span><strong>Service connections</strong><small>Runtime and model health APIs</small></div>
                <div><span>03</span><strong>Secure developer access</strong><small>Server-side secrets, scopes, and audit events</small></div>
              </div>
            </section>
          )}

          <footer className="consoleFooter">
            <span>Ori Developer Platform</span>
            <span>Feature states reflect the current implementation.</span>
          </footer>
    </WorkspaceShell>
  );
}
