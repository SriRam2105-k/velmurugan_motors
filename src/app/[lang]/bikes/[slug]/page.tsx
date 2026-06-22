import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllBikeSlugs, getBikeBySlug } from "@/data/bikes-db";
import { getDictionary } from "@/dictionaries/getDictionary";
import BikeDetailClient from "./BikeDetailClient";

// ISR: revalidate page data every hour
export const revalidate = 3600;

export async function generateStaticParams() {
  const langs = ["en", "ta"] as const;
  const slugs = await getAllBikeSlugs();
  return langs.flatMap((lang) =>
    slugs.map((slug) => ({ lang, slug }))
  );
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params;
  const bike = await getBikeBySlug(slug);
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
  const bike = await getBikeBySlug(slug);
  if (!bike) notFound();

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
          <BikeDetailClient bike={bike} dict={dict} lang={lang} />
        </div>
      </section>
    </>
  );
}
