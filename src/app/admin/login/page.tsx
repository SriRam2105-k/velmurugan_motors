"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Lock, Mail, AlertCircle, LogIn, Eye, EyeOff, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setStatus("error");
      setErrorMsg(error.message);
    } else {
      router.push("/admin/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#e2211c]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Back Button */}
        <Link 
          href="/" 
          className="absolute -top-16 left-0 flex items-center gap-2 text-white/50 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>

        {/* Logo + header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#e2211c]/10 border border-[#e2211c]/20 mb-4">
            <Lock className="w-7 h-7 text-[#e2211c]" />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Portal</h1>
          <p className="text-white/40 text-sm mt-1">Hero Velmurugan Motors</p>
        </div>

        {/* Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/50">
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="admin-email" className="text-white/70 text-sm font-medium block">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  id="admin-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@velmuruganmotors.in"
                  className="w-full bg-white/5 border border-white/10 rounded-xl h-11 pl-10 pr-4 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[#e2211c]/60 focus:ring-2 focus:ring-[#e2211c]/20 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label htmlFor="admin-password" className="text-white/70 text-sm font-medium block">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl h-11 pl-10 pr-11 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[#e2211c]/60 focus:ring-2 focus:ring-[#e2211c]/20 transition-all"
                />
                <button
                  type="button"
                  id="toggle-password-visibility"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {status === "error" && (
              <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg || "Invalid credentials. Please try again."}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "loading"}
              id="admin-login-btn"
              className="w-full bg-[#e2211c] hover:bg-[#b91c1c] disabled:opacity-60 text-white rounded-xl h-12 font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-900/30 hover:shadow-red-900/50 hover:scale-[1.01] active:scale-[0.99]"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in…
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Sign In
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-white/20 text-xs mt-6">
          Authorised personnel only · Hero Velmurugan Motors
        </p>
      </div>
    </div>
  );
}
