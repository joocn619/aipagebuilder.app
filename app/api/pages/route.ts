import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/utils/api-auth";

export async function GET() {
  const { response } = await requireAuth();
  if (response) return response;

  // TODO: Fetch pages from Supabase where user_id = user.id
  return NextResponse.json({ pages: [] });
}

export async function POST(request: Request) {
  const { user, response } = await requireAuth();
  if (response) return response;

  const body = await request.json();

  // TODO: Create page in Supabase
  return NextResponse.json(
    { message: "Page created", userId: user!.id, ...body },
    { status: 201 }
  );
}
