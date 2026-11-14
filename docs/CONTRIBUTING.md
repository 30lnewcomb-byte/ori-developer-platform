# Contributing and maintenance

## 1. Working agreement

Ori Developer Platform is maintained as a focused developer product. Changes must solve a real problem, preserve clear service boundaries, and meet the repository's [Quality Standard](../QUALITY_STANDARD.md).

The current owner-directed Git workflow is direct-to-main and production-only:
- Work against the latest `main` commit.
- Keep changes small and reviewable.
- Do not create preview branches or preview deployments.
- Commit approved changes directly to `main`.
- Never force-push or overwrite a newer commit.
- Verify the resulting Vercel Production deployment before reporting the change as live.

If repository permissions or branch protection prevent a safe direct update, stop and report the blocker rather than bypassing protection.

## 2. Before changing code

1. Read the relevant page, route, data-access code and existing documentation.
2. Check the current main commit so the change is based on the latest source.
3. Identify the user problem and acceptance criteria.
4. Check whether the change affects authentication, authorization, database schema, environment variables, integrations, accessibility or billing.
5. Prefer existing dependencies and infrastructure. Do not add a paid service or incur usage without explicit approval.

## 3. Engineering conventions

- Use the existing Next.js App Router, React and TypeScript patterns.
- Keep server-only credentials and provider SDKs out of client components.
- Validate untrusted input on the server.
- Derive the current user from Clerk on the server; never trust a client-supplied owner ID.
- Scope every protected data operation by verified ownership or an explicit membership policy.
- Use parameterized SQL.
- Keep provider integrations behind small server-side adapters.
- Avoid unnecessary dependencies and speculative abstractions.
- Make loading, empty, error and success states truthful.
- Do not add placeholder controls that look operational.
- Do not include secrets, connection strings, tokens, or private user data in commits.

## 4. Database changes

- Add a numbered SQL migration under `db/migrations/`.
- Review the exact target database and expected data impact before applying.
- Keep production schema changes separate from Vercel deployments.
- Document forward and recovery considerations.
- Never run a destructive or production migration without explicit authorization.
- Update the data model and API documentation in the same change.

## 5. Documentation rules

Documentation is part of the implementation. Update affected pages when routes, schemas, variables, permissions, setup steps, deployment behavior or user-visible status changes.

Every capability must be labeled accurately:
- **Available:** implemented and verified.
- **Setup required:** implementation exists, but configuration or migration is needed.
- **Planned:** not implemented; do not present it as usable.
- **Unverified:** evidence is incomplete; do not claim it works.

Examples must match real source code. Do not invent endpoint paths, payload fields, status values, environment variables, or provider connections. Include a last-reviewed date for operational snapshots that can become stale.

## 6. Checks available at this baseline

The current `package.json` defines:

```bash
npm install
npm run dev
npm run build
npm run start
```

There is no dedicated test, lint, or format script in the inspected package configuration. Do not claim those checks ran. For a code change:
- Run `npm run build` when the environment permits.
- Inspect TypeScript/compiler output.
- Perform targeted manual checks against the affected route/page.
- Record checks that could not be run.
- Add automated tests as part of future work on authorization and critical API behavior.

## 7. Review checklist

- [ ] The change solves a defined developer problem.
- [ ] The diff is limited to the intended files.
- [ ] No secrets or unrelated changes are included.
- [ ] Authentication and resource authorization are enforced server-side.
- [ ] Input validation and safe error handling are present.
- [ ] Data isolation is preserved.
- [ ] Accessibility and responsive behavior are considered.
- [ ] Docs and migrations match the implementation.
- [ ] Available build/check commands have been run, or limitations are recorded.
- [ ] No preview deployment was created.
- [ ] Production deployment is verified before claiming the change is live.
