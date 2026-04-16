import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/utils/api-auth";

export async function GET() {
  const { response } = await requireAuth();
  if (response) return response;
  return NextResponse.json({ leads: [] });
}

// POST is public — form submissions from published pages
export async function POST() {
  // TODO: Validate and store form submission
  return NextResponse.json({ message: "Lead captured" }, { status: 201 });
}
