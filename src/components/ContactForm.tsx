"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, Loader2, AlertCircle } from "lucide-react";


import { bikes } from "@/data/bikes";

interface ContactFormProps {
  bikeSlug?: string;
  lang: "en" | "ta";
  dict: any;
}

export default function ContactForm({ bikeSlug, lang, dict }: ContactFormProps) {
  const formId = process.env.NEXT_PUBLIC_FORMSPREE_ID || "xpwzgkjb";

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    bike: bikeSlug || "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      // Save to Supabase via our API route
      const supabaseRes = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          message: formData.message,
          bike_slug: formData.bike || undefined,
        }),
      });

      // Also forward to Formspree if configured (email notification)
      if (formId && formId !== "your_form_id") {
        fetch(`https://formspree.io/f/${formId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(formData),
        }).catch(() => {}); // Fire-and-forget — don't block on Formspree
      }

      if (supabaseRes.ok) {
        setStatus("success");
        setFormData({ name: "", phone: "", email: "", bike: bikeSlug || "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">{dict.contact_form.success_title}</h3>
        <p className="text-slate-600 max-w-sm">
          {dict.contact_form.success_desc}
        </p>
        <Button
          onClick={() => setStatus("idle")}
          variant="outline"
          className="mt-2 border-[#e2211c] text-[#e2211c] hover:bg-[#e2211c] hover:text-white rounded-full"
        >
          {dict.contact_form.send_another}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <Label htmlFor="contact-name" className="text-slate-700 font-medium text-sm">
            {dict.contact_form.name_label} <span className="text-[#e2211c]">*</span>
          </Label>
          <Input
            id="contact-name"
            name="name"
            type="text"
            placeholder={dict.contact_form.name_placeholder}
            required
            value={formData.name}
            onChange={handleChange}
            className="border-slate-200 focus:border-[#e2211c] focus:ring-[#e2211c]/20 rounded-xl h-11"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="contact-phone" className="text-slate-700 font-medium text-sm">
            {dict.contact_form.phone_label} <span className="text-[#e2211c]">*</span>
          </Label>
          <Input
            id="contact-phone"
            name="phone"
            type="tel"
            placeholder={dict.contact_form.phone_placeholder}
            required
            value={formData.phone}
            onChange={handleChange}
            className="border-slate-200 focus:border-[#e2211c] focus:ring-[#e2211c]/20 rounded-xl h-11"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="contact-email" className="text-slate-700 font-medium text-sm">
          {dict.contact_form.email_label}
        </Label>
        <Input
          id="contact-email"
          name="email"
          type="email"
          placeholder={dict.contact_form.email_placeholder}
          value={formData.email}
          onChange={handleChange}
          className="border-slate-200 focus:border-[#e2211c] focus:ring-[#e2211c]/20 rounded-xl h-11"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="contact-bike" className="text-slate-700 font-medium text-sm">
          {dict.contact_form.interest_label}
        </Label>
        <select
          id="contact-bike"
          name="bike"
          value={formData.bike}
          onChange={handleChange}
          className="w-full border border-slate-200 rounded-xl h-11 px-3 text-sm focus:outline-none focus:border-[#e2211c] bg-white text-slate-700"
        >
          <option value="">{dict.contact_form.select_bike}</option>
          {bikes.map((bike) => (
            <option key={bike.id} value={bike.slug}>
              {bike.name}
            </option>
          ))}
          <option value="service">{dict.contact_form.service_parts}</option>
          <option value="other">{dict.contact_form.other_enquiry}</option>
        </select>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="contact-message" className="text-slate-700 font-medium text-sm">
          {dict.contact_form.message_label} <span className="text-[#e2211c]">*</span>
        </Label>
        <Textarea
          id="contact-message"
          name="message"
          placeholder={dict.contact_form.message_placeholder}
          required
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="border-slate-200 focus:border-[#e2211c] focus:ring-[#e2211c]/20 rounded-xl resize-none"
        />
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{dict.contact_form.error_message}</span>
        </div>
      )}

      <Button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-[#e2211c] hover:bg-[#b91c1c] text-white rounded-full h-14 text-sm sm:text-base font-bold shadow-lg shadow-red-200 hover:shadow-red-300 transition-all uppercase tracking-tight"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            <span className="truncate">{dict.contact_form.sending}</span>
          </>
        ) : (
          <span className="truncate">{dict.contact_form.send_button}</span>
        )}
      </Button>

      <p className="text-xs text-slate-400 text-center">
        {dict.contact_form.footer_note}
      </p>
    </form>
  );
}
