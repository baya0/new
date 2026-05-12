"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { translations, type Lang } from "@/lib/i18n";
import { LanguageContext } from "@/lib/language-context";
import { ThemeContext } from "@/lib/theme-context";

const LANG_COOKIE = "supportiva_lang";
const VALID: Lang[] = ["en", "ar", "tr"];

function readLangCookie(): Lang {
  if (typeof document === "undefined") return "en";
  const match = document.cookie.match(new RegExp(`${LANG_COOKIE}=([^;]+)`));
  const v = match?.[1] as Lang | undefined;
  return v && VALID.includes(v) ? v : "en";
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const [dark, setDark] = useState(false);
  const t = translations[lang];
  const pathname = usePathname();
  const router = useRouter();
  const initialized = useRef(false);

  // The Sanity Studio at /studio is a full-screen app that ships its own
  // chrome — don't wrap it with the marketing site's nav and footer.
  const isStudio = pathname?.startsWith("/studio") ?? false;

  // First mount: pull persisted language from cookie so the choice survives
  // reloads and matches what the server already rendered.
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    const saved = readLangCookie();
    if (saved !== "en") setLang(saved);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === "ar" ? "rtl" : "ltr";
    html.className = dark ? "dark" : "";
  }, [lang, dark]);

  // Persist the language to a cookie that server components read, then
  // refresh so any Sanity-backed content re-fetches in the new language.
  useEffect(() => {
    if (!initialized.current) return;
    document.cookie = `${LANG_COOKIE}=${lang}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
    router.refresh();
  }, [lang, router]);

  if (isStudio) {
    return <>{children}</>;
  }

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
