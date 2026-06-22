// data/carousel.ts
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export type CarouselImage = {
  id: string;
  image_url: string;
  alt_text: string | null;
  display_order: number;
  created_at: string;
};

/**
 * Public: Fetch all carousel images ordered by display_order.
 */
export async function getCarouselImages(): Promise<CarouselImage[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("carousel_images")
    .select("*")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[getCarouselImages] Supabase error:", error.message);
    return [];
  }
  return data as CarouselImage[];
}

/**
 * Admin: Fetch all carousel images (can use admin client to bypass RLS if needed, but public is fine).
 */
export async function getAdminCarouselImages(): Promise<CarouselImage[]> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("carousel_images")
    .select("*")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[getAdminCarouselImages] Supabase error:", error.message);
    return [];
  }
  return data as CarouselImage[];
}
