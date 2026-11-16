# Ori Developer Platform

A separate developer control plane for Ori, built with Next.js, React, Clerk,
and Neon Postgres.

## Current foundation

- Clerk-authenticated developer workspace
- Overview, Projects, API access, Models, Tools, Activity, Docs, and Settings sections
- Persistent Projects registry with per-user ownership
- Explicit database migration; deployments never mutate the database schema

## Developer documentation

Start at [docs/README.md](docs/README.md) for the documentation index.

- [Why Ori exists](docs/WHAT_MAKES_ORI_DIFFERENT.md)
- [Quickstart](docs/QUICKSTART.md)
- [API reference](docs/API_REFERENCE.md)
- [Authentication and security](docs/AUTHENTICATION.md)
- [Database and migrations](docs/DATABASE.md)
- [Deployment guide](docs/DEPLOYMENT.md)
- [Environment configuration](docs/ENVIRONMENT.md)
- [Projects](docs/PROJECTS.md)
- [Troubleshooting](docs/TROUBLESHOOTING.md)

## Projects setup

See [docs/PROJECTS.md](docs/PROJECTS.md) and [docs/DATABASE.md](docs/DATABASE.md)
before applying [001_create_projects.sql](db/migrations/001_create_projects.sql)
to the Neon database connected to this Vercel project.

Required server environment:
- `DATABASE_URL` or `POSTGRES_PRISMA_URL`
- Clerk keys configured through the Vercel project

## Local development

```bash
npm install
npm run dev
```
