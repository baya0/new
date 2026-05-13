"use client";
import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useLang } from "@/lib/language-context";
import { useTheme } from "@/lib/theme-context";
import {
  MapPin, ChevronRight, ChevronDown,
  LayoutGrid, ArrowLeftRight, Server, Headphones, Network, Leaf,
  Calendar,
} from "lucide-react";

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

// Translate an English category key into the user's language.
// Falls back to the English key (handles the "General" fallback from getProjectCategory).
function categoryLabel(key: string, cats: Record<string, string>): string {
  return cats[key.toLowerCase()] ?? key;
}

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
  y = 16,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
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
  const { t } = useLang();
  const category = getProjectCategory(proj.tags);
  const images = getProjectImages(proj);

  return (
    <button
      onClick={onClick}
      className="w-full flex items-start gap-3 p-3 rounded-xl transition-all duration-200 text-left group relative"
      style={{
        background: isSelected ? "var(--tint-blue)" : "transparent",
        border: `1px solid ${isSelected ? "var(--tint-blue-border)" : "transparent"}`,
      }}
    >
      {/* Active left bar */}
      {isSelected && (
        <div
          className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full"
          style={{ background: color }}
        />
      )}

      {/* Thumbnail */}
      <div
        className="relative w-[76px] h-[56px] rounded-lg overflow-hidden flex-shrink-0 mt-0.5"
        style={{ background: "var(--glass-deep)" }}
      >
        {images[0] && (
          <Image src={images[0]} alt="" fill className="object-cover" sizes="76px" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p
          className="text-[10px] uppercase tracking-[0.18em] font-bold mb-1 transition-colors duration-200"
          style={{ color: isSelected ? color : "var(--w25)" }}
        >
          {categoryLabel(category, t.projects.categories)}
        </p>
        {/* Two lines max — no hard truncation */}
        <p
          className="text-[13px] font-semibold leading-snug mb-1 transition-colors duration-200"
          style={{
            color: isSelected ? "var(--white)" : "var(--w85)",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {proj.title}
        </p>
        {proj.keyResult && (
          <p className="text-[11px] font-medium" style={{ color: "var(--green)" }}>
            {proj.keyResult}
          </p>
        )}
      </div>

      <ChevronRight
        size={13}
        className="flex-shrink-0 mt-1 transition-all duration-200"
        style={{
          color: isSelected ? color : "var(--border-strong)",
          transform: isSelected ? "translateX(1px)" : "none",
        }}
      />
    </button>
  );
}

function ProjectDetail({ proj, color }: { proj: any; color: string }) {
  const { t } = useLang();
  const [expanded, setExpanded] = useState(false);
  const expandedRef = useRef<HTMLDivElement>(null);

  // Reset expansion when the user switches projects
  useEffect(() => { setExpanded(false); }, [proj.title]);

  const images = getProjectImages(proj);
  const hero = images[0];
  const hasFullDesc = proj.fullDesc && proj.fullDesc !== proj.desc;
  const hasBullets = Array.isArray(proj.bullets) && proj.bullets.length > 0;
  const visibleTags = expanded
    ? (proj.tags as string[] | undefined) ?? []
    : ((proj.tags as string[] | undefined) ?? []).slice(0, 5);

  const handleToggle = useCallback(() => {
    setExpanded((prev) => {
      const next = !prev;
      // When opening, wait for the height animation to settle, then bring
      // the new content into the user's viewport. Skip on collapse so the
      // user keeps their position.
      if (next) {
        requestAnimationFrame(() => {
          setTimeout(() => {
            expandedRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }, 320);
        });
      }
      return next;
    });
  }, []);

  return (
    <motion.div
      key={proj.title}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="projects-detail-card rounded-2xl p-6 lg:p-7 w-full flex flex-col"
      style={{
        background: "var(--glass-card)",
        border: "1px solid var(--glass-card-border)",
        boxShadow: "var(--shadow)",
      }}
    >
      {/* Category badge */}
      <span
        className="self-start inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black tracking-[0.2em] uppercase mb-3"
        style={{ color, border: "1px solid var(--border)", background: "var(--glass)" }}
      >
        {categoryLabel(getProjectCategory(proj.tags), t.projects.categories)}
      </span>

      <h2
        className="text-[19px] lg:text-[24px] font-black leading-tight mb-2"
        style={{ color: "var(--white)" }}
      >
        {proj.title}
      </h2>

      <div
        className="flex flex-wrap items-center gap-4 mb-4 text-[12px]"
        style={{ color: "var(--w25)" }}
      >
        {proj.location && (
          <span className="flex items-center gap-1.5"><MapPin size={11} />{proj.location}</span>
        )}
        {proj.year && (
          <span className="flex items-center gap-1.5"><Calendar size={11} />{proj.year}</span>
        )}
      </div>

      {/* Short teaser description — clamped when collapsed, full when expanded */}
      <p
        className="text-[14px] leading-[1.85] mb-5"
        style={
          expanded
            ? { color: "var(--w55)" }
            : {
                color: "var(--w55)",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }
        }
      >
        {proj.desc}
      </p>

      {/* Single hero image — fixed compact height so the card stays balanced */}
      {hero && (
        <div
          className="relative w-full rounded-xl overflow-hidden mb-5"
          style={{
            height: "clamp(180px, 28vh, 280px)",
            background: "var(--glass-deep)",
          }}
        >
          <Image
            src={hero}
            alt={proj.title}
            fill
            className="object-cover"
            style={{ objectPosition: "center 30%" }}
            sizes="(max-width: 1024px) 100vw, 70vw"
          />
        </div>
      )}

      {/* ─── Expanded content: full description, bullets ─── */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="expanded"
            ref={expandedRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
            style={{ scrollMarginTop: 96 }}
          >
            <div className="pb-2">
              {/* Overview eyebrow */}
              <p
                className="text-[10px] font-bold tracking-[0.25em] uppercase mb-2"
                style={{ color }}
              >
                {t.projects.overview}
              </p>

              {hasFullDesc && proj.fullDesc.split("\n\n").map((para: string, i: number) => (
                <p
                  key={i}
                  className="text-[14px] leading-[1.85] mb-3"
                  style={{ color: "var(--w55)" }}
                >
                  {para}
                </p>
              ))}

              {hasBullets && (
                <>
                  <div className="mt-5 mb-3 flex items-center gap-3">
                    <span className="h-px flex-1" style={{ background: "var(--border)" }} />
                    <p
                      className="text-[10px] font-bold tracking-[0.25em] uppercase"
                      style={{ color }}
                    >
                      {t.projects.whatWeDid}
                    </p>
                    <span className="h-px flex-1" style={{ background: "var(--border)" }} />
                  </div>
                  <ul className="space-y-2 mb-5">
                    {(proj.bullets as string[]).map((b, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04, duration: 0.35 }}
                        className="flex gap-3 items-start p-2.5 rounded-lg text-[13px] leading-relaxed"
                        style={{
                          background: "var(--glass)",
                          border: "1px solid var(--border)",
                          color: "var(--w55)",
                        }}
                      >
                        <span
                          className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5"
                          style={{
                            background: `${color}15`,
                            color,
                            border: `1px solid ${color}25`,
                          }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="flex-1">{b}</span>
                      </motion.li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tech tags — first 5 collapsed, all when expanded */}
      {visibleTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          {visibleTags.map((tag, i) => (
            <span
              key={i}
              className="text-[11px] px-3 py-1.5 rounded-full font-medium"
              style={{ background: "var(--glass)", border: "1px solid var(--border)", color: "var(--w55)" }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* ─── Big, catchy expand toggle pinned to the bottom ─── */}
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={expanded}
        className="mt-auto group relative w-full flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-xl text-[14px] font-bold tracking-wide transition-all duration-200 hover:gap-3 hover:-translate-y-0.5 active:translate-y-0"
        style={{
          background: `linear-gradient(135deg, ${color}1A, ${color}0D)`,
          border: `1.5px solid ${color}55`,
          color,
          boxShadow: `0 4px 14px -6px ${color}40`,
        }}
      >
        {expanded ? t.projects.showLess : t.projects.showFullDetails}
        <ChevronDown
          size={16}
          className="transition-transform duration-300"
          style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
    </motion.div>
  );
}

export default function ProjectsClient({ items }: { items: any[] }) {
  const { t } = useLang();
  const p = t.projects;
  const { dark } = useTheme();

  const [activeFilter, setActiveFilter] = useState<string>("All");

  const [selectedTitle, setSelectedTitle] = useState<string>(
    () => (items.length > 0 ? items[0].title : "")
  );

  const filtered = useMemo(
    () =>
      activeFilter === "All"
        ? items
        : items.filter((proj) => getCategories(proj.tags).includes(activeFilter)),
    [activeFilter, items]
  );

  useEffect(() => {
    if (filtered.length > 0) setSelectedTitle(filtered[0].title);
  }, [activeFilter]); // eslint-disable-line react-hooks/exhaustive-deps

  const selected = filtered.find((proj) => proj.title === selectedTitle) ?? filtered[0] ?? null;
  const selectedColor = selected ? (colorMap[selected.color] ?? "var(--blue)") : "var(--blue)";

  const handleFilterChange = useCallback((cat: string) => setActiveFilter(cat), []);

  return (
    <>
      {/*
        UNIFIED SECTION — hero heading + projects split-view in one continuous block.
        The server room image fades out by ~55% height so the split view cards
        sit cleanly on the section background.
      */}
      <section
        className="relative section-deep overflow-hidden"
        style={{ padding: "56px 0 96px" }}
      >
        {/* Server room image — fades out before the split view starts */}
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src="/images/backgrounds/back1.jpg"
            alt=""
            fill
            className="object-cover object-top"
            style={{
              opacity: dark ? 0.16 : 0.08,
              filter: "blur(1px) grayscale(15%)",
            }}
            priority
          />
          {/* Gradient: transparent at top → solid section bg at ~55% */}
          <div
            className="absolute inset-0"
            style={{
              background: dark
                ? "linear-gradient(180deg, rgba(17,28,42,0) 0%, rgba(17,28,42,0.55) 28%, var(--glass-deep) 52%)"
                : "linear-gradient(180deg, rgba(227,228,234,0) 0%, rgba(227,228,234,0.6) 28%, var(--glass-deep) 52%)",
            }}
          />
        </div>

        {/* Ambient decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="aurora" />
          <div
            className="blob blob-blue w-[500px] h-[500px] animate-blob"
            style={{ right: -160, top: -100 }}
          />
          <div
            className="blob blob-cyan w-[360px] h-[360px] animate-blob"
            style={{ left: -100, top: 60, animationDelay: "-4s" }}
          />
          <div className="absolute inset-0 dot-grid opacity-20" />
        </div>

        <div className="relative z-10 max-w-[1360px] mx-auto px-6 lg:px-10">

          {/* ── COMPACT HEADER ── */}
          <FadeIn className="mb-8">
            <p
              className="text-[11px] font-bold tracking-[0.25em] uppercase mb-3"
              style={{ color: "var(--blue)" }}
            >
              {p.eyebrow}
            </p>
            <h1
              className="font-black leading-tight mb-3"
              style={{ fontSize: "clamp(28px, 4vw, 48px)", color: "var(--white)" }}
            >
              {p.h1Lead}{" "}
              <span style={{ color: "var(--blue)" }}>{p.h1Highlight}</span>
            </h1>
            <p
              className="text-[15px] leading-relaxed max-w-xl"
              style={{ color: "var(--w55)" }}
            >
              {p.sub}
            </p>
          </FadeIn>

          {/* ── FILTER BAR — underline tabs, distinct from the pill-style navbar ── */}
          <FadeIn delay={0.07} className="mb-6">
            <div className="overflow-x-auto -mx-1 px-1">
              <div
                className="inline-flex min-w-max border-b"
                style={{ borderColor: "var(--border)" }}
              >
                {CATEGORIES.map((cat) => {
                  const active = activeFilter === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => handleFilterChange(cat)}
                      className="relative flex items-center gap-1.5 px-4 py-2.5 text-[12px] font-semibold whitespace-nowrap transition-colors duration-200"
                      style={{ color: active ? "var(--blue)" : "var(--w55)" }}
                    >
                      <span style={{ opacity: active ? 1 : 0.5 }}>{CATEGORY_ICONS[cat]}</span>
                      {categoryLabel(cat, p.categories)}
                      {active && (
                        <motion.span
                          layoutId="tab-underline"
                          className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                          style={{ background: "var(--blue)" }}
                          transition={{ type: "spring", stiffness: 400, damping: 32 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </FadeIn>

          {/* ── SPLIT VIEW ── */}
          <FadeIn delay={0.13}>
            {/*
              items-start: panels keep their natural heights. The LEFT list is
              capped (see .projects-list-panel in globals.css) and made sticky
              so it follows the user down the page. The RIGHT card grows with
              its content — when "Show full details" is clicked, the page
              scrolls instead of the card.
            */}
            <div className="projects-split grid grid-cols-1 lg:grid-cols-[310px_1fr] gap-4 lg:gap-5 items-start">

              {/* LEFT — bounded height; list scrolls internally so the page never grows */}
              <div
                className="projects-list-panel rounded-2xl overflow-hidden relative flex flex-col h-[460px]"
                style={{
                  background: "var(--glass-card)",
                  border: "1px solid var(--glass-card-border)",
                  boxShadow: "var(--shadow)",
                }}
              >
                {/* Panel header — fixed, never scrolls */}
                <div
                  className="px-4 py-3 border-b flex-shrink-0"
                  style={{ borderColor: "var(--border)" }}
                >
                  <span
                    className="text-[10px] uppercase tracking-[0.18em] font-bold"
                    style={{ color: "var(--w25)" }}
                  >
                    {filtered.length} {filtered.length === 1 ? p.countOne : p.countMany}
                  </span>
                </div>

                {/* List fills remaining sidebar height, scrolls when overflow */}
                <div className="flex-1 min-h-0 relative">
                  <div
                    className="absolute bottom-0 left-0 right-0 h-10 z-10 pointer-events-none rounded-b-2xl"
                    style={{ background: "linear-gradient(to bottom, transparent, var(--glass-card))" }}
                  />
                  <div className="h-full overflow-y-auto p-2 space-y-0.5">
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
                        {p.emptyCategory}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* RIGHT — natural height; grows with content so the page scrolls */}
              <div className="projects-detail-cell">
                <AnimatePresence mode="wait">
                  {selected ? (
                    <ProjectDetail
                      key={selected.title}
                      proj={selected}
                      color={selectedColor}
                    />
                  ) : (
                    <div
                      className="projects-detail-card rounded-2xl flex items-center justify-center w-full h-[460px]"
                      style={{
                        background: "var(--glass-card)",
                        border: "1px solid var(--glass-card-border)",
                      }}
                    >
                      <p className="text-sm" style={{ color: "var(--w25)" }}>{p.emptyDetail}</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </FadeIn>

          {/* ── CTA ── */}
          <FadeIn delay={0.18} className="text-center mt-14">
            <Link href="/contact">
              <Button size="lg">{p.cta}</Button>
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
