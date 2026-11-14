# Ori Developer Documentation

Welcome to the Ori Developer Platform documentation.

This guide describes the platform as it exists today. It separates implemented behavior from planned capabilities so developers can build against supported interfaces without guessing.

## Start here

- [Quickstart](QUICKSTART.md) — run the web application locally and open your workspace.
- [Workspace guide](WORKSPACE.md) — understand public routes, sign-in, workspace navigation, and what each section actually does.
- [Platform concepts](CONCEPTS.md) — understand projects, ownership, and future resource boundaries.
- [What makes Ori different](WHAT_MAKES_ORI_DIFFERENT.md) — the project's founding motivation, cost philosophy, and how its goals differ from many hosted AI services.
- [Authentication and security](AUTHENTICATION.md) — sign-in behavior and server-side authorization.
- [Security model](SECURITY.md) — trust boundaries, secrets, isolation, and requirements for future API credentials.
- [API reference](API_REFERENCE.md) — the currently implemented HTTP API contract.
- [API guide](API_GUIDE.md) — practical examples for listing and creating projects from the signed-in application.
- [Projects](PROJECTS.md) — create and list project records.
- [Database and migrations](DATABASE.md) — understand the Projects schema and apply its migration safely.
- [Environment configuration](ENVIRONMENT.md) — configure local and hosted environments.
- [Deployment guide](DEPLOYMENT.md) — production deployment and verification workflow.
- [Errors and responses](ERRORS.md) — understand API status codes and recovery steps.
- [Models and tools](MODELS_AND_TOOLS.md) — current integration status and intended connection model.
- [Troubleshooting](TROUBLESHOOTING.md) — resolve common setup problems.
- [Integration contract](INTEGRATIONS.md) — rules for connecting Ori Developer to Ori Platform, Ori Intelligence, and other services.
- [Contributing and maintenance](CONTRIBUTING.md) — repository workflow, code conventions, and documentation rules.
- [Release checklist](RELEASE_CHECKLIST.md) — repeatable production-only verification before and after a change.

## Documentation conventions

- **Available** means the behavior exists in the current repository and is described by its implementation.
- **Setup required** means code exists but an external configuration or database step is still needed.
- **Planned** means it is not currently an available platform capability.
- Examples use placeholder values. Never paste real credentials into source control or public support messages.

The API reference currently documents only routes found in the application source. There is no public model-inference, tool-execution, API-key issuance, usage, or audit-event API in this release.

## Product status

The authenticated workspace currently has a real Projects API backed by Neon Postgres, subject to database configuration and migration setup. Other workspace sections are currently informational placeholders and must not be treated as connected services.

For implementation and product decisions, see the repository's [Architecture](../ARCHITECTURE.md), [Quality Standard](../QUALITY_STANDARD.md), [UI System](UI_SYSTEM.md), and [Research Notes](RESEARCH_NOTES.md).
