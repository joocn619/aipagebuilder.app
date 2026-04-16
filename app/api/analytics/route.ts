import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/utils/api-auth";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const TrackEventSchema = z.object({
  page_id: z.uuid(),
  event_type: z.enum(["view", "click", "form_submit", "scroll", "exit"]),
  session_id: z.string().max(64).optional(),
  device: z.enum(["desktop", "tablet", "mobile"]).optional(),
  referrer: z.string().max(500).optional(),
  duration_ms: z.number().min(0).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export async function GET(req: NextRequest) {
  const { response, supabase } = await requireAuth();
  if (response) return response;

  const { searchParams } = new URL(req.url);
  const pageId = searchParams.get("page_id");
  const range = searchParams.get("range") || "7d";

  // Calculate date range
  const daysMap: Record<string, number> = { "7d": 7, "30d": 30, "90d": 90 };
  const days = daysMap[range] || 7;
  const since = new Date(Date.now() - days * 86400000).toISOString();

  const query = supabase!
    .from("page_events")
    .select("event_type, device, created_at, page_id")
    .gte("created_at", since)
    .order("created_at", { ascending: true });

  if (pageId) query.eq("page_id", pageId);

  const { data: events, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const eventsData = events || [];

  // Aggregate by day
  const dailyMap: Record<string, { views: number; visitors: Set<string>; form_submits: number }> = {};

  for (let i = 0; i < days; i++) {
    const d = new Date(Date.now() - (days - 1 - i) * 86400000);
    const key = d.toISOString().split("T")[0];
    dailyMap[key] = { views: 0, visitors: new Set(), form_submits: 0 };
  }

  for (const event of eventsData) {
    const day = event.created_at.split("T")[0];
    if (!dailyMap[day]) continue;
    if (event.event_type === "view") {
      dailyMap[day].views++;
      dailyMap[day].visitors.add(event.page_id);
    }
    if (event.event_type === "form_submit") {
      dailyMap[day].form_submits++;
    }
  }

  const daily = Object.entries(dailyMap).map(([date, d]) => ({
    date: date.substring(5), // MM-DD
    views: d.views,
    visitors: d.visitors.size,
    conversions: d.form_submits,
  }));

  const totalViews = eventsData.filter((e) => e.event_type === "view").length;
  const totalFormSubmits = eventsData.filter((e) => e.event_type === "form_submit").length;
  const byDevice = {
    desktop: eventsData.filter((e) => e.device === "desktop").length,
    tablet: eventsData.filter((e) => e.device === "tablet").length,
    mobile: eventsData.filter((e) => e.device === "mobile").length,
  };

  return NextResponse.json({
    daily,
    totals: {
      views: totalViews,
      form_submits: totalFormSubmits,
      device: byDevice,
    },
  });
}

// POST is public — tracking events from published pages
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = TrackEventSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.issues }, { status: 400 });
    }

    const supabase = createClient();
    const { error } = await supabase.from("page_events").insert({
      page_id: parsed.data.page_id,
      event_type: parsed.data.event_type,
      session_id: parsed.data.session_id,
      device: parsed.data.device,
      referrer: parsed.data.referrer,
      duration_ms: parsed.data.duration_ms,
      metadata: parsed.data.metadata,
    });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
