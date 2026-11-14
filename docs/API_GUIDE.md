# Working with the Projects API

This guide shows how to call the currently implemented Projects endpoints from code running inside the signed-in Ori Developer web application.

For the authoritative route and response contract, see the [API reference](API_REFERENCE.md).

## Before you begin

The current API:

- Requires an authenticated Clerk browser session.
- Uses the session cookie supplied by the browser for same-origin requests.
- Supports listing and creating projects only.
- Does not accept Ori API bearer keys or service-account tokens.
- Requires the Neon Projects migration and a configured server-side database connection.

This is an application-session API, not yet a general public API for external applications.

## List projects in the browser

A same-origin browser request includes the browser's credentials by default. The example below explicitly sets `credentials: "same-origin"` to make that expectation clear.

```ts
type Project = {
  id: string;
  name: string;
  slug: string;
  description: string;
  createdAt: string;
};

type ProjectListResponse = {
  projects: Project[];
};

async function listProjects(): Promise<Project[]> {
  const response = await fetch("/api/projects", {
    method: "GET",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
    },
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(
      typeof payload.error === "string"
        ? payload.error
        : `Projects request failed: HTTP ${response.status}`,
    );
  }

  return (payload as ProjectListResponse).projects;
}
```

The server returns at most 100 projects, ordered newest first. There is no pagination parameter yet.

## Create a project in the browser

```ts
type CreateProjectInput = {
  name: string;
  description?: string;
};

async function createProject(input: CreateProjectInput): Promise<Project> {
  const response = await fetch("/api/projects", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  const payload = await response.json();

  if (!response.ok) {
    const message =
      typeof payload.error === "string"
        ? payload.error
        : `Project creation failed: HTTP ${response.status}`;

    throw new Error(message);
  }

  return (payload as { project: Project }).project;
}
```

A successful create returns HTTP 201 and the new project record.

## Validation rules

The server trims both input strings before validation.

| Field | Rule |
|---|---|
| `name` | Required string; 2–60 characters after trimming |
| `description` | Optional string; defaults to empty; maximum 240 characters after trimming |
| Other fields | Currently ignored |

The server creates the slug. It normalizes the name, converts it to lowercase, replaces runs of non-alphanumeric characters with hyphens, removes leading/trailing hyphens, and limits the result to 48 characters.

The owner is always taken from the authenticated Clerk session. Sending an `owner_id` field does not change ownership.

Two different names can normalize to the same slug. Because slugs are unique per owner, the second conflicting create returns HTTP 409 with code `PROJECT_NAME_EXISTS`.

## Handling errors

The current route can return:

| Status | Meaning | Client response |
|---:|---|---|
| 400 | Invalid JSON or invalid field values | Ask the user to correct the input |
| 401 | No signed-in Clerk session | Direct the user to sign in |
| 409 | A project with the generated slug already exists for this owner | Ask for a different name |
| 503 | Database configuration, migration, or availability issue | Show a safe error and offer retry where appropriate |

Only some error responses include a machine-readable `code`. See [Errors and responses](ERRORS.md). Do not branch on exact human-readable message text.

## Security requirements for callers

- Call the API from the same trusted application origin.
- Do not copy Clerk session cookies into logs, URLs, support messages, or source code.
- Do not expose the database connection string to browser code.
- Do not accept a project owner from user-controlled input.
- Do not assume a project ID grants access to that project.
- Avoid automatic retry loops for 400, 401, or 409 responses.

The current API has no cross-origin public-client contract, API-key authentication, rate-limit contract, or pagination contract. Those must be designed and documented before the endpoints are presented as a general developer API.

## External application access

External applications cannot currently authenticate to this API with an Ori API key. Do not work around this by sharing a user's Clerk session cookie. A future public API needs an explicit credential model, scopes, rotation/revocation, rate limits, and resource-level authorization before external access is supported.
