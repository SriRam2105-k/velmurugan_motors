import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "www.heromotocorp.com" },
      // Supabase Storage – used by admin carousel uploads
      { protocol: "https", hostname: "wwbdufcofjknbzduiwzv.supabase.co" },
    ],
  },
};

export default nextConfig;
