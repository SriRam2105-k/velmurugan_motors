"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Wrench, Settings, Package, Calendar, CheckCircle, ArrowRight, Phone, Clock, Shield } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import en from "@/dictionaries/en.json";
import ta from "@/dictionaries/ta.json";

const dictionaries = { en, ta };

export default function ServicesClient() {
  const params = useParams();
  const lang = (params.lang as "en" | "ta") || "ta";
  const dict = dictionaries[lang];

  const services = [
    {
      icon: Wrench,
      title: dict.services.service_cards[0].title,
      desc: dict.services.service_cards[0].desc,
      points: dict.services.service_cards[0].points,
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      icon: Settings,
      title: dict.services.service_cards[1].title,
      desc: dict.services.service_cards[1].desc,
      points: dict.services.service_cards[1].points,
      color: "bg-emerald-500/10 text-emerald-500",
    },
    {
      icon: Package,
      title: dict.services.service_cards[2].title,
      desc: dict.services.service_cards[2].desc,
      points: dict.services.service_cards[2].points,
      color: "bg-amber-500/10 text-amber-500",
    },
    {
      icon: Calendar,
      title: dict.services.service_cards[3].title,
      desc: dict.services.service_cards[3].desc,
      points: dict.services.service_cards[3].points,
      color: "bg-purple-500/10 text-purple-500",
    },
  ];

  const serviceIncludes = dict.services.includes.items;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-[#0a0a0a] overflow-hidden">
        <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full bg-gradient-to-l from-[#e11d2a]/10 to-transparent pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className={cn("text-[#e11d2a] text-sm font-black uppercase mb-4", lang === "ta" ? "tracking-normal" : "tracking-[0.3em]")}>{dict.services.hero.subtitle}</p>
            <h1 className="text-5xl lg:text-7xl font-black text-white mb-8 tracking-tighter leading-none uppercase">
              {dict.services.hero.title_1} <br />
              <span className="text-[#e11d2a]">{dict.services.hero.title_2}</span>
            </h1>
            <p className="text-slate-400 text-lg lg:text-xl font-medium leading-relaxed max-w-2xl mb-10">
              {dict.services.hero.desc}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="tel:+917490835159" className={cn(buttonVariants({ size: "lg" }), "bg-[#e11d2a] hover:bg-[#b9101b] text-white rounded-md px-8 font-black uppercase tracking-tight h-14")}>
                <Phone className="w-5 h-5 mr-2" /> {dict.services.hero.book_phone}
              </a>
              <Link href={`/${lang}/contact`} className={cn(buttonVariants({ variant: "outline", size: "lg" }), "!border-white/20 !bg-transparent !text-white hover:bg-white/5 rounded-md px-8 font-black uppercase tracking-tight h-14")}>
                {dict.services.hero.online_enquiry}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white relative z-10 -mt-8 rounded-t-[3rem]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-slate-50 rounded-3xl p-8 lg:p-10 border border-slate-100 hover:shadow-2xl hover:shadow-red-900/5 transition-all group"
              >
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform", service.color)}>
                  <service.icon className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight uppercase">{service.title}</h2>
                <p className="text-slate-600 text-base mb-8 leading-relaxed font-medium">{service.desc}</p>
                <ul className="space-y-4">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-center gap-3 text-slate-700 font-bold text-sm uppercase tracking-tight">
                      <div className="w-5 h-5 rounded-full bg-[#e11d2a]/10 flex items-center justify-center">
                        <CheckCircle className="w-3 h-3 text-[#e11d2a]" />
                      </div>
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className={cn("text-[#e11d2a] text-sm font-black uppercase mb-4", lang === "ta" ? "tracking-normal" : "tracking-[0.3em]")}>{dict.services.includes.subtitle}</p>
            <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight uppercase">{dict.services.includes.title}</h2>
            <div className="w-20 h-1 bg-[#e11d2a] mx-auto" />
          </div>
          
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-slate-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
              {serviceIncludes.map((item, index) => (
                <motion.div 
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-4 py-3 border-b border-slate-50 last:border-0"
                >
                  <Shield className="w-5 h-5 text-[#e11d2a] shrink-0" />
                  <span className="text-slate-800 font-bold text-sm uppercase tracking-tight">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Book Service CTA */}
      <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute inset-0 bg-[#e11d2a]/5 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl lg:text-6xl font-black text-white mb-8 tracking-tighter uppercase leading-[0.9]">
            {dict.services.cta.title_1} <br /> {dict.services.cta.title_2}
          </h2>
          <p className="text-slate-400 text-lg lg:text-xl mb-12 font-medium max-w-2xl mx-auto">
            {dict.services.cta.desc}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <div className="flex items-center gap-4 text-left bg-white/5 border border-white/10 p-4 rounded-xl">
              <div className="w-12 h-12 rounded-full bg-[#e11d2a] flex items-center justify-center text-white">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className={cn("text-white font-black uppercase text-xs", lang === "ta" ? "tracking-normal" : "tracking-widest")}>{dict.services.cta.business_hours}</p>
                <p className="text-slate-400 text-sm font-bold">{dict.services.cta.hours_time}</p>
              </div>
            </div>
            <a href="tel:+917490835159" className={cn(buttonVariants({ size: "lg" }), "bg-[#e11d2a] hover:bg-[#b9101b] text-white rounded-md px-12 h-16 text-lg font-black uppercase tracking-tight shadow-2xl shadow-red-900/40 w-full sm:w-auto")}>
              {dict.common.call_now}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
