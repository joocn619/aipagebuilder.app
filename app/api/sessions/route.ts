import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/utils/api-auth";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const SessionEventSchema = z.object({
  page_id: z.uuid(),
  session_id: z.string().min(1).max(64),
  events: z.array(
    z.object({
      type: z.enum(["mousemove", "click", "scroll", "keydown", "resize"]),
      x: z.number().optional(),
      y: z.number().optional(),
      scroll_y: z.number().optional(),
      timestamp: z.number(),
    })
  ).max(500),
  duration_ms: z.number().min(0),
  device: z.enum(["desktop", "tablet", "mobile"]),
  screen_width: z.number().optional(),
  screen_height: z.number().optional(),
  referrer: z.string().max(500).optional(),
});

export async function GET(req: NextRequest) {
  const { response, supabase } = await requireAuth();
  if (response) return response;

  const { searchParams } = new URL(req.url);
  const pageId = searchParams.get("page_id");
  const limit = Math.min(parseInt(searchParams.get("limit") || "50"), 100);

  const query = supabase!
    .from("session_recordings")
    .select("id, page_id, session_id, duration_ms, device, screen_width, screen_height, referrer, created_at")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (pageId) query.eq("page_id", pageId);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ sessions: data || [] });
}

// POST is public — called from published pages
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = SessionEventSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues }, { status: 400 });
    }

    const supabase = createClient();
    const { error } = await supabase.from("session_recordings").insert({
      page_id: parsed.data.page_id,
      session_id: parsed.data.session_id,
      recording_data: parsed.data.events,
      duration_ms: parsed.data.duration_ms,
      device: parsed.data.device,
      screen_width: parsed.data.screen_width,
      screen_height: parsed.data.screen_height,
      referrer: parsed.data.referrer,
    });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
