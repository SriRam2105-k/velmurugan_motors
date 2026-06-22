"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Bike } from "@/data/bikes";
import type { Enquiry } from "@/data/enquiries";
import {
  LayoutDashboard, Bike as BikeIcon, MessageSquare, LogOut,
  Package, TrendingUp, Users, ToggleLeft, ToggleRight, Edit2,
  CheckCircle, XCircle, ChevronDown, ChevronUp, Phone, Mail, Calendar, Image as ImageIcon, Trash2, Upload, Eye, MessageCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { CarouselImage } from "@/data/carousel";

type Tab = "overview" | "enquiries" | "carousel";

interface AdminDashboardClientProps {
  user: { email?: string; id: string };
  bikes: Bike[];
  enquiries: Enquiry[];
  carouselImages: CarouselImage[];
  visitors?: number;
  whatsappClicks?: number;
}

export default function AdminDashboardClient({
  user,
  bikes: initialBikes,
  enquiries,
  carouselImages: initialCarousel,
  visitors = 0,
  whatsappClicks = 0,
}: AdminDashboardClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [bikes, setBikes] = useState(initialBikes);
  const [carouselImages, setCarouselImages] = useState(initialCarousel);
  const [savingSlug, setSavingSlug] = useState<string | null>(null);
  const [editingPrices, setEditingPrices] = useState<Record<string, { exShowroom: number; onRoad: number; emiStarting: number }>>({});
  const [expandedEnquiry, setExpandedEnquiry] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState<number | null>(null);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  const toggleStock = async (slug: string, currentStock: boolean) => {
    setSavingSlug(slug);
    const res = await fetch(`/api/admin/bikes/${slug}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ in_stock: !currentStock }),
    });
    if (res.ok) {
      setBikes((prev) =>
        prev.map((b) => (b.slug === slug ? { ...b, inStock: !currentStock } : b))
      );
    }
    setSavingSlug(null);
  };

  const savePrice = async (slug: string) => {
    const prices = editingPrices[slug];
    if (!prices) return;
    setSavingSlug(slug);
    const res = await fetch(`/api/admin/bikes/${slug}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        price_ex_showroom: prices.exShowroom,
        price_on_road: prices.onRoad,
        price_emi_starting: prices.emiStarting,
      }),
    });
    if (res.ok) {
      setBikes((prev) =>
        prev.map((b) =>
          b.slug === slug ? { ...b, price: prices } : b
        )
      );
      setEditingPrices((prev) => {
        const next = { ...prev };
        delete next[slug];
        return next;
      });
    }
    setSavingSlug(null);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, slotIndex: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(slotIndex);
    try {
      const existingImg = carouselImages.find((i) => i.display_order === slotIndex) 
        || carouselImages.filter((i) => ![1, 2, 3].includes(i.display_order))[slotIndex - 1];

      if (existingImg) {
        await fetch(`/api/admin/carousel/${existingImg.id}`, { method: "DELETE" });
      }

      const supabase = createClient();
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;

      // Upload to storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("public-assets")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("public-assets")
        .getPublicUrl(fileName);

      // Save to database
      const res = await fetch("/api/admin/carousel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image_url: publicUrlData.publicUrl,
          display_order: slotIndex,
        }),
      });

      if (res.ok) {
        const { data } = await res.json();
        setCarouselImages((prev) => {
          const filtered = prev.filter((img) => img.id !== existingImg?.id);
          return [...filtered, data];
        });
      }
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Failed to upload image. Please check your storage bucket settings.");
    } finally {
      setUploadingImage(null);
      e.target.value = "";
    }
  };

  const handleDeleteImage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this photo?")) return;
    
    try {
      const res = await fetch(`/api/admin/carousel/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setCarouselImages((prev) => prev.filter((img) => img.id !== id));
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const formatINR = (n: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });

  const inStock = bikes.filter((b) => b.inStock).length;
  const outOfStock = bikes.filter((b) => !b.inStock).length;

  const navItems: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "carousel", label: "Carousel Photos", icon: ImageIcon },
    { id: "enquiries", label: `Enquiries (${enquiries.length})`, icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0f172a] min-h-screen flex flex-col fixed left-0 top-0 bottom-0 z-20">
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#e2211c] flex items-center justify-center">
              <BikeIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-none">Velmurugan</p>
              <p className="text-white/40 text-xs">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                activeTab === item.id
                  ? "bg-[#e2211c] text-white shadow-lg shadow-red-900/30"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>

        {/* User + logout */}
        <div className="p-4 border-t border-white/10">
          <p className="text-white/30 text-xs truncate px-2 mb-2">{user.email}</p>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/50 hover:text-red-400 hover:bg-white/5 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64 p-8 max-w-6xl">

        {/* ── OVERVIEW TAB ── */}
        {activeTab === "overview" && (
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-1">Good day 👋</h1>
            <p className="text-slate-500 mb-8">Here's a snapshot of your showroom.</p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
              {[
                { label: "Total Bikes", value: bikes.length, icon: Package, color: "bg-blue-50 text-blue-600" },
                { label: "Visitors", value: visitors, icon: Eye, color: "bg-indigo-50 text-indigo-600" },
                { label: "WhatsApp Clicks", value: whatsappClicks, icon: MessageCircle, color: "bg-emerald-50 text-emerald-600" },
                { label: "Enquiries", value: enquiries.length, icon: Users, color: "bg-amber-50 text-amber-600" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-4", stat.color)}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-slate-500 text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            <h2 className="text-lg font-bold text-slate-900 mb-4">Recent Enquiries</h2>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              {enquiries.slice(0, 5).map((enq) => (
                <div key={enq.id} className="flex items-center justify-between px-6 py-4 border-b border-slate-50 last:border-0">
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{enq.name}</p>
                    <p className="text-slate-400 text-xs mt-0.5">{enq.bike_slug || "General enquiry"}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-500 text-xs">{formatDate(enq.created_at)}</p>
                    {enq.phone && <p className="text-slate-700 text-xs font-medium mt-0.5">{enq.phone}</p>}
                  </div>
                </div>
              ))}
              {enquiries.length === 0 && (
                <p className="text-slate-400 text-sm text-center py-8">No enquiries yet.</p>
              )}
            </div>
          </div>
        )}

        {/* ── CAROUSEL PHOTOS TAB ── */}
        {activeTab === "carousel" && (
          <div>
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-slate-900 mb-1">Carousel Photos</h1>
              <p className="text-slate-500">Manage the sliding images on the homepage (Slots 1 to 3).</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((slotIndex) => {
                const img = carouselImages.find((i) => i.display_order === slotIndex) 
                  || carouselImages.filter((i) => ![1, 2, 3].includes(i.display_order))[slotIndex - 1];
                const isUploading = uploadingImage === slotIndex;

                return (
                  <div key={slotIndex} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                      <h3 className="font-bold text-slate-700">Slide {slotIndex}</h3>
                      {img && (
                        <button
                          onClick={() => handleDeleteImage(img.id)}
                          className="text-red-500 hover:text-red-700 p-2 bg-white rounded-lg shadow-sm border border-slate-100 transition-colors"
                          title="Delete Photo"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <div className="aspect-[16/9] relative bg-slate-100 flex-1 flex flex-col items-center justify-center group">
                      {img ? (
                        <>
                          <img
                            src={img.image_url}
                            alt={`Slide ${slotIndex}`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
                            <div className="relative">
                              <input
                                type="file"
                                accept="image/png, image/jpeg, image/webp"
                                onChange={(e) => handleImageUpload(e, slotIndex)}
                                disabled={isUploading}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
                              />
                              <button
                                disabled={isUploading}
                                className="flex items-center gap-2 bg-white text-slate-900 px-4 py-2 rounded-xl font-bold hover:bg-slate-100 transition-colors disabled:opacity-50"
                              >
                                <Upload className="w-4 h-4" />
                                {isUploading ? "Uploading..." : "Replace Photo"}
                              </button>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                          <ImageIcon className="w-8 h-8 text-slate-300 mb-3" />
                          <p className="text-slate-400 text-sm mb-4">No image for Slide {slotIndex}</p>
                          <div className="relative">
                            <input
                              type="file"
                              accept="image/png, image/jpeg, image/webp"
                              onChange={(e) => handleImageUpload(e, slotIndex)}
                              disabled={isUploading}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
                            />
                            <button
                              disabled={isUploading}
                              className="flex items-center gap-2 bg-[#e2211c] text-white px-4 py-2 rounded-xl font-bold hover:bg-red-700 transition-colors disabled:opacity-50"
                            >
                              <Upload className="w-4 h-4" />
                              {isUploading ? "Uploading..." : "Upload Photo"}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}



        {/* ── ENQUIRIES TAB ── */}
        {activeTab === "enquiries" && (
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-1">Customer Enquiries</h1>
            <p className="text-slate-500 mb-8">{enquiries.length} total enquiries from your contact form.</p>

            <div className="space-y-3">
              {enquiries.map((enq) => (
                <div key={enq.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                  <button
                    onClick={() => setExpandedEnquiry(expandedEnquiry === enq.id ? null : enq.id)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-full bg-[#e2211c]/10 flex items-center justify-center text-[#e2211c] font-bold text-sm shrink-0">
                        {enq.name[0]?.toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 text-sm">{enq.name}</p>
                        <p className="text-slate-400 text-xs mt-0.5">
                          {enq.bike_slug ? `Interested in: ${enq.bike_slug}` : "General enquiry"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="text-slate-400 text-xs hidden sm:block">{formatDate(enq.created_at)}</p>
                      {expandedEnquiry === enq.id
                        ? <ChevronUp className="w-4 h-4 text-slate-400" />
                        : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </div>
                  </button>

                  {expandedEnquiry === enq.id && (
                    <div className="px-6 pb-5 border-t border-slate-50 pt-4 space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {enq.phone && (
                          <a href={`tel:${enq.phone}`} className="flex items-center gap-2 text-sm text-slate-700 hover:text-[#e2211c] transition-colors">
                            <Phone className="w-4 h-4 text-slate-400" />
                            {enq.phone}
                          </a>
                        )}
                        {enq.email && (
                          <a href={`mailto:${enq.email}`} className="flex items-center gap-2 text-sm text-slate-700 hover:text-[#e2211c] transition-colors">
                            <Mail className="w-4 h-4 text-slate-400" />
                            {enq.email}
                          </a>
                        )}
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatDate(enq.created_at)}
                        </div>
                      </div>
                      {enq.message && (
                        <div className="bg-slate-50 rounded-xl p-4">
                          <p className="text-xs text-slate-400 mb-1 uppercase font-bold tracking-wider">Message</p>
                          <p className="text-sm text-slate-700 leading-relaxed">{enq.message}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {enquiries.length === 0 && (
                <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
                  <MessageSquare className="w-10 h-10 text-slate-200 mx-auto mb-3" />
                  <p className="text-slate-400 font-medium">No enquiries yet.</p>
                  <p className="text-slate-300 text-sm mt-1">They'll appear here when customers fill the contact form.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
