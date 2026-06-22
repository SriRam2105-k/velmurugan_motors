import { createClient } from "@/lib/supabase/server";

export type AnalyticsData = {
  visitors: number;
  whatsapp_clicks: number;
};

/**
 * Fetch analytics data.
 */
export async function getAnalytics(): Promise<AnalyticsData> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("analytics")
    .select("visitors, whatsapp_clicks")
    .eq("id", 1)
    .single();

  if (error) {
    console.error("[getAnalytics] Supabase error:", error.message);
    return { visitors: 0, whatsapp_clicks: 0 };
  }
  return data as AnalyticsData;
}
