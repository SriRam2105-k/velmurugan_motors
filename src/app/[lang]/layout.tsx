import type { Metadata } from "next";
import { Inter, Outfit, Noto_Sans_Tamil } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoTamil = Noto_Sans_Tamil({
  subsets: ["tamil"],
  variable: "--font-noto-tamil",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Hero Velmurugan Motors – Hero Bikes Dealer in Madurai",
  description:
    "Buy Hero bikes in Madurai at Hero Velmurugan Motors. Best price, EMI options, and expert service support. Visit us today!",
  keywords: [
    "Hero bikes Madurai",
    "Hero MotoCorp dealer",
    "Velmurugan Motors",
    "two wheeler Madurai",
    "Splendor Madurai",
    "bike dealer Tamil Nadu",
  ],
  openGraph: {
    title: "Hero Velmurugan Motors – Hero Bikes Dealer in Madurai",
    description:
      "Buy Hero bikes in Madurai at Hero Velmurugan Motors. Best price, EMI options, and expert service support.",
    url: "https://herovemuruganmotors.in",
    siteName: "Hero Velmurugan Motors",
    images: [
      {
        url: "/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "Hero Velmurugan Motors – Madurai",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hero Velmurugan Motors – Hero Bikes Dealer in Madurai",
    description:
      "Buy Hero bikes in Madurai at Hero Velmurugan Motors. Best price, EMI options, and expert service support.",
    images: ["/og-cover.jpg"],
  },
  metadataBase: new URL("https://herovelumuruganmotors.in"),
  other: {
    google: "notranslate",
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang: rawLang } = await params;
  const lang = (rawLang === "en" || rawLang === "ta" ? rawLang : "ta") as "en" | "ta";
  return (
    <html lang={lang} className={`${outfit.variable} ${inter.variable} ${notoTamil.variable}`} data-scroll-behavior="smooth">
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased">
        <Navbar lang={lang} />
        <main className="flex-1">{children}</main>
        <Footer lang={lang} />
        <WhatsAppFloat lang={lang} />
      </body>
    </html>
  );
}
