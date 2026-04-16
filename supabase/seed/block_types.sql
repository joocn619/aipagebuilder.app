-- ============================================
-- Seed: 20 Block Types
-- ============================================

insert into public.block_types (id, name, category, is_pro, sort_order, default_config) values
('hero', 'Hero', 'hero', false, 1, '{"headline":"Your Headline Here","subheadline":"A compelling subheadline that explains your value proposition","ctaText":"Get Started","ctaUrl":"#","alignment":"center","bgType":"color","bgColor":"#f8fafc"}'),
('features', 'Features', 'content', false, 2, '{"heading":"Features","subheading":"Everything you need","layout":"grid","columns":3,"features":[{"icon":"zap","title":"Feature 1","description":"Description here"},{"icon":"shield","title":"Feature 2","description":"Description here"},{"icon":"star","title":"Feature 3","description":"Description here"}]}'),
('testimonials', 'Testimonials', 'social-proof', false, 3, '{"heading":"What Our Customers Say","layout":"carousel","testimonials":[{"name":"John Doe","role":"CEO","company":"Acme Inc","content":"Amazing product!","rating":5}]}'),
('cta', 'Call to Action', 'conversion', false, 4, '{"heading":"Ready to Get Started?","subheading":"Join thousands of happy customers","ctaText":"Start Free Trial","ctaUrl":"#","bgColor":"#2563eb","textColor":"#ffffff"}'),
('pricing', 'Pricing', 'conversion', false, 5, '{"heading":"Simple Pricing","subheading":"No hidden fees","toggle":true,"plans":[{"name":"Starter","price":19,"period":"month","features":["Feature 1","Feature 2"],"ctaText":"Get Started"},{"name":"Pro","price":39,"period":"month","features":["Everything in Starter","Feature 3"],"ctaText":"Go Pro","highlighted":true}]}'),
('faq', 'FAQ', 'content', false, 6, '{"heading":"Frequently Asked Questions","items":[{"question":"What is PageForge?","answer":"An AI-powered page builder."},{"question":"Is there a free plan?","answer":"Yes! Start free forever."}]}'),
('form', 'Lead Capture Form', 'conversion', false, 7, '{"heading":"Get in Touch","description":"Fill out the form below","fields":[{"type":"text","label":"Name","required":true},{"type":"email","label":"Email","required":true},{"type":"textarea","label":"Message","required":false}],"submitText":"Submit","successMessage":"Thank you! We will be in touch."}'),
('gallery', 'Image Gallery', 'media', false, 8, '{"heading":"Gallery","layout":"grid","columns":3,"images":[]}'),
('video', 'Video', 'media', false, 9, '{"heading":"Watch Our Demo","provider":"youtube","videoId":"","autoplay":false,"muted":false}'),
('countdown', 'Countdown Timer', 'conversion', false, 10, '{"heading":"Offer Ends Soon","mode":"fixed","targetDate":"","bgColor":"#1e293b","textColor":"#ffffff"}'),
('social-proof', 'Social Proof', 'social-proof', false, 11, '{"heading":"Trusted By","layout":"logos","items":[]}'),
('custom-html', 'Custom HTML', 'advanced', false, 12, '{"html":"<div>Your custom HTML here</div>","css":""}'),
('header', 'Header / Navigation', 'navigation', false, 0, '{"logo":"PageForge","menuItems":[{"label":"Features","url":"#features"},{"label":"Pricing","url":"#pricing"},{"label":"Contact","url":"#contact"}],"ctaText":"Get Started","ctaUrl":"#","sticky":true}'),
('footer', 'Footer', 'navigation', false, 99, '{"logo":"PageForge","columns":[{"title":"Product","links":[{"label":"Features","url":"#"},{"label":"Pricing","url":"#"}]},{"title":"Company","links":[{"label":"About","url":"#"},{"label":"Contact","url":"#"}]}],"copyright":"2026 PageForge. All rights reserved.","socialLinks":[]}'),
('team', 'Team', 'content', true, 13, '{"heading":"Meet Our Team","layout":"grid","members":[{"name":"Jane Doe","role":"CEO","bio":"Passionate leader","photoUrl":""}]}'),
('stats', 'Stats / Counter', 'social-proof', true, 14, '{"heading":"By the Numbers","stats":[{"value":10000,"label":"Happy Customers","prefix":"","suffix":"+"},{"value":99,"label":"Uptime","prefix":"","suffix":"%"},{"value":50,"label":"Countries","prefix":"","suffix":"+"}],"animated":true}'),
('logo-carousel', 'Logo Carousel', 'social-proof', true, 15, '{"heading":"Trusted By Leading Companies","speed":30,"logos":[]}'),
('comparison', 'Comparison Table', 'content', true, 16, '{"heading":"Compare Plans","columns":["Free","Pro","Enterprise"],"rows":[{"feature":"Pages","values":["1","50","Unlimited"]},{"feature":"AI Credits","values":["5","500","Unlimited"]}]}'),
('tabs', 'Tabs', 'content', true, 17, '{"tabs":[{"label":"Tab 1","content":"Content for tab 1"},{"label":"Tab 2","content":"Content for tab 2"}]}'),
('accordion', 'Accordion', 'content', true, 18, '{"heading":"More Information","items":[{"title":"Section 1","content":"Content here"},{"title":"Section 2","content":"Content here"}]}');
