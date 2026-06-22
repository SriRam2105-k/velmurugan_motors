import type { Metadata } from "next";
import { getDictionary } from "@/dictionaries/getDictionary";
import { getGalleryImages } from "@/data/gallery";
import GalleryContent from "./GalleryContent";

export const metadata: Metadata = {
  title: "Gallery – Hero Velmurugan Motors Madurai",
  description: "Browse photos of our Hero MotoCorp showroom, bike deliveries, events, and happy customers at Velmurugan Motors, Madurai.",
};

// ISR: revalidate every 6 hours (gallery changes infrequently)
export const revalidate = 21600;

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ lang: "en" | "ta" }>;
}) {
  const { lang } = await params;
  const [dict, images] = await Promise.all([getDictionary(lang), getGalleryImages()]);

  return <GalleryContent lang={lang} dict={dict} images={images} />;
}
