-- ============================================
-- PageForge — Full Database Schema (26 Tables)
-- ============================================

-- 1. profiles (extends auth.users)
create table public.profiles (
  id              uuid primary key references auth.users(id) on delete cascade,
  full_name       text,
  avatar_url      text,
  plan            text not null default 'free',
  stripe_customer_id text,
  ai_credits_used integer not null default 0,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- 2. workspaces
create table public.workspaces (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  owner_id        uuid not null references public.profiles(id) on delete cascade,
  plan            text not null default 'free',
  created_at      timestamptz not null default now()
);

-- 3. workspace_members
create table public.workspace_members (
  id              uuid primary key default gen_random_uuid(),
  workspace_id    uuid not null references public.workspaces(id) on delete cascade,
  user_id         uuid not null references public.profiles(id) on delete cascade,
  role            text not null default 'editor',
  invited_at      timestamptz not null default now(),
  accepted_at     timestamptz,
  unique(workspace_id, user_id)
);

-- 4. pages
create table public.pages (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references public.profiles(id) on delete cascade,
  workspace_id    uuid references public.workspaces(id) on delete set null,
  title           text not null,
  slug            text not null,
  custom_domain   text,
  template_id     uuid,
  status          text not null default 'draft',
  blocks          jsonb not null default '[]'::jsonb,
  global_styles   jsonb not null default '{}'::jsonb,
  meta_title      text,
  meta_description text,
  og_image        text,
  password_hash   text,
  published_at    timestamptz,
  view_count      integer not null default 0,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  unique(user_id, slug)
);

-- 5. page_versions
create table public.page_versions (
  id              uuid primary key default gen_random_uuid(),
  page_id         uuid not null references public.pages(id) on delete cascade,
  version_number  integer not null,
  blocks          jsonb not null default '[]'::jsonb,
  global_styles   jsonb not null default '{}'::jsonb,
  created_by      uuid references public.profiles(id) on delete set null,
  created_at      timestamptz not null default now()
);

-- 6. block_types
create table public.block_types (
  id              text primary key,
  name            text not null,
  category        text not null,
  thumbnail       text,
  default_config  jsonb not null default '{}'::jsonb,
  is_pro          boolean not null default false,
  sort_order      integer not null default 0
);

-- 7. templates
create table public.templates (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  category        text not null,
  thumbnail       text,
  blocks          jsonb not null default '[]'::jsonb,
  global_styles   jsonb not null default '{}'::jsonb,
  is_premium      boolean not null default false,
  sort_order      integer not null default 0,
  created_at      timestamptz not null default now()
);

-- 8. form_submissions
create table public.form_submissions (
  id              uuid primary key default gen_random_uuid(),
  page_id         uuid not null references public.pages(id) on delete cascade,
  user_id         uuid references public.profiles(id) on delete set null,
  data            jsonb not null,
  source_url      text,
  ip_address      text,
  tags            text[] default '{}',
  notes           text,
  created_at      timestamptz not null default now()
);

-- 9. page_events
create table public.page_events (
  id              uuid primary key default gen_random_uuid(),
  page_id         uuid not null references public.pages(id) on delete cascade,
  event_type      text not null,
  metadata        jsonb not null default '{}'::jsonb,
  visitor_id      text,
  created_at      timestamptz not null default now()
);

-- 10. ab_tests
create table public.ab_tests (
  id              uuid primary key default gen_random_uuid(),
  page_id         uuid not null references public.pages(id) on delete cascade,
  variant_name    text not null,
  blocks          jsonb not null default '[]'::jsonb,
  traffic_split   integer not null default 50,
  views           integer not null default 0,
  conversions     integer not null default 0,
  is_active       boolean not null default true,
  created_at      timestamptz not null default now()
);

-- 11. popups
create table public.popups (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references public.profiles(id) on delete cascade,
  page_id         uuid references public.pages(id) on delete set null,
  name            text not null,
  type            text not null default 'custom',
  trigger_type    text not null default 'time_delay',
  trigger_value   text,
  content         jsonb not null default '{}'::jsonb,
  styles          jsonb not null default '{}'::jsonb,
  frequency       text not null default 'once_per_session',
  is_active       boolean not null default false,
  views           integer not null default 0,
  conversions     integer not null default 0,
  start_date      timestamptz,
  end_date        timestamptz,
  created_at      timestamptz not null default now()
);

-- 12. comments (client collaboration)
create table public.comments (
  id              uuid primary key default gen_random_uuid(),
  page_id         uuid not null references public.pages(id) on delete cascade,
  parent_id       uuid references public.comments(id) on delete cascade,
  author_name     text not null,
  author_email    text,
  block_id        text,
  content         text not null,
  status          text not null default 'open',
  position_x      float,
  position_y      float,
  created_at      timestamptz not null default now()
);

-- 13. page_approvals
create table public.page_approvals (
  id              uuid primary key default gen_random_uuid(),
  page_id         uuid not null references public.pages(id) on delete cascade,
  reviewer_name   text not null,
  reviewer_email  text,
  status          text not null,
  notes           text,
  created_at      timestamptz not null default now()
);

-- 14. personalization_rules
create table public.personalization_rules (
  id              uuid primary key default gen_random_uuid(),
  page_id         uuid not null references public.pages(id) on delete cascade,
  rule_type       text not null,
  conditions      jsonb not null,
  block_overrides jsonb not null default '{}'::jsonb,
  is_active       boolean not null default true,
  created_at      timestamptz not null default now()
);

-- 15. heatmap_clicks
create table public.heatmap_clicks (
  id              uuid primary key default gen_random_uuid(),
  page_id         uuid not null references public.pages(id) on delete cascade,
  visitor_id      text,
  x_pct           float not null,
  y_pct           float not null,
  element_tag     text,
  device_type     text,
  created_at      timestamptz not null default now()
);

-- 16. scroll_events
create table public.scroll_events (
  id              uuid primary key default gen_random_uuid(),
  page_id         uuid not null references public.pages(id) on delete cascade,
  visitor_id      text,
  max_depth_pct   integer not null,
  device_type     text,
  created_at      timestamptz not null default now()
);

-- 17. funnels
create table public.funnels (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references public.profiles(id) on delete cascade,
  workspace_id    uuid references public.workspaces(id) on delete set null,
  name            text not null,
  steps           jsonb not null default '[]'::jsonb,
  is_active       boolean not null default true,
  created_at      timestamptz not null default now()
);

-- 18. funnel_events
create table public.funnel_events (
  id              uuid primary key default gen_random_uuid(),
  funnel_id       uuid not null references public.funnels(id) on delete cascade,
  step_index      integer not null,
  visitor_id      text,
  event_type      text not null,
  created_at      timestamptz not null default now()
);

-- 19. auto_responders
create table public.auto_responders (
  id              uuid primary key default gen_random_uuid(),
  page_id         uuid not null references public.pages(id) on delete cascade,
  user_id         uuid references public.profiles(id) on delete set null,
  subject         text not null,
  body_html       text not null,
  is_active       boolean not null default true,
  sent_count      integer not null default 0,
  created_at      timestamptz not null default now()
);

-- 20. page_translations
create table public.page_translations (
  id              uuid primary key default gen_random_uuid(),
  page_id         uuid not null references public.pages(id) on delete cascade,
  language_code   text not null,
  blocks          jsonb not null default '[]'::jsonb,
  meta_title      text,
  meta_description text,
  created_at      timestamptz not null default now(),
  unique(page_id, language_code)
);

-- 21. activity_log
create table public.activity_log (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid references public.profiles(id) on delete set null,
  workspace_id    uuid references public.workspaces(id) on delete set null,
  entity_type     text not null,
  entity_id       uuid,
  action          text not null,
  details         jsonb not null default '{}'::jsonb,
  created_at      timestamptz not null default now()
);

-- 22. session_recordings
create table public.session_recordings (
  id              uuid primary key default gen_random_uuid(),
  page_id         uuid not null references public.pages(id) on delete cascade,
  visitor_id      text not null,
  device_type     text,
  duration_ms     integer,
  events          jsonb not null default '[]'::jsonb,
  tags            text[] default '{}',
  created_at      timestamptz not null default now()
);

-- 23. api_keys
create table public.api_keys (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references public.profiles(id) on delete cascade,
  workspace_id    uuid references public.workspaces(id) on delete set null,
  name            text not null,
  key_hash        text not null,
  key_prefix      text not null,
  last_used_at    timestamptz,
  is_active       boolean not null default true,
  created_at      timestamptz not null default now()
);

-- 24. integrations
create table public.integrations (
  id              uuid primary key default gen_random_uuid(),
  workspace_id    uuid not null references public.workspaces(id) on delete cascade,
  type            text not null,
  config          jsonb not null default '{}'::jsonb,
  is_active       boolean not null default true,
  created_at      timestamptz not null default now(),
  unique(workspace_id, type)
);

-- 25. popup_templates
create table public.popup_templates (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  type            text not null,
  thumbnail       text,
  content         jsonb not null default '{}'::jsonb,
  styles          jsonb not null default '{}'::jsonb,
  sort_order      integer not null default 0,
  created_at      timestamptz not null default now()
);

-- 26. funnel_templates
create table public.funnel_templates (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  category        text not null,
  thumbnail       text,
  steps           jsonb not null default '[]'::jsonb,
  sort_order      integer not null default 0,
  created_at      timestamptz not null default now()
);

-- ============================================
-- Auto-create profile on signup (trigger)
-- ============================================
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================
-- Auto-update updated_at (trigger)
-- ============================================
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

create trigger set_pages_updated_at
  before update on public.pages
  for each row execute procedure public.handle_updated_at();
