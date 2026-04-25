"use client";
import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useLang } from "@/lib/language-context";
import { useTheme } from "@/lib/theme-context";
import {
  MapPin, ChevronLeft, ChevronRight,
  LayoutGrid, ArrowLeftRight, Server, Headphones, Network, Leaf,
  Calendar,
} from "lucide-react";

const colorMap: Record<string, string> = {
  blue: "#3b82f6",
  green: "#10b981",
  amber: "#f59e0b",
  cyan: "#06b6d4",
  purple: "#8b5cf6",
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
        style={{ aspectRatio: "16/9", background: "rgba(0,0,0,0.3)" }}
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

        {/* Image counter — only when multiple */}
        {images.length > 1 && (
          <div
            className="absolute bottom-3 right-3 text-xs px-2.5 py-1 rounded-full font-semibold tabular-nums"
            style={{
              background: "rgba(0,0,0,0.65)",
              backdropFilter: "blur(8px)",
              color: "#fff",
            }}
          >
            {current + 1} / {images.length}
          </div>
        )}

        {/* Arrows — only when multiple */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{
                background: "rgba(0,0,0,0.55)",
                backdropFilter: "blur(8px)",
              }}
            >
              <ChevronLeft size={18} className="text-white" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{
                background: "rgba(0,0,0,0.55)",
                backdropFilter: "blur(8px)",
              }}
            >
              <ChevronRight size={18} className="text-white" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail strip — only when multiple */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="relative flex-shrink-0 w-16 h-11 rounded-lg overflow-hidden transition-all duration-200"
              style={{
                opacity: i === current ? 1 : 0.38,
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
        background: isSelected ? `${color}10` : "transparent",
        border: `1px solid ${isSelected ? `${color}28` : "transparent"}`,
      }}
    >
      {/* Active bar */}
      {isSelected && (
        <div
          className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full"
          style={{ background: color }}
        />
      )}

      {/* Thumbnail */}
      <div
        className="relative w-[72px] h-[52px] rounded-lg overflow-hidden flex-shrink-0"
        style={{ background: "rgba(255,255,255,0.04)" }}
      >
        {images[0] && (
          <Image src={images[0]} alt="" fill className="object-cover" sizes="72px" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p
          className="text-[10px] uppercase tracking-[0.18em] font-bold mb-0.5 truncate"
          style={{ color: isSelected ? color : "rgba(255,255,255,0.28)" }}
        >
          {category}
        </p>
        <p
          className="text-[13px] font-semibold leading-tight mb-1 truncate transition-colors duration-200"
          style={{ color: isSelected ? "#fff" : "rgba(255,255,255,0.65)" }}
        >
          {proj.title}
        </p>
        {proj.keyResult && (
          <p
            className="text-[11px] font-medium truncate"
            style={{ color: "#10b981" }}
          >
            {proj.keyResult}
          </p>
        )}
      </div>

      <ChevronRight
        size={13}
        className="flex-shrink-0 transition-all duration-200"
        style={{
          color: isSelected ? color : "rgba(255,255,255,0.14)",
          transform: isSelected ? "translateX(1px)" : "none",
        }}
      />
    </button>
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
  const selectedColor = selected
    ? (colorMap[selected.color] ?? "#3b82f6")
    : "#3b82f6";
  const selectedImages = selected ? getProjectImages(selected) : [];

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
      <section style={{ background: "#070c18", padding: "80px 0 120px" }}>
        <div className="max-w-[1360px] mx-auto px-6 lg:px-10">

          {/* Section heading */}
          <FadeIn className="mb-10">
            <p
              className="text-[11px] font-bold tracking-[0.25em] uppercase mb-3"
              style={{ color: "#3b82f6" }}
            >
              Explore Our Projects
            </p>
            <h2 className="text-[26px] lg:text-[34px] font-black text-white leading-tight">
              Engineering work,{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                delivered on the ground.
              </span>
            </h2>
          </FadeIn>

          {/* Filter bar — segmented control */}
          <FadeIn delay={0.08} className="mb-8">
            <div className="overflow-x-auto -mx-1 px-1 pb-1">
              <div
                className="inline-flex p-1.5 rounded-2xl gap-1 min-w-max"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
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
                        background: active
                          ? "linear-gradient(135deg, #1d4ed8, #0284c7)"
                          : "transparent",
                        color: active ? "#fff" : "rgba(255,255,255,0.38)",
                        boxShadow: active
                          ? "0 2px 18px rgba(29,78,216,0.45)"
                          : "none",
                      }}
                    >
                      <span style={{ opacity: active ? 1 : 0.5 }}>
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
          <FadeIn delay={0.14}>
            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 lg:gap-5 items-start">

              {/* LEFT — project list */}
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.022)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div
                  className="px-4 py-3 border-b"
                  style={{ borderColor: "rgba(255,255,255,0.055)" }}
                >
                  <p
                    className="text-[10px] uppercase tracking-[0.18em] font-bold"
                    style={{ color: "rgba(255,255,255,0.2)" }}
                  >
                    {filtered.length} Project{filtered.length !== 1 ? "s" : ""}
                  </p>
                </div>

                <div className="p-2 space-y-0.5 overflow-y-auto lg:max-h-[600px]">
                  {filtered.map((proj: any) => (
                    <ProjectListItem
                      key={proj.title}
                      proj={proj}
                      color={colorMap[proj.color] ?? "#3b82f6"}
                      isSelected={proj.title === selected?.title}
                      onClick={() => setSelectedTitle(proj.title)}
                    />
                  ))}
                  {filtered.length === 0 && (
                    <div
                      className="flex items-center justify-center h-32 text-sm"
                      style={{ color: "rgba(255,255,255,0.2)" }}
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
                    <motion.div
                      key={selected.title}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                      className="rounded-2xl p-6 lg:p-8"
                      style={{
                        background: "rgba(255,255,255,0.022)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      {/* Category badge */}
                      <span
                        className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black tracking-[0.2em] uppercase mb-4"
                        style={{
                          background: `${selectedColor}18`,
                          color: selectedColor,
                          border: `1px solid ${selectedColor}2e`,
                        }}
                      >
                        {getProjectCategory(selected.tags)}
                      </span>

                      {/* Title */}
                      <h2 className="text-[20px] lg:text-[26px] font-black text-white leading-tight mb-3">
                        {selected.title}
                      </h2>

                      {/* Location + year */}
                      <div
                        className="flex flex-wrap items-center gap-4 mb-4 text-[12px]"
                        style={{ color: "rgba(255,255,255,0.32)" }}
                      >
                        <span className="flex items-center gap-1.5">
                          <MapPin size={11} />
                          {selected.location}
                        </span>
                        {selected.year && (
                          <span className="flex items-center gap-1.5">
                            <Calendar size={11} />
                            {selected.year}
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      <p
                        className="text-[14px] lg:text-[15px] leading-[1.8] mb-6"
                        style={{ color: "rgba(255,255,255,0.48)" }}
                      >
                        {selected.desc}
                      </p>

                      {/* Image gallery */}
                      <div className="mb-6">
                        <ProjectGallery
                          images={selectedImages}
                          title={selected.title}
                          color={selectedColor}
                        />
                      </div>

                      {/* Tech tags */}
                      <div className="flex flex-wrap gap-2">
                        {(selected.tags as string[]).map((tag, i) => (
                          <span
                            key={i}
                            className="text-[11px] px-3 py-1.5 rounded-full font-medium"
                            style={{
                              background: "rgba(255,255,255,0.055)",
                              border: "1px solid rgba(255,255,255,0.09)",
                              color: "rgba(255,255,255,0.5)",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <div
                      className="rounded-2xl flex items-center justify-center min-h-[420px]"
                      style={{
                        background: "rgba(255,255,255,0.018)",
                        border: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      <p
                        className="text-sm"
                        style={{ color: "rgba(255,255,255,0.18)" }}
                      >
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
