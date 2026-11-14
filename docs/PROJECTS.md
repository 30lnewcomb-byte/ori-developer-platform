# Projects

The Projects area stores developer-owned project records in the Neon database connected to the **Ori Developer Platform** Vercel project.

## Apply the database migration

1. Confirm you are connected to the Neon database dedicated to Ori Developer Platform.
2. Open its SQL Editor.
3. Review and run the contents of \`db/migrations/001_create_projects.sql\`.
4. Return to the developer platform and refresh **Projects**.

The migration creates the \`ori_dev_projects\` table and its owner/date index. It does not alter existing Ori Platform or Ori Intelligence tables. The migration is safe to re-run because it uses \`IF NOT EXISTS\` for the table and index.

## Data model

| Column | Type | Notes |
|---|---|---|
| \`id\` | UUID | Generated primary key |
| \`owner_id\` | TEXT | Authenticated Clerk user ID |
| \`name\` | VARCHAR(60) | Required; check constraint enforces minimum 2 characters |
| \`slug\` | VARCHAR(48) | Server-generated; unique per owner |
| \`description\` | VARCHAR(240) | Defaults to an empty string |
| \`created_at\` | TIMESTAMPTZ | Defaults to current time |
| \`updated_at\` | TIMESTAMPTZ | Defaults to current time |

The schema has a unique constraint on \`(owner_id, slug)\` and an index on \`(owner_id, created_at DESC)\`.

## Data isolation

- Every record is associated with the authenticated Clerk user ID.
- The API obtains the owner ID from Clerk on the server; it never accepts an owner ID from the browser.
- List and create queries are scoped to that authenticated owner.
- API responses never include database connection details.

## Create a project

Send an authenticated \`POST /api/projects\` request with a JSON body containing \`name\` and an optional \`description\`. See the [API reference](API_REFERENCE.md) for the complete request and response contract.

The server trims the name and description, validates their lengths, and generates a normalized slug. Slugs are limited to 48 characters and are unique per owner. If two names normalize to the same slug, the second create returns a conflict response.

## List projects

An authenticated \`GET /api/projects\` request returns up to 100 projects owned by the current user, newest first. Pagination is not implemented yet.

## Current limitations

- Update and delete operations are not implemented.
- Project environments are not implemented.
- Project membership and team sharing are not implemented.
- API keys are not issued or scoped to projects yet.
- The migration's presence in Git does not prove it has been applied to the hosted database.

Database migrations are intentionally manual for now. Deployments do not execute schema changes automatically.
