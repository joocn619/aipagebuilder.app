# PageForge

## One-Liner
PageForge helps digital agencies and entrepreneurs build high-converting landing pages with AI — without writing a single line of code.

## What It Does
PageForge is a standalone AI-powered page builder SaaS — a FULL PRODUCTION PRODUCT (not MVP). Combines the best of PageFly (A/B testing), GemPages (AI image-to-layout, funnels), EComposer (30+ extensions), Hotjar (heatmaps, session recording), OptinMonster (popup builder), ClickFunnels (sales funnels), and adds unique features no competitor has: client collaboration, smart personalization, real-time co-editing, and multi-language. Replaces $500+/mo in separate tools for $39/mo. Platform-independent — works everywhere.

## Target User
- Who: Digital agencies, freelance marketers, small business owners, solo entrepreneurs
- Pain: Existing tools are too expensive ($99+/mo), locked to one platform, or bolt AI onto legacy editors
- Why they pay: Build professional pages 10x faster with AI, boost conversions with built-in CRO tools, no dev needed

## Niche Type
builder (AI-native page builder with conversion tools)

## Competitor Map
| Competitor | Revenue | Weakness | Our Advantage |
|-----------|---------|----------|--------------|
| Unbounce | $42-51M/yr | $99/mo, 1.9/5 Trustpilot, 415% price hike | $29/mo, AI-native |
| Instapage | $25-50M/yr | $99/mo, acquired by airSlate | Independent, affordable |
| Leadpages | $5.4-7.5M/yr | Pivoting away from builders | Focused on page building |
| Swipe Pages | $2.1M/yr | Limited AI, small team | Full AI suite |
| Carrd | $2M/yr, 4 people | Very simple, no CRO tools | Advanced + simple |
| PageFly | Shopify-only | Locked to Shopify ecosystem | Platform-independent |
| GemPages | Shopify-only | Locked to Shopify ecosystem | Platform-independent |
| EComposer | Shopify-only | Locked to Shopify ecosystem | Platform-independent |

## Market Data
- Market Size: $725M (2025), $820M (2026), $2.5-2.8B by 2033
- Growth Rate: 14.6-15.8% CAGR
- 68% of marketing teams use page builders
- 282+ platforms exist in this space

## Tech Stack
| Layer | Tech |
|-------|------|
| Frontend | Next.js 14 (App Router) + TypeScript + Tailwind CSS |
| UI Components | shadcn/ui + Framer Motion |
| Visual Editor | GrapesJS (open-source) or Craft.js |
| Database | Supabase (PostgreSQL + RLS + Realtime) |
| Auth | Supabase Auth (Email + Google OAuth + Magic Link) |
| Payments | Stripe (Global) + SSLCommerz/bKash (BD) |
| AI | Claude API (primary) + OpenAI (fallback) |
| Email | Resend + React Email |
| Deploy | Vercel (frontend) + Supabase (DB) |
| Analytics | PostHog (product) + Vercel Analytics (perf) |
| Monitoring | Sentry (errors) + Uptime Robot (uptime) |
| Storage | Supabase Storage (files/images) |
| Queue | Supabase pg_cron or Inngest (background jobs) |

## Revenue Model
| Plan | Price | Limits |
|------|-------|--------|
| Free | $0/mo | 1 published page, basic elements, 5 AI generations, basic analytics |
| Starter | $19/mo | 15 pages, AI content gen, 10 extensions, heatmaps, popup builder |
| Pro | $39/mo | 50 pages, all AI, all extensions, A/B testing, white-label, personalization, client collab |
| Unlimited | $99/mo | Unlimited pages, priority support, custom domain, team seats, multi-language, API access |

## Flippa Exit Strategy
- Target: $5,000-$8,000 sale at $0 MRR
- Positioning: "Ready-to-launch AI page builder SaaS"
- Value justification: 200+ dev hours x $50/hr = $10,000+ replacement cost
- Price boosters: AI features (+$2K), white-label (+$2K), niche targeting (+$1K)

## Full File Structure
```
pageforge/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx                    # Landing page
│   │   ├── pricing/page.tsx            # Pricing page
│   │   └── templates/page.tsx          # Template gallery
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   └── forgot-password/page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx                  # Dashboard shell + sidebar
│   │   ├── dashboard/page.tsx          # Overview + recent pages
│   │   ├── pages/
│   │   │   ├── page.tsx                # All pages list
│   │   │   ├── [id]/edit/page.tsx      # Visual editor
│   │   │   └── new/page.tsx            # Create new page
│   │   ├── templates/page.tsx          # Template browser
│   │   ├── analytics/
│   │   │   ├── page.tsx                # Analytics dashboard
│   │   │   └── [pageId]/page.tsx       # Per-page heatmap + scroll depth
│   │   ├── leads/page.tsx              # Form submissions
│   │   ├── popups/
│   │   │   ├── page.tsx                # All popups list
│   │   │   ├── [id]/edit/page.tsx      # Popup editor
│   │   │   └── new/page.tsx            # Create new popup
│   │   ├── funnels/
│   │   │   ├── page.tsx                # All funnels list
│   │   │   ├── [id]/edit/page.tsx      # Funnel editor
│   │   │   └── new/page.tsx            # Create new funnel
│   │   ├── comments/page.tsx           # Client comments inbox [NEW]
│   │   ├── settings/
│   │   │   ├── profile/page.tsx
│   │   │   ├── billing/page.tsx
│   │   │   ├── domains/page.tsx
│   │   │   ├── team/page.tsx
│   │   │   └── integrations/page.tsx   # Zapier, Slack, etc. [NEW]
│   │   └── onboarding/page.tsx
│   ├── api/
│   │   ├── auth/callback/route.ts
│   │   ├── stripe/
│   │   │   ├── checkout/route.ts
│   │   │   ├── portal/route.ts
│   │   │   └── webhook/route.ts
│   │   ├── pages/
│   │   │   ├── route.ts                # CRUD pages
│   │   │   ├── [id]/route.ts
│   │   │   ├── [id]/publish/route.ts
│   │   │   └── [id]/duplicate/route.ts
│   │   ├── ai/
│   │   │   ├── generate-page/route.ts  # AI page generation
│   │   │   ├── generate-copy/route.ts  # AI copywriting
│   │   │   ├── generate-image/route.ts # AI image generation
│   │   │   └── image-to-layout/route.ts # Image-to-layout
│   │   ├── leads/route.ts              # Form submissions
│   │   ├── leads/auto-respond/route.ts # Email auto-responder [NEW]
│   │   ├── analytics/route.ts          # Page events
│   │   ├── analytics/heatmap/route.ts  # Heatmap data [NEW]
│   │   ├── popups/
│   │   │   ├── route.ts                # CRUD popups [NEW]
│   │   │   └── [id]/route.ts
│   │   ├── funnels/
│   │   │   ├── route.ts                # CRUD funnels [NEW]
│   │   │   └── [id]/route.ts
│   │   ├── comments/route.ts           # Client comments [NEW]
│   │   ├── personalization/route.ts    # Geo/UTM/device rules [NEW]
│   │   ├── notifications/
│   │   │   ├── slack/route.ts          # Slack webhook [NEW]
│   │   │   └── discord/route.ts        # Discord webhook [NEW]
│   │   ├── embed/[pageId]/route.ts     # Embed script generator [NEW]
│   │   └── templates/route.ts          # Template CRUD
│   ├── p/[slug]/page.tsx               # Published page renderer
│   └── layout.tsx
├── components/
│   ├── ui/                             # shadcn components
│   ├── marketing/                      # Landing page components
│   ├── dashboard/                      # Dashboard components
│   ├── editor/
│   │   ├── EditorCanvas.tsx            # Main visual editor
│   │   ├── EditorSidebar.tsx           # Block library + settings
│   │   ├── EditorToolbar.tsx           # Top toolbar
│   │   ├── BlockRenderer.tsx           # Renders individual blocks
│   │   ├── blocks/                     # All block components
│   │   │   ├── HeroBlock.tsx
│   │   │   ├── FeaturesBlock.tsx
│   │   │   ├── TestimonialsBlock.tsx
│   │   │   ├── CTABlock.tsx
│   │   │   ├── PricingBlock.tsx
│   │   │   ├── FAQBlock.tsx
│   │   │   ├── FormBlock.tsx
│   │   │   ├── GalleryBlock.tsx
│   │   │   ├── VideoBlock.tsx
│   │   │   ├── CountdownBlock.tsx
│   │   │   ├── SocialProofBlock.tsx
│   │   │   └── CustomHTMLBlock.tsx
│   │   └── extensions/                 # Built-in CRO tools
│   │       ├── StickyBar.tsx
│   │       ├── ExitPopup.tsx
│   │       ├── SalesNotification.tsx
│   │       ├── CountdownTimer.tsx
│   │       ├── SpinWheel.tsx
│   │       ├── AnnouncementBar.tsx     # [NEW]
│   │       ├── CookieBar.tsx           # [NEW]
│   │       └── AgeVerification.tsx     # [NEW]
│   ├── popups/                          # Popup builder components [NEW]
│   │   ├── PopupEditor.tsx
│   │   ├── PopupRenderer.tsx
│   │   └── PopupTrigger.tsx
│   ├── collaboration/                   # Client collaboration [NEW]
│   │   ├── CommentMode.tsx
│   │   ├── CommentBubble.tsx
│   │   ├── ApprovalBanner.tsx
│   │   └── ActivityLog.tsx
│   ├── personalization/                 # Smart content [NEW]
│   │   ├── GeoTargeting.tsx
│   │   ├── DeviceContent.tsx
│   │   ├── UTMContent.tsx
│   │   └── PersonalizationRules.tsx
│   ├── analytics/                       # Analytics components [NEW]
│   │   ├── HeatmapOverlay.tsx
│   │   ├── ScrollDepthChart.tsx
│   │   ├── RealTimeDashboard.tsx
│   │   └── FunnelViz.tsx
│   ├── shared/
│   └── forms/
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   └── server.ts
│   ├── stripe/
│   │   ├── client.ts
│   │   └── plans.ts
│   ├── ai/
│   │   ├── claude.ts
│   │   ├── openai.ts
│   │   └── prompts.ts
│   ├── hooks/
│   │   ├── use-user.ts
│   │   ├── use-pages.ts
│   │   ├── use-editor.ts
│   │   └── use-analytics.ts
│   ├── utils/
│   │   ├── cn.ts
│   │   ├── format.ts
│   │   └── validators.ts
│   └── constants/
│       ├── blocks.ts
│       └── plans.ts
├── types/
│   ├── database.ts
│   ├── editor.ts
│   └── blocks.ts
├── public/
│   ├── blocks/                         # Block preview thumbnails
│   └── templates/                      # Template previews
├── docs/
│   ├── context.md                      # this file
│   ├── features.md
│   ├── decisions.md
│   ├── project-track.md
│   ├── context-snapshot.md
│   ├── audit.md
│   └── prompts.md
├── .env.example
├── .env.local
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── middleware.ts
```

## DB Schema (Core Tables)

```sql
-- User profiles (extends Supabase auth.users)
create table profiles (
  id              uuid primary key references auth.users(id) on delete cascade,
  full_name       text,
  avatar_url      text,
  plan            text default 'free',
  stripe_customer_id text,
  ai_credits_used integer default 0,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

-- Workspaces (for team/agency support)
create table workspaces (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  owner_id        uuid references profiles(id) on delete cascade,
  plan            text default 'free',
  created_at      timestamptz default now()
);

-- Published pages
create table pages (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid references profiles(id) on delete cascade,
  workspace_id    uuid references workspaces(id),
  title           text not null,
  slug            text not null,
  custom_domain   text,
  template_id     text,
  status          text default 'draft',
  blocks          jsonb not null default '[]',
  global_styles   jsonb default '{}',
  meta_title      text,
  meta_description text,
  og_image        text,
  published_at    timestamptz,
  view_count      integer default 0,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now(),
  unique(user_id, slug)
);

-- Block types registry
create table block_types (
  id              text primary key,
  name            text not null,
  category        text not null,
  thumbnail       text,
  default_config  jsonb not null,
  is_pro          boolean default false,
  sort_order      integer default 0
);

-- Form submissions (leads)
create table form_submissions (
  id              uuid primary key default gen_random_uuid(),
  page_id         uuid references pages(id) on delete cascade,
  user_id         uuid references profiles(id),
  data            jsonb not null,
  source_url      text,
  ip_address      text,
  created_at      timestamptz default now()
);

-- Page analytics events
create table page_events (
  id              uuid primary key default gen_random_uuid(),
  page_id         uuid references pages(id) on delete cascade,
  event_type      text not null,
  metadata        jsonb default '{}',
  visitor_id      text,
  created_at      timestamptz default now()
);

-- A/B test variants
create table ab_tests (
  id              uuid primary key default gen_random_uuid(),
  page_id         uuid references pages(id) on delete cascade,
  variant_name    text not null,
  blocks          jsonb not null default '[]',
  traffic_split   integer default 50,
  views           integer default 0,
  conversions     integer default 0,
  is_active       boolean default true,
  created_at      timestamptz default now()
);

-- Templates library
create table templates (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  category        text not null,
  thumbnail       text,
  blocks          jsonb not null default '[]',
  global_styles   jsonb default '{}',
  is_premium      boolean default false,
  sort_order      integer default 0,
  created_at      timestamptz default now()
);

-- [NEW] Popups
create table popups (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid references profiles(id) on delete cascade,
  page_id         uuid references pages(id) on delete set null,
  name            text not null,
  type            text not null,              -- 'newsletter' | 'promo' | 'exit' | 'custom'
  trigger_type    text default 'time_delay',  -- 'time_delay' | 'scroll_pct' | 'exit_intent' | 'click'
  trigger_value   text,                       -- e.g. '5' for 5 seconds, '50' for 50% scroll
  content         jsonb not null default '{}',
  styles          jsonb default '{}',
  is_active       boolean default false,
  views           integer default 0,
  conversions     integer default 0,
  created_at      timestamptz default now()
);

-- [NEW] Page versions (revision history)
create table page_versions (
  id              uuid primary key default gen_random_uuid(),
  page_id         uuid references pages(id) on delete cascade,
  version_number  integer not null,
  blocks          jsonb not null default '[]',
  global_styles   jsonb default '{}',
  created_by      uuid references profiles(id),
  created_at      timestamptz default now()
);

-- [NEW] Client comments (collaboration)
create table comments (
  id              uuid primary key default gen_random_uuid(),
  page_id         uuid references pages(id) on delete cascade,
  author_name     text not null,              -- client name (no auth needed)
  author_email    text,
  block_id        text,                       -- which block the comment is on
  content         text not null,
  status          text default 'open',        -- 'open' | 'resolved'
  position_x      float,                      -- click position on page
  position_y      float,
  created_at      timestamptz default now()
);

-- [NEW] Page approvals (client workflow)
create table page_approvals (
  id              uuid primary key default gen_random_uuid(),
  page_id         uuid references pages(id) on delete cascade,
  reviewer_name   text not null,
  reviewer_email  text,
  status          text not null,              -- 'approved' | 'changes_requested'
  notes           text,
  created_at      timestamptz default now()
);

-- [NEW] Personalization rules
create table personalization_rules (
  id              uuid primary key default gen_random_uuid(),
  page_id         uuid references pages(id) on delete cascade,
  rule_type       text not null,              -- 'geo' | 'device' | 'utm' | 'returning' | 'time'
  conditions      jsonb not null,             -- e.g. {"country": "BD", "city": "Dhaka"}
  block_overrides jsonb not null default '{}', -- which blocks change + new content
  is_active       boolean default true,
  created_at      timestamptz default now()
);

-- [NEW] Heatmap clicks
create table heatmap_clicks (
  id              uuid primary key default gen_random_uuid(),
  page_id         uuid references pages(id) on delete cascade,
  visitor_id      text,
  x_pct           float not null,             -- click position as % of page width
  y_pct           float not null,             -- click position as % of page height
  element_tag     text,                       -- 'button', 'a', 'img', etc.
  device_type     text,                       -- 'desktop' | 'tablet' | 'mobile'
  created_at      timestamptz default now()
);

-- [NEW] Scroll depth tracking
create table scroll_events (
  id              uuid primary key default gen_random_uuid(),
  page_id         uuid references pages(id) on delete cascade,
  visitor_id      text,
  max_depth_pct   integer not null,           -- 0-100, how far they scrolled
  device_type     text,
  created_at      timestamptz default now()
);

-- [NEW] Funnels
create table funnels (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid references profiles(id) on delete cascade,
  workspace_id    uuid references workspaces(id),
  name            text not null,
  steps           jsonb not null default '[]', -- ordered array of {page_id, step_name, type}
  is_active       boolean default true,
  created_at      timestamptz default now()
);

-- [NEW] Funnel events (per-step tracking)
create table funnel_events (
  id              uuid primary key default gen_random_uuid(),
  funnel_id       uuid references funnels(id) on delete cascade,
  step_index      integer not null,
  visitor_id      text,
  event_type      text not null,              -- 'enter' | 'complete' | 'drop_off'
  created_at      timestamptz default now()
);

-- [NEW] Auto-responder emails
create table auto_responders (
  id              uuid primary key default gen_random_uuid(),
  page_id         uuid references pages(id) on delete cascade,
  user_id         uuid references profiles(id),
  subject         text not null,
  body_html       text not null,
  is_active       boolean default true,
  sent_count      integer default 0,
  created_at      timestamptz default now()
);

-- [NEW] Page translations (multi-language)
create table page_translations (
  id              uuid primary key default gen_random_uuid(),
  page_id         uuid references pages(id) on delete cascade,
  language_code   text not null,              -- 'bn', 'es', 'fr', 'ar', etc.
  blocks          jsonb not null default '[]', -- translated block content
  meta_title      text,
  meta_description text,
  created_at      timestamptz default now(),
  unique(page_id, language_code)
);

-- [NEW] Activity log
create table activity_log (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid references profiles(id),
  workspace_id    uuid references workspaces(id),
  entity_type     text not null,              -- 'page' | 'popup' | 'funnel' | 'settings'
  entity_id       uuid,
  action          text not null,              -- 'created' | 'updated' | 'published' | 'deleted'
  details         jsonb default '{}',
  created_at      timestamptz default now()
);

-- [NEW] Session recordings
create table session_recordings (
  id              uuid primary key default gen_random_uuid(),
  page_id         uuid references pages(id) on delete cascade,
  visitor_id      text not null,
  device_type     text,                       -- 'desktop' | 'tablet' | 'mobile'
  duration_ms     integer,
  events          jsonb not null default '[]', -- [{type, x, y, timestamp, element}]
  tags            text[] default '{}',        -- 'converted', 'bounced', 'error'
  created_at      timestamptz default now()
);

-- [NEW] Workspace members (team)
create table workspace_members (
  id              uuid primary key default gen_random_uuid(),
  workspace_id    uuid references workspaces(id) on delete cascade,
  user_id         uuid references profiles(id) on delete cascade,
  role            text not null default 'editor', -- 'owner' | 'admin' | 'editor' | 'viewer'
  invited_at      timestamptz default now(),
  accepted_at     timestamptz,
  unique(workspace_id, user_id)
);

-- [NEW] API keys (for developer access)
create table api_keys (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid references profiles(id) on delete cascade,
  workspace_id    uuid references workspaces(id),
  name            text not null,
  key_hash        text not null,              -- hashed API key (never store plain)
  last_used_at    timestamptz,
  is_active       boolean default true,
  created_at      timestamptz default now()
);

-- [NEW] Integrations config
create table integrations (
  id              uuid primary key default gen_random_uuid(),
  workspace_id    uuid references workspaces(id) on delete cascade,
  type            text not null,              -- 'slack' | 'discord' | 'zapier' | 'mailchimp' | 'hubspot'
  config          jsonb not null default '{}', -- webhook URL, API keys, etc.
  is_active       boolean default true,
  created_at      timestamptz default now(),
  unique(workspace_id, type)
);

-- Enable RLS on all tables
alter table profiles enable row level security;
alter table workspaces enable row level security;
alter table pages enable row level security;
alter table block_types enable row level security;
alter table form_submissions enable row level security;
alter table page_events enable row level security;
alter table ab_tests enable row level security;
alter table templates enable row level security;
alter table popups enable row level security;
alter table page_versions enable row level security;
alter table comments enable row level security;
alter table page_approvals enable row level security;
alter table personalization_rules enable row level security;
alter table heatmap_clicks enable row level security;
alter table scroll_events enable row level security;
alter table funnels enable row level security;
alter table funnel_events enable row level security;
alter table auto_responders enable row level security;
alter table page_translations enable row level security;
alter table activity_log enable row level security;
alter table session_recordings enable row level security;
alter table workspace_members enable row level security;
alter table api_keys enable row level security;
alter table integrations enable row level security;
```

**Total: 26 tables with RLS**
