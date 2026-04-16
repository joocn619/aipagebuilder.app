-- ============================================
-- PageForge — Performance Indexes
-- ============================================

-- pages
create index idx_pages_user_id on public.pages(user_id);
create index idx_pages_workspace_id on public.pages(workspace_id);
create index idx_pages_status on public.pages(status);
create index idx_pages_slug on public.pages(slug);
create index idx_pages_created_at on public.pages(created_at desc);

-- page_versions
create index idx_page_versions_page_id on public.page_versions(page_id);
create index idx_page_versions_created_at on public.page_versions(created_at desc);

-- form_submissions
create index idx_form_submissions_page_id on public.form_submissions(page_id);
create index idx_form_submissions_created_at on public.form_submissions(created_at desc);

-- page_events
create index idx_page_events_page_id on public.page_events(page_id);
create index idx_page_events_type on public.page_events(event_type);
create index idx_page_events_created_at on public.page_events(created_at desc);
create index idx_page_events_visitor on public.page_events(visitor_id);

-- ab_tests
create index idx_ab_tests_page_id on public.ab_tests(page_id);

-- popups
create index idx_popups_user_id on public.popups(user_id);
create index idx_popups_page_id on public.popups(page_id);

-- comments
create index idx_comments_page_id on public.comments(page_id);
create index idx_comments_parent_id on public.comments(parent_id);
create index idx_comments_status on public.comments(status);

-- personalization_rules
create index idx_personalization_page_id on public.personalization_rules(page_id);

-- heatmap_clicks
create index idx_heatmap_clicks_page_id on public.heatmap_clicks(page_id);
create index idx_heatmap_clicks_created_at on public.heatmap_clicks(created_at desc);
create index idx_heatmap_clicks_device on public.heatmap_clicks(device_type);

-- scroll_events
create index idx_scroll_events_page_id on public.scroll_events(page_id);

-- funnels
create index idx_funnels_user_id on public.funnels(user_id);

-- funnel_events
create index idx_funnel_events_funnel_id on public.funnel_events(funnel_id);
create index idx_funnel_events_created_at on public.funnel_events(created_at desc);

-- session_recordings
create index idx_session_recordings_page_id on public.session_recordings(page_id);
create index idx_session_recordings_created_at on public.session_recordings(created_at desc);

-- activity_log
create index idx_activity_log_user_id on public.activity_log(user_id);
create index idx_activity_log_workspace_id on public.activity_log(workspace_id);
create index idx_activity_log_entity on public.activity_log(entity_type, entity_id);
create index idx_activity_log_created_at on public.activity_log(created_at desc);

-- workspace_members
create index idx_workspace_members_user_id on public.workspace_members(user_id);

-- api_keys
create index idx_api_keys_user_id on public.api_keys(user_id);
create index idx_api_keys_key_hash on public.api_keys(key_hash);

-- integrations
create index idx_integrations_workspace_id on public.integrations(workspace_id);

-- page_translations
create index idx_page_translations_page_id on public.page_translations(page_id);

-- auto_responders
create index idx_auto_responders_page_id on public.auto_responders(page_id);

-- page_approvals
create index idx_page_approvals_page_id on public.page_approvals(page_id);

-- Enable Realtime on key tables
alter publication supabase_realtime add table public.pages;
alter publication supabase_realtime add table public.comments;
alter publication supabase_realtime add table public.page_events;
alter publication supabase_realtime add table public.form_submissions;
