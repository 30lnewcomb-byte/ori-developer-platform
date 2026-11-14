# Ori Developer Platform UI System

**Status:** Initial implementation  
**Last reviewed:** 2026-11-14

This document describes the initial shared visual system implemented in `app/globals.css`. It is intentionally small and should evolve only when a real interface need justifies a change.

## Visual language

- **Page:** near-black charcoal background.
- **Surfaces:** layered charcoal panels with restrained borders.
- **Text:** high-contrast near-white for primary content; muted blue-gray for supporting content.
- **Accent:** a single restrained blue family for primary actions, active navigation, links, and focus.
- **Status:** subdued semantic colors; never rely on color alone.
- **Typography:** system UI sans stack; monospace only for identifiers and code-like values.
- **Shape:** consistent 8px, 12px, and 18px radii for controls, panels, and larger surfaces.
- **Depth:** use borders and surface changes first; shadows are reserved for major overlays.

## Core tokens

The CSS custom properties in `:root` are the source of truth:
- `--page`, `--surface`, `--surface-raised`, `--surface-muted`
- `--line`, `--line-strong`
- `--text`, `--text-muted`, `--text-subtle`
- `--blue`, `--blue-strong`, `--blue-soft`
- `--success`, `--warning`, `--danger`
- `--radius-sm`, `--radius-md`, `--radius-lg`

Do not introduce page-specific colors when a token already represents the intended role.

## Component rules

- **Buttons:** use `primaryButton` for the main action and `quietButton` for secondary actions. Disabled state must remain legible and non-interactive.
- **Workspace navigation:** show the current page using both surface and text changes. Keep all destinations labeled.
- **Cards/panels:** use only when grouping related content. Prefer tables or lists for dense data.
- **Forms:** visible labels, readable placeholders, clear focus, server-side validation, and actionable error states.
- **Status:** pair a status label with enough context to understand it. Do not imply health or availability unless a real source confirms it.
- **Clerk UI:** preserve provider behavior; customize presentation through supported appearance classes rather than rebuilding authentication UI.

## Layout and responsive rules

- Desktop console uses a persistent side navigation and a readable content column.
- At narrow widths, navigation becomes a horizontally scrollable labeled strip; the content becomes a single column.
- Forms and resource grids collapse to one column on small screens.
- Do not allow the page itself to overflow horizontally.
- Keep focus outlines visible and respect `prefers-reduced-motion`.

## Accessibility reference

The accessibility target is WCAG 2.2 AA:
- Normal text contrast should reach 4.5:1; large text and required UI component boundaries should reach 3:1.
- Pointer targets should be at least 24 by 24 CSS pixels unless a WCAG exception is applicable.
- Content should reflow at 320 CSS pixels without losing information or functionality.
- Keyboard focus must remain visible and unobscured. Do not rely on color alone for state.

Reference: [W3C Web Content Accessibility Guidelines 2.2](https://www.w3.org/TR/WCAG22/).

This is the acceptance target; it is not a claim that the current screens have passed an accessibility audit.

## Visual review checklist

Before release, inspect the actual preview in desktop and mobile browsers:
- [ ] Heading hierarchy and page spacing
- [ ] Navigation current state and keyboard focus
- [ ] Form labels, errors, disabled states, and empty states
- [ ] Long names/descriptions and narrow viewport behavior
- [ ] Clerk sign-in/sign-up panels
- [ ] Text and controls remain legible in the selected color scheme

A passing build is not evidence of a passing visual review.
