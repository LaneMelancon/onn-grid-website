# Onn Grid Website

Marketing site for Onn Grid (web design agency, Colorado Springs), migrating from Webflow to **Next.js 16 (App Router) + Mantine 9 + Sanity 6 on Vercel**. Content is modeled as a Sanity section page builder; the React side renders sections through a single registry.

## Status

Foundation pass in progress (see `.claude/FOUNDATION-PLAN.md`). No pages are built yet.

## Docs (read on demand, not every session)

| File | Read when |
|---|---|
| `.claude/ARCHITECTURE.md` | Target architecture. Mailchimp/Resend sections are future ideas, not current scope. |
| `.claude/FOUNDATION-PLAN.md` | Details on setup decisions, structure, and the styling system. |
| `docs/webflow-migration.md` | Building a page/section, migrating content, or checking original Webflow behavior. |
| `.claude/MEMORY.md` | **Only** when troubleshooting or when explicitly asked. Detailed per-session log. |

`webflow/` is the original export, local only (gitignored). Use it as reference, never import from it.

## Changelog

Most recent first. Two sentences max per entry; keep the latest 10 and leave details to `.claude/MEMORY.md`.

- **2026-09-25** — Planned the Webflow → Next.js migration and initialized the repo (`main` + `dev`). Added the foundation plan, project docs, and memory log.
