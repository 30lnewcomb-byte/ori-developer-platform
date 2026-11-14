# API errors and responses

The current Projects API returns JSON for its expected error conditions. Error messages are intended to be safe for clients; internal connection strings and stack traces are not returned.

## Status codes

| HTTP status | Code | Meaning | What to do |
|---|---|---|---|
| 400 | — | Invalid JSON or invalid project fields | Correct the request body and retry |
| 401 | — | Authentication required | Sign in and retry with the Clerk session |
| 409 | \`PROJECT_NAME_EXISTS\` | A project slug/name conflicts with an existing project for the owner | Choose a different project name |
| 503 | \`DATABASE_NOT_CONFIGURED\` | No supported database connection variable is configured | Configure \`DATABASE_URL\` or \`POSTGRES_PRISMA_URL\` |
| 503 | \`PROJECTS_MIGRATION_REQUIRED\` | The Projects table is missing | Apply the Projects SQL migration to the correct database |
| 503 | \`DATABASE_UNAVAILABLE\` | Database request failed for another reason | Check database availability/configuration and retry later |

## Error response shape

Coded errors use this shape:

\`\`\`json
{
  "error": "Human-readable explanation.",
  "code": "DATABASE_NOT_CONFIGURED"
}
\`\`\`

Validation and authentication errors currently return an \`error\` field without a stable \`code\`. Clients should not depend on exact error message wording.

## Client guidance

- Handle HTTP status codes first.
- Treat the \`code\` field as optional.
- Do not retry a 400 or 401 request without changing the request or session.
- A 409 requires a different project name.
- A 503 may be temporary or may require operator setup. Display the message and provide a reasonable retry path where appropriate.
- Do not expose raw database errors, stack traces, or environment variables to end users.
