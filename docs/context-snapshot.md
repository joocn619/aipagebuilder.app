# Context Snapshot — PageForge (FULL PRODUCT)
Last updated: Phase 3 COMPLETE (2026-04-09)

## What This Is
AI-powered standalone page builder SaaS — FULL PRODUCTION PRODUCT. Combines PageFly + GemPages + EComposer + Hotjar + OptinMonster + ClickFunnels + unique features (client collab, co-editing, personalization, session recording). Replaces $500+/mo for $39/mo.

## Build State
Progress: 9/14 phases complete (64%)
Last done: Phase 6.5 — Heatmaps + Session Recording + Analytics + SEO (COMPLETE)
Next: Phase 7 — A/B Testing + Funnels + Personalization

## Stats
- Features: 345
- DB Tables: 26
- Phases: 14
- Templates: 50+
- Blocks: 20
- Extensions: 12
- AI features: 5 (page gen, copy, image-to-layout, image gen, improvements)
- Integrations: 15+

## DB Tables (26 total)
Core 8: profiles, workspaces, pages, block_types, form_submissions, page_events, ab_tests, templates
New 18: popups, page_versions, comments, page_approvals, personalization_rules, heatmap_clicks, scroll_events, funnels, funnel_events, auto_responders, page_translations, activity_log, session_recordings, workspace_members, api_keys, integrations

## Key Decisions
- FULL PRODUCT, not MVP — every feature fully built and polished
- Standalone SaaS (not Shopify app)
- Block-based editor (GrapesJS vs Craft.js TBD in Phase 2)
- Target: digital agencies
- Pricing: $0/19/39/99
- AI-native: Claude + OpenAI
- Replaces $500+/mo in tools

## Stack
Next.js 14 + TypeScript + Tailwind + shadcn/ui + Framer Motion + Supabase + Stripe + Claude API + OpenAI + Resend + Sentry + PostHog

## Complexity
Score: 8/8 — 14 phases, estimated 6-8 weeks for full product

---

## Resume Prompt
```
RESUME: Read docs/context-snapshot.md and docs/project-track.md only.
Do NOT read any other file unless I ask.
Confirm: "PageForge — FULL PRODUCT build. Phase 6.5 DONE, 9/14 complete (64%).
345 features, 26 DB tables, 14 phases.
Next: Phase 7 — A/B Testing + Funnels + Personalization."
Then wait for my next instruction.
```
