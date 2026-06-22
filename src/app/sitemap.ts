import type { MetadataRoute } from "next";
import { bikes } from "@/data/bikes";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://velmuruganmotors.in";
  
  const routes = [
    { url: base, priority: 1.0 },
    { url: `${base}/bikes`, priority: 0.9 },
    { url: `${base}/services`, priority: 0.8 },
    { url: `${base}/gallery`, priority: 0.7 },
    { url: `${base}/about`, priority: 0.7 },
    { url: `${base}/contact`, priority: 0.9 },
  ];

  const bikeRoutes = bikes.map((bike) => ({
    url: `${base}/bikes/${bike.slug}`,
    priority: 0.8,
  }));

  // Create routes for both languages (en and ta)
  const languages = ["en", "ta"];
  const localizedRoutes = languages.flatMap((lang) => 
    [...routes, ...bikeRoutes].map((r) => {
      const url = r.url === base ? `${base}/${lang}` : r.url.replace(base, `${base}/${lang}`);
      return {
        url,
        priority: r.priority,
      };
    })
  );

  return localizedRoutes.map((r) => ({
    url: r.url,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: r.priority,
  }));
}
