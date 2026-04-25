"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { type Lang } from "@/lib/i18n";
import { Menu, X, Sun, Moon, ChevronRight, Globe } from "lucide-react";
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
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setLangOpen(false); }, [pathname]);

  return (
    <>
      {/* ── Floating Island Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none" style={{ paddingTop: scrolled ? 12 : 16, transition: "padding 0.4s cubic-bezier(0.22,1,0.36,1)" }}>
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto relative"
          style={{
            background: "var(--glass)",
            border: "1px solid var(--glass-border)",
            borderRadius: 16,
            boxShadow: scrolled
              ? "var(--shadow-lg)"
              : "var(--shadow)",
            padding: "0 8px",
            height: 56,
            transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
            maxWidth: "calc(100vw - 32px)",
          }}
        >
          <div className="h-full flex items-center gap-1">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 px-3 shrink-0 group" style={{ color: "var(--white)" }}>
              <Image
                src="/images/logo.avif"
                alt="Supportiva"
                width={60}
                height={60}
                // unoptimized
                className="transition-all duration-300 group-hover:scale-110"
              />
              <span className="font-extrabold text-[15px] hidden lg:inline">
                supportiva
              </span>
            </Link>

            {/* Divider */}
            <div className="hidden md:block w-px h-6 mx-1" style={{ background: "var(--border)" }} />

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-0.5">
              {PAGES.map((p) => {
                const isActive = pathname === p.href || (p.href !== "/" && pathname.startsWith(p.href));
                return (
                  <Link
                    key={p.key}
                    href={p.href}
                    className="relative px-3.5 py-1.5 text-[12.5px] font-semibold transition-all duration-250 rounded-lg hover:text-[var(--blue)]"
                    style={{ color: isActive ? "var(--blue)" : "var(--w55)" }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-lg"
                        style={{
                          background: "var(--tint-blue)",
                          border: "1px solid var(--tint-blue-border)",
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{(t.nav as any)[p.key]}</span>
                  </Link>
                );
              })}
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-6 mx-1" style={{ background: "var(--border)" }} />

            {/* Right Controls */}
            <div className="hidden md:flex items-center gap-1.5 px-1">
              {/* Language dropdown */}
              <div className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all duration-200 hover:scale-105"
                  style={{
                    background: langOpen ? "var(--tint-blue)" : "transparent",
                    color: "var(--w55)",
                    border: langOpen ? "1px solid var(--tint-blue-border)" : "1px solid transparent",
                  }}
                >
                  <Globe size={13} />
                  {lang.toUpperCase()}
                </button>
                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 4, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full right-0 mt-2 p-1.5 rounded-xl"
                      style={{
                        background: "var(--glass)",
                        border: "1px solid var(--glass-border)",
                        boxShadow: "var(--shadow-lg)",
                        minWidth: 80,
                      }}
                    >
                      {(["en", "ar", "tr"] as Lang[]).map((l) => (
                        <button
                          key={l}
                          onClick={() => { setLang(l); setLangOpen(false); }}
                          className="w-full px-3 py-2 rounded-lg text-[11px] font-bold text-left transition-all duration-150"
                          style={{
                            background: lang === l ? "var(--tint-blue)" : "transparent",
                            color: lang === l ? "var(--blue)" : "var(--w55)",
                          }}
                        >
                          {l === "en" ? "English" : l === "ar" ? "العربية" : "Türkçe"}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Theme toggle — pill with sliding indicator */}
              <button
                onClick={() => setDark(!dark)}
                aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
                className="relative w-[52px] h-7 rounded-full flex items-center transition-all duration-300"
                style={{
                  background: "var(--tint-blue)",
                  border: "1px solid var(--tint-blue-border)",
                }}
              >
                <motion.div
                  className="absolute w-5 h-5 rounded-full"
                  animate={{ x: dark ? 26 : 4 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  style={{
                    background: dark ? "var(--amber)" : "var(--blue)",
                    boxShadow: "var(--shadow-sm)",
                  }}
                />
                <Sun size={10} className="absolute" style={{ left: 7, color: dark ? "var(--w25)" : "white", zIndex: 1 }} />
                <Moon size={10} className="absolute" style={{ right: 7, color: dark ? "white" : "var(--w25)", zIndex: 1 }} />
              </button>
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden ml-auto w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              style={{ color: "var(--w55)" }}
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </motion.div>
      </nav>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              style={{ background: "rgba(0,0,0,0.25)" }}
              onClick={() => setMobileOpen(false)}
            />
            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[280px]"
              style={{
                background: "var(--glass)",
                borderLeft: "1px solid var(--glass-border)",
                boxShadow: "var(--shadow-xl)",
              }}
            >
              <div className="p-6 pt-8">
                {/* Close */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <Image src="/images/logo.avif" alt="Supportiva" width={50} height={50} />
                    <span className="font-extrabold text-[15px]" style={{ color: "var(--white)" }}>
                      supportiva
                    </span>
                  </div>
                  <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ color: "var(--w55)", background: "var(--bg3)" }}>
                    <X size={16} />
                  </button>
                </div>

                {/* Nav links */}
                <div className="space-y-1">
                  {PAGES.map((p, i) => {
                    const isActive = pathname === p.href || (p.href !== "/" && pathname.startsWith(p.href));
                    return (
                      <motion.div key={p.key} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                        <Link
                          href={p.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center justify-between py-3 px-4 rounded-lg text-[13px] font-semibold transition-all duration-200"
                          style={{
                            color: isActive ? "var(--blue)" : "var(--w85)",
                            background: isActive ? "var(--tint-blue)" : "transparent",
                          }}
                        >
                          <span>{(t.nav as any)[p.key]}</span>
                          <ChevronRight size={14} style={{ opacity: isActive ? 1 : 0.3, color: isActive ? "var(--blue)" : "var(--w25)" }} />
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Bottom controls */}
                <div className="mt-8 pt-6" style={{ borderTop: "1px solid var(--border)" }}>
                  {/* Language */}
                  <div className="flex gap-1 p-1 rounded-lg mb-4" style={{ background: "var(--bg3)", border: "1px solid var(--border)" }}>
                    {(["en", "ar", "tr"] as Lang[]).map((l) => (
                      <button
                        key={l}
                        onClick={() => { setLang(l); setMobileOpen(false); }}
                        className="flex-1 py-2 rounded-md text-[11px] font-bold transition-all"
                        style={{
                          background: lang === l ? "var(--blue)" : "transparent",
                          color: lang === l ? "#fff" : "var(--w55)",
                          boxShadow: lang === l ? "var(--shadow-sm)" : "none",
                        }}
                      >
                        {l === "en" ? "EN" : l === "ar" ? "عر" : "TR"}
                      </button>
                    ))}
                  </div>

                  {/* Theme toggle */}
                  <button
                    onClick={() => { setDark(!dark); setMobileOpen(false); }}
                    className="w-full flex items-center gap-3 py-3 px-4 rounded-lg text-[13px] font-semibold transition-all"
                    style={{ color: "var(--w85)", background: "var(--bg3)", border: "1px solid var(--border)" }}
                  >
                    {dark ? <Sun size={15} color="var(--amber)" /> : <Moon size={15} color="var(--blue)" />}
                    {dark ? "Light Mode" : "Dark Mode"}
                  </button>

                  {/* CTA */}
                  <Link
                    href="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="mt-4 flex items-center justify-center py-3 rounded-xl text-[13px] font-bold text-white transition-all"
                    style={{ background: "var(--gradient-brand)", boxShadow: "0 2px 0 rgba(0,0,0,0.15), 0 4px 12px rgba(28,78,138,0.18)" }}
                  >
                    {t.nav.cta}
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
