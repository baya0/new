"use client";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { translations } from "@/lib/i18n";

const t = translations.en;
const s = t.solutions;
const colorMap: Record<string, string> = {
  blue: "var(--blue)", cyan: "var(--cyan)", green: "var(--green)", amber: "var(--amber)",
};

export default function SolutionsPage() {
  return (
    <>
      {/* Page Hero */}
      <div className="px-8 py-14 border-b" style={{ background: "var(--bg0)", borderColor: "var(--border)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-medium border rounded-2xl px-4 py-1.5 mb-4" style={{ background: "rgba(15,144,255,0.1)", borderColor: "rgba(15,144,255,0.22)", color: "var(--blue)" }}>
            {s.eyebrow}
          </div>
          <h1 className="text-5xl font-bold leading-tight tracking-tight max-w-2xl" style={{ color: "var(--white)" }} dangerouslySetInnerHTML={{ __html: s.h1 }} />
          <p className="mt-4 text-base leading-relaxed max-w-xl" style={{ color: "var(--w55)" }}>{s.sub}</p>
        </div>
      </div>

      <section style={{ background: "var(--bg0)", padding: "64px 32px" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-[9px] font-medium tracking-widest mb-8" style={{ color: "var(--blue)" }}>{s.label}</div>

          {/* Services grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            {s.services.map((svc, i) => (
              <div
                key={i}
                className="rounded-2xl p-7 border card-hover relative overflow-hidden"
                style={{ background: "var(--bg2)", borderColor: "var(--border)" }}
              >
                <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: colorMap[svc.color] }} />
                <div className="text-3xl mb-4">{svc.icon}</div>
                <h3 className="text-lg font-bold mb-3" style={{ color: "var(--white)" }}>{svc.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--w55)" }}>{svc.desc}</p>
                <div
                  className="inline-block mt-4 px-3 py-1.5 rounded-xl text-xs"
                  style={{ background: `${colorMap[svc.color]}10`, border: `1px solid ${colorMap[svc.color]}25`, color: colorMap[svc.color] }}
                >
                  {svc.tag}
                </div>
              </div>
            ))}
          </div>

          {/* Why Choose Supportiva */}
          <div
            className="rounded-2xl p-8 border"
            style={{ background: "var(--bg2)", borderColor: "var(--border)", borderTop: "3px solid var(--blue)" }}
          >
            <h3 className="text-xl font-bold mb-3" style={{ color: "var(--white)" }}>{s.whyTitle}</h3>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--w55)" }}>{s.whyDesc}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {s.whyPoints.map((point, i) => (
                <div key={i} className="flex gap-3 text-sm" style={{ color: "var(--w85)" }}>
                  <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5" style={{ background: "rgba(15,144,255,0.12)", color: "var(--blue)" }}>✓</div>
                  {point}
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-10">
            <Link href="/contact"><Button>{s.cta}</Button></Link>
          </div>
        </div>
      </section>
    </>
  );
}
