# Fleet Control

A terminal-inspired command surface for managing autonomous AI agents in security operations. A fleet of specialized agents runs continuously — scanning networks, triaging vulnerabilities, monitoring access, checking compliance. Some auto-patch. Some lock accounts. Some watch and wait. They never stop.

The design problem isn't interaction — it's command. This isn't a dashboard that reports what happened in a time window. It's a queue of decisions that still need a human, with the context needed to act immediately.

Bloomberg terminal aesthetic: amber-on-black phosphor, JetBrains Mono, dense gridded layout. Deliberately not another dark-mode cyber thing.

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, React Server Components)
- **Language:** TypeScript
- **Styling:** CSS Modules + CSS custom properties (no utility framework)
- **Font:** JetBrains Mono (self-hosted via `next/font/google`)
- **Package manager:** pnpm

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
fleet-control/
├── src/
│   ├── app/                       # App Router routes (/, /styleguide)
│   ├── components/
│   │   └── primitives/            # Reusable design-system primitives
│   │       ├── Badge/
│   │       ├── BlinkDot/
│   │       ├── LivePulse/
│   │       └── StatusPip/
│   └── styles/
│       ├── tokens.primitive.css   # Raw design tokens (colors, sizes, motion)
│       ├── tokens.semantic.css    # Intent-based token aliases
│       ├── typography.module.css  # 24 composite text styles
│       └── globals.css            # Body defaults and token imports
├── tests/
│   └── unit/
│       └── components/primitives/ # One smoke test per primitive
├── docs/
│   └── plan.md                    # Living project plan, inventory, build order
├── public/                        # Static assets
├── CLAUDE.md                      # Stable project rules for contributors
├── next.config.ts
├── tsconfig.json
└── package.json
```

## Design system

Fleet Control is built on a token-and-primitive design system. Primitives consume semantic tokens (`--text-signal-crit`, `--surface-panel`), which alias raw primitive tokens (`--color-signal-crit`, `--color-bg-1`). The single source of truth for everything that exists in the system is the **`/styleguide` page** — run `pnpm dev` and visit [http://localhost:3000/styleguide](http://localhost:3000/styleguide) to see every token, typography style, and primitive rendered live.

See [`docs/plan.md`](./docs/plan.md) for the inventory of primitives, the dependency-ordered build plan, and the current status of the project.

## Scripts

| Command      | Description                          |
| ------------ | ------------------------------------ |
| `pnpm dev`   | Start the development server         |
| `pnpm build` | Build the app for production         |
| `pnpm start` | Run the production build locally     |
| `pnpm lint`  | Lint the codebase with ESLint        |
| `pnpm test`  | Run the Vitest + RTL test suite      |
