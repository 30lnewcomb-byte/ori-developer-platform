import Link from "next/link";
import { auth, currentUser } from "@clerk/nextjs/server";
import WorkspaceShell from "../../components/workspace-shell";

export const dynamic = "force-dynamic";

const groups = [
  {
    title: "Get started",
    items: [
      { title: "Quickstart", file: "QUICKSTART.md", description: "Set up the repository locally and understand first-run requirements." },
      { title: "Workspace guide", file: "WORKSPACE.md", description: "Public routes, sign-in, workspace navigation, and current behavior." },
      { title: "Platform concepts", file: "CONCEPTS.md", description: "Projects, ownership, environments, and resource boundaries." },
    ],
  },
  {
    title: "Ori architecture",
    items: [
      { title: "Ori Platform", file: "ORI_PLATFORM.md", description: "The user-facing product, architecture, and repository boundaries." },
      { title: "Ori Intelligence", file: "ORI_INTELLIGENCE.md", description: "TensorFlow runtime, server-side integration, API contract, and readiness." },
      { title: "Ori VM integration", file: "ORI_VM.md", description: "VM adapter, health route, execution limits, and operational boundaries." },
    ],
  },
  {
    title: "Build and integrate",
    items: [
      { title: "API reference", file: "API_REFERENCE.md", description: "HTTP endpoints currently implemented by the developer platform." },
      { title: "API guide", file: "API_GUIDE.md", description: "Request examples, validation rules, and response handling." },
      { title: "Projects", file: "PROJECTS.md", description: "Project records, ownership, behavior, and limitations." },
      { title: "Models and tools", file: "MODELS_AND_TOOLS.md", description: "Current integration status and intended boundaries." },
    ],
  },
  {
    title: "Security and operations",
    items: [
      { title: "Authentication", file: "AUTHENTICATION.md", description: "Clerk sessions and server-side authorization." },
      { title: "Security model", file: "SECURITY.md", description: "Trust boundaries, secret handling, and data isolation." },
      { title: "Database and migrations", file: "DATABASE.md", description: "Schema, database setup, and deliberate migrations." },
      { title: "Deployment", file: "DEPLOYMENT.md", description: "Production deployment, verification, and rollback procedures." },
      { title: "Troubleshooting", file: "TROUBLESHOOTING.md", description: "Diagnose setup, authentication, database, and deployment issues." },
    ],
  },
];

export default async function WorkspaceDocumentationPage() {
  await auth.protect();
  const user = await currentUser();
  const identity = user?.firstName || user?.primaryEmailAddress?.emailAddress || "Developer";

  return (
    <WorkspaceShell activePath="/documentation" title="Documentation" identity={identity}>
      <div className="consoleContent">
        <div className="consolePageHeading">
          <div>
            <div className="consoleEyebrow">DEVELOPER RESOURCES</div>
            <h1>Documentation</h1>
            <p className="consoleSubtitle">Technical guides maintained alongside the Ori Developer Platform source code.</p>
          </div>
        </div>
        <p className="workspaceDocsIntro">Browse implementation notes and integration guides. Each document opens from the project's source repository so the content stays tied to the code.</p>
        {groups.map((group) => (
          <section className="workspaceDocsGroup" key={group.title}>
            <h2>{group.title}</h2>
            <div className="workspaceDocsList">
              {group.items.map((item) => (
                <a className="workspaceDocsLink" key={item.file} href={`https://github.com/30lnewcomb-byte/ori-developer-platform/blob/main/docs/${item.file}`} target="_blank" rel="noopener noreferrer">
                  <span><strong>{item.title}</strong><small>{item.description}</small></span>
                  <span className="workspaceDocsArrow" aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </section>
        ))}
        <div className="workspaceDocsNote">Documentation is a source-linked reference. Features described as planned or not connected should not be treated as available services.</div>
        <footer className="consoleFooter"><span>Ori Developer Platform</span><a href="https://github.com/30lnewcomb-byte/ori-developer-platform/tree/main/docs" target="_blank" rel="noopener noreferrer">Browse all docs on GitHub ↗</a></footer>
      </div>
    </WorkspaceShell>
  );
}
