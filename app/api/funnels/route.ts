import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/utils/api-auth";

export async function GET() {
  const { response } = await requireAuth();
  if (response) return response;
  return NextResponse.json({ funnels: [] });
}

export async function POST() {
  const { response } = await requireAuth();
  if (response) return response;
  return NextResponse.json({ message: "Funnel created" }, { status: 201 });
}
