# Quickstart

This quickstart gets the Ori Developer Platform web application running locally. It does not connect a model runtime or issue Ori API keys.

## Requirements

- Node.js compatible with the installed Next.js 16 release.
- npm.
- Access to the Ori Developer Platform repository.
- A Clerk application for authentication.
- A Neon Postgres database only if you want to use Projects persistence.

## 1. Get the code

Clone the repository and enter its directory:

\`\`\`bash
git clone https://github.com/30lnewcomb-byte/ori-developer-platform.git
cd ori-developer-platform
\`\`\`

## 2. Install dependencies

\`\`\`bash
npm install
\`\`\`

## 3. Configure authentication

Create or select a Clerk application and configure the local environment variables required by the Clerk Next.js SDK:

\`\`\`dotenv
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_replace_me
CLERK_SECRET_KEY=sk_test_replace_me
\`\`\`

Use the actual values supplied by your Clerk application. These are illustrative variable names and placeholder values, not usable credentials. Keep the secret key server-side and out of Git.

If your Clerk application requires custom sign-in, sign-up, or redirect URLs, configure them using the current Clerk Next.js documentation and your application settings.

## 4. Configure project storage (optional)

To use the Projects API, configure one of the database connection variables:

\`\`\`dotenv
DATABASE_URL=postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require
\`\`\`

The application also accepts \`POSTGRES_PRISMA_URL\` as a fallback. Use the connection string for the Neon database dedicated to the Ori Developer Platform—not a database belonging to another Ori service.

Apply [001_create_projects.sql](../db/migrations/001_create_projects.sql) manually to that database. See [Projects](PROJECTS.md) for the migration and data model. Do not assume the migration has run just because the file exists in the repository.

## 5. Start the application

\`\`\`bash
npm run dev
\`\`\`

Open http://localhost:3000.

The public landing page is available without signing in. Sign in to reach the protected developer workspace. The Projects page can list and create records after authentication, database configuration, and migration setup are all complete.

## 6. Build for production locally

\`\`\`bash
npm run build
npm run start
\`\`\`

The repository currently defines \`dev\`, \`build\`, and \`start\` scripts. It does not currently define a test or lint script.

## What works today

- Public landing page.
- Clerk sign-in integration and protected workspace pages.
- Projects list and create UI.
- \`GET /api/projects\` and \`POST /api/projects\`, scoped to the signed-in user.

## What is not connected yet

- Ori API-key creation and management.
- Live model catalog, inference routing, and runtime health.
- Tool catalog and tool execution.
- Usage analytics and audit-event history.

See [Models and tools](MODELS_AND_TOOLS.md) and [Troubleshooting](TROUBLESHOOTING.md) before assuming these services are available.
