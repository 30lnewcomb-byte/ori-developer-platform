# API reference

This reference lists the HTTP endpoints implemented in the current repository. It is intentionally limited to the actual route handlers.

## Base URL

Use the origin of the Ori Developer Platform deployment you are working with. For local development, the default is:

\`\`\`text
http://localhost:3000
\`\`\`

## Authentication

The Projects API requires a signed-in Clerk session. Requests from the authenticated browser session are handled through Clerk's session cookies.

Unauthenticated requests receive HTTP 401. Ori API bearer tokens and service-account keys are not supported by this API yet.

## Projects

### GET /api/projects

List projects owned by the current signed-in user.

**Request**

\`\`\`http
GET /api/projects
\`\`\`

No query parameters are currently supported.

**Success — 200**

\`\`\`json
{
  "projects": [
    {
      "id": "00000000-0000-0000-0000-000000000000",
      "name": "Example application",
      "slug": "example-application",
      "description": "A sample project",
      "createdAt": "2026-11-14T12:00:00.000Z"
    }
  ]
}
\`\`\`

The values above are illustrative. The endpoint returns at most 100 records, newest first. The response includes only records owned by the signed-in user.

### POST /api/projects

Create a project for the current signed-in user.

**Request**

\`\`\`http
POST /api/projects
Content-Type: application/json
\`\`\`

**Body**

\`\`\`json
{
  "name": "Example application",
  "description": "A sample project"
}
\`\`\`

- \`name\` is required, trimmed by the server, and must contain 2–60 characters after trimming.
- \`description\` is optional, trimmed by the server, and limited to 240 characters.
- Unknown fields are currently ignored.
- The server generates the slug and derives the owner from the Clerk session.

**Success — 201**

\`\`\`json
{
  "project": {
    "id": "00000000-0000-0000-0000-000000000000",
    "name": "Example application",
    "slug": "example-application",
    "description": "A sample project",
    "createdAt": "2026-11-14T12:00:00.000Z"
  }
}
\`\`\`

The response example uses placeholder values.

## Error responses

The Projects endpoints use these responses for expected failures:

| HTTP status | Meaning | Common cause |
|---:|---|---|
| 400 | Invalid request | Malformed JSON, a non-object body, or a field outside its validation limits |
| 401 | Authentication required | No valid signed-in Clerk session |
| 409 | Project name conflict | The generated project slug already exists for this account |
| 503 | Storage unavailable or not configured | Missing database connection, unapplied migration, or a database failure |

Error responses include an `error` message. Database setup errors also include a stable `code` such as `DATABASE_NOT_CONFIGURED` or `PROJECTS_MIGRATION_REQUIRED`. Do not expose database credentials or raw provider errors to clients.

## Not available in this API version

The repository does not currently implement endpoints for:

- Updating or deleting projects.
- Project environments or memberships.
- Creating, listing, rotating, or revoking Ori API keys.
- Model catalog, inference, or model health.
- Tool discovery or tool execution.
- Usage analytics or audit-event history.

Do not assume routes exist based on workspace navigation labels. New endpoints will be added to this reference after implementation and review.
