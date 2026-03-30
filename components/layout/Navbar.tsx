"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type Lang } from "@/lib/i18n";
import { Menu, X, Sun, Moon, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  t: any;
  lang: Lang;
  setLang: (l: Lang) => void;
  dark: boolean;
  setDark: (d: boolean) => void;
}

const PAGES = [
  { key: "home",      href: "/" },
  { key: "solutions", href: "/solutions" },
  { key: "vision",    href: "/vision" },
  { key: "projects",  href: "/projects" },
  { key: "blog",      href: "/blog" },
  { key: "contact",   href: "/contact" },
];

export default function Navbar({ t, lang, setLang, dark, setDark }: NavbarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 transition-all duration-400",
        scrolled ? "glass shadow-sm" : ""
      )}
      style={{
        background: scrolled ? "var(--glass)" : "var(--bg1)",
        borderBottom: `1px solid ${scrolled ? "var(--glass-border)" : "var(--border)"}`,
        height: 72,
      }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8 h-full flex items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 font-extrabold text-[17px] shrink-0 group" style={{ color: "var(--white)" }}>
          <span
            className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black text-white transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
            style={{ background: "var(--gradient-brand)", boxShadow: "var(--shadow-blue)" }}
          >
            S
          </span>
          <span>
            supportiva<span style={{ color: "var(--blue)" }}>.net</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-1 ml-10 flex-1">
          {PAGES.map((p) => {
            const isActive = pathname === p.href || (p.href !== "/" && pathname.startsWith(p.href));
            return (
              <Link
                key={p.key}
                href={p.href}
                className="relative px-4 py-2 rounded-xl text-[13px] font-semibold transition-all duration-200"
                style={{ color: isActive ? "var(--blue)" : "var(--w55)" }}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-xl" style={{ background: "rgba(29,107,196,0.08)" }} />
                )}
                <span className="relative hover:text-[var(--blue)] transition-colors">{(t.nav as any)[p.key]}</span>
              </Link>
            );
          })}
        </div>

        {/* Right Controls */}
        <div className="hidden md:flex items-center gap-3 ml-auto">
          {/* Language pills */}
          <div className="flex gap-1 p-1 rounded-xl" style={{ background: "var(--bg2)", border: "1px solid var(--border)" }}>
            {(["en", "ar", "tr"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className="px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all duration-200"
                style={{
                  background: lang === l ? "var(--blue)" : "transparent",
                  color: lang === l ? "#fff" : "var(--w55)",
                  boxShadow: lang === l ? "var(--shadow-blue)" : "none",
                }}
              >
                {l === "en" ? "EN" : l === "ar" ? "عر" : "TR"}
              </button>
            ))}
          </div>

          {/* Theme toggle */}
          <button
            onClick={() => setDark(!dark)}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105"
            style={{ background: "var(--bg2)", border: "1px solid var(--border)" }}
          >
            {dark ? <Sun size={15} color="var(--amber)" /> : <Moon size={15} color="var(--blue)" />}
          </button>

          {/* CTA */}
          <Link
            href="/contact"
            className="px-5 py-2.5 rounded-xl text-[13px] font-bold text-white transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: "var(--gradient-brand)",
              boxShadow: "var(--shadow-blue)",
            }}
          >
            {t.nav.cta}
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden ml-auto w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ color: "var(--w55)", background: "var(--bg2)", border: "1px solid var(--border)" }}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0 z-50 py-3 px-4 glass"
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            {PAGES.map((p) => {
              const isActive = pathname === p.href || (p.href !== "/" && pathname.startsWith(p.href));
              return (
                <Link
                  key={p.key}
                  href={p.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between py-3.5 px-3 rounded-xl text-sm font-semibold transition-colors mb-0.5"
                  style={{
                    color: isActive ? "var(--blue)" : "var(--w85)",
                    background: isActive ? "rgba(29,107,196,0.08)" : "transparent",
                  }}
                >
                  <span>{(t.nav as any)[p.key]}</span>
                  <ChevronRight size={14} style={{ opacity: 0.4 }} />
                </Link>
              );
            })}

            <div className="flex items-center gap-2 mt-3 pt-3 border-t px-1" style={{ borderColor: "var(--border)" }}>
              <div className="flex gap-1 p-1 rounded-xl flex-1" style={{ background: "var(--bg2)" }}>
                {(["en", "ar", "tr"] as Lang[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => { setLang(l); setMobileOpen(false); }}
                    className="flex-1 py-1.5 rounded-lg text-xs font-bold transition-all"
                    style={{
                      background: lang === l ? "var(--blue)" : "transparent",
                      color: lang === l ? "#fff" : "var(--w55)",
                    }}
                  >
                    {l === "en" ? "EN" : l === "ar" ? "عر" : "TR"}
                  </button>
                ))}
              </div>
              <button
                onClick={() => { setDark(!dark); setMobileOpen(false); }}
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: "var(--bg2)", border: "1px solid var(--border)" }}
              >
                {dark ? <Sun size={14} color="var(--amber)" /> : <Moon size={14} color="var(--blue)" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
