import { Metadata } from "next";
import { getDictionary } from "@/dictionaries/getDictionary";
import { getAllBikes } from "@/data/bikes-db";
import BikesContent from "./BikesContent";

// ISR: revalidate every hour so stock changes reflect quickly
export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = (rawLang === "en" || rawLang === "ta" ? rawLang : "ta") as "en" | "ta";
  const dict = await getDictionary(lang);
  
  return {
    title: dict.common.bikes + " | Velmurugan Motors",
    description: dict.bikes.header.desc,
  };
}

export default async function BikesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = (rawLang === "en" || rawLang === "ta" ? rawLang : "ta") as "en" | "ta";
  const [dict, bikes] = await Promise.all([getDictionary(lang), getAllBikes()]);

  return <BikesContent lang={lang} dict={dict} bikes={bikes} />;
}
