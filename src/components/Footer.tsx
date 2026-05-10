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

const Instagram = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
  </svg>
);

const Youtube = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s-.002 3.254-.42 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.812.419-7.812.419s-6.252 0-7.812-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.254 2 12 2 12s.002-3.254.42-4.814a2.507 2.507 0 0 1 1.768-1.768C5.748 5 12 5 12 5s6.252 0 7.812.418ZM10 15l5-3-5-3v6Z" clipRule="evenodd" />
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
    <footer className="bg-[#0a0a0a] text-white border-t border-white/5 pt-20 pb-10">
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
              {[
                { Icon: Facebook, href: "https://www.facebook.com/p/Velmurugan-Motors-100083339882347/" },
                { Icon: Instagram, href: "#" },
                { Icon: Youtube, href: "#" },
              ].map(({ Icon, href }, i) => (
                <a 
                  key={i} 
                  href={href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-[#e11d2a] hover:border-[#e11d2a] flex items-center justify-center transition-all group"
                >
                  <Icon className="w-5 h-5 text-slate-400 group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={cn("text-white font-black text-sm uppercase mb-10", lang === "ta" ? "tracking-normal" : "tracking-[0.2em]")}>{dict.footer.quick_links}</h3>
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
            <h3 className={cn("text-white font-black text-sm uppercase mb-10", lang === "ta" ? "tracking-normal" : "tracking-[0.2em]")}>{dict.footer.business_hours}</h3>
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
            <h3 className={cn("text-white font-black text-sm uppercase mb-10", lang === "ta" ? "tracking-normal" : "tracking-[0.2em]")}>{dict.footer.contact_us}</h3>
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
                <a href="mailto:info@velmuruganmotors.in" className="text-sm text-slate-300 hover:text-white font-bold transition-colors tracking-tight uppercase">info@velmuruganmotors.in</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
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
