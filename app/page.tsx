"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import DashboardCard from "@/components/sections/DashboardCard";
import { Button } from "@/components/ui/Button";
import { translations } from "@/lib/i18n";

// NOTE: In a real app this would receive t from context/props.
// For standalone page demo we default to English.
const t = translations.en;
const th = t.home;

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } };
const stagger = { animate: { transition: { staggerChildren: 0.1 } } };

const colorMap: Record<string, string> = {
  blue: "var(--blue)", cyan: "var(--cyan)", green: "var(--green)", amber: "var(--amber)",
};

export default function HomePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden flex items-center" style={{ background: "var(--bg0)", minHeight: "calc(100vh - 68px)" }}>
        {/* Glow orbs */}
        <div className="glow-orb w-[660px] h-[660px] opacity-[0.07]" style={{ background: "radial-gradient(circle, var(--blue), transparent 70%)", right: -80, top: -80 }} />
        <div className="glow-orb w-[280px] h-[280px] opacity-[0.05]" style={{ background: "radial-gradient(circle, var(--cyan), transparent 70%)", left: 40, bottom: 80 }} />

        {/* Dot grid */}
        <div className="hero-dot-grid">
          {Array.from({ length: 160 }).map((_, i) => {
            const x = (i % 16) * 44 + 76;
            const y = Math.floor(i / 16) * 52 + 56;
            return <div key={i} className="absolute w-0.5 h-0.5 rounded-full" style={{ background: "var(--blue)", opacity: 0.04 + (i % 3) * 0.02, left: x, top: y }} />;
          })}
        </div>

        <div className="relative max-w-6xl mx-auto px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center w-full">
          {/* Left */}
          <motion.div {...fadeUp}>
            <div className="inline-flex items-center gap-2 text-xs font-medium border rounded-2xl px-4 py-1.5 mb-5" style={{ background: "rgba(15,144,255,0.11)", borderColor: "rgba(15,144,255,0.25)", color: "var(--blue)" }}>
              {th.eyebrow}
            </div>
            <h1 className="text-5xl lg:text-[62px] font-bold leading-[1.12] tracking-tight" style={{ color: "var(--white)" }}>
              {th.h1[0]}<br />{th.h1[1]}<br /><span style={{ color: "var(--blue)" }}>{th.h1[2]}</span>
            </h1>
            <p className="mt-5 text-base leading-relaxed max-w-lg" style={{ color: "var(--w55)" }}>{th.sub}</p>

            <div className="flex gap-3 mt-7 flex-wrap">
              <Link href="/solutions"><Button>{th.btn1}</Button></Link>
              <Link href="/projects"><Button variant="secondary">{th.btn2}</Button></Link>
            </div>

            {/* Stats row */}
            <div className="flex gap-7 mt-9 pt-7 border-t flex-wrap" style={{ borderColor: "var(--border)" }}>
              {th.stats.map((s, i) => (
                <div key={i}>
                  <div className="text-2xl font-bold" style={{ color: "var(--blue)" }}>{s.val}</div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--w55)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Dashboard card */}
          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <DashboardCard t={t} />
          </motion.div>
        </div>
      </section>

      {/* ── CLIENTS MARQUEE ──────────────────────────────────── */}
      <div className="border-t border-b overflow-hidden py-5 px-8" style={{ background: "var(--bg1)", borderColor: "var(--border)" }}>
        <div className="marquee-track">
          <span className="text-[9px] font-medium tracking-widest" style={{ color: "var(--w25)" }}>{th.trustedBy}</span>
          {[...th.clients, ...th.clients].map((c, i) => (
            <span key={i} className="text-lg font-bold whitespace-nowrap" style={{ color: "var(--w25)" }}>{c}</span>
          ))}
        </div>
      </div>

      {/* ── SERVICES ─────────────────────────────────────────── */}
      <section style={{ background: "var(--bg0)", padding: "80px 32px" }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-12 flex-wrap gap-4">
            <div>
              <div className="text-[9px] font-medium tracking-widest mb-2" style={{ color: "var(--blue)" }}>{th.servicesLabel}</div>
              <h2 className="text-4xl font-bold" style={{ color: "var(--white)" }} dangerouslySetInnerHTML={{ __html: th.servicesTitle }} />
            </div>
            <Link href="/solutions" className="text-sm transition-colors hover:opacity-75" style={{ color: "var(--blue)" }}>{th.servicesAll}</Link>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Big card */}
            <div className="row-span-2 rounded-2xl p-7 border card-hover relative overflow-hidden" style={{ background: "var(--bg2)", borderColor: "var(--border)" }}>
              <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: colorMap[th.services[0].color] }} />
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-5" style={{ background: `${colorMap[th.services[0].color]}18` }}>
                {th.services[0].icon}
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: "var(--white)" }}>{th.services[0].title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--w55)" }}>{th.services[0].desc}</p>
              <div className="inline-block mt-4 px-3 py-1 rounded-xl text-xs" style={{ background: `${colorMap[th.services[0].color]}10`, border: `1px solid ${colorMap[th.services[0].color]}25`, color: colorMap[th.services[0].color] }}>
                {th.services[0].tag}
              </div>
              <div className="mt-4 text-sm cursor-pointer transition-opacity hover:opacity-75" style={{ color: "var(--blue)" }}>Learn more ↗</div>
            </div>

            {/* Two small cards */}
            {th.services.slice(1, 3).map((svc, i) => (
              <div key={i} className="rounded-2xl p-6 border card-hover relative overflow-hidden" style={{ background: "var(--bg2)", borderColor: "var(--border)" }}>
                <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: colorMap[svc.color] }} />
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-3" style={{ background: `${colorMap[svc.color]}18` }}>
                  {svc.icon}
                </div>
                <h3 className="text-base font-bold mb-1.5" style={{ color: "var(--white)" }}>{svc.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--w55)" }}>{svc.desc}</p>
                <div className="inline-block mt-3 px-3 py-1 rounded-xl text-[10px]" style={{ background: `${colorMap[svc.color]}10`, border: `1px solid ${colorMap[svc.color]}25`, color: colorMap[svc.color] }}>
                  {svc.tag}
                </div>
              </div>
            ))}

            {/* Wide card */}
            <div className="col-span-2 rounded-2xl p-6 border card-hover relative overflow-hidden" style={{ background: "var(--bg2)", borderColor: "var(--border)" }}>
              <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: colorMap[th.services[3].color] }} />
              <div className="flex items-center gap-5">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0" style={{ background: `${colorMap[th.services[3].color]}18` }}>
                  {th.services[3].icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold mb-1" style={{ color: "var(--white)" }}>{th.services[3].title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--w55)" }}>{th.services[3].desc}</p>
                </div>
                <div className="inline-block px-3 py-1.5 rounded-xl text-[10px] shrink-0" style={{ background: `${colorMap[th.services[3].color]}10`, border: `1px solid ${colorMap[th.services[3].color]}25`, color: colorMap[th.services[3].color] }}>
                  {th.services[3].tag}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────── */}
      <div className="border-t border-b" style={{ background: "var(--bg1)", borderColor: "var(--border)" }}>
        <div className="max-w-6xl mx-auto px-8 py-10 grid grid-cols-2 md:grid-cols-4">
          {th.statsBar.map((s, i) => (
            <div key={i} className="px-5 border-r last:border-r-0" style={{ borderColor: "var(--border)" }}>
              <div className="text-5xl font-bold leading-none" style={{ color: "var(--blue)" }}>{s.val}</div>
              <div className="text-sm font-bold mt-2" style={{ color: "var(--white)" }}>{s.label}</div>
              <div className="text-xs mt-1" style={{ color: "var(--w55)" }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── WHY US ──────────────────────────────────────────────── */}
      <section style={{ background: "var(--bg0)", padding: "80px 32px" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <div className="text-[9px] font-medium tracking-widest mb-2" style={{ color: "var(--blue)" }}>{th.whyLabel}</div>
            <h2 className="text-4xl font-bold leading-tight" style={{ color: "var(--white)" }} dangerouslySetInnerHTML={{ __html: th.whyTitle }} />
            <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--w55)" }}>{th.whySub}</p>
            <Link href="/vision" className="inline-block mt-6">
              <Button>{th.whyBtn}</Button>
            </Link>
          </div>

          {/* Timeline */}
          <div className="tl-timeline">
            {th.timeline.map((item, i) => (
              <div key={i} className="tl-item relative mb-5">
                <div className="tl-dot" style={{ background: colorMap[item.color] }} />
                <div
                  className="rounded-xl p-4 border transition-transform hover:translate-x-1"
                  style={{ background: "var(--bg2)", borderColor: "var(--border)", borderLeft: `3px solid ${colorMap[item.color]}` }}
                >
                  <div className="text-sm font-bold" style={{ color: "var(--white)" }}>{item.title}</div>
                  <div className="text-xs mt-1.5 leading-relaxed" style={{ color: "var(--w55)" }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ─────────────────────────────────────────── */}
      <div className="border-t border-b py-14 px-8" style={{ background: "var(--bg1)", borderColor: "var(--border)" }}>
        <div className="max-w-3xl mx-auto relative">
          <div className="absolute -top-4 -left-2 text-9xl font-bold leading-none pointer-events-none select-none" style={{ color: "var(--blue)", opacity: 0.07 }}>"</div>
          <p className="text-xl font-bold leading-relaxed pl-4 mb-6" style={{ color: "var(--white)" }}>{th.testimonial.quote}</p>
          <div className="flex items-center gap-3 pl-4">
            <div className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold shrink-0" style={{ background: "rgba(15,144,255,0.18)", color: "var(--blue)" }}>NK</div>
            <div>
              <div className="text-sm font-bold" style={{ color: "var(--white)" }}>{th.testimonial.name}</div>
              <div className="text-xs" style={{ color: "var(--w55)" }}>{th.testimonial.role}</div>
              <div className="text-sm mt-1" style={{ color: "var(--amber)" }}>★★★★★</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 px-8" style={{ background: "var(--bg0)" }}>
        <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: "var(--blue)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% -10%, rgba(15,144,255,0.06), transparent 60%)" }} />
        <div className="relative max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold" style={{ color: "var(--white)" }} dangerouslySetInnerHTML={{ __html: th.ctaTitle }} />
          <p className="mt-4 text-base" style={{ color: "var(--w55)" }}>{th.ctaSub}</p>
          <div className="flex gap-3 justify-center mt-8 flex-wrap">
            <Link href="/contact"><Button>{th.ctaBtn1}</Button></Link>
            <Button variant="secondary">{th.ctaBtn2}</Button>
          </div>
        </div>
      </section>
    </>
  );
}
