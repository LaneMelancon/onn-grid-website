# Session Memory

A detailed log of each working session: what was done, decisions, gotchas, open issues and verification results. Newest entries come first.

Only read this when troubleshooting or when asked. `CLAUDE.md` carries the short changelog.

---

## 2026-09-25: Planning and foundation pass (steps 0–7)

### Where things stand
- **`main`:** holds only the initial commit (`.gitignore`, README, CLAUDE.md, `.claude/` docs).
- **`dev`:** the foundation work is committed and pushed in six Conventional Commits:
  - `chore` (tooling)
  - `feat(theme)`
  - `feat(assets)`
  - `feat(sanity)`
  - `feat(app)`
  - `docs`
- **The user stopped the session before verification.** That means no lint, build or dev-server run yet.
- **Conventional Commits** are now required for every commit, PR title and branch name.

### Open issues (start here next session)

**1. Four TypeScript errors (TS2322), all with the same cause.**
- Where: `SectionRenderer` usages in
  - `app/(site)/(chrome)/[[...slug]]/page.tsx:53`
  - `work/[slug]/page.tsx:45`
  - `service-areas/[slug]/page.tsx:49`
  - `bio-links/page.tsx:27`
- Cause: next-sanity 13 types `sanityFetch` results as `StegaBranded<T>`, so strings become `StegaString<'banner'>`. In `@sanity/client/stega` that is defined as `` `${T} (may contain hidden stega characters)` & {...} ``, which can't be assigned to the literal unions that `SectionData` is built from.
- Fix:
  - In `src/components/sections/types.ts`, build `SectionData` from `StegaBranded<NonNullable<PAGE_QUERY_RESULT>>`. Import the type with `import type { StegaBranded } from 'next-sanity'`.
  - Let `Section` and `SectionHeader` accept branded strings for `tone`, `spacing` and `align`. For example, type them as `string | null` and narrow after `stegaClean()` with a small type guard such as `isSectionTone`.
  - This keeps the type system forcing `stegaClean` before literal comparisons, which is what we want.

**2. `SANITY_API_READ_TOKEN` is empty in `.env.local`.**
- `src/sanity/lib/token.ts` throws at import, so every route that uses `sanityFetch` fails, and so does `next build`.
- **At the end of the session the file still had an empty token.** The user said they'd added it, but the file on disk hadn't changed, so their edit probably wasn't saved. Check the value's length next session (don't print it).
- The user created an API token in sanity.io/manage and handled the setup there instead of through a CLI login. They reported the CORS origin as done.
  1. Put a Viewer token in `.env.local`. `defineLive` sends `browserToken` to the client in draft mode, so it must be Viewer only.
  2. Add the CORS origin `http://localhost:3000` with credentials.
  3. Confirm the `production` dataset exists.
- `! npx sanity login` fails in unattended mode unless you pass `--provider github|google|sanity`. Login isn't needed for `typegen` or `schema extract`.

**3. Not run yet:** `npm run lint`, `npm run lint:css`, `npm run build`, and the dev smoke test (`/studio`, `/style-guide`, `/` should show the styled 404, plus a test page in Studio). Expect some first-run lint and stylelint findings.

**4. Not done yet from the plan:**
- Carousel theme extension (`src/theme/components/Carousel.ts`), which can wait for the build phase.
- The commits, and the merge of `dev` into `main`.

### What was built
- **Git:** `git init -b main`, remote `origin` → `github.com/LaneMelancon/onn-grid-website` (it was empty), initial commit pushed, `dev` branch created and pushed.
- **Dependencies:**
  - Installed: next 16.3.6, react 19.3, @mantine/core/hooks/carousel 9.6.2, embla 8.6, sanity 6.16, next-sanity 13.3.4, @sanity/client 8.7, @sanity/image-url 2.1, @sanity/vision, @sanity/icons 5.2 (added explicitly), styled-components, @vercel/analytics and speed-insights, @next/third-parties, zod 4, clsx, server-only, motion, lottie-react.
  - Dev: typescript ~6.0.3, eslint ^9, eslint-config-next, eslint-config-prettier, prettier, stylelint + config-standard, postcss, postcss-preset-mantine, postcss-simple-vars.
- **Config files:** `tsconfig.json` (excludes `webflow`), `next.config.ts` (typedRoutes, Sanity CDN images, optimizePackageImports), `eslint.config.mjs`, `.prettierrc`, `.prettierignore`, `.stylelintrc.json`, `postcss.config.mjs` (reads `src/theme/breakpoints.json`), `.env.example`, `.env.local`, `.nvmrc`.
- **Theme** (`src/theme/`):
  - `tokens/colors.ts`: palettes `brand`, `accent`, `tint`, `ink`, `gray`; black is ink[9].
  - `tokens/typography.ts`: clamp heading sizes (from 480px to 1440px), fontSizes xs–xxl, lineHeights (md 1.7), fontWeights regular/medium/semibold/bold.
  - `tokens/layout.ts`: spacing xxs–xxl, radius including `pill`, shadows, `containerSizes`.
  - `mantine.d.ts`: type augmentation.
  - `fonts.ts`: Poppins `--ds-font-display`; Borna local `--ds-font-text`.
  - `components/`: extensions for Button, Container, Title, Input/InputWrapper/Textarea, Accordion and Tabs, each with a CSS module.
- **Styles:**
  - `tokens.css`: layout, measure, tracking, motion, z-index, brand roles, card roles, and tone scopes that also remap `--mantine-color-text`, `dimmed` and `default-border`.
  - `global.css`: `[data-tone]` background and color, link reset, selection, reduced motion.
- **Assets:** see `docs/webflow-migration.md` §11. The fonts were converted with `npx ttf2woff2`, which reads stdin (`< in.ttf > out.woff2`).
- **Sanity:**
  - `sanity.config.ts`: structure tool with singletons, Presentation (`src/sanity/presentation.ts`) and Vision. Singletons are hidden from "new document" and limited to publish, discard and restore.
  - `sanity.cli.ts`: includes the typegen config.
  - The schema has 47 files and 65 types. `sanity schema validate` reports 0 errors and 0 warnings.
  - `queries.ts` uses shared fragments. Typegen generates 10 query result types into `src/sanity/types.ts`.
- **App:**
  - Root layout, the `(site)` and `(chrome)` layouts, the catch-all page builder route, `bio-links`, 4 collection routes (temporary headers), a dev-only `/style-guide`, not-found, sitemap, robots (disallows everything outside Vercel production), Studio, and draft-mode enable/disable.
  - Components: the `Section`, `SectionHeader` and `Eyebrow` atoms; `SectionRenderer`, `registry` (empty), `types` and `SectionPlaceholder`; `SiteHeader` and `SiteFooter` placeholders; `SkipLink`.
  - `lib/forms/contact.ts` holds the zod schema, the honeypot name `website`, and the state types. `server/actions/contact.ts` checks the honeypot, then validates. Delivery is a TODO.
- **Docs:** `.claude/FOUNDATION-PLAN.md`, `CLAUDE.md` and `docs/webflow-migration.md` (the full inventory).

### Changes from the approved plan
- **Home page:** it's the `page` whose slug is `home` (`HOME_SLUG`), not a `siteSettings.homePage` reference. `/home` 308-redirects to `/`.
- **No per-section stub files.** The registry starts empty, and `SectionRenderer` shows a dev-only placeholder for any unregistered type.
- **Token names:**
  - The prefix is `--ds-*` instead of `--og-*`, because the user wants it reusable across projects.
  - Palettes are named by role.
  - Button variants were renamed so they don't collide with Mantine's built-in names.
- **Section type names** all end in `Section` (e.g. `heroSection`), to avoid clashing with object and document names like `media` and `faq`.
- **Card data:** cards from any source share one normalized shape through the `documentCardFields` GROQ fragment.
- **Standalone pages:** `STANDALONE_PAGE_SLUGS` / `BIO_LINKS_SLUG` in `routes.ts`, so the catch-all doesn't pre-render `/bio-links`.

### Gotchas learned
- **npm, `@vercel/analytics` peer conflict.** Installing it together with everything else fails with ERESOLVE over its optional `@remix-run/react` peer. Installing it on its own works.
- **npm audit** reports 15 vulnerabilities, all transitive in the Sanity CLI tooling (adm-zip, js-yaml, smol-toml, uuid). They were left alone, because `--force` would pull in breaking changes.
- **`create-next-app` refuses a folder that isn't empty,** so the config files were written by hand.
- **Mantine 9:**
  - For an unknown variant name, `defaultVariantColorsResolver` returns `{}`. That's why custom variants can set `--button-*` variables at class level.
  - Built-in variant names get inline variables that win over class-level ones.
  - Title and Text inherit color.
  - The default `fontWeights` are regular 400, medium 600 and bold 700; ours overrides medium to 500 and adds semibold.
  - Container sizes are set through `vars` in `Container.extend`.
  - `rem()` passes `clamp()` strings through unchanged.
- **Typegen:**
  - `sanity schema extract` needs `--force` to overwrite `schema.json` (already in the script).
  - Typegen resolves template-literal query fragments.
  - The conditional `sectionReference` projection resolves to the content section union plus `{}`.
- **The Sanity CLI isn't logged in on this machine** (`projects list` fails).
