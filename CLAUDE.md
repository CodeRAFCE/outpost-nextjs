# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `npm run dev` — Next.js dev server on http://localhost:3000
- `npm run build` — production build (also the closest thing to a type check; `tsconfig` has `strict: true`)
- `npm run start` — serve the production build
- `npm run lint` — ESLint flat config (`eslint.config.mjs`, `next/core-web-vitals` + `next/typescript`)

There is no test runner configured yet, so there is no test command and no way to run a single test.

## Architecture

Outpost is an early-stage Next.js 16 (App Router) + React 19 app. Most of the product is not built yet; the current code is scaffolding plus a shared UI/theme foundation.

- **Root layout** (`app/layout.tsx`) wraps every page in `TooltipProvider` → `AppShell` and mounts the Sonner `Toaster`. Fonts (Geist, Geist Mono, Bricolage Grotesque for headings) are loaded via `next/font` and exposed as CSS variables.
- **`AppShell`** (`components/AppShell.tsx`) is a client component that switches on `usePathname()`. Routes under `/workspace/` and `/shared/` are meant to be full-screen. The current code returns `undefined` for every other route, so `/` renders nothing. Treat that as a bug to fix before building normal pages.
- **Styling** is Tailwind v4 (CSS-first, configured in `app/globals.css`, with `@tailwindcss/turbopack` wired in `next.config.ts`) plus shadcn/ui (`components.json`, style `radix-nova`, icons from lucide). Components in `components/ui/` are shadcn-generated, so prefer editing them through the shadcn workflow rather than rewriting them by hand.
- **Theme** is dark-only. Design tokens are defined once on `:root, .dark` in `app/globals.css`, with amber as the brand `--primary`. Don't add light-mode variants.
- **Custom utilities** in `globals.css`: `topo-bg` (background topographic texture), `survey-frame` (amber corner registration marks), and `scroll-tilt` (scroll-driven tilt). `topo-bg` references `/textures/topo.svg`, which does not exist yet in `public/`.
- **Imports**: `@/*` maps to the repo root. `lib/utils.ts` re-exports `cn` from the `cn` npm package, not the usual `clsx` + `tailwind-merge` combo, so don't assume tailwind-merge conflict resolution.
- **Planned, not present**: the `globals.css` comments reference a BlockNote document editor (`.bn-container`) and canvas editors. Neither is in `package.json` yet.

## Next.js 16 caveats

`AGENTS.md` (imported above) requires reading `node_modules/next/dist/docs/` before writing Next.js code, because APIs and conventions differ from older Next.js versions. `app/layout.tsx` uses the global `LayoutProps<"/">` type, which is part of that newer API.
