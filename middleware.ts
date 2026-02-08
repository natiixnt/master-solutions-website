import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "pl"] as const;
type Locale = (typeof locales)[number];
const isLocale = (val: string): val is Locale => locales.includes(val as Locale);
const defaultLocale = "en";

function getPreferredLocale(req: NextRequest) {
  const header = req.headers.get("accept-language") || "";
  const preferred = header.split(",")[0]?.split("-")[0];
  if (preferred && isLocale(preferred)) return preferred;
  return defaultLocale;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/_next") || pathname.includes(".") || pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const pathLocale = pathname.split("/")[1];
  if (isLocale(pathLocale)) {
    return NextResponse.next();
  }

  const locale = getPreferredLocale(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: "/:path*",
};
