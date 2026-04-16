import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/utils/api-auth";

export async function GET() {
  const { response } = await requireAuth();
  if (response) return response;
  return NextResponse.json({ comments: [] });
}

// POST is public — client review comments (no auth needed)
export async function POST() {
  // TODO: Validate and store comment
  return NextResponse.json({ message: "Comment added" }, { status: 201 });
}
