# Why Ori Exists

Ori started as a personal project. Its creator wanted to use AI without paying for access or providing a payment method just to get started. That led to an experiment in building a custom AI. The work later grew into several separate software and engineering projects.

## Development spending

**The creator reports $0 in development spending to date.**

This describes direct development spending, not the total value or operating cost of the resources used. Hardware, electricity, storage, bandwidth, hosting, and connectivity all use resources. Existing equipment, free tiers, and services provided at no charge can make a project possible without direct spending.

The project aims to avoid required paid dependencies where a practical local, self-hosted, or free option is available. Any feature that does require payment or a payment method should be identified before users depend on it.

## Engineering priorities

- **Access:** Keep the basic Ori experience usable without a required subscription or payment method wherever practical.
- **Cost-aware infrastructure:** Prefer existing equipment, local execution, and free services when they meet the requirement.
- **Separate responsibilities:** Ori Platform is the user-facing chat workspace. Ori Intelligence runs as a separate TensorFlow/Keras service. Ori Developer Platform provides developer project records and documentation. Ori Mechanic is an independent engineering project.
- **Explicit boundaries:** Keep service credentials on the server. Define permissions before connecting tools or allowing controlled workflows.
- **Accurate status:** Distinguish implemented behavior from setup requirements, disconnected services, and planned work.

These are project priorities, not a claim that every planned capability is already available. The applications and services have different release stages.

## What this does not promise

Ori's starting goal does not mean that running AI has no resource cost, or that every future hosted feature can be provided for free and without limits. Compute, electricity, storage, bandwidth, and hosting still require resources even when the project can use equipment or services that are already available.

If a future feature introduces a required cost or payment method, that requirement should be explained before someone relies on the feature.

## Current project status

The projects are developed separately. Use their technical guides for current behavior and setup requirements:

- [Ori Platform](ORI_PLATFORM.md)
- [Ori Intelligence](ORI_INTELLIGENCE.md)
- [Ori Developer Platform concepts](CONCEPTS.md)
- [Developer Platform research notes](RESEARCH_NOTES.md)

The reason for building Ori is simple: to explore whether a useful AI workspace and the systems around it can be built with practical access, clear boundaries, and cost-conscious engineering.
