"use client";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import DashboardCard from "@/components/sections/DashboardCard";
import { Button } from "@/components/ui/Button";
import { translations } from "@/lib/i18n";
import { Shield, Zap, Server, Headphones, ArrowRight, Star, ChevronRight } from "lucide-react";

const t = translations.en;
const th = t.home;

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } },
};

const colorMap: Record<string, string> = {
  blue: "var(--blue)", cyan: "var(--cyan)", green: "var(--green)", amber: "var(--amber)",
};

const serviceIcons = [Server, Zap, Shield, Headphones];

function AnimatedSection({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden flex items-center grid-pattern" style={{ background: "var(--bg0)", minHeight: "calc(100vh - 68px)" }}>
        {/* Glow orbs */}
        <div className="glow-orb w-[700px] h-[700px] opacity-[0.06]" style={{ background: "radial-gradient(circle, var(--blue), transparent 70%)", right: -100, top: -100 }} />
        <div className="glow-orb w-[400px] h-[400px] opacity-[0.04]" style={{ background: "radial-gradient(circle, var(--cyan), transparent 70%)", left: -60, bottom: 60 }} />
        <div className="glow-orb w-[300px] h-[300px] opacity-[0.03]" style={{ background: "radial-gradient(circle, var(--purple), transparent 70%)", right: 200, bottom: -50 }} />

        <div className="relative max-w-6xl mx-auto px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          {/* Left */}
          <motion.div {...fadeUp}>
            <div
              className="inline-flex items-center gap-2 text-xs font-semibold border rounded-full px-4 py-1.5 mb-6"
              style={{ background: "rgba(15,144,255,0.08)", borderColor: "rgba(15,144,255,0.2)", color: "var(--blue)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--blue)" }} />
              {th.eyebrow}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-extrabold leading-[1.1] tracking-tight" style={{ color: "var(--white)" }}>
              {th.h1[0]}<br />
              {th.h1[1]}<br />
              <span className="gradient-text">{th.h1[2]}</span>
            </h1>

            <p className="mt-5 text-base lg:text-lg leading-relaxed max-w-lg" style={{ color: "var(--w55)" }}>{th.sub}</p>

            <div className="flex gap-3 mt-8 flex-wrap">
              <Link href="/solutions"><Button size="lg">{th.btn1}</Button></Link>
              <Link href="/projects"><Button variant="secondary" size="lg">{th.btn2}</Button></Link>
            </div>

            {/* Stats row */}
            <div className="flex gap-8 mt-10 pt-8 border-t flex-wrap" style={{ borderColor: "var(--border)" }}>
              {th.stats.map((s, i) => (
                <div key={i}>
                  <div className="text-2xl font-extrabold" style={{ color: "var(--blue)" }}>{s.val}</div>
                  <div className="text-xs mt-0.5 font-medium" style={{ color: "var(--w55)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Dashboard card */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <DashboardCard t={t} />
          </motion.div>
        </div>
      </section>

      {/* ── CLIENTS MARQUEE ──────────────────────────────────── */}
      <div className="border-t border-b overflow-hidden py-5 px-8" style={{ background: "var(--bg1)", borderColor: "var(--border)" }}>
        <div className="marquee-track">
          <span className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: "var(--w25)" }}>{th.trustedBy}</span>
          {[...th.clients, ...th.clients].map((c, i) => (
            <span key={i} className="text-lg font-bold whitespace-nowrap opacity-60 hover:opacity-100 transition-opacity cursor-default" style={{ color: "var(--w55)" }}>{c}</span>
          ))}
        </div>
      </div>

      {/* ── SERVICES ─────────────────────────────────────────── */}
      <section className="relative" style={{ background: "var(--bg0)", padding: "96px 24px" }}>
        <AnimatedSection className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-14 flex-wrap gap-4">
            <div>
              <div className="text-[10px] font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--blue)" }}>{th.servicesLabel}</div>
              <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight" style={{ color: "var(--white)" }} dangerouslySetInnerHTML={{ __html: th.servicesTitle }} />
            </div>
            <Link href="/solutions" className="text-sm font-semibold transition-colors hover:opacity-75 flex items-center gap-1" style={{ color: "var(--blue)" }}>
              {th.servicesAll} <ArrowRight size={14} />
            </Link>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Big card */}
            <div className="md:row-span-2 rounded-2xl p-8 border card-hover relative overflow-hidden group" style={{ background: "var(--bg2)", borderColor: "var(--border)" }}>
              <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: `linear-gradient(90deg, ${colorMap[th.services[0].color]}, transparent)` }} />
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110" style={{ background: `${colorMap[th.services[0].color]}14` }}>
                {(() => { const Icon = serviceIcons[0]; return <Icon size={22} style={{ color: colorMap[th.services[0].color] }} />; })()}
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: "var(--white)" }}>{th.services[0].title}</h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--w55)" }}>{th.services[0].desc}</p>
              <div className="tag" style={{ background: `${colorMap[th.services[0].color]}0D`, border: `1px solid ${colorMap[th.services[0].color]}22`, color: colorMap[th.services[0].color] }}>
                {th.services[0].tag}
              </div>
              <Link href="/solutions" className="flex items-center gap-1 mt-5 text-sm font-semibold transition-all hover:gap-2" style={{ color: "var(--blue)" }}>
                Learn more <ChevronRight size={14} />
              </Link>
            </div>

            {/* Two small cards */}
            {th.services.slice(1, 3).map((svc, i) => {
              const Icon = serviceIcons[i + 1];
              return (
                <div key={i} className="rounded-2xl p-6 border card-hover relative overflow-hidden group" style={{ background: "var(--bg2)", borderColor: "var(--border)" }}>
                  <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: `linear-gradient(90deg, ${colorMap[svc.color]}, transparent)` }} />
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110" style={{ background: `${colorMap[svc.color]}14` }}>
                    <Icon size={18} style={{ color: colorMap[svc.color] }} />
                  </div>
                  <h3 className="text-base font-bold mb-2" style={{ color: "var(--white)" }}>{svc.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--w55)" }}>{svc.desc}</p>
                  <div className="tag mt-3" style={{ background: `${colorMap[svc.color]}0D`, border: `1px solid ${colorMap[svc.color]}22`, color: colorMap[svc.color] }}>
                    {svc.tag}
                  </div>
                </div>
              );
            })}

            {/* Wide card */}
            <div className="md:col-span-2 rounded-2xl p-6 border card-hover relative overflow-hidden group" style={{ background: "var(--bg2)", borderColor: "var(--border)" }}>
              <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: `linear-gradient(90deg, ${colorMap[th.services[3].color]}, transparent)` }} />
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110" style={{ background: `${colorMap[th.services[3].color]}14` }}>
                  {(() => { const Icon = serviceIcons[3]; return <Icon size={20} style={{ color: colorMap[th.services[3].color] }} />; })()}
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-bold mb-1" style={{ color: "var(--white)" }}>{th.services[3].title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--w55)" }}>{th.services[3].desc}</p>
                </div>
                <div className="tag shrink-0" style={{ background: `${colorMap[th.services[3].color]}0D`, border: `1px solid ${colorMap[th.services[3].color]}22`, color: colorMap[th.services[3].color] }}>
                  {th.services[3].tag}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────── */}
      <div className="section-glow border-t border-b" style={{ background: "var(--bg1)", borderColor: "var(--border)" }}>
        <AnimatedSection className="max-w-6xl mx-auto px-6 lg:px-8 py-12 grid grid-cols-2 md:grid-cols-4">
          {th.statsBar.map((s, i) => (
            <div key={i} className="px-5 border-r last:border-r-0" style={{ borderColor: "var(--border)" }}>
              <div className="text-4xl sm:text-5xl font-extrabold leading-none gradient-text">{s.val}</div>
              <div className="text-sm font-bold mt-2" style={{ color: "var(--white)" }}>{s.label}</div>
              <div className="text-xs mt-1" style={{ color: "var(--w55)" }}>{s.sub}</div>
            </div>
          ))}
        </AnimatedSection>
      </div>

      {/* ── WHY US ──────────────────────────────────────────────── */}
      <section className="relative" style={{ background: "var(--bg0)", padding: "96px 24px" }}>
        <AnimatedSection className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <div className="text-[10px] font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--blue)" }}>{th.whyLabel}</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight" style={{ color: "var(--white)" }} dangerouslySetInnerHTML={{ __html: th.whyTitle }} />
            <p className="mt-5 text-sm leading-relaxed" style={{ color: "var(--w55)" }}>{th.whySub}</p>
            <Link href="/vision" className="inline-block mt-8">
              <Button>{th.whyBtn}</Button>
            </Link>
          </div>

          {/* Timeline */}
          <div className="tl-timeline">
            {th.timeline.map((item, i) => (
              <div key={i} className="tl-item relative mb-5">
                <div className="tl-dot" style={{ background: colorMap[item.color], color: colorMap[item.color] }} />
                <div
                  className="rounded-xl p-5 border transition-all duration-200 hover:translate-x-1 hover:shadow-lg"
                  style={{ background: "var(--bg2)", borderColor: "var(--border)", borderLeft: `3px solid ${colorMap[item.color]}` }}
                >
                  <div className="text-sm font-bold" style={{ color: "var(--white)" }}>{item.title}</div>
                  <div className="text-xs mt-2 leading-relaxed" style={{ color: "var(--w55)" }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* ── TESTIMONIAL ─────────────────────────────────────────── */}
      <div className="section-glow border-t border-b py-16 px-6 lg:px-8" style={{ background: "var(--bg1)", borderColor: "var(--border)" }}>
        <AnimatedSection className="max-w-3xl mx-auto relative">
          <div className="absolute -top-6 -left-3 text-[120px] font-extrabold leading-none pointer-events-none select-none gradient-text" style={{ opacity: 0.1 }}>&ldquo;</div>
          <div className="flex gap-1 mb-5 pl-4">
            {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="var(--amber)" style={{ color: "var(--amber)" }} />)}
          </div>
          <p className="text-xl sm:text-2xl font-bold leading-relaxed pl-4 mb-7" style={{ color: "var(--white)" }}>{th.testimonial.quote}</p>
          <div className="flex items-center gap-4 pl-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
              style={{ background: "linear-gradient(135deg, rgba(15,144,255,0.2), rgba(0,220,230,0.15))", color: "var(--blue)" }}
            >
              NK
            </div>
            <div>
              <div className="text-sm font-bold" style={{ color: "var(--white)" }}>{th.testimonial.name}</div>
              <div className="text-xs" style={{ color: "var(--w55)" }}>{th.testimonial.role}</div>
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-24 px-6 lg:px-8" style={{ background: "var(--bg0)" }}>
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg, transparent, var(--blue), transparent)" }} />
        <div className="absolute inset-0 pointer-events-none grid-pattern" style={{ opacity: 0.5 }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% -20%, rgba(15,144,255,0.08), transparent 60%)" }} />

        <AnimatedSection className="relative max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: "var(--white)" }} dangerouslySetInnerHTML={{ __html: th.ctaTitle }} />
          <p className="mt-5 text-base lg:text-lg" style={{ color: "var(--w55)" }}>{th.ctaSub}</p>
          <div className="flex gap-3 justify-center mt-9 flex-wrap">
            <Link href="/contact"><Button size="lg">{th.ctaBtn1}</Button></Link>
            <Button variant="secondary" size="lg">{th.ctaBtn2}</Button>
          </div>
        </AnimatedSection>
      </section>
    </>
  );
}
