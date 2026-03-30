"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { translations } from "@/lib/i18n";
import { MapPin, Globe, Users, Monitor, Server } from "lucide-react";

const t = translations.en;
const p = t.projects;

const colorMap: Record<string, { accent: string; bg: string }> = {
  blue:   { accent: "var(--blue)",   bg: "rgba(29,107,196,0.06)" },
  green:  { accent: "var(--green)",  bg: "rgba(5,150,105,0.06)" },
  amber:  { accent: "var(--amber)",  bg: "rgba(217,119,6,0.06)" },
  cyan:   { accent: "var(--cyan)",   bg: "rgba(8,145,178,0.06)" },
  purple: { accent: "var(--purple)", bg: "rgba(124,58,237,0.06)" },
};

const CATEGORIES = ["All", "Migration", "Datacenter", "Support", "Network", "Sustainability"];

function getCategories(tags: readonly string[]) {
  const cats: string[] = [];
  const tagStr = tags.join(" ").toLowerCase();
  if (tagStr.includes("migration") || tagStr.includes("windows")) cats.push("Migration");
  if (tagStr.includes("datacenter") || tagStr.includes("rack") || tagStr.includes("cabling") || tagStr.includes("firewall")) cats.push("Datacenter");
  if (tagStr.includes("support") || tagStr.includes("l1")) cats.push("Support");
  if (tagStr.includes("cisco") || tagStr.includes("wifi") || tagStr.includes("network") || tagStr.includes("heatmap")) cats.push("Network");
  if (tagStr.includes("green") || tagStr.includes("decommission")) cats.push("Sustainability");
  return cats;
}

function AnimatedSection({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className={className}>{children}</motion.div>
  );
}

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All"
    ? p.items
    : p.items.filter(proj => getCategories(proj.tags).includes(activeFilter));

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden hero-bg" style={{ padding: "80px 24px 100px" }}>
        <div className="absolute inset-0 dot-grid opacity-25 pointer-events-none" />
        <div className="glow-orb w-[600px] h-[600px] opacity-[0.05]" style={{ background: "radial-gradient(circle, var(--green), transparent 70%)", right: -100, top: -100 }} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-6xl mx-auto relative">
          <div className="badge mb-6" style={{ background: "rgba(5,150,105,0.08)", borderColor: "rgba(5,150,105,0.15)", color: "var(--green)" }}>{p.eyebrow}</div>
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-black leading-[1.08] tracking-tight" style={{ color: "var(--white)" }}>
            {p.h1[0]}<br /><span className="gradient-text">{p.h1[1]}</span>
          </h1>
          <p className="mt-6 text-base lg:text-lg leading-relaxed max-w-xl" style={{ color: "var(--w55)" }}>{p.sub}</p>
          <div className="accent-line w-24 mt-8" style={{ background: "linear-gradient(90deg, var(--green), var(--cyan), transparent)" }} />
        </motion.div>
      </section>

      <section className="section-alt" style={{ padding: "80px 24px 120px" }}>
        <div className="max-w-6xl mx-auto">
          {/* Filter Pills */}
          <AnimatedSection>
            <div className="flex flex-wrap gap-2 mb-12">
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => setActiveFilter(cat)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300"
                  style={{
                    background: activeFilter === cat ? "var(--blue)" : "var(--bg2)",
                    color: activeFilter === cat ? "#fff" : "var(--w55)",
                    border: `1px solid ${activeFilter === cat ? "var(--blue)" : "var(--border)"}`,
                    boxShadow: activeFilter === cat ? "var(--shadow-blue)" : "none",
                  }}>
                  {cat}
                </button>
              ))}
            </div>
          </AnimatedSection>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((proj) => {
                const c = colorMap[proj.color];
                return (
                  <motion.div key={proj.title} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.35 }}>
                    <div className="glass-card overflow-hidden group h-full">
                      {/* Image area */}
                      <div className="h-48 flex items-center justify-center relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${c.bg}, var(--bg2))` }}>
                        <div className="absolute inset-0 dot-grid opacity-20" />
                        <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: `linear-gradient(90deg, ${c.accent}, transparent)` }} />
                        {/* To add project images: <Image src="/images/projects/project-name.jpg" alt="..." fill className="object-cover" /> */}
                        <span className="relative text-5xl transition-transform duration-500 group-hover:scale-110">{proj.icon}</span>
                      </div>

                      <div className="p-6">
                        <h3 className="text-base font-bold leading-snug mb-2.5" style={{ color: "var(--white)" }}>{proj.title}</h3>
                        <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--w55)" }}>{proj.desc}</p>
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {proj.tags.map((tag, j) => (
                            <span key={j} className="tag text-[10px]"
                              style={{
                                background: j === 0 ? `${c.accent}0D` : "var(--bg2)",
                                color: j === 0 ? c.accent : "var(--w55)",
                                border: `1px solid ${j === 0 ? `${c.accent}20` : "var(--border)"}`,
                              }}>{tag}</span>
                          ))}
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold" style={{ color: "var(--w25)" }}>
                          <MapPin size={12} /><span>{proj.location}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Stats */}
          <AnimatedSection>
            <div className="mt-20 glass-card rounded-3xl p-10 lg:p-12 relative overflow-hidden !transform-none">
              <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: "var(--gradient-brand)" }} />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { val: "9", label: "Countries Served", icon: Globe, color: "var(--blue)" },
                  { val: "60+", label: "Engineers Deployed", icon: Users, color: "var(--cyan)" },
                  { val: "9", label: "Nike Stores Migrated", icon: Monitor, color: "var(--green)" },
                  { val: "36", label: "Devices Migrated", icon: Server, color: "var(--amber)" },
                ].map((s, i) => (
                  <div key={i} className="text-center group">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" style={{ background: `${s.color}10`, border: `1px solid ${s.color}20` }}>
                      <s.icon size={22} style={{ color: s.color }} />
                    </div>
                    <div className="text-3xl font-black gradient-text mb-1">{s.val}</div>
                    <div className="text-xs font-medium" style={{ color: "var(--w55)" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection className="text-center mt-14">
            <Link href="/contact"><Button size="lg">{p.cta}</Button></Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
