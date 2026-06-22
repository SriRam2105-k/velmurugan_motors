import { Metadata } from "next";
import { getDictionary } from "@/dictionaries/getDictionary";
import { getBestSellers, getScooters } from "@/data/bikes-db";
import { getCarouselImages } from "@/data/carousel";
import HomeContent from "./HomeContent";

// ISR: revalidate every hour
export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (rawLang === "en" || rawLang === "ta" ? rawLang : "ta") as "en" | "ta";
  const dict = await getDictionary(lang);
  
  return {
    title: dict.common.home + " | Velmurugan Motors",
    description: dict.home.hero.features.join(" - "),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = (rawLang === "en" || rawLang === "ta" ? rawLang : "ta") as "en" | "ta";
  const [dict, bestSellers, scooters, dynamicCarousel] = await Promise.all([
    getDictionary(lang),
    getBestSellers(),
    getScooters(),
    getCarouselImages(),
  ]);

  return <HomeContent lang={lang} dict={dict} bestSellers={bestSellers} scooters={scooters} dynamicCarousel={dynamicCarousel} />;
}
