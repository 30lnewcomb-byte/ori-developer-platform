# Integration contract

**Status:** Target architecture; no live Ori service integration is implemented by this guide.

This document defines how Ori Developer may communicate with Ori Platform, Ori Intelligence, Ori Mechanic, and external providers without coupling their repositories or exposing private credentials.

## 1. Current reality

The current application has Clerk authentication and a Projects API backed by Neon Postgres. It does not currently provide a live adapter for Ori Platform, Ori Intelligence, or Ori Mechanic. It has no model inference proxy, model catalog endpoint, tool execution endpoint, webhook receiver, or service-to-service credential issuer.

Do not configure guessed URLs or claim a connection because a service name appears in the UI or environment settings.

## 2. System ownership

Each service owns its implementation and data:

| System | Owns | Ori Developer may consume |
|---|---|---|
| Ori Developer Platform | Developer identity/workspace, project metadata, future developer credentials and control-plane records | Its own Projects API and approved integration adapters |
| Ori Platform | Ori user-facing platform experience and its application-specific state | Only an explicitly published service contract |
| Ori Intelligence / model runtime | Model serving, inference behavior, model versions, runtime health and capability facts | Versioned catalog, inference, health and usage contracts when published |
| Ori Mechanic | Its own automation/mechanic runtime and safety/permission boundaries | Only explicitly exposed, authenticated capabilities |
| External providers | Their own accounts, APIs, quotas, billing and data | Narrow server-side provider adapters |

No service should read or write another service's private database as an integration shortcut. Do not import private source modules across repositories.

## 3. Required contract for every integration

Before connecting a service, document:

- Service owner and operational contact.
- Canonical base URL per environment.
- Contract name and version.
- Authentication method and credential owner.
- Request and response schemas.
- Required scopes and resource ownership rules.
- Timeouts, retry policy, idempotency behavior and rate limits.
- Error mapping and outage behavior.
- Data classification, retention and redaction.
- Health-check source and freshness.
- Expected cost, quota, and billing owner.
- Rollback and credential-rotation procedure.

An integration is not ready until its contract is reviewed and a real end-to-end test passes.

## 4. Versioning

Use explicit versioned paths for HTTP APIs, for example `/v1/...`, once an API is implemented. Version the schema independently where appropriate. Do not silently change field meaning or remove fields in a compatible version.

- Additive optional fields may be introduced when clients safely ignore unknown fields.
- Breaking changes require a new major API version or an announced migration with a defined sunset date.
- Document deprecation date, replacement, migration steps and support window.
- Include a request/correlation ID in service responses and logs where practical.
- Use stable machine-readable error codes; human-readable messages may change.

These are design rules, not a claim that a `/v1` API exists today.

## 5. Authentication and authorization

- Use service-to-service credentials for backend calls; do not reuse a developer's browser session as a service credential.
- Keep service credentials server-side in the approved secret store.
- Scope credentials to one service, environment, project and operation where practical.
- Use least privilege, expiration, rotation and revocation.
- Authenticate the caller and authorize the requested resource independently.
- Never trust a project ID, user ID, role or environment supplied by a caller without checking it against the authenticated identity.
- Do not expose provider keys or internal service credentials in client bundles, API responses, URLs or logs.
- Prefer signed, timestamped webhooks with replay protection when callbacks are required.

The current app does not yet implement this service credential system.

## 6. Model runtime contract (future)

A model adapter should expose a documented capability contract including model ID, immutable/versioned model reference, supported input and output modalities, limits, context constraints, availability source and deprecation state.

Inference requests should define:
- Model reference and optional pinned version.
- Project/environment context.
- Input schema and supported options.
- Request ID and idempotency behavior where applicable.
- Timeout and cancellation semantics.

Responses should define:
- Output schema.
- Request ID and model/version actually used.
- Finish/termination reason.
- Structured error code on failure.
- Usage/latency fields only when measured by a trusted runtime.

The platform must not invent token counts, cost, model health or completion status. Runtime secrets remain inside the server-side adapter.

## 7. Tool integration contract (future)

Each tool manifest must include a stable ID, version, purpose, input/output schema, risk classification, permissions, execution owner, timeout, cancellation behavior and audit requirements. The execution service—not the browser—must enforce permissions. Destructive or consequential actions need explicit authorization and a traceable outcome.

## 8. Reliability

- Set bounded connection and response timeouts.
- Retry only transient failures and only when the operation is safe to retry.
- Use idempotency keys for operations that create or mutate resources when duplicate execution is possible.
- Apply rate limits and bounded payload sizes.
- Fail closed for authorization and permission checks.
- Show disconnected, stale, degraded and healthy states only when supported by real checks; include a last-checked time.
- Do not make a failing external runtime take down the basic project workspace.
- Define a rollback path before enabling a new integration in production.

## 9. Integration readiness checklist

- [ ] Contract and owner documented.
- [ ] Development and production endpoints identified.
- [ ] Authentication and scopes reviewed.
- [ ] Data ownership and privacy reviewed.
- [ ] Request/response schemas and errors documented.
- [ ] Timeouts, retries, idempotency and rate limits defined.
- [ ] Health source and freshness defined.
- [ ] Costs, quotas and billing owner verified.
- [ ] Automated contract and authorization tests pass.
- [ ] Production smoke test passes.
- [ ] Rollback and credential rotation are documented.
- [ ] UI labels the integration accurately.

