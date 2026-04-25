"use client";
import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useLang } from "@/lib/language-context";
import { useTheme } from "@/lib/theme-context";
import {
  MapPin, ChevronLeft, ChevronRight, ChevronDown, ChevronUp,
  LayoutGrid, ArrowLeftRight, Server, Headphones, Network, Leaf,
  Calendar,
} from "lucide-react";

// Restore to CSS variables so both light and dark themes work correctly
const colorMap: Record<string, string> = {
  blue: "var(--blue)",
  green: "var(--green)",
  amber: "var(--amber)",
  cyan: "var(--cyan)",
  purple: "var(--purple)",
};

const CATEGORIES = ["All", "Migration", "Datacenter", "Support", "Network", "Sustainability"] as const;
type Category = (typeof CATEGORIES)[number];

const CATEGORY_ICONS: Record<Category, React.ReactNode> = {
  All: <LayoutGrid size={13} />,
  Migration: <ArrowLeftRight size={13} />,
  Datacenter: <Server size={13} />,
  Support: <Headphones size={13} />,
  Network: <Network size={13} />,
  Sustainability: <Leaf size={13} />,
};

function getCategories(tags: readonly string[]): string[] {
  const cats: string[] = [];
  const s = tags.join(" ").toLowerCase();
  if (s.includes("migration") || s.includes("windows")) cats.push("Migration");
  if (s.includes("datacenter") || s.includes("rack") || s.includes("cabling") || s.includes("firewall")) cats.push("Datacenter");
  if (s.includes("support") || s.includes("l1")) cats.push("Support");
  if (s.includes("cisco") || s.includes("wifi") || s.includes("network") || s.includes("heatmap")) cats.push("Network");
  if (s.includes("green") || s.includes("decommission")) cats.push("Sustainability");
  return cats;
}

function getProjectCategory(tags: readonly string[]): string {
  return getCategories(tags)[0] || "General";
}

function getProjectImages(proj: any): string[] {
  if (proj.images) return Array.isArray(proj.images) ? proj.images : [proj.images];
  if (proj.image) return [proj.image];
  return [];
}

function FadeIn({
  children,
  className,
  delay = 0,
  y = 20,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ProjectGallery({
  images,
  title,
  color,
}: {
  images: string[];
  title: string;
  color: string;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    setCurrent(0);
  }, [title]);

  const prev = useCallback(
    () => setCurrent((i) => (i - 1 + images.length) % images.length),
    [images.length]
  );
  const next = useCallback(
    () => setCurrent((i) => (i + 1) % images.length),
    [images.length]
  );

  if (!images.length) return null;

  return (
    <div>
      {/* Main image */}
      <div
        className="relative w-full rounded-xl overflow-hidden"
        style={{ aspectRatio: "16/9", background: "var(--glass-deep)" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <Image
              src={images[current]}
              alt={`${title} — ${current + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 70vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Counter */}
        {images.length > 1 && (
          <div
            className="absolute bottom-3 right-3 text-xs px-2.5 py-1 rounded-full font-semibold tabular-nums"
            style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", color: "#fff" }}
          >
            {current + 1} / {images.length}
          </div>
        )}

        {/* Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)" }}
            >
              <ChevronLeft size={18} className="text-white" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)" }}
            >
              <ChevronRight size={18} className="text-white" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="relative flex-shrink-0 w-16 h-11 rounded-lg overflow-hidden transition-all duration-200"
              style={{
                opacity: i === current ? 1 : 0.4,
                outline: i === current ? `2px solid ${color}` : "2px solid transparent",
                outlineOffset: "2px",
              }}
            >
              <Image src={img} alt="" fill className="object-cover" sizes="64px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectListItem({
  proj,
  color,
  isSelected,
  onClick,
}: {
  proj: any;
  color: string;
  isSelected: boolean;
  onClick: () => void;
}) {
  const category = getProjectCategory(proj.tags);
  const images = getProjectImages(proj);

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-left group relative"
      style={{
        background: isSelected ? "var(--tint-blue)" : "transparent",
        border: `1px solid ${isSelected ? "var(--tint-blue-border)" : "transparent"}`,
      }}
    >
      {/* Active left bar — uses the project's own brand color */}
      {isSelected && (
        <div
          className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full"
          style={{ background: color }}
        />
      )}

      {/* Thumbnail */}
      <div
        className="relative w-[72px] h-[52px] rounded-lg overflow-hidden flex-shrink-0"
        style={{ background: "var(--glass-deep)" }}
      >
        {images[0] && (
          <Image src={images[0]} alt="" fill className="object-cover" sizes="72px" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p
          className="text-[10px] uppercase tracking-[0.18em] font-bold mb-0.5 truncate transition-colors duration-200"
          style={{ color: isSelected ? color : "var(--w25)" }}
        >
          {category}
        </p>
        <p
          className="text-[13px] font-semibold leading-tight mb-1 truncate transition-colors duration-200"
          style={{ color: isSelected ? "var(--white)" : "var(--w85)" }}
        >
          {proj.title}
        </p>
        {proj.keyResult && (
          <p className="text-[11px] font-medium truncate" style={{ color: "var(--green)" }}>
            {proj.keyResult}
          </p>
        )}
      </div>

      <ChevronRight
        size={13}
        className="flex-shrink-0 transition-all duration-200"
        style={{
          color: isSelected ? color : "var(--border-strong)",
          transform: isSelected ? "translateX(1px)" : "none",
        }}
      />
    </button>
  );
}

function ProjectDetail({
  proj,
  color,
}: {
  proj: any;
  color: string;
}) {
  const { t } = useLang();
  const [expanded, setExpanded] = useState(false);

  // Reset expanded state whenever the selected project changes
  useEffect(() => {
    setExpanded(false);
  }, [proj.title]);

  const images = getProjectImages(proj);
  const hasMore = proj.fullDesc && proj.fullDesc !== proj.desc;

  return (
    <motion.div
      key={proj.title}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl p-6 lg:p-8"
      style={{
        background: "var(--glass-card)",
        border: "1px solid var(--glass-card-border)",
        boxShadow: "var(--shadow)",
      }}
    >
      {/* Category badge */}
      <span
        className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black tracking-[0.2em] uppercase mb-4"
        style={{
          color,
          border: "1px solid var(--border)",
          background: "var(--glass)",
        }}
      >
        {getProjectCategory(proj.tags)}
      </span>

      {/* Title */}
      <h2
        className="text-[20px] lg:text-[26px] font-black leading-tight mb-3"
        style={{ color: "var(--white)" }}
      >
        {proj.title}
      </h2>

      {/* Location + year */}
      <div
        className="flex flex-wrap items-center gap-4 mb-5 text-[12px]"
        style={{ color: "var(--w25)" }}
      >
        <span className="flex items-center gap-1.5">
          <MapPin size={11} />
          {proj.location}
        </span>
        {proj.year && (
          <span className="flex items-center gap-1.5">
            <Calendar size={11} />
            {proj.year}
          </span>
        )}
      </div>

      {/* Description — short or full */}
      <p
        className="text-[14px] lg:text-[15px] leading-[1.85] mb-4"
        style={{ color: "var(--w55)" }}
      >
        {expanded ? proj.fullDesc : proj.desc}
      </p>

      {/* Bullet points — shown when expanded */}
      <AnimatePresence>
        {expanded && proj.bullets && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden space-y-2 mb-4"
          >
            {(proj.bullets as string[]).map((b: string, i: number) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className="flex gap-3 items-start text-[13px] leading-relaxed"
                style={{ color: "var(--w55)" }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full mt-[6px] shrink-0"
                  style={{ background: color }}
                />
                {b}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      {/* Read more / show less toggle */}
      {hasMore && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="inline-flex items-center gap-1.5 text-[13px] font-bold mb-6 transition-opacity duration-200 hover:opacity-70"
          style={{ color }}
        >
          {expanded ? t.projects.showLess : t.projects.readMore}
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      )}

      {/* Image gallery */}
      <div className={hasMore ? "" : "mt-2"}>
        <ProjectGallery images={images} title={proj.title} color={color} />
      </div>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-2 mt-5">
        {(proj.tags as string[]).map((tag, i) => (
          <span
            key={i}
            className="text-[11px] px-3 py-1.5 rounded-full font-medium"
            style={{
              background: "var(--glass)",
              border: "1px solid var(--border)",
              color: "var(--w55)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function ProjectsPage() {
  const { t } = useLang();
  const p = t.projects;
  const { dark } = useTheme();

  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [selectedTitle, setSelectedTitle] = useState<string>(
    () => ((p.items as any[]).length > 0 ? (p.items as any[])[0].title : "")
  );

  const filtered = useMemo(
    () =>
      activeFilter === "All"
        ? (p.items as any[])
        : (p.items as any[]).filter((proj) =>
            getCategories(proj.tags).includes(activeFilter)
          ),
    [activeFilter, p.items]
  );

  // Auto-select first item when filter changes
  useEffect(() => {
    if (filtered.length > 0) setSelectedTitle(filtered[0].title);
  }, [activeFilter]); // eslint-disable-line react-hooks/exhaustive-deps

  const selected =
    filtered.find((proj) => proj.title === selectedTitle) ??
    filtered[0] ??
    null;
  const selectedColor = selected ? (colorMap[selected.color] ?? "var(--blue)") : "var(--blue)";

  const handleFilterChange = useCallback((cat: string) => {
    setActiveFilter(cat);
  }, []);

  return (
    <>
      {/* HERO */}
      <section
        className="relative overflow-hidden hero-bg"
        style={{ padding: "32px 0 100px" }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="aurora" />
          <div
            className="blob blob-blue w-[600px] h-[600px] animate-blob"
            style={{ right: -180, top: -120 }}
          />
          <div
            className="blob blob-cyan w-[420px] h-[420px] animate-blob"
            style={{ left: -120, bottom: 40, animationDelay: "-4s" }}
          />
          <div className="absolute inset-0 dot-grid opacity-30" />
        </div>

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <Image
            src="/images/backgrounds/servers.jpg"
            alt=""
            fill
            className="hero-server-img object-cover object-center"
            style={{
              opacity: dark ? 0.1 : 0.4,
              filter: "blur(1px) grayscale(15%)",
            }}
            priority
          />
          <div
            className="hero-server-bg absolute inset-0"
            style={{
              background: dark
                ? "linear-gradient(180deg, rgba(28,78,138,0.25) 0%, rgba(15,17,21,0.92) 100%)"
                : "linear-gradient(180deg, rgba(28,78,138,0.06) 0%, rgba(236,237,241,0.96) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-[1360px] mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center text-[11px] font-bold tracking-[0.2em] uppercase py-4 mb-16"
            style={{ color: "var(--w25)", borderBottom: "1px solid var(--border)" }}
          />

          <div className="max-w-2xl">
            <FadeIn delay={0.1}>
              <h1 className="headline-xl mb-8 bg-gradient-to-r from-white via-blue-50 to-cyan-50 bg-clip-text text-transparent">
                Real projects,
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  real results.
                </span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p
                className="text-[16px] lg:text-[18px] leading-[1.8]"
                style={{ color: "var(--w55)" }}
              >
                {p.sub}
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* PROJECTS — SPLIT VIEW */}
      <section className="section-deep" style={{ padding: "80px 0 120px" }}>
        <div className="relative z-10 max-w-[1360px] mx-auto px-6 lg:px-10">

          {/* Section eyebrow only — no extra heading */}
          <FadeIn className="mb-8">
            <p
              className="text-[11px] font-bold tracking-[0.25em] uppercase"
              style={{ color: "var(--blue)" }}
            >
              Explore Our Projects
            </p>
          </FadeIn>

          {/* Filter bar — segmented control */}
          <FadeIn delay={0.06} className="mb-8">
            <div className="overflow-x-auto -mx-1 px-1 pb-1">
              <div
                className="inline-flex p-1.5 rounded-2xl gap-1 min-w-max"
                style={{
                  background: "var(--glass)",
                  border: "1px solid var(--glass-border)",
                }}
              >
                {CATEGORIES.map((cat) => {
                  const active = activeFilter === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => handleFilterChange(cat)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-[12px] font-semibold whitespace-nowrap transition-all duration-200"
                      style={{
                        background: active ? "var(--blue)" : "transparent",
                        color: active ? "#fff" : "var(--w55)",
                        boxShadow: active ? "var(--shadow-blue-lg)" : "none",
                      }}
                    >
                      <span style={{ opacity: active ? 1 : 0.6 }}>
                        {CATEGORY_ICONS[cat]}
                      </span>
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>
          </FadeIn>

          {/* Split view */}
          <FadeIn delay={0.12}>
            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 lg:gap-5 items-start">

              {/* LEFT — project list */}
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  background: "var(--glass-card)",
                  border: "1px solid var(--glass-card-border)",
                  boxShadow: "var(--shadow)",
                }}
              >
                <div
                  className="px-4 py-3 border-b"
                  style={{ borderColor: "var(--border)" }}
                >
                  <p
                    className="text-[10px] uppercase tracking-[0.18em] font-bold"
                    style={{ color: "var(--w25)" }}
                  >
                    {filtered.length} Project{filtered.length !== 1 ? "s" : ""}
                  </p>
                </div>

                <div className="p-2 space-y-0.5 overflow-y-auto lg:max-h-[600px]">
                  {filtered.map((proj: any) => (
                    <ProjectListItem
                      key={proj.title}
                      proj={proj}
                      color={colorMap[proj.color] ?? "var(--blue)"}
                      isSelected={proj.title === selected?.title}
                      onClick={() => setSelectedTitle(proj.title)}
                    />
                  ))}
                  {filtered.length === 0 && (
                    <div
                      className="flex items-center justify-center h-32 text-sm"
                      style={{ color: "var(--w25)" }}
                    >
                      No projects in this category.
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT — project detail */}
              <div>
                <AnimatePresence mode="wait">
                  {selected ? (
                    <ProjectDetail
                      key={selected.title}
                      proj={selected}
                      color={selectedColor}
                    />
                  ) : (
                    <div
                      className="rounded-2xl flex items-center justify-center min-h-[420px]"
                      style={{
                        background: "var(--glass-card)",
                        border: "1px solid var(--glass-card-border)",
                      }}
                    >
                      <p className="text-sm" style={{ color: "var(--w25)" }}>
                        Select a project
                      </p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </FadeIn>

          {/* CTA */}
          <FadeIn delay={0.18} className="text-center mt-16">
            <Link href="/contact">
              <Button size="lg">{p.cta}</Button>
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
