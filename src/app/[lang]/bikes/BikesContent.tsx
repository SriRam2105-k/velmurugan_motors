"use client";

import { useState } from "react";
import BikeCard from "@/components/BikeCard";
import type { Bike } from "@/data/bikes";
import { cn } from "@/lib/utils";

const categories = ["all", "commuter", "premium", "sport", "scooter"] as const;

export default function BikesContent({ lang, dict, bikes }: { lang: "en" | "ta", dict: any, bikes: Bike[] }) {
  
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]>("all");

  const filteredBikes = activeCategory === "all" 
    ? bikes 
    : bikes.filter(b => b.category === activeCategory);

  return (
    <>
      {/* Page Header */}
      <section className="bg-[#0f172a] pt-24 sm:pt-32 pb-10 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className={cn("text-[#e2211c] text-sm font-semibold uppercase mb-2", lang === "ta" ? "tracking-normal" : "tracking-widest")}>{dict.bikes.header.subtitle}</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">{dict.bikes.header.title}</h1>
          <p className="text-white/60 text-lg max-w-2xl">
            {dict.bikes.header.desc}
          </p>
        </div>
      </section>

      {/* Bikes Grid */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Pills */}
          <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 sm:flex-wrap mb-10 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-3 sm:px-5 py-2 rounded-full text-[12px] sm:text-sm font-bold border transition-all shadow-sm whitespace-nowrap",
                  activeCategory === cat 
                    ? "bg-[#e2211c] border-[#e2211c] text-white" 
                    : "bg-white border-slate-200 text-slate-600 hover:border-[#e2211c]/50"
                )}
              >
                {cat === "all" 
                  ? `${dict.bikes.categories[cat]} (${bikes.length})` 
                  : `${dict.bikes.categories[cat]} (${bikes.filter((b) => b.category === cat).length})`}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 min-h-[400px] bike-card-grid transition-opacity duration-200">
            {filteredBikes.map((bike) => (
              <BikeCard key={bike.id} bike={bike} lang={lang} dict={dict} />
            ))}
            {filteredBikes.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-20 text-slate-400">
                <p className="text-lg font-medium">{dict.bikes.no_results}</p>
              </div>
            )}
          </div>

          {/* Disclaimer */}
          <p className="text-slate-400 text-xs mt-12 text-center">
            {dict.bikes.disclaimer}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{dict.bikes.cta.title}</h2>
          <p className="text-slate-500 mb-6">{dict.bikes.cta.desc}</p>
          <a
            href={`/${lang}/contact`}
            className="inline-flex items-center gap-2 bg-[#e2211c] hover:bg-[#b91c1c] text-white font-semibold px-8 py-3 rounded-full transition-all hover:scale-105 shadow-lg shadow-red-200"
          >
            {dict.bikes.cta.button}
          </a>
        </div>
      </section>
    </>
  );
}
