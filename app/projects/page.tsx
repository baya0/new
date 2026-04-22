"use client";
import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useLang } from "@/lib/language-context";
import { MapPin, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, ArrowRight } from "lucide-react";

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

const ITEMS_PER_PAGE = { sm: 1, md: 2, lg: 3 };

function usePerPage() {
  const [perPage, setPerPage] = useState(3);
  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      setPerPage(w < 640 ? ITEMS_PER_PAGE.sm : w < 1024 ? ITEMS_PER_PAGE.md : ITEMS_PER_PAGE.lg);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return perPage;
}

function ProjectCard({ proj, color, index, onClick, isSelected }: { proj: any; color: string; index: number; onClick: () => void; isSelected: boolean }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.95 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className="group cursor-pointer relative flex flex-col h-full"
      style={{
        background: "var(--glass-card)",
        border: isSelected ? `2px solid ${color}` : "1px solid var(--glass-card-border)",
        borderRadius: 24,
        overflow: "hidden",
        boxShadow: isSelected ? `0 8px 40px ${color}20` : "var(--shadow)",
      }}
    >
      {/* Icon area with gradient */}
      <div
        className="relative h-[200px] sm:h-[220px] overflow-hidden flex items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${color}14, ${color}06, var(--glass-card))` }}
      >
        <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />

        {/* Decorative rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            className="rounded-full border"
            style={{ width: 140, height: 140, borderColor: `${color}12` }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.1, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            className="rounded-full border"
            style={{ width: 200, height: 200, borderColor: `${color}08` }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.05, 0.2] }}
            transition={{ duration: 5, delay: 1, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <motion.span
          className="text-6xl sm:text-7xl relative z-10"
          whileHover={{ scale: 1.15, rotate: -5 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {proj.icon}
        </motion.span>

        {/* Hover glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(circle at center, ${color}15, transparent 70%)` }}
        />
      </div>

      {/* Content */}
      <div className="p-6 sm:p-7 flex flex-col flex-1">
        <div className="flex flex-wrap gap-2 mb-4">
          {proj.tags.map((tag: string, j: number) => (
            <span
              key={j}
              className="text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full"
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

        <h3 className="text-[18px] sm:text-[20px] font-extrabold leading-snug tracking-tight mb-3" style={{ color: "var(--white)" }}>
          {proj.title}
        </h3>

        <div className="flex items-center gap-2 text-[12px] mb-3" style={{ color: "var(--w25)" }}>
          <MapPin size={12} />
          <span>{proj.location}</span>
        </div>

        <p className="text-[14px] sm:text-[15px] leading-[1.8] flex-1" style={{ color: "var(--w55)" }}>
          {proj.desc}
        </p>

        <div
          className="mt-5 inline-flex items-center gap-2 text-[13px] font-bold transition-all duration-300 group-hover:gap-3"
          style={{ color }}
        >
          <span>View Details</span>
          <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>

      {/* Bottom accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0 group-hover:h-[3px] transition-all duration-500"
        style={{ background: `linear-gradient(90deg, ${color}, ${color}40, transparent)` }}
      />
    </motion.div>
  );
}

function DetailPanel({ proj, color, onClose }: { proj: any; color: string; onClose: () => void }) {
  const { t } = useLang();
  const [expanded, setExpanded] = useState(false);

  useEffect(() => { setExpanded(false); }, [proj.title]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.97 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden"
      style={{
        background: "var(--glass-card)",
        border: `1.5px solid ${color}33`,
        borderRadius: 28,
        boxShadow: `0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px ${color}10`,
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left — visual */}
        <div
          className="relative min-h-[260px] lg:min-h-full overflow-hidden flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${color}14, ${color}06, var(--glass-card))` }}
        >
          <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              className="rounded-full border"
              style={{ width: 200, height: 200, borderColor: `${color}15` }}
              animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              className="rounded-full border border-dashed"
              style={{ width: 280, height: 280, borderColor: `${color}0A` }}
              animate={{ scale: [1, 1.1, 1], rotate: [360, 180, 0] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <motion.span
            key={proj.title}
            initial={{ scale: 0.7, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-8xl lg:text-9xl relative z-10"
          >
            {proj.icon}
          </motion.span>
        </div>

        {/* Right — content */}
        <div className="p-8 lg:p-10 flex flex-col justify-center">
          <div className="flex flex-wrap gap-2 mb-5">
            {proj.tags.map((tag: string, j: number) => (
              <span
                key={j}
                className="text-[11px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full"
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

          <h2 className="text-[24px] lg:text-[28px] font-extrabold leading-tight tracking-tight mb-4" style={{ color: "var(--white)" }}>
            {proj.title}
          </h2>

          <div className="flex items-center gap-2 text-[13px] mb-5" style={{ color: "var(--w25)" }}>
            <MapPin size={13} />
            <span>{proj.location}</span>
          </div>

          <p className="text-[15px] lg:text-[16px] leading-[1.85] mb-5" style={{ color: "var(--w55)" }}>
            {expanded ? proj.fullDesc : proj.desc}
          </p>

          <AnimatePresence>
            {expanded && proj.bullets && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3 mb-5 overflow-hidden"
              >
                {proj.bullets.map((b: string, bi: number) => (
                  <motion.li
                    key={bi}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: bi * 0.05 }}
                    className="flex gap-3 items-start text-[14px] leading-relaxed"
                    style={{ color: "var(--w55)" }}
                  >
                    <span className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ background: color }} />
                    <span>{b}</span>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-4 flex-wrap">
            {proj.fullDesc !== proj.desc && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="inline-flex items-center gap-2 text-[14px] font-bold transition-colors duration-200 hover:opacity-80"
                style={{ color }}
              >
                {expanded ? t.projects.showLess : t.projects.readMore}
                {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            )}

            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 text-[13px] font-bold transition-all duration-200 hover:opacity-70"
              style={{ color: "var(--w25)" }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsPage() {
  const { t } = useLang();
  const p = t.projects;
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const detailRef = useRef<HTMLDivElement>(null);
  const perPage = usePerPage();

  const filtered = useMemo(() =>
    activeFilter === "All"
      ? p.items
      : p.items.filter((proj: any) => getCategories(proj.tags).includes(activeFilter)),
    [activeFilter, p.items]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const safeP = Math.min(page, totalPages - 1);
  const pageItems = filtered.slice(safeP * perPage, safeP * perPage + perPage);
  const selected = selectedTitle ? filtered.find((proj: any) => proj.title === selectedTitle) : null;
  const selectedColor = selected ? (colorMap[selected.color] ?? "var(--blue)") : "var(--blue)";

  const handleFilterChange = useCallback((cat: string) => {
    setActiveFilter(cat);
    setPage(0);
    setDirection(0);
    setSelectedTitle(null);
  }, []);

  const goPage = useCallback((p: number) => {
    setDirection(p > page ? 1 : -1);
    setPage(p);
  }, [page]);

  const handleCardClick = useCallback((title: string) => {
    setSelectedTitle(prev => prev === title ? null : title);
    setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 100);
  }, []);

  useEffect(() => {
    if (page >= totalPages) setPage(Math.max(0, totalPages - 1));
  }, [totalPages, page]);

  const pageVariants = {
    enter: (d: number) => ({ x: d >= 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d >= 0 ? -80 : 80, opacity: 0 }),
  };

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
            className="flex items-center text-[11px] font-bold tracking-[0.2em] uppercase py-4 mb-16"
            style={{ color: "var(--w25)", borderBottom: "1px solid var(--border)" }}
          >
            <span className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--green)" }} />
              Projects
            </span>
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
              <p className="text-[16px] lg:text-[18px] leading-[1.8]" style={{ color: "var(--w55)" }}>{p.sub}</p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* PROJECTS GRID + DETAIL */}
      <section className="relative section-deep overflow-hidden" style={{ padding: "80px 0 140px" }}>
        <div className="blob blob-cyan w-[500px] h-[500px] animate-blob" style={{ right: -160, top: 100 }} />
        <div className="blob blob-purple w-[400px] h-[400px] animate-blob" style={{ left: -120, bottom: 60, animationDelay: "-4s" }} />

        <div className="relative z-10 max-w-[1360px] mx-auto px-6 lg:px-10">

          {/* Filters */}
          <FadeIn>
            <div className="flex flex-wrap gap-3 mb-14">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => handleFilterChange(cat)}
                  className="px-5 py-2.5 text-[12px] font-bold tracking-wider uppercase transition-all duration-300"
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

          {/* Detail panel */}
          <div ref={detailRef}>
            <AnimatePresence mode="wait">
              {selected && (
                <div className="mb-12">
                  <DetailPanel
                    key={selected.title}
                    proj={selected}
                    color={selectedColor}
                    onClose={() => setSelectedTitle(null)}
                  />
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Paginated grid */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`page-${safeP}-${activeFilter}`}
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {pageItems.map((proj: any, i: number) => (
                <ProjectCard
                  key={proj.title}
                  proj={proj}
                  color={colorMap[proj.color] ?? "var(--blue)"}
                  index={i}
                  onClick={() => handleCardClick(proj.title)}
                  isSelected={selectedTitle === proj.title}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Pagination controls */}
          {totalPages > 1 && (
            <FadeIn delay={0.1}>
              <div className="flex items-center justify-center gap-6 mt-14">
                <button
                  onClick={() => goPage(Math.max(0, safeP - 1))}
                  disabled={safeP === 0}
                  className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105 disabled:opacity-30 disabled:hover:scale-100"
                  style={{ border: "1px solid var(--border)", color: "var(--w55)", background: "transparent" }}
                >
                  <ChevronLeft size={18} />
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => goPage(i)}
                      className="transition-all duration-300"
                      style={{
                        width: safeP === i ? 32 : 10,
                        height: 10,
                        borderRadius: 999,
                        background: safeP === i ? "var(--blue)" : "var(--border)",
                      }}
                    />
                  ))}
                </div>

                <button
                  onClick={() => goPage(Math.min(totalPages - 1, safeP + 1))}
                  disabled={safeP === totalPages - 1}
                  className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105 disabled:opacity-30 disabled:hover:scale-100"
                  style={{ border: "1px solid var(--border)", color: "var(--w55)", background: "transparent" }}
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              <div className="text-center mt-4 text-[13px] font-bold" style={{ color: "var(--w25)" }}>
                {safeP + 1} / {totalPages}
              </div>
            </FadeIn>
          )}

          {/* CTA */}
          <FadeIn delay={0.2} className="text-center mt-20">
            <Link href="/contact"><Button size="lg">{p.cta}</Button></Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
