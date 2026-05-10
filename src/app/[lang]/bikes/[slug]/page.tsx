import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Fuel, Zap, Settings, MessageCircle, CheckCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { bikes } from "@/data/bikes";
import { getDictionary } from "@/dictionaries/getDictionary";

export async function generateStaticParams() {
  return bikes.map((bike) => ({ slug: bike.slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params;
  const bike = bikes.find((b) => b.slug === slug);
  if (!bike) return {};
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return {
    title: `${bike.name} – Hero Velmurugan Motors Madurai`,
    description: `Buy ${bike.name} in Madurai at ${formatCurrency(bike.price.exShowroom)}. ${bike.tagline}. Best price, EMI from ${formatCurrency(bike.price.emiStarting)}. Visit Hero Velmurugan Motors today!`,
  };
}

export default async function BikeDetailPage(props: { params: Promise<{ lang: "en" | "ta", slug: string }> }) {
  const { lang, slug } = await props.params;
  const dict = await getDictionary(lang);
  const bike = bikes.find((b) => b.slug === slug);
  if (!bike) notFound();

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

  return (
    <>
      <div className="bg-[#0f172a] pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href={`/${lang}/bikes`} className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> {dict.bikes.details.back_to_catalog}
          </Link>
        </div>
      </div>

      <section className="bg-slate-50 min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Bike Visual */}
            <div className="sticky top-24">
              <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl h-80 lg:h-96 flex flex-col items-center justify-center shadow-inner relative overflow-hidden">
                <Image
                  src={bike.images.main}
                  alt={bike.name}
                  fill
                  className="object-contain p-8"
                  priority
                />
              </div>
              {/* Colors */}
              <div className="mt-6 bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                <h3 className="font-semibold text-slate-800 mb-3 text-sm uppercase tracking-wide">{dict.bikes.details.available_colors}</h3>
                <div className="flex flex-wrap gap-3">
                  {bike.colors.map((color) => (
                    <div key={color} className="flex items-center gap-2 bg-slate-50 rounded-full px-4 py-1.5 border border-slate-100">
                      <span className="text-xs text-slate-600 font-bold uppercase tracking-tight">{color}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bike Details */}
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge className="bg-[#e2211c]/10 text-[#e2211c] border-[#e2211c]/20 capitalize">
                  {dict.bikes.categories[bike.category as keyof typeof dict.bikes.categories] || bike.category}
                </Badge>
                {bike.isBestSeller && <Badge className="bg-[#e2211c] text-white border-0">{dict.bikes.details.best_seller}</Badge>}
                {bike.isNew && <Badge className="bg-green-600 text-white border-0">{dict.bikes.details.new_launch}</Badge>}
              </div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2 uppercase tracking-tighter">{bike.name}</h1>
              <p className="text-slate-500 text-lg mb-6 font-medium">{bike.tagline}</p>

              {/* Price */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-400 mb-1">{dict.bikes.details.price}</p>
                    <p className="text-4xl font-black text-slate-900">{formatCurrency(bike.price.exShowroom)}</p>
                    <div className="flex flex-col gap-1 mt-2">
                      <p className="text-sm text-slate-500">{dict.bikes.details.on_road_price} <span className="font-bold text-slate-700">{formatCurrency(bike.price.onRoad)}</span></p>
                      <p className="text-sm text-slate-500">{dict.bikes.details.emi_starts} <span className="font-bold text-[#e2211c]">{formatCurrency(bike.price.emiStarting)}</span></p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 sm:min-w-[180px]">
                    <Link
                      href={`/${lang}/contact?bike=${bike.slug}`}
                      className={buttonVariants({
                        className:
                          "bg-[#e2211c] hover:bg-[#b91c1c] text-white rounded-full font-black uppercase tracking-tight shadow-lg shadow-red-200 py-6",
                      })}
                    >
                      {dict.bikes.details.enquire}
                    </Link>
                    <a
                      href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919XXXXXXXXX"}?text=${encodeURIComponent(dict.bikes.details.whatsapp_message.replace("{bike}", bike.name))}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold py-3 px-4 rounded-full text-sm transition-all"
                    >
                      <MessageCircle className="w-4 h-4" /> {dict.contact.cards.whatsapp}
                    </a>
                  </div>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {specs.map((spec) => (
                  <div key={spec.label} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#e2211c]/10 flex items-center justify-center shrink-0">
                      <spec.icon className="w-5 h-5 text-[#e2211c]" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{spec.label}</p>
                      <p className="text-sm font-black text-slate-800">{spec.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Features */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <h3 className="font-black text-slate-900 mb-4 uppercase tracking-tight">{dict.bikes.details.features}</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                  {bike.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#e2211c] shrink-0 mt-0.5" />
                      <span className="text-slate-700 text-sm font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
