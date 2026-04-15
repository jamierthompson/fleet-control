# Fleet Control

A terminal-inspired security operations dashboard. Bloomberg-style amber-on-black phosphor aesthetic, dense gridded layout, monospace throughout.

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
│   └── app/              # App Router routes, layouts, and global styles
├── public/               # Static assets
├── next.config.ts        # Next.js configuration
├── tsconfig.json         # TypeScript configuration
└── package.json
```

## Scripts

| Command      | Description                          |
| ------------ | ------------------------------------ |
| `pnpm dev`   | Start the development server         |
| `pnpm build` | Build the app for production         |
| `pnpm start` | Run the production build locally     |
| `pnpm lint`  | Lint the codebase with ESLint        |
