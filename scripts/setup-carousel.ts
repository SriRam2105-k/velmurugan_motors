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

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function setup() {
  console.log("🛠️ Setting up Carousel functionality in Supabase...");

  // 1. Create table (We can't do DDL directly from supabase-js unless using RPC, 
  // so we'll just try to insert a dummy row, but wait, usually we need to do this from SQL editor)
  // Actually, wait, maybe we can just create it from SQL if we can't do it here. 
  // We'll instruct the user to run the SQL or we can write an RPC if it exists. 
  console.log("⚠️ NOTE: You must run the following SQL in your Supabase SQL Editor to create the table:");
  console.log(`
CREATE TABLE IF NOT EXISTS public.carousel_images (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    image_url text NOT NULL,
    alt_text text,
    display_order integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.carousel_images ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public can view carousel images" 
ON public.carousel_images FOR SELECT 
TO public 
USING (true);

-- Allow authenticated admins to do everything
CREATE POLICY "Admins can manage carousel images" 
ON public.carousel_images FOR ALL 
TO authenticated 
USING (true) WITH CHECK (true);
  `);

  // 2. Create Storage Bucket
  console.log("\n📁 Creating 'public-assets' storage bucket...");
  const { data: buckets, error: listError } = await supabase.storage.listBuckets();
  if (listError) {
    console.error("❌ Failed to list buckets:", listError.message);
  } else {
    const exists = buckets.some(b => b.name === "public-assets");
    if (!exists) {
      const { data, error } = await supabase.storage.createBucket("public-assets", {
        public: true,
        allowedMimeTypes: ["image/png", "image/jpeg", "image/jpg", "image/webp"],
        fileSizeLimit: 5242880, // 5MB
      });
      if (error) {
        console.error("❌ Failed to create bucket:", error.message);
      } else {
        console.log("✅ Bucket 'public-assets' created successfully!");
        
        console.log(`
⚠️ IMPORTANT STORAGE RLS:
Please run this SQL in your Supabase SQL editor to allow uploads:

CREATE POLICY "Public Read Access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'public-assets');

CREATE POLICY "Admin Write Access"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'public-assets');

CREATE POLICY "Admin Delete Access"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'public-assets');
        `);
      }
    } else {
      console.log("✅ Bucket 'public-assets' already exists.");
    }
  }
}

setup().catch(console.error);
