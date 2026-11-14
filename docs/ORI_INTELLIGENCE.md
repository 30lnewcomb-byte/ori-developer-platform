# Ori Intelligence: architecture and integration guide

**Owning repository:** [ori-platform](https://github.com/30lnewcomb-byte/ori-platform)  
**Service source:** `services/intelligence/`  
**Status reviewed:** 14 November 2026. This describes documented contracts and source-level integration; it does not certify a live deployment.

## Purpose and model roles

Ori Intelligence is the private model-serving boundary used by Ori Platform. The service README describes a native TensorFlow/Keras stack:

- `ori-small` — learned language generation.
- `ori-core` — intent classification.
- Specialist coding and constrained 3D/CAD workers — internal task-focused workers described by the service README.

Model artifact presence, successful service startup, loaded weights, and production readiness are separate facts. Verify runtime status before claiming a model is available.

## Architecture

```text
Ori user
  -> Ori Platform authenticated server route
  -> private TensorFlow runtime (server-side bearer credential)
  -> Ori Platform orchestration and user-facing response
```

The model is not the authority for identity, memory, permissions, or execution rights. The browser receives only the user-facing response; runtime credentials remain server-side.

## Runtime HTTP contract documented by the service

All endpoints below require `Authorization: Bearer <ORI_INTELLIGENCE_API_KEY>`.

| Method | Path | Purpose |
|---|---|---|
| GET | `/v1/status` | Runtime and model readiness |
| GET | `/v1/models` | Registered TensorFlow models |
| POST | `/v1/predict` | Intent classification |
| POST | `/v1/chat` | Learned language generation |

The Ori Platform web source also calls `POST /v1/title` for conversation-title generation. Treat this as a web-consumed route; confirm the runtime implementation and deployed version before treating it as a stable public contract.

## Readiness and chat flow

The web chat route polls `/v1/status` and requires `status === online` and `language_model_loaded === true`. It waits for model readiness rather than treating an open HTTP port as proof the model is ready. The route sends messages, a bounded internal tool manifest, and generation settings to `/v1/chat`. Tool execution remains server-side in Ori Platform: a model-generated tool call is a proposal, not independent authorization.

## Web configuration

| Variable | Purpose |
|---|---|
| `ORI_INTELLIGENCE_URL` | Base URL of the private runtime |
| `ORI_INTELLIGENCE_API_KEY` | Shared bearer secret for web-to-runtime requests |

The service README also documents runtime-side values such as `ORI_LM_DIR`, `ORI_MODEL_DIR`, and `LOG_LEVEL`. Confirm the deployed service's configuration before changing them. Never put runtime credentials in `NEXT_PUBLIC_*`, client components, browser storage, URLs, or source control.

## Failure behavior

The web chat route distinguishes missing configuration, wake/readiness failure, upstream request failure, empty model response, and network failure. A healthy web deployment does not prove the TensorFlow runtime is awake or model-ready. Check the authenticated status endpoint and server-side logs.

## Model lifecycle

The service README describes a TensorFlow/Keras Transformer, SentencePiece tokenization, bounded public-domain English foundation training, Ori-specific fine-tuning, held-out evaluation, and specialist model artifacts. Training and promotion are separate from normal web deployment. Do not retrain merely to deploy a web UI or documentation change. Require evaluation evidence before promoting a new model.

## Operational requirements

- Keep the runtime private where hosting permits and authenticate every private request.
- Apply bounded timeouts and payload sizes.
- Do not expose secrets or internal service details to browser clients.
- Do not let a model grant itself permissions.
- Keep model output separate from authorization decisions.
- Report model ID/version, usage, and latency only when actually supplied by trusted runtime telemetry.
- Define rate limits, cost ownership, and recovery behavior before expanding access.

## Source references

- [Service README](https://github.com/30lnewcomb-byte/ori-platform/blob/main/services/intelligence/README.md)
- [Runtime source](https://github.com/30lnewcomb-byte/ori-platform/tree/main/services/intelligence)
- [Intelligence architecture](https://github.com/30lnewcomb-byte/ori-platform/blob/main/docs/architecture/intelligence.md)
- [Chat route](https://github.com/30lnewcomb-byte/ori-platform/blob/main/apps/web/app/api/chat/route.ts)
- [Server-side adapter](https://github.com/30lnewcomb-byte/ori-platform/blob/main/apps/web/lib/ori-intelligence.ts)
