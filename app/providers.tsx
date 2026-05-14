"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { translations, type Lang } from "@/lib/i18n";
import { LanguageContext } from "@/lib/language-context";
import { ThemeContext } from "@/lib/theme-context";
import { dirFor, isLocale, LOCALES } from "@/lib/locales";

export default function Providers({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: Lang;
}) {
  const t = translations[lang];
  const [dark, setDark] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Switching language: keep the path, swap the locale prefix, navigate.
  const setLang = (next: Lang) => {
    if (next === lang) return;
    const segments = (pathname ?? "/").split("/").filter(Boolean);
    const head = segments[0];
    const rest = isLocale(head) ? segments.slice(1) : segments;
    const target = "/" + [next, ...rest].join("/");
    router.push(target);
  };

  // Keep <html lang dir> in sync with the URL-derived lang on the client.
  // Defensive against:
  //   - SSG pages whose prerendered HTML baked in the build-time lang
  //   - soft navigations (Link clicks) that don't re-render the root <html>
  // The middleware sets x-lang on the request so SSR is correct for crawlers;
  // this just guarantees correctness after hydration.
  useEffect(() => {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = dirFor(lang);
    html.className = dark ? "dark" : "";
  }, [lang, dark]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      <ThemeContext.Provider value={{ dark, setDark }}>
        <Navbar t={t} lang={lang} setLang={setLang} dark={dark} setDark={setDark} />
        <main>{children}</main>
        <Footer t={t} lang={lang} setLang={setLang} />
      </ThemeContext.Provider>
    </LanguageContext.Provider>
  );
}

// Re-export so older imports still resolve if any.
export { LOCALES };
