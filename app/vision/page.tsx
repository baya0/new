"use client";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { translations } from "@/lib/i18n";
import { Play, Target, Handshake, Leaf, Globe, Users, Award, TrendingUp, Building2 } from "lucide-react";

const t = translations.en;
const v = t.vision;

const colorMap: Record<string, string> = {
  blue: "var(--blue)", cyan: "var(--cyan)", green: "var(--green)",
};

const valueIcons = [Target, Handshake, Leaf];

const stats = [
  { val: "11+", label: "Years in Business", icon: Award, color: "var(--blue)" },
  { val: "9", label: "Global Locations", icon: Globe, color: "var(--cyan)" },
  { val: "27+", label: "Projects Delivered", icon: TrendingUp, color: "var(--green)" },
  { val: "100%", label: "Client Retention", icon: Users, color: "var(--amber)" },
];

const industries = [
  { name: "Pharmaceuticals", icon: "💊" },
  { name: "Automotive", icon: "🚗" },
  { name: "Manufacturing", icon: "🏭" },
  { name: "Chemical", icon: "🧪" },
  { name: "Retail", icon: "🏪" },
  { name: "Technology", icon: "💻" },
];

function AnimatedSection({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

function StaggerChild({ children, className, i }: { children: React.ReactNode; className?: string; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24, scale: 0.97 }} animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

export default function VisionPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ padding: "80px 24px 100px" }}>
        <div className="absolute inset-0 hero-mesh" />
        <div className="glow-orb w-[600px] h-[600px] opacity-[0.06]" style={{ background: "radial-gradient(circle, var(--cyan), transparent 70%)", left: -100, top: -100 }} />
        <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto relative"
        >
          <div className="glow-badge mb-6" style={{ background: "rgba(0,220,230,0.06)", borderColor: "rgba(0,220,230,0.15)", color: "var(--cyan)" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--cyan)" }} />
            {v.eyebrow}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold leading-[1.1] tracking-tight max-w-3xl" style={{ color: "var(--white)" }}>
            {v.h1}
          </h1>
          <p className="mt-6 text-base lg:text-lg leading-relaxed max-w-2xl" style={{ color: "var(--w55)" }}>{v.sub}</p>
          <div className="accent-line w-24 mt-8" style={{ background: "linear-gradient(90deg, var(--cyan), var(--blue), transparent)" }} />
        </motion.div>
      </section>

      {/* Our Story — Cinematic split layout */}
      <section className="relative section-mesh-1" style={{ padding: "100px 24px" }}>
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
              {/* Video placeholder */}
              <div className="md:col-span-5">
                <div className="img-placeholder min-h-[340px] relative group cursor-pointer">
                  <div className="absolute inset-0 dot-grid opacity-30" style={{ zIndex: 1 }} />
                  <div className="absolute inset-0" style={{ zIndex: 1, background: "radial-gradient(circle at 50% 50%, rgba(15,144,255,0.06), transparent 60%)" }} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ zIndex: 2 }}>
                    <button className="w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110"
                      style={{ background: "linear-gradient(135deg, rgba(15,144,255,0.2), rgba(0,220,230,0.15))", border: "2px solid rgba(15,144,255,0.3)", boxShadow: "0 0 50px rgba(15,144,255,0.15), 0 0 100px rgba(15,144,255,0.05)" }}>
                      <Play size={28} fill="var(--blue)" style={{ color: "var(--blue)", marginLeft: 3 }} />
                    </button>
                    <p className="text-sm font-medium" style={{ color: "var(--w55)" }}>{v.watchLabel}</p>
                  </div>
                </div>
              </div>

              {/* Text */}
              <div className="md:col-span-7 md:pl-6">
                <div className="glow-badge mb-4">ABOUT</div>
                <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 leading-tight" style={{ color: "var(--white)" }}>{v.missionTitle}</h2>
                <p className="text-sm leading-[1.8] mb-4" style={{ color: "var(--w55)" }}>{v.mission1}</p>
                <p className="text-sm leading-[1.8] mb-8" style={{ color: "var(--w55)" }}>{v.mission2}</p>
                <Link href="/contact">
                  <Button>Work With Us →</Button>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Values — Premium overlapping cards */}
      <section className="relative section-mesh-2 section-glow" style={{ padding: "100px 24px" }}>
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="glow-badge mx-auto mb-4">{v.valuesLabel}</div>
              <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: "var(--white)" }}>What Drives Us Forward</h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {v.values.map((val, i) => {
              const Icon = valueIcons[i];
              return (
                <StaggerChild key={i} i={i}>
                  <div className="card-base p-8 relative overflow-hidden group h-full">
                    <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: `linear-gradient(90deg, ${colorMap[val.color]}, transparent)` }} />
                    <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: `radial-gradient(circle, ${colorMap[val.color]}10, transparent 70%)` }} />

                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 relative" style={{ background: `${colorMap[val.color]}12`, border: `1px solid ${colorMap[val.color]}20` }}>
                      <Icon size={26} style={{ color: colorMap[val.color] }} />
                    </div>
                    <h3 className="text-lg font-extrabold mb-3" style={{ color: "var(--white)" }}>{val.title}</h3>
                    <p className="text-sm leading-[1.8]" style={{ color: "var(--w55)" }}>{val.desc}</p>
                  </div>
                </StaggerChild>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industries — Hexagonal-feel grid */}
      <section className="relative section-mesh-3" style={{ padding: "100px 24px" }}>
        <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="glow-badge mx-auto mb-4" style={{ background: "rgba(155,109,255,0.06)", borderColor: "rgba(155,109,255,0.15)", color: "var(--purple)" }}>INDUSTRIES</div>
              <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: "var(--white)" }}>Industries We Serve</h2>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {industries.map((ind, i) => (
                <div key={i} className="card-glass rounded-2xl p-6 text-center group cursor-default transition-all duration-300 hover:scale-105">
                  <div className="text-4xl mb-3 transition-transform duration-300 group-hover:scale-110">{ind.icon}</div>
                  <div className="text-xs font-bold" style={{ color: "var(--white)" }}>{ind.name}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats — Premium glass bar */}
      <section className="relative" style={{ background: "var(--bg1)", padding: "100px 24px" }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--blue), var(--cyan), transparent)" }} />
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="card-glass rounded-2xl p-10 lg:p-12 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: "linear-gradient(90deg, var(--blue), var(--cyan), var(--green), var(--amber))" }} />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
                {stats.map((s, i) => (
                  <div key={i} className="text-center relative group">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-transform duration-300 group-hover:scale-110" style={{ background: `${s.color}12`, border: `1px solid ${s.color}20` }}>
                      <s.icon size={24} style={{ color: s.color }} />
                    </div>
                    <div className="text-3xl sm:text-4xl font-extrabold gradient-text mb-1">{s.val}</div>
                    <div className="text-xs font-medium" style={{ color: "var(--w55)" }}>{s.label}</div>
                    {i < stats.length - 1 && (
                      <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-16" style={{ background: "rgba(255,255,255,0.05)" }} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection className="text-center mt-14">
            <Link href="/contact"><Button size="lg">Start a Conversation →</Button></Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
