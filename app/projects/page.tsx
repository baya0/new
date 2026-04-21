"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useLang } from "@/lib/language-context";
import { MapPin, ArrowUpRight, ChevronLeft, ChevronRight, Maximize2, ChevronDown, ChevronUp } from "lucide-react";

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

function FadeIn({ children, className, delay = 0, y = 24 }: { children: React.ReactNode; className?: string; delay?: number; y?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>{children}</motion.div>
  );
}

function FeaturedCard({ proj, color }: { proj: any; color: string }) {
  const [expanded, setExpanded] = useState(false);
  const { t } = useLang();

  useEffect(() => { setExpanded(false); }, [proj.title]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden"
      style={{
        background: "var(--glass-card)",
        border: "1px solid var(--glass-card-border)",
        borderRadius: 24,
        boxShadow: "var(--shadow-lg)",
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div
          className="relative min-h-[240px] md:min-h-full overflow-hidden flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${color}12, ${color}06, var(--glass-card))` }}
        >
          <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
          <motion.span
            key={proj.title}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-7xl lg:text-8xl"
          >
            {proj.icon}
          </motion.span>
        </div>

        <div className="p-8 lg:p-10 flex flex-col justify-center">
          <div className="flex flex-wrap gap-2 mb-4">
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

          <h2 className="text-xl lg:text-2xl font-bold leading-tight tracking-tight mb-3" style={{ color: "var(--white)" }}>
            {proj.title}
          </h2>

          <div className="flex items-center gap-1.5 text-xs mb-4" style={{ color: "var(--w25)" }}>
            <MapPin size={11} />
            <span>{proj.location}</span>
          </div>

          <p className="text-[14px] leading-[1.8] mb-4" style={{ color: "var(--w55)" }}>
            {expanded ? proj.fullDesc : proj.desc}
          </p>

          <AnimatePresence>
            {expanded && proj.bullets && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2 mb-4 overflow-hidden"
              >
                {proj.bullets.map((b: string, bi: number) => (
                  <li key={bi} className="flex gap-3 items-start text-[13px] leading-relaxed" style={{ color: "var(--w55)" }}>
                    <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: color }} />
                    <span>{b}</span>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>

          {proj.fullDesc !== proj.desc && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="inline-flex items-center gap-1.5 text-sm font-bold mb-4 transition-colors duration-200 hover:opacity-80"
              style={{ color }}
            >
              {expanded ? t.projects.showLess : t.projects.readMore}
              {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function ScrollCard({ proj, color, onClick }: { proj: any; color: string; onClick: () => void }) {
  return (
    <motion.div
      layout
      onClick={onClick}
      className="group flex-shrink-0 w-[300px] sm:w-[320px] cursor-pointer relative"
      style={{
        background: "var(--glass-card)",
        border: "1px solid var(--glass-card-border)",
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: "var(--shadow)",
      }}
      whileHover={{ y: -8, boxShadow: "0 12px 40px rgba(0,0,0,0.2)" }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Image area */}
      <div
        className="h-[160px] relative overflow-hidden flex items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${color}12, ${color}06, var(--glass-card))` }}
      >
        <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />

        <span className="text-[44px] relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
          {proj.icon}
        </span>

        {/* Hover overlay — expand affordance */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-all duration-400 pointer-events-none">
          <div className="w-10 h-10 rounded-full flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-400" style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}>
            <Maximize2 size={16} className="text-white" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <span
          className="inline-block text-[9px] font-bold tracking-wider uppercase px-2.5 py-1 rounded mb-3"
          style={{ color, background: `${color}0E`, border: `1px solid ${color}22` }}
        >
          {proj.tags[0]}
        </span>

        <h3 className="text-[14px] font-bold leading-snug tracking-tight mb-2 line-clamp-2" style={{ color: "var(--white)" }}>
          {proj.title}
        </h3>

        <div className="flex items-center gap-1.5 text-[10px] mb-2" style={{ color: "var(--w25)" }}>
          <MapPin size={9} />
          <span>{proj.location}</span>
        </div>

        <p className="text-[12px] leading-relaxed line-clamp-2" style={{ color: "var(--w55)" }}>
          {proj.desc}
        </p>
      </div>

      {/* Bottom hover indicator */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0 group-hover:h-[3px] transition-all duration-400"
        style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
      />
    </motion.div>
  );
}

export default function ProjectsPage() {
  const { t } = useLang();
  const p = t.projects;
  const [activeFilter, setActiveFilter] = useState("All");
  const [featuredTitle, setFeaturedTitle] = useState<string>(p.items[0]?.title ?? "");
  const scrollRef = useRef<HTMLDivElement>(null);

  const filtered = activeFilter === "All"
    ? p.items
    : p.items.filter(proj => getCategories(proj.tags).includes(activeFilter));

  const featured = filtered.find(proj => proj.title === featuredTitle) || filtered[0];
  const others = filtered.filter(proj => proj.title !== featured?.title);
  const featuredColor = colorMap[featured?.color] ?? "var(--blue)";

  const handleFilterChange = useCallback((cat: string) => {
    setActiveFilter(cat);
    const newFiltered = cat === "All"
      ? p.items
      : p.items.filter(proj => getCategories(proj.tags).includes(cat));
    if (newFiltered.length > 0 && !newFiltered.find(proj => proj.title === featuredTitle)) {
      setFeaturedTitle(newFiltered[0].title);
    }
  }, [p.items, featuredTitle]);

  const scroll = useCallback((dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "right" ? 340 : -340, behavior: "smooth" });
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden hero-bg" style={{ padding: "32px 0 100px" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="aurora" />
          <div className="blob blob-blue w-[600px] h-[600px] animate-blob" style={{ right: -180, top: -120 }} />
          <div className="blob blob-cyan w-[420px] h-[420px] animate-blob" style={{ left: -120, bottom: 40, animationDelay: "-4s" }} />
          <div className="absolute inset-0 dot-grid opacity-30" />
        </div>

        <div className="relative z-10 max-w-[1360px] mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between text-[11px] font-bold tracking-[0.2em] uppercase py-4 mb-16"
            style={{ color: "var(--w25)", borderBottom: "1px solid var(--border)" }}
          >
            <span className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--green)" }} />
              Projects
            </span>
            <span className="hidden sm:block">Case Archive</span>
          </motion.div>

          <div className="max-w-2xl">
            <FadeIn>
              <div className="mono-label mb-5 flex items-center gap-3" style={{ color: "var(--blue)" }}>
                <span className="w-8 h-px" style={{ background: "var(--blue)" }} />
                Our Work
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="headline-xl mb-6">
                Real projects,<br />
                <span style={{ color: "var(--blue)" }}>real results.</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-base lg:text-lg leading-[1.8]" style={{ color: "var(--w55)" }}>{p.sub}</p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FEATURED + SCROLL */}
      <section className="relative section-deep overflow-hidden" style={{ padding: "80px 0 140px" }}>
        <div className="blob blob-cyan w-[500px] h-[500px] animate-blob" style={{ right: -160, top: 100 }} />
        <div className="blob blob-purple w-[400px] h-[400px] animate-blob" style={{ left: -120, bottom: 60, animationDelay: "-4s" }} />

        <div className="relative z-10 max-w-[1360px] mx-auto px-6 lg:px-10">

          {/* Filters */}
          <FadeIn>
            <div className="flex flex-wrap gap-3 mb-12">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => handleFilterChange(cat)}
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
          </FadeIn>

          {/* Featured project */}
          {featured && (
            <AnimatePresence mode="wait">
              <FeaturedCard key={featured.title} proj={featured} color={featuredColor} />
            </AnimatePresence>
          )}

          {/* Scroll row */}
          {others.length > 0 && (
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <span className="mono-label" style={{ color: "var(--w55)" }}>
                  More Cases
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => scroll("left")}
                    className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
                    style={{ border: "1px solid var(--border)", color: "var(--w55)", background: "transparent" }}
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => scroll("right")}
                    className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
                    style={{ border: "1px solid var(--border)", color: "var(--w55)", background: "transparent" }}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              <div
                ref={scrollRef}
                className="flex gap-5 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory"
                style={{ scrollbarWidth: "thin", scrollbarColor: "var(--border) transparent" }}
              >
                {others.map(proj => (
                  <ScrollCard
                    key={proj.title}
                    proj={proj}
                    color={colorMap[proj.color] ?? "var(--blue)"}
                    onClick={() => {
                      setFeaturedTitle(proj.title);
                      window.scrollTo({ top: document.querySelector(".featured-anchor")?.getBoundingClientRect().top! + window.scrollY - 100, behavior: "smooth" });
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Anchor for scroll-to */}
          <div className="featured-anchor" style={{ position: "absolute", top: 160 }} />

          {/* CTA */}
          <FadeIn delay={0.2} className="text-center mt-20">
            <Link href="/contact"><Button size="lg">{p.cta}</Button></Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
