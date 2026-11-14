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

## 4. Implications for Ori

| Design area | Research finding | Ori decision |
|---|---|---|
| Project model | OpenAI makes projects own access, keys, model access, limits, and usage | Make a project a durable application boundary |
| Environment isolation | Anthropic separates workloads into workspaces | Model environments explicitly and scope credentials to them |
| Permissions | Both platforms use role/permission boundaries | Enforce permissions on the server and keep the UI consistent with them |
| API credentials | Project/service identities are distinct from human users | Separate personal development keys from service credentials |
| Model testing | Anthropic Playground mirrors its API request; OpenAI emphasizes prompt tests and versioning | Combine request fidelity, saved experiments, code export, and evaluations |
| Operations | Both platforms expose usage and cost by useful scopes | Build analytics only from sourced events and provider-reported usage |
| Integrations | Vercel product and account connections have different billing/ownership models | Verify exact integration and billing details before relying on them |

## 5. Research limits and open questions

- This pass studied official product documentation, not every screen or every plan restriction.
- The current Vercel integration-inventory endpoint returned a permission error for the available account connection. Neon and Clerk environment-variable metadata is present in the Developer Platform project, but the full Marketplace installation list and exact billing plans still need direct dashboard or authorized CLI verification.
- A variable name or provider metadata is not proof that a provider sync is healthy.
- The UI should be reviewed directly at representative widths before choosing final layout details.

## 6. Next research passes

1. Compare project creation and project detail workflows across the two consoles, including the exact information hierarchy and empty states.
2. Compare API key creation, restricted scopes, service identities, rotation, and audit behavior.
3. Compare model playground workflows, evaluation history, and reproducibility.
4. Compare usage/cost dashboards and request-level troubleshooting.
5. Review accessibility and responsive interaction patterns before locking the Ori design system.
