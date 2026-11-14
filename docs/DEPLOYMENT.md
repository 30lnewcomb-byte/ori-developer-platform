# Deployment guide

This guide covers the current Vercel deployment workflow for Ori Developer Platform.

## Production deployment

The production project is connected to the GitHub repository `30lnewcomb-byte/ori-developer-platform`. The production branch is `main`, and the primary domain is:

```text
https://ori-developer-platform.vercel.app
```

For this repository's current workflow:

1. Review the change locally or through repository checks.
2. Commit the approved change directly to `main`.
3. Allow the connected Vercel project to create its **Production** deployment.
4. Inspect the deployment record and wait for its state to become **Ready**.
5. Verify the primary domain serves the expected version.

Do not report a deployment as live merely because a commit was pushed or a deployment was created. A deployment can still be initializing, building, or failed.

The current project workflow is production-first; do not create preview deployments as a substitute for production verification.

## Before merging or committing

Check the following:

- The change matches the product and quality standards in the repository.
- Documentation describes actual behavior, not navigation labels or planned functionality.
- No secrets, database URLs, private keys, or personal data are included.
- Database changes have a reviewed migration and a clear application plan.
- The change does not silently connect this app to Ori Platform or Ori Intelligence infrastructure.
- Any new API route enforces authentication and resource-level authorization on the server.

The repository currently defines these npm scripts:

```bash
npm install
npm run build
npm run start
```

There is no dedicated test or lint script in the current `package.json`. Do not claim that automated tests or lint checks passed unless they have actually been added and run.

## Environment configuration

Vercel environment variables are configured per environment in the Vercel project. See [Environment configuration](ENVIRONMENT.md) for the current variable names and separation requirements.

A variable change affects new deployments; it does not retroactively change an existing deployment. After changing a value, create a new production deployment and verify the resulting behavior.

Never paste environment values into commits, documentation, chat, or issue descriptions.

## Post-deployment verification

At minimum, verify:

- The primary production domain loads over HTTPS.
- The public landing page renders.
- Sign-in and sign-up routes load and use the intended Clerk production instance.
- A signed-in user can open the workspace.
- The Projects page can load its list when the database is configured.
- Creating a project succeeds only when the database migration is present.
- An unauthenticated request to `/api/projects` receives HTTP 401.
- No page presents placeholder Models, Tools, API access, or Activity UI as a working backend capability.

A successful build does not prove that Clerk production configuration or the database is healthy. Check those integrations separately.

## Failed deployment or rollback

If a production deployment fails:

1. Open the failed deployment in Vercel and inspect the build/runtime logs.
2. Identify whether the failure is caused by source code, environment configuration, or an external integration.
3. Fix the underlying issue on `main`; do not hide the failure by describing the deployment as successful.
4. If production is impaired and a known-good deployment exists, use Vercel's rollback controls to restore that deployment.
5. Verify the primary domain again after the rollback.

A rollback changes the deployed application version; it does not reverse database migrations. Database rollback requires a separately reviewed database recovery plan.

## Deployment boundaries

Ori Developer Platform is a separate application from Ori Platform and Ori Intelligence. Keep their deployments, credentials, and data stores separate unless a documented, reviewed integration explicitly requires communication between them.

For Vercel-specific operational details, use the official [Vercel deployment documentation](https://vercel.com/docs/deployments).
