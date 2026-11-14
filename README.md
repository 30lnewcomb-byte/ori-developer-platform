# Ori Developer Platform

A separate developer control plane for Ori, built with Next.js, React, Clerk,
and Neon Postgres.

## Current foundation

- Clerk-authenticated developer workspace
- Overview, Projects, API access, Models, Tools, Activity, Docs, and Settings sections
- Persistent Projects registry with per-user ownership
- Explicit database migration; deployments never mutate the database schema

## Developer documentation

Start at [docs/README.md](docs/README.md) for the developer documentation index, quickstart, authentication guide, API reference, project guide, environment setup, errors, and troubleshooting.

## Projects setup

See [docs/PROJECTS.md](docs/PROJECTS.md) and apply
[001_create_projects.sql](db/migrations/001_create_projects.sql) to the Neon
database connected to this Vercel project.

Required server environment:
- `DATABASE_URL` or `POSTGRES_PRISMA_URL`
- Clerk keys configured through the Vercel project

## Local development

```bash
npm install
npm run dev
```
