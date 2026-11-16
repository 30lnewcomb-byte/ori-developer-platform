import { Suspense } from "react";
import { UserProfile, auth, currentUser } from "@clerk/nextjs";
import WorkspaceShell from "../../../components/workspace-shell";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  await auth.protect();
  const user = await currentUser();
  const identity = user?.firstName || user?.primaryEmailAddress?.emailAddress || "Developer";

  return (
    <WorkspaceShell activePath="/settings" title="Settings" identity={identity}>
      <div className="consoleContent">
        <div className="consolePageHeading">
          <div>
            <div className="consoleEyebrow">ACCOUNT / PREFERENCES</div>
            <h1>Settings</h1>
            <p className="consoleSubtitle">Manage your Ori Developer Platform sign-in, profile, and account security.</p>
          </div>
        </div>
        <p className="accountSettingsIntro">
          Account details and sign-in security are managed by Clerk, the authentication service connected to this workspace. Changes made here apply to your account.
        </p>
        <section className="accountSettingsPanel" aria-label="Account and security settings">
          <Suspense fallback={<div className="projectsEmptyState">Loading account settings…</div>}>
            <UserProfile
              path="/settings"
              routing="path"
              appearance={{
                variables: {
                  colorPrimary: "#5d96d6",
                  colorBackground: "#151c25",
                  colorForeground: "#edf2f8",
                  colorMuted: "#202a36",
                  colorMutedForeground: "#a4b1c1",
                  colorBorder: "#303b48",
                  colorInput: "#101720",
                  colorInputForeground: "#edf2f8",
                  colorRing: "#79adf7",
                  fontFamily: '"Ori Text", ui-sans-serif, system-ui, sans-serif',
                  fontFamilyButtons: '"Ori Text", ui-sans-serif, system-ui, sans-serif',
                  borderRadius: "9px",
                },
              }}
            />
          </Suspense>
        </section>
        <p className="accountSettingsFootnote">Ori does not store your password. Authentication and account security controls are provided by Clerk.</p>
        <footer className="consoleFooter"><span>Ori Developer Platform</span><span>Account controls are provided by Clerk.</span></footer>
      </div>
    </WorkspaceShell>
  );
}
