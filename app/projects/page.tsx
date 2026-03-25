"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { translations } from "@/lib/i18n";
import { MapPin, Globe, Users, Monitor, Server, ArrowRight } from "lucide-react";

const t = translations.en;
const p = t.projects;

const colorMap: Record<string, { accent: string; bg: string }> = {
  blue:   { accent: "var(--blue)",   bg: "rgba(15,144,255,0.06)" },
  green:  { accent: "var(--green)",  bg: "rgba(30,221,128,0.06)" },
  amber:  { accent: "var(--amber)",  bg: "rgba(255,166,0,0.06)" },
  cyan:   { accent: "var(--cyan)",   bg: "rgba(0,220,230,0.06)" },
  purple: { accent: "var(--purple)", bg: "rgba(155,109,255,0.06)" },
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

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All"
    ? p.items
    : p.items.filter(proj => getCategories(proj.tags).includes(activeFilter));

  return (
    <>
      {/* Page Hero */}
      <section className="relative overflow-hidden px-6 lg:px-8 py-20 border-b grid-pattern" style={{ background: "var(--bg0)", borderColor: "var(--border)" }}>
        <div className="glow-orb w-[500px] h-[500px] opacity-[0.05]" style={{ background: "radial-gradient(circle, var(--green), transparent 70%)", right: -100, top: -100 }} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto relative"
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold border rounded-full px-4 py-1.5 mb-5" style={{ background: "rgba(15,144,255,0.08)", borderColor: "rgba(15,144,255,0.2)", color: "var(--blue)" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--blue)" }} />
            {p.eyebrow}
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight" style={{ color: "var(--white)" }}>
            {p.h1[0]}<br /><span className="gradient-text">{p.h1[1]}</span>
          </h1>
          <p className="mt-5 text-base lg:text-lg leading-relaxed max-w-xl" style={{ color: "var(--w55)" }}>{p.sub}</p>
        </motion.div>
      </section>

      <section style={{ background: "var(--bg0)", padding: "64px 24px" }}>
        <div className="max-w-6xl mx-auto">
          {/* Filter Tabs */}
          <AnimatedSection>
            <div className="flex flex-wrap gap-2 mb-10">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200"
                  style={{
                    background: activeFilter === cat ? "var(--blue)" : "var(--bg2)",
                    color: activeFilter === cat ? "#fff" : "var(--w55)",
                    border: `1px solid ${activeFilter === cat ? "var(--blue)" : "var(--border)"}`,
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </AnimatedSection>

          {/* Project grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((proj, i) => {
                const c = colorMap[proj.color];
                return (
                  <motion.div
                    key={proj.title}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="rounded-2xl border overflow-hidden card-hover h-full" style={{ background: "var(--bg2)", borderColor: "var(--border)" }}>
                      {/* Image area with gradient */}
                      <div className="h-40 flex items-center justify-center text-5xl border-b relative overflow-hidden"
                        style={{ borderColor: "var(--border)" }}>
                        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${c.bg}, var(--bg3))` }} />
                        <div className="absolute inset-0 grid-pattern opacity-40" />
                        <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: `linear-gradient(90deg, ${c.accent}, transparent)` }} />
                        <span className="relative text-4xl">{proj.icon}</span>
                      </div>

                      {/* Body */}
                      <div className="p-6">
                        <h3 className="text-base font-bold leading-snug mb-2.5" style={{ color: "var(--white)" }}>
                          {proj.title}
                        </h3>
                        <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--w55)" }}>
                          {proj.desc}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {proj.tags.map((tag, j) => (
                            <span key={j} className="tag text-[10px]"
                              style={{
                                background: j === 0 ? `${c.accent}0D` : "var(--bg3)",
                                color: j === 0 ? c.accent : "var(--w55)",
                                border: `1px solid ${j === 0 ? `${c.accent}22` : "var(--border)"}`,
                              }}>
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Location */}
                        <div className="flex items-center gap-1.5 text-[11px] font-medium" style={{ color: "var(--w25)" }}>
                          <MapPin size={12} />
                          <span>{proj.location}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Stats after projects */}
          <AnimatedSection>
            <div className="mt-16 rounded-2xl border p-8 lg:p-10 grid grid-cols-2 md:grid-cols-4 gap-8"
              style={{ background: "var(--bg2)", borderColor: "var(--border)" }}>
              <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl" style={{ background: "linear-gradient(90deg, var(--blue), var(--cyan))" }} />
              {[
                { val: "9", label: "Countries Served", icon: Globe },
                { val: "60+", label: "Engineers Deployed", icon: Users },
                { val: "9", label: "Nike Stores Migrated", icon: Monitor },
                { val: "36", label: "Devices Migrated", icon: Server },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: "rgba(15,144,255,0.1)" }}>
                    <s.icon size={20} style={{ color: "var(--blue)" }} />
                  </div>
                  <div className="text-3xl font-extrabold gradient-text">{s.val}</div>
                  <div className="text-xs mt-1 font-medium" style={{ color: "var(--w55)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection className="text-center mt-12">
            <Link href="/contact"><Button size="lg">{p.cta}</Button></Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
