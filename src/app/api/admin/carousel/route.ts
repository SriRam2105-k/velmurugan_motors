import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { image_url, alt_text, display_order } = body;

    if (!image_url) {
      return NextResponse.json({ error: "image_url is required" }, { status: 400 });
    }

    const admin = createAdminClient();
    const { data, error } = await admin
      .from("carousel_images")
      .insert([
        {
          image_url,
          alt_text: alt_text || null,
          display_order: display_order || 0,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/admin/carousel]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
