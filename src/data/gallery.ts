// data/gallery.ts
// Functions to fetch and manage gallery images in Supabase.

import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { createAdminClient } from "@/lib/supabase/admin";

// Use a static anonymous client for public data fetching
const getAnonClient = () => createSupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { auth: { persistSession: false } }
);

export type GalleryImage = {
  id: number;
  url: string;
  caption: string | null;
  category: string | null;
  sort_order: number;
  created_at: string;
};

export type CreateGalleryImageInput = {
  url: string;
  caption?: string;
  category?: string;
  sort_order?: number;
};

/**
 * Public: Fetch all gallery images, ordered by sort_order.
 */
export async function getGalleryImages(): Promise<GalleryImage[]> {
  const supabase = getAnonClient();
  const { data, error } = await supabase
    .from("gallery_images")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[getGalleryImages] Supabase error:", error.message);
    return [];
  }
  return data as GalleryImage[];
}

/**
 * Admin: Insert a new gallery image.
 */
export async function createGalleryImage(
  input: CreateGalleryImageInput
): Promise<{ success: boolean; error?: string }> {
  const admin = createAdminClient();
  const { error } = await admin.from("gallery_images").insert([
    {
      url: input.url,
      caption: input.caption || null,
      category: input.category || null,
      sort_order: input.sort_order ?? 0,
    },
  ]);

  if (error) {
    console.error("[createGalleryImage] Supabase error:", error.message);
    return { success: false, error: error.message };
  }
  return { success: true };
}

/**
 * Admin: Delete a gallery image by id.
 */
export async function deleteGalleryImage(
  id: number
): Promise<{ success: boolean; error?: string }> {
  const admin = createAdminClient();
  const { error } = await admin.from("gallery_images").delete().eq("id", id);

  if (error) {
    console.error("[deleteGalleryImage] Supabase error:", error.message);
    return { success: false, error: error.message };
  }
  return { success: true };
}
