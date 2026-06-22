// data/bikes-db.ts
// Async functions to fetch bike data from Supabase.
// The static bikes.ts is kept for the seed script.

import { createClient as createSupabaseClient } from "@supabase/supabase-js";
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

// ─── Map DB row → app Bike shape ────────────────────────────────────────────

export function mapRow(row: BikeRow): Bike {
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
      main: row.image_main,
      variants: row.image_variants ?? undefined,
    },
    features: row.features,
  };
}

// ─── Public API ─────────────────────────────────────────────────────────────

export async function getAllBikes(): Promise<Bike[]> {
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
}

export async function getBikeBySlug(slug: string): Promise<Bike | null> {
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
}

export async function getBestSellers(): Promise<Bike[]> {
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
}

export async function getScooters(): Promise<Bike[]> {
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
}

export async function getMotorcycles(): Promise<Bike[]> {
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
}

export async function getAllBikeSlugs(): Promise<string[]> {
  const supabase = getAnonClient();
  const { data, error } = await supabase.from("bikes").select("slug");
  if (error || !data) return [];
  return data.map((r) => r.slug as string);
}
