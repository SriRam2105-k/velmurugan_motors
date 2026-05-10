import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-black text-[#e2211c] mb-4">404</div>
        <h1 className="text-2xl font-bold text-white mb-3">Page Not Found</h1>
        <p className="text-white/50 mb-8 leading-relaxed">
          Looks like you&apos;ve taken a wrong turn. The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-[#e2211c] hover:bg-[#b91c1c] text-white font-semibold px-7 py-3 rounded-full transition-all hover:scale-105"
          >
            <Home className="w-4 h-4" /> Go Home
          </Link>
          <Link
            href="/bikes"
            className="inline-flex items-center justify-center gap-2 border border-white/20 text-white hover:bg-white/10 font-semibold px-7 py-3 rounded-full transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> View Bikes
          </Link>
        </div>
      </div>
    </section>
  );
}
