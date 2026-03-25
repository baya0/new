"use client";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { translations } from "@/lib/i18n";

const t = translations.en;
const p = t.projects;

const colorMap: Record<string, { bg: string; text: string; tagBg: string; tagText: string; tagBorder: string }> = {
  blue:   { bg: "rgba(15,144,255,0.08)",  text: "var(--blue)",   tagBg: "rgba(15,144,255,0.08)",  tagText: "var(--blue)",   tagBorder: "rgba(15,144,255,0.2)" },
  green:  { bg: "rgba(30,221,128,0.08)",  text: "var(--green)",  tagBg: "rgba(30,221,128,0.08)",  tagText: "var(--green)",  tagBorder: "rgba(30,221,128,0.2)" },
  amber:  { bg: "rgba(255,166,0,0.08)",   text: "var(--amber)",  tagBg: "rgba(255,166,0,0.08)",   tagText: "var(--amber)",  tagBorder: "rgba(255,166,0,0.2)" },
  cyan:   { bg: "rgba(0,220,230,0.08)",   text: "var(--cyan)",   tagBg: "rgba(0,220,230,0.08)",   tagText: "var(--cyan)",   tagBorder: "rgba(0,220,230,0.2)" },
  purple: { bg: "rgba(155,109,255,0.08)", text: "var(--purple)", tagBg: "rgba(155,109,255,0.08)", tagText: "var(--purple)", tagBorder: "rgba(155,109,255,0.2)" },
};

export default function ProjectsPage() {
  return (
    <>
      {/* Page Hero */}
      <div className="px-8 py-14 border-b" style={{ background: "var(--bg0)", borderColor: "var(--border)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-medium border rounded-2xl px-4 py-1.5 mb-4"
            style={{ background: "rgba(15,144,255,0.1)", borderColor: "rgba(15,144,255,0.22)", color: "var(--blue)" }}>
            {p.eyebrow}
          </div>
          <h1 className="text-5xl font-bold leading-tight tracking-tight" style={{ color: "var(--white)" }}>
            {p.h1[0]}<br /><span style={{ color: "var(--blue)" }}>{p.h1[1]}</span>
          </h1>
          <p className="mt-4 text-base leading-relaxed max-w-xl" style={{ color: "var(--w55)" }}>{p.sub}</p>
        </div>
      </div>

      <section style={{ background: "var(--bg0)", padding: "64px 32px" }}>
        <div className="max-w-6xl mx-auto">

          {/* Project grid — 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {p.items.map((proj, i) => {
              const c = colorMap[proj.color];
              return (
                <div key={i} className="rounded-2xl border overflow-hidden card-hover"
                  style={{ background: "var(--bg2)", borderColor: "var(--border)" }}>

                  {/* Image area */}
                  <div className="h-36 flex items-center justify-center text-5xl border-b"
                    style={{ background: c.bg, borderColor: "var(--border)" }}>
                    {proj.icon}
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    <h3 className="text-base font-bold leading-snug mb-2" style={{ color: "var(--white)" }}>
                      {proj.title}
                    </h3>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--w55)" }}>
                      {proj.desc}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {proj.tags.map((tag, j) => (
                        <span key={j} className="text-[10px] px-2 py-0.5 rounded-lg border"
                          style={{ background: j === 0 ? c.tagBg : "var(--bg3)", color: j === 0 ? c.tagText : "var(--w55)", borderColor: j === 0 ? c.tagBorder : "var(--border)" }}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-1.5 mt-3 text-[10px]" style={{ color: "var(--w25)" }}>
                      <span>📍</span>
                      <span>{proj.location}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stats after projects */}
          <div className="mt-14 rounded-2xl border p-8 grid grid-cols-2 md:grid-cols-4 gap-6"
            style={{ background: "var(--bg2)", borderColor: "var(--border)", borderTop: "3px solid var(--blue)" }}>
            {[
              { val: "9", label: "Countries Served", icon: "🌍" },
              { val: "60+", label: "Engineers Deployed", icon: "👥" },
              { val: "9", label: "Nike Stores Migrated", icon: "👟" },
              { val: "36", label: "Devices Migrated in Win11 Project", icon: "💻" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl mb-2">{s.icon}</div>
                <div className="text-3xl font-bold" style={{ color: "var(--blue)" }}>{s.val}</div>
                <div className="text-xs mt-1" style={{ color: "var(--w55)" }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/contact"><Button>{p.cta}</Button></Link>
          </div>
        </div>
      </section>
    </>
  );
}
