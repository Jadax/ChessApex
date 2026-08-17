# ChessApex

Climb higher. See deeper.

Version: 0.2.0 — Analysis Core

The repository is a pnpm/Turborepo monorepo. Standard config is applied with these custom scripts: `dev`, `build`, `typecheck`, and `lint` run through Turbo; all product logic lives in `@chessapex/shared` so web and mobile share the same rules, move classification, WeakAI, lessons, and FSRS scheduler.

## MVP commands

```bash
pnpm install
pnpm dev
```

Set `DATABASE_URL` to a Neon connection string and apply `neon/schema.sql`. The web health endpoint is available at `/api/health`.
