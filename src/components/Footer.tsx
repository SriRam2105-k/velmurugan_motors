import Link from "next/link";
import {
  Phone,
  MapPin,
  Clock,
  Mail,
  ArrowRight,
} from "lucide-react";
import { getDictionary } from "@/dictionaries/getDictionary";
import { cn } from "@/lib/utils";

const Facebook = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
  </svg>
);

export default async function Footer({ lang }: { lang: "en" | "ta" }) {
  const dict = await getDictionary(lang);

  const quickLinks = [
    { label: dict.common.home, href: `/${lang}` },
    { label: dict.common.bikes, href: `/${lang}/bikes` },
    { label: dict.common.services, href: `/${lang}/services` },
    { label: dict.common.gallery, href: `/${lang}/gallery` },
    { label: dict.common.about, href: `/${lang}/about` },
    { label: dict.common.contact, href: `/${lang}/contact` },
  ];

  const businessHours = [
    { day: dict.footer.monday_saturday, hours: "9:00 AM – 7:00 PM" },
    { day: dict.footer.sunday, hours: "10:00 AM – 4:00 PM" },
    { day: dict.footer.public_holidays, hours: dict.footer.closed },
  ];

  const year = new Date().getFullYear();
  const copyrightText = dict.footer.copyright.replace("{year}", year.toString());

  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-20">
          {/* Brand Column */}
          <div className="space-y-8">
            <Link href={`/${lang}`} className="flex items-center gap-3 group">
              <img 
                src="/logo.png" 
                alt="Hero Velmurugan Motors" 
                className="h-12 w-auto object-contain transition-transform group-hover:scale-105 brightness-110"
              />
              <div className="leading-tight">
                <p className="font-black text-xl tracking-tight uppercase">VELMURUGAN</p>
                <p className={cn("text-[#e11d2a] text-[10px] font-bold uppercase mt-0.5", lang === "ta" ? "tracking-normal" : "tracking-[0.2em]")}>{dict.navbar.logo_subtitle}</p>
              </div>
            </Link>
            <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-xs">
              {dict.footer.about_text}
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/p/Velmurugan-Motors-100083339882347/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 hover:bg-[#e11d2a] hover:border-[#e11d2a] flex items-center justify-center transition-all group"
              >
                <Facebook className="w-5 h-5 text-slate-400 group-hover:text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={cn("text-white font-black text-sm uppercase mb-6 lg:mb-10", lang === "ta" ? "tracking-normal" : "tracking-[0.2em]")}>{dict.footer.quick_links}</h3>
            <ul className="grid grid-cols-1 gap-4">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-slate-400 hover:text-[#e11d2a] text-sm font-bold transition-colors flex items-center gap-2 uppercase tracking-wide group"
                  >
                    <ArrowRight className="w-3 h-3 text-[#e11d2a] group-hover:translate-x-1 transition-transform" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className={cn("text-white font-black text-sm uppercase mb-6 lg:mb-10", lang === "ta" ? "tracking-normal" : "tracking-[0.2em]")}>{dict.footer.business_hours}</h3>
            <div className="space-y-6">
              {businessHours.map((item) => (
                <div key={item.day} className="border-l-2 border-[#e11d2a]/20 pl-4 py-1">
                  <p className={cn("text-[10px] text-slate-500 font-black uppercase mb-1", lang === "ta" ? "tracking-normal" : "tracking-widest")}>{item.day}</p>
                  <p className="text-sm text-white font-bold tracking-tight">{item.hours}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className={cn("text-white font-black text-sm uppercase mb-6 lg:mb-10", lang === "ta" ? "tracking-normal" : "tracking-[0.2em]")}>{dict.footer.contact_us}</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#e11d2a]/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#e11d2a]" />
                </div>
                <p className="text-sm text-slate-300 font-medium leading-relaxed whitespace-pre-line">
                  {dict.footer.address}
                </p>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#e11d2a]/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#e11d2a]" />
                </div>
                <a href="tel:+917490835159" className="text-sm text-slate-300 hover:text-white font-bold transition-colors tracking-tight">+91 74908 35159</a>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#e11d2a]/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#e11d2a]" />
                </div>
                <a href="mailto:info@velmuruganmotors.in" className="text-sm text-slate-300 hover:text-white font-bold transition-colors tracking-tight uppercase break-all">info@velmuruganmotors.in</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className={cn("text-slate-500 text-[10px] font-bold uppercase", lang === "ta" ? "tracking-normal" : "tracking-[0.2em]")}>
            {copyrightText}
          </p>
          <div className="flex gap-8">
            <Link href={`/${lang}/privacy`} className={cn("text-slate-600 hover:text-slate-400 text-[10px] font-black uppercase transition-colors", lang === "ta" ? "tracking-normal" : "tracking-widest")}>{dict.footer.privacy_policy}</Link>
            <Link href={`/${lang}/terms`} className={cn("text-slate-600 hover:text-slate-400 text-[10px] font-black uppercase transition-colors", lang === "ta" ? "tracking-normal" : "tracking-widest")}>{dict.footer.terms_of_service}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
