"use client";

import { MessageCircle, Settings2 } from "lucide-react";

export default function WhatsAppFloat({ lang, dict }: { lang: "en" | "ta", dict: any }) {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919XXXXXXXXX";
  const message = encodeURIComponent(
    lang === "ta" 
      ? "வணக்கம் வேல்முருகன் மோட்டார்ஸ்! நான் ஹீரோ பைக்குகள் பற்றி விசாரிக்க விரும்புகிறேன்." 
      : "Hello Velmurugan Motors! I would like to inquire about your Hero bikes."
  );
  const href = `https://wa.me/${number}?text=${message}`;

  const handleWhatsAppClick = () => {
    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "whatsapp" }),
    }).catch(console.error);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col gap-3">
      {/* Admin Login Button */}
      <a
        href="/admin/login"
        className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-800 text-white shadow-xl hover:scale-110 hover:bg-slate-700 transition-all duration-300 group opacity-40 hover:opacity-100 mx-auto"
        title="Admin Login"
      >
        <Settings2 className="w-5 h-5 sm:w-6 sm:h-6" />
      </a>

      {/* WhatsApp Button */}
      <a
        id="whatsapp-float-btn"
        href={href}
        onClick={handleWhatsAppClick}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={dict.common.chat_with_us}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-2xl shadow-green-500/40 hover:scale-110 hover:shadow-green-500/60 transition-all duration-300 group"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute right-16 bg-[#0a0a0a] text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-2xl border border-white/10 hidden sm:block">
          {dict.common.chat_with_us}
        </span>
      </a>
    </div>
  );
}
