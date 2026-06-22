"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { GalleryImage } from "@/data/gallery";

type CategoryKey = "All" | "Showroom" | "Bikes" | "Events" | "Customers";

interface GalleryContentProps {
  lang: "en" | "ta";
  dict: any;
  images: GalleryImage[];
}

export default function GalleryContent({ lang, dict, images }: GalleryContentProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("All");

  const categories: { key: CategoryKey; label: string }[] = [
    { key: "All", label: dict.gallery.categories["All"] },
    { key: "Showroom", label: dict.gallery.categories["Showroom"] },
    { key: "Bikes", label: dict.gallery.categories["Bikes"] },
    { key: "Events", label: dict.gallery.categories["Events"] },
    { key: "Customers", label: dict.gallery.categories["Customers"] },
  ];

  const filteredImages =
    activeCategory === "All"
      ? images
      : images.filter((img) => img.category === activeCategory);

  return (
    <>
      {/* Header */}
      <section className="bg-[#0f172a] pt-24 sm:pt-32 pb-10 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className={cn("text-[#e2211c] text-sm font-semibold uppercase mb-2", lang === "ta" ? "tracking-normal" : "tracking-widest")}>{dict.gallery.header.subtitle}</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">{dict.gallery.header.title}</h1>
          <p className="text-white/60 text-lg max-w-2xl">
            {dict.gallery.header.desc}
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white sticky top-[72px] lg:top-20 z-10 border-b border-slate-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 sm:flex-wrap scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={cn(
                  "px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-bold border transition-all whitespace-nowrap shadow-sm cursor-pointer",
                  activeCategory === cat.key
                    ? "bg-[#e2211c] border-[#e2211c] text-white"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:border-[#e2211c]/50"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredImages.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 min-h-[300px]">
              {filteredImages.map((img) => {
                const category = dict.gallery.categories[img.category as CategoryKey] || img.category || "";
                const label = img.caption || "";
                return (
                  <div
                    key={img.id}
                    className="group relative bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl overflow-hidden aspect-square hover:shadow-xl hover:shadow-slate-300 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  >
                    {img.url ? (
                      <Image
                        src={img.url}
                        alt={label || category}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl">🏍️</div>
                    )}
                    <div className="absolute inset-0 bg-[#0f172a]/0 group-hover:bg-[#0f172a]/60 transition-all duration-300 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100">
                      {label && <p className="text-white font-semibold text-sm px-3 text-center">{label}</p>}
                      {category && <span className="mt-2 text-xs text-white/60 bg-[#e2211c] px-2 py-0.5 rounded-full">{category}</span>}
                    </div>
                    {label && <p className="absolute bottom-2 left-3 text-xs font-medium text-slate-500 group-hover:opacity-0 transition-opacity">{label}</p>}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="min-h-[300px] flex flex-col items-center justify-center text-slate-400 gap-3">
              <div className="text-5xl">📷</div>
              <p className="text-lg font-medium">No photos in this category yet.</p>
              <p className="text-sm">Check back soon — more photos are on the way!</p>
            </div>
          )}

          <p className="text-center text-slate-400 text-sm mt-10">
            {dict.gallery.footer.text_1}
            <a href="https://www.facebook.com/p/Velmurugan-Motors-100083339882347/" target="_blank" rel="noopener noreferrer" className="text-[#e2211c] hover:underline font-medium">{dict.gallery.footer.facebook}</a>
            {dict.gallery.footer.and}
            <a href="#" className="text-[#e2211c] hover:underline font-medium">{dict.gallery.footer.instagram}</a>
            {dict.gallery.footer.text_2}
          </p>
        </div>
      </section>
    </>
  );
}
