import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/utils/api-auth";

export async function GET() {
  const { response } = await requireAuth();
  if (response) return response;

  // TODO: Fetch page from Supabase
  return NextResponse.json({ page: null });
}

export async function PATCH(request: Request) {
  const { response } = await requireAuth();
  if (response) return response;

  const body = await request.json();
  // TODO: Update page in Supabase
  return NextResponse.json({ message: "Page updated", ...body });
}

export async function DELETE() {
  const { response } = await requireAuth();
  if (response) return response;

  // TODO: Delete page from Supabase
  return NextResponse.json({ message: "Page deleted" });
}
