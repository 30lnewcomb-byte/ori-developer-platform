# Ori VM integration

This guide documents how the Ori Platform web application currently connects to its separate VM runtime. It describes the web-side adapter only; the VM runtime repository remains authoritative for the runtime's own API, isolation, command policy, and deployment behavior.

## System boundary

The current integration is server-to-server:

```text
Signed-in Ori Platform user
  -> Ori Platform web application
  -> authenticated server-side adapter (apps/web/lib/ori-vm.ts)
  -> Ori VM runtime
```

The browser does not call the VM runtime directly and must never receive `ORI_VM_API_KEY`. The adapter is marked server-only and adds the bearer credential to runtime requests.

Ori Developer Platform is a separate application. This guide is included for ecosystem context; it does not mean Ori Developer Platform directly controls the VM runtime today.

## Web application configuration

| Variable | Purpose |
|---|---|
| `ORI_VM_URL` | Base URL of the VM runtime. The adapter has a Render URL fallback when this variable is absent. |
| `ORI_VM_API_KEY` | Bearer credential required by authenticated VM operations. |

The adapter considers the integration configured only when both the runtime URL and API key are present. Keep the key in server-side environment configuration. Never put it in a `NEXT_PUBLIC_*` variable, browser storage, a URL, or client-side code.

The configured provider metadata currently identifies Render. That is a source-code setting, not proof that the service is awake or healthy.

## Web-side operations

The server-side adapter currently supports these runtime requests:

| Runtime path | Method | Web adapter purpose |
|---|---|---|
| `/v1/status` | GET | Read runtime status and capability metadata. |
| `/v1/wake` | GET | Wake or prewarm the runtime. |
| `/v1/execute` | POST | Execute a command through the runtime's own policy boundary. |
| `/v1/files/write` | POST | Write text into the VM workspace. |
| `/v1/files/read` | POST | Read text from the VM workspace. |

These are private service calls made by the Ori Platform server adapter. They are not public Ori Developer Platform API endpoints.

## User-facing health route

Ori Platform exposes `GET /api/vm/health` through its web application.

- If the required VM configuration is absent, the route returns HTTP 503 with `status: "not_configured"`.
- If the status request succeeds, the route reports the runtime's returned status and metadata.
- If the runtime request fails, the route returns HTTP 502 with `status: "unreachable"`.

A successful response indicates what the runtime reported at the time of the request. It is not a guarantee that a later command will succeed.

## Execution and file handling

The adapter currently applies these web-side limits:

- Command arguments are capped at 32 entries.
- Requested command timeouts are clamped to 1–30 seconds.
- The web request allows up to 90 seconds for an execution response.
- Standard output and standard error are each truncated to the last 12,000 characters.
- File content is limited to 100,000 UTF-8 bytes before writing.
- File paths containing `..` are rejected by the adapter.

These checks are additional web-side guardrails. They do not replace the VM runtime's own filesystem isolation, command allowlist, process limits, or authorization rules. Verify those controls in the runtime repository before expanding access.

## Wake behavior

The web adapter can prewarm the VM after Ori has committed to an internal VM execution or write-and-execute action. It does not prewarm for speculative or unrelated actions. Successful prewarms are subject to a 90-second in-process cooldown, and concurrent prewarm requests share an in-flight operation.

Prewarming is a latency optimization, not a readiness guarantee for every later request. The execution adapter still performs the actual authenticated runtime request.

## Chat integration

The Ori Platform chat route offers internal server-side tools for running a sandbox command and writing a workspace file. The model can propose a tool call, but the web server parses and dispatches the call. Tool execution is bounded by the chat route's loop and the VM adapter's own limits.

A model-generated tool call is not authorization. Keep user identity, permission policy, and execution approval in trusted application code, not in model output.

## Operational troubleshooting

| Symptom | Checks |
|---|---|
| Integration reports not configured | Confirm `ORI_VM_URL` and `ORI_VM_API_KEY` exist in the correct Ori Platform environment. |
| Health route reports unreachable | Check the VM service deployment, runtime logs, URL, and bearer credential without printing the credential. |
| Wake request times out | Check whether the host is cold-starting and inspect runtime startup logs. |
| Command fails | Check the runtime's command policy, execution limits, and service logs. Do not assume every command is permitted. |
| File operation is rejected | Check the path and size constraints, then verify the runtime's workspace rules. |

Do not copy credentials between Ori Platform, Ori Developer Platform, and the VM runtime. A healthy Ori Platform deployment does not prove the VM service is healthy.

## Source references

- [Ori Platform VM adapter](https://github.com/30lnewcomb-byte/ori-platform/blob/main/apps/web/lib/ori-vm.ts)
- [VM health route](https://github.com/30lnewcomb-byte/ori-platform/blob/main/apps/web/app/api/vm/health/route.ts)
- [Chat route and internal tool dispatch](https://github.com/30lnewcomb-byte/ori-platform/blob/main/apps/web/app/api/chat/route.ts)
- [Sandbox architecture notes](https://github.com/30lnewcomb-byte/ori-platform/blob/main/docs/architecture/sandbox.md)
- [Ori Platform repository](https://github.com/30lnewcomb-byte/ori-platform)

