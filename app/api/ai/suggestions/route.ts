import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/utils/api-auth";
import { openai } from "@/lib/ai/openai";
import { SYSTEM_PROMPTS } from "@/lib/ai/prompts";
import { z } from "zod";

const requestSchema = z.object({
  blocks: z.array(z.any()),
});

export async function POST(request: Request) {
  const { response } = await requireAuth();
  if (response) return response;

  try {
    const body = await request.json();
    const parsed = requestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid blocks data" }, { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      max_tokens: 1024,
      messages: [
        { role: "system", content: SYSTEM_PROMPTS.pageSuggestions },
        {
          role: "user",
          content: `Analyze these page blocks and suggest improvements:\n${JSON.stringify(parsed.data.blocks, null, 2)}`,
        },
      ],
    });

    const text = completion.choices[0]?.message?.content || "";

    let result;
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      result = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(text);
    } catch {
      return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("AI suggestions error:", error);
    return NextResponse.json({ error: "AI suggestions failed" }, { status: 500 });
  }
}
