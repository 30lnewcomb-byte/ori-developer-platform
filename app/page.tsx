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
    title: "Projects first",
    text: "Keep application identity, ownership, and future environments together instead of scattering them across settings.",
  },
  {
    number: "02",
    title: "Clear access boundaries",
    text: "Credentials and tools should have explicit owners, scopes, and lifecycles. A button should never hide what it can do.",
  },
  {
    number: "03",
    title: "Real operational context",
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
            Build with Ori.
            <span>Keep the work in view.</span>
          </h1>
          <p className="landingLead">
            A dedicated workspace for organizing projects, connecting model
            services, and managing the tools and access that power your
            applications.
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
            <span>Independent from Ori Platform</span>
            <span className="landingFootnoteDivider" />
            <span>Built around real integrations</span>
          </div>
        </div>

        <aside className="landingWorkspacePreview" aria-label="Developer workspace areas">
          <div className="landingPreviewTop">
            <div>
              <span className="landingPreviewEyebrow">WORKSPACE MAP</span>
              <h2>Everything has a place.</h2>
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
          <h2 id="platform-title">A workspace, not a pile of dashboards.</h2>
          <p>
            Projects provide the center. Access, models, tools, and activity
            belong around the work they support.
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
          <h2 id="workflow-title">A clear path from project to production.</h2>
          <p>
            The platform is being built around a workflow developers can
            understand, inspect, and control.
          </p>
        </div>

        <div className="landingWorkflowSteps">
          <article>
            <span>01</span>
            <div>
              <h3>Organize a project</h3>
              <p>Give an application a clear identity and owner.</p>
            </div>
          </article>
          <article>
            <span>02</span>
            <div>
              <h3>Connect its resources</h3>
              <p>Assign access and connect only the services the project needs.</p>
            </div>
          </article>
          <article>
            <span>03</span>
            <div>
              <h3>Understand what happened</h3>
              <p>Use real activity and service data to inspect the work.</p>
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
          <h2 id="landing-cta-title">Your workspace starts here.</h2>
          <p>Sign in to continue to your developer workspace.</p>
        </div>
        <div className="landingHeroActions">
          <Link className="primaryButton large" href="/sign-in">Sign in</Link>
          <Link className="quietButton large" href="/sign-up">Create account</Link>
        </div>
      </section>

      <footer className="landingFooter">
        <Link className="landingFooterBrand" href="/">ORI DEVELOPER PLATFORM</Link>
        <span>A separate workspace for building with Ori.</span>
      </footer>
    </main>
  );
}
