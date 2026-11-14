import { auth, currentUser } from "@clerk/nextjs/server";
import ProjectsClient from "./projects-client";
import WorkspaceShell from "../../components/workspace-shell";

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

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  await auth.protect();
  const user = await currentUser();
  const identity =
    user?.firstName ||
    user?.primaryEmailAddress?.emailAddress ||
    "Developer";

  return (
    <WorkspaceShell activePath="/projects" title="Projects" identity={identity}>
          <div className="consolePageHeading">
            <div>
              <div className="consoleEyebrow">ORI DEVELOPER PLATFORM</div>
              <h1>Projects</h1>
              <p className="consoleSubtitle">
                Organize the applications and environments that connect to Ori.
                Each project belongs to your account.
              </p>
            </div>
          </div>
          <ProjectsClient />
          <footer className="consoleFooter">
            <span>Ori Developer Platform</span>
            <span>Project data is private to its owner.</span>
          </footer>
    </WorkspaceShell>
  );
}
