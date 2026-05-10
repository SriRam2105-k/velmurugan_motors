"use client";

import { useParams } from "next/navigation";
import en from "@/dictionaries/en.json";
import ta from "@/dictionaries/ta.json";
import { cn } from "@/lib/utils";

const dictionaries = { en, ta };

export default function GalleryPage() {
  const params = useParams();
  const lang = (params.lang as "en" | "ta") || "ta";
  const dict = dictionaries[lang];

  const galleryItems = [
    { id: 1, category: dict.gallery.categories["Showroom"], label: dict.gallery.items["Our Showroom"], emoji: "🏪" },
    { id: 2, category: dict.gallery.categories["Bikes"], label: dict.gallery.items["Splendor Plus"], emoji: "🏍️" },
    { id: 3, category: dict.gallery.categories["Events"], label: dict.gallery.items["Bike Launch Event"], emoji: "🎉" },
    { id: 4, category: dict.gallery.categories["Bikes"], label: dict.gallery.items["Xtreme 160R"], emoji: "🏍️" },
    { id: 5, category: dict.gallery.categories["Customers"], label: dict.gallery.items["Happy Customer"], emoji: "😊" },
    { id: 6, category: dict.gallery.categories["Showroom"], label: dict.gallery.items["Service Bay"], emoji: "🔧" },
    { id: 7, category: dict.gallery.categories["Bikes"], label: dict.gallery.items["Glamour"], emoji: "🏍️" },
    { id: 8, category: dict.gallery.categories["Events"], label: dict.gallery.items["Diwali Offers"], emoji: "🪔" },
    { id: 9, category: dict.gallery.categories["Customers"], label: dict.gallery.items["Delivery Day"], emoji: "🎊" },
    { id: 10, category: dict.gallery.categories["Bikes"], label: dict.gallery.items["XPulse 200"], emoji: "🏍️" },
    { id: 11, category: dict.gallery.categories["Showroom"], label: dict.gallery.items["Spare Parts Section"], emoji: "⚙️" },
    { id: 12, category: dict.gallery.categories["Customers"], label: dict.gallery.items["First Ride!"], emoji: "🏆" },
  ];

  const categories = [
    dict.gallery.categories["All"],
    dict.gallery.categories["Showroom"],
    dict.gallery.categories["Bikes"],
    dict.gallery.categories["Events"],
    dict.gallery.categories["Customers"]
  ];

  return (
    <>
      {/* Header */}
      <section className="bg-[#0f172a] pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className={cn("text-[#e2211c] text-sm font-semibold uppercase mb-2", lang === "ta" ? "tracking-normal" : "tracking-widest")}>{dict.gallery.header.subtitle}</p>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">{dict.gallery.header.title}</h1>
          <p className="text-white/60 text-lg max-w-2xl">
            {dict.gallery.header.desc}
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white sticky top-16 z-10 border-b border-slate-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 sm:gap-3 flex-wrap">
            {categories.map((cat) => (
              <span
                key={cat}
                className="px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-bold border border-slate-200 bg-slate-50 text-slate-600 cursor-default select-none hover:border-[#e2211c] hover:text-[#e2211c] transition-colors whitespace-nowrap shadow-sm"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className="group relative bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl overflow-hidden aspect-square flex flex-col items-center justify-center hover:shadow-xl hover:shadow-slate-300 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                <div className="text-5xl mb-2">{item.emoji}</div>
                <div className="absolute inset-0 bg-[#0f172a]/0 group-hover:bg-[#0f172a]/60 transition-all duration-300 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100">
                  <p className="text-white font-semibold text-sm px-3 text-center">{item.label}</p>
                  <span className="mt-2 text-xs text-white/60 bg-[#e2211c] px-2 py-0.5 rounded-full">{item.category}</span>
                </div>
                <p className="absolute bottom-2 left-3 text-xs font-medium text-slate-500">{item.label}</p>
              </div>
            ))}
          </div>

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
