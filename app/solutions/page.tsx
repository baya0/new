"use client";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { translations } from "@/lib/i18n";
import { Server, Zap, Shield, Headphones, CheckCircle2, ArrowRight, Layers, Settings, Rocket, HeartHandshake } from "lucide-react";

const t = translations.en;
const s = t.solutions;

const colorMap: Record<string, string> = {
  blue: "var(--blue)", cyan: "var(--cyan)", green: "var(--green)", amber: "var(--amber)",
};

const serviceIcons = [Server, Zap, Shield, Headphones];

const processSteps = [
  { icon: Layers, title: "Discovery & Assessment", desc: "We analyze your current infrastructure, identify gaps, and understand your business goals." },
  { icon: Settings, title: "Architecture & Planning", desc: "Custom solution design with detailed roadmap, timelines, and resource allocation." },
  { icon: Rocket, title: "Implementation", desc: "Certified engineers deploy your solution with zero-downtime methodology." },
  { icon: HeartHandshake, title: "Ongoing Support", desc: "24/7 monitoring, proactive maintenance, and continuous optimization." },
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

export default function SolutionsPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="relative overflow-hidden px-6 lg:px-8 py-20 border-b grid-pattern" style={{ background: "var(--bg0)", borderColor: "var(--border)" }}>
        <div className="glow-orb w-[500px] h-[500px] opacity-[0.05]" style={{ background: "radial-gradient(circle, var(--blue), transparent 70%)", right: -100, top: -100 }} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto relative"
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold border rounded-full px-4 py-1.5 mb-5" style={{ background: "rgba(15,144,255,0.08)", borderColor: "rgba(15,144,255,0.2)", color: "var(--blue)" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--blue)" }} />
            {s.eyebrow}
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight max-w-3xl" style={{ color: "var(--white)" }}>
            Empowering Your Business with<br /><span className="gradient-text">Data-Driven Solutions</span>
          </h1>
          <p className="mt-5 text-base lg:text-lg leading-relaxed max-w-xl" style={{ color: "var(--w55)" }}>{s.sub}</p>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="relative" style={{ background: "var(--bg0)", padding: "80px 24px" }}>
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="text-[10px] font-semibold tracking-widest uppercase mb-10" style={{ color: "var(--blue)" }}>{s.label}</div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {s.services.map((svc, i) => {
              const Icon = serviceIcons[i];
              return (
                <AnimatedSection key={i}>
                  <div className="rounded-2xl p-8 border card-hover relative overflow-hidden group h-full" style={{ background: "var(--bg2)", borderColor: "var(--border)" }}>
                    <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: `linear-gradient(90deg, ${colorMap[svc.color]}, transparent)` }} />
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110" style={{ background: `${colorMap[svc.color]}14` }}>
                      <Icon size={24} style={{ color: colorMap[svc.color] }} />
                    </div>
                    <h3 className="text-xl font-bold mb-3" style={{ color: "var(--white)" }}>{svc.title}</h3>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--w55)" }}>{svc.desc}</p>
                    <div className="tag" style={{ background: `${colorMap[svc.color]}0D`, border: `1px solid ${colorMap[svc.color]}22`, color: colorMap[svc.color] }}>
                      {svc.tag}
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="section-glow border-t" style={{ background: "var(--bg1)", borderColor: "var(--border)", padding: "80px 24px" }}>
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-14">
              <div className="text-[10px] font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--blue)" }}>OUR PROCESS</div>
              <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: "var(--white)" }}>How We Deliver Results</h2>
              <p className="mt-4 text-sm max-w-lg mx-auto" style={{ color: "var(--w55)" }}>A proven methodology that ensures every project is delivered on time, on budget, and exceeds expectations.</p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {processSteps.map((step, i) => (
              <AnimatedSection key={i}>
                <div className="relative rounded-2xl p-6 border card-hover h-full" style={{ background: "var(--bg2)", borderColor: "var(--border)" }}>
                  <div className="absolute top-4 right-4 text-4xl font-extrabold" style={{ color: "var(--blue)", opacity: 0.06 }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(15,144,255,0.1)" }}>
                    <step.icon size={20} style={{ color: "var(--blue)" }} />
                  </div>
                  <h3 className="text-sm font-bold mb-2" style={{ color: "var(--white)" }}>{step.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--w55)" }}>{step.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Supportiva */}
      <section style={{ background: "var(--bg0)", padding: "80px 24px" }}>
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="rounded-2xl p-8 lg:p-10 border relative overflow-hidden" style={{ background: "var(--bg2)", borderColor: "var(--border)" }}>
              <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: "linear-gradient(90deg, var(--blue), var(--cyan))" }} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div>
                  <h3 className="text-2xl font-extrabold mb-4" style={{ color: "var(--white)" }}>{s.whyTitle}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--w55)" }}>{s.whyDesc}</p>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {s.whyPoints.map((point, i) => (
                    <div key={i} className="flex gap-3 items-start p-3 rounded-xl transition-colors" style={{ background: "var(--bg3)" }}>
                      <CheckCircle2 size={18} className="shrink-0 mt-0.5" style={{ color: "var(--green)" }} />
                      <span className="text-sm font-medium" style={{ color: "var(--w85)" }}>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection className="text-center mt-12">
            <Link href="/contact"><Button size="lg">{s.cta}</Button></Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
