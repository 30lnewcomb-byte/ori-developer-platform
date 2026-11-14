import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import ProjectsClient from "./projects-client";

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
              className={item.href === "/projects" ? "consoleNavItem active" : "consoleNavItem"}
              href={item.href}
              key={item.href}
              aria-current={item.href === "/projects" ? "page" : undefined}
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
          <div className="consoleBreadcrumb">Workspace <span>/</span> Projects</div>
          <div className="consoleIdentity">
            <span>{identity}</span>
            <UserButton />
          </div>
        </header>

        <div className="consoleContent">
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
        </div>
      </section>
    </main>
  );
}
