# Environment configuration

This page describes the environment variables read by the current application and the separation expected between local development and production.

## Application variables

| Variable | Required for | Purpose |
|---|---|---|
| \`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY\` | Authentication UI and Clerk client integration | Clerk publishable key for the selected Clerk instance |
| \`CLERK_SECRET_KEY\` | Server-side authentication | Clerk secret key for the selected Clerk instance |
| \`DATABASE_URL\` | Projects persistence | Neon/Postgres connection string; preferred by the current Projects route |
| \`POSTGRES_PRISMA_URL\` | Projects persistence fallback | Used only when \`DATABASE_URL\` is absent |

The Clerk variable names are the standard keys consumed by the Clerk Next.js SDK. Configure values supplied by your own Clerk instance. The Projects route explicitly reads \`DATABASE_URL\` first and falls back to \`POSTGRES_PRISMA_URL\`.

## Local setup

Create a local \`.env.local\` file. Do not commit it.

\`\`\`dotenv
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_replace_me
CLERK_SECRET_KEY=sk_test_replace_me
DATABASE_URL=postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require
\`\`\`

Replace every placeholder with the correct value. Do not include real values in documentation, screenshots, issue reports, or Git commits.

## Hosted environments

Keep separate values and data for:

- Local development, using test credentials and non-production data.
- Production, using production credentials and production data.

This repository's owner-directed release workflow deploys directly from `main` to Production. Do not create preview deployments for this project.

A change to Vercel environment variables applies to new deployments; it does not rewrite the environment of an already-created deployment. Redeploy after changing configuration, then verify the new deployment.

The project currently has integration-related environment metadata, but metadata alone does not prove that provider synchronization is healthy. Verify the configured values and connection status in the provider dashboards.

## Clerk production configuration

Do not use a Clerk development instance for real production users. Configure a Clerk production instance and its production domain according to Clerk's current documentation. Verify the production page loads the expected production publishable key and Frontend API domain before calling authentication production-ready.

## Database safety

- Use the database dedicated to Ori Developer Platform.
- Apply schema migrations deliberately.
- The app does not run SQL migrations automatically during deployment.
- Do not point this app at an Ori Platform or Ori Intelligence database unless an explicitly reviewed integration requires it.
- Never print connection strings in logs.

## Variables not documented as active app inputs

Doppler-related variables may exist in deployment configuration, but the current application source inspected for this guide does not directly read them. Their sync role and source-of-truth mapping must be verified before treating Doppler as required by the application.
