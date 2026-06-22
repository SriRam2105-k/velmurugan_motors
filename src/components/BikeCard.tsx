"use client";

import Link from "next/link";
import Image from "next/image";
import { Fuel, Zap, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import type { Bike } from "@/data/bikes";
import { cn } from "@/lib/utils";


interface BikeCardProps {
  bike: Bike;
  lang: "en" | "ta";
  dict: any;
}

export default function BikeCard({ bike, lang, dict }: BikeCardProps) {

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="group bg-white border border-slate-100 cut-corner overflow-hidden focus-within:overflow-visible transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(226,33,28,0.06),inset_0_0_0_2px_#E2211C] flex flex-col h-full relative">
      {/* Image area */}
      <div className="relative bg-slate-50 h-56 flex items-center justify-center overflow-hidden group-hover:bg-slate-100/85 transition-colors">
        <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent pointer-events-none" />
        
        {/* Bike Image */}
        <div className="relative w-full h-full p-4 transition-transform duration-500 group-hover:scale-110">
          <Image
            src={bike.images.main}
            alt={bike.name}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 300px"
            onError={(e) => {
              // Fallback to icon if image fails
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              target.parentElement?.querySelector(".bike-fallback")?.classList.remove("hidden");
            }}
          />
          {/* Placeholder bike icon if no image or image fails */}
          <div className="bike-fallback hidden absolute inset-0 flex flex-col items-center justify-center text-slate-900/10 text-center">
            <div className="text-7xl mb-1 drop-shadow-sm opacity-20">🏍️</div>
            <p className={cn("text-[10px] text-slate-900/20 font-black uppercase", lang === "ta" ? "tracking-normal" : "tracking-[0.3em]")}>{bike.name}</p>
          </div>
        </div>

        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className={cn(
            "text-[10px] font-black px-3 py-1.5 rounded-none uppercase border",
            lang === "ta" ? "tracking-normal" : "tracking-widest",
            bike.category === "commuter" ? "bg-blue-50 text-blue-600 border-blue-100" :
            bike.category === "sport" ? "bg-red-50 text-[#e11d2a] border-red-100" :
            bike.category === "scooter" ? "bg-purple-50 text-purple-600 border-purple-100" :
            bike.category === "premium" ? "bg-amber-50 text-amber-600 border-amber-100" :
            "bg-slate-50 text-slate-600 border-slate-100"
          )}>
            {dict.bike_card.categories[bike.category as keyof typeof dict.bike_card.categories] || bike.category}
          </span>
        </div>
        
        {bike.isBestSeller && (
          <div className="absolute top-4 right-4">
            <span className={cn("bg-[#E2211C] text-white text-[10px] font-black px-3 py-1.5 uppercase shadow-lg shadow-red-900/40", lang === "ta" ? "tracking-normal" : "tracking-widest")}>
              {dict.bike_card.top_choice}
            </span>
          </div>
        )}
        
        {bike.isNew && !bike.isBestSeller && (
          <div className="absolute top-4 right-4">
            <span className={cn("bg-green-600 text-white text-[10px] font-black px-3 py-1.5 uppercase shadow-lg shadow-green-900/40", lang === "ta" ? "tracking-normal" : "tracking-widest")}>
              {dict.bike_card.new_badge}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="mb-6 min-h-[4rem]">
          <h3 className="font-black text-lg xl:text-xl text-slate-900 leading-none uppercase tracking-tight mb-2 group-hover:text-[#E2211C] transition-colors">{bike.name}</h3>
          <p className={cn("text-slate-500 text-[10px] xl:text-xs font-bold uppercase leading-relaxed line-clamp-2", lang === "ta" ? "tracking-normal" : "tracking-widest")}>{dict.bike_models?.[bike.slug]?.tagline || bike.tagline}</p>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="flex flex-col gap-1 border-l-2 border-slate-100 pl-3">
            <p className={cn("text-[9px] xl:text-[10px] text-gray-500 font-black uppercase whitespace-nowrap", lang === "ta" ? "tracking-normal" : "tracking-widest")}>{dict.bike_card.mileage}</p>
            <p className="text-xs xl:text-sm font-black text-slate-800 tracking-tight">{bike.specs.mileage}</p>
          </div>
          <div className="flex flex-col gap-1 border-l-2 border-slate-100 pl-3">
            <p className={cn("text-[9px] xl:text-[10px] text-gray-500 font-black uppercase whitespace-nowrap", lang === "ta" ? "tracking-normal" : "tracking-widest")}>{dict.bike_card.engine}</p>
            <p className="text-xs xl:text-sm font-black text-slate-800 tracking-tight">{bike.specs.engine}</p>
          </div>
        </div>

        {/* Price & EMI */}
        <div className="mt-auto pt-6 border-t border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3 sm:gap-2">
            <div>
              <p className={cn("text-[9px] xl:text-[10px] text-gray-500 font-black uppercase mb-1 whitespace-nowrap", lang === "ta" ? "tracking-normal" : "tracking-widest")}>{dict.bike_card.price_starts_at}</p>
              <p className="text-xl xl:text-2xl font-black text-[#E2211C] tracking-tighter whitespace-nowrap">{formatCurrency(bike.price.exShowroom)}</p>
            </div>
            <div className="text-left sm:text-right">
              <p className={cn("text-[9px] xl:text-[10px] text-gray-500 font-black uppercase mb-1 whitespace-nowrap", lang === "ta" ? "tracking-normal" : "tracking-widest")}>{dict.bike_card.easy_emi}</p>
              <p className="text-xs xl:text-sm font-black text-slate-800 tracking-tight whitespace-nowrap">{formatCurrency(bike.price.emiStarting)}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Link
              href={`/${lang}/contact?bike=${bike.slug}`}
              className={cn(
                buttonVariants(),
                "bg-[#E2211C] hover:bg-[#b9101b] hover:scale-[1.02] text-white rounded-none h-12 font-black uppercase tracking-tight shadow-lg shadow-red-900/40 text-xs xl:text-sm transition-all duration-300"
              )}
            >
              <span className="truncate">{dict.bike_card.enquire_now}</span> <ArrowRight className="w-4 h-4 ml-2 shrink-0" />
            </Link>
            <Link
              href={`/${lang}/bikes/${bike.slug}`}
              className={cn(
                buttonVariants({ variant: "secondary" }),
                "bg-slate-800 hover:bg-slate-700 text-white hover:text-white h-10 font-black uppercase text-[9px] xl:text-[10px] transition-colors truncate",
                lang === "ta" ? "tracking-normal" : "tracking-widest"
              )}
            >
              {dict.bike_card.technical_specs}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
