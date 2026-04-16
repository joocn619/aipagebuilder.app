import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/utils/api-auth";
import { openai } from "@/lib/ai/openai";
import { SYSTEM_PROMPTS } from "@/lib/ai/prompts";

export async function POST(request: Request) {
  const { user, supabase, response } = await requireAuth();
  if (response) return response;

  try {
    const formData = await request.formData();
    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Image file is required" }, { status: 400 });
    }

    // Validate file type
    const validTypes = ["image/png", "image/jpeg", "image/webp", "image/gif"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid image type. Use PNG, JPEG, WebP, or GIF." }, { status: 400 });
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "Image must be under 10MB" }, { status: 400 });
    }

    // Convert to base64
    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");
    const mediaType = file.type;

    // Send to GPT-4o Vision
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      max_tokens: 4096,
      messages: [
        { role: "system", content: SYSTEM_PROMPTS.imageToLayout },
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: { url: `data:${mediaType};base64,${base64}` },
            },
            {
              type: "text",
              text: "Convert this screenshot/mockup into PageForge blocks. Return ONLY a JSON array of blocks.",
            },
          ],
        },
      ],
    });

    const text = completion.choices[0]?.message?.content || "";

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
      .update({ ai_credits_used: 0 }) // Will be updated properly with RPC
      .eq("id", user!.id);

    return NextResponse.json({ blocks });
  } catch (error) {
    console.error("Image-to-layout error:", error);
    return NextResponse.json({ error: "AI conversion failed" }, { status: 500 });
  }
}
