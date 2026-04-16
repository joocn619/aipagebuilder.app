import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/utils/api-auth";
import { openai } from "@/lib/ai/openai";
import { SYSTEM_PROMPTS } from "@/lib/ai/prompts";
import { z } from "zod";

const requestSchema = z.object({
  prompt: z.string().min(1).max(1000),
  industry: z.string().optional(),
  tone: z.string().optional(),
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

    const { prompt, industry, tone } = parsed.data;

    // Check AI credits
    const { data: profile } = await supabase
      .from("profiles")
      .select("ai_credits_used, plan")
      .eq("id", user!.id)
      .single();

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    // Generate page with OpenAI
    const userPrompt = `Create a landing page for: ${prompt}${industry ? `\nIndustry: ${industry}` : ""}${tone ? `\nTone: ${tone}` : ""}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      max_tokens: 4096,
      messages: [
        { role: "system", content: SYSTEM_PROMPTS.pageGenerator },
        { role: "user", content: userPrompt },
      ],
    });

    const text = completion.choices[0]?.message?.content || "";

    // Parse JSON from response
    let blocks;
    try {
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      blocks = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(text);
    } catch {
      return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 });
    }

    // Increment AI credits
    await supabase
      .from("profiles")
      .update({ ai_credits_used: (profile.ai_credits_used || 0) + 1 })
      .eq("id", user!.id);

    return NextResponse.json({ blocks, creditsUsed: (profile.ai_credits_used || 0) + 1 });
  } catch (error) {
    console.error("AI page generation error:", error);
    return NextResponse.json({ error: "AI generation failed" }, { status: 500 });
  }
}
