import type { Metadata } from "next";
import { Phone, MapPin, Clock, Mail, MessageCircle } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { getDictionary } from "@/dictionaries/getDictionary";

export const metadata: Metadata = {
  title: "Contact Us – Hero Velmurugan Motors Madurai",
  description: "Get in touch with Hero Velmurugan Motors, Madurai. Call, WhatsApp, or fill the form for bike enquiries, test rides, and service bookings.",
};

const mapsUrl = process.env.NEXT_PUBLIC_MAPS_EMBED_URL ||
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125398.38853977748!2d77.98988195!3d9.9252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c582b1189633%3A0xdc955b7264f63!2sMadurai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: "en" | "ta" }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const businessHours = [
    { day: dict.footer.monday_saturday, hours: dict.contact.cards.call_time.includes(", ") ? dict.contact.cards.call_time.split(", ")[1] : "9:00 AM – 7:00 PM" },
    { day: dict.footer.sunday, hours: "10:00 AM – 4:00 PM" },
    { day: dict.footer.public_holidays, hours: dict.footer.closed },
  ];

  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919XXXXXXXXX";
  const waMessage = encodeURIComponent("Hello Velmurugan Motors! I would like to inquire about your Hero bikes.");

  return (
    <>
      {/* Header */}
      <section className="bg-[#0f172a] pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[#e2211c] text-sm font-semibold tracking-widest uppercase mb-2">{dict.contact.header.subtitle}</p>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">{dict.contact.header.title}</h1>
          <p className="text-white/60 text-lg max-w-2xl leading-relaxed">
            {dict.contact.header.desc}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

            {/* Left – Contact Info */}
            <div className="lg:col-span-2 space-y-4">
              {/* Quick Contact Cards */}
              <a href="tel:+917490835159" className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:border-[#e2211c]/30 hover:shadow-md transition-all group">
                <div className="w-12 h-12 rounded-xl bg-[#e2211c]/10 flex items-center justify-center shrink-0 group-hover:bg-[#e2211c] transition-colors">
                  <Phone className="w-5 h-5 text-[#e2211c] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{dict.contact.cards.call_us}</p>
                  <p className="text-[#e2211c] font-bold text-lg">+91 74908 35159</p>
                  <p className="text-slate-400 text-[10px] mt-0.5 uppercase font-black tracking-wider">{dict.contact.cards.call_time}</p>
                </div>
              </a>

              <a href={`https://wa.me/${waNumber}?text=${waMessage}`} target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:border-green-300 hover:shadow-md transition-all group">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0 group-hover:bg-[#25D366] transition-colors">
                  <MessageCircle className="w-5 h-5 text-[#25D366] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{dict.contact.cards.whatsapp}</p>
                  <p className="text-green-600 font-medium">{dict.contact.cards.chat_us}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{dict.contact.cards.wa_desc}</p>
                </div>
              </a>

              <a href="mailto:info@velmuruganmotors.in" className="flex items-start gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:border-[#e2211c]/30 hover:shadow-md transition-all group">
                <div className="w-12 h-12 rounded-xl bg-[#e2211c]/10 flex items-center justify-center shrink-0 group-hover:bg-[#e2211c] transition-colors">
                  <Mail className="w-5 h-5 text-[#e2211c] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{dict.contact.cards.email_us}</p>
                  <p className="text-slate-600 text-sm">info@velmuruganmotors.in</p>
                </div>
              </a>

              <div className="flex items-start gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-[#e2211c]/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#e2211c]" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{dict.contact.cards.visit_us}</p>
                  <p className="text-slate-600 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: dict.contact.cards.address }}></p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-4 h-4 text-[#e2211c]" />
                  <p className="font-semibold text-slate-900">{dict.contact.cards.business_hours}</p>
                </div>
                <ul className="space-y-2">
                  {businessHours.map((item) => (
                    <li key={item.day} className="flex justify-between text-sm">
                      <span className="text-slate-600">{item.day}</span>
                      <span className="font-medium text-slate-800">{item.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right – Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">{dict.contact.form.title}</h2>
                <p className="text-slate-500 text-sm mb-6">{dict.contact.form.desc}</p>
                <ContactForm />
              </div>
            </div>
          </div>

          {/* Google Maps */}
          <div className="mt-10 rounded-2xl overflow-hidden shadow-lg border border-slate-200 h-72 lg:h-96">
            <iframe
              src={mapsUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Hero Velmurugan Motors Location Map"
            />
          </div>
        </div>
      </section>
    </>
  );
}
