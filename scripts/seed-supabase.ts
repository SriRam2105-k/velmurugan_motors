/**
 * seed-supabase.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * One-time script to seed the Supabase `bikes` table from the static bikes.ts
 *
 * Usage (from project root):
 *   npx tsx scripts/seed-supabase.ts
 *
 * Requirements:
 *   npm install -D tsx
 *   NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set
 *   (either in .env.local or as environment variables)
 *
 * ─────────────────────────────────────────────────────────────────────────────
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
  console.error(
    "❌  Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local"
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// ─── Inline bike data (copy of src/data/bikes.ts to avoid TS path resolution) ─

const bikes = [
  { id: 1, slug: "hf-deluxe", name: "HF Deluxe", category: "commuter", tagline: "Sabse Bharosemand, Sabse Sasta", in_stock: true, is_best_seller: false, is_new: false, mileage: "60 kmpl", engine: "97.2cc", power: "8.02 bhp", colors: ["Bank Funk Lime Yellow","Black Grey Stripe","Black Nexus Blue","Black Red Stripe"], price_ex_showroom: 64218, price_on_road: 76406, price_emi_starting: 2197, image_main: "/bikes/hf-deluxe/main.png", image_variants: {"Bank Funk Lime Yellow":"/bikes/HF Deluxe/Bank Funk Lime Yellow.jpg","Black Grey Stripe":"/bikes/HF Deluxe/Black Grey Stripe.jpg","Black Nexus Blue":"/bikes/HF Deluxe/Black Nexus Blue.jpg","Black Red Stripe":"/bikes/HF Deluxe/Black Red Stripe.jpg"}, features: ["Integrated Braking System","Tubeless Tyres","Long Seat","Side Stand Engine Cut-off"] },
  { id: 2, slug: "hf-deluxe-pro", name: "HF Deluxe Pro", category: "commuter", tagline: "More Features, Same Trust", in_stock: true, is_best_seller: false, is_new: false, mileage: "60 kmpl", engine: "97.2cc", power: "8.02 bhp", colors: ["Bank Funk Lime Yellow","Black Grey Stripe","Black Nexus Blue","Black Red Stripe"], price_ex_showroom: 68000, price_on_road: 80500, price_emi_starting: 2300, image_main: "/bikes/hf-deluxe-pro/main.png", image_variants: {"Bank Funk Lime Yellow":"/bikes/HF Deluxe/Bank Funk Lime Yellow.jpg","Black Grey Stripe":"/bikes/HF Deluxe/Black Grey Stripe.jpg","Black Nexus Blue":"/bikes/HF Deluxe/Black Nexus Blue.jpg","Black Red Stripe":"/bikes/HF Deluxe/Black Red Stripe.jpg"}, features: ["Self Start","Alloy Wheels","Integrated Braking System","Tubeless Tyres"] },
  { id: 3, slug: "splendor-plus", name: "Splendor Plus", category: "commuter", tagline: "India's Most Trusted Bike", in_stock: true, is_best_seller: true, is_new: false, mileage: "70 kmpl", engine: "97.2cc", power: "7.91 bhp", colors: ["Black Heavy Grey","Black Red Purple","Blue Black","Force Silver","Sports Red Black"], price_ex_showroom: 75039, price_on_road: 89943, price_emi_starting: 2600, image_main: "/bikes/splendor-plus/main.png", image_variants: {"Black Heavy Grey":"/bikes/Splendor +/Black Heavy Grey.jpg","Black Red Purple":"/bikes/Splendor +/Black Red Purple.jpg","Blue Black":"/bikes/Splendor +/Blue Black.jpg","Force Silver":"/bikes/Splendor +/Force Silver.jpg","Sports Red Black":"/bikes/Splendor +/Sports Red Black.jpg"}, features: ["i3S Technology","Integrated Braking System","USB Charging Port","Tubeless Tyres"] },
  { id: 4, slug: "splendor-plus-20", name: "Splendor Plus 2.0", category: "commuter", tagline: "New Look, Legendary Mileage", in_stock: true, is_best_seller: false, is_new: false, mileage: "70 kmpl", engine: "97.2cc", power: "7.91 bhp", colors: ["Black Heavy Grey","Matte Grey","Nobel Red"], price_ex_showroom: 78000, price_on_road: 92000, price_emi_starting: 2700, image_main: "/bikes/splendor-plus-2o/main.png", image_variants: {"Black Heavy Grey":"/bikes/Splendor + XTEC 2.0/Black Heavy Grey.jpg","Matte Grey":"/bikes/Splendor + XTEC 2.0/Matte Grey.jpg","Nobel Red":"/bikes/Splendor + XTEC 2.0/Nobel Red.jpg"}, features: ["Refreshed Design","i3S Technology","USB Charging Port","Integrated Braking System"] },
  { id: 5, slug: "splendor-plus-xtec", name: "Splendor Plus Xtec", category: "commuter", tagline: "Splendor with Smart Tech", in_stock: true, is_best_seller: false, is_new: false, mileage: "68 kmpl", engine: "97.2cc", power: "7.91 bhp", colors: ["Black Sparking Blue","Black Tornado Grey","Red Black"], price_ex_showroom: 79703, price_on_road: 94000, price_emi_starting: 2750, image_main: "/bikes/splendor-plus-xtec/main.png", image_variants: {"Black Sparking Blue":"/bikes/Splendor + XTEC/Black Sparking Blue.jpg","Black Tornado Grey":"/bikes/Splendor + XTEC/Black Tornado Grey.jpg","Red Black":"/bikes/Splendor + XTEC/Red Black.jpg"}, features: ["Bluetooth Connectivity","LED Projector Headlamp","i3S Technology","USB Charging Port"] },
  { id: 6, slug: "passion-pro", name: "Passion Pro", category: "commuter", tagline: "Stylish, Efficient, Reliable", in_stock: true, is_best_seller: false, is_new: false, mileage: "56 kmpl", engine: "113.2cc", power: "9.15 bhp", colors: ["Black Brown Stripes","Black Heavy Grey","Black Nexus Blue","Sports Red Black"], price_ex_showroom: 74000, price_on_road: 88000, price_emi_starting: 2550, image_main: "/bikes/passion-plus/main.png", image_variants: {"Black Brown Stripes":"/bikes/Passion/Black Brown Stripes.jpg","Black Heavy Grey":"/bikes/Passion/Black Heavy Grey.jpg","Black Nexus Blue":"/bikes/Passion/Black Nexus Blue.jpg","Sports Red Black":"/bikes/Passion/Sports Red Black.jpg"}, features: ["LED Projector Headlamp","Tubeless Tyres","Self Start","Side Stand Engine Cut-off"] },
  { id: 7, slug: "super-splendor-125", name: "Super Splendor 125", category: "premium", tagline: "125cc Power, Splendor Trust", in_stock: true, is_best_seller: false, is_new: false, mileage: "68 kmpl", engine: "124.7cc", power: "10.72 bhp", colors: ["Glossy Black","Candy Blazing Red","Matt Axis Grey","Matt Nexus Blue","Matt Chestnut Brown"], price_ex_showroom: 83448, price_on_road: 98000, price_emi_starting: 2850, image_main: "/bikes/super-splendor-125/main.png", image_variants: null, features: ["125cc Engine","i3S Technology","Integrated Braking System","Digital Console"] },
  { id: 8, slug: "glamour-xtec-125", name: "Glamour Xtec 125", category: "premium", tagline: "Smart Style for Every Road", in_stock: true, is_best_seller: true, is_new: false, mileage: "65 kmpl", engine: "124.7cc", power: "11.4 bhp", colors: ["Black Metalic Silver","Black Sports Red","Candy Blazing Red","Techno Blu Met Blk"], price_ex_showroom: 88137, price_on_road: 103000, price_emi_starting: 3000, image_main: "/bikes/glamour-xtec-125/main.png", image_variants: {"Black Metalic Silver":"/bikes/Glamour XTEC 125/Black Metalic Silver.jpg","Black Sports Red":"/bikes/Glamour XTEC 125/Black Sports Red.jpg","Candy Blazing Red":"/bikes/Glamour XTEC 125/Candy Blazing Red.jpg","Techno Blu Met Blk":"/bikes/Glamour XTEC 125/Techno Blu Met Blk.jpg"}, features: ["Bluetooth Connectivity","LED Projector Headlamp","TFT Instrument Cluster","USB Charging Port"] },
  { id: 9, slug: "xtreme-125", name: "Xtreme 125R", category: "sport", tagline: "Born to Race, Built to Thrill", in_stock: true, is_best_seller: true, is_new: false, mileage: "60 kmpl", engine: "124.7cc", power: "11.4 bhp", colors: ["Black Leaf Green","Black Mattshadow Grey","Black Pearl Red"], price_ex_showroom: 90800, price_on_road: 107000, price_emi_starting: 3100, image_main: "/bikes/xtreme-125/main.png", image_variants: {"Black Leaf Green":"/bikes/Xtreme 125R/Black Leaf Green.jpg","Black Mattshadow Grey":"/bikes/Xtreme 125R/Black Mattshadow Grey.jpg","Black Pearl Red":"/bikes/Xtreme 125R/Black Pearl Red.jpg"}, features: ["Sport Design","LED Headlamp","Digital Console","Disc Brake"] },
  { id: 10, slug: "pleasure-plus-110", name: "Pleasure+ 110", category: "scooter", tagline: "Why Should Boys Have All the Fun?", in_stock: true, is_best_seller: false, is_new: false, mileage: "50 kmpl", engine: "110.9cc", power: "8 bhp", colors: ["Copper Brown","Matte Black","Matte Vernier Grey","Pearl Blue"], price_ex_showroom: 69766, price_on_road: 84000, price_emi_starting: 2400, image_main: "/bikes/pleasure-plus-110/main.png", image_variants: {"Copper Brown":"/bikes/Pleasure +XTEC/Copper Brown.jpg","Matte Black":"/bikes/Pleasure +XTEC/Matte Black.jpg","Matte Vernier Grey":"/bikes/Pleasure +XTEC/Matte Vernier Grey.jpg","Pearl Blue":"/bikes/Pleasure +XTEC/Pearl Blue.jpg"}, features: ["Lightweight Design","Under Seat Storage","Front Pockets","LED Tail Lamp"] },
  { id: 11, slug: "pleasure-xtec", name: "Pleasure+ Xtec", category: "scooter", tagline: "Smart Scooter for Smart Riders", in_stock: true, is_best_seller: false, is_new: false, mileage: "50 kmpl", engine: "110.9cc", power: "8 bhp", colors: ["Copper Brown","Matte Black","Matte Vernier Grey","Pearl Blue"], price_ex_showroom: 75712, price_on_road: 90000, price_emi_starting: 2600, image_main: "/bikes/pleasure-xtec/main.png", image_variants: {"Copper Brown":"/bikes/Pleasure +XTEC/Copper Brown.jpg","Matte Black":"/bikes/Pleasure +XTEC/Matte Black.jpg","Matte Vernier Grey":"/bikes/Pleasure +XTEC/Matte Vernier Grey.jpg","Pearl Blue":"/bikes/Pleasure +XTEC/Pearl Blue.jpg"}, features: ["Bluetooth Connectivity","LED Projector Headlamp","USB Charging Port","Digital Console"] },
  { id: 12, slug: "xoom-110", name: "Xoom 110", category: "scooter", tagline: "Zoom Through Every Street", in_stock: true, is_best_seller: false, is_new: false, mileage: "45 kmpl", engine: "110.9cc", power: "8.05 bhp", colors: ["Black","Moon Yellow","Polestar Blue"], price_ex_showroom: 72701, price_on_road: 87000, price_emi_starting: 2500, image_main: "/bikes/xoom-110/main.png", image_variants: {"Black":"/bikes/Xoom 110/Black.jpg","Moon Yellow":"/bikes/Xoom 110/Moon Yellow.jpg","Polestar Blue":"/bikes/Xoom 110/Polestar Blue.jpg"}, features: ["Modern Design","Under Seat Storage","LED Headlamp","Alloy Wheels"] },
  { id: 13, slug: "destini-xtec-125", name: "Destini 125 Xtec", category: "scooter", tagline: "125cc Power, Every Day", in_stock: true, is_best_seller: true, is_new: false, mileage: "56 kmpl", engine: "124.7cc", power: "9.8 bhp", colors: ["Groovy Red","Gun Metal Grey","Mystique Magenta"], price_ex_showroom: 75838, price_on_road: 91000, price_emi_starting: 2650, image_main: "/bikes/destini-xtec-125/main.png", image_variants: {"Groovy Red":"/bikes/Destini XTEC 125/Groovy Red.jpg","Gun Metal Grey":"/bikes/Destini XTEC 125/Gun Metal Grey.jpg","Mystique Magenta":"/bikes/Destini XTEC 125/Mystique Magenta.jpg"}, features: ["125cc Engine","Bluetooth Connectivity","LED Projector Headlamp","USB Charging Port"] },
];

async function seed() {
  console.log("🌱 Seeding bikes table...\n");

  let seeded = 0;
  let skipped = 0;

  for (const bike of bikes) {
    const { error } = await supabase
      .from("bikes")
      .upsert(bike as any, { onConflict: "slug" });

    if (error) {
      console.error(`  ❌ ${bike.name}: ${error.message}`);
    } else {
      console.log(`  ✅ ${bike.name}`);
      seeded++;
    }
  }

  console.log(`\n🎉 Done! ${seeded} bikes seeded, ${skipped} skipped.`);
  console.log("\nNext steps:");
  console.log("  1. Go to your Supabase dashboard → Table Editor → bikes");
  console.log("  2. Verify all 13 rows are present");
  console.log("  3. Apply the RLS policies from the SQL editor");
}

seed().catch(console.error);
