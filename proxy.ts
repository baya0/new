import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_LOCALE, isLocale, LOCALES } from "@/lib/locales";
import type { Lang } from "@/lib/i18n";

const LOCALE_COOKIE = "supportiva_lang";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

// Paths the locale layer should never touch: Studio, APIs, framework assets,
// metadata files, public images.
function isExempt(pathname: string): boolean {
  return (
    pathname.startsWith("/studio") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/opengraph-image" ||
    /\.[a-zA-Z0-9]+$/.test(pathname)
  );
}

function pickLocaleFromHeader(accept: string | null): Lang | null {
  if (!accept) return null;
  // Accept-Language: "ar-SA,ar;q=0.9,en;q=0.8" — take the first match.
  const parts = accept
    .split(",")
    .map((p) => p.split(";")[0].trim().toLowerCase());
  for (const part of parts) {
    const head = part.split("-")[0];
    if (isLocale(head)) return head;
  }
  return null;
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (isExempt(pathname)) return NextResponse.next();

  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  // Already locale-prefixed → just expose the lang to the root layout via header.
  if (isLocale(first)) {
    const res = NextResponse.next();
    res.headers.set("x-lang", first);
    // Sticky preference so language-switcher choices survive future bare-URL visits.
    res.cookies.set(LOCALE_COOKIE, first, {
      maxAge: COOKIE_MAX_AGE,
      path: "/",
      sameSite: "lax",
    });
    return res;
  }

  // Bare or non-locale path → redirect to the canonical locale URL.
  // Detect from cookie first (returning visitor), then Accept-Language, then default.
  const cookieLang = req.cookies.get(LOCALE_COOKIE)?.value;
  const fromCookie = isLocale(cookieLang) ? cookieLang : null;
  const fromHeader = pickLocaleFromHeader(req.headers.get("accept-language"));
  const target: Lang = fromCookie ?? fromHeader ?? DEFAULT_LOCALE;

  const url = req.nextUrl.clone();
  url.pathname = `/${target}${pathname === "/" ? "" : pathname}`;

  // `/` → `/<detected>` varies per visitor (cookie / Accept-Language), so use
  // 302 to keep crawlers from treating one locale as the canonical for `/`.
  // `/blog` → `/en/blog` is a permanent canonical move; use 301 so PageRank
  // consolidates on the locale-prefixed URL.
  const status = pathname === "/" ? 302 : 301;
  return NextResponse.redirect(url, status);
}

export const config = {
  // Run on everything except the explicit exemptions handled in code above.
  // The matcher excludes obvious static-asset and Studio paths up-front to
  // keep middleware overhead off the hot path.
  matcher: [
    "/((?!api|_next|studio|images|favicon.ico|robots.txt|sitemap.xml|opengraph-image).*)",
  ],
};

void LOCALES;
