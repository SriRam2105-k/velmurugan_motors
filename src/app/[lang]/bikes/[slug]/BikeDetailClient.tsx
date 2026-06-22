"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Fuel, Zap, Settings, MessageCircle, CheckCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bike } from "@/data/bikes";

const colorKeywords: { keyword: string; hex: string }[] = [
  { keyword: "lime", hex: "#a3e635" },
  { keyword: "yellow", hex: "#eab308" },
  { keyword: "orange", hex: "#f97316" },
  { keyword: "red", hex: "#e2211c" },
  { keyword: "blue", hex: "#2563eb" },
  { keyword: "green", hex: "#16a34a" },
  { keyword: "brown", hex: "#78350f" },
  { keyword: "silver", hex: "#cbd5e1" },
  { keyword: "grey", hex: "#475569" },
  { keyword: "gray", hex: "#475569" },
  { keyword: "white", hex: "#f8fafc" },
  { keyword: "black", hex: "#0f172a" },
];

function getColorHex(colorName: string): string {
  const normalized = colorName.toLowerCase();
  for (const item of colorKeywords) {
    if (normalized.includes(item.keyword)) {
      return item.hex;
    }
  }
  return "#94a3b8"; // default gray
}

function isLightColor(colorName: string): boolean {
  const normalized = colorName.toLowerCase();
  return ["white", "silver", "yellow", "lime"].some((word) => normalized.includes(word));
}


export default function BikeDetailClient({ bike, dict, lang }: { bike: Bike; dict: any; lang: string }) {
  // Deduplicate and filter colors that have unique variant images to avoid repeats
  const uniqueColors = (() => {
    if (!bike.images.variants) return bike.colors;
    const list: string[] = [];
    const seenImages = new Set<string>();
    for (const color of bike.colors) {
      if (color in bike.images.variants) {
        const img = bike.images.variants[color];
        if (img && !seenImages.has(img)) {
          seenImages.add(img);
          list.push(color);
        }
      }
    }
    return list.length > 0 ? list : bike.colors;
  })();

  const [selectedColor, setSelectedColor] = useState(uniqueColors[0] || "");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const specs = [
    { icon: Fuel, label: dict.bikes.details.mileage, value: bike.specs.mileage },
    { icon: Settings, label: dict.bikes.details.engine, value: bike.specs.engine },
    { icon: Zap, label: dict.bikes.details.power, value: bike.specs.power },
  ];

  const selectedDotColor = getColorHex(selectedColor);
  const isLightSelectedColor = isLightColor(selectedColor);

  const whatsappMessage = dict.bikes.details.whatsapp_message.replace("{bike}", `${bike.name} (${selectedColor} color)`);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      {/* Bike Visual */}
      <div className="lg:sticky lg:top-24">
        <div className="rounded-3xl overflow-hidden shadow-inner relative">
          {/* Image container — no filters, no overlays */}
          <div className="bg-gradient-to-br from-slate-100 to-slate-200 h-80 lg:h-96 flex items-center justify-center relative group">
            <Image
              src={bike.images.variants?.[selectedColor] || bike.images.main}
              alt={`${bike.name} ${selectedColor}`}
              fill
              className="object-contain p-8 transition-transform duration-700 ease-in-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 500px"
              priority
            />
          </div>
          {/* Color accent bar — subtle colored strip at the bottom */}
          <div
            className="h-1.5 w-full transition-colors duration-500 ease-in-out"
            style={{ backgroundColor: selectedDotColor }}
          />
        </div>

        {/* Color Selector */}
        <div className="mt-6 bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-800 text-sm uppercase tracking-wide">
              {dict.bikes.details.available_colors}
            </h3>
            {/* Active color indicator */}
            <div className="flex items-center gap-2">
              <span
                className={`w-5 h-5 rounded-full shadow-sm transition-colors duration-500 ${isLightSelectedColor ? "border-2 border-slate-300" : "border-2 border-black/10"}`}
                style={{ backgroundColor: selectedDotColor }}
              />
              <span className="text-xs font-bold text-slate-700 uppercase tracking-tight">{selectedColor}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {uniqueColors.map((color) => {
              const isSelected = selectedColor === color;
              const dotColor = getColorHex(color);
              const isLight = isLightColor(color);
              return (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  title={color}
                  className={`relative w-10 h-10 rounded-full transition-all duration-300 ${
                    isSelected
                      ? "ring-2 ring-offset-2 ring-slate-800 scale-110"
                      : "hover:scale-110 hover:ring-2 hover:ring-offset-1 hover:ring-slate-300"
                  }`}
                >
                  <span
                    className={`block w-full h-full rounded-full shadow-sm ${isLight ? "border-2 border-slate-300" : "border-2 border-black/10"}`}
                    style={{ backgroundColor: dotColor }}
                  />
                  {isSelected && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <CheckCircle className={`w-4 h-4 ${isLight ? "text-slate-700" : "text-white"} drop-shadow-sm`} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <p className="text-[10px] text-slate-400 mt-4 italic uppercase tracking-wider">
            {dict.bikes.details.color_disclaimer}
          </p>
        </div>
      </div>

      {/* Bike Details */}
      <div>
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge className="bg-[#e2211c]/10 text-[#e2211c] border-[#e2211c]/20 capitalize px-3 py-1">
            {dict.bikes.categories[bike.category as keyof typeof dict.bikes.categories] || bike.category}
          </Badge>
          {bike.isBestSeller && <Badge className="bg-[#e2211c] text-white border-0 px-3 py-1">{dict.bikes.details.best_seller}</Badge>}
          {bike.isNew && <Badge className="bg-green-600 text-white border-0 px-3 py-1">{dict.bikes.details.new_launch}</Badge>}
        </div>
        <h1 className="text-4xl font-black text-slate-900 mb-2 uppercase tracking-tighter">{bike.name}</h1>
        <p className="text-slate-500 text-lg mb-6 font-medium">{dict.bike_models?.[bike.slug]?.tagline || bike.tagline}</p>

        {/* Price */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 relative z-10">
            <div>
              <p className="text-sm text-slate-400 mb-1 uppercase font-bold tracking-widest">{dict.bikes.details.price}</p>
              <p className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tighter">{formatCurrency(bike.price.exShowroom)}</p>
              <div className="flex flex-col gap-1 mt-3">
                <p className="text-sm text-slate-500 font-medium">
                  {dict.bikes.details.on_road_price} <span className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">{formatCurrency(bike.price.onRoad)}</span>
                </p>
                <p className="text-sm text-slate-500 font-medium">
                  {dict.bikes.details.emi_starts} <span className="font-bold text-[#e2211c] bg-red-50 px-2 py-0.5 rounded">{formatCurrency(bike.price.emiStarting)}</span>
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:min-w-[200px]">
              <Link
                href={`/${lang}/contact?bike=${bike.slug}&color=${encodeURIComponent(selectedColor)}`}
                className={buttonVariants({
                  className:
                    "bg-[#e2211c] hover:bg-[#b91c1c] text-white rounded-full font-black uppercase tracking-tight shadow-lg shadow-red-200 py-6 transition-all hover:scale-105 active:scale-95",
                })}
              >
                {dict.bikes.details.enquire}
              </Link>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919XXXXXXXXX"}?text=${encodeURIComponent(whatsappMessage)}`}
                onClick={() => {
                  fetch("/api/analytics", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ type: "whatsapp" }),
                  }).catch(console.error);
                }}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold py-3 px-4 rounded-full text-sm transition-all hover:scale-105 active:scale-95 shadow-md shadow-green-200"
              >
                <MessageCircle className="w-5 h-5" /> {dict.contact.cards.whatsapp}
              </a>
            </div>
          </div>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {specs.map((spec) => (
            <div key={spec.label} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                <spec.icon className="w-6 h-6 text-[#e2211c]" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">{spec.label}</p>
                <p className="text-base font-black text-slate-800 tracking-tight">{spec.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="font-black text-slate-900 mb-5 uppercase tracking-tight text-lg">{dict.bikes.details.features}</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
            {(dict.bike_models?.[bike.slug]?.features || bike.features).map((feature: string) => (
              <li key={feature} className="flex items-start gap-3 group">
                <div className="mt-0.5 w-6 h-6 rounded-full bg-red-50 flex items-center justify-center shrink-0 group-hover:bg-[#e2211c] transition-colors duration-300">
                  <CheckCircle className="w-4 h-4 text-[#e2211c] group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="text-slate-700 text-sm font-semibold">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
