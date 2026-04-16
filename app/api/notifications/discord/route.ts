import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/utils/api-auth";

export async function POST() {
  const { response } = await requireAuth();
  if (response) return response;
  return NextResponse.json({ message: "Discord notification sent" });
}
