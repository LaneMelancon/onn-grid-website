# Onn Grid Website

Marketing site for Onn Grid, a web design agency in Colorado Springs. It is being migrated from Webflow to **Next.js 16 (App Router) + Mantine 9 + Sanity 6, hosted on Vercel**.

- **Content** is a Sanity *section page builder*: pages are arrays of flexible sections.
- **Rendering:** React renders each section through a single registry.
- **Styling** is a reusable token system meant to carry over to future projects.

## Status

The foundation pass is **in progress**: steps 0–7 of `.claude/FOUNDATION-PLAN.md` are written and **committed to `dev`, then pushed**. `main` still holds only the initial commit. Typecheck does not pass yet (see step 1).

Next steps, in order:
1. **Fix the 4 open TypeScript errors.** They come from next-sanity 13's stega-branded result types. The details and the fix are in `.claude/MEMORY.md` → "Open issues".
2. **Sanity setup (no CLI login needed).** The user created an API token and is doing these steps in sanity.io/manage:
   - put a **Viewer-role** token in `.env.local` as `SANITY_API_READ_TOKEN`. It reaches the browser in draft mode, so never use an editor or admin token here.
   - add `http://localhost:3000` to CORS origins with credentials allowed
   - confirm the `production` dataset exists

   Check `.env.local` has the token before running anything. Every route that fetches from Sanity throws without it.
3. **Run the checks:** `npm run lint`, `lint:css`, `typecheck` and `build`. Then smoke-test `/studio`, `/style-guide` and `/`.
4. **Commit the fixes on `dev`** (Conventional Commits). Merge into `main` with `--no-ff`, push, then sync `dev` back to `main`.
5. **Plan the build phase:** navbar and footer, then the section components, templates, and the content import script.

## Commands

| Command | Does |
|---|---|
| `npm run dev` | Start the dev server (Turbopack) at http://localhost:3000, with Studio at `/studio` |
| `npm run build` | Production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` / `npm run lint:css` | ESLint (flat config) / Stylelint on `src/**/*.css` |
| `npm run typegen` | Extract the Sanity schema and generate `src/sanity/types.ts`. Run after every schema or GROQ change. |
| `npm run format` | Prettier |

npm only, with project-scoped installs. Never install globally; use `npx` for CLIs.

## Stack notes

- **Pinned versions:**
  - `typescript@~6.0.3`, because typescript-eslint needs a version below 6.1 and TypeScript 7 has no JS API.
  - `eslint@^9`, because the React and import plugins don't support ESLint 10.
- **Node:** 24 (`.nvmrc`). Sanity requires Node 22.12 or newer.
- **Next 16:** `next lint` is gone; use `eslint .`. `typedRoutes` is on.
- **Mantine** is used for UI components and styling only. Don't use `@mantine/form`, notifications, or hook utilities. Logic lives in Next.js and React (server actions, `useActionState`, native forms).
- **Not used:** Tailwind.

## Structure

```
src/
  app/                   root layout (Mantine, fonts, CSS order), not-found, sitemap, robots, studio, api/draft-mode
    (site)/              GTM (prod only), Vercel analytics, SanityLive, VisualEditing, skip link
      bio-links/         standalone page (no header/footer)
      (chrome)/          header + main + footer
        [[...slug]]/     page-builder catch-all ("/" = page with slug "home")
        work|website-features|service-areas|service-area-features/[slug]/
        style-guide/     design-system preview (404 on the Vercel production deployment)
  components/ui/         atoms: Section, SectionHeader, Eyebrow
  components/sections/   SectionRenderer, registry.ts, types.ts, SectionPlaceholder
  components/layout/     SiteHeader/SiteFooter (placeholders), SkipLink
  theme/                 Mantine theme: tokens/ (project values), components/ (Component.extend + CSS modules), fonts.ts
  styles/                tokens.css (--ds-* semantic tokens + tones), global.css
  sanity/                env, lib (client, live, image, queries, staticParams, token), schemaTypes, structure, presentation, types.ts (generated)
  lib/                   routes.ts (doc type → URL), metadata.ts, site.ts, forms/
  server/actions/        server actions (contact)
public/                  brand/, icons/, decor/, videos/
```

## Conventions

**Styling (the reusable core)**
- **One source per token.**
  - Raw scales (palettes, spacing, radius, font sizes, shadows) live in `src/theme/tokens/`.
  - Semantic and layout tokens (`--ds-*`) live in `src/styles/tokens.css`.
  - Breakpoints live only in `src/theme/breakpoints.json`, which the PostCSS config also reads.
- **Palettes are named by role:** `brand`, `accent`, `tint`, `ink`, `gray`. To start a new project, swap the values in `theme/tokens/` and `fonts.ts`; the rest carries over.
- **No raw hex values in CSS Modules.** Stylelint enforces this. Use `var(--ds-*)` and `var(--mantine-*)`, Mantine mixins (`@mixin smaller-than $mantine-breakpoint-sm`, `@mixin hover`), and `alpha()`.
- **Tones:** any element with `data-tone="light|subtle|dark|brand"` redefines the text, surface and border roles. Components adapt automatically, so never add per-color text utilities.
- **Mantine component defaults and variants are defined once** in `src/theme/components/`.
  - Button variants: `primary`, `secondary`, `inverse`, `translucent`, `link`.
  - Don't reuse Mantine's built-in variant names (`filled`, `outline`, `white`…). Those get inline variables that override ours.
- **Mantine CSS is loaded as `styles.layer.css`,** so unlayered module styles win without specificity fights.
- **Sections always use `<Section tone spacing container>`.** Never hand-roll section padding or gutters.
- **Font roles:** Borna is the text font (`theme.fontFamily`). Poppins is the display font, used for h1 and h2; h3–h6 use Borna.

**Components**
- Server components are the default. Use `'use client'` only on interactive leaf components.
- In server components, use named compound parts (`AccordionItem`, `TabsTab`), not dot notation (`Accordion.Item`).
- Prefer flexible, atomic, prop-driven components over near-duplicates. Cards from any source share one normalized shape (`documentCardFields` in `queries.ts`).

**Sanity**
- **Adding a section takes three steps:**
  1. A schema in `schemaTypes/sections/`, added to `contentSectionTypes`.
  2. A projection in `queries.ts` if it needs resolved references.
  3. A component registered in `components/sections/registry.ts`.

  Unregistered sections render a placeholder in dev.
- **Shared blocks** (such as CTA + FAQ) are `sharedSection` documents, pulled into pages by `sectionReference`.
- **Stega:** strings from `sanityFetch` are stega-branded. Run `stegaClean()` on any value compared against literals (tone, variant, layout). Metadata and sitemap queries pass `stega: false`.
- **Imports:** files reachable from `sanity.config.ts` use **relative imports**, because the Sanity CLI may not resolve `@/`.
- **URLs:** every URL comes from `src/lib/routes.ts` (`resolveHref`). The home page is the `page` with slug `home`; `/home` 308-redirects to `/`.

**Git**
- `main` is production and `dev` is active work. Work happens on `dev`. Once local checks pass, merge into `main` with `--no-ff`, push both branches, and sync `dev` back.
- Commit only when asked.
- Every commit message, PR title and branch name follows **[Conventional Commits](https://www.conventionalcommits.org/)**:
  - format: `type(scope): summary`
  - types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`
  - scopes such as `theme`, `sanity`, `app`, `assets`, `sections`
  - use `!` or a `BREAKING CHANGE:` footer for breaking changes

**Code style:** readable, industry-standard code, the way a senior developer would write it. Keep comments light.

## Docs (read on demand, not every session)

| File | Read when |
|---|---|
| `.claude/FOUNDATION-PLAN.md` | You need the reasoning behind setup decisions, or the full foundation checklist |
| `.claude/ARCHITECTURE.md` | Target architecture. The Mailchimp/Resend parts are future ideas, not current scope. |
| `docs/webflow-migration.md` | Building a section or page, importing content, or checking original Webflow behavior, copy, pricing, links, or known bugs |
| `.claude/MEMORY.md` | **Only** when troubleshooting or when explicitly asked. It holds detailed per-session notes, gotchas and open issues. |

`webflow/` is the original export. It is local only (gitignored) and is reference material; never import from it.

**At the end of every session:** add a changelog entry here and a detailed entry in `.claude/MEMORY.md`.

## Changelog

Most recent first. Two sentences max per entry. Keep the latest 10; details live in `.claude/MEMORY.md`.

- **2026-09-25:** Committed foundation pass steps 0–7 to `dev` (deps, configs, Mantine theme and `--ds-*` tokens, assets and fonts, Sanity schema/queries/typegen, routes, docs) and adopted Conventional Commits. Remaining: fix 4 stega-type errors, verify, then merge to `main`.
- **2026-09-25:** Planned the Webflow → Next.js migration and initialized the repo (`main` and `dev` pushed to GitHub).
