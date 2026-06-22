import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminDashboardClient from "./AdminDashboardClient";
import { getAllEnquiries } from "@/data/enquiries";
import { getAdminCarouselImages } from "@/data/carousel";
import { getAnalytics } from "@/data/analytics";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Bike } from "@/data/bikes";
import { mapRow, type BikeRow } from "@/data/bikes-db";

export default async function AdminDashboardPage() {
  // Verify session
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  // Fetch bikes, enquiries, carousel images, and analytics in parallel using admin client
  const admin = createAdminClient();
  const [bikesResult, enquiries, carouselImages, analytics] = await Promise.all([
    admin.from("bikes").select("*").order("id"),
    getAllEnquiries(),
    getAdminCarouselImages(),
    getAnalytics(),
  ]);

  const bikes = (bikesResult.data as BikeRow[] || []).map(mapRow);
  const visitors = analytics.visitors;
  const whatsappClicks = analytics.whatsapp_clicks;

  return <AdminDashboardClient user={user} bikes={bikes} enquiries={enquiries} carouselImages={carouselImages} visitors={visitors} whatsappClicks={whatsappClicks} />;
}
