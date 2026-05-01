# AGENTS.md — HYDRE Nutrition

## Stack

Next.js 16 (App Router) | React 19 | Tailwind CSS v4 | PostgreSQL + Drizzle ORM | Vitest | Playwright

## Package Manager

**pnpm only.** The lockfile is `pnpm-lock.yaml`. Always use `pnpm` for install/run — `npm` or `yarn` will produce divergent results.

## Commands

| Command | Description |
|---|---|
| `pnpm dev` | Dev server on http://localhost:3000 |
| `pnpm build` | Production build (Next.js) |
| `pnpm start` | Run production server |
| `pnpm lint` | ESLint (flat config, `eslint.config.mjs`) |
| `pnpm typecheck` | `tsc --noEmit` (strict) |
| `pnpm test` | Vitest unit tests (run once, no watch) |
| `pnpm test:watch` | Vitest watch mode |
| `pnpm e2e` | Playwright E2E tests |
| `pnpm format` | Prettier + Tailwind class sorting |
| `pnpm db:generate` | Drizzle schema → migration files |
| `pnpm db:migrate` | Apply migrations to PostgreSQL |
| `pnpm assets:prepare` | Run `scripts/prepare-assets.ts` (asset preprocessing) |

## Dev Server / Screenshot Safety

- Never run `pnpm dev`, `next dev`, `npm run dev`, `yarn dev`, or `bun run dev` in the foreground from an agent tool shell.
- The dev server must not block the shell. Start it as a background process only when needed.
- This project uses Next.js on `http://127.0.0.1:3000`.
- Before starting a server, check whether `http://127.0.0.1:3000` already responds.
- If a server is already responding, reuse it. Do not start another one.
- If starting a server, write runtime files under `.agent/`:
  - `.agent/dev-server.pid`
  - `.agent/dev-server.log`
  - `.agent/latest-screenshot.png`
- On Windows PowerShell, do not use `curl -Is`; `curl` may resolve to `Invoke-WebRequest`.
  Use either:
  ```powershell
  Invoke-WebRequest http://127.0.0.1:3000 -UseBasicParsing -TimeoutSec 2

## Testing

- **Unit tests**: Only files under `src/test/**/*.test.ts` are picked up by Vitest. Tests use jsdom environment + `@testing-library/jest-dom` matchers (via `vitest.setup.ts`).
- **E2E tests**: Files in `tests/e2e/`. Playwright auto-starts `pnpm dev` before running. Two browser projects: `chromium` (1440×900) and `mobile` (390×844).

## Database

- Schema: `src/lib/db/schema.ts` (Drizzle, PostgreSQL dialect)
- Migration output: `./drizzle/` (gitignored)
- Requires `DATABASE_URL` env var. Copy `.env.example` to `.env`.
- `getDb()` in `src/lib/db/client.ts` returns `null` when `DATABASE_URL` is missing — code handles this gracefully in dev/test.

## Environment

Copy `.env.example` → `.env`. Key variables:
- `DATABASE_URL` — PostgreSQL connection string
- `RESEND_API_KEY` / `RESEND_FROM_EMAIL` — Email via Resend
- `NEXT_PUBLIC_SITE_URL` — Public site URL for OG/meta tags
- `RATE_LIMIT_SECRET` — Rate limiting secret

`src/lib/env.ts` validates env at load time with Zod. Warnings in dev, silent in test.

## Path Alias

`@/*` resolves to `./src/*` (configured in `tsconfig.json` paths and Vitest alias).

## Project Structure

```
src/
  app/              — Next.js App Router pages + API routes
    api/waitlist/   — Waitlist signup API
    api/vote/       — Poll voting API
    cgv/            — Legal terms page
    mentions-legales/ — Legal mentions page
    politique-confidentialite/ — Privacy policy
  components/
    layout/         — SiteHeader, SiteFooter
    sections/       — Page sections (Hero, Products, Electrolytes, etc.)
    interactive/    — Interactive components (WaitlistForm, etc.)
    ui/             — Reusable UI primitives
  lib/
    content/        — Static content data (products, ingredients, founders, etc.)
    db/             — Drizzle client, schema, queries
    env.ts          — Env loading + Zod validation
    utils.ts        — cn(), currency formatting, smooth scroll, hashing
  styles/           — globals.css, section-backgrounds.css
  test/             — Unit tests (vitest)
tests/e2e/          — Playwright E2E tests
scripts/            — tsx scripts (prepare-assets, create-placeholders)
```

## Key Conventions

- **Content is data-driven**: Page copy lives in `src/lib/content/*.ts`, not inline in components. Components import from these files.
- **CSS classes**: Use `cn()` from `@/lib/utils` for conditional class merging (clsx + tailwind-merge).
- **Tailwind v4**: Uses `@tailwindcss/postcss` plugin (PostCSS config in `postcss.config.mjs`). No `tailwind.config.js`.
- **Prettier**: Config in `.prettierrc`. Uses `prettier-plugin-tailwindcss` for class sorting.
- **Images**: Next.js `<Image>` component. `next.config.ts` allows local IPs. Assets go through `pnpm assets:prepare`.
- **Fonts**: `Bodoni_Moda` (display) + `Inter` (body) via `next/font/google`, loaded in `src/app/layout.tsx`.
- **Language**: Site content is French (`fr-FR`). Metadata, headings, and body text use French.
- **Legal pages**: Static routes under `src/app/cgv/`, `src/app/mentions-legales/`, `src/app/politique-confidentialite/`.
