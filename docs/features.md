# PageForge — Feature Checklist (FULL PRODUCT — NOT MVP)

> This is a REAL production product, not an MVP.
> Every feature below will be fully built, tested, and polished.
> Sources: PageFly + GemPages + EComposer + Unbounce + ClickFunnels + Hotjar + OptinMonster + original features.
> PageForge replaces $500+/mo in separate tools for $39/mo.

---

## Phase 0-1: Foundation

### Project Scaffold ✅
- [x] Next.js 14 project initialized (App Router)
- [x] Tailwind CSS + shadcn/ui configured
- [x] Supabase client + server setup
- [x] TypeScript strict mode
- [x] Environment variables configured
- [x] Full folder structure created
- [x] Framer Motion configured
- [x] Sentry error monitoring setup
- [x] PostHog analytics setup

### Database (26 tables) ✅
- [x] All 26 Supabase tables created with proper relations
- [x] RLS policies on every table
- [x] Generated TypeScript database types
- [x] Seed data (block_types, templates, popup_templates, funnel_templates)
- [x] Database indexes for performance
- [x] Supabase Realtime enabled on required tables

### Auth (complete system) ✅
- [x] Email + password signup/login
- [x] Google OAuth
- [x] Magic link login
- [x] Forgot password flow
- [x] Email verification
- [x] Auth middleware (protect dashboard routes)
- [x] Session management
- [x] Account deletion (GDPR compliance)

---

## Phase 2-3: Visual Editor (Core Product)

### Editor — Main Canvas ✅
- [x] Drag-and-drop block-based editor (@dnd-kit)
- [x] Add / remove / reorder blocks (drag handle)
- [x] Edit text inline (contentEditable on canvas)
- [x] Edit colors inline (color picker in sidebar)
- [ ] Edit images inline (click to replace)
- [x] Live preview (desktop / tablet / mobile)
- [x] Undo / redo (unlimited, keyboard shortcuts)
- [x] Page structure navigator (tree view sidebar)
- [x] Custom CSS per page
- [x] Custom JavaScript per page
- [x] Global styles (primary color, font family, border radius, spacing scale)
- [x] Auto-save every 30 seconds
- [x] Keyboard shortcuts (Ctrl+Z, Ctrl+S, Ctrl+D, Delete, Escape)
- [ ] Right-click context menu (duplicate, delete, move up/down, copy style)
- [x] Zoom in/out on canvas
- [ ] Ruler/grid guides for alignment

### Editor — Advanced Controls ✅
- [x] Copy/paste blocks between pages (Ctrl+C/V, clipboard store)
- [x] Block presets (16 pre-styled variants per block type)
- [x] Responsive editing (desktop/tablet/mobile toggle)
- [x] Hide/show elements per device (Switch toggles)
- [x] Custom fonts (Google Fonts selector — 16 fonts)
- [x] Animation builder (5 entrance + 3 hover effects)
- [x] Opacity + blur + shadow controls
- [x] Link editor (URL, anchor, phone, email + target)
- [x] Right-click context menu (duplicate, copy, paste, move, delete)
- [ ] Element-level drag-and-drop (within blocks)
- [ ] Spacing controls (visual margin/padding drag handles)
- [ ] Global blocks (edit once, update everywhere)
- [ ] Publish scheduling
- [ ] Image editor (crop, resize, filters)
- [ ] Color gradient builder

### Block Library (20 blocks) ✅
- [x] Hero block
- [x] Features block
- [x] Testimonials block
- [x] CTA block
- [x] Pricing block
- [x] FAQ block
- [x] Form block
- [x] Gallery block
- [x] Video block
- [x] Countdown block
- [x] Social proof block
- [x] Custom HTML block
- [x] Header/Navigation block
- [x] Footer block
- [x] Team block
- [x] Stats/Counter block
- [x] Logo carousel block
- [x] Comparison table block
- [x] Tabs block
- [x] Accordion block

### Templates (50+ total) ✅
- [x] 50 page templates seeded in SQL (15 landing, 10 product, 5 coming soon, 5 portfolio, 5 event, 5 local, 5 blank)
- [x] Template browser with category filter + search + live preview
- [x] One-click template apply
- [x] "Start from blank" option
- [ ] Template favoriting

### Page Management
- [ ] Create / edit / delete pages
- [ ] Duplicate page (with all blocks + settings)
- [ ] Draft / published / archived status
- [ ] Publish to subdomain (app.pageforge.io/p/slug)
- [ ] Page list with search + filters + sort
- [ ] Grid view + list view toggle
- [ ] Version history (rollback to any previous save)
- [ ] Password protected pages
- [ ] Page thumbnails (auto-generated screenshot)
- [ ] Bulk operations (publish/unpublish/delete multiple)
- [ ] Page import/export (JSON)
- [ ] Page duplication across workspaces

---

## Phase 4: Billing & Plans

### Stripe Integration (complete)
- [ ] Free plan with limits
- [ ] Stripe checkout for paid plans
- [ ] Customer portal (manage/cancel subscription)
- [ ] Webhook handler (all subscription events)
- [ ] Plan sync to profiles table
- [ ] Feature gating by plan (middleware-level)
- [ ] Usage tracking (pages, AI credits, popups, team members)
- [ ] Usage dashboard (show limits + current usage)
- [ ] Billing settings page
- [ ] Invoice history
- [ ] Upgrade/downgrade prompts in UI
- [ ] Trial period support (14-day Pro trial)
- [ ] Coupon/promo code support
- [ ] Annual billing discount (save 17%)

---

## Phase 5: AI Features (Full Suite)

### AI Page Generator
- [ ] Prompt to full page (describe what you want, AI builds it)
- [ ] Industry-specific generation (SaaS, agency, restaurant, etc.)
- [ ] Tone selection (professional, playful, bold, minimal)
- [ ] AI suggests improvements to existing pages

### AI Copy Writer
- [ ] Headline generator (multiple variants)
- [ ] Description/body text generator
- [ ] CTA text suggestions
- [ ] Full section copy generation
- [ ] Rewrite/improve existing copy
- [ ] Tone adjustment (formal, casual, urgent, friendly)
- [ ] Multi-language copy generation

### AI Image-to-Layout (GemPages exclusive feature)
- [ ] Upload screenshot/mockup, AI converts to editable page
- [ ] Supports website screenshots, Figma exports, hand-drawn sketches
- [ ] Block detection + auto-mapping to PageForge blocks

### AI Image Generator
- [ ] Text-to-image generation (OpenAI DALL-E / Stable Diffusion)
- [ ] Background removal
- [ ] Image upscaling
- [ ] Style presets (photo-realistic, illustration, minimal, etc.)

### AI System
- [ ] AI credit tracking per plan
- [ ] AI usage dashboard
- [ ] Rate limiting per plan tier
- [ ] AI settings page
- [ ] Model selection (Claude / OpenAI toggle)

---

## Phase 6: Extensions + Popup Builder

### Conversion Extensions (12 built-in)
- [ ] Sticky CTA bar (stays visible on scroll)
- [ ] Exit popup (exit intent trigger)
- [ ] Sales notifications ("John from NYC just signed up" — social proof)
- [ ] Countdown timer (fixed date)
- [ ] Evergreen countdown (per-visitor, resets for each person)
- [ ] Spin wheel (gamification — win discount/offer)
- [ ] Announcement bar (top banner with dismiss)
- [ ] Cookie bar (GDPR compliance)
- [ ] Age verification gate
- [ ] Back to top button
- [ ] Floating CTA button (WhatsApp, call, chat)
- [ ] Progress bar (scroll progress indicator)
- [ ] Extension toggle per page (enable/disable each)
- [ ] Extension settings (customize colors, text, timing)

### Popup Builder (full editor — replaces OptinMonster $20-50/mo)
- [ ] Standalone popup editor (reuses block editor architecture)
- [ ] Newsletter popup
- [ ] Promo/discount popup
- [ ] Survey/feedback popup
- [ ] Video popup
- [ ] Full-screen popup
- [ ] Slide-in popup
- [ ] Trigger types: time delay, scroll %, exit intent, click, page load
- [ ] Popup frequency control (show once, once per session, every X days)
- [ ] Popup templates (10+ pre-built)
- [ ] Popup A/B testing
- [ ] Popup analytics (impressions, closes, conversions, conversion rate)
- [ ] Mobile-specific popup settings
- [ ] Popup scheduling (start/end date)

### Lead Management (full CRM-lite)
- [ ] Form submissions dashboard (sortable, filterable)
- [ ] Export leads as CSV
- [ ] Export leads as JSON
- [ ] Email notification on new lead
- [ ] Webhook on form submit (Zapier-ready)
- [ ] Email auto-responder (customizable template per form)
- [ ] Lead tagging (hot, warm, cold)
- [ ] Lead notes
- [ ] Lead source tracking (which page, which campaign)
- [ ] Bulk actions (delete, export, tag)

---

## Phase 6.5: Analytics + Heatmaps + SEO

### Analytics Dashboard (replaces Google Analytics basic)
- [ ] Page views tracking
- [ ] Unique visitors (cookie-based visitor ID)
- [ ] Bounce rate
- [ ] Average time on page
- [ ] Form submission count + rate
- [ ] Click tracking (which elements get clicked most)
- [ ] Analytics dashboard with interactive charts (Recharts)
- [ ] Date range picker (7d, 30d, 90d, custom)
- [ ] Compare periods (this week vs last week)
- [ ] Export analytics as CSV/PDF
- [ ] Per-page analytics breakdown

### Heatmaps (replaces Hotjar $39/mo)
- [ ] Click heatmap (visual overlay of where visitors click)
- [ ] Heatmap tracking script (lightweight, injected in published pages)
- [ ] Heatmap data collection API
- [ ] HeatmapOverlay component (color-coded click density)
- [ ] Device filter (desktop / tablet / mobile heatmaps)
- [ ] Date range filter for heatmap data
- [ ] Heatmap screenshot export

### Scroll Depth Tracking
- [ ] Scroll tracking script (injected in published pages)
- [ ] ScrollDepthChart component (bar chart showing drop-off)
- [ ] Average scroll depth per page
- [ ] Scroll depth by device type

### Session Recording (replaces Hotjar session recording)
- [ ] Record visitor sessions (mouse movement + clicks + scrolls)
- [ ] Session playback viewer
- [ ] Session list with filters (duration, pages visited, device)
- [ ] Session tagging (converted, bounced, error)
- [ ] Privacy: auto-mask form inputs + sensitive data
- [ ] Storage management (auto-delete after 30/90 days per plan)

### Real-time Dashboard
- [ ] Live visitor count (Supabase Realtime)
- [ ] Live conversions (form submits in last 5 min)
- [ ] Active pages right now
- [ ] Live geographic map (where visitors are from)
- [ ] Auto-refresh every 10 seconds

### SEO Tools
- [ ] Meta title + description editor (with character count)
- [ ] OG image upload + preview
- [ ] SEO audit tool (missing meta, alt tags, heading hierarchy, broken links)
- [ ] SEO score (0-100 with recommendations)
- [ ] Page speed score (Lighthouse-like, real-time in editor)
- [ ] Accessibility checker (WCAG AA — contrast, alt text, labels, focus)
- [ ] Structured data / Schema.org support (JSON-LD)
- [ ] Sitemap.xml auto-generation
- [ ] Robots.txt configuration
- [ ] Auto lazy loading for images
- [ ] Clean semantic HTML output
- [ ] Canonical URL support

---

## Phase 7: Funnels + Personalization + Collaboration + A/B Testing

### A/B Testing (Bayesian — from PageFly)
- [ ] Create page variants (A/B/C/D — up to 4)
- [ ] Traffic split control (manual or auto-optimize)
- [ ] Conversion tracking per variant
- [ ] Bayesian statistical methodology
- [ ] Statistical significance indicator
- [ ] Winner auto-detection + auto-apply
- [ ] A/B test history/archive
- [ ] A/B test for popups too (not just pages)

### Sales Funnel Builder (from GemPages + ClickFunnels)
- [ ] Multi-step funnel creation (visual flow editor)
- [ ] Funnel step types: landing, opt-in, sales, upsell, downsell, thank you
- [ ] Post-purchase upsell pages
- [ ] Funnel analytics (drop-off per step — visual chart)
- [ ] Conversion funnel visualization (Sankey diagram)
- [ ] Funnel templates (5-8 pre-built: lead gen, webinar, product launch, tripwire)
- [ ] Funnel URL paths (yourapp.com/f/funnel-name/step-1)
- [ ] Funnel A/B testing (test entire funnels, not just pages)

### Smart Personalization (replaces Unbounce Smart Traffic $99/mo)
- [ ] Geo-targeting (show different content by country/city/region)
- [ ] Device-specific content (mobile vs desktop vs tablet)
- [ ] UTM-based content (different content per traffic source)
- [ ] Returning visitor content (first visit vs return visit)
- [ ] Time-based content (morning/afternoon/evening offers)
- [ ] Referrer-based content (from Google vs Facebook vs direct)
- [ ] Personalization rules editor (visual if/then builder)
- [ ] Personalization preview (preview page as different visitor types)
- [ ] Personalization analytics (which rules convert best)

### Client Collaboration (unique to PageForge)
- [ ] Shareable review link (no auth needed for client)
- [ ] Client comment mode (click on any section, leave comment)
- [ ] Comment bubbles (visual markers on page)
- [ ] Comment threads (reply to comments)
- [ ] Comment status (open / resolved)
- [ ] Approval workflow (client clicks Approve / Request Changes)
- [ ] Email notification to owner on new comment/approval
- [ ] Comments inbox in dashboard
- [ ] Activity log (who changed what, when — full audit trail)
- [ ] Client-branded review page (show agency logo, not PageForge)

### Real-time Co-editing (Figma-style)
- [ ] Multiple users edit same page simultaneously
- [ ] Cursor presence (see other editors' cursors + names)
- [ ] Block-level locking (if someone edits a block, others see "editing...")
- [ ] Change sync via Supabase Realtime / WebSocket
- [ ] Conflict resolution (last write wins with notification)

---

## Phase 7.5: Multi-language + Embed + Integrations

### Multi-language Pages
- [ ] Same page in multiple languages
- [ ] Translation editor (side-by-side original + translated)
- [ ] Auto-detect visitor language (browser language header)
- [ ] Language switcher block (dropdown/flags)
- [ ] RTL support (Arabic, Hebrew, Urdu)
- [ ] Language-specific SEO meta tags
- [ ] AI-assisted translation (Claude API)

### Embed & Distribution
- [ ] Embed anywhere — copy-paste embed code (JS snippet)
- [ ] Iframe embed option
- [ ] WordPress shortcode / plugin guide
- [ ] Custom domain support (CNAME setup wizard)
- [ ] SSL auto-provisioning for custom domains
- [ ] White-label (remove PageForge branding, add custom logo + colors)
- [ ] Custom favicon per page/workspace
- [ ] Open Graph + Twitter Card auto-generation

### Team & Workspace (full agency system)
- [ ] Create multiple workspaces (per client)
- [ ] Invite team members by email
- [ ] Role-based access: Owner, Admin, Editor, Viewer
- [ ] Per-workspace billing (agency can bill per client)
- [ ] Workspace switching in sidebar
- [ ] Team activity feed
- [ ] Team member management (add/remove/change role)

### Integrations & Automation
- [ ] Zapier native integration (triggers + actions)
- [ ] Make.com native integration
- [ ] Slack alerts (new lead, new comment, page published)
- [ ] Discord alerts (same as Slack)
- [ ] Email alerts (configurable per event type)
- [ ] Google Analytics 4 embed
- [ ] Google Tag Manager embed
- [ ] Facebook Pixel embed
- [ ] TikTok Pixel embed
- [ ] Custom tracking scripts (head/body injection)
- [ ] Mailchimp integration (sync leads)
- [ ] Klaviyo integration (sync leads)
- [ ] HubSpot integration (sync leads)
- [ ] Webhook builder (visual — choose event, set URL, set payload)
- [ ] Integration marketplace page (show all available integrations)
- [ ] API access (REST API for developers to manage pages programmatically)
- [ ] API key management (generate/revoke API keys)
- [ ] API documentation (auto-generated Swagger/OpenAPI)

---

## Phase 8: Landing Page + Onboarding + Polish

### Marketing Site (landing page)
- [ ] Hero section with live demo / video
- [ ] "Replaces $500+/mo in tools" value proposition section
- [ ] Features showcase (with animations)
- [ ] Pricing page (interactive toggle monthly/yearly)
- [ ] Template gallery (public, browsable)
- [ ] Testimonials / social proof section
- [ ] Competitor comparison table
- [ ] FAQ section
- [ ] CTA sections (multiple throughout page)
- [ ] Footer with links
- [ ] Mobile responsive (obviously)

### Onboarding (guided experience)
- [ ] Welcome wizard (4 steps: profile, niche, template, first page)
- [ ] Choose template or start blank
- [ ] Guided first page creation (tooltips + highlights)
- [ ] Connect domain prompt (optional)
- [ ] Welcome email (Resend)
- [ ] Day 1 email: "Getting started tips"
- [ ] Day 3 email: "Have you tried AI page generation?"
- [ ] Day 7 email: "Upgrade to unlock all features"
- [ ] In-app notifications/tips for new features
- [ ] Empty state designs for every list/dashboard

### Performance & Security (production-grade)
- [ ] Image compression (auto on upload — Sharp/Tinify)
- [ ] CSS/JS minification on published pages
- [ ] CDN delivery for published pages (Vercel Edge)
- [ ] Rate limiting on all API routes
- [ ] Input sanitization (XSS prevention — DOMPurify)
- [ ] CSRF protection
- [ ] Content Security Policy headers
- [ ] Error boundaries on every page/component
- [ ] Loading skeletons on every async UI
- [ ] Optimistic UI updates where possible
- [ ] Database query optimization (indexes, no N+1)
- [ ] Bundle size optimization (dynamic imports, tree shaking)
- [ ] Lighthouse score: 90+ desktop, 80+ mobile
- [ ] Uptime monitoring (Uptime Robot)
- [ ] Error tracking (Sentry — auto-capture)
- [ ] Backup strategy (Supabase auto-backups)

### Admin Dashboard (for you — the SaaS owner)
- [ ] Total users count + growth chart
- [ ] Total pages created
- [ ] MRR dashboard (revenue tracking)
- [ ] Plan distribution (how many users per plan)
- [ ] User list with search + filter
- [ ] User detail view (pages, plan, usage)
- [ ] Feature flag system (toggle features remotely)
- [ ] Announcement system (in-app banners)
- [ ] System health dashboard

---

## Feature Count Summary
| Category | Features | Status |
|----------|----------|--------|
| Foundation (scaffold, DB, auth) | ~25 | Not started |
| Visual Editor (core product) | ~65 | Not started |
| Billing & Plans | ~14 | Not started |
| AI Features | ~22 | Not started |
| Extensions + Popup Builder | ~35 | Not started |
| Analytics + Heatmaps + SEO | ~45 | Not started |
| Funnels + Personalization + Collab | ~55 | Not started |
| Multi-language + Embed + Integrations | ~40 | Not started |
| Landing Page + Onboarding + Polish | ~35 | Not started |
| Admin Dashboard | ~9 | Not started |
| **TOTAL** | **~345 features** | **0% complete** |

---

## Tools Replaced by PageForge
| Tool | Monthly Cost | What PageForge Replaces |
|------|-------------|----------------------|
| Unbounce | $99/mo | Page builder + A/B testing + Smart Traffic |
| Hotjar | $39/mo | Heatmaps + scroll tracking + session recording |
| OptinMonster | $20-50/mo | Popup builder |
| Mailchimp (basic) | $13/mo | Email auto-responder |
| ClickFunnels | $97/mo | Funnel builder |
| FOMO | $19/mo | Social proof notifications |
| Deadline Funnel | $49/mo | Evergreen countdown |
| Weglot | $15/mo | Multi-language pages |
| HubSpot (basic) | $20/mo | Lead management CRM-lite |
| Google Optimize (sunset) | Was free | A/B testing |
| Figma (collab features) | $15/mo | Client review + comments |
| FullStory | $39/mo | Session recording |
| EComposer extensions | $39/mo | 12+ built-in extensions |
| **Total replaced** | **$500+/mo** | **PageForge: $39/mo** |
