import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/utils/api-auth";

export async function POST() {
  const { response } = await requireAuth();
  if (response) return response;

  // TODO: Duplicate page in Supabase
  return NextResponse.json({ message: "Page duplicated" }, { status: 201 });
}
