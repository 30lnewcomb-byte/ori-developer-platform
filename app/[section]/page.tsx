import Link from "next/link";
import { notFound } from "next/navigation";

const pages: Record<string, { title: string; subtitle: string; body: string }> = {
  dashboard: {
    title: "Overview",
    subtitle: "Your developer control plane.",
    body: "The overview will surface connected projects, runtime health, recent activity, and access state.",
  },
  projects: {
    title: "Projects",
    subtitle: "Organize applications built on Ori.",
    body: "Project resources will live here, with project-scoped API access and configuration.",
  },
  api: {
    title: "API",
    subtitle: "Manage developer access.",
    body: "This area is reserved for scoped credentials, key rotation, revocation, and API usage visibility.",
  },
  models: {
    title: "Models",
    subtitle: "Understand Ori intelligence.",
    body: "Model inventory and runtime capabilities will be surfaced here without exposing private runtime credentials.",
  },
  tools: {
    title: "Tools",
    subtitle: "Manage Ori capabilities.",
    body: "Tool definitions, permissions, and availability will be managed here.",
  },
  activity: {
    title: "Activity",
    subtitle: "See what is happening across developer resources.",
    body: "Developer-side events and audit information will appear here.",
  },
  docs: {
    title: "Documentation",
    subtitle: "Build against Ori with confidence.",
    body: "The documentation system will cover authentication, projects, APIs, models, tools, and runtime boundaries.",
  },
  settings: {
    title: "Settings",
    subtitle: "Configure the developer platform.",
    body: "Platform preferences, account controls, and developer configuration will live here.",
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

  return (
    <main className="sectionPage">
      <div className="sectionShell">
        <Link className="back" href="/">← Ori Developer Platform</Link>
        <div className="sectionKicker">DEVELOPER CONTROL PLANE</div>
        <h1>{page.title}</h1>
        <p className="sectionSubtitle">{page.subtitle}</p>
        <div className="sectionPanel">
          <div className="panelMark">{page.title[0]}</div>
          <div>
            <h2>{page.title} is connected to the new developer app.</h2>
            <p>{page.body}</p>
            <span className="building">FOUNDATION READY</span>
          </div>
        </div>
      </div>
    </main>
  );
}