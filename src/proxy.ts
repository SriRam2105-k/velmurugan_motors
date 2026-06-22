import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['ta', 'en'];
const defaultLocale = 'ta';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip locale redirect for admin routes – they have their own layout
  if (pathname.startsWith('/admin')) return;

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next), API routes, and static files
    '/((?!_next|api|favicon.ico|og-cover.jpg|.*\\..*).*)',
  ],
};
