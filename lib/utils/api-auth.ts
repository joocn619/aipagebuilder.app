import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Get authenticated user or return 401 response.
 * Usage: const { user, response } = await requireAuth();
 *        if (response) return response;
 */
export async function requireAuth() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      user: null,
      supabase,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  return { user, supabase, response: null };
}
