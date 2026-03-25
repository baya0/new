"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type Lang } from "@/lib/i18n";
import { Menu, X, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

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

  return (
    <nav
      className="sticky top-0 z-50 border-b"
      style={{ background: "var(--bg1)", borderColor: "var(--border)", height: 68 }}
    >
      <div className="max-w-6xl mx-auto px-8 h-full flex items-center gap-0">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-[17px] shrink-0" style={{ color: "var(--white)" }}>
          <span className="w-7 h-7 rounded-[7px] flex items-center justify-center text-xs font-bold text-white" style={{ background: "var(--blue)" }}>S</span>
          supportiva<span style={{ color: "var(--blue)" }}>.net</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex gap-1 ml-8 flex-1">
          {PAGES.map((p) => {
            const isActive = pathname === p.href || (p.href !== "/" && pathname.startsWith(p.href));
            return (
              <Link
                key={p.key}
                href={p.href}
                className={cn(
                  "px-3 py-2 rounded-lg text-[13px] transition-all",
                  isActive
                    ? "text-[var(--blue)] bg-[rgba(15,144,255,0.09)]"
                    : "hover:text-[var(--blue)] hover:bg-[rgba(15,144,255,0.06)]"
                )}
                style={{ color: isActive ? "var(--blue)" : "var(--w55)" }}
              >
                {(t.nav as any)[p.key]}
              </Link>
            );
          })}
        </div>

        {/* Right Controls */}
        <div className="hidden md:flex items-center gap-2 ml-auto">
          {/* Language pills */}
          {(["en", "ar", "tr"] as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={cn(
                "px-3 py-1.5 rounded-2xl text-xs border transition-all font-medium",
                lang === l
                  ? "border-[var(--blue)] text-[var(--blue)] bg-[rgba(15,144,255,0.09)]"
                  : "border-[var(--border)] text-[var(--w55)] hover:border-[var(--blue)] hover:text-[var(--blue)]"
              )}
              style={{ borderColor: lang === l ? "var(--blue)" : "var(--border)" }}
            >
              {l === "en" ? "EN" : l === "ar" ? "عر" : "TR"}
            </button>
          ))}

          {/* Theme toggle */}
          <button
            onClick={() => setDark(!dark)}
            className="w-8 h-8 rounded-lg border flex items-center justify-center transition-all hover:border-[var(--blue)]"
            style={{ background: "var(--bg2)", borderColor: "var(--border)" }}
          >
            {dark ? <Sun size={14} color="var(--w55)" /> : <Moon size={14} color="var(--w55)" />}
          </button>

          {/* CTA */}
          <Link
            href="/contact"
            className="px-5 py-2 rounded-[10px] text-[13px] font-bold text-white transition-all hover:opacity-85 hover:-translate-y-0.5"
            style={{ background: "var(--blue)" }}
          >
            {t.nav.cta}
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden ml-auto"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ color: "var(--w55)" }}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="md:hidden absolute top-full left-0 right-0 border-b z-50 py-4 px-6"
          style={{ background: "var(--bg1)", borderColor: "var(--border)" }}
        >
          {PAGES.map((p) => (
            <Link
              key={p.key}
              href={p.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-sm border-b transition-colors"
              style={{ color: "var(--w85)", borderColor: "var(--border)" }}
            >
              {(t.nav as any)[p.key]}
            </Link>
          ))}
          <div className="flex gap-2 mt-4">
            {(["en", "ar", "tr"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => { setLang(l); setMobileOpen(false); }}
                className="px-3 py-1.5 rounded-2xl text-xs border"
                style={{
                  borderColor: lang === l ? "var(--blue)" : "var(--border)",
                  color: lang === l ? "var(--blue)" : "var(--w55)",
                }}
              >
                {l === "en" ? "EN" : l === "ar" ? "عر" : "TR"}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
