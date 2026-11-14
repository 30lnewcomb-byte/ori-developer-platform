# Ori Developer Platform Product Roadmap

**Status:** Research-based working roadmap  
**Last reviewed:** 2026-11-14  
**Source of truth:** This file plus the issue/PR history

The roadmap is organized around developer outcomes and technical dependencies, not a race to fill every navigation item. A phase is complete only when its acceptance criteria are met and the result passes the Quality Standard.

## Current baseline

The repository is a separate Next.js App Router application deployed through Vercel. The current code uses Clerk for authentication and Neon Postgres for the Projects registry.

Confirmed from the current deployment and repository:
- The production deployment builds from `main` and reports READY.
- The public landing page responds successfully.
- The live page loads a Clerk development publishable key (`pk_test_*`) and a `*.clerk.accounts.dev` Frontend API.
- Neon connection variables are present in the Vercel project's Preview and Production targets.
- The Projects API is implemented with server-side Clerk identity and owner-scoped Neon queries.
- The `ori_dev_projects` schema is defined in a manual migration. Its application to the connected database has not been verified.
- Doppler-related environment variable names exist across deployment targets, but the integration's sync configuration could not be inspected.
- The repository currently has no test script in `package.json` and no test/workflow files in its tracked root tree.

These facts describe the baseline, not a claim that every integration or feature is operational.

## Priority 0 — Release safety and environment correctness

**Outcome:** The deployed application has a trustworthy identity boundary and can be operated without guessing which environment or service is in use.

Work:
- Replace the production deployment's Clerk development instance with a correctly configured Clerk production instance.
- Configure a domain owned by the project owner and complete Clerk's production-domain setup. Do not purchase a domain or enable a paid feature without explicit approval.
- Separate development, preview, and production authentication credentials and verify the redirect/sign-in flows for each.
- Verify which Neon database is connected to the Developer Platform, then apply the existing Projects migration deliberately after reviewing the target and backup/recovery expectations.
- Verify the Doppler integration and its mapping to Development, Preview, and Production; remove ambiguity between Vercel-managed variables and Doppler-managed values.
- Verify protected-page and API behavior for signed-out and signed-in requests.
- Add a repeatable test/build workflow before expanding sensitive features.
- Confirm which Vercel Marketplace products are installed, their product plans, quotas, and billing ownership. The current integration inventory API access was denied, so this remains an explicit verification task.

Acceptance criteria:
- Clerk production keys are active only in Production; development keys remain confined to Development/Preview as intended.
- Production authentication works on the approved project domain, including sign-in, sign-up, sign-out, and protected routes.
- Neon connectivity is verified without displaying connection secrets.
- The Projects migration is confirmed present and Projects CRUD works with authenticated owner scoping.
- A signed-in user cannot list or mutate another user's projects by changing request parameters.
- Integration status and cost exposure are recorded from provider evidence, not inferred from variable names.

## Priority 1 — Project model and workspace foundation

**Outcome:** A project is a useful, durable boundary for a developer's application and resources.

Work:
- Evolve the current per-user project registry into a project detail workspace.
- Define project identity, owner, collaborators, status, created/updated timestamps, and archival behavior.
- Define environment records for Development, Preview/Staging, and Production, with distinct configuration references.
- Add an explicit project membership and role model only when there is a real multi-user use case; begin with least-privilege roles.
- Add project settings and a clear resource overview.
- Keep environment secrets in the existing secrets provider; store references and metadata, not plaintext secrets, in project tables.

Acceptance criteria:
- A developer can create, open, rename, and archive their own project.
- The UI makes ownership and environment scope obvious.
- Access checks are enforced in server code and covered by tests.
- Project detail pages show real persisted data and useful empty states.

## Priority 2 — Secure API access

**Outcome:** Developers can create and manage credentials with predictable scopes and lifecycle controls.

Work:
- Define supported API endpoints and permission scopes before exposing key creation.
- Create a server-side credential service with key prefixes, cryptographically secure generation, one-time secret display, hashing, rotation, revocation, and last-used metadata.
- Separate human-owned development keys from service-account credentials for applications and automation.
- Scope keys to a project and, where necessary, an environment or specific capabilities.
- Add a safe audit trail for key creation, rotation, revocation, and permission changes.

Acceptance criteria:
- Raw secrets are never stored or returned again after initial creation.
- Every request is authenticated and authorized against the key's active status and scope.
- A revoked or rotated key stops working.
- Logs and UI never reveal complete secrets.

## Priority 3 — Model development experience

**Outcome:** Developers can discover the real models Ori exposes, test them, compare results, and move successful experiments into application code.

Work:
- Build a model registry from a real runtime capability endpoint, not a hard-coded marketing list.
- Define provider/runtime adapters so the UI does not depend directly on one model host.
- Add a playground that sends the same request shape as the documented API.
- Persist experiments, prompt/config versions, model snapshots, and test results.
- Support side-by-side comparisons with latency, token usage, errors, and cost only when those values are returned by a trustworthy source.
- Add evaluation datasets and regression checks before changing production model routing.
- Keep model fine-tuning and training workflows separate from ordinary UI deployment and require explicit compute approval.

Research lesson:
- Anthropic's current Playground emphasizes request fidelity and code export, but does not save prompt history or run evaluations.
- OpenAI's prompt documentation recommends keeping production prompts in application code, versioning them, and testing changes. Ori should combine request fidelity with durable experiments and evaluation evidence rather than copying a stateless playground.

Acceptance criteria:
- Model names, versions, capabilities, and health are sourced from a real service.
- A playground request can be reproduced from exported code.
- Saved experiments can be compared and re-run.
- A model or prompt change cannot silently alter production behavior.

## Priority 4 — Tools and integration catalog

**Outcome:** Developers can understand the tools available to their projects and the boundaries required to use them.

Work:
- Establish a tool manifest with ID, version, description, input/output schema, availability, required permissions, and owner.
- Distinguish built-in Ori capabilities from external provider integrations.
- Make permissions explicit before enabling a tool for a project.
- Add provider adapters and health checks only for real integrations.
- Document data handling, provider requirements, and costs per integration.

Acceptance criteria:
- The catalog contains only implemented or clearly labeled planned tools.
- Tool execution is authorized server-side and recorded safely.
- Provider failures are visible and actionable.

## Priority 5 — Usage, activity, and operations

**Outcome:** Developers and maintainers can diagnose what happened without fabricated numbers or hidden failures.

Work:
- Define an event schema before drawing analytics charts.
- Capture request ID, project ID, environment, model/tool identity, outcome, latency, and usage fields when available.
- Exclude credentials, raw sensitive prompts, and unnecessary personal data from logs.
- Add searchable request history and audit events with role-appropriate visibility.
- Add usage/cost rollups only when the runtime or provider supplies reliable measurements.
- Surface service health with clear freshness timestamps and outage states.

Acceptance criteria:
- Every metric has a documented source, unit, time range, and aggregation.
- Missing telemetry is shown as unavailable, not zero.
- Sensitive data is redacted by design.
- An individual request can be traced using a request ID.

## Priority 6 — Documentation and developer onboarding

**Outcome:** A new developer can understand Ori and make a first successful, documented request without guesswork.

Work:
- Write a short product overview and architecture guide.
- Publish versioned API reference and copyable quickstarts.
- Explain authentication, project/environment selection, errors, limits, and example payloads.
- Provide runnable examples that are tested in CI.
- Add changelog and deprecation notices.

Acceptance criteria:
- Every documented endpoint has an owner, authentication rule, request/response schema, and error behavior.
- Quickstarts are tested against the actual API.
- Documentation matches deployed behavior.

## Cross-cutting quality gates

Every priority must pass `QUALITY_STANDARD.md`. UI polish, accessibility, security, responsiveness, cost review, and regression checks are continuous requirements—not a final decoration phase.

No new paid provider, Vercel Marketplace plan, custom-domain purchase, database upgrade, or model-compute workload is authorized by this roadmap. Those require a separate explicit decision.
