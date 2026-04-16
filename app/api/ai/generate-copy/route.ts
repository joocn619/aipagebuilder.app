import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/utils/api-auth";
import { anthropic } from "@/lib/ai/claude";
import { SYSTEM_PROMPTS } from "@/lib/ai/prompts";
import { z } from "zod";

const requestSchema = z.object({
  type: z.enum(["headline", "description", "cta", "section", "rewrite"]),
  context: z.string().min(1).max(500),
  tone: z.string().optional(),
  existing: z.string().optional(), // for rewrite
  count: z.number().min(1).max(5).optional(),
});

export async function POST(request: Request) {
  const { user, supabase, response } = await requireAuth();
  if (response) return response;

  try {
    const body = await request.json();
    const parsed = requestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    const { type, context, tone, existing, count } = parsed.data;

    const isRewrite = type === "rewrite" && existing;
    const systemPrompt = isRewrite ? SYSTEM_PROMPTS.copyRewriter : SYSTEM_PROMPTS.copyWriter;

    let userPrompt: string;
    if (isRewrite) {
      userPrompt = `Rewrite this copy to be more compelling:\n"${existing}"\n\nContext: ${context}${tone ? `\nTone: ${tone}` : ""}`;
      userPrompt += `\n\nReturn JSON: {"rewritten": "improved text"}`;
    } else {
      const num = count || 3;
      switch (type) {
        case "headline":
          userPrompt = `Generate ${num} compelling headlines for: ${context}${tone ? `\nTone: ${tone}` : ""}\n\nReturn JSON: {"headlines": ["headline1", "headline2", ...]}`;
          break;
        case "description":
          userPrompt = `Generate ${num} descriptions/subheadlines for: ${context}${tone ? `\nTone: ${tone}` : ""}\n\nReturn JSON: {"descriptions": ["desc1", "desc2", ...]}`;
          break;
        case "cta":
          userPrompt = `Generate ${num} CTA button texts for: ${context}${tone ? `\nTone: ${tone}` : ""}\n\nReturn JSON: {"ctas": ["cta1", "cta2", ...]}`;
          break;
        case "section":
          userPrompt = `Generate copy for a full section about: ${context}${tone ? `\nTone: ${tone}` : ""}\n\nReturn JSON: {"heading": "...", "subheading": "...", "body": "...", "ctaText": "..."}`;
          break;
        default:
          userPrompt = `Generate copy for: ${context}`;
      }
    }

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
    });

    const text = message.content[0].type === "text" ? message.content[0].text : "";

    let result;
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      result = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(text);
    } catch {
      return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 });
    }

    // Increment AI credits
    const { data: profile } = await supabase
      .from("profiles")
      .select("ai_credits_used")
      .eq("id", user!.id)
      .single();

    if (profile) {
      await supabase
        .from("profiles")
        .update({ ai_credits_used: (profile.ai_credits_used || 0) + 1 })
        .eq("id", user!.id);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("AI copy generation error:", error);
    return NextResponse.json({ error: "AI generation failed" }, { status: 500 });
  }
}
