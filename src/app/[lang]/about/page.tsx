import type { Metadata } from "next";
import { Award, Users, Heart, TrendingUp } from "lucide-react";
import Image from "next/image";
import { getDictionary } from "@/dictionaries/getDictionary";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About Us – Hero Velmurugan Motors Madurai",
  description: "Learn about Hero Velmurugan Motors – your trusted Hero MotoCorp authorised dealer in Madurai, Tamil Nadu. Our story, mission and team.",
};

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: "en" | "ta" }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const values = [
    { icon: Heart, ...dict.about.values.items[0] },
    { icon: Award, ...dict.about.values.items[1] },
    { icon: Users, ...dict.about.values.items[2] },
    { icon: TrendingUp, ...dict.about.values.items[3] },
  ];

  return (
    <>
      {/* Header */}
      <section className="bg-[#0f172a] pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className={cn("text-[#e2211c] text-sm font-semibold uppercase mb-2", lang === "ta" ? "tracking-normal" : "tracking-widest")}>{dict.about.header.subtitle}</p>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">{dict.about.header.title}</h1>
          <p className="text-white/60 text-lg max-w-2xl">
            {dict.about.header.desc}
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Founder Image */}
            <div className="relative group max-w-md mx-auto lg:mx-0">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#e2211c] to-blue-600 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative bg-[#0f172a] rounded-[2rem] overflow-hidden aspect-square flex items-center justify-center shadow-2xl border border-slate-800">
                <Image
                  src="/images/owner.png"
                  alt={dict.about.story.founder}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 500px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl z-10">
                   <p className="text-white font-bold text-sm uppercase tracking-widest text-center">{dict.about.story.founder}</p>
                </div>
              </div>
            </div>
            {/* Story */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">{dict.about.story.title}</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>{dict.about.story.p1}</p>
                <p>{dict.about.story.p2}</p>
                <p>{dict.about.story.p3}</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-6">
                {dict.about.stats.map(([val, lbl]) => (
                  <div key={lbl} className="text-center">
                    <p className="text-2xl font-bold text-[#e2211c]">{val}</p>
                    <p className={cn("text-slate-500 text-xs mt-0.5 uppercase font-bold", lang === "ta" ? "tracking-normal" : "tracking-widest")}>{lbl}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className={cn("text-[#e2211c] text-sm font-semibold uppercase mb-2", lang === "ta" ? "tracking-normal" : "tracking-widest")}>{dict.about.values.subtitle}</p>
            <h2 className="text-3xl font-bold text-slate-900">{dict.about.values.title}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v) => (
              <div key={v.title} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-xl hover:border-red-100 hover:-translate-y-2 transition-all duration-500 group">
                <div className="w-14 h-14 rounded-2xl bg-[#e2211c]/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#e2211c] transition-colors">
                  <v.icon className="w-7 h-7 text-[#e2211c] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{v.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className={cn("text-[#e2211c] text-sm font-semibold uppercase mb-2", lang === "ta" ? "tracking-normal" : "tracking-widest")}>{dict.about.milestones.subtitle}</p>
            <h2 className="text-3xl font-bold text-slate-900">{dict.about.milestones.title}</h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-slate-200" />
            <div className="space-y-8">
              {dict.about.milestones.items.map((m) => (
                <div key={m.year} className="relative flex gap-6">
                  <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-[#e2211c] text-white font-bold text-sm shrink-0 shadow-lg shadow-red-200">
                    {m.year}
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-5 flex-1 border border-slate-100 transition-all duration-500 hover:-translate-y-1 hover:shadow-md hover:bg-white">
                    <h3 className="font-bold text-slate-900 mb-1">{m.title}</h3>
                    <p className="text-slate-500 text-sm">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hero Partnership */}
      <section className="py-14 bg-[#0f172a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className={cn("text-[#e2211c] text-sm font-semibold uppercase mb-2", lang === "ta" ? "tracking-normal" : "tracking-widest")}>{dict.about.partnership.subtitle}</p>
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">{dict.about.partnership.title}</h2>
          <p className="text-white/60 leading-relaxed max-w-2xl mx-auto">
            {dict.about.partnership.desc}
          </p>
        </div>
      </section>
    </>
  );
}
