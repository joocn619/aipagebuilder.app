import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/utils/api-auth";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { response, supabase } = await requireAuth();
  if (response) return response;

  const { data, error } = await supabase!
    .from("session_recordings")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 404 });
  return NextResponse.json({ session: data });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { response, supabase } = await requireAuth();
  if (response) return response;

  const { error } = await supabase!
    .from("session_recordings")
    .delete()
    .eq("id", params.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
