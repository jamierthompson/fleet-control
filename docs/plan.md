# Fleet Control — Project Plan

A working reference that captures where the project is, the conventions being followed, and what comes next. Read this before starting any new work so the project stays coherent across sessions.

---

## Status

**Design system foundation is complete and the first primitive has landed.** Tasks 1–7 below are all merged to `main`.

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
| 9 | `BlinkDot` primitive               | `feat/blink-dot-primitive`     | TBD |

What exists:

- **Next.js 16 App Router app** with TypeScript, ESLint, src/ layout, no Tailwind.
- **JetBrains Mono** self-hosted via `next/font/google` at weights 300–800.
- **Primitive tokens** in `src/styles/tokens.primitive.css` — every color, font size, weight, tracking, leading, spacing, dimension, border width, and motion value from `fleet-control-tokens.md` as CSS custom properties on `:root`.
- **Semantic tokens** in `src/styles/tokens.semantic.css` — intent-based aliases (`--surface-panel`, `--text-brand`, `--border-signal-crit`) that reference primitives. Components must consume these, never primitives.
- **Composite typography** in `src/styles/typography.module.css` — the 24 named text recipes (`displayXl`, `labelMd`, `buttonPrimary`, etc.) as a CSS Module with `composes:` for shared traits.
- **`/styleguide`** route (`src/app/styleguide/page.tsx`) — a long-scroll in-browser reference rendering every token in the system. This is the Figma replacement and the working canvas for primitive development — every new primitive should be added here as it is built.
- **Vitest + RTL + jest-dom** wired up with one smoke test and one styleguide render test. Add a test alongside every primitive.

What's next: primitives (Tasks 7+).

---

## Conventions

These were established in the design-system phase and should hold throughout the project unless explicitly changed.

### Git workflow

- Never commit to `main`. Every task gets its own branch.
- **Branch naming**: `<type>/<kebab-case-summary>` where type is `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, or `style`.
- **Commits**: Conventional Commits (`feat: …`, `chore: …`, etc.). Keep them small and focused — one logical change per commit. Commit messages explain the *why*, not just the *what*.
- **PRs**: every task, even solo. PR body has a Summary and Test plan checklist. Merge with **regular merge commits** (`gh pr merge N --merge --delete-branch`), never squash — the feature-branch history is preserved on `main`.
- Delete local and remote branches after merging.
- After merging, `git checkout main && git pull` to sync before starting the next task.

### Token discipline

- **Primitives are never referenced by components.** Always consume semantic tokens. The primitives layer exists so the UI can be re-skinned by swapping primitive values without touching any component or alias.
- **Typography is applied as composite classes** from `typography.module.css`, not as individual `font-size`/`font-weight`/etc. declarations in component styles.
- If a component needs a value that does not have a semantic token, **add a semantic token first**, then consume it. Do not hardcode.

### Component layout

- All component source lives under `src/` with the `@/*` path alias pointing at `src/*`.
- **Primitives live in `src/components/primitives/<PrimitiveName>/`** with three files: `<PrimitiveName>.tsx`, `<PrimitiveName>.module.css`, and `<PrimitiveName>.test.tsx`. The folder exports a default component from `index.ts` if useful.
- Server Components by default. Only add `"use client"` when the primitive actually needs browser APIs, event handlers, or React hooks. Push the boundary as far down the tree as possible.
- CSS Modules for all component styles. No global CSS except `globals.css` (which only loads token files and sets body defaults).

### Styleguide updates

- **Every new primitive gets a styleguide entry in the same PR that introduces it.** No exceptions. The styleguide is the source of truth for "what exists," and drift between code and styleguide is the failure mode we're preventing.
- Styleguide entries should show: the primitive rendered in each of its variants, its props (if any), and its position in the composition hierarchy.

### Testing

- At minimum, every primitive gets **one smoke test** that renders it with default props and asserts it is in the document. This exists to exercise the CSS Module compilation and catch import-time errors, not to pin behavior.
- Add more tests only when the primitive has real logic (prop-driven variants, conditional classNames, accessibility state).
- Tests live in `tests/unit/components/primitives/<PrimitiveName>.test.tsx`.

---

## Source of truth

The living source of truth for the design system is the code:

- **`src/styles/tokens.primitive.css`** — every primitive as a CSS custom property.
- **`src/styles/tokens.semantic.css`** — semantic aliases into primitives.
- **`src/styles/typography.module.css`** — composite text styles.
- **The `/styleguide` page** (`src/app/styleguide/page.tsx`) — the living visual reference. If a token or primitive is not on this page, it does not exist in the system.

If the code and the design-phase reference docs below disagree, the code wins — update the docs or discard them.

## Design-phase references

These are the files that seeded the project. They live in the user's local `docs/` folder but are **gitignored** so they are not committed to the repo. They are starting reference, not binding spec:

- **`docs/fleet-control-tokens.md`** — the original token system spec (primitive + semantic tables, composite typography recipes, naming rules).
- **`docs/fleet-control-tokens.json`** — the tokens in Tokens Studio format, for future Figma import.
- **`docs/fleet-control.html`** — the full dashboard mockup (the "Now" screen, 1685 lines). This is the visual target Tasks 7+ are rebuilding in React.
- **`docs/screen-5-permissions.html`** — the permissions DSL editor (1324 lines). Different screen, shares the design system, will be tackled after the main dashboard.

When building a primitive, open the mockup in a browser (`open docs/fleet-control.html`) and inspect elements. The HTML is deliberately over-annotated with section comments.

**If you are starting from a fresh clone** and these files are missing from your local `docs/` folder, ask the user for them — they are not tracked in git.

---

## Primitive inventory

The `fleet-control.html` mockup divides cleanly into nine visual regions. Each region needs its own primitives; some primitives recur across regions (`Badge`, `KeyValueRow`). This inventory is a rough map — expect to discover more as we go.

Dependency relationships are noted as **[→ depends on: X, Y]**. Primitives with no dependencies are "leaves" and should be built first.

### 1. Top status bar

*Full-width black bar with brand chip, breadcrumb path, live meta, clock, user chip.*

- **`LivePulse`** — the animated pulsing dot (6px circle, 1.6s opacity pulse). Used in the topbar and footer "STREAM OK" status. **No dependencies. Build first.**
- **`BrandChip`** — amber-filled "SENTRYOS/FLEET" wordmark at the left of the bar. `brandWordmark` typography, black-on-amber.
- **`BreadcrumbPath`** — the `CONTROL › NOW · LOG · REPLAY · PERMISSIONS · COMPLIANCE` nav element. Highlights the current segment.
- **`TopBarMeta`** — "WS · LIVE" with `LivePulse` + "BUILD 2026.04.15-r3". Composed.
- **`LiveClock`** — "04:21:33 CT" with a muted tz suffix. Static in code for now; real clock later.
- **`UserChip`** — avatar box + "R.AHN · L3 ON-CALL".
- **`TopBar`** — the container that composes all of the above into the grid. **[→ depends on: everything above]**

### 2. Posture strip

*The 56px-tall strip below the topbar with the current posture, "4 ITEMS NEED YOU" heading, and action buttons.*

- **`PostureBlob`** — the colored dot indicating current posture severity (amber, linked, or crit). Variant of a generic dot primitive or its own thing.
- **`Posture`** — "Posture ELEVATED ▲47m" label + blob + trend. Composed.
- **`StripAction`** — the `↻ REFRESH`, `⤓ EXPORT`, `⚙ VIEW` buttons. Secondary button style.
- **`Pill`** — the "1 OPEN INCIDENT" and similar inline badges with borders. May generalize to a shared `Badge` primitive — TBD when we see how Cards use badges.
- **`PostureStrip`** — the container composing all of the above. **[→ depends on: Posture, StripAction, Pill]**

### 3. Left rail (roster)

*308px-wide panel listing all agents grouped by class, with filter chips at the top.*

- **`FilterChip`** — the `ALL 24`, `DEMAND 2`, `LINKED 2`, `STALE 1` buttons. Has an active state.
- **`RosterHeader`** — "FLEET ROSTER · 7 CLASSES" + "24 AGENTS" + filter chips row.
- **`StatusPip`** — tiny colored dot indicating agent status (crit red, linked yellow, stale gray ring, nominal green). Likely the same primitive as `PostureBlob` — consolidate during the build.
- **`AgentRow`** — one agent: pip + namespaced ID (`vuln-scanner·prod`) + status badge. **[→ depends on: StatusPip]**
- **`ClassHeader`** — collapsible group header: caret + class name + count + aggregate pip. Click to collapse.
- **`ClassGroup`** — `ClassHeader` + list of `AgentRow`s. **[→ depends on: ClassHeader, AgentRow]**
- **`Roster`** — the whole left rail. **[→ depends on: RosterHeader, ClassGroup]**

### 4. Summary cells

*Four stacked cells at the top of the main content area: Demand, Linked, Stale, Nominal — each with a big number.*

- **`StatusBadge`** — the small uppercase badge with color-coded fill and border (`CRIT`, `LINK`, `STALE`, `NOM`). Used in summary cells AND cards AND roster rows — this is a **high-reuse primitive, prioritize building it properly**.
- **`SummaryCell`** — one cell: top row (label + tag badge), big number (`displayXl`), sub text. Variant-driven (`crit`, `link`, `stale`, `nom`) controls the accent strip color at the top. **[→ depends on: StatusBadge]**
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

- **`KeyValueRow`** — one `<dt>`/`<dd>` pair styled as a labeled field. The label is right-aligned, small, muted; the value is left-aligned, primary text. This is the building block of every card body.
- **`FieldGrid`** — a vertical stack of `KeyValueRow`s sharing a grid.
- **`Badge`** — the uppercase status badge used in card headers (`NOW · CRIT`, `LINKED · LOCK`, `STALE · FLEET HEALTH`). Overlaps with `StatusBadge` from section 4 — **consolidate into one primitive with variants**.
- **`AgentIdBlock`** — namespaced agent ID (`vuln-scanner·prod`) + description line below. Used in card headers.
- **`CardMeta`** — right-aligned meta rows: `FIRED 03:42 · 39m AGO` + confidence tier.
- **`ConfidenceChip`** — `CONF 94%` in one of three amber tiers (below/standard/high) plus delta variants. Own primitive because of the tier logic.
- **`CardHeader`** — composes Badge + AgentIdBlock + CardMeta. **[→ depends on: Badge, AgentIdBlock, CardMeta, ConfidenceChip]**
- **`CardActionRow`** — the button row at the bottom. Hosts secondary, ghost, primary, and crit variants.
- **`CardButton`** — a single button in the action row. Variants: `primary`, `crit`, `ghost`, `default`. May include a keyboard key hint (`D`, `↵`).
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

- **`FunctionKey`** — one key: bold key name + function. Has an active state. Click-to-activate behavior in the mockup is client-side.
- **`FunctionKeyRow`** — the full row of `FunctionKey`s.
- **`Footer`** — composes `FunctionKeyRow` + `LivePulse` + stream status. **[→ depends on: FunctionKey, LivePulse]**

---

## Build order

The principle: **build leaves before branches**. A primitive that composes another must be built after the thing it composes. Inside each tier, order is flexible.

**Tier 1 — zero-dependency leaves (build first).**

1. `LivePulse` — dot with pulse animation
2. `StatusPip` / `PostureBlob` — colored dots (likely one primitive with variants)
3. `Badge` / `StatusBadge` — the uppercase status badge used in summary cells, cards, roster, and posture strip. **Highest reuse; invest in getting the variant API right.**
4. `KeyValueRow` — the core of every card body
5. `ConfidenceChip` — own primitive because of tier logic
6. `FilterChip` — roster filter pill
7. `FunctionKey` — footer function-key button

**Tier 2 — simple composed primitives.**

8. `AgentRow` ← StatusPip
9. `AgentIdBlock`
10. `CardButton` — action row button variants (may need its own primitive or become part of CardActionRow)
11. `BrandChip`, `UserChip`, `LiveClock`, `TopBarMeta` ← LivePulse
12. `BreadcrumbPath`
13. `StripAction`, `Pill` (may be Badge)
14. `Posture` ← PostureBlob
15. `StaleMetric`, `SiblingInstance`, `MissedItem`

**Tier 3 — mid-level composed primitives.**

16. `ClassHeader` + `ClassGroup` ← AgentRow
17. `RosterHeader` ← FilterChip
18. `SummaryCell` ← StatusBadge/Badge
19. `TimelineEvent`, `TimelineAxis`, `CorrelationBracket`, `TimelineLegend`
20. `CardHeader` ← Badge, AgentIdBlock, ConfidenceChip
21. `FieldGrid` ← KeyValueRow
22. `CardActionRow` ← CardButton
23. `IncidentIdChip`, `IncidentHeader`
24. `StaleMetricGrid`, `SiblingList`, `MissedList`
25. `Finding` ← ConfidenceChip

**Tier 4 — top-level regions.**

26. `TopBar` ← BrandChip, BreadcrumbPath, TopBarMeta, LiveClock, UserChip
27. `PostureStrip` ← Posture, StripAction, Pill
28. `Roster` ← RosterHeader, ClassGroup
29. `SummaryGrid` ← SummaryCell
30. `QueueTimeline` ← TimelineEvent, TimelineAxis, CorrelationBracket, TimelineLegend
31. `Card` ← CardHeader, FieldGrid, CardActionRow (crit / linked / stale variants)
32. `IncidentGroup` ← IncidentHeader, Card
33. `Footer` ← FunctionKey, LivePulse

**Tier 5 — the full screen.**

34. Assemble `/` (the `fleet-control.html` equivalent) — a Server Component page that composes every top-level region into the full dashboard layout.

---

## Notes for a future session

If you are picking this up cold:

1. **Read this file first**, then `fleet-control-tokens.md`, then skim `fleet-control.html` to get a visual sense of what's being built.
2. **Run `pnpm dev` and visit `/styleguide`**. Everything that currently exists in the design system is visible there.
3. **Check `git log --oneline --graph`** to see the commit history shape. Follow the same merge-commit-per-task pattern.
4. **The user is learning as we go.** Explain decisions, tradeoffs, and gotchas as they arise. Do not jump ahead to implementation without agreement on the approach.
5. **Check in between tasks.** Do not chain multiple primitives in one session without breaks for review — the point of the leaf-first build order is that each primitive is a discrete, reviewable step.
6. **Expect to revise this inventory.** It is a working map, not a spec. When a primitive turns out to need splitting, merging, or renaming, update this file in the same commit as the change.
