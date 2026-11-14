# Production release checklist

This checklist is for the current production-only deployment workflow. It is not permission to deploy a change or run a database migration without the repository owner's approval.

## Before committing to main

- [ ] Confirm the current `main` head and base all work on it.
- [ ] Confirm the change has a real user problem and acceptance criteria.
- [ ] Review the full diff and affected application routes.
- [ ] Confirm no secrets, private data or credentials are included.
- [ ] Review server-side authentication and resource authorization.
- [ ] Review input validation, error handling and cross-user data isolation.
- [ ] Check mobile/reflow, keyboard operation, focus visibility and labels for UI changes.
- [ ] Update API, environment, architecture and user documentation as applicable.
- [ ] Review database migrations separately; do not auto-apply them during deployment.
- [ ] Run `npm run build` when available and record the actual result.
- [ ] Do not claim tests or lint passed when no corresponding script exists.
- [ ] Commit the approved change directly to `main`; do not create preview deployments.

## After the commit

- [ ] Confirm Vercel created a Production deployment for the exact commit SHA.
- [ ] Wait until the deployment state is **Ready**.
- [ ] Confirm the deployment's primary domain is `https://ori-developer-platform.vercel.app`.
- [ ] Fetch the primary domain and confirm the expected release is being served.
- [ ] Check the changed route or feature, not only the landing page.
- [ ] Check sign-in and protected-route behavior when authentication is affected.
- [ ] Check `/api/projects` authentication and database behavior when Projects is affected.
- [ ] Confirm no placeholder feature is represented as connected or operational.
- [ ] Record any unverified provider, Clerk, database or migration state.
- [ ] Report the exact commit, deployment state and checks performed.

## Rollback

If a release causes a production issue:
1. Identify the failing deployment and affected user journey.
2. Use the Vercel rollback control to restore a known-good production deployment when appropriate.
3. Verify the primary domain after rollback.
4. Remember that application rollback does not reverse database migrations.
5. Handle database recovery as a separate reviewed operation.
6. Document the incident, root cause and corrective action.

## Release status language

Use precise language:
- **Committed:** GitHub main contains the commit.
- **Deploying:** Vercel has started but has not completed the production deployment.
- **Ready:** Vercel reports the deployment is ready.
- **Verified live:** the Ready production deployment is associated with the expected commit and the primary domain has been checked.
- **Blocked/failed:** a required check or deployment failed or could not be verified.

Never use “live” as a synonym for “commit pushed.”
