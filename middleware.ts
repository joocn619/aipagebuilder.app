import { type NextRequest, NextResponse } from "next/server";
// import { updateSession } from "@/lib/supabase/middleware";

// AUTH BYPASSED — dev only
export async function middleware(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/|p/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
