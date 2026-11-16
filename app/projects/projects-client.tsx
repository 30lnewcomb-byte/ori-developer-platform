"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";

type Project = {
  id: string;
  name: string;
  slug: string;
  description: string;
  createdAt: string;
};

type ApiError = {
  error?: string;
  code?: string;
};

export default function ProjectsClient() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [setupMessage, setSetupMessage] = useState("");

  const loadProjects = useCallback(async () => {
    setLoading(true);
    setError("");
    setSetupMessage("");

    try {
      const response = await fetch("/api/projects", { cache: "no-store" });
      const payload = (await response.json()) as { projects?: Project[] } & ApiError;

      if (!response.ok) {
        if (
          payload.code === "PROJECTS_MIGRATION_REQUIRED" ||
          payload.code === "DATABASE_NOT_CONFIGURED"
        ) {
          setSetupMessage(payload.error || "Project storage needs setup.");
        } else {
          setError(payload.error || "Could not load projects.");
        }
        return;
      }

      setProjects(payload.projects || []);
    } catch {
      setError("Could not reach the Projects service. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadProjects();
  }, [loadProjects]);

  async function createProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description }),
      });
      const payload = (await response.json()) as { project?: Project } & ApiError;

      if (!response.ok) {
        if (
          payload.code === "PROJECTS_MIGRATION_REQUIRED" ||
          payload.code === "DATABASE_NOT_CONFIGURED"
        ) {
          setSetupMessage(payload.error || "Project storage needs setup.");
        } else {
          setError(payload.error || "Could not create project.");
        }
        return;
      }

      if (payload.project) {
        setProjects((current) => [payload.project!, ...current]);
        setName("");
        setDescription("");
        setSetupMessage("");
      }
    } catch {
      setError("Could not reach the Projects service. Try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="projectsWorkspace">
      <section className="projectsCreateCard">
        <div className="projectsCardHeading">
          <div>
            <div className="consoleEyebrow">NEW PROJECT</div>
            <h2>Create a project</h2>
            <p>Create a project record for an application. Environment and API configuration are not available yet.</p>
          </div>
          <span className="projectsCreateMark" aria-hidden="true">＋</span>
        </div>

        <form className="projectsForm" onSubmit={createProject}>
          <label>
            Project name
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              minLength={2}
              maxLength={60}
              placeholder="e.g. My Ori application"
              required
            />
          </label>
          <label>
            Description <span className="projectsOptional">Optional</span>
            <input
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              maxLength={240}
              placeholder="What are you building?"
            />
          </label>
          <div className="projectsFormFooter">
            <span>Projects are private to your account.</span>
            <button className="primaryButton" type="submit" disabled={saving || name.trim().length < 2}>
              {saving ? "Creating…" : "Create project"}
            </button>
          </div>
        </form>
      </section>

      {setupMessage && (
        <div className="projectsSetupNotice" role="status">
          <strong>Project storage needs one setup step.</strong>
          <p>{setupMessage}</p>
          <p>Apply <code>db/migrations/001_create_projects.sql</code> to the Ori Developer Platform Neon database, then refresh this page.</p>
        </div>
      )}

      {error && <div className="projectsError" role="alert">{error}</div>}

      <div className="projectsListHeading">
        <div>
          <h2>Your projects</h2>
          <p>Projects you own in the Ori developer workspace.</p>
        </div>
        <button className="quietButton" type="button" onClick={() => void loadProjects()} disabled={loading}>
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="projectsEmptyState">Loading your projects…</div>
      ) : projects.length > 0 ? (
        <div className="projectsList">
          {projects.map((project) => (
            <article className="projectsListItem" key={project.id}>
              <span className="projectsProjectMark" aria-hidden="true">◇</span>
              <div className="projectsProjectInfo">
                <strong>{project.name}</strong>
                <span>{project.slug}</span>
                {project.description && <p>{project.description}</p>}
              </div>
              <span className="projectsProjectDate">
                {new Date(project.createdAt).toLocaleDateString()}
              </span>
            </article>
          ))}
        </div>
      ) : (
        <div className="projectsEmptyState">
          <span className="projectsEmptyMark" aria-hidden="true">◇</span>
          <strong>No projects yet</strong>
          <p>Create your first project record. It will be stored under your account.</p>
        </div>
      )}
    </div>
  );
}
