# Fleet Control — Project Plan

A working reference that captures where the project *is* and what comes *next*. Read this before starting any new work so the project stays coherent across sessions.

For the stable *how we work* rules (token discipline, testing, git workflow, styleguide discipline, etc.) and pointers to the source-of-truth files and design-phase references, see [`CLAUDE.md`](../CLAUDE.md). This file deliberately does not duplicate those — it focuses on project state: status, inventory, and build order.

---

## Status

**Design system foundation is complete and primitive work is underway.** See the table below for what has merged.

| # | Task                               | Branch                          | PR  |
| - | ---------------------------------- | ------------------------------- | --- |
| 1 | Scaffold Next.js + strip defaults  | *(initial + b3ad817)*           | —   |
| 2 | Vitest + React Testing Library     | `chore/setup-vitest`            | #1  |
| 3 | Primitive design tokens            | `feat/design-tokens-primitive`  | #2  |
| 4 | Semantic design tokens             | `feat/design-tokens-semantic`   | #3  |
| 5 | Composite typography styles        | `feat/typography-styles`        | #4  |
| 6 | `/styleguide` page                 | `feat/styleguide-page`          | #5  |
| 7 | `LivePulse` primitive              | `feat/live-pulse-primitive`    | #7  |
| 8 | `StatusPip` primitive              | `feat/status-pip-primitive`    | #9  |
| 9 | `BlinkDot` primitive               | `feat/blink-dot-primitive`     | #10 |
| 10| `Badge` primitive                  | `feat/badge-primitive`         | #11 |
| 11| `KeyValueRow` primitive            | `feat/key-value-row-primitive` | #13 |
| 12| `ConfidenceChip` primitive         | `feat/confidence-chip-primitive` | #14 |
| 13| `FilterChip` primitive             | `feat/filter-chip-primitive`   | #15 |
| 14| `FunctionKey` primitive            | `feat/function-key-primitive`  | #16 |
| 15| `AgentIdBlock` primitive + `metaMd` typography | `feat/agent-id-block-primitive` | #17 |
| 16| `CardButton` primitive             | `feat/card-button-primitive`   | #19 |
| 17| `AgentRow` primitive + StatusPip shape | `feat/agent-row-primitive`  | #20 |
| 18| `BrandChip` primitive              | `feat/brand-chip-primitive`    | #21 |
| 19| `UserChip` primitive               | `feat/user-chip-primitive`     | #22 |
| 20| `BreadcrumbPath` primitive + `navPath` typography | `feat/breadcrumb-path-primitive` | #23 |

What exists:

- **Next.js 16 App Router app** with TypeScript, ESLint, src/ layout, no Tailwind.
- **JetBrains Mono** self-hosted via `next/font/google` at weights 300–800.
- **Primitive tokens** in `src/styles/tokens.primitive.css` — every color, font size, weight, tracking, leading, spacing, dimension, border width, and motion value as CSS custom properties on `:root`.
- **Semantic tokens** in `src/styles/tokens.semantic.css` — intent-based aliases (`--surface-panel`, `--text-brand`, `--border-signal-crit`, `--size-avatar`, `--size-brand-dot`) that reference primitives. Components must consume these, never primitives.
- **Composite typography** in `src/styles/typography.module.css` — 25 named text recipes (`displayXl`, `labelMd`, `buttonPrimary`, `metaMd`, `brandWordmark`, `navPath`, etc.) as a CSS Module with `composes:` for shared traits. Three composites have been added since the initial 24 as specific typography needs came up in primitive work: `metaMd` (AgentIdBlock), `brandWordmark` (BrandChip), `navPath` (BreadcrumbPath).
- **`/styleguide`** route (`src/app/styleguide/page.tsx`) — a long-scroll in-browser reference rendering every token in the system. This is the Figma replacement and the working canvas for primitive development — every new primitive should be added here as it is built.
- **Vitest + RTL + jest-dom** wired up with smoke tests for every merged primitive. Add a test alongside every new one.
- **All eight Tier-1 primitives shipped.** Tier-2 (simple composed primitives) is well underway: `AgentRow`, `AgentIdBlock`, `CardButton`, `BrandChip`, `UserChip`, and `BreadcrumbPath` shipped — remaining Tier-2 work is the rest of the topbar (`LiveClock`, `TopBarMeta`), then the posture strip and stale-card primitives.

---

## Plan-maintenance rules

Two project-state rules live here (not in CLAUDE.md) because they specifically govern this file:

- **Status table** — add a row in the same PR that ships a primitive. The PR number can be backfilled in a tiny follow-up commit after `gh pr create` returns the URL, but the row itself goes in during the main change.
- **Primitive inventory** — when a primitive turns out to need splitting, merging, or renaming during implementation, update the inventory entry below in the same commit. The inventory is a working map, not a spec — it is expected to evolve.

All other conventions (token discipline, testing, git workflow, styleguide discipline, component layout, source of truth, design-phase references) live in [`CLAUDE.md`](../CLAUDE.md).

---

## Primitive inventory

The `fleet-control.html` mockup divides cleanly into nine visual regions. Each region needs its own primitives; some primitives recur across regions and are tracked in a shared "leaves" section at the end. This inventory is a rough map — expect to discover more as we go.

Dependency relationships are noted as **[→ depends on: X, Y]**. Primitives with no dependencies are "leaves" and should be built first. Shipped primitives are marked **✓ (PR #N)** inline with a brief note on the as-built behaviour.

### 1. Top status bar

*Full-width black bar with brand chip, breadcrumb path, live meta, clock, user chip.*

- **`LivePulse`** ✓ (#7) — shipped as a 6px *square* (not a circle — matches the phosphor-pixel aesthetic) in nominal green, 1.6s opacity pulse. Server Component, presentational (aria-hidden). Used in the topbar and footer "STREAM OK" status.
- **`BrandChip`** ✓ (#21) — amber-filled `[■] SENTRYOS/FLEET` wordmark. `brandWordmark` typography (11px / 800 / 0.12em tracking / uppercase) on an amber fill, with a 6px black phosphor square prefix and the `/` separator at 55% opacity. No props — the wordmark is fixed product identity. Carries its own **horizontal padding** (`var(--space-14)`) because the amber fill has to extend past the text — padding is load-bearing for the visual, not just breathing room. Fixed cell height, border-right between cells, and vertical centring still belong to the future `TopBar` container. Added the `--size-brand-dot` semantic alias for the phosphor square.
- **`BreadcrumbPath`** ✓ (#23) — topbar nav lockup with three distinct colors: **ancestors** in dim amber (trail text), **current page** in primary text with `aria-current="page"`, **siblings** in muted grey. `›` separates ancestors from current (hierarchy), `·` separates current from siblings (sibling-list). All separators are tertiary-text color so they recede. API: `ancestors?: string[]` + `current: string` + `siblings?: string[]` — strings only for now; will evolve to `{ label, href }[]` objects when real routing is wired. Renders as a semantic `<nav>`. Layout-naked. Introduced the `navPath` typography composite (11px / 500 / uppercase / 0.08em) — consumes the `--font-weight-medium` + `--font-tracking-label-wide` primitives whose comments were literally labelled for this purpose but had no composite using them.
- **`TopBarMeta`** — "WS · LIVE" with `LivePulse` + "BUILD 2026.04.15-r3". Composed.
- **`LiveClock`** — "04:21:33 CT" with a muted tz suffix. Static in code for now; real clock later.
- **`UserChip`** ✓ (#22) — topbar identity chip: 16×16 dark-panel avatar square with bright-amber initials, followed by the user's handle and role in dim amber. API: `initials` prop for the avatar contents + `children` for the label text (`R.AHN · L3 ON-CALL`) — follows the Badge "props for structure, children for content" pattern. Layout-naked (no own background, so padding/centring/border belong to the future `TopBar` cell). Avatar initials use `labelXs` (9px / 700 / uppercase); identity label uses `labelLg` (11px / 600 / uppercase / 0.10em tracking — the mockup spec is 0.08em but the 0.02em difference is imperceptible at 11px and not worth a new composite). Added the `--size-avatar` semantic alias (→ `--size-icon-md`).
- **`TopBar`** — the container that composes all of the above into the grid. **[→ depends on: everything above]**

### 2. Posture strip

*The 56px-tall strip below the topbar with the current posture, "4 ITEMS NEED YOU" heading, and action buttons.*

- **`PostureBlob`** ✓ (#9) — consolidated into `StatusPip` as `size="sm"`; use `<StatusPip size="sm" variant="linked" />` (or similar) for the posture pill dot. No separate primitive.
- **`Posture`** — "Posture ELEVATED ▲47m" label + blob + trend. Composed. **[→ depends on: StatusPip]**
- **`StripAction`** — the `↻ REFRESH`, `⤓ EXPORT`, `⚙ VIEW` buttons. Secondary button style.
- **`Pill`** ✓ (#11) — confirmed as `Badge`; the "1 OPEN INCIDENT" and similar inline chips are just `<Badge variant="linked">…</Badge>`. No separate primitive.
- **`PostureStrip`** — the container composing all of the above. **[→ depends on: Posture, StripAction, Badge]**

### 3. Left rail (roster)

*308px-wide panel listing all agents grouped by class, with filter chips at the top.*

- **`FilterChip`** ✓ (#15) — the `ALL 24`, `DEMAND 2`, `LINKED 2`, `STALE 1` toggle buttons. Active chip gets amber fill with black text; inactive chips are muted. Client Component with `aria-pressed` for accessibility.
- **`RosterHeader`** — "FLEET ROSTER · 7 CLASSES" + "24 AGENTS" + filter chips row.
- **`StatusPip`** ✓ (#9) — shipped as a flat colored 6px/8px square (xs/sm sizes) with variants `crit` | `linked` | `nominal` | `stale`, or the muted gray default when no variant is passed. Consolidated with `PostureBlob`. Crit and linked wear a phosphor halo; nominal and stale are flat. The originally-speculated "stale gray ring" is not how it shipped — stale is just a flat gray square like the others.
- **`AgentRow`** ✓ (#20) — one agent: circle StatusPip + namespaced ID (`vuln-scanner·prod`) + sm Badge. Variant-driven background tints and left accent borders. Server Component. **[→ depends on: StatusPip, Badge]**
- **`ClassHeader`** — collapsible group header: caret + class name + count + aggregate pip. Click to collapse.
- **`ClassGroup`** — `ClassHeader` + list of `AgentRow`s. **[→ depends on: ClassHeader, AgentRow]**
- **`Roster`** — the whole left rail. **[→ depends on: RosterHeader, ClassGroup]**

### 4. Summary cells

*Four stacked cells at the top of the main content area: Demand, Linked, Stale, Nominal — each with a big number.*

- **`StatusBadge`** ✓ (#11) — consolidated into `Badge` with `size="sm"` and `appearance="outlined"`. No separate primitive.
- **`SummaryCell`** — one cell: top row (label + tag badge), big number (`displayXl`), sub text. Variant-driven (`crit`, `link`, `stale`, `nom`) controls the accent strip color at the top. **[→ depends on: Badge]**
- **`SummaryGrid`** — the four-cell container.

### 5. Queue timeline

*A 90px-tall horizontal panel showing a time axis and plotted events.*

- **`TimelineAxis`** — the horizontal axis with tick labels (`02:14`, `02:30`, `03:00`, ...).
- **`TimelineEvent`** — a glyph + label + time triple positioned by percent. Variants: `crit`, `link`, `stale`, `miss` (missed). Glyphs differ per variant (filled dot, outlined dot, dashed ring, rotated square).
- **`CorrelationBracket`** — the pair of amber tick marks bracketing linked events.
- **`TimelineLegend`** — the small legend showing what each glyph means.
- **`QueueTimeline`** — composes all of the above. **[→ depends on: TimelineAxis, TimelineEvent, CorrelationBracket, TimelineLegend]**

### 6. Cards (shared base)

*Panel with header (badge + agent ID + meta) + body (field grid) + action row. The single most-reused primitive in the dashboard.*

- **`KeyValueRow`** ✓ (#13) — one `<dt>`/`<dd>` pair styled as a labeled field. Label is uppercase, muted (`labelSm`); value is primary text (`bodySm`) accepting rich children (`<code>`, `<b>`). Renders a bare fragment — the grid layout belongs to the future `FieldGrid` parent.
- **`FieldGrid`** — a vertical stack of `KeyValueRow`s sharing a grid.
- **`Badge`** ✓ (#11) — shipped with three orthogonal props: `variant` (`crit` | `linked` | `nominal` | `stale`, omitted = muted), `appearance` (`filled` | `outlined`, default outlined), `size` (`sm` | `md`, default md). Consolidates what the inventory originally had as separate `Badge` and `StatusBadge`. Filled is only meaningful for crit and linked; other variants fall back to outlined. Consumers compose `<BlinkDot />` as a child for attention-grabbing states.
- **`AgentIdBlock`** ✓ (#17) — namespaced agent ID (`vuln-scanner·prod`) + description subtitle. Name in `headingLg`, muted namespace suffix, description in new `metaMd` typography. Server Component.
- **`CardMeta`** — right-aligned meta rows: `FIRED 03:42 · 39m AGO` + confidence tier.
- **`ConfidenceChip`** ✓ (#14) — `CONF 94%` in one of three amber tiers: high (≥90%), standard (75–89%), below (<75%). Optional delta suffix (`↑ from 62%`). Tier is computed from the value, not passed as a prop.
- **`CardHeader`** — composes Badge + AgentIdBlock + CardMeta. **[→ depends on: Badge, AgentIdBlock, CardMeta, ConfidenceChip]**
- **`CardActionRow`** — the button row at the bottom. Hosts secondary, ghost, primary, and crit variants.
- **`CardButton`** ✓ (#19) — a single button in the action row. Variants: `primary` (amber fill), `crit` (red fill), `ghost` (muted), default (amber text). Optional `keyHint` prop renders a bordered pill. Client Component.
- **`Card`** — the full card. Variants drive the left-accent strip: `crit` (red), `linked` (dark, used inside incident group), `stale` (gray). **[→ depends on: CardHeader, FieldGrid, KeyValueRow, CardActionRow]**

### 7. Incident group

*Amber-bordered wrapper around multiple linked cards, with its own header (incident ID, title, meta) and body.*

- **`IncidentHeader`** — `#4471` chip + title + target + meta row + `ESCALATE TO L4` button.
- **`IncidentIdChip`** — the `#4471` linked-yellow chip.
- **`IncidentGroup`** — wraps one or more `Card`s as a correlated set. **[→ depends on: IncidentHeader, Card]**

### 8. Stacked findings (Threat Detector card)

*A special card variant that contains multiple "findings" stacked vertically in its body instead of a simple field grid. Used for the Threat Detector card which has 3 distinct findings under one card header.*

- **`Finding`** — one finding: title + description prose + optional `ConfidenceChip` + actions.
- **`FindingActions`** — secondary button row specific to findings.
- **`StackedFindingsCard`** — a `Card` where the body is a `Finding` list instead of a `FieldGrid`. May be composable as a `Card` variant rather than a separate primitive.

### 9. Stale / missed list (Patch Manager card)

*A two-column layout inside a stale card: left has stale metrics + sibling instances; right has a "missed runs" list.*

- **`StaleMetric`** — a small labeled metric block (`Heartbeats Missed 147`).
- **`StaleMetricGrid`** — row of three `StaleMetric`s.
- **`SiblingInstance`** — one row: name + last-seen + NOM badge.
- **`SiblingList`** — titled list of `SiblingInstance`s.
- **`MissedItem`** — one missed run: `✗` + time + name.
- **`MissedList`** — titled list of `MissedItem`s with a "+10 more" footer.
- **`StaleCardBody`** — the two-column body layout. Conceptually a body variant of `Card`, not a new top-level primitive.

### 10. Footer

*Function-key row at the bottom: F1 NOW, F2 ROSTER, ... + right-side stream status.*

- **`FunctionKey`** ✓ (#16) — one key: bold key name in amber + muted function label. Active state: amber fill, black text. Client Component with `aria-pressed` and `onClick`.
- **`FunctionKeyRow`** — the full row of `FunctionKey`s.
- **`Footer`** — composes `FunctionKeyRow` + `LivePulse` + stream status. **[→ depends on: FunctionKey, LivePulse]**

### Shared leaves

*Primitives that do not belong to any one visual region — reused inside other primitives across the dashboard.*

- **`BlinkDot`** ✓ (#10) — 6px square that blinks 1.05s on a 2-step opacity cycle. `background: currentColor`, so it inherits the surrounding text colour automatically. Composed inside `Badge` for the `NOW · CRIT` dashboard state and the `PROPOSED` permissions-screen state. Was not in the original inventory — discovered during the Badge design conversation.

---

## Build order

The principle: **build leaves before branches**. A primitive that composes another must be built after the thing it composes. Inside each tier, order is flexible.

**Tier 1 — zero-dependency leaves.**

1. ✓ `LivePulse` (#7)
2. ✓ `StatusPip` (#9) — consolidated `StatusPip` + `PostureBlob`
3. ✓ `BlinkDot` (#10) — discovered during Badge design; composed inside Badge
4. ✓ `Badge` (#11) — consolidated `Badge` + `StatusBadge`
5. ✓ `KeyValueRow` — shipped as a bare `<dt>`/`<dd>` fragment (no wrapper). Label uses `labelSm` typography (uppercase, muted), value uses `bodySm` (primary text). Values accept rich children (`<code>`, `<b>`). Designed to sit inside a future `FieldGrid` `<dl>` that owns the grid layout.
6. ✓ `ConfidenceChip` — inline `CONF N%` chip with tier-driven colouring: high (≥90%, bright amber), standard (75–89%, amber), below (<75%, dim amber). Optional delta suffix shows change from a previous value (`↑ from 62%`). Uses `labelMd` for the label, `labelLg` for the value, `caption` for the delta — no custom font declarations in the CSS Module.
7. ✓ `FilterChip` — roster filter toggle button. Active state: amber fill, black text. Inactive: muted, transparent. Count at reduced opacity when inactive. Client Component (onClick). `aria-pressed` for accessibility. Right border between siblings removed on `:last-child`.
8. ✓ `FunctionKey` — footer navigation button with two-part label: key name ("F1") in amber + function label ("NOW") in muted text. Active state: amber fill, all text black. Client Component with `aria-pressed`. Right border between siblings. Uses `labelMd` throughout — key name gets a colour class only.

Each tier numbers independently — adding a primitive to one tier does not cascade renumbering through the rest.

**Tier 2 — simple composed primitives.**

1. ✓ `AgentRow` ← StatusPip (circle shape), Badge. 3-column grid row: circle pip + agent name (idAgent typography, optional muted namespace) + sm Badge. Variant-driven (crit/linked/stale) background tints, left accent borders, and text colour shifts. Server Component. Also added `shape` prop ("square" | "circle") to StatusPip.
2. ✓ `AgentIdBlock` — namespaced agent ID (headingLg) + muted namespace suffix + description subtitle (new `metaMd` typography composite). Server Component. The `metaMd` composite fills a gap in the typography system: 10px/600/uppercase with `--font-tracking-label` (0.06em), tighter than `labelMd`'s caps tracking.
3. ✓ `CardButton` — card action row button. Four variants: default (amber text), primary (amber fill), crit (red fill), ghost (muted text). Optional `keyHint` renders a bordered pill with a keyboard shortcut. `buttonPrimary` typography on the button, `chipSm` on the key hint. Client Component. Border-left between siblings, first-child left-aligned.
4. ✓ `BrandChip` — amber `[■] SENTRYOS/FLEET` lockup. Carries its own 14px horizontal padding (load-bearing for the amber fill extending past the text); cell height / vertical centring / border-right stay with the future `TopBar`. Added `--size-brand-dot` semantic alias.
5. ✓ `UserChip` — 16×16 avatar square + identity label. Layout-naked (no own background, so padding/centring belong to the future `TopBar` cell). API: `initials` prop + `children` for the label. Added `--size-avatar` semantic alias.
6. ✓ `BreadcrumbPath` — ancestor / current / sibling topbar nav with three colors. API takes `ancestors?: string[]` + `current: string` + `siblings?: string[]`. Introduced the `navPath` typography composite (11px / 500 / uppercase / 0.08em) — the `--font-weight-medium` and `--font-tracking-label-wide` primitives were already earmarked for this but had no composite consuming them.
7. `StripAction` (the Badge-based `Pill` was consolidated into Badge)
8. `Posture` ← StatusPip
9. `StaleMetric`, `SiblingInstance`, `MissedItem`

**Tier 3 — mid-level composed primitives.**

1. `ClassHeader` + `ClassGroup` ← AgentRow
2. `RosterHeader` ← FilterChip
3. `SummaryCell` ← Badge
4. `TimelineEvent`, `TimelineAxis`, `CorrelationBracket`, `TimelineLegend`
5. `CardHeader` ← Badge, AgentIdBlock, ConfidenceChip
6. `FieldGrid` ← KeyValueRow
7. `CardActionRow` ← CardButton
8. `IncidentIdChip`, `IncidentHeader`
9. `StaleMetricGrid`, `SiblingList`, `MissedList`
10. `Finding` ← ConfidenceChip

**Tier 4 — top-level regions.**

1. `TopBar` ← BrandChip, BreadcrumbPath, TopBarMeta, LiveClock, UserChip
2. `PostureStrip` ← Posture, StripAction, Badge
3. `Roster` ← RosterHeader, ClassGroup
4. `SummaryGrid` ← SummaryCell
5. `QueueTimeline` ← TimelineEvent, TimelineAxis, CorrelationBracket, TimelineLegend
6. `Card` ← CardHeader, FieldGrid, CardActionRow (crit / linked / stale variants)
7. `IncidentGroup` ← IncidentHeader, Card
8. `Footer` ← FunctionKey, LivePulse

**Tier 5 — the full screen.**

1. Assemble `/` (the `fleet-control.html` equivalent) — a Server Component page that composes every top-level region into the full dashboard layout.

---

## Notes for a future session

If you are picking this up cold:

1. **Read this file first**, then read `CLAUDE.md` for the stable project rules. If the local design-phase reference docs are present (`docs/fleet-control*.md/.html` — all gitignored), skim `fleet-control.html` to get a visual sense of what's being built. If they are not present, the code under `src/styles/` and the `/styleguide` page are the source of truth and you can proceed without them.
2. **Run `pnpm dev` and visit `/styleguide`**. Everything that currently exists in the design system is visible there.
3. **Check `git log --oneline --graph`** to see the commit history shape. Follow the same merge-commit-per-task pattern.
4. **The user is learning as we go.** Explain decisions, tradeoffs, and gotchas as they arise. Do not jump ahead to implementation without agreement on the approach.
5. **Check in between tasks.** Do not chain multiple primitives in one session without breaks for review — the point of the leaf-first build order is that each primitive is a discrete, reviewable step.
