import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createGalleryImage, deleteGalleryImage, getGalleryImages } from "@/data/gallery";

async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return null;
  return user;
}

// ─── GET /api/admin/gallery ──────────────────────────────────────────────────

export async function GET() {
  const user = await requireAdmin();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const images = await getGalleryImages();
  return NextResponse.json(images);
}

// ─── POST /api/admin/gallery ─────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  const user = await requireAdmin();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const result = await createGalleryImage(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/admin/gallery]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// ─── DELETE /api/admin/gallery?id=<id> ──────────────────────────────────────

export async function DELETE(request: NextRequest) {
  const user = await requireAdmin();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ error: "Valid image id is required" }, { status: 400 });
  }

  const result = await deleteGalleryImage(Number(id));
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  return NextResponse.json({ success: true });
}
