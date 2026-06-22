import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const resolvedParams = await params;
    const { id } = resolvedParams;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const admin = createAdminClient();

    // Fetch to get image_url if we want to delete from storage as well
    const { data: existing, error: fetchError } = await admin
      .from("carousel_images")
      .select("image_url")
      .eq("id", id)
      .single();

    if (fetchError || !existing) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    // Delete from DB
    const { error: deleteError } = await admin
      .from("carousel_images")
      .delete()
      .eq("id", id);

    if (deleteError) {
      return NextResponse.json({ error: deleteError.message }, { status: 500 });
    }

    // Also try to delete from storage if it's in public-assets
    if (existing.image_url.includes("public-assets")) {
      const parts = existing.image_url.split("/public-assets/");
      if (parts.length > 1) {
        const filePath = parts[1];
        await admin.storage.from("public-assets").remove([filePath]);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(`[DELETE /api/admin/carousel/[id]]`, err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
