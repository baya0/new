"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useLang } from "@/lib/language-context";
import { MapPin, ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";

const colorMap: Record<string, string> = {
  blue: "var(--blue)",
  green: "var(--green)",
  amber: "var(--amber)",
  cyan: "var(--cyan)",
  purple: "var(--purple)",
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

function WordReveal({ text, className, as: Tag = "span", delay = 0 }: { text: string; className?: string; as?: any; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <Tag ref={ref} className={className}>
      {text.split(" ").map((word: string, i: number) => (
        <span key={i} className="inline-block overflow-hidden align-baseline mr-[0.26em]">
          <motion.span
            initial={{ y: "110%", rotate: 4 }}
            animate={inView ? { y: "0%", rotate: 0 } : {}}
            transition={{ delay: delay + i * 0.055, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

function FadeIn({ children, className, delay = 0, y = 24 }: { children: React.ReactNode; className?: string; delay?: number; y?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>{children}</motion.div>
  );
}

function ProjectCase({ proj, i }: { proj: any; i: number }) {
  const [expanded, setExpanded] = useState(false);
  const { t } = useLang();
  const color = colorMap[proj.color];

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: i * 0.06, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative group grid grid-cols-12 gap-6 py-16"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      {/* Left: case number + location */}
      <div className="col-span-12 md:col-span-2">
        <div className="display-num !text-[56px]" style={{ color }}>
          {String(i + 1).padStart(2, "0")}
        </div>
        <div className="mono-label mt-4 flex items-center gap-1.5" style={{ color: "var(--w55)" }}>
          <MapPin size={11} /> {proj.location}
        </div>
      </div>

      {/* Middle: title + description */}
      <div className="col-span-12 md:col-span-7">
        <div className="flex flex-wrap gap-2 mb-5">
          {proj.tags.map((tag: string, j: number) => (
            <span
              key={j}
              className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded"
              style={{
                color: j === 0 ? color : "var(--w55)",
                background: j === 0 ? `${color}0E` : "transparent",
                border: j === 0 ? `1px solid ${color}22` : "1px solid var(--border)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-2xl lg:text-[32px] font-black leading-[1.1] tracking-tight mb-5" style={{ color: "var(--white)" }}>
          {proj.title.includes("Nike") ? (
            <>
              <a href="https://www.linkedin.com/company/nike/" target="_blank" rel="noopener noreferrer" className="swept-underline">Nike</a>
              {proj.title.replace("Nike", "")}
            </>
          ) : proj.title}
        </h3>

        <p className="text-[15px] leading-[1.9] max-w-2xl" style={{ color: "var(--w55)" }}>
          {expanded ? proj.fullDesc : proj.desc}
        </p>

        {expanded && proj.bullets && (
          <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-2.5 max-w-2xl">
            {proj.bullets.map((b: string, bi: number) => (
              <li key={bi} className="flex gap-3 items-start text-[14px] leading-relaxed" style={{ color: "var(--w55)" }}>
                <span className="mono-label shrink-0 mt-0.5" style={{ color }}>0{bi + 1}</span>
                <span>{b}</span>
              </li>
            ))}
          </motion.ul>
        )}

        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-6 inline-flex items-center gap-2 text-sm font-bold"
          style={{ color }}
        >
          <span className="swept-underline">{expanded ? t.projects.showLess : t.projects.readMore}</span>
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {/* Right: decorative circle with icon */}
      <div className="hidden md:flex col-span-3 items-start justify-end">
        <motion.div
          whileHover={{ rotate: 8, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="relative w-36 h-36 rounded-full flex items-center justify-center"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${color}18, transparent 70%)`,
            border: `1px dashed ${color}40`,
          }}
        >
          <span className="text-5xl">{proj.icon}</span>
          <div className="absolute -inset-4 rounded-full border border-dashed animate-spin-slow opacity-30" style={{ borderColor: color }} />
        </motion.div>
      </div>
    </motion.article>
  );
}

export default function ProjectsPage() {
  const { t } = useLang();
  const p = t.projects;
  const [activeFilter, setActiveFilter] = useState("All");
  const year = new Date().getFullYear();

  const filtered = activeFilter === "All"
    ? p.items
    : p.items.filter(proj => getCategories(proj.tags).includes(activeFilter));

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden hero-bg" style={{ padding: "32px 0 120px" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="aurora" />
          <div className="blob blob-blue w-[600px] h-[600px] animate-blob" style={{ right: -180, top: -120 }} />
          <div className="blob blob-cyan w-[420px] h-[420px] animate-blob" style={{ left: -120, bottom: 40, animationDelay: "-4s" }} />
          <div className="absolute inset-0 dot-grid opacity-30" />
        </div>

        <div className="relative z-10 max-w-[1360px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between text-[11px] font-bold tracking-[0.2em] uppercase py-4 mb-20" style={{ color: "var(--w25)", borderBottom: "1px solid var(--border)" }}>
            <span className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--green)" }} />
              SECTION IV — PROJECTS
            </span>
            <span className="hidden sm:block">CASE ARCHIVE — {year}</span>
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-8">
              <FadeIn>
                <div className="mono-label mb-6 flex items-center gap-3" style={{ color: "var(--green)" }}>
                  <span className="w-8 h-px" style={{ background: "var(--green)" }} />
                  The Archive
                </div>
              </FadeIn>
              <h1 className="headline-xl mb-8">
                <WordReveal text="Field" />{" "}
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.6 }} className="italic font-light" style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: "var(--blue)" }}>
                  notes
                </motion.span>
                <br />
                <WordReveal text="from the work." delay={0.2} />
              </h1>
              <FadeIn delay={0.6} className="max-w-xl">
                <p className="text-base lg:text-lg leading-[1.8]" style={{ color: "var(--w55)" }}>{p.sub}</p>
              </FadeIn>
            </div>

            <div className="hidden lg:block col-span-3 col-start-10 self-end">
              <FadeIn delay={0.4}>
                <div className="mono-label mb-4">Summary</div>
                <div className="pt-4" style={{ borderTop: "1px solid var(--border)" }}>
                  <div className="flex items-baseline justify-between py-3">
                    <span className="mono-label">Total Cases</span>
                    <span className="display-num !text-[32px]" style={{ color: "var(--blue)" }}>{p.items.length}</span>
                  </div>
                  <div className="flex items-baseline justify-between py-3" style={{ borderTop: "1px solid var(--border)" }}>
                    <span className="mono-label">Countries</span>
                    <span className="display-num !text-[32px]" style={{ color: "var(--cyan)" }}>9</span>
                  </div>
                  <div className="flex items-baseline justify-between py-3" style={{ borderTop: "1px solid var(--border)" }}>
                    <span className="mono-label">Since</span>
                    <span className="display-num !text-[32px]" style={{ color: "var(--amber)" }}>2013</span>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* FILTER + CASES */}
      <section className="relative section-deep overflow-hidden" style={{ padding: "120px 0 160px" }}>
        <div className="blob blob-cyan w-[500px] h-[500px] animate-blob" style={{ right: -160, top: 100 }} />
        <div className="blob blob-purple w-[400px] h-[400px] animate-blob" style={{ left: -120, bottom: 60, animationDelay: "-4s" }} />

        <div className="relative z-10 max-w-[1360px] mx-auto px-6 lg:px-10">
          <FadeIn>
            <div className="flex items-end justify-between flex-wrap gap-8 mb-16">
              <div>
                <div className="mono-label mb-4" style={{ color: "var(--blue)" }}>Chapter 01 — The Cases</div>
                <h2 className="text-[40px] lg:text-[56px] font-black leading-[0.98] tracking-tight" style={{ color: "var(--white)" }}>
                  Filter the{" "}
                  <span style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: "italic", fontWeight: 400, color: "var(--blue)" }}>
                    archive.
                  </span>
                </h2>
              </div>

              <div className="flex flex-wrap gap-3">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className="px-4 py-2 text-[11px] font-bold tracking-wider uppercase transition-all duration-300"
                    style={{
                      color: activeFilter === cat ? "var(--white)" : "var(--w55)",
                      background: activeFilter === cat ? "var(--blue)" : "transparent",
                      border: `1px solid ${activeFilter === cat ? "var(--blue)" : "var(--border)"}`,
                      borderRadius: 999,
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>

          <div>
            <AnimatePresence mode="popLayout">
              {filtered.map((proj, i) => (
                <motion.div key={proj.title} layout>
                  <ProjectCase proj={proj} i={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <FadeIn delay={0.2} className="text-center mt-20">
            <Link href="/contact"><Button size="lg">{p.cta}</Button></Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
