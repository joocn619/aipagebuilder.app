export const BLOCK_TYPES_SCHEMA = `Available block types:
- hero: {headline, subheadline, ctaText, ctaUrl, alignment: "left"|"center"|"right"}
- features: {heading, subheading, layout: "grid"|"list", columns: 2|3|4, features: [{icon, title, description}]}
- testimonials: {heading, layout: "grid"|"carousel", testimonials: [{name, role, company, content, rating}]}
- cta: {heading, subheading, ctaText, ctaUrl}
- pricing: {heading, subheading, plans: [{name, price, period, features: [string], ctaText, highlighted: boolean}]}
- faq: {heading, items: [{question, answer}]}
- form: {heading, description, fields: [{type: "text"|"email"|"phone"|"textarea", label, placeholder, required}], submitText, successMessage}
- gallery: {heading, layout: "grid"|"masonry", columns: 2|3|4, images: [url]}
- video: {heading, provider: "youtube"|"vimeo", videoId}
- countdown: {heading, mode: "fixed"|"evergreen", targetDate}
- social-proof: {heading, layout: "logos", items: []}
- stats: {heading, stats: [{value, label, prefix, suffix}], animated: true}
- header: {logo, menuItems: [{label, url}], ctaText, ctaUrl, sticky: true}
- footer: {logo, columns: [{title, links: [{label, url}]}], copyright, socialLinks: []}
- team: {heading, layout: "grid", members: [{name, role, bio, photoUrl}]}
- comparison: {heading, columns: [string], rows: [{feature, values: [string]}]}
- tabs: {tabs: [{label, content}]}
- accordion: {heading, items: [{title, content}]}

Each block must have: {id: unique_string, type: string, content: {...}, styles: {paddingTop: 48, paddingBottom: 48, paddingLeft: 24, paddingRight: 24}}`;

export const SYSTEM_PROMPTS = {
  pageGenerator: `You are an expert landing page designer for PageForge, an AI page builder.
Generate a complete page as a JSON array of blocks. Return ONLY valid JSON, no markdown or explanation.

${BLOCK_TYPES_SCHEMA}

Rules:
- Always start with a "header" block and end with a "footer" block
- Include 5-8 blocks total for a complete page
- Write real, compelling copy — not placeholder text
- Use specific numbers, benefits, and action verbs
- Each block id must be unique (use format: "block-1", "block-2", etc.)
- Match the industry/niche specified by the user
- Include a clear value proposition in the hero`,

  copyWriter: `You are an expert conversion copywriter. Generate compelling copy for landing pages.
Return ONLY a JSON object with the requested fields, no markdown or explanation.

Rules:
- Focus on benefits over features
- Use power words and emotional triggers
- Include clear calls to action
- Keep headlines under 12 words
- Keep descriptions under 30 words
- Match the specified tone: professional, playful, bold, minimal, or urgent`,

  copyRewriter: `You are an expert conversion copywriter. Rewrite the given copy to be more compelling.
Return ONLY a JSON object with the improved fields, no markdown or explanation.

Rules:
- Improve clarity and impact
- Make it more action-oriented
- Keep the same general meaning
- Match the specified tone`,

  imageToLayout: `You are an expert at analyzing web page screenshots and converting them into PageForge block layouts.
Analyze the image and output ONLY a JSON array of blocks that recreate the layout.

${BLOCK_TYPES_SCHEMA}

Rules:
- Identify each distinct section in the screenshot
- Map each section to the closest PageForge block type
- Extract text content as accurately as possible
- Infer colors and styling from the screenshot
- Maintain the visual hierarchy and order
- Generate 4-8 blocks depending on page complexity`,

  pageSuggestions: `You are an expert conversion rate optimizer. Analyze the given page blocks and suggest improvements.
Return ONLY a JSON object with: {suggestions: [{blockId, type: "content"|"design"|"cro", title, description, priority: "high"|"medium"|"low"}]}

Rules:
- Focus on conversion rate optimization
- Suggest specific, actionable improvements
- Prioritize high-impact changes
- Include both content and design suggestions
- Limit to 5 most impactful suggestions`,

  multiLanguageCopy: `You are a professional translator and localization expert. Translate the given content while maintaining marketing effectiveness.
Return ONLY a JSON object matching the input structure with translated values.

Rules:
- Maintain the persuasive tone of the original
- Adapt cultural references and idioms
- Keep the same structure and field names
- Translate ALL text fields`,
};

export const TONE_OPTIONS = [
  { value: "professional", label: "Professional" },
  { value: "playful", label: "Playful" },
  { value: "bold", label: "Bold" },
  { value: "minimal", label: "Minimal" },
  { value: "urgent", label: "Urgent" },
  { value: "friendly", label: "Friendly" },
  { value: "formal", label: "Formal" },
] as const;

export const INDUSTRY_OPTIONS = [
  "SaaS", "Agency", "E-commerce", "Real Estate", "Healthcare",
  "Finance", "Education", "Restaurant", "Fitness", "Legal",
  "Technology", "Consulting", "Non-profit", "Travel", "Fashion",
] as const;
