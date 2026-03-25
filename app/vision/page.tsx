"use client";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { translations } from "@/lib/i18n";

const t = translations.en;
const v = t.vision;
const colorMap: Record<string, string> = {
  blue: "var(--blue)", cyan: "var(--cyan)", green: "var(--green)",
};

export default function VisionPage() {
  return (
    <>
      {/* Page Hero */}
      <div className="px-8 py-14 border-b" style={{ background: "var(--bg0)", borderColor: "var(--border)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-medium border rounded-2xl px-4 py-1.5 mb-4"
            style={{ background: "rgba(15,144,255,0.1)", borderColor: "rgba(15,144,255,0.22)", color: "var(--blue)" }}>
            {v.eyebrow}
          </div>
          <h1 className="text-5xl font-bold leading-tight tracking-tight max-w-2xl" style={{ color: "var(--white)" }}
            dangerouslySetInnerHTML={{ __html: v.h1.replace("Empower", `<span style="color:var(--blue)">Empower</span>`) }} />
          <p className="mt-4 text-base leading-relaxed max-w-xl" style={{ color: "var(--w55)" }}>{v.sub}</p>
        </div>
      </div>

      <section style={{ background: "var(--bg0)", padding: "64px 32px" }}>
        <div className="max-w-6xl mx-auto">

          {/* Mission + Video */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-4xl font-bold mb-5" style={{ color: "var(--white)" }}>{v.missionTitle}</h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--w55)" }}>{v.mission1}</p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--w55)" }}>{v.mission2}</p>
              <Link href="/contact" className="inline-block mt-8">
                <Button>Work With Us →</Button>
              </Link>
            </div>

            {/* Video placeholder */}
            <div className="rounded-2xl border flex flex-col items-center justify-center min-h-[360px]"
              style={{ background: "var(--bg2)", borderColor: "var(--border)", borderTop: "3px solid var(--blue)" }}>
              <button className="w-16 h-16 rounded-full border flex items-center justify-center text-xl mb-4 transition-all hover:scale-110"
                style={{ background: "rgba(15,144,255,0.14)", borderColor: "rgba(15,144,255,0.28)" }}>
                ▶
              </button>
              <p className="text-sm" style={{ color: "var(--w55)" }}>{v.watchLabel}</p>
            </div>
          </div>

          {/* Values */}
          <div className="text-[9px] font-medium tracking-widest mb-6" style={{ color: "var(--blue)" }}>{v.valuesLabel}</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {v.values.map((val, i) => (
              <div key={i} className="rounded-2xl p-6 border card-hover"
                style={{ background: "var(--bg2)", borderColor: "var(--border)", borderTop: `3px solid ${colorMap[val.color]}` }}>
                <div className="text-3xl mb-4">{val.icon}</div>
                <h3 className="text-lg font-bold mb-2" style={{ color: "var(--white)" }}>{val.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--w55)" }}>{val.desc}</p>
              </div>
            ))}
          </div>

          {/* Stats strip */}
          <div className="mt-16 rounded-2xl border p-8 grid grid-cols-2 md:grid-cols-4 gap-6"
            style={{ background: "var(--bg2)", borderColor: "var(--border)" }}>
            {[
              { val: "11+", label: "Years in Business" },
              { val: "9", label: "Global Locations" },
              { val: "27+", label: "Projects Delivered" },
              { val: "100%", label: "Client Retention" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-bold" style={{ color: "var(--blue)" }}>{s.val}</div>
                <div className="text-xs mt-2" style={{ color: "var(--w55)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
