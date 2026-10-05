import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const sections = [
  { href: "/dashboard", label: "Overview", icon: "⌂" },
  { href: "/projects", label: "Projects", icon: "◇" },
  { href: "/api", label: "API", icon: "↗" },
  { href: "/models", label: "Models", icon: "◈" },
  { href: "/tools", label: "Tools", icon: "□" },
  { href: "/activity", label: "Activity", icon: "◷" },
];

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <main className="landing">
      <div className="landingGlow" />
      <section className="landingPanel">
        <div className="landingBrand">ORI <span>DEVELOPER</span></div>
        <div className="landingKicker">DEVELOPER CONTROL PLANE</div>
        <h1>Build with Ori.</h1>
        <p>
          A dedicated technical workspace for projects, API access, models,
          tools, activity, and platform configuration.
        </p>

        <div className="authActions">
          <Link className="primaryButton large" href="/sign-in">Sign in</Link>
          <Link className="quietButton large" href="/sign-up">Create account</Link>
        </div>

        <div className="landingRule" />

        <div className="landingMeta">
          <span>Private developer workspace</span>
          <span>Clerk authentication</span>
        </div>

        <div className="landingSections" aria-label="Developer platform areas">
          {sections.map((item) => (
            <div className="landingSection" key={item.href}>
              <span className="landingSectionIcon">{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
