"use client";

import { MessageCircle } from "lucide-react";
import en from "@/dictionaries/en.json";
import ta from "@/dictionaries/ta.json";

const dictionaries = { en, ta };

export default function WhatsAppFloat({ lang }: { lang: "en" | "ta" }) {
  const dict = dictionaries[lang];
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919XXXXXXXXX";
  const message = encodeURIComponent(
    lang === "ta" 
      ? "வணக்கம் வேல்முருகன் மோட்டார்ஸ்! நான் ஹீரோ பைக்குகள் பற்றி விசாரிக்க விரும்புகிறேன்." 
      : "Hello Velmurugan Motors! I would like to inquire about your Hero bikes."
  );
  const href = `https://wa.me/${number}?text=${message}`;

  return (
    <a
      id="whatsapp-float-btn"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={dict.common.chat_with_us}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-2xl shadow-green-500/40 hover:scale-110 hover:shadow-green-500/60 transition-all duration-300 group"
    >
      <MessageCircle className="w-7 h-7" />
      <span className="absolute right-16 bg-[#0a0a0a] text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-2xl border border-white/10">
        {dict.common.chat_with_us}
      </span>
    </a>
  );
}
