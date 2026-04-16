-- ============================================
-- Seed: 6 Funnel Templates
-- ============================================

insert into public.funnel_templates (name, category, sort_order, steps) values
('Lead Generation Funnel', 'lead-gen', 1,
  '[{"step_name":"Landing Page","type":"landing","description":"Capture attention with a compelling offer"},{"step_name":"Opt-in","type":"opt-in","description":"Collect email with a lead magnet"},{"step_name":"Thank You","type":"thank-you","description":"Confirm and deliver the lead magnet"}]'),

('Webinar Funnel', 'webinar', 2,
  '[{"step_name":"Registration Page","type":"landing","description":"Promote the webinar and collect registrations"},{"step_name":"Confirmation","type":"thank-you","description":"Confirm registration and add to calendar"},{"step_name":"Replay Page","type":"landing","description":"Post-webinar replay with CTA"},{"step_name":"Sales Page","type":"sales","description":"Convert attendees into customers"}]'),

('Product Launch Funnel', 'product-launch', 3,
  '[{"step_name":"Teaser Page","type":"landing","description":"Build anticipation with countdown"},{"step_name":"Pre-launch Signup","type":"opt-in","description":"Collect early access emails"},{"step_name":"Launch Page","type":"sales","description":"Product reveal with special pricing"},{"step_name":"Upsell","type":"upsell","description":"Offer premium version or add-ons"},{"step_name":"Thank You","type":"thank-you","description":"Order confirmation and next steps"}]'),

('Tripwire Funnel', 'tripwire', 4,
  '[{"step_name":"Free Offer","type":"landing","description":"Irresistible free offer to capture leads"},{"step_name":"Low-cost Offer","type":"sales","description":"$7-27 tripwire product"},{"step_name":"Upsell 1","type":"upsell","description":"Related premium product"},{"step_name":"Downsell","type":"downsell","description":"Budget-friendly alternative"},{"step_name":"Thank You","type":"thank-you","description":"Purchase confirmation"}]'),

('Consultation Funnel', 'service', 5,
  '[{"step_name":"Service Page","type":"landing","description":"Showcase services and results"},{"step_name":"Application Form","type":"opt-in","description":"Qualify leads with application"},{"step_name":"Booking Page","type":"landing","description":"Calendar integration for scheduling"},{"step_name":"Confirmation","type":"thank-you","description":"Booking confirmed with prep info"}]'),

('E-commerce Sales Funnel', 'ecommerce', 6,
  '[{"step_name":"Product Page","type":"sales","description":"Product showcase with social proof"},{"step_name":"Upsell","type":"upsell","description":"Bundle or premium version"},{"step_name":"Order Bump","type":"upsell","description":"Add-on at checkout"},{"step_name":"Thank You","type":"thank-you","description":"Order confirmation + referral offer"}]');
