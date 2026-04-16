# PageForge — Architecture Decisions Log

> Record every significant decision here with reasoning.
> Format: Date | Decision | Why | Alternatives Considered

---

## 2026-04-09 — Initial Architecture Decisions

### D1: Standalone SaaS (not Shopify app)
**Decision:** Build as independent SaaS, not a Shopify app.
**Why:**
- Shopify apps are locked to Shopify ecosystem (1 platform only)
- Shopify takes 20% revenue share on app store
- Standalone has higher Flippa valuation (bigger addressable market)
- Can serve WooCommerce, WordPress, raw HTML users too
- White-label + agency model not possible as Shopify app
**Alternatives:** Shopify app (rejected — platform lock-in, revenue share)

### D2: Product Name — "PageForge"
**Decision:** Named the product PageForge.
**Why:** Professional, memorable, conveys building/crafting. Domain likely available. Works for global market.
**Alternatives:** BuildFlow, CraftPage, SnapBuild, BlockKit

### D3: Block-based editor (not full drag-and-drop)
**Decision:** Start with block-based editor (add/remove/reorder sections), upgrade to full drag-and-drop in Tier 2.
**Why:**
- Block-based is 3x faster to build than pixel-level drag-and-drop
- GrapesJS or Craft.js handles heavy lifting
- Users actually prefer structured blocks (Notion, Framer model)
- Full drag-and-drop leads to messy designs for non-designers
**Alternatives:** Full drag-and-drop from day 1 (rejected — too complex for MVP)

### D4: GrapesJS vs Craft.js for visual editor
**Decision:** TBD — evaluate both before Phase 2.
**Decision:** Custom editor with @dnd-kit/sortable + Zustand + react-contenteditable.
**Why:**
- Block-based model is a perfect fit for @dnd-kit sortable (reorder sections)
- Full control over React rendering — no fighting a 3rd party editor's paradigm
- GrapesJS is vanilla JS, poor Next.js/React integration
- Craft.js adds unnecessary abstraction for our block model
- @dnd-kit is lightweight (~12KB), accessible, and battle-tested
- Zustand for state = simpler undo/redo than Craft.js resolver
**Status:** DECIDED in Phase 2

### D5: Target niche — Digital Agencies
**Decision:** Primary target is digital agencies who build pages for clients.
**Why:**
- Agencies have higher willingness to pay ($39-99/mo per client)
- White-label is a must-have for agencies (upsell opportunity)
- Multi-workspace model enables per-client management
- Agency buyers on Flippa value white-label SaaS higher
**Alternatives:** Solo entrepreneurs only (too low ARPU), e-commerce only (too narrow)

### D6: Pricing at $19-99/mo (undercut competitors)
**Decision:** Price 50-70% below Unbounce/Instapage.
**Why:**
- Unbounce: $99/mo (users complaining about 415% price hike, 1.9/5 Trustpilot)
- Instapage: $99/mo (too expensive for SMBs)
- Sweet spot: $19 starter, $39 pro, $99 unlimited
- Carrd proves $9/yr works at scale — our $19/mo is premium but fair
**Alternatives:** Match competitor pricing at $99 (rejected — no brand recognition yet)

### D7: AI-native approach
**Decision:** Build AI features as core, not add-ons.
**Why:**
- Existing competitors bolt AI onto 8-12 year old platforms
- AI-native = faster page creation = key differentiator
- Claude API for content, OpenAI for images
- AI features add $2K+ to Flippa valuation
**Alternatives:** No AI (rejected — misses the biggest market trend)

### D8: Combined feature set from 3 Shopify apps
**Decision:** Combine best features from PageFly + GemPages + EComposer.
**Why:**
- PageFly: A/B testing (Bayesian), 130+ integrations, SEO audit
- GemPages: AI image-to-layout, sales funnels, headless ready
- EComposer: 30+ built-in extensions (worth $224/mo separately)
- No standalone tool has all three combined
**Alternatives:** Copy only one app (rejected — not differentiated enough)

---

### D9: Built-in heatmaps (replaces Hotjar $39/mo) [NEW]
**Decision:** Build heatmap + scroll tracking into PageForge instead of recommending Hotjar.
**Why:**
- Hotjar costs $39/mo — users don't want another subscription
- Heatmap data is simple (x%, y%, element, device) — lightweight to implement
- Supabase can handle the click/scroll event storage
- Massive selling point: "built-in heatmaps, no Hotjar needed"
**Alternatives:** Integrate Hotjar API (rejected — dependency on 3rd party, users still need Hotjar account)

### D10: Standalone popup builder (replaces OptinMonster $20-50/mo) [NEW]
**Decision:** Build a full popup editor, not just exit popup extension.
**Why:**
- OptinMonster charges $20-50/mo just for popups
- Popup builder is the #2 most requested feature in page builder reviews
- Reuses our existing block editor architecture — popup is just a mini page
- 4 trigger types: time delay, scroll %, exit intent, click
**Alternatives:** Just exit popup extension (rejected — too limited, missed value prop)

### D11: Smart personalization (replaces Unbounce Smart Traffic $99/mo) [NEW]
**Decision:** Build geo/device/UTM/returning visitor content rules.
**Why:**
- Unbounce charges $99/mo and their "Smart Traffic" is their biggest feature
- Personalization increases conversion by 20-40%
- Implementation is DB rules + conditional rendering — moderate complexity
- Massive differentiator at $39/mo vs $99/mo
**Alternatives:** Skip personalization (rejected — leaves money on table vs Unbounce)

### D12: Client collaboration mode [NEW]
**Decision:** Build shareable review links with comments + approval workflow.
**Why:**
- NO page builder has this (unique feature)
- Agencies currently use screenshots + email for client feedback
- Implementation: shareable link with no-auth access + comment storage
- Agencies will pay MORE for this single feature
**Alternatives:** Skip (rejected — this is the agency killer feature)

### D13: Multi-language pages [NEW]
**Decision:** Support same page in multiple languages with auto-detect.
**Why:**
- Non-English markets (LATAM, SEA, MENA) are underserved
- Most page builders are English-only
- Implementation: page_translations table with language-specific block overrides
- Opens up massive new market segments
**Alternatives:** Skip (rejected — too much market to leave underserved)

### D14: Embed anywhere [NEW]
**Decision:** Generate embeddable script/iframe code for any page.
**Why:**
- Proves platform-independence: "works on WordPress, Wix, raw HTML, anywhere"
- Simple implementation: JS script that injects rendered page
- Increases use cases beyond standalone pages
**Alternatives:** Only subdomain/custom domain publishing (rejected — limits reach)

### D15: Phase structure expanded from 10 to 12 [NEW]
**Decision:** Added Phase 6.5 (Heatmaps + Advanced Analytics) and Phase 7.5 (Multi-language + Embed + Integrations).
**Why:**
- Original Phase 6 was overloaded (extensions + analytics + SEO)
- New features (heatmaps, personalization, collaboration) needed dedicated phases
- Better task distribution = less context overload per phase
**Alternatives:** Stuff everything into existing phases (rejected — too large per phase)

---

### D16: Full product, not MVP [NEW]
**Decision:** Build a complete, production-ready product with all 345 features.
**Why:**
- User explicitly wants "real product, not MVP"
- Full product commands higher Flippa price ($8K-15K+ vs $5K)
- Complete product = more buyer confidence
- Session recording, co-editing, admin dashboard — these are what separate "real" from "demo"
- 345 features fully built > 156 features partially built
**Impact:** Timeline extends from 4-5 weeks to 6-8 weeks. Phases increased from 12 to 14.

### D17: Session recording added [NEW]
**Decision:** Build full session recording system (replaces Hotjar $39/mo).
**Why:**
- Heatmaps alone are good, but session recording is what agencies ACTUALLY pay Hotjar for
- Implementation: record mouse/click/scroll events as JSON, store in Supabase, build playback viewer
- Privacy: auto-mask form inputs
- Storage management: auto-delete per plan (30/90 days)
**Cost:** ~$5-10/mo extra Supabase storage

### D18: Real-time co-editing [NEW]
**Decision:** Build Figma-style collaborative editing.
**Why:**
- This is what separates a "real product" from a "page builder clone"
- Supabase Realtime handles WebSocket infrastructure
- Block-level locking prevents conflicts (simpler than CRDT)
- Cursor presence adds "wow factor"
**Complexity:** High — but Supabase Realtime makes it feasible

### D19: Admin dashboard for SaaS owner [NEW]
**Decision:** Build admin panel with user management, MRR tracking, feature flags.
**Why:**
- Real SaaS products have admin dashboards
- Flippa buyers NEED to see: users, revenue, growth
- Feature flags let buyer customize without code changes
- This alone adds $500-1000 to Flippa value

### D20: REST API + developer access [NEW]
**Decision:** Build public API with key management and auto-generated docs.
**Why:**
- Enterprise/agency buyers expect API access
- Enables headless use case (use PageForge as backend, custom frontend)
- API docs (OpenAPI/Swagger) adds professionalism
- Opens up developer community long-term

---

## Future Decisions (to be made during build)

- [x] D4: DECIDED — Custom editor with @dnd-kit (neither GrapesJS nor Craft.js)
- [ ] Custom domain implementation (CNAME wizard + SSL auto-provision approach)
- [ ] Published page hosting strategy (Vercel edge vs Supabase storage)
- [ ] AI provider fallback strategy (Claude primary, OpenAI fallback)
- [ ] White-label implementation (CSS theming vs full multi-tenant)
- [ ] Bangladesh payment gateway (SSLCommerz vs bKash direct)
- [ ] Heatmap data retention policy (30 days? 90 days? per plan?)
- [ ] Session recording storage limit per plan
- [ ] Real-time co-editing: Supabase Realtime vs Liveblocks vs Yjs
- [ ] Embed script: iframe vs JS injection approach
- [ ] Client comment notifications: email vs in-app vs both
- [ ] API rate limiting strategy per plan
- [ ] Funnel URL routing approach (subdirectory vs separate routes)
