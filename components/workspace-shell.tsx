"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

type WorkspaceShellProps = {
  activePath: string;
  title: string;
  identity: string;
  children: ReactNode;
};

const groups = [
  {
    label: "DEVELOP",
    items: [
      { href: "/dashboard", label: "Overview", icon: "⌂" },
      { href: "/projects", label: "Projects", icon: "◇" },
      { href: "/api", label: "API Keys", icon: "⌘" },
      { href: "/models", label: "Models", icon: "◈" },
      { href: "/tools", label: "Tools", icon: "□" },
    ],
  },
  {
    label: "INFORMATION",
    items: [{ href: "/docs", label: "Developer Docs", icon: "▤" }],
  },
  {
    label: "MANAGE",
    items: [
      { href: "/activity", label: "Activity", icon: "◷" },
      { href: "/settings", label: "Settings", icon: "⚙" },
    ],
  },
];

export default function WorkspaceShell({
  activePath,
  title,
  identity,
  children,
}: WorkspaceShellProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setCollapsed(window.localStorage.getItem("ori-sidebar-collapsed") === "true");
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMobileOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  function toggleCollapsed() {
    setCollapsed((current) => {
      const next = !current;
      window.localStorage.setItem("ori-sidebar-collapsed", String(next));
      return next;
    });
  }

  const currentPath = pathname || activePath;

  return (
    <main className={collapsed ? "workspaceShell isCollapsed" : "workspaceShell"}>
      {mobileOpen && (
        <button
          className="workspaceScrim"
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        id="workspace-sidebar"
        className={mobileOpen ? "workspaceSidebar mobileOpen" : "workspaceSidebar"}
        aria-label="Developer workspace sidebar"
      >
        <div className="workspaceSidebarHeader">
          <Link className="workspaceBrand" href="/dashboard" aria-label="Ori Developer Platform overview">
            <span className="workspaceBrandMark">O</span>
            <span className="workspaceBrandCopy">ORI<small>DEVELOPER PLATFORM</small></span>
          </Link>
          <button
            className="workspaceCollapseButton"
            type="button"
            onClick={toggleCollapsed}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <span aria-hidden="true">{collapsed ? "»" : "«"}</span>
          </button>
        </div>

        <nav className="workspaceNavigation" aria-label="Developer workspace">
          {groups.map((group) => (
            <div className="workspaceNavGroup" key={group.label}>
              <div className="workspaceNavGroupLabel">{group.label}</div>
              <div className="workspaceNavItems">
                {group.items.map((item) => {
                  const active = currentPath === item.href ||
                    (item.href !== "/dashboard" && item.href !== "/docs" && currentPath.startsWith(item.href + "/"));
                  return (
                    <Link
                      className={active ? "workspaceNavItem active" : "workspaceNavItem"}
                      href={item.href}
                      key={item.href}
                      aria-current={active ? "page" : undefined}
                      title={collapsed ? item.label : undefined}
                      onClick={() => setMobileOpen(false)}
                    >
                      <span className="workspaceNavIcon" aria-hidden="true">{item.icon}</span>
                      <span className="workspaceNavText">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="workspaceSidebarBottom">
          <span className="workspaceEnvironment">DEVELOPER WORKSPACE</span>
          <span className="workspaceSidebarCaption">Ori · Control plane</span>
        </div>
      </aside>

      <section className="workspaceMain">
        <header className="workspaceTopbar">
          <div className="workspaceTopbarLeft">
            <button
              className="workspaceMobileMenu"
              type="button"
              aria-label="Open navigation menu"
              aria-controls="workspace-sidebar"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
            >
              <span aria-hidden="true">☰</span>
            </button>
            <div className="workspaceBreadcrumb">Workspace <span>/</span> {title}</div>
          </div>
          <div className="workspaceIdentity">
            <span>{identity}</span>
            <UserButton />
          </div>
        </header>

        {children}
      </section>
    </main>
  );
}
