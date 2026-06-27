// data/carousel.ts
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { createAdminClient } from "@/lib/supabase/admin";
import { unstable_cache } from "next/cache";

export type CarouselImage = {
  id: string;
  image_url: string;
  alt_text: string | null;
  display_order: number;
  created_at: string;
};

// Use static anon client (no cookies) so ISR caching is preserved
const getAnonClient = () =>
  createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } }
  );

/**
 * Public: Fetch all carousel images ordered by display_order.
 * Cached for 1 hour via Next.js data cache (consistent with ISR revalidate).
 */
export const getCarouselImages = unstable_cache(
  async (): Promise<CarouselImage[]> => {
    const supabase = getAnonClient();
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
  },
  ["carousel_images"],
  { revalidate: 3600, tags: ["carousel"] }
);

/**
 * Admin: Fetch all carousel images (uses admin client to bypass RLS).
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
