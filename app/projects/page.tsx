import { auth, currentUser } from "@clerk/nextjs/server";
import ProjectsClient from "./projects-client";
import WorkspaceShell from "../../components/workspace-shell";


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
                Create and manage project records for applications that use Ori.
                Each record is private to your account.
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
