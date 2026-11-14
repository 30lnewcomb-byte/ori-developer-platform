# Developer Platform Research Notes

**Research pass:** 01  
**Date:** 2026-11-14  
**Subject:** OpenAI Platform, Anthropic Claude Console, and Vercel integration patterns

This note captures product and technical lessons from current official documentation. It is not a claim that Ori should copy either competitor's exact interface.

## 1. OpenAI Platform

### Project organization

OpenAI API projects organize work within an organization. Project controls include membership, service accounts, API keys, model access, rate limits, usage visibility, and spend limits. API keys can be full, restricted, or read-only. Usage visibility can depend on organization settings and roles.

**Lesson for Ori:** A Project should be a real resource boundary, not merely a label. It should be the place where an application’s identity, environments, credentials, model choices, and usage meet.

Sources:
- [Managing projects in the API platform](https://help.openai.com/en/articles/9186755-managing-projects-in-the-api-platform)
- [API keys and service accounts](https://developers.openai.com/api/docs/guides/api-keys)
- [Manage permissions in the OpenAI platform](https://developers.openai.com/api/docs/guides/rbac)

### Prompt and evaluation workflow

OpenAI's current prompt guidance recommends versioning production prompts in application code, using representative tests and evaluation suites, and rolling out changes through the deployment system. The prompt guide also documents the de-emphasis and scheduled retirement of the older reusable prompt API.

**Lesson for Ori:** Prompt experiments can be saved in the Developer Platform, but production prompt definitions should remain reviewable, version-controlled artifacts. A UI edit should not silently change production behavior.

Source:
- [Prompt engineering](https://developers.openai.com/api/docs/guides/prompt-engineering)

## 2. Anthropic Claude Console

### Workspaces and isolation

Anthropic Workspaces separate API usage by application, environment, or team while keeping organization-level administration centralized. Workspaces can have members, service accounts, API keys, resource limits, spend limits, and usage/cost analytics. Roles can differ by workspace. API keys can also be scoped to a workspace.

**Lesson for Ori:** Separate Development, Staging/Preview, and Production resources intentionally. A developer should be able to see which workspace/environment a key or request belongs to.

Source:
- [Workspaces](https://platform.claude.com/docs/en/manage-claude/workspaces)

### Playground behavior

Anthropic's current Playground is built directly on its public Messages API. It supports prompt iteration, inspection of request/response and token usage, and code export. It does not provide saved prompt history or prompt evaluation in the current Playground.

**Lesson for Ori:** Preserve request fidelity—what the developer tests should match what their code sends—while adding durable experiment history, versioning, and evaluations rather than stopping at a stateless scratchpad.

Source:
- [How do I use the Playground?](https://support.claude.com/en/articles/8606378-how-do-i-use-the-playground)

## 3. Vercel integrations

Vercel distinguishes native Marketplace integrations from connectable accounts. Native products may offer selectable billing plans managed through Vercel; connectable-account integrations link an existing provider account and supply capabilities/environment variables.

**Lesson for Ori:** Inventory the actual integration type, connected provider account, environment targets, product plan, quotas, and billing ownership before treating a service as free or fully connected.

Sources:
- [Vercel Integrations](https://vercel.com/docs/integrations)
- [Install an Integration](https://vercel.com/docs/integrations/install-an-integration)
- [Vercel integration CLI](https://vercel.com/docs/cli/integration)

## 4. Clerk authentication and resource-level protection

Clerk's current Next.js guidance distinguishes request-context middleware from authorization at each protected resource. It recommends protecting Server Components, Route Handlers, and Server Actions individually. For page requests, `auth.protect()` redirects signed-out users to sign-in; for Route Handlers it returns a 404 for session-token requests. Using `auth()` directly gives a Route Handler control over a custom response such as JSON 401.

Clerk also documents a migration away from middleware-only route-matcher checks toward resource-level checks. This is a better fit for Ori: pages can redirect visitors to sign-in, while JSON APIs can return predictable machine-readable errors.

**Lesson for Ori:** Keep `clerkMiddleware()` for Clerk request context, call `auth.protect()` inside each protected page, and use an explicit `auth()` check in API handlers that need a stable JSON error contract.

Sources:
- [Protect content from unauthenticated users](https://clerk.com/docs/guides/secure/protect-content)
- [Migrate away from Middleware-based auth checks](https://clerk.com/docs/guides/development/upgrading/upgrade-guides/migrate-from-create-route-matcher)
- [auth() App Router reference](https://clerk.com/docs/reference/nextjs/app-router/auth)

## 5. W3C accessibility guidance

W3C's WCAG 2.2 standard gives concrete criteria for readable and operable interfaces. Relevant AA criteria include text contrast, non-text contrast for user interface components, minimum target size, keyboard access, visible focus, and reflow at a narrow 320 CSS-pixel viewport.

**Lesson for Ori:** Accessibility must be part of component and release acceptance, not an optional polish pass. The UI system should use measurable contrast and target-size checks, preserve keyboard access, and be tested at narrow widths.

Source:
- [Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/)

## 6. API key identity and lifecycle

OpenAI's current API key guidance distinguishes a user-owned project key for an individual's development from a project service account and its API key for a deployed application, scheduled job, or CI workload. Organization Admin API keys are for trusted organization-management services and are separate from project model-request credentials. OpenAI describes restricted key scopes, key expiration, replacement-first rotation, and revocation after the replacement is verified.

Anthropic similarly distinguishes personal, service-account, and workspace keys. Keys are scoped to a workspace when selected, and the full secret is shown once when created. Its Admin API key is for organization-management/reporting operations and should not be confused with a project workload key.

**Lesson for Ori:** Design three distinct concepts rather than a single generic “API key” row:
1. **Personal development key** — belongs to a human developer and is intended for local experimentation.
2. **Service identity + service key** — belongs to an application or automation, not the person who created it.
3. **Administrative credential** — highly privileged, server-side only, used only for platform/organization management.

Every credential should declare its owner, project, environment, permission scope, expiry, status, creation time, last-used time, and rotation/revocation history. Rotate by issuing and verifying a replacement before revoking the old credential. Full secret values should be shown only once and must never be logged, committed, or returned by later list/get operations.

Sources:
- [OpenAI API keys and service accounts](https://developers.openai.com/api/docs/guides/api-keys)
- [OpenAI production best practices](https://developers.openai.com/api/docs/guides/production-best-practices)
- [Anthropic: Get your Claude API key](https://platform.claude.com/docs/en/get-api-key)
- [Anthropic Admin API keys](https://platform.claude.com/docs/en/manage-claude/admin-api-keys)

## 7. Evaluation and experiment workflow

OpenAI's current evaluation guidance recommends task-specific datasets, explicit success criteria, graders, repeated comparisons, continuous evaluation, and combining automated scores with human review. For agent workflows, traces preserve the end-to-end record of model calls, tool calls, guardrails, and handoffs, and trace grading helps identify workflow-level regressions.

Important lifecycle detail: OpenAI's legacy Evals platform is scheduled to become read-only on October 31, 2026 and shut down on November 30, 2026. The current OpenAI docs point developers to Datasets and agent trace/evaluation tooling. This is a concrete reason not to make that legacy interface a foundation for Ori.

**Lesson for Ori:** Keep Ori's evaluation dataset, task definition, run record, grader result, and promotion decision in a provider-neutral schema. Add provider-specific adapters only where they provide real value. Tie each experiment to a prompt/config version and a reproducible model/runtime identifier.

Sources:
- [OpenAI evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices)
- [OpenAI agent evaluations and traces](https://developers.openai.com/api/docs/guides/agent-evals)
- [OpenAI datasets quickstart](https://developers.openai.com/api/docs/guides/evaluation-getting-started)

## 8. Usage and cost data freshness

Anthropic's Usage and Cost Analytics API can break down requests, tokens, and cost by model, workspace, API key, and actor. The documentation says the analytics data typically refreshes within four hours and can take up to 24 hours. Its older Usage and Cost API typically updates within about five minutes, but the Analytics API is the current recommended route.

**Lesson for Ori:** Provider cost reporting is not necessarily real-time. The UI must show a “last updated” timestamp, the source provider, selected time range, and whether a total is estimated or provider-reported. Keep immediate request telemetry separate from delayed billing analytics. Never silently combine two data sources or label a delayed cost total as “live”.

Sources:
- [Anthropic Usage and Cost Analytics API](https://platform.claude.com/docs/en/manage-claude/usage-cost-analytics-api)
- [Anthropic legacy Usage and Cost API](https://platform.claude.com/docs/en/manage-claude/usage-cost-api)

## 9. Implications for Ori

| Design area | Research finding | Ori decision |
|---|---|---|
| Project model | OpenAI makes projects own access, keys, model access, limits, and usage | Make a project a durable application boundary |
| Environment isolation | Anthropic separates workloads into workspaces | Model environments explicitly and scope credentials to them |
| Permissions | Both platforms use role/permission boundaries | Enforce permissions on the server and keep the UI consistent with them |
| API credentials | OpenAI and Anthropic distinguish personal, service-account, and administrative credentials | Separate credential identity, project/environment scope, one-time display, expiration, replacement-first rotation, and revocation |
| Model testing | Anthropic Playground mirrors its API request; OpenAI emphasizes datasets, graders, traces, and continuous evaluation | Combine request fidelity, portable saved experiments, versioned datasets, trace evidence, and explicit promotion |
| Operations | Both platforms expose usage and cost by useful scopes; Anthropic analytics may be delayed | Show metric source and freshness; separate live request telemetry from delayed billing reports |
| Integrations | Vercel product and account connections have different billing/ownership models | Verify exact integration and billing details before relying on them |

## 10. Research limits and open questions

- This pass studied official product documentation, not every screen or every plan restriction.
- The current Vercel integration-inventory endpoint returned a permission error for the available account connection. Neon and Clerk environment-variable metadata is present in the Developer Platform project, but the full Marketplace installation list and exact billing plans still need direct dashboard or authorized CLI verification.
- A variable name or provider metadata is not proof that a provider sync is healthy.
- The UI should be reviewed directly at representative widths before choosing final layout details.

## 11. Next research passes

1. Compare project creation and project detail workflows across the two consoles, including the exact information hierarchy and empty states.
2. Compare API key creation, restricted scopes, service identities, rotation, and audit behavior.
3. Compare model playground workflows, evaluation history, and reproducibility.
4. Compare usage/cost dashboards and request-level troubleshooting.
5. Inspect project-detail and key-management UI hierarchy, including destructive confirmations and secret-once states.
6. Review accessibility and responsive interaction patterns before locking the Ori design system.
