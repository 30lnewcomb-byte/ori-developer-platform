import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

const sections = [
  { href: "/dashboard", label: "Overview", icon: "⌂" },
  { href: "/projects", label: "Projects", icon: "◇" },
  { href: "/api", label: "API access", icon: "↗" },
  { href: "/models", label: "Models", icon: "◈" },
  { href: "/tools", label: "Tools", icon: "□" },
  { href: "/activity", label: "Activity", icon: "◷" },
  { href: "/docs", label: "Docs", icon: "▤" },
  { href: "/settings", label: "Settings", icon: "⚙" },
];

const pages: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  items: { title: string; description: string; status: string }[];
}> = {
  dashboard: {
    title: "Overview",
    subtitle: "Your Ori developer workspace",
    description: "A single place to manage projects, intelligence, tools, and the services that power Ori.",
    items: [
      { title: "Projects", description: "Organize applications and environments that use Ori.", status: "Not connected" },
      { title: "API access", description: "Create and manage scoped credentials after secure key storage is configured.", status: "Not configured" },
      { title: "Model services", description: "View model availability and routing across connected runtimes.", status: "Not connected" },
      { title: "Tools", description: "Review available capabilities and their permission boundaries.", status: "Not connected" },
    ],
  },
  projects: {
    title: "Projects",
    subtitle: "Your applications, in one place",
    description: "Projects will provide a home for app identity, environments, and project-scoped access.",
    items: [
      { title: "Project registry", description: "A persistent project database has not been connected yet.", status: "Not connected" },
      { title: "Environments", description: "Development and production environment management is not available yet.", status: "Not configured" },
      { title: "Access boundaries", description: "Project-level roles and permissions need a backend policy layer.", status: "Not configured" },
    ],
  },
  api: {
    title: "API access",
    subtitle: "Credentials with clear boundaries",
    description: "The API area is reserved for secure key creation, scoped access, rotation, and revocation.",
    items: [
      { title: "API keys", description: "Secure server-side key storage and one-time secret display must be implemented before keys can be issued.", status: "Not implemented" },
      { title: "Scopes", description: "Granular project and capability permissions are not connected yet.", status: "Not configured" },
      { title: "Usage", description: "Request counts and usage history need an API event pipeline.", status: "Not connected" },
    ],
  },
  models: {
    title: "Models",
    subtitle: "Intelligence, clearly organized",
    description: "A model registry should show what is available, where it runs, and how requests are routed.",
    items: [
      { title: "Model registry", description: "No live model inventory is connected to this workspace yet.", status: "Not connected" },
      { title: "Routing", description: "Primary and fallback routing need a runtime control API.", status: "Not configured" },
      { title: "Health", description: "Model health and latency need verified runtime telemetry.", status: "Not connected" },
    ],
  },
  tools: {
    title: "Tools",
    subtitle: "Capabilities and permissions",
    description: "A clear inventory of tools, their availability, and the permissions required to use them.",
    items: [
      { title: "Tool catalog", description: "The platform does not have a live tool registry connected yet.", status: "Not connected" },
      { title: "Permissions", description: "Tool-level permission policies need to be defined and enforced server-side.", status: "Not configured" },
      { title: "Availability", description: "Tool health checks and execution status are not connected yet.", status: "Not connected" },
    ],
  },
  activity: {
    title: "Activity",
    subtitle: "A trustworthy record of platform changes",
    description: "Activity should make important actions traceable, including who initiated them and what changed.",
    items: [
      { title: "Audit events", description: "A durable audit-event store and event ingestion path are not connected yet.", status: "Not connected" },
      { title: "Service events", description: "Runtime and worker events need a verified event source.", status: "Not connected" },
      { title: "History", description: "No activity history is being reported yet.", status: "Not connected" },
    ],
  },
  docs: {
    title: "Documentation",
    subtitle: "Build against Ori with confidence",
    description: "The documentation area will explain the platform's APIs, authentication, models, tools, and runtime boundaries.",
    items: [
      { title: "Platform guide", description: "The developer platform guide needs to be written and versioned.", status: "In progress" },
      { title: "API reference", description: "An API reference can be generated once the public API contract is established.", status: "Not available" },
      { title: "Integration guides", description: "Guides will follow the actual supported integrations, not assumed capabilities.", status: "Planned" },
    ],
  },
  settings: {
    title: "Settings",
    subtitle: "Control your developer workspace",
    description: "Workspace settings will centralize account preferences, integrations, and security controls.",
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

  const user = await currentUser();
  const identity =
    user?.firstName ||
    user?.primaryEmailAddress?.emailAddress ||
    "Developer";

  return (
    <main className="console">
      <aside className="consoleSidebar">
        <Link className="consoleBrand" href="/dashboard">
          <span className="consoleBrandMark">O</span>
          <span>ORI<small>DEVELOPER PLATFORM</small></span>
        </Link>

        <div className="consoleNavLabel">WORKSPACE</div>
        <nav className="consoleNav" aria-label="Developer workspace">
          {sections.map((item) => (
            <Link
              className={section === item.href.slice(1) ? "consoleNavItem active" : "consoleNavItem"}
              href={item.href}
              key={item.href}
              aria-current={section === item.href.slice(1) ? "page" : undefined}
            >
              <span className="consoleNavIcon" aria-hidden="true">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="consoleSidebarBottom">
          <span className="consoleEnvironment">DEVELOPER WORKSPACE</span>
          <span className="consoleVersion">Ori · Control plane</span>
        </div>
      </aside>

      <section className="consoleMain">
        <header className="consoleTopbar">
          <div className="consoleBreadcrumb">Workspace <span>/</span> {page.title}</div>
          <div className="consoleIdentity">
            <span>{identity}</span>
            <UserButton />
          </div>
        </header>

        <div className="consoleContent">
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
                <strong>Your workspace is ready to be connected.</strong>
                <p>Sign-in is working. Runtime services, project storage, and live telemetry have not been connected to this dashboard yet.</p>
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
                <p>Connect the platform to real services before showing live status or allowing sensitive actions.</p>
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
            <span>Statuses are shown only when they can be verified.</span>
          </footer>
        </div>
      </section>
    </main>
  );
}
