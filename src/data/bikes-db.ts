// data/bikes-db.ts
// Async functions to fetch bike data from Supabase.
// The static bikes.ts is kept for the seed script.

import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";
import type { Bike } from "./bikes";

// Use a static anonymous client for public data fetching.
// This avoids calling `cookies()` which breaks generateStaticParams.
const getAnonClient = () => createSupabaseClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { auth: { persistSession: false } }
);

// ─── Row shape returned by Supabase ─────────────────────────────────────────

export type BikeRow = {
  id: number;
  slug: string;
  name: string;
  category: "commuter" | "premium" | "sport" | "scooter";
  tagline: string;
  in_stock: boolean;
  is_best_seller: boolean;
  is_new: boolean;
  mileage: string;
  engine: string;
  power: string;
  colors: string[];
  price_ex_showroom: number;
  price_on_road: number;
  price_emi_starting: number;
  image_main: string;
  image_variants: Record<string, string> | null;
  features: string[];
};

const dirMapping: Record<string, string> = {
  "Destini XTEC 125": "destini-xtec-125",
  "Glamour XTEC 125": "glamour-xtec-125",
  "HF Deluxe": "hf-deluxe",
  "Passion": "passion",
  "Pleasure +XTEC": "pleasure-xtec",
  "Splendor +": "splendor-plus",
  "Splendor + XTEC": "splendor-plus-xtec",
  "Splendor + XTEC 2.0": "splendor-plus-xtec-20",
  "Xoom 110": "xoom-110",
  "Xtreme 125R": "xtreme-125r",
};

// Helper to normalize image paths dynamically since the user ran a script renaming spaces to hyphens 
// and converting directories to kebab-case, but the Supabase DB still contains the old raw paths.
function normalizeImagePath(path: string | undefined | null): string {
  if (!path) return "";
  if (path.startsWith('http')) return path; // Skip absolute URLs
  
  const parts = path.split('/');
  const filename = parts.pop();
  const oldDir = parts.pop();
  if (!filename || !oldDir) return path;
  
  const newFilename = filename.replace(/ /g, '-');
  const newDir = dirMapping[oldDir] || oldDir.toLowerCase().replace(/ /g, '-').replace(/\+/g, 'plus');
  
  return `/bikes/${newDir}/${newFilename}`;
}

// ─── Map DB row → app Bike shape ────────────────────────────────────────────

export function mapRow(row: BikeRow): Bike {
  const normalizedVariants: Record<string, string> = {};
  if (row.image_variants) {
    for (const [key, val] of Object.entries(row.image_variants)) {
      normalizedVariants[key] = normalizeImagePath(val);
    }
  }

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category,
    tagline: row.tagline,
    inStock: row.in_stock,
    isBestSeller: row.is_best_seller,
    isNew: row.is_new,
    specs: {
      mileage: row.mileage,
      engine: row.engine,
      power: row.power,
    },
    colors: row.colors,
    price: {
      exShowroom: row.price_ex_showroom,
      onRoad: row.price_on_road,
      emiStarting: row.price_emi_starting,
    },
    images: {
      main: normalizeImagePath(row.image_main),
      variants: row.image_variants ? normalizedVariants : undefined,
    },
    features: row.features,
  };
}

// ─── Public API ─────────────────────────────────────────────────────────────

export const getAllBikes = unstable_cache(
  async (): Promise<Bike[]> => {
    const supabase = getAnonClient();
    const { data, error } = await supabase
      .from("bikes")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("[getAllBikes] Supabase error:", error.message);
      return [];
    }
    return (data as BikeRow[]).map(mapRow);
  },
  ["all_bikes"],
  { revalidate: 3600, tags: ["bikes"] }
);

export function getBikeBySlug(slug: string): Promise<Bike | null> {
  return unstable_cache(
    async (): Promise<Bike | null> => {
      const supabase = getAnonClient();
      const { data, error } = await supabase
        .from("bikes")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error || !data) {
        return null;
      }
      return mapRow(data as BikeRow);
    },
    [`bike_${slug}`],
    { revalidate: 3600, tags: ["bikes", `bike_${slug}`] }
  )();
}

export const getBestSellers = unstable_cache(
  async (): Promise<Bike[]> => {
    const supabase = getAnonClient();
    const { data, error } = await supabase
      .from("bikes")
      .select("*")
      .eq("is_best_seller", true)
      .order("id", { ascending: true });

    if (error) {
      console.error("[getBestSellers] Supabase error:", error.message);
      return [];
    }
    return (data as BikeRow[]).map(mapRow);
  },
  ["best_sellers"],
  { revalidate: 3600, tags: ["bikes"] }
);

export const getScooters = unstable_cache(
  async (): Promise<Bike[]> => {
    const supabase = getAnonClient();
    const { data, error } = await supabase
      .from("bikes")
      .select("*")
      .eq("category", "scooter")
      .order("id", { ascending: true });

    if (error) {
      console.error("[getScooters] Supabase error:", error.message);
      return [];
    }
    return (data as BikeRow[]).map(mapRow);
  },
  ["scooters"],
  { revalidate: 3600, tags: ["bikes"] }
);

export const getMotorcycles = unstable_cache(
  async (): Promise<Bike[]> => {
    const supabase = getAnonClient();
    const { data, error } = await supabase
      .from("bikes")
      .select("*")
      .neq("category", "scooter")
      .order("id", { ascending: true });

    if (error) {
      console.error("[getMotorcycles] Supabase error:", error.message);
      return [];
    }
    return (data as BikeRow[]).map(mapRow);
  },
  ["motorcycles"],
  { revalidate: 3600, tags: ["bikes"] }
);

export const getAllBikeSlugs = unstable_cache(
  async (): Promise<string[]> => {
    const supabase = getAnonClient();
    const { data, error } = await supabase.from("bikes").select("slug");
    if (error || !data) return [];
    return data.map((r) => r.slug as string);
  },
  ["bike_slugs"],
  { revalidate: 3600, tags: ["bikes"] }
);
