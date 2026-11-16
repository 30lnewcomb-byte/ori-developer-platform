import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const workspaceAreas = [
  {
    number: "01",
    icon: "◇",
    name: "Projects",
    description: "A home for the applications you build with Ori.",
    detail: "Project workspace",
  },
  {
    number: "02",
    icon: "↗",
    name: "API access",
    description: "A clear place for credentials, scopes, and request access.",
    detail: "In development",
  },
  {
    number: "03",
    icon: "◈",
    name: "Models",
    description: "Understand which model services are connected and available.",
    detail: "Connection pending",
  },
  {
    number: "04",
    icon: "□",
    name: "Tools",
    description: "Review capabilities, permissions, and integration boundaries.",
    detail: "In development",
  },
  {
    number: "05",
    icon: "◷",
    name: "Activity",
    description: "Follow real requests, changes, and operational events.",
    detail: "Telemetry pending",
  },
];

const capabilities = [
  {
    number: "01",
    title: "Project registry",
    text: "Create and manage project records with ownership tied to your account.",
  },
  {
    number: "02",
    title: "Access controls",
    text: "Credentials and tools need clear owners, scopes, and lifecycles. The interface should show what an action can access before you use it.",
  },
  {
    number: "03",
    title: "Operational data",
    text: "Usage, model health, and activity should come from connected services—not sample numbers or decorative charts.",
  },
];

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <main className="landing">
      <header className="landingHeader">
        <Link className="landingBrand" href="/" aria-label="Ori Developer Platform home">
          <span className="landingBrandMark">O</span>
          <span className="landingBrandText">
            ORI <small>DEVELOPER PLATFORM</small>
          </span>
        </Link>

        <nav className="landingNav" aria-label="Main navigation">
          <a href="#platform">Platform</a>
          <a href="#workflow">Workflow</a>
          <a href="#principles">Principles</a>
          <Link href="/docs">Documentation</Link>
        </nav>

        <div className="landingHeaderActions">
          <Link className="landingSignIn" href="/sign-in">Sign in</Link>
          <Link className="primaryButton" href="/sign-up">Create account</Link>
        </div>
      </header>

      <section className="landingHero" aria-labelledby="landing-title">
        <div className="landingHeroCopy">
          <div className="landingKicker">
            <span className="landingKickerDot" />
            DEVELOPER WORKSPACE FOR ORI
          </div>
          <h1 id="landing-title">
            Manage Ori projects.
            <span>See what is connected.</span>
          </h1>
          <p className="landingLead">
            A developer workspace for managing project records and checking the state of API access, model connections, tools, and activity. Each area shows whether it is available, pending, or still in development.
          </p>

          <div className="landingHeroActions">
            <Link className="primaryButton large" href="/sign-in">
              Open your workspace <span aria-hidden="true">↗</span>
            </Link>
            <a className="landingTextLink" href="#platform">
              Explore the platform <span aria-hidden="true">↓</span>
            </a>
          </div>

          <div className="landingHeroFootnote">
            <span>Separate from Ori Platform</span>
            <span className="landingFootnoteDivider" />
            <span>Availability shown by feature</span>
          </div>
        </div>

        <aside className="landingWorkspacePreview" aria-label="Developer workspace areas">
          <div className="landingPreviewTop">
            <div>
              <span className="landingPreviewEyebrow">WORKSPACE MAP</span>
              <h2>Current workspace areas.</h2>
            </div>
            <span className="landingPreviewMark" aria-hidden="true">O</span>
          </div>

          <div className="landingPreviewList">
            {workspaceAreas.map((area) => (
              <div className="landingPreviewRow" key={area.number}>
                <span className="landingPreviewNumber">{area.number}</span>
                <span className="landingPreviewIcon" aria-hidden="true">{area.icon}</span>
                <span className="landingPreviewDetails">
                  <strong>{area.name}</strong>
                  <small>{area.description}</small>
                </span>
                <span className="landingPreviewDetail">{area.detail}</span>
              </div>
            ))}
          </div>

          <div className="landingPreviewFooter">
            <span className="landingPreviewFooterDot" />
            Capabilities are shown as they are connected and verified.
          </div>
        </aside>
      </section>

      <section className="landingPlatformSection" id="platform" aria-labelledby="platform-title">
        <div className="landingSectionHeading">
          <span className="landingSectionKicker">THE PLATFORM</span>
          <h2 id="platform-title">Project records at the center.</h2>
          <p>
            Start with a project record. Its access settings, model connections, tools, and activity belong alongside it.
          </p>
        </div>

        <div className="landingCapabilityList">
          {capabilities.map((item) => (
            <article className="landingCapability" key={item.number}>
              <span className="landingCapabilityNumber">{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landingWorkflowSection" id="workflow" aria-labelledby="workflow-title">
        <div className="landingWorkflowIntro">
          <span className="landingSectionKicker">HOW IT FITS TOGETHER</span>
          <h2 id="workflow-title">How project setup is intended to work.</h2>
          <p>
            The current flow starts with a project record. Resource connections and activity views are being added as those services become available.
          </p>
        </div>

        <div className="landingWorkflowSteps">
          <article>
            <span>01</span>
            <div>
              <h3>Organize a project</h3>
              <p>Create a project record and assign its owner.</p>
            </div>
          </article>
          <article>
            <span>02</span>
            <div>
              <h3>Connect its resources</h3>
              <p>Add API access, model services, and tools when those integrations are available.</p>
            </div>
          </article>
          <article>
            <span>03</span>
            <div>
              <h3>Understand what happened</h3>
              <p>Inspect activity once the relevant service data is connected.</p>
            </div>
          </article>
        </div>
      </section>

      <section className="landingPrinciplesSection" id="principles" aria-labelledby="principles-title">
        <span className="landingSectionKicker">THE STANDARD</span>
        <h2 id="principles-title">Clear status. Defined permissions. Real data.</h2>
        <p>
          No invented metrics, no mystery controls, and no unfinished capability
          presented as ready. The interface should tell you what works, what
          needs setup, and what is still being built.
        </p>
      </section>

      <section className="landingCallToAction" aria-labelledby="landing-cta-title">
        <div>
          <span className="landingSectionKicker">ORI DEVELOPER PLATFORM</span>
          <h2 id="landing-cta-title">Open the developer workspace.</h2>
          <p>Sign in to manage projects and review which developer features are available.</p>
        </div>
        <div className="landingHeroActions">
          <Link className="primaryButton large" href="/sign-in">Sign in</Link>
          <Link className="quietButton large" href="/sign-up">Create account</Link>
        </div>
      </section>

      <footer className="landingFooter">
        <Link className="landingFooterBrand" href="/">ORI DEVELOPER PLATFORM</Link>
        <span>Independent of the Ori chat workspace.</span>
        <a
          className="landingGithubLink"
          href="https://github.com/30lnewcomb-byte"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit my GitHub profile"
          title="GitHub profile"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.1 2.651.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
        </a>
      </footer>
    </main>
  );
}
