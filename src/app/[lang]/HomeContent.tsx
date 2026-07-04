"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Award, Phone, Clock, MapPin, Star, Check, Gift, RefreshCw, PartyPopper, Smile, ChevronLeft, ChevronRight, Sparkles, Key } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import BikeCard from "@/components/BikeCard";
import type { Bike } from "@/data/bikes";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import type { CarouselImage } from "@/data/carousel";


export default function HomeContent({
  lang,
  dict,
  bestSellers,
  scooters,
  dynamicCarousel,
}: {
  lang: "en" | "ta";
  dict: any;
  bestSellers: Bike[];
  scooters: Bike[];
  dynamicCarousel?: CarouselImage[];
}) {
  const [category, setCategory] = useState<"motorcycles" | "scooters">("motorcycles");
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);

  const defaultHeroSlides = [
    { id: "1", image: "/images/carousel/slide-1.jpg", alt: "Welcome to Velmurugan Motors" },
    { id: "2", image: "/images/carousel/slide-2.jpg", alt: "Exciting Festive Offers" },
    { id: "3", image: "/images/carousel/slide-3.jpg", alt: "Delivering Happiness" },
  ];

  const heroSlides = dynamicCarousel && dynamicCarousel.length > 0
    ? dynamicCarousel.map(img => ({ id: img.id, image: img.image_url, alt: img.alt_text || "Carousel Slide" }))
    : defaultHeroSlides;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const whyUs = [
    { icon: Shield, title: dict.home.why_us.features[0].title, desc: dict.home.why_us.features[0].desc },
    { icon: Award, title: dict.home.why_us.features[1].title, desc: dict.home.why_us.features[1].desc },
    { icon: Phone, title: dict.home.why_us.features[2].title, desc: dict.home.why_us.features[2].desc },
    { icon: Clock, title: dict.home.why_us.features[3].title, desc: dict.home.why_us.features[3].desc },
  ];

  const testimonials = (dict.home.testimonials.list as { name: string; location: string; text: string }[]).map((t) => ({
    ...t,
    rating: 5,
  }));

  const stats = [
    { value: "10,000+", label: dict.home.stats.legends_on_road },
    { value: "15+", label: dict.home.stats.years_of_excellence },
    { value: "Full Range", label: dict.home.stats.hero_innovation },
    { value: "4.8/5", label: dict.home.stats.customer_trust },
  ];

  // Filter featured bikes based on category
  const featuredBikes = category === "motorcycles"
    ? bestSellers.filter((b) => b.category !== "scooter").slice(0, 4)
    : scooters.slice(0, 4);

  return (
    <>
      {/* Hero Banner Carousel */}
      <section className="relative w-full h-[50vh] min-h-[280px] sm:h-[65vh] lg:h-[80vh] overflow-hidden group bg-slate-900 mt-16 border-b border-red-500/20 shadow-xl shadow-red-900/10">
        <div className="relative w-full h-full">
          {heroSlides.map((slide, index) => (
            <motion.div
              key={slide.id}
              className="absolute inset-0 w-full h-full carousel-slide"
              initial={{ opacity: 0 }}
              animate={{ opacity: index === activeHeroSlide ? 1 : 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </motion.div>
          ))}
          
          {/* Carousel Controls */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveHeroSlide(index)}
                className={cn(
                  "h-2.5 rounded-full transition-all duration-300",
                  index === activeHeroSlide ? "bg-[#e11d2a] w-8 shadow-[0_0_10px_rgba(226,29,42,0.5)]" : "bg-white/60 hover:bg-white w-2.5"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          <button
            onClick={() => setActiveHeroSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-black/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-[#e11d2a] z-10 backdrop-blur-sm"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5 sm:w-8 sm:h-8" />
          </button>
          <button
            onClick={() => setActiveHeroSlide((prev) => (prev + 1) % heroSlides.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-black/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-[#e11d2a] z-10 backdrop-blur-sm"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-8 sm:h-8" />
          </button>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#E2211C] py-12 relative stats-bar-transition">
        <div className="absolute inset-0 bg-black/5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center text-white">
                <p className={cn("text-2xl sm:text-4xl lg:text-5xl font-black", lang === "ta" ? "tracking-normal" : "tracking-tighter")}>{stat.value}</p>
                <p className={cn("text-white/90 text-xs font-bold uppercase mt-2", lang === "ta" ? "tracking-normal" : "tracking-widest")}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Bikes */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className={cn("text-[#e11d2a] text-sm font-black uppercase mb-4", lang === "ta" ? "tracking-normal" : "tracking-[0.3em]")}>{dict.home.collection.subtitle}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-6 tracking-tight">{dict.home.collection.title}</h2>
            <div className="w-24 h-1.5 bg-[#e11d2a] mx-auto mb-8" />
            <p className="text-slate-600 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
              {dict.home.collection.desc}
            </p>

            {/* Category Toggle */}
            <div className="flex bg-slate-100 p-1 rounded-sm w-fit mx-auto mt-8 border border-slate-200">
              <button
                onClick={() => setCategory("motorcycles")}
                className={cn(
                  "px-4 sm:px-6 py-2.5 text-sm font-bold transition-all rounded-sm uppercase tracking-wider",
                  category === "motorcycles" ? "bg-[#e11d2a] text-white shadow-md" : "text-slate-500 hover:text-slate-800"
                )}
              >
                {dict.common.motorcycles}
              </button>
              <button
                onClick={() => setCategory("scooters")}
                className={cn(
                  "px-4 sm:px-6 py-2.5 text-sm font-bold transition-all rounded-sm uppercase tracking-wider",
                  category === "scooters" ? "bg-[#e11d2a] text-white shadow-md" : "text-slate-500 hover:text-slate-800"
                )}
              >
                {dict.common.scooters}
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredBikes.map((bike) => (
              <BikeCard key={bike.id} bike={bike} lang={lang} dict={dict} />
            ))}
          </div>
          <div className="text-center mt-16">
            <Link
              href={`/${lang}/bikes`}
              className={buttonVariants({
                size: "lg",
                className:
                  "bg-[#E2211C] hover:bg-[#b9101b] text-white rounded-md px-10 font-bold shadow-lg shadow-red-900/20 transition-all hover:shadow-red-900/40 hover:scale-105 h-14 uppercase tracking-tight",
              })}
            >
              {dict.home.collection.view_all} <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 sm:py-16 lg:py-20 bg-blue-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#e2211c] text-sm font-semibold tracking-widest uppercase mb-2">{dict.home.why_us.subtitle}</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">{dict.home.why_us.title}</h2>
            <p className="text-slate-500 max-w-xl mx-auto">{dict.home.why_us.desc}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyUs.map((item) => (
              <div key={item.title} className="bg-slate-50 border border-slate-100 cut-corner p-8 transition-all duration-500 group relative hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(226,33,28,0.1)] hover:border-[#E2211C]/20">
                <div className="w-16 h-16 bg-[#E2211C]/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <item.icon className="w-8 h-8 text-[#E2211C]" />
                </div>
                <h3 className="font-black text-slate-900 mb-3 uppercase tracking-tight text-lg">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder's Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#e2211c]/[0.02] -skew-x-12 translate-x-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-50/30 rounded-2xl sm:rounded-[3rem] p-6 sm:p-10 lg:p-20 shadow-2xl shadow-red-900/5 border border-slate-100 flex flex-col lg:flex-row items-center gap-12 lg:gap-24 relative">
             <div className="absolute top-0 left-0 w-32 h-32 bg-[#e2211c]/5 rounded-br-[5rem]" />
             
             {/* Image */}
             <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 shrink-0">
               <div className="absolute -inset-6 bg-gradient-to-tr from-blue-600/20 to-transparent rounded-full blur-3xl" />
               <div className="relative w-full h-full rounded-full overflow-hidden border-[10px] border-white shadow-2xl bg-[#0f172a]">
                 <Image
                   src="/images/owner.png"
                   alt={dict.home.founder_message.founder}
                   fill
                   className="object-cover object-center transition-transform duration-700 hover:scale-110"
                   sizes="(max-width: 768px) 100vw, 400px"
                 />
               </div>
               <motion.div 
                 initial={{ scale: 0 }}
                 whileInView={{ scale: 1 }}
                 viewport={{ once: true }}
                 className="absolute -bottom-2 -right-2 bg-[#e2211c] text-white p-4 rounded-2xl shadow-xl shadow-red-500/20"
               >
                 <Award className="w-6 h-6" />
               </motion.div>
             </div>

             {/* Content */}
             <div className="flex-1 text-center lg:text-left">
               <div className="inline-block px-4 py-1.5 bg-[#e2211c]/10 rounded-full mb-6">
                 <p className={cn("text-[#e2211c] text-xs font-black uppercase tracking-widest", lang === "ta" ? "tracking-normal" : "")}>
                   {dict.home.founder_message.title}
                 </p>
               </div>
               <h2 className={cn("font-black text-slate-900 mb-6 lg:mb-10 leading-tight italic", lang === "ta" ? "text-xl sm:text-2xl lg:text-4xl" : "text-xl sm:text-3xl lg:text-5xl")}>
                 &quot;{dict.home.founder_message.quote}&quot;
               </h2>
               <div className="flex flex-col items-center lg:items-start">
                 <p className="text-2xl font-black text-slate-900 uppercase tracking-tighter">{dict.home.founder_message.founder}</p>
                 <p className="text-[#e2211c] font-bold text-sm uppercase tracking-[0.2em] mt-2 flex items-center gap-2">
                   <span className="w-8 h-0.5 bg-[#e2211c]" /> Founder & Managing Director
                 </p>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-16 lg:py-24 bg-blue-50/50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#e11d2a]/10 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <p className={cn("text-[#e11d2a] text-sm font-black uppercase mb-4", lang === "ta" ? "tracking-normal" : "tracking-[0.3em]")}>{dict.home.testimonials.subtitle}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-6 tracking-tight">{dict.home.testimonials.title}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white border border-slate-100 p-8 rounded-sm shadow-sm shadow-slate-100 transition-all duration-500 hover:-translate-y-2 hover:border-[#E2211C]/30 hover:shadow-[0_20px_40px_rgba(226,33,28,0.08)] group">
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#e11d2a] text-[#e11d2a]" />
                  ))}
                </div>
                <p className="text-slate-600 text-base leading-relaxed mb-8 italic font-medium">&quot;{t.text}&quot;</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#e11d2a]/5 flex items-center justify-center text-[#e11d2a] font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-slate-900 font-black text-sm uppercase tracking-wider">{t.name}</p>
                    <p className="text-slate-500 text-xs flex items-center gap-1 font-bold uppercase tracking-widest mt-0.5"><MapPin className="w-3 h-3" />{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-12 sm:py-16 lg:py-24 bg-[#e11d2a] relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-2xl sm:text-4xl lg:text-6xl font-black text-white mb-6 tracking-tighter uppercase leading-tight lg:leading-[0.9]">
            {dict.home.cta.title}
          </h2>
          <p className="text-white/90 text-lg lg:text-xl mb-12 font-medium max-w-2xl mx-auto">
            {dict.home.cta.desc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${lang}/contact`}
              className={cn(
                buttonVariants({ size: "lg" }),
                "!bg-white !text-[#E2211C] hover:bg-slate-50 hover:scale-105 rounded-md px-10 h-14 font-black uppercase tracking-tight shadow-xl shadow-black/10 transition-all duration-300"
              )}
            >
              {dict.home.cta.get_advice}
            </Link>
            <Link
              href={`/${lang}/bikes`}
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "!border-white !bg-transparent !text-white hover:bg-white/10 rounded-md px-10 h-14 font-black uppercase tracking-tight"
              )}
            >
              {dict.home.cta.browse_catalog}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
