@AGENTS.md

# Fleet Control — Project Rules

## What this is

A terminal-inspired security operations dashboard. Bloomberg-style amber-on-black phosphor aesthetic, dense gridded layout, monospace throughout. Built with Next.js 16 (App Router), TypeScript, and CSS Modules — no Tailwind, no utility frameworks.

## Where to look first

**Before starting any primitive-building or feature work, read `docs/plan.md`.** It captures the current project status, the design-system conventions in force, the inventory of primitives to build, and the dependency-ordered build tier list. Check the status table in that file to see what has been merged and what comes next.

### Source of truth

The living source of truth for the design system is the code itself:

- **`src/styles/tokens.primitive.css`** and **`src/styles/tokens.semantic.css`** — the design tokens as implemented.
- **`src/styles/typography.module.css`** — the 24 composite text styles.
- **The `/styleguide` page** at `src/app/styleguide/page.tsx` — the living reference for everything that exists. If a token or primitive is not on this page, it does not exist in the system.

### Design-phase references (local only, not in git)

These files seeded the project and still live in the user's local `docs/` folder, but are gitignored. They are starting reference, not binding spec — if they disagree with the code, the code wins:

- **`docs/fleet-control-tokens.md`** — the original token system spec (primitive + semantic tables, composite typography recipes, naming rules).
- **`docs/fleet-control-tokens.json`** — the tokens in Tokens Studio format, for future Figma import.
- **`docs/fleet-control.html`** — the dashboard mockup that Tasks 7+ are rebuilding in React. Open it in a browser to see what's being built.
- **`docs/screen-5-permissions.html`** — the permissions DSL editor mockup, tackled after the main dashboard.

## Stable rules

These hold unless explicitly changed. When in doubt, follow these over anything else.

### Token discipline

- **Primitives are never referenced by components.** Components must consume semantic tokens from `src/styles/tokens.semantic.css` (`--surface-panel`, `--text-brand`, `--border-signal-crit`). If the value you need does not have a semantic token, add one first, then consume it. Do not hardcode hex values, font sizes, or spacing.
- **Typography is applied as composite classes** from `src/styles/typography.module.css` (`displayXl`, `labelMd`, `buttonPrimary`, etc.). Do not declare `font-size`/`font-weight`/etc. individually in component styles.
- **Compose typography in JSX**, not in CSS Modules. Import `typography.module.css` into the component and join the composite class (`typo.labelSm`, etc.) with the local `styles.base` class on the rendered element. Do not use CSS Module `composes: labelSm from "..."` — it works, but the JSX-level composition is easier to read and keeps `<Primitive>.module.css` focused on geometry and colour only. See `src/components/primitives/Badge/Badge.tsx` for the pattern.

### Component layout

- Primitives live in `src/components/primitives/<PrimitiveName>/` with `<PrimitiveName>.tsx` and `<PrimitiveName>.module.css`.
- Server Components by default. Only add `"use client"` when the primitive actually needs browser APIs, event handlers, or React hooks. Push the boundary as far down the tree as possible.
- Use the `@/*` path alias — never relative chains like `../../../`.

### Styleguide discipline

**Every new primitive gets a styleguide entry in the same PR that introduces it.** The `/styleguide` page at `src/app/styleguide/page.tsx` is the source of truth for "what exists" — drift between the code and the styleguide is the failure mode we prevent. When you build a primitive, render it in the styleguide alongside its variants before opening the PR.

### Testing

- Every primitive gets at least one React Testing Library smoke test that renders it with default props and asserts it is in the document.
- Tests live in `tests/unit/components/primitives/<PrimitiveName>.test.tsx`.
- More tests only when the primitive has real logic (prop-driven variants, conditional classNames, accessibility state).

### Git workflow

- Never commit to `main`. Every task gets its own branch.
- Branch naming: `<type>/<kebab-case>` where type is `feat`, `fix`, `chore`, `docs`, `refactor`, `test`, or `style`.
- Commits follow Conventional Commits (`feat: …`, `chore: …`). Keep them small — one logical change per commit. Messages explain the *why*.
- Every task goes through a PR with a Summary and Test plan, even solo. Merge with **regular merge commits**, never squash: `gh pr merge N --merge --delete-branch`.
- After merging, `git checkout main && git pull` before starting the next task.

## Working relationship

- Teach as you go. Explain decisions, tradeoffs, and gotchas.
- Step-by-step: complete one task fully before moving to the next. Check in between tasks.
- Do not jump ahead to implementation without agreement on the approach.
