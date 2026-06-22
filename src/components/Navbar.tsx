"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";



export default function Navbar({ lang, dict }: { lang: "en" | "ta", dict: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // pathname will be something like /ta, /ta/bikes, /en/bikes
  const isHome = pathname === `/${lang}`;

  const navLinks = [
    { label: dict.common.bikes, href: `/${lang}/bikes` },
    { label: dict.common.services, href: `/${lang}/services` },
    { label: dict.common.gallery, href: `/${lang}/gallery` },
    { label: dict.common.about, href: `/${lang}/about` },
    { label: dict.common.contact, href: `/${lang}/contact` },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const switchLang = (newLang: "en" | "ta") => {
    if (lang === newLang) return;
    const pathWithoutLang = pathname.replace(/^\/(en|ta)/, "");
    router.push(`/${newLang}${pathWithoutLang}`);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled || !isHome
          ? "bg-white/95 backdrop-blur-md shadow-md py-2"
          : "bg-white py-3 lg:py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 lg:h-16">
          {/* Logo */}
          <Link href={`/${lang}`} className="flex items-center gap-2 group" aria-label="Hero Velmurugan Motors Home">
            <img 
              src="/logo.png" 
              alt="Hero Velmurugan Motors" 
              className="h-10 lg:h-12 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col justify-center min-w-0 sm:min-w-[120px] lg:min-w-[180px]">
              <p className="text-slate-900 font-black text-xs sm:text-sm lg:text-lg tracking-tight uppercase leading-none">
                Velmurugan
              </p>
              <p className={cn(
                "text-[#e11d2a] font-bold uppercase",
                lang === "ta" 
                  ? "text-[10px] sm:text-[11px] lg:text-[13px] leading-tight font-noto-tamil tracking-normal mt-0.5" 
                  : "text-[8px] sm:text-[10px] lg:text-xs tracking-[0.2em] leading-tight"
              )}>
                {dict.navbar.logo_subtitle}
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0 xl:gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-2 xl:px-4 py-2 rounded-lg font-semibold transition-all duration-200 uppercase whitespace-nowrap",
                  lang === "ta" 
                    ? "text-[12px] xl:text-[14px] font-noto-tamil tracking-normal" 
                    : "text-sm tracking-wide",
                  pathname === link.href || pathname === link.href + '/'
                    ? "text-[#e11d2a] scale-105"
                    : "text-slate-600 hover:text-[#e11d2a] hover:scale-110"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA & Lang Switcher */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-4">
            {/* Lang Switcher */}
            <div className="flex bg-slate-100 rounded-lg p-1 shrink-0">
              <button
                onClick={() => switchLang("ta")}
                className={cn("px-1.5 xl:px-2 py-1 text-[10px] xl:text-xs font-bold rounded-md transition-all font-noto-tamil", lang === "ta" ? "bg-white text-[#e11d2a] shadow-sm" : "text-slate-500 hover:text-slate-800")}
              >
                தமிழ்
              </button>
              <button
                onClick={() => switchLang("en")}
                className={cn("px-1.5 xl:px-2 py-1 text-[10px] xl:text-xs font-bold rounded-md transition-all", lang === "en" ? "bg-white text-[#e11d2a] shadow-sm" : "text-slate-500 hover:text-slate-800")}
              >
                EN
              </button>
            </div>

            <a
              href="tel:+917490835159"
              className="flex items-center gap-1 xl:gap-2 text-slate-600 hover:text-[#e11d2a] text-[10px] xl:text-sm font-medium transition-colors whitespace-nowrap"
            >
              <Phone className="w-3 h-3 xl:w-4 xl:h-4" />
              <span>+91 74908 35159</span>
            </a>
            <Link
              href={`/${lang}/contact`}
              className={cn(
                buttonVariants({
                  size: "sm",
                  className: "bg-[#e11d2a] hover:bg-[#b9101b] text-white rounded-md px-3 xl:px-6 font-bold shadow-lg shadow-red-900/20 transition-all hover:shadow-red-900/30 hover:scale-105 uppercase tracking-tighter whitespace-nowrap text-[10px] xl:text-xs",
                }),
                lang === "ta" && "font-noto-tamil tracking-normal"
              )}
            >
              {dict.common.enquire}
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex items-center gap-3 lg:hidden">
            {/* Mobile Lang Switcher */}
            <div className="flex bg-slate-100 rounded-lg p-1">
              <button
                onClick={() => switchLang("ta")}
                className={cn("px-2 py-1 text-xs font-bold rounded-md transition-all font-noto-tamil", lang === "ta" ? "bg-white text-[#e11d2a] shadow-sm" : "text-slate-500")}
              >
                தமிழ்
              </button>
              <button
                onClick={() => switchLang("en")}
                className={cn("px-2 py-1 text-xs font-bold rounded-md transition-all", lang === "en" ? "bg-white text-[#e11d2a] shadow-sm" : "text-slate-500")}
              >
                EN
              </button>
            </div>
            <button
              id="mobile-menu-toggle"
              className="text-slate-900 p-2 rounded-lg hover:bg-slate-100 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={cn(
          "lg:hidden bg-white border-t border-slate-100 transition-all duration-300 ease-in-out origin-top transform shadow-2xl overflow-hidden",
          isOpen ? "max-h-screen opacity-100 scale-y-100" : "max-h-0 opacity-0 scale-y-95"
        )}
      >
        <nav className="px-4 py-6 space-y-2" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "block px-4 py-3 rounded-lg text-base font-bold transition-colors uppercase tracking-wide",
                lang === "ta" && "font-noto-tamil tracking-normal",
                pathname === link.href || pathname === link.href + '/'
                  ? "text-[#e11d2a] bg-red-50"
                  : "text-slate-700 hover:text-[#e11d2a] hover:bg-slate-50"
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-slate-100">
            <Link
              href={`/${lang}/contact`}
              className={buttonVariants({
                className: "w-full bg-[#e11d2a] hover:bg-[#b9101b] text-white rounded-md font-bold py-6 uppercase tracking-tight",
              })}
            >
              {dict.common.enquire_now}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
