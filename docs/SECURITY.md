# Security model and implementation notes

This document describes the security boundaries currently present in Ori Developer Platform and the requirements for expanding them.

## Current trust boundaries

| Boundary | Current behavior |
|---|---|
| Public website | Landing page is available without a session |
| Signed-in identity | Clerk provides the authenticated user identity |
| Workspace pages | Protected pages enforce authentication at the page/resource boundary |
| Projects API | Each handler checks the Clerk session and returns HTTP 401 when absent |
| Project ownership | Server derives owner ID from the Clerk session and scopes SQL queries to it |
| Database | Neon connection string is server-side environment configuration |
| Models and tools | No connected model inference or tool execution service is exposed by this repository |
| External API clients | Ori API keys and service identities are not implemented |

The Clerk middleware initializes request context. It is not a replacement for authorization inside a page or route handler.

## Authentication is not authorization

Authentication answers who is making a request. Authorization answers whether that identity may perform the requested action on a specific resource.

Every new server endpoint must perform both checks. For user-owned resources, queries should include the authenticated owner or a verified membership relationship. Do not fetch a record by its ID and assume that possession of the ID grants permission.

When a resource is not accessible to the caller, return a safe response that does not disclose another user's private data.

## Projects isolation

The Projects route obtains `userId` from Clerk's server-side `auth()` call.

- GET filters by `owner_id = userId`.
- POST writes `owner_id = userId`.
- The browser cannot choose the owner.
- SQL values are passed through Neon tagged-template parameters rather than concatenated into SQL strings.

The database schema also enforces uniqueness of a project's slug per owner.

These controls apply to the current Projects route. New routes must implement their own equivalent resource checks.

## Secrets and configuration

Treat the following as secrets:

- Clerk secret keys.
- Neon/Postgres connection strings.
- Any future Ori API signing or hashing secrets.
- Third-party provider credentials.

Keep secrets in server-side environment configuration. Never place them in browser bundles, public repository files, screenshots, logs, or API responses. A `NEXT_PUBLIC_*` variable is public by design and must never contain a private credential.

If a secret is exposed, revoke or rotate it at the issuing provider, update the affected environment configuration, and deploy a new version. Removing the value from the latest source file does not invalidate an already exposed credential.

## Database safety

- Keep Ori Developer's database separate from Ori Platform and Ori Intelligence.
- Review SQL migrations before applying them.
- Confirm the target database and environment before running SQL.
- Prefer additive, backward-compatible schema changes.
- Keep backups and a recovery plan for destructive changes.
- Do not assume application rollback reverses a database migration.

See [Database and migrations](DATABASE.md).

## Requirements before a public API-key system

A future Ori API-key feature must not be implemented as a cosmetic key generator. Before external use, the design must cover:

1. Secure key generation and storage. Store a verifier/hash rather than a reusable plaintext secret.
2. One-time secret display at creation, with no later ability to reveal the original secret.
3. Explicit scopes and least-privilege defaults.
4. Owner and project binding enforced server-side.
5. Expiration, rotation, revocation, and last-used metadata.
6. Rate limiting and abuse controls.
7. Safe audit events for creation, use, rotation, and revocation.
8. Clear separation between human sessions and workload credentials.
9. Tests for expired, revoked, malformed, insufficient-scope, and cross-owner credentials.
10. Documentation that explains where the secret is sent and how to protect it.

These are design requirements, not claims that this capability currently exists.

## Security review checklist for new routes

- [ ] Authenticate on the server.
- [ ] Authorize the action against the specific resource.
- [ ] Derive owner identity from trusted server context.
- [ ] Validate request bodies and query parameters.
- [ ] Use parameterized database queries.
- [ ] Return safe errors without leaking stack traces or secrets.
- [ ] Avoid logging tokens, cookies, or private user data.
- [ ] Consider rate limiting and abuse cases.
- [ ] Test cross-user access attempts.
- [ ] Update the API reference and relevant guides.
