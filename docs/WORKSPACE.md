# Workspace guide

This guide explains the pages a developer can reach in Ori Developer Platform and distinguishes real functionality from informational workspace screens.

## Public routes

| Route | Access | Purpose |
|---|---|---|
| `/` | Public | Product landing page. A signed-in visitor is redirected to the workspace dashboard. |
| `/docs` | Public | Documentation directory. It does not require a Clerk session. |
| `/sign-in` | Public | Clerk sign-in experience. |
| `/sign-up` | Public | Clerk account creation experience. |

The documentation directory links to Markdown files in the public GitHub repository. The current site is a public documentation index, not an in-app Markdown renderer. Each linked guide can be read without creating an Ori Developer account.

## Authenticated workspace

Workspace pages require a signed-in Clerk user. The current navigation includes:

| Area | Route | Current implementation |
|---|---|---|
| Overview | `/dashboard` | Informational workspace overview. It does not display live service health or usage telemetry. |
| Projects | `/projects` | Implemented list and create interface backed by the Projects API, once database configuration and migration setup are complete. |
| API access | `/api` | Informational screen. Ori API-key issuance, scopes, rotation, and usage are not implemented. |
| Models | `/models` | Informational screen. No live model registry, routing controls, or runtime health integration is connected. |
| Tools | `/tools` | Informational screen. No live tool catalog or execution service is connected. |
| Activity | `/activity` | Informational screen. No durable audit-event or activity feed is connected. |
| Settings | `/settings` | Informational screen. Clerk manages sign-in; broader workspace settings and integration controls are not implemented. |

The non-Projects sections currently explain the intended responsibility and implementation gaps. They must not be interpreted as evidence that the corresponding backend services are connected.

## Projects workflow

The Projects page is the current functional workspace area:

1. A signed-in user opens `/projects`.
2. The page requests `GET /api/projects`.
3. The server obtains the user ID from the Clerk session.
4. The API returns only records whose `owner_id` matches that user.
5. The create form sends a name and optional description to `POST /api/projects`.
6. The server validates the input, generates a slug, and inserts the record for the authenticated user.

Project storage requires a configured Neon connection and the manually applied migration. See [Projects](PROJECTS.md), [API reference](API_REFERENCE.md), and [Database and migrations](DATABASE.md).

## Authentication and authorization

- Clerk provides the signed-in identity.
- Protected pages enforce authentication on the server.
- The Projects API independently checks the session and returns JSON HTTP 401 when the caller is unauthenticated.
- A signed-in session does not automatically grant access to every future project, environment, or service. New resources need explicit server-side authorization.
- The public documentation route must remain accessible without an account.

See [Authentication](AUTHENTICATION.md) and the [Security model](SECURITY.md).

## Current boundaries

This guide describes the current source implementation. It does not certify that external providers are configured or healthy in a particular deployment. In particular:

- A page loading successfully does not prove that a model runtime is online.
- A project form rendering does not prove that the database migration has been applied.
- A Clerk sign-in page rendering does not prove that the production Clerk instance is configured for real production users.
- Navigation labels do not create API endpoints or backend capabilities.

When implementation changes, update this guide and the relevant API, security, and operations documentation in the same change.
