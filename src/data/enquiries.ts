// data/enquiries.ts
// Functions to create and fetch customer enquiries in Supabase.

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export type Enquiry = {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  message: string | null;
  bike_slug: string | null;
  created_at: string;
};

export type CreateEnquiryInput = {
  name: string;
  phone?: string;
  email?: string;
  message?: string;
  bike_slug?: string;
};

/**
 * Public: Insert a new enquiry.
 * Uses the anon client — RLS must allow INSERT for anon role.
 */
export async function createEnquiry(
  input: CreateEnquiryInput
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from("enquiries").insert([
    {
      name: input.name,
      phone: input.phone || null,
      email: input.email || null,
      message: input.message || null,
      bike_slug: input.bike_slug || null,
    },
  ]);

  if (error) {
    console.error("[createEnquiry] Supabase error:", error.message);
    return { success: false, error: error.message };
  }
  return { success: true };
}

/**
 * Admin: Fetch all enquiries (newest first).
 * Uses the service role key — only call from protected API routes.
 */
export async function getAllEnquiries(): Promise<Enquiry[]> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("enquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[getAllEnquiries] Supabase error:", error.message);
    return [];
  }
  return data as Enquiry[];
}
