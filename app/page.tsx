"use client";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import DashboardCard from "@/components/sections/DashboardCard";
import { Button } from "@/components/ui/Button";
import { translations } from "@/lib/i18n";
import { Shield, Zap, Server, Headphones, ArrowRight, Star, ChevronRight, Cloud, Monitor, TrendingUp, Globe, Users, Award, CheckCircle2 } from "lucide-react";

const t = translations.en;
const th = t.home;

const colorMap: Record<string, string> = {
  blue: "var(--blue)", cyan: "var(--cyan)", green: "var(--green)", amber: "var(--amber)",
};

const serviceIcons = [Cloud, Zap, Server, Headphones];

function AnimatedSection({ children, className, style, delay = 0 }: { children: React.ReactNode; className?: string; style?: React.CSSProperties; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function StaggerChild({ children, className, i }: { children: React.ReactNode; className?: string; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden hero-mesh flex items-center" style={{ minHeight: "calc(100vh - 68px)" }}>
        {/* Ambient orbs */}
        <div className="glow-orb w-[800px] h-[800px] opacity-[0.07]" style={{ background: "radial-gradient(circle, var(--blue), transparent 70%)", right: -200, top: -200 }} />
        <div className="glow-orb w-[500px] h-[500px] opacity-[0.05]" style={{ background: "radial-gradient(circle, var(--cyan), transparent 70%)", left: -120, bottom: 40 }} />
        <div className="glow-orb w-[300px] h-[300px] opacity-[0.04]" style={{ background: "radial-gradient(circle, var(--purple), transparent 70%)", right: "30%", bottom: -60 }} />

        {/* Dot grid overlay */}
        <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="glow-badge mb-7">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--blue)" }} />
                {th.eyebrow}
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-[60px] font-extrabold leading-[1.08] tracking-tight"
              style={{ color: "var(--white)" }}
            >
              {th.h1[0]}<br />
              {th.h1[1]}<br />
              <span className="gradient-text">{th.h1[2]}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-base lg:text-lg leading-relaxed max-w-lg"
              style={{ color: "var(--w55)" }}
            >
              {th.sub}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex gap-3 mt-9 flex-wrap"
            >
              <Link href="/solutions"><Button size="lg">{th.btn1}</Button></Link>
              <Link href="/projects"><Button variant="secondary" size="lg">{th.btn2}</Button></Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex gap-10 mt-12 pt-8 border-t flex-wrap"
              style={{ borderColor: "var(--border)" }}
            >
              {th.stats.map((s, i) => (
                <div key={i}>
                  <div className="text-2xl font-extrabold gradient-text">{s.val}</div>
                  <div className="text-xs mt-0.5 font-medium" style={{ color: "var(--w55)" }}>{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <DashboardCard t={t} />
          </motion.div>
        </div>
      </section>

      {/* ── WHO WE ARE ── Asymmetric layout with overlapping card ─── */}
      <section className="relative section-mesh-1 section-glow" style={{ padding: "100px 24px" }}>
        <div className="absolute top-0 left-0 right-0 accent-line" />
        <AnimatedSection className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Image area — spans 5 cols */}
            <div className="md:col-span-5">
              <div className="img-placeholder min-h-[320px] relative">
                <div className="absolute inset-0 dot-grid opacity-30" style={{ zIndex: 1 }} />
                <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 2 }}>
                  <div className="w-24 h-24 rounded-2xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(15,144,255,0.15), rgba(0,220,230,0.1))", border: "1px solid rgba(15,144,255,0.2)", boxShadow: "0 0 60px rgba(15,144,255,0.1)" }}>
                    <Monitor size={40} style={{ color: "var(--blue)", opacity: 0.6 }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Text — spans 7 cols with offset */}
            <div className="md:col-span-7 md:pl-8">
              <div className="glow-badge mb-4">ABOUT US</div>
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 leading-tight" style={{ color: "var(--white)" }}>{th.whoWeAreTitle}</h2>
              <p className="text-sm leading-[1.8] mb-6" style={{ color: "var(--w55)" }}>{th.whoWeAreText}</p>
              <div className="accent-line w-20" />
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* ── SERVICE CARDS ── Staggered reveal with premium cards ─── */}
      <section className="relative section-mesh-2" style={{ padding: "100px 24px" }}>
        <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />

        <div className="max-w-6xl mx-auto relative">
          <AnimatedSection>
            <div className="flex justify-between items-end mb-16 flex-wrap gap-4">
              <div>
                <div className="glow-badge mb-4">{th.servicesLabel}</div>
                <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight" style={{ color: "var(--white)" }}>{th.servicesTitle}</h2>
              </div>
              <Link href="/solutions" className="text-sm font-bold transition-all hover:gap-3 flex items-center gap-1.5" style={{ color: "var(--blue)" }}>
                {th.servicesAll} <ArrowRight size={14} />
              </Link>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {th.services.map((svc, i) => {
              const Icon = serviceIcons[i];
              return (
                <StaggerChild key={i} i={i}>
                  <div className="card-base p-7 relative overflow-hidden group h-full">
                    <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: `linear-gradient(90deg, ${colorMap[svc.color]}, transparent)` }} />
                    {/* Subtle corner glow on hover */}
                    <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(circle, ${colorMap[svc.color]}15, transparent 70%)` }} />

                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg relative" style={{ background: `${colorMap[svc.color]}12`, border: `1px solid ${colorMap[svc.color]}20` }}>
                      <Icon size={24} style={{ color: colorMap[svc.color] }} />
                    </div>
                    <h3 className="text-base font-bold mb-2.5 leading-snug" style={{ color: "var(--white)" }}>{svc.title}</h3>
                    <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--w55)" }}>{svc.desc}</p>
                    <div className="tag" style={{ background: `${colorMap[svc.color]}0D`, border: `1px solid ${colorMap[svc.color]}22`, color: colorMap[svc.color] }}>
                      {svc.tag}
                    </div>
                  </div>
                </StaggerChild>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── OUR SERVICES — Split layout with glass card ─────────── */}
      <section className="relative section-mesh-3" style={{ padding: "100px 24px" }}>
        <AnimatedSection className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-6 md:order-2">
              <div className="img-placeholder min-h-[360px] relative">
                <div className="absolute inset-0 dot-grid opacity-30" style={{ zIndex: 1 }} />
                <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 2 }}>
                  <div className="w-24 h-24 rounded-2xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(0,220,230,0.15), rgba(155,109,255,0.1))", border: "1px solid rgba(0,220,230,0.2)", boxShadow: "0 0 60px rgba(0,220,230,0.1)" }}>
                    <Server size={40} style={{ color: "var(--cyan)", opacity: 0.6 }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-6 md:order-1">
              <div className="glow-badge mb-4" style={{ background: "rgba(0,220,230,0.06)", borderColor: "rgba(0,220,230,0.15)", color: "var(--cyan)" }}>WHAT WE DO</div>
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 leading-tight" style={{ color: "var(--white)" }}>{th.ourServicesTitle}</h2>
              <p className="text-sm leading-[1.8] mb-8" style={{ color: "var(--w55)" }}>{th.ourServicesText}</p>
              <Link href="/vision"><Button>{th.ourServicesBtn}</Button></Link>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* ── STATS BAR ── Glassmorphism horizontal strip ─────────── */}
      <div className="relative" style={{ background: "var(--bg0)" }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--blue), var(--cyan), transparent)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--cyan), var(--blue), transparent)" }} />
        <AnimatedSection className="max-w-6xl mx-auto px-6 lg:px-8 py-16 grid grid-cols-2 md:grid-cols-5 gap-6">
          {th.statsBar.map((s, i) => (
            <div key={i} className="text-center relative group">
              <div className="text-3xl sm:text-4xl font-extrabold leading-none gradient-text mb-2">{s.val}</div>
              <div className="text-sm font-bold mb-1" style={{ color: "var(--white)" }}>{s.label}</div>
              <div className="text-[11px]" style={{ color: "var(--w55)" }}>{s.sub}</div>
              {i < th.statsBar.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12" style={{ background: "var(--border)" }} />
              )}
            </div>
          ))}
        </AnimatedSection>
      </div>

      {/* ── CLIENTS ── Marquee-style with subtle animation ────── */}
      <section className="relative overflow-hidden" style={{ background: "var(--bg1)", padding: "56px 24px" }}>
        <AnimatedSection className="max-w-6xl mx-auto text-center">
          <div className="glow-badge mx-auto mb-10">SUPPORTED END CLIENTS</div>
          <div className="flex justify-center items-center gap-16 flex-wrap">
            {th.clients.map((c, i) => (
              <span key={i} className="text-2xl lg:text-3xl font-extrabold opacity-30 hover:opacity-80 transition-all duration-500 cursor-default hover:scale-105" style={{ color: "var(--w85)" }}>{c}</span>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* ── WHY US ── Split with timeline ──────────────────────── */}
      <section className="relative section-mesh-1" style={{ padding: "100px 24px" }}>
        <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <AnimatedSection>
              <div className="glow-badge mb-4">{th.whyLabel}</div>
              <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-6" style={{ color: "var(--white)" }} dangerouslySetInnerHTML={{ __html: th.whyTitle }} />
              <p className="text-sm leading-[1.8] mb-8" style={{ color: "var(--w55)" }}>{th.whySub}</p>
              <Link href="/vision" className="inline-block">
                <Button>{th.whyBtn}</Button>
              </Link>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="tl-timeline">
                {th.timeline.map((item, i) => (
                  <div key={i} className="tl-item relative mb-5">
                    <div className="tl-dot" style={{ background: colorMap[item.color], color: colorMap[item.color] }} />
                    <div className="card-glass rounded-xl p-5 transition-all duration-300 hover:translate-x-1"
                      style={{ borderLeft: `3px solid ${colorMap[item.color]}` }}>
                      <div className="text-sm font-bold" style={{ color: "var(--white)" }}>{item.title}</div>
                      <div className="text-xs mt-2 leading-relaxed" style={{ color: "var(--w55)" }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ── Premium quote card ──────────────────── */}
      <section className="relative overflow-hidden" style={{ background: "var(--bg1)", padding: "80px 24px" }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--amber), transparent)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(255,166,0,0.03), transparent 60%)" }} />

        <AnimatedSection className="max-w-3xl mx-auto relative">
          <div className="card-glass rounded-2xl p-10 lg:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 accent-line-warm" />
            {/* Giant quote mark */}
            <div className="absolute -top-4 -left-2 text-[140px] font-extrabold leading-none pointer-events-none select-none" style={{ color: "var(--amber)", opacity: 0.06 }}>&ldquo;</div>

            <div className="relative">
              <div className="flex gap-1 mb-6">
                {[1,2,3,4,5].map(i => <Star key={i} size={18} fill="var(--amber)" style={{ color: "var(--amber)" }} />)}
              </div>
              <p className="text-xl sm:text-2xl font-bold leading-relaxed mb-8" style={{ color: "var(--white)" }}>{th.testimonial.quote}</p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-sm font-extrabold shrink-0"
                  style={{ background: "linear-gradient(135deg, rgba(255,166,0,0.15), rgba(255,107,107,0.1))", border: "1px solid rgba(255,166,0,0.2)", color: "var(--amber)" }}>
                  NK
                </div>
                <div>
                  <div className="text-sm font-bold" style={{ color: "var(--white)" }}>{th.testimonial.name}</div>
                  <div className="text-xs" style={{ color: "var(--w55)" }}>{th.testimonial.role}</div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* ── CTA ── Dramatic closing section ────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: "var(--bg0)", padding: "120px 24px" }}>
        <div className="absolute inset-0 hero-mesh pointer-events-none" />
        <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
        {/* Centered glow */}
        <div className="glow-orb w-[600px] h-[600px] opacity-[0.06]" style={{ background: "radial-gradient(circle, var(--blue), transparent 70%)", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }} />

        <AnimatedSection className="relative max-w-2xl mx-auto text-center">
          <div className="glow-badge mx-auto mb-6">GET STARTED</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight" style={{ color: "var(--white)" }}>{th.ctaTitle}</h2>
          <p className="mt-6 text-base lg:text-lg leading-relaxed" style={{ color: "var(--w55)" }}>{th.ctaSub}</p>
          <div className="flex gap-4 justify-center mt-10 flex-wrap">
            <Link href="/contact"><Button size="lg">{th.ctaBtn1}</Button></Link>
            <Link href="/solutions"><Button variant="secondary" size="lg">{th.ctaBtn2}</Button></Link>
          </div>
        </AnimatedSection>
      </section>
    </>
  );
}
