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
  experimental: {
    // Tree-shake large libraries to reduce JS bundle size & parse time
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
};

export default nextConfig;
