# Ori World: execution environment guide

**Owning repository:** [ori-platform](https://github.com/30lnewcomb-byte/ori-platform)  
**Status:** Controlled execution environment with documented server-side integration; full product orchestration remains a separate implementation concern.

## What Ori World is

Ori World is Ori's controlled working environment. The Ori Platform README says the web route remains `/sandbox` for historical reasons while the user-facing navigation label is Ori World. It is intended as a persistent, isolated workspace for supported development and task execution—not a generic public sandbox product.

## Current integration visible in source

Ori Platform has a server-only wrapper at `apps/web/lib/ori-vm.ts`. It communicates with a separate Ori VM runtime using a server-side bearer credential. The wrapper contains operations for runtime status, wake/prewarm, command execution with bounded arguments and timeout, and workspace file read/write with path and size checks.

The chat route exposes a small internal tool set for command execution and file writing. The model proposes tool calls, but Ori Platform's server route executes them. The browser does not receive the VM credential. The source README explicitly says full chat/tool orchestration remains a separate integration step; do not infer every planned Ori World interface or lifecycle feature is complete.

## Configuration

- `ORI_VM_URL` — runtime base URL; the wrapper currently has a default URL if none is supplied.
- `ORI_VM_API_KEY` — server-side bearer credential.

Never expose the key to browser code or commit it to Git. The wrapper uses `/v1/wake` for wake-up and authenticated status, execution, and file operations. The VM service's own repository remains authoritative for its full API contract.

## Prewarm behavior

The wrapper only prewarms for a committed VM execution or write action. It deliberately rejects speculative model thoughts and non-VM actions. It coalesces an in-flight prewarm and applies a cooldown after a successful wake. A prewarm request is not proof that a task completed; verify the execution result separately.

## Safety boundaries

- Treat the VM as an execution boundary, not proof arbitrary code is harmless.
- Enforce command allowlists, filesystem isolation, network policy, resource limits, and process cleanup in the VM service itself.
- Keep credentials out of workspace files and command output.
- Validate paths and payload sizes at both web and runtime boundaries.
- Require explicit authorization for consequential operations.
- Do not let model output bypass the server-side permission layer.

The web wrapper's path checks are defense in depth; the VM service must independently enforce its workspace boundary.

## Source documentation

- [Ori Platform README](https://github.com/30lnewcomb-byte/ori-platform/blob/main/README.md)
- [Sandbox architecture](https://github.com/30lnewcomb-byte/ori-platform/blob/main/docs/architecture/sandbox.md)
- [Ori VM integration wrapper](https://github.com/30lnewcomb-byte/ori-platform/blob/main/apps/web/lib/ori-vm.ts)
- [Chat route and internal tool handling](https://github.com/30lnewcomb-byte/ori-platform/blob/main/apps/web/app/api/chat/route.ts)
