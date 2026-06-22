import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const { type } = await request.json();

    if (type !== "visitor" && type !== "whatsapp") {
      return NextResponse.json({ error: "Invalid analytics type" }, { status: 400 });
    }

    const supabase = await createClient();

    // Call the RPC function created in setup-analytics.ts
    // If the function doesn't exist, this might fail initially until the user runs the SQL.
    const { error } = await supabase.rpc("increment_analytics", {
      increment_type: type
    });

    if (error) {
      console.error("[POST /api/analytics] Supabase RPC error:", error.message);
      // Fallback: If RPC is not set up, try direct update using admin client? 
      // Actually we must rely on the RPC for atomic increments safely without RLS issues, 
      // or we just return error to be visible in logs.
      return NextResponse.json({ error: "Failed to update analytics" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[POST /api/analytics] Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
