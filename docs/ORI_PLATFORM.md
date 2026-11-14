# Ori Platform: product and system guide

**Source repository:** [ori-platform](https://github.com/30lnewcomb-byte/ori-platform)

## What it is

Ori Platform is the user-facing Ori product. It is separate from Ori Developer Platform, which is the developer-facing control plane. The source repository describes Ori as a user-owned AI workspace with a web interface, conversation history, native TensorFlow intelligence, and controlled runtime integrations.

## Product boundaries

| Product | Responsibility |
|---|---|
| Ori Platform | User-facing Home and Chat, onboarding, conversation persistence, and server-side runtime integration |
| Ori Developer Platform | Developer workspace, project metadata, future API credentials, developer model/tool administration, activity, and public docs |
| Ori Intelligence | Private model-serving API used by Ori Platform |
| Ori VM runtime | Controlled server-side execution service used by supported integrations |
| OriOS Lite | Separate project; not a dependency of Ori Platform |

Do not assume that signing into one product authenticates a user to another, or that the applications share a database.

## Repository layout

The Ori Platform repository contains the Next.js web application under `apps/web/`, the private TensorFlow runtime under `services/intelligence/`, shared UI, typography and shared packages under `packages/`, and product documentation under `docs/`. The VM integration is implemented in the web application's server-side adapter. Consult the source tree for exact current paths.

## Current product experience

The repository README identifies Home and Chat as the focused primary navigation. The chat experience includes browser-side history behavior, new conversations, automatic titles, reopening, and deletion. Server routes also support persisted conversation history when the database is configured.

Do not represent broad Projects, Tasks, Activity, generalized tool management, or developer API administration as complete merely because they appear in architecture or roadmap documents.

## Authentication and data

The web app uses Clerk server-side authentication in protected API routes. Conversation endpoints derive the user ID from the authenticated session and scope reads, updates, and deletes to that user. Current conversation endpoints include `GET /api/chats`, `PUT /api/chats/[id]`, and `DELETE /api/chats/[id]`.

## Service boundary

The browser talks to the Ori Platform web application. Server routes call private services using server-only credentials. The browser must never receive `ORI_INTELLIGENCE_API_KEY` or `ORI_VM_API_KEY`. A healthy web deployment does not prove that intelligence or VM services are configured, awake, or ready.

## Source documentation

- [Ori Platform README](https://github.com/30lnewcomb-byte/ori-platform/blob/main/README.md)
- [Frontend architecture](https://github.com/30lnewcomb-byte/ori-platform/blob/main/docs/architecture/frontend.md)
- [Intelligence architecture](https://github.com/30lnewcomb-byte/ori-platform/blob/main/docs/architecture/intelligence.md)
- [Sandbox architecture](https://github.com/30lnewcomb-byte/ori-platform/blob/main/docs/architecture/sandbox.md)
- [Ori UI quality standard](https://github.com/30lnewcomb-byte/ori-platform/blob/main/docs/design/ori-ui-quality-standard.md)

Update this cross-product guide when product boundaries change. Keep service-specific setup instructions in the repository that owns the service.

## Ori VM integration

Ori Platform contains a server-side adapter at `apps/web/lib/ori-vm.ts` for its separate VM runtime. It supports authenticated status, wake/prewarm, command execution, and workspace file operations. The browser must not receive the VM credential. Treat this as an implementation integration, not as a separately named Ori product. The VM service repository remains authoritative for its own API and isolation guarantees.
