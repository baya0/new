"use client";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import DashboardCard from "@/components/sections/DashboardCard";
import { Button } from "@/components/ui/Button";
import { translations } from "@/lib/i18n";
import { ArrowRight, Star, Cloud, Zap, Server, Headphones, Monitor, TrendingUp } from "lucide-react";

const t = translations.en;
const th = t.home;

const colorMap: Record<string, string> = {
  blue: "var(--blue)", cyan: "var(--cyan)", green: "var(--green)", amber: "var(--amber)",
};

const serviceIcons = [Cloud, Zap, Server, Headphones];

/* ── Scroll-triggered text reveal (word by word) ── */
function TextReveal({ text, className, as: Tag = "span" }: { text: string; className?: string; as?: any }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const words = text.split(" ");
  return (
    <Tag ref={ref} className={className}>
      {words.map((word: string, i: number) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ delay: i * 0.04, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block mr-[0.28em]"
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}

/* ── Scroll-triggered fade section ── */
function AnimatedSection({ children, className, style, delay = 0 }: { children: React.ReactNode; className?: string; style?: React.CSSProperties; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }} className={className} style={style}>
      {children}
    </motion.div>
  );
}

/* ── Staggered card reveal ── */
function StaggerChild({ children, className, i }: { children: React.ReactNode; className?: string; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* ════════ HERO ════════ */}
      <section className="relative overflow-hidden hero-bg flex items-center" style={{ minHeight: "calc(100vh - 72px)" }}>
        <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

        {/* Ambient orbs */}
        <div className="glow-orb w-[700px] h-[700px] opacity-[0.06]" style={{ background: "radial-gradient(circle, var(--blue), transparent 70%)", right: -200, top: -150 }} />
        <div className="glow-orb w-[400px] h-[400px] opacity-[0.04]" style={{ background: "radial-gradient(circle, var(--cyan), transparent 70%)", left: -100, bottom: 60 }} />

        <div className="relative max-w-6xl mx-auto px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          <div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="badge mb-8">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--blue)" }} />
                {th.eyebrow}
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-[62px] font-black leading-[1.06] tracking-tight"
              style={{ color: "var(--white)" }}
            >
              {th.h1[0]}<br />
              {th.h1[1]}<br />
              <span className="gradient-text">{th.h1[2]}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-7 text-base lg:text-lg leading-relaxed max-w-lg"
              style={{ color: "var(--w55)" }}
            >
              {th.sub}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex gap-4 mt-10 flex-wrap">
              <Link href="/solutions"><Button size="lg">{th.btn1}</Button></Link>
              <Link href="/projects"><Button variant="secondary" size="lg">{th.btn2}</Button></Link>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }} className="flex gap-10 mt-12 pt-8 flex-wrap" style={{ borderTop: "1px solid var(--border)" }}>
              {th.stats.map((s, i) => (
                <div key={i}>
                  <div className="text-2xl font-black gradient-text">{s.val}</div>
                  <div className="text-xs mt-0.5 font-semibold" style={{ color: "var(--w55)" }}>{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, x: 40, scale: 0.95 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}>
            <DashboardCard t={t} />
          </motion.div>
        </div>
      </section>

      {/* ════════ WHO WE ARE ════════ */}
      <section className="section-alt" style={{ padding: "120px 24px" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            <AnimatedSection className="md:col-span-5">
              <div className="img-placeholder min-h-[340px] relative">
                {/* To add your image: place it in /public/images/ then uncomment below */}
                {/* <Image src="/images/who-we-are.jpg" alt="Who We Are" fill className="object-cover rounded-[20px]" /> */}
              </div>
            </AnimatedSection>

            <div className="md:col-span-7 md:pl-6">
              <AnimatedSection delay={0.1}>
                <div className="badge mb-5">ABOUT US</div>
              </AnimatedSection>
              <TextReveal text={th.whoWeAreTitle} className="text-3xl sm:text-4xl font-black mb-6 leading-tight block" as="h2" />
              <AnimatedSection delay={0.2}>
                <p className="text-sm leading-[1.9] mb-6" style={{ color: "var(--w55)" }}>{th.whoWeAreText}</p>
                <div className="accent-line w-20" />
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ SERVICE CARDS — Bento Grid ════════ */}
      <section className="section-alt-2" style={{ padding: "120px 24px" }}>
        <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">
          <AnimatedSection>
            <div className="flex justify-between items-end mb-14 flex-wrap gap-4">
              <div>
                <div className="badge mb-5">{th.servicesLabel}</div>
                <h2 className="text-3xl sm:text-4xl font-black leading-tight" style={{ color: "var(--white)" }}>{th.servicesTitle}</h2>
              </div>
              <Link href="/solutions" className="text-sm font-bold transition-all duration-300 hover:gap-3 flex items-center gap-1.5" style={{ color: "var(--blue)" }}>
                {th.servicesAll} <ArrowRight size={14} />
              </Link>
            </div>
          </AnimatedSection>

          {/* Bento: first row 2 large, second row 2 large */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {th.services.map((svc, i) => {
              const Icon = serviceIcons[i];
              return (
                <StaggerChild key={i} i={i}>
                  <div className="glass-card p-8 relative overflow-hidden group h-full">
                    <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: `linear-gradient(90deg, ${colorMap[svc.color]}, transparent)` }} />
                    <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: `radial-gradient(circle, ${colorMap[svc.color]}12, transparent 70%)` }} />

                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110" style={{ background: `${colorMap[svc.color]}10`, border: `1px solid ${colorMap[svc.color]}20` }}>
                      <Icon size={28} style={{ color: colorMap[svc.color] }} />
                    </div>
                    <h3 className="text-lg font-bold mb-3 leading-snug" style={{ color: "var(--white)" }}>{svc.title}</h3>
                    <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--w55)" }}>{svc.desc}</p>
                    <div className="tag" style={{ background: `${colorMap[svc.color]}0D`, border: `1px solid ${colorMap[svc.color]}20`, color: colorMap[svc.color] }}>
                      {svc.tag}
                    </div>
                  </div>
                </StaggerChild>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════ OUR SERVICES — Text + Image ════════ */}
      <section className="section-alt" style={{ padding: "120px 24px" }}>
        <AnimatedSection className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-6 md:order-2">
              <div className="img-placeholder min-h-[380px] relative">
                {/* <Image src="/images/our-services.jpg" alt="Our Services" fill className="object-cover rounded-[20px]" /> */}
              </div>
            </div>
            <div className="md:col-span-6 md:order-1">
              <div className="badge mb-5" style={{ background: "rgba(8,145,178,0.08)", borderColor: "rgba(8,145,178,0.15)", color: "var(--cyan)" }}>WHAT WE DO</div>
              <TextReveal text={th.ourServicesTitle} className="text-3xl sm:text-4xl font-black mb-6 leading-tight block" as="h2" />
              <p className="text-sm leading-[1.9] mb-8" style={{ color: "var(--w55)" }}>{th.ourServicesText}</p>
              <Link href="/vision"><Button>{th.ourServicesBtn}</Button></Link>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* ════════ STATS BAR — Glass strip ════════ */}
      <div className="relative" style={{ background: "var(--bg0)" }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--blue), var(--cyan), transparent)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--cyan), var(--blue), transparent)" }} />
        <AnimatedSection className="max-w-6xl mx-auto px-6 lg:px-8 py-16 grid grid-cols-2 md:grid-cols-5 gap-8">
          {th.statsBar.map((s, i) => (
            <div key={i} className="text-center relative">
              <div className="text-3xl sm:text-4xl font-black leading-none gradient-text mb-2">{s.val}</div>
              <div className="text-sm font-bold mb-1" style={{ color: "var(--white)" }}>{s.label}</div>
              <div className="text-[11px]" style={{ color: "var(--w55)" }}>{s.sub}</div>
              {i < th.statsBar.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-14" style={{ background: "var(--border)" }} />
              )}
            </div>
          ))}
        </AnimatedSection>
      </div>

      {/* ════════ CLIENTS — Infinite Marquee ════════ */}
      <section className="overflow-hidden" style={{ background: "var(--bg1)", padding: "56px 0" }}>
        <AnimatedSection className="text-center mb-8 px-6">
          <div className="badge mx-auto">SUPPORTED END CLIENTS</div>
        </AnimatedSection>
        <div className="relative overflow-hidden">
          <div className="marquee-track">
            {[...th.clients, ...th.clients, ...th.clients, ...th.clients].map((c, i) => (
              <span key={i} className="text-2xl lg:text-3xl font-black opacity-25 hover:opacity-70 transition-opacity duration-500 cursor-default shrink-0" style={{ color: "var(--w85)" }}>{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ WHY US + TIMELINE ════════ */}
      <section className="section-alt-2" style={{ padding: "120px 24px" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <AnimatedSection>
              <div className="badge mb-5">{th.whyLabel}</div>
              <TextReveal text="Your Strategic Partner For Real Digital Transformation." className="text-3xl sm:text-4xl font-black leading-tight mb-6 block" as="h2" />
              <p className="text-sm leading-[1.9] mb-8" style={{ color: "var(--w55)" }}>{th.whySub}</p>
              <Link href="/vision"><Button>{th.whyBtn}</Button></Link>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="tl-timeline">
                {th.timeline.map((item, i) => (
                  <div key={i} className="tl-item relative mb-5">
                    <div className="tl-dot" style={{ background: colorMap[item.color], color: colorMap[item.color] }} />
                    <div className="glass-card rounded-xl p-5 !transform-none" style={{ borderLeft: `3px solid ${colorMap[item.color]}` }}>
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

      {/* ════════ TESTIMONIAL ════════ */}
      <section className="overflow-hidden" style={{ background: "var(--bg1)", padding: "100px 24px" }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--amber), transparent)" }} />
        <AnimatedSection className="max-w-3xl mx-auto relative">
          <div className="glass-card rounded-3xl p-10 lg:p-14 relative overflow-hidden !transform-none">
            <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: "linear-gradient(90deg, var(--amber), var(--green), transparent)" }} />
            <div className="absolute -top-4 -left-2 text-[140px] font-black leading-none pointer-events-none select-none" style={{ color: "var(--amber)", opacity: 0.08 }}>&ldquo;</div>

            <div className="relative">
              <div className="flex gap-1.5 mb-6">
                {[1,2,3,4,5].map(i => <Star key={i} size={20} fill="var(--amber)" style={{ color: "var(--amber)" }} />)}
              </div>
              <p className="text-xl sm:text-2xl font-bold leading-relaxed mb-8" style={{ color: "var(--white)" }}>{th.testimonial.quote}</p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-sm font-black shrink-0" style={{ background: "rgba(217,119,6,0.1)", border: "1px solid rgba(217,119,6,0.2)", color: "var(--amber)" }}>
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

      {/* ════════ CTA ════════ */}
      <section className="relative overflow-hidden hero-bg" style={{ padding: "120px 24px" }}>
        <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
        <div className="glow-orb w-[500px] h-[500px] opacity-[0.05]" style={{ background: "radial-gradient(circle, var(--blue), transparent 70%)", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }} />

        <AnimatedSection className="relative max-w-2xl mx-auto text-center">
          <div className="badge mx-auto mb-6">GET STARTED</div>
          <TextReveal text={th.ctaTitle} className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight block mb-6" as="h2" />
          <p className="text-base lg:text-lg leading-relaxed mb-10" style={{ color: "var(--w55)" }}>{th.ctaSub}</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/contact"><Button size="lg">{th.ctaBtn1}</Button></Link>
            <Link href="/solutions"><Button variant="secondary" size="lg">{th.ctaBtn2}</Button></Link>
          </div>
        </AnimatedSection>
      </section>
    </>
  );
}
