import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/utils/api-auth";

export async function POST() {
  const { response } = await requireAuth();
  if (response) return response;

  // TODO: Update page status to 'published' in Supabase
  return NextResponse.json({ message: "Page published" });
}
