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
  { val: "11+", label: "Years in Business", icon: Award },
  { val: "9", label: "Global Locations", icon: Globe },
  { val: "27+", label: "Projects Delivered", icon: TrendingUp },
  { val: "100%", label: "Client Retention", icon: Users },
];

const industries = [
  { name: "Pharmaceuticals", icon: "💊" },
  { name: "Automotive", icon: "🚗" },
  { name: "Manufacturing", icon: "🏭" },
  { name: "Chemical", icon: "🧪" },
  { name: "Retail", icon: "🏪" },
  { name: "Technology", icon: "💻" },
];

function AnimatedSection({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function VisionPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="relative overflow-hidden px-6 lg:px-8 py-20 border-b grid-pattern" style={{ background: "var(--bg0)", borderColor: "var(--border)" }}>
        <div className="glow-orb w-[500px] h-[500px] opacity-[0.05]" style={{ background: "radial-gradient(circle, var(--cyan), transparent 70%)", left: -100, top: -100 }} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto relative"
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold border rounded-full px-4 py-1.5 mb-5" style={{ background: "rgba(15,144,255,0.08)", borderColor: "rgba(15,144,255,0.2)", color: "var(--blue)" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--blue)" }} />
            {v.eyebrow}
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight max-w-3xl" style={{ color: "var(--white)" }}>
            {v.h1}
          </h1>
          <p className="mt-5 text-base lg:text-lg leading-relaxed max-w-2xl" style={{ color: "var(--w55)" }}>{v.sub}</p>
        </motion.div>
      </section>

      {/* Our Story */}
      <section style={{ background: "var(--bg0)", padding: "80px 24px" }}>
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
              {/* Image placeholder */}
              <div className="rounded-2xl border overflow-hidden relative group" style={{ background: "var(--bg2)", borderColor: "var(--border)" }}>
                <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: "linear-gradient(90deg, var(--blue), var(--cyan))" }} />
                <div className="flex flex-col items-center justify-center min-h-[300px] relative">
                  <div className="absolute inset-0 grid-pattern opacity-50" />
                  <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 50% 50%, rgba(15,144,255,0.06), transparent 60%)" }} />
                  <button className="relative w-20 h-20 rounded-full flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                    style={{ background: "linear-gradient(135deg, rgba(15,144,255,0.2), rgba(0,220,230,0.15))", border: "2px solid rgba(15,144,255,0.3)", boxShadow: "0 0 40px rgba(15,144,255,0.15)" }}>
                    <Play size={28} fill="var(--blue)" style={{ color: "var(--blue)", marginLeft: 3 }} />
                  </button>
                  <p className="relative text-sm font-medium" style={{ color: "var(--w55)" }}>{v.watchLabel}</p>
                </div>
              </div>

              <div>
                <div className="text-[10px] font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--blue)" }}>ABOUT</div>
                <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 leading-tight" style={{ color: "var(--white)" }}>{v.missionTitle}</h2>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--w55)" }}>{v.mission1}</p>
                <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--w55)" }}>{v.mission2}</p>
                <Link href="/contact">
                  <Button>Work With Us →</Button>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Values */}
      <section className="section-glow border-t" style={{ background: "var(--bg1)", borderColor: "var(--border)", padding: "80px 24px" }}>
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-14">
              <div className="text-[10px] font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--blue)" }}>{v.valuesLabel}</div>
              <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: "var(--white)" }}>What Drives Us Forward</h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {v.values.map((val, i) => {
              const Icon = valueIcons[i];
              return (
                <AnimatedSection key={i}>
                  <div className="rounded-2xl p-7 border card-hover h-full relative overflow-hidden group" style={{ background: "var(--bg2)", borderColor: "var(--border)" }}>
                    <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: `linear-gradient(90deg, ${colorMap[val.color]}, transparent)` }} />
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110" style={{ background: `${colorMap[val.color]}14` }}>
                      <Icon size={24} style={{ color: colorMap[val.color] }} />
                    </div>
                    <h3 className="text-lg font-bold mb-3" style={{ color: "var(--white)" }}>{val.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--w55)" }}>{val.desc}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section style={{ background: "var(--bg0)", padding: "80px 24px" }}>
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-14">
              <div className="text-[10px] font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--blue)" }}>INDUSTRIES</div>
              <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: "var(--white)" }}>Industries We Serve</h2>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {industries.map((ind, i) => (
                <div key={i} className="rounded-2xl p-5 border text-center card-hover" style={{ background: "var(--bg2)", borderColor: "var(--border)" }}>
                  <div className="text-3xl mb-3">{ind.icon}</div>
                  <div className="text-xs font-bold" style={{ color: "var(--white)" }}>{ind.name}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats */}
      <section className="section-glow border-t" style={{ background: "var(--bg1)", borderColor: "var(--border)", padding: "80px 24px" }}>
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="rounded-2xl border p-8 lg:p-10 grid grid-cols-2 md:grid-cols-4 gap-8" style={{ background: "var(--bg2)", borderColor: "var(--border)" }}>
              {stats.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(15,144,255,0.1)" }}>
                    <s.icon size={22} style={{ color: "var(--blue)" }} />
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold gradient-text">{s.val}</div>
                  <div className="text-xs mt-2 font-medium" style={{ color: "var(--w55)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection className="text-center mt-12">
            <Link href="/contact"><Button size="lg">Start a Conversation →</Button></Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
