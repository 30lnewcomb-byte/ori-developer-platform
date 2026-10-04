import Link from "next/link";

const sections = [
  { href: "/dashboard", label: "Overview", icon: "⌂" },
  { href: "/projects", label: "Projects", icon: "◇" },
  { href: "/api", label: "API", icon: "↗" },
  { href: "/models", label: "Models", icon: "◈" },
  { href: "/tools", label: "Tools", icon: "□" },
  { href: "/activity", label: "Activity", icon: "◷" },
];

export default function Home() {
  return (
    <main className="app">
      <aside className="sidebar">
        <div className="brand">ORI <span>DEVELOPER</span></div>
        <div className="side-label">CONTROL PLANE</div>
        <nav>
          {sections.map((item) => (
            <Link key={item.href} className="navItem" href={item.href}>
              <span className="navIcon">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="sidebarBottom">
          <Link className="navItem" href="/docs"><span className="navIcon">?</span>Docs</Link>
          <Link className="navItem" href="/settings"><span className="navIcon">⚙</span>Settings</Link>
        </div>
      </aside>

      <section className="main">
        <header className="topbar">
          <div>
            <div className="eyebrow">ORI DEVELOPER PLATFORM</div>
            <h1>Build with Ori.</h1>
            <p>Projects, API access, models, tools, and runtime visibility in one place.</p>
          </div>
          <div className="topActions">
            <Link className="quietButton" href="/docs">Documentation</Link>
            <Link className="primaryButton" href="/projects">Create project</Link>
          </div>
        </header>

        <div className="notice">
          <div className="statusDot" />
          <div>
            <strong>Developer control plane initialized</strong>
            <span>The application shell is live. Authentication and persistent developer resources are the next layer.</span>
          </div>
        </div>

        <section className="grid">
          {[
            ["Projects", "Create and manage Ori projects.", "/projects"],
            ["API", "Issue scoped credentials and manage access.", "/api"],
            ["Models", "See available intelligence runtimes and workers.", "/models"],
            ["Tools", "Manage capabilities exposed to Ori.", "/tools"],
            ["Activity", "Inspect developer-side activity and events.", "/activity"],
            ["Documentation", "Learn how Ori's developer surface fits together.", "/docs"],
          ].map(([title, text, href]) => (
            <Link className="card" href={href} key={title}>
              <div className="cardTop">
                <span className="cardMark">{title[0]}</span>
                <span className="arrow">→</span>
              </div>
              <h2>{title}</h2>
              <p>{text}</p>
            </Link>
          ))}
        </section>

        <footer>Ori Developer Platform · Separate from the Ori workspace</footer>
      </section>
    </main>
  );
}