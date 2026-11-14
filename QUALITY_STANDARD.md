# Ori Developer Platform Quality Standard

**Status:** Active working standard  
**Version:** 1.0  
**Applies to:** `ori-developer-platform`  
**Last reviewed:** 2026-11-14

This standard exists to prevent superficial features, inconsistent UI, unsafe shortcuts, and unverified claims. It applies to product decisions, interface design, engineering, integrations, releases, and maintenance.

A feature is not complete because it looks finished or because a deployment turns green. It is complete only when its purpose, behavior, security, accessibility, and operational state have been verified.

## 1. Product principles

1. **Solve a real developer problem.** Every page, setting, and control must have a clear user and job.
2. **Research before committing to an architecture.** Study official product documentation, implementation patterns, operational costs, and known limitations. Record why the chosen approach fits Ori.
3. **Prefer coherent systems over collections of features.** Projects, environments, credentials, models, tools, and usage must relate to one another through an understandable model.
4. **Tell the truth in the interface.** Never invent activity, health, usage, model availability, cost, or completion status. Show unavailable data as unavailable.
5. **Keep boundaries explicit.** A project, environment, user, service identity, and credential must have a defined owner and permission scope.
6. **Protect the existing Ori architecture.** The Developer Platform remains a separate product and repository. Do not couple it to Ori Platform or Ori Intelligence internals without an explicit interface and a reason.
7. **Do not add features for appearance or perceived size.** Every feature must solve a defined developer problem and have an owner, acceptance criteria, and a credible implementation path. If it is not useful, not functional, or not ready, leave it out or label it clearly as planned/unavailable. Never add decorative dashboard cards, duplicate navigation, empty product sections, or placeholder controls just to make Ori look more complete.
8. **No AI slop.** Do not ship generic filler copy, invented metrics, meaningless charts, gratuitous visual effects, repetitive card grids, or boilerplate features that do not improve a real workflow. Prefer fewer, coherent, well-executed capabilities over a larger but shallow interface. Every screen must communicate real information and make the next useful action clear.

## 2. UI and UX standard

### Visual direction

The product should feel like a mature developer tool: calm, precise, information-rich, and easy to scan.

- Use a restrained palette built around charcoal, near-black, white, and deliberate blue accents.
- Establish design tokens for color, spacing, typography, radii, borders, shadows, focus, and motion. Do not invent one-off values on each page.
- Use typography to establish hierarchy; avoid excessive uppercase labels and tiny low-contrast helper text.
- Align content to a consistent grid and use predictable page widths.
- Prefer clear tables, lists, code panels, and well-structured forms when they fit the task. Do not turn every item into a decorative card.
- Avoid gratuitous gradients, glows, floating decorations, fake terminal text, meaningless metrics, and charts without a real data source.
- Icons must be consistent, recognizable, and paired with labels when their meaning is not obvious.

### Interaction and information design

- Navigation must show the current location and provide a predictable path between related resources.
- Every control must perform the action its label promises. Disabled controls must explain why they are disabled.
- Forms must validate inputs, preserve user work after recoverable errors, and give actionable feedback.
- Every data-driven page must define loading, empty, partial, success, and error states.
- Destructive actions need clear consequences and an appropriate confirmation step.
- Long-running operations need honest progress and a recovery path.
- Do not show a success message until the operation has actually succeeded.
- Do not hide important permissions, environment scope, or billing consequences behind ambiguous labels.

### Accessibility and responsive behavior

- Target WCAG 2.2 AA. Use measurable checks: 4.5:1 contrast for normal text, 3:1 for large text and required UI component boundaries, and a 24 by 24 CSS-pixel minimum pointer target unless a documented WCAG exception applies.
- Support reflow at a 320 CSS-pixel viewport width without loss of content or functionality, except for content that inherently requires two-dimensional layout.
- All functionality must be usable with a keyboard; focus must be visible, unobscured, and follow a logical order.
- Use semantic HTML, programmatic labels, meaningful headings, and accessible status/error announcements.
- Do not use color alone to communicate status.
- Respect reduced-motion preferences.
- Support narrow mobile layouts without horizontal page overflow, clipped dialogs, or inaccessible navigation.
- Verify at minimum a narrow phone viewport, tablet width, and desktop width.

### UI acceptance review

Review the actual page at each supported viewport. Check visual hierarchy, spacing, text legibility, keyboard/focus behavior, loading and empty states, form errors, long content, and responsive navigation. A passing build is not a visual review.

## 3. Functional and data standards

- A visible feature must be backed by a real implementation or clearly labeled as planned/unavailable.
- No mock values may appear in production unless explicitly identified as sample data.
- API responses must be validated and have predictable success and error shapes.
- Validate all untrusted input on the server, even when the client also validates it.
- Use pagination or bounded result sets for potentially growing collections.
- Make retries safe where practical; avoid duplicate writes on repeated submissions.
- Use explicit time zones and stable identifiers for dates and records.
- Provide useful empty states that explain the next valid action.

Accessibility requirements are based on the [W3C Web Content Accessibility Guidelines 2.2](https://www.w3.org/TR/WCAG22/). Treat AA as the release target, not as a claim that the current interface has already been audited.

## 4. Security and privacy standards

- Initialize the authentication provider at the request boundary, then authenticate and authorize every protected page, route handler, and server action at the resource itself.
- Derive the acting user and tenant scope from the verified server-side session. Never accept an owner ID or role from browser input as authority.
- Apply ownership/tenant filters to every read, update, and delete query.
- Use least-privilege permissions for humans, service accounts, API keys, and integrations.
- Keep secret credentials server-side. Never place private keys in `NEXT_PUBLIC_*` variables, browser bundles, client logs, analytics, or error messages.
- API credentials must have an explicit identity type (personal, service, or administrative), project/environment scope, permissions, and expiry.
- Full API secrets must be shown only at creation and never returned by later list/detail calls. Store only the minimum verification material needed for the intended credential flow.
- Support replacement-first rotation: issue a replacement, update the consumer, verify it, then revoke the old credential.
- Administrative credentials must remain isolated from application/workload credentials and server-side only.
- Log security-relevant events without logging credentials or sensitive payloads.
- Keep development, preview, and production credentials and data separated.
- Use production authentication keys and the provider's production deployment requirements before treating a public deployment as production-ready.
- Database migrations must be reviewed, documented, and applied deliberately. A normal deploy must not silently mutate production schema.

## 5. Integration and cost standards

- Inspect already-installed Vercel integrations and existing service accounts before proposing another provider.
- Distinguish **confirmed connected**, **environment variables present**, **configuration not verified**, and **not connected**. These states are not interchangeable.
- Identify whether a Vercel integration is a native Marketplace product or a connectable account; billing and account ownership differ.
- Check the actual product plan, quotas, overage behavior, and free-tier limits before adopting a service.
- Do not upgrade a plan, enable a paid feature, buy a domain, provision a paid resource, or incur usage deliberately without the owner's explicit approval.
- Reuse existing infrastructure when it meets the requirement. Prefer low-cost, observable, reversible choices.
- Do not trigger model training, heavyweight compute, or paid runtime usage to validate an interface change.

## 6. Engineering standards

- Keep TypeScript strict and avoid untyped escape hatches where practical.
- Separate UI, server routes, data access, validation, and provider adapters.
- Keep provider-specific code behind small, documented interfaces.
- Use environment variables for deployment configuration; never commit secret values.
- Prefer a small dependency set. Every added package needs a reason, maintenance review, and license check.
- Keep database schema and migrations under version control.
- Add tests for authorization boundaries, validation, data isolation, and error handling—not only happy paths.
- Add integration or end-to-end coverage for critical user journeys.
- Keep documentation aligned with actual code and deployment behavior.
- Make changes in a branch, inspect the diff, run relevant checks, and deploy only the commit that was reviewed.

## 7. Research and decision records

For any meaningful new capability:

1. Define the user problem and acceptance criteria.
2. Read current official documentation for relevant providers and APIs.
3. Compare at least two viable implementation patterns where alternatives exist.
4. Check security implications, operational complexity, costs, quotas, and lock-in.
5. Record the decision, alternatives rejected, and reasons.
6. Implement the smallest coherent change that satisfies the criteria.
7. Test, review, and document the actual result.

Do not copy a competitor's interface or API model without understanding its purpose and trade-offs. Research is for informed decisions, not imitation.

## 8. Definition of done

A feature is done only when all applicable checks pass:

- [ ] The user problem and acceptance criteria are written down.
- [ ] Research and the implementation decision are recorded.
- [ ] The UI follows the design system and has been reviewed at supported viewports.
- [ ] Keyboard access, labels, focus, and status announcements are checked.
- [ ] Loading, empty, validation, success, and error states are handled.
- [ ] Server-side authorization and tenant isolation are tested.
- [ ] Secrets and personal data are handled safely.
- [ ] Automated checks pass, including targeted regression tests.
- [ ] Documentation and migrations match the implementation.
- [ ] The approved direct-to-main workflow is followed; the exact Production deployment reaches Ready and the primary domain is verified. Do not create preview deployments for this repository.
- [ ] Known limitations are listed honestly.

A feature that fails an applicable check remains in progress. Do not relabel it as finished to make the roadmap look better.
