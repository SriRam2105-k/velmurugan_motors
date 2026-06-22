/**
 * setup-analytics.ts
 * Run: npx tsx scripts/setup-analytics.ts
 */

import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";

// Load .env.local
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error("❌  Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

async function setup() {
  console.log("🛠️ Setting up Analytics functionality in Supabase...");

  console.log(`
⚠️ IMPORTANT: You must run the following SQL in your Supabase SQL Editor to create the analytics table:

CREATE TABLE IF NOT EXISTS public.analytics (
    id integer PRIMARY KEY DEFAULT 1,
    visitors integer DEFAULT 0,
    whatsapp_clicks integer DEFAULT 0
);

-- Ensure there is only ever one row (id = 1)
ALTER TABLE public.analytics ADD CONSTRAINT single_row CHECK (id = 1);

-- Insert the initial row if it doesn't exist
INSERT INTO public.analytics (id, visitors, whatsapp_clicks) 
VALUES (1, 0, 0)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public can view analytics" 
ON public.analytics FOR SELECT 
TO public 
USING (true);

-- Allow authenticated admins to do everything
CREATE POLICY "Admins can manage analytics" 
ON public.analytics FOR ALL 
TO authenticated 
USING (true) WITH CHECK (true);

-- Create a secure RPC function to safely increment values without exposing update permissions to public
CREATE OR REPLACE FUNCTION increment_analytics(increment_type text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF increment_type = 'visitor' THEN
    UPDATE public.analytics SET visitors = visitors + 1 WHERE id = 1;
  ELSIF increment_type = 'whatsapp' THEN
    UPDATE public.analytics SET whatsapp_clicks = whatsapp_clicks + 1 WHERE id = 1;
  END IF;
END;
$$;
`);

  console.log("✅ Done! Copy and paste the above SQL into your Supabase Dashboard -> SQL Editor and hit 'Run'.");
}

setup().catch(console.error);
