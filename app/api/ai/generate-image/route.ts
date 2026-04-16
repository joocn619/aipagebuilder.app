import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/utils/api-auth";
import { openai } from "@/lib/ai/openai";
import { z } from "zod";

const requestSchema = z.object({
  prompt: z.string().min(1).max(500),
  style: z.enum(["natural", "vivid"]).optional(),
  size: z.enum(["1024x1024", "1024x1792", "1792x1024"]).optional(),
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

    const { prompt, style, size } = parsed.data;

    const result = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: size || "1024x1024",
      style: style || "natural",
      response_format: "url",
    });

    const imageUrl = result.data?.[0]?.url;
    if (!imageUrl) {
      return NextResponse.json({ error: "No image generated" }, { status: 500 });
    }

    // Increment AI credits
    await supabase
      .from("profiles")
      .update({ ai_credits_used: 0 })
      .eq("id", user!.id);

    return NextResponse.json({ imageUrl, revisedPrompt: result.data?.[0]?.revised_prompt });
  } catch (error) {
    console.error("AI image generation error:", error);
    return NextResponse.json({ error: "Image generation failed" }, { status: 500 });
  }
}
