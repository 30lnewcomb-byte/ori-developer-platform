import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation | Ori Developer Platform",
  description: "Developer documentation covering Ori applications, APIs, architecture, and current implementation status."
};

const guides = [
  { title: "Quickstart", description: "Set up the repository locally and understand the first-run requirements.", file: "QUICKSTART.md", group: "Get started" },
  { title: "Workspace guide", description: "Understand public routes, sign-in, workspace navigation, and what each section actually does.", file: "WORKSPACE.md", group: "Get started" },
  { title: "Platform concepts", description: "Projects, ownership, environments, and the boundaries between resources.", file: "CONCEPTS.md", group: "Get started" },
  { title: "What makes Ori different", description: "The founding motivation, cost philosophy, and principles that distinguish Ori's goals.", file: "WHAT_MAKES_ORI_DIFFERENT.md", group: "About Ori" },
  { title: "Ori Platform", description: "The user-facing Ori product, its architecture, current experience, and repository boundaries.", file: "ORI_PLATFORM.md", group: "Ori Platform" },
  { title: "Ori VM integration", description: "The server-side VM adapter, health route, execution limits, and operational boundaries.", file: "ORI_VM.md", group: "Ori Platform" },
  { title: "Ori Intelligence", description: "TensorFlow model runtime, server-side integration, API contract, and readiness.", file: "ORI_INTELLIGENCE.md", group: "Ori Platform" },
  { title: "API reference", description: "The HTTP endpoints currently implemented by Ori Developer Platform.", file: "API_REFERENCE.md", group: "API" },
  { title: "API guide", description: "Practical request examples, validation rules, and response handling.", file: "API_GUIDE.md", group: "API" },
  { title: "Authentication", description: "Clerk sessions, server-side authorization, and current API authentication behavior.", file: "AUTHENTICATION.md", group: "Security" },
  { title: "Security model", description: "Trust boundaries, secret handling, and data isolation requirements.", file: "SECURITY.md", group: "Security" },
  { title: "Projects", description: "Project records, ownership, current behavior, and limitations.", file: "PROJECTS.md", group: "Platform guides" },
  { title: "Models and tools", description: "What is connected today and the intended integration boundaries.", file: "MODELS_AND_TOOLS.md", group: "Platform guides" },
  { title: "Integration contract", description: "How Ori services and external providers should communicate safely.", file: "INTEGRATIONS.md", group: "Platform guides" },
  { title: "Environment configuration", description: "Configuration names, environment separation, and secret-handling guidance.", file: "ENVIRONMENT.md", group: "Operations" },
  { title: "Database and migrations", description: "The current schema and deliberate migration process.", file: "DATABASE.md", group: "Operations" },
  { title: "Deployment", description: "Production deployment, verification, and rollback procedures.", file: "DEPLOYMENT.md", group: "Operations" },
  { title: "Release checklist", description: "The checks required before and after production releases.", file: "RELEASE_CHECKLIST.md", group: "Operations" },
  { title: "Troubleshooting", description: "Diagnose setup, authentication, database, and deployment problems.", file: "TROUBLESHOOTING.md", group: "Operations" },
  { title: "Errors and responses", description: "HTTP status codes, machine-readable errors, and client recovery.", file: "ERRORS.md", group: "Reference" },
  { title: "Contributing", description: "Repository conventions, code review expectations, and documentation rules.", file: "CONTRIBUTING.md", group: "Reference" },
];

const groups = ["Get started", "About Ori", "Ori Platform", "API", "Security", "Platform guides", "Operations", "Reference"];

export default function PublicDocumentationPage() {
  return (
    <main className="publicDocs">
      <header className="publicDocsHeader">
        <Link className="landingBrand" href="/" aria-label="Ori Developer Platform home">
          <span className="landingBrandMark">O</span>
          <span className="landingBrandText">ORI <small>DEVELOPER PLATFORM</small></span>
        </Link>
        <nav aria-label="Documentation navigation">
          <Link href="/">Platform</Link>
          <Link href="/sign-in">Sign in</Link>
        </nav>
      </header>

      <section className="publicDocsHero">
        <span className="landingSectionKicker">ORI DEVELOPER PLATFORM</span>
        <h1>Documentation.</h1>
        <p>Guides for Ori Platform, Ori Intelligence, and Ori Developer Platform. No account is required to read them.</p>
        <div className="publicDocsMeta">
          <span>Public access</span><span>·</span><span>Current implementation, clearly labeled</span>
        </div>
      </section>

      <section className="publicDocsContent" aria-label="Documentation guides">
        {groups.map((group) => (
          <div className="publicDocsGroup" key={group}>
            <h2>{group}</h2>
            <div className="publicDocsList">
              {guides.filter((guide) => guide.group === group).map((guide) => (
                <a
                  className="publicDocsLink"
                  href={`https://github.com/30lnewcomb-byte/ori-developer-platform/blob/main/docs/${guide.file}`}
                  key={guide.file}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span><strong>{guide.title}</strong><small>{guide.description}</small></span>
                  <span className="publicDocsArrow" aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </section>

      <footer className="publicDocsFooter">
        <span>Documentation is maintained alongside the source code.</span>
        <a href="https://github.com/30lnewcomb-byte/ori-developer-platform/tree/main/docs" target="_blank" rel="noopener noreferrer">Browse docs on GitHub ↗</a>
      </footer>
    </main>
  );
}
