# Models and tools

## Current status

The Models and Tools workspace sections are not connected to live runtime services in the current application.

There is no model catalog API, inference route, runtime health adapter, tool manifest registry, or tool execution API in this repository. The corresponding pages currently describe intended configuration areas and display disconnected/not-configured states.

Do not build an integration against guessed endpoint paths or assume that a model or tool is available because its name appears in a UI.

## Intended model integration

Before model management is enabled, the platform needs an authenticated server-side adapter with a documented contract for:

- Model identity and version.
- Runtime/provider location.
- Supported input/output capabilities.
- Availability and health source.
- Request/response schema.
- Routing and fallback policy.
- Timeout and error behavior.
- Usage/latency event reporting.
- Authorization and project/environment scope.

The browser should not receive runtime provider secrets. Model health should be shown only when a real health source has been queried, with a clear last-checked time.

## Intended tool integration

A tool registry should define:

- Stable tool identifier and version.
- Human-readable purpose.
- Input and output schema.
- Required permissions and risk level.
- Execution boundary and owning service.
- Availability/health source.
- Audit-event requirements.
- Timeout, cancellation, and failure behavior.

Tool execution must be authorized on the server. A UI toggle or hidden button is not a security boundary.

## Connection to Ori services

Ori Developer is a separate repository and application. Any future connection to Ori Platform, Ori Intelligence, or Ori Mechanic should use explicit, versioned, authenticated service interfaces. Do not import another service's private code or share its database directly as a shortcut.

## When these docs should change

Update this page and the API reference only after a real adapter or endpoint has been implemented, tested, and documented. Include request and response examples from the actual contract, not illustrative guesses presented as live behavior.
