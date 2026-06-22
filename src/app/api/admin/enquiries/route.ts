import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getAllEnquiries } from "@/data/enquiries";

async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return null;
  return user;
}

// ─── GET /api/admin/enquiries ────────────────────────────────────────────────

export async function GET() {
  const user = await requireAdmin();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const enquiries = await getAllEnquiries();
  return NextResponse.json(enquiries);
}
