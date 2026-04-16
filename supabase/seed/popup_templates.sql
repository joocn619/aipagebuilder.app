-- ============================================
-- Seed: 12 Popup Templates
-- ============================================

insert into public.popup_templates (name, type, sort_order, content, styles) values
('Newsletter Simple', 'newsletter', 1,
  '{"heading":"Stay Updated","description":"Get weekly tips delivered to your inbox.","fields":[{"type":"email","label":"Email","placeholder":"you@example.com","required":true}],"submitText":"Subscribe","successMessage":"You are subscribed!"}',
  '{"bgColor":"#ffffff","textColor":"#0f172a","accentColor":"#2563eb","borderRadius":"0.75rem","size":"medium"}'),

('Newsletter + Name', 'newsletter', 2,
  '{"heading":"Join Our Community","description":"Be part of something amazing.","fields":[{"type":"text","label":"Name","placeholder":"Your name","required":true},{"type":"email","label":"Email","placeholder":"you@example.com","required":true}],"submitText":"Join Now","successMessage":"Welcome aboard!"}',
  '{"bgColor":"#f8fafc","textColor":"#0f172a","accentColor":"#7c3aed","borderRadius":"0.75rem","size":"medium"}'),

('Discount Offer', 'promo', 3,
  '{"heading":"20% OFF Your First Order","description":"Use code WELCOME20 at checkout","ctaText":"Shop Now","ctaUrl":"#","showCoupon":true,"couponCode":"WELCOME20"}',
  '{"bgColor":"#fef2f2","textColor":"#991b1b","accentColor":"#dc2626","borderRadius":"0.75rem","size":"medium"}'),

('Flash Sale', 'promo', 4,
  '{"heading":"Flash Sale!","description":"50% off everything — 24 hours only","ctaText":"Get the Deal","ctaUrl":"#","showCountdown":true}',
  '{"bgColor":"#0f172a","textColor":"#f1f5f9","accentColor":"#eab308","borderRadius":"0.5rem","size":"large"}'),

('Free Shipping', 'promo', 5,
  '{"heading":"Free Shipping","description":"On all orders over $50","ctaText":"Start Shopping","ctaUrl":"#"}',
  '{"bgColor":"#ecfdf5","textColor":"#065f46","accentColor":"#059669","borderRadius":"0.75rem","size":"small"}'),

('Exit Intent', 'exit', 6,
  '{"heading":"Wait! Before You Go...","description":"Get 10% off your first purchase","fields":[{"type":"email","label":"Email","placeholder":"Enter your email","required":true}],"submitText":"Get My Discount","successMessage":"Check your email for the coupon!"}',
  '{"bgColor":"#ffffff","textColor":"#0f172a","accentColor":"#e11d48","borderRadius":"0.75rem","size":"large"}'),

('Exit Survey', 'exit', 7,
  '{"heading":"Help Us Improve","description":"Why are you leaving? Your feedback matters.","fields":[{"type":"select","label":"Reason","options":["Prices too high","Could not find what I wanted","Just browsing","Other"],"required":true},{"type":"textarea","label":"Comments","placeholder":"Tell us more...","required":false}],"submitText":"Submit Feedback","successMessage":"Thank you for your feedback!"}',
  '{"bgColor":"#f8fafc","textColor":"#0f172a","accentColor":"#6366f1","borderRadius":"0.75rem","size":"medium"}'),

('Spin to Win', 'custom', 8,
  '{"heading":"Spin to Win!","description":"Try your luck for an exclusive discount","fields":[{"type":"email","label":"Email","placeholder":"Enter your email","required":true}],"submitText":"Spin the Wheel","prizes":["10% Off","Free Shipping","20% Off","5% Off","Try Again","15% Off"]}',
  '{"bgColor":"#1e1b4b","textColor":"#e0e7ff","accentColor":"#a78bfa","borderRadius":"0.75rem","size":"large"}'),

('Fullscreen CTA', 'custom', 9,
  '{"heading":"Limited Time Offer","description":"Join now and get lifetime access at a discounted price","ctaText":"Claim Offer","ctaUrl":"#","showCountdown":true}',
  '{"bgColor":"#0f172a","textColor":"#f1f5f9","accentColor":"#3b82f6","borderRadius":"0rem","size":"fullscreen"}'),

('Video Popup', 'custom', 10,
  '{"heading":"Watch Our Demo","videoUrl":"","videoProvider":"youtube","autoplay":true}',
  '{"bgColor":"#000000","textColor":"#ffffff","borderRadius":"0.75rem","size":"large"}'),

('Cookie Consent', 'custom', 11,
  '{"heading":"We use cookies","description":"This website uses cookies to ensure you get the best experience.","acceptText":"Accept All","rejectText":"Reject","settingsText":"Cookie Settings"}',
  '{"bgColor":"#ffffff","textColor":"#374151","accentColor":"#2563eb","borderRadius":"0.75rem","size":"bar","position":"bottom"}'),

('Age Verification', 'custom', 12,
  '{"heading":"Are You 18+?","description":"You must be of legal age to access this content.","confirmText":"Yes, I am 18+","denyText":"No, take me back"}',
  '{"bgColor":"#0f172a","textColor":"#f1f5f9","accentColor":"#dc2626","borderRadius":"0.75rem","size":"fullscreen"}');
