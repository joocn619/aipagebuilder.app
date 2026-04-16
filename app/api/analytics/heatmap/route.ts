import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/utils/api-auth";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const HeatmapClickSchema = z.object({
  page_id: z.uuid(),
  x_pct: z.number().min(0).max(100),
  y_pct: z.number().min(0).max(100),
  device: z.enum(["desktop", "tablet", "mobile"]),
  session_id: z.string().optional(),
});

export async function GET(req: NextRequest) {
  const { response, supabase } = await requireAuth();
  if (response) return response;

  const { searchParams } = new URL(req.url);
  const pageId = searchParams.get("page_id");
  const device = searchParams.get("device") || "desktop";

  if (!pageId) {
    return NextResponse.json({ error: "page_id required" }, { status: 400 });
  }

  const query = supabase!
    .from("heatmap_clicks")
    .select("x_pct, y_pct, device, created_at")
    .eq("page_id", pageId)
    .order("created_at", { ascending: false })
    .limit(5000);

  if (device !== "all") {
    query.eq("device", device);
  }

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ clicks: data || [] });
}

// POST is public — called from published pages
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = HeatmapClickSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues }, { status: 400 });
    }

    const supabase = createClient();
    const { error } = await supabase.from("heatmap_clicks").insert({
      page_id: parsed.data.page_id,
      x_pct: parsed.data.x_pct,
      y_pct: parsed.data.y_pct,
      device: parsed.data.device,
      session_id: parsed.data.session_id,
    });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
