"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { translations } from "@/lib/i18n";
import { MapPin, Globe, Users, Monitor, Server, ChevronDown, ChevronUp } from "lucide-react";

const t = translations.en;
const p = t.projects;

const colorMap: Record<string, { accent: string; bg: string }> = {
  blue:   { accent: "var(--blue)",   bg: "rgba(29,107,196,0.06)" },
  green:  { accent: "var(--green)",  bg: "rgba(5,150,101,0.06)" },
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

function StaggerChild({ children, className, i }: { children: React.ReactNode; className?: string; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }} className={className}>{children}</motion.div>
  );
}

function ProjectCard({ proj, i }: { proj: any; i: number }) {
  const [expanded, setExpanded] = useState(false);
  const c = colorMap[proj.color];
  const isReversed = i % 2 !== 0;

  return (
    <StaggerChild i={i}>
      <div className="glass-card overflow-hidden group" style={{ transform: "none" }}>
        <div className={`grid grid-cols-1 md:grid-cols-12 items-stretch`}>
          {/* Image area */}
          <div className={`md:col-span-4 relative overflow-hidden min-h-[220px] flex items-center justify-center ${isReversed ? "md:order-2" : ""}`}
            style={{ background: `linear-gradient(135deg, ${c.bg}, var(--glass-card))` }}>
            <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: `linear-gradient(90deg, ${c.accent}, transparent)` }} />
            {/* To add project image: replace the emoji below with <Image src="/images/projects/project-name.jpg" alt="..." fill className="object-cover" /> */}
            <span className="relative text-6xl transition-transform duration-500 group-hover:scale-110">{proj.icon}</span>
          </div>

          {/* Content */}
          <div className={`md:col-span-8 p-7 lg:p-9 ${isReversed ? "md:order-1" : ""}`}>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {proj.tags.map((tag: string, j: number) => (
                <span key={j} className="tag text-[10px]"
                  style={{
                    background: j === 0 ? `${c.accent}0D` : "var(--glass-card)",
                    backdropFilter: "blur(8px)",
                    color: j === 0 ? c.accent : "var(--w55)",
                    border: `1px solid ${j === 0 ? `${c.accent}20` : "var(--glass-card-border)"}`,
                  }}>{tag}</span>
              ))}
            </div>

            <h3 className="text-lg lg:text-xl font-black leading-snug mb-3 relative z-10" style={{ color: "var(--white)" }}>{proj.title}</h3>

            <p className="text-sm leading-[1.8] relative z-10" style={{ color: "var(--w55)" }}>
              {expanded ? proj.fullDesc : proj.desc}
            </p>

            {/* Bullet points (when expanded and available) */}
            {expanded && proj.bullets && (
              <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 space-y-2 relative z-10">
                {proj.bullets.map((b: string, bi: number) => (
                  <li key={bi} className="flex gap-2.5 items-start text-sm leading-relaxed" style={{ color: "var(--w55)" }}>
                    <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: c.accent }} />
                    {b}
                  </li>
                ))}
              </motion.ul>
            )}

            <div className="flex items-center justify-between mt-5 pt-4 relative z-10" style={{ borderTop: "1px solid var(--glass-card-border)" }}>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold" style={{ color: "var(--w25)" }}>
                <MapPin size={12} /><span>{proj.location}</span>
              </div>
              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-1 text-xs font-bold transition-colors duration-200"
                style={{ color: c.accent }}
              >
                {expanded ? "Less" : "Read More"}
                {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </StaggerChild>
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
      <section className="relative overflow-hidden section-depth" style={{ padding: "100px 24px 120px" }}>
        <div className="aurora" />
        <div className="blob blob-blue w-[500px] h-[500px] -top-40 -right-40 animate-blob" />
        <div className="blob blob-cyan w-[400px] h-[400px] bottom-0 -left-32 animate-blob" style={{ animationDelay: "4s" }} />
        <div className="blob blob-purple w-[300px] h-[300px] top-20 left-1/3 animate-blob" style={{ animationDelay: "8s", opacity: 0.3 }} />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-6xl mx-auto relative z-10">
          <div className="badge mb-6" style={{ background: "rgba(5,150,105,0.08)", borderColor: "rgba(5,150,105,0.15)", color: "var(--green)" }}>{p.eyebrow}</div>
          <h1 className="text-4xl sm:text-5xl lg:text-[60px] font-black leading-[1.08] tracking-tight" style={{ color: "var(--white)" }}>
            {p.h1[0]}<br /><span className="gradient-text">{p.h1[1]}</span>
          </h1>
          <p className="mt-6 text-base lg:text-lg leading-relaxed max-w-xl" style={{ color: "var(--w55)" }}>{p.sub}</p>
          <div className="accent-line w-24 mt-8" style={{ background: "linear-gradient(90deg, var(--green), var(--cyan), transparent)" }} />
        </motion.div>
      </section>

      <div className="section-divider" />

      <section className="relative overflow-hidden section-deep" style={{ padding: "100px 24px 140px" }}>
        <div className="blob blob-cyan w-[450px] h-[450px] top-40 -right-48 animate-blob" style={{ animationDelay: "2s" }} />
        <div className="blob blob-purple w-[350px] h-[350px] bottom-60 -left-40 animate-blob" style={{ animationDelay: "6s" }} />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Filter Pills */}
          <AnimatedSection>
            <div className="flex flex-wrap gap-2 mb-14">
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => setActiveFilter(cat)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300"
                  style={{
                    background: activeFilter === cat ? "var(--blue)" : "var(--glass-card)",
                    backdropFilter: activeFilter === cat ? "none" : "blur(12px)",
                    color: activeFilter === cat ? "#fff" : "var(--w55)",
                    border: `1px solid ${activeFilter === cat ? "var(--blue)" : "var(--glass-card-border)"}`,
                    boxShadow: activeFilter === cat ? "var(--shadow-blue)" : "none",
                  }}>
                  {cat}
                </button>
              ))}
            </div>
          </AnimatedSection>

          {/* Project Cards — Case Study Style */}
          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((proj, i) => (
                <motion.div key={proj.title} layout initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.35 }}>
                  <ProjectCard proj={proj} i={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Stats */}
          <AnimatedSection>
            <div className="mt-24 float-panel glow-border rounded-3xl p-10 lg:p-12 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: "var(--gradient-brand)" }} />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { val: "9", label: "Countries Served", icon: Globe, color: "var(--blue)" },
                  { val: "60+", label: "Engineers Deployed", icon: Users, color: "var(--cyan)" },
                  { val: "9", label: "Nike Stores Migrated", icon: Monitor, color: "var(--green)" },
                  { val: "36", label: "Devices Migrated", icon: Server, color: "var(--amber)" },
                ].map((s, i) => (
                  <div key={i} className="text-center group">
                    <div className="w-12 h-12 rounded-xl icon-box flex items-center justify-center mx-auto mb-4" style={{ background: `${s.color}10`, border: `1px solid ${s.color}20`, color: s.color }}>
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
