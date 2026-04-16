-- ============================================
-- PageForge — RLS Policies (All 26 Tables)
-- ============================================

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.workspaces enable row level security;
alter table public.workspace_members enable row level security;
alter table public.pages enable row level security;
alter table public.page_versions enable row level security;
alter table public.block_types enable row level security;
alter table public.templates enable row level security;
alter table public.form_submissions enable row level security;
alter table public.page_events enable row level security;
alter table public.ab_tests enable row level security;
alter table public.popups enable row level security;
alter table public.comments enable row level security;
alter table public.page_approvals enable row level security;
alter table public.personalization_rules enable row level security;
alter table public.heatmap_clicks enable row level security;
alter table public.scroll_events enable row level security;
alter table public.funnels enable row level security;
alter table public.funnel_events enable row level security;
alter table public.auto_responders enable row level security;
alter table public.page_translations enable row level security;
alter table public.activity_log enable row level security;
alter table public.session_recordings enable row level security;
alter table public.api_keys enable row level security;
alter table public.integrations enable row level security;
alter table public.popup_templates enable row level security;
alter table public.funnel_templates enable row level security;

-- ============================================
-- Helper: check workspace membership
-- ============================================
create or replace function public.is_workspace_member(ws_id uuid)
returns boolean as $$
begin
  return exists (
    select 1 from public.workspace_members
    where workspace_id = ws_id and user_id = auth.uid()
  ) or exists (
    select 1 from public.workspaces
    where id = ws_id and owner_id = auth.uid()
  );
end;
$$ language plpgsql security definer;

-- ============================================
-- 1. profiles
-- ============================================
create policy "Users can view own profile"
  on public.profiles for select using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

-- ============================================
-- 2. workspaces
-- ============================================
create policy "Owners can do anything with own workspaces"
  on public.workspaces for all using (owner_id = auth.uid());

create policy "Members can view workspaces"
  on public.workspaces for select using (public.is_workspace_member(id));

-- ============================================
-- 3. workspace_members
-- ============================================
create policy "Workspace owners can manage members"
  on public.workspace_members for all using (
    exists (select 1 from public.workspaces where id = workspace_id and owner_id = auth.uid())
  );

create policy "Members can view their membership"
  on public.workspace_members for select using (user_id = auth.uid());

-- ============================================
-- 4. pages
-- ============================================
create policy "Users can CRUD own pages"
  on public.pages for all using (user_id = auth.uid());

create policy "Workspace members can view workspace pages"
  on public.pages for select using (
    workspace_id is not null and public.is_workspace_member(workspace_id)
  );

-- ============================================
-- 5. page_versions
-- ============================================
create policy "Users can manage versions of own pages"
  on public.page_versions for all using (
    exists (select 1 from public.pages where id = page_id and user_id = auth.uid())
  );

-- ============================================
-- 6. block_types (public read)
-- ============================================
create policy "Anyone can read block_types"
  on public.block_types for select using (true);

-- ============================================
-- 7. templates (public read)
-- ============================================
create policy "Anyone can read templates"
  on public.templates for select using (true);

-- ============================================
-- 8. form_submissions
-- ============================================
create policy "Page owners can view their submissions"
  on public.form_submissions for select using (
    exists (select 1 from public.pages where id = page_id and user_id = auth.uid())
  );

create policy "Page owners can delete submissions"
  on public.form_submissions for delete using (
    exists (select 1 from public.pages where id = page_id and user_id = auth.uid())
  );

create policy "Anyone can insert submissions (public forms)"
  on public.form_submissions for insert with check (true);

-- ============================================
-- 9. page_events
-- ============================================
create policy "Page owners can view events"
  on public.page_events for select using (
    exists (select 1 from public.pages where id = page_id and user_id = auth.uid())
  );

create policy "Anyone can insert events (tracking)"
  on public.page_events for insert with check (true);

-- ============================================
-- 10. ab_tests
-- ============================================
create policy "Page owners can manage AB tests"
  on public.ab_tests for all using (
    exists (select 1 from public.pages where id = page_id and user_id = auth.uid())
  );

-- ============================================
-- 11. popups
-- ============================================
create policy "Users can CRUD own popups"
  on public.popups for all using (user_id = auth.uid());

-- ============================================
-- 12. comments (public insert for clients)
-- ============================================
create policy "Page owners can view comments"
  on public.comments for select using (
    exists (select 1 from public.pages where id = page_id and user_id = auth.uid())
  );

create policy "Page owners can update comments"
  on public.comments for update using (
    exists (select 1 from public.pages where id = page_id and user_id = auth.uid())
  );

create policy "Anyone can insert comments (client review)"
  on public.comments for insert with check (true);

-- ============================================
-- 13. page_approvals (public insert for clients)
-- ============================================
create policy "Page owners can view approvals"
  on public.page_approvals for select using (
    exists (select 1 from public.pages where id = page_id and user_id = auth.uid())
  );

create policy "Anyone can insert approvals (client review)"
  on public.page_approvals for insert with check (true);

-- ============================================
-- 14. personalization_rules
-- ============================================
create policy "Page owners can manage personalization"
  on public.personalization_rules for all using (
    exists (select 1 from public.pages where id = page_id and user_id = auth.uid())
  );

-- ============================================
-- 15. heatmap_clicks
-- ============================================
create policy "Page owners can view heatmap data"
  on public.heatmap_clicks for select using (
    exists (select 1 from public.pages where id = page_id and user_id = auth.uid())
  );

create policy "Anyone can insert heatmap clicks (tracking)"
  on public.heatmap_clicks for insert with check (true);

-- ============================================
-- 16. scroll_events
-- ============================================
create policy "Page owners can view scroll data"
  on public.scroll_events for select using (
    exists (select 1 from public.pages where id = page_id and user_id = auth.uid())
  );

create policy "Anyone can insert scroll events (tracking)"
  on public.scroll_events for insert with check (true);

-- ============================================
-- 17. funnels
-- ============================================
create policy "Users can CRUD own funnels"
  on public.funnels for all using (user_id = auth.uid());

-- ============================================
-- 18. funnel_events
-- ============================================
create policy "Funnel owners can view events"
  on public.funnel_events for select using (
    exists (select 1 from public.funnels where id = funnel_id and user_id = auth.uid())
  );

create policy "Anyone can insert funnel events (tracking)"
  on public.funnel_events for insert with check (true);

-- ============================================
-- 19. auto_responders
-- ============================================
create policy "Page owners can manage auto-responders"
  on public.auto_responders for all using (
    exists (select 1 from public.pages where id = page_id and user_id = auth.uid())
  );

-- ============================================
-- 20. page_translations
-- ============================================
create policy "Page owners can manage translations"
  on public.page_translations for all using (
    exists (select 1 from public.pages where id = page_id and user_id = auth.uid())
  );

-- ============================================
-- 21. activity_log
-- ============================================
create policy "Users can view own activity"
  on public.activity_log for select using (user_id = auth.uid());

create policy "Users can insert own activity"
  on public.activity_log for insert with check (user_id = auth.uid());

-- ============================================
-- 22. session_recordings
-- ============================================
create policy "Page owners can view recordings"
  on public.session_recordings for select using (
    exists (select 1 from public.pages where id = page_id and user_id = auth.uid())
  );

create policy "Anyone can insert recordings (tracking)"
  on public.session_recordings for insert with check (true);

-- ============================================
-- 23. api_keys
-- ============================================
create policy "Users can manage own API keys"
  on public.api_keys for all using (user_id = auth.uid());

-- ============================================
-- 24. integrations
-- ============================================
create policy "Workspace owners can manage integrations"
  on public.integrations for all using (
    exists (select 1 from public.workspaces where id = workspace_id and owner_id = auth.uid())
  );

create policy "Workspace members can view integrations"
  on public.integrations for select using (public.is_workspace_member(workspace_id));

-- ============================================
-- 25. popup_templates (public read)
-- ============================================
create policy "Anyone can read popup_templates"
  on public.popup_templates for select using (true);

-- ============================================
-- 26. funnel_templates (public read)
-- ============================================
create policy "Anyone can read funnel_templates"
  on public.funnel_templates for select using (true);
