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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-300",
        scrolled ? "glass" : ""
      )}
      style={{
        background: scrolled ? "var(--glass)" : "var(--bg1)",
        borderColor: scrolled ? "var(--glass-border)" : "var(--border)",
        height: 68,
      }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8 h-full flex items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 font-bold text-[17px] shrink-0 group" style={{ color: "var(--white)" }}>
          <span
            className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-extrabold text-white transition-transform group-hover:scale-110"
            style={{ background: "linear-gradient(135deg, var(--blue), #0066CC)" }}
          >
            S
          </span>
          <span>
            supportiva<span style={{ color: "var(--blue)" }}>.net</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex gap-0.5 ml-10 flex-1">
          {PAGES.map((p) => {
            const isActive = pathname === p.href || (p.href !== "/" && pathname.startsWith(p.href));
            return (
              <Link
                key={p.key}
                href={p.href}
                className={cn(
                  "relative px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all duration-200",
                  isActive
                    ? "text-[var(--blue)]"
                    : "hover:text-[var(--blue)]"
                )}
                style={{ color: isActive ? "var(--blue)" : "var(--w55)" }}
              >
                {isActive && (
                  <span
                    className="absolute inset-0 rounded-lg"
                    style={{ background: "rgba(15,144,255,0.08)" }}
                  />
                )}
                <span className="relative">{(t.nav as any)[p.key]}</span>
              </Link>
            );
          })}
        </div>

        {/* Right Controls */}
        <div className="hidden md:flex items-center gap-2.5 ml-auto">
          {/* Language pills */}
          <div className="flex gap-1 p-1 rounded-xl" style={{ background: "var(--bg2)" }}>
            {(["en", "ar", "tr"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all duration-200",
                  lang === l
                    ? "text-white shadow-sm"
                    : "text-[var(--w55)] hover:text-[var(--blue)]"
                )}
                style={{
                  background: lang === l ? "var(--blue)" : "transparent",
                }}
              >
                {l === "en" ? "EN" : l === "ar" ? "عر" : "TR"}
              </button>
            ))}
          </div>

          {/* Theme toggle */}
          <button
            onClick={() => setDark(!dark)}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
            style={{ background: "var(--bg2)", border: "1px solid var(--border)" }}
          >
            {dark ? <Sun size={14} color="var(--amber)" /> : <Moon size={14} color="var(--blue)" />}
          </button>

          {/* CTA */}
          <Link
            href="/contact"
            className="px-5 py-2.5 rounded-xl text-[13px] font-bold text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 hover:shadow-lg"
            style={{
              background: "linear-gradient(135deg, var(--blue), #0066CC)",
              boxShadow: "0 2px 12px rgba(15, 144, 255, 0.25)",
            }}
          >
            {t.nav.cta}
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden ml-auto w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ color: "var(--w55)", background: "var(--bg2)" }}
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
            className="md:hidden absolute top-full left-0 right-0 border-b z-50 py-3 px-4"
            style={{ background: "var(--bg1)", borderColor: "var(--border)" }}
          >
            {PAGES.map((p, i) => {
              const isActive = pathname === p.href || (p.href !== "/" && pathname.startsWith(p.href));
              return (
                <Link
                  key={p.key}
                  href={p.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between py-3.5 px-3 rounded-lg text-sm font-medium transition-colors mb-0.5"
                  style={{
                    color: isActive ? "var(--blue)" : "var(--w85)",
                    background: isActive ? "rgba(15,144,255,0.08)" : "transparent",
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
                    className="flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all"
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
