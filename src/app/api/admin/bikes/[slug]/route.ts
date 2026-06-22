import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return null;
  return user;
}

// ─── PATCH /api/admin/bikes/[slug] ──────────────────────────────────────────

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const user = await requireAdmin();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;

  try {
    const body = await request.json();
    const admin = createAdminClient();

    const { data, error } = await admin
      .from("bikes")
      .update(body)
      .eq("slug", slug)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(data);
  } catch (err) {
    console.error("[PATCH /api/admin/bikes/[slug]]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// ─── DELETE /api/admin/bikes/[slug] ─────────────────────────────────────────

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const user = await requireAdmin();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const admin = createAdminClient();

  const { error } = await admin.from("bikes").delete().eq("slug", slug);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({ success: true });
}
