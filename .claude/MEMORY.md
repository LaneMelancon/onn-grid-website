# Session Memory

Detailed log of each working session: what was done, decisions made, gotchas, and verification results. Newest first. Only read this when troubleshooting or when asked; `CLAUDE.md` carries the short changelog.

---

## 2026-09-25 — Planning and foundation setup

**Planning**
- Explored the Webflow export (17 pages, 5 CMS collections, 1 form, ~30 IX2/jQuery behaviors). Findings are in `docs/webflow-migration.md`.
- Decisions: npm (project-scoped installs), existing Sanity project `im529abe`, section page builder, fixed 16px root with `clamp()` scale, `--ds-*` token prefix with role-named palettes for cross-project reuse, `webflow/` local only, CMS import script deferred to the build phase, `main`/`dev` branching with merge after local checks, Vercel last.
- Version pins: `typescript@~6.0.3` (typescript-eslint needs <6.1; TS 7 has no JS API), `eslint@^9` (react/import plugins don't support ESLint 10).
