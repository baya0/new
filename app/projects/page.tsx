"use client";
import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useLang } from "@/lib/language-context";
import { useTheme } from "@/lib/theme-context";
import { MapPin, ChevronDown, ChevronUp, ArrowRight, X, ChevronLeft, ChevronRight } from "lucide-react";

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

const BATCH_SIZE = 6;

// Image Carousel Component
function ImageCarousel({ images, title, color }: { images: string[]; title: string; color: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    if (!isHovered && images.length > 1) {
      const interval = setInterval(nextImage, 3000);
      return () => clearInterval(interval);
    }
  }, [isHovered, images.length]);

  if (images.length === 0) return null;

  return (
    <div 
      className="relative w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-full overflow-hidden">
        {images.map((img, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0, x: 100 }}
            animate={{ 
              opacity: index === currentIndex ? 1 : 0,
              x: index === currentIndex ? 0 : (index < currentIndex ? -100 : 100)
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={img}
              alt={`${title} - Image ${index + 1}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </motion.div>
        ))}
      </div>

      {/* Carousel Controls */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-black/70 hover:scale-110 opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft size={16} className="text-white" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-black/70 hover:scale-110 opacity-0 group-hover:opacity-100"
          >
            <ChevronRight size={16} className="text-white" />
          </button>

          {/* Image Indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? `w-6` : 'bg-white/50'
                }`}
                style={{ backgroundColor: index === currentIndex ? color : 'rgba(255,255,255,0.3)' }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function ProjectCard({ proj, color, onClick, isSelected }: { proj: any; color: string; onClick: () => void; isSelected: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  // Handle multiple images - use array if available, otherwise single image
  const projectImages = proj.images ? (Array.isArray(proj.images) ? proj.images : [proj.images]) : (proj.image ? [proj.image] : []);

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 50, scale: 0.94 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className="group cursor-pointer relative flex flex-col h-full transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
      style={{
        background: "linear-gradient(135deg, var(--glass-card), rgba(255,255,255,0.02))",
        border: isSelected ? `2px solid ${color}` : "1px solid var(--glass-card-border)",
        borderRadius: 24,
        overflow: "hidden",
        boxShadow: isSelected 
          ? `0 12px 48px ${color}25, 0 0 0 1px ${color}15` 
          : "0 8px 32px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,255,255,0.05)",
      }}
    >
      {/* Image area */}
      <div
        className="relative h-[240px] sm:h-[260px] overflow-hidden flex items-center justify-center"
        style={{ 
          background: `linear-gradient(135deg, ${color}18, ${color}08, transparent)`,
          borderBottom: `1px solid ${color}20`
        }}
      >
        <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />

        {projectImages.length > 0 ? (
          <ImageCarousel images={projectImages} title={proj.title} color={color} />
        ) : (
          <>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                className="rounded-full border"
                style={{ width: 140, height: 140, borderColor: `${color}12` }}
                animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.1, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <motion.span
              className="text-6xl sm:text-7xl relative z-10"
              whileHover={{ scale: 1.15, rotate: -5 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {proj.icon}
            </motion.span>
          </>
        )}

        {/* Enhanced Hover overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `linear-gradient(to top, ${color}40, transparent 60%)` }}
        />
      </div>

      {/* Content */}
      <div className="p-6 sm:p-7 flex flex-col flex-1">
        <div className="flex flex-wrap gap-2 mb-4">
          {proj.tags.map((tag: string, j: number) => (
            <span
              key={j}
              className="text-[11px] font-black tracking-widest uppercase px-4 py-2 rounded-full transition-all duration-300 hover:scale-105"
              style={{
                color: j === 0 ? color : "var(--w55)",
                background: j === 0 ? `linear-gradient(135deg, ${color}15, ${color}08)` : "rgba(255,255,255,0.03)",
                border: j === 0 ? `1px solid ${color}30` : "1px solid var(--border)",
                boxShadow: j === 0 ? `0 2px 8px ${color}20` : "none",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-[20px] sm:text-[22px] font-black leading-tight tracking-tight mb-4 group-hover:text-white transition-colors duration-300" style={{ color: "var(--white)" }}>
          {proj.title}
        </h3>

        <div className="flex items-center gap-2 text-[12px] mb-3" style={{ color: "var(--w25)" }}>
          <MapPin size={12} />
          <span>{proj.location}</span>
        </div>

        <p className="text-[15px] sm:text-[16px] leading-[1.7] flex-1 font-medium" style={{ color: "var(--w65)" }}>
          {proj.desc}
        </p>

        <div
          className="mt-6 inline-flex items-center gap-2 text-[14px] font-black tracking-wide transition-all duration-300 group-hover:gap-3 group-hover:scale-105"
          style={{ 
            color,
            textShadow: `0 0 20px ${color}40`
          }}
        >
          <span>View Details</span>
          <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>

      {/* Enhanced Bottom accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0 group-hover:h-[3px] transition-all duration-500"
        style={{ background: `linear-gradient(90deg, ${color}, ${color}40, transparent)` }}
      />
    </motion.div>
  );
}

function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
        style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}
      >
        <X size={20} />
      </button>
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <Image src={src} alt={alt} fill className="object-contain" sizes="100vw" />
      </motion.div>
    </motion.div>
  );
}

function DetailPanel({ proj, color, onClose, onImageClick }: { proj: any; color: string; onClose: () => void; onImageClick?: (src: string, alt: string) => void }) {
  const { t } = useLang();
  const [expanded, setExpanded] = useState(false);

  useEffect(() => { setExpanded(false); }, [proj.title]);

  // Handle multiple images in detail panel
  const projectImages = proj.images ? (Array.isArray(proj.images) ? proj.images : [proj.images]) : (proj.image ? [proj.image] : []);

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
          className="relative min-h-[280px] lg:min-h-[400px] overflow-hidden flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${color}14, ${color}06, var(--glass-card))` }}
        >
          <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />

          {projectImages.length > 0 ? (
            <div className="relative w-full h-full">
              {projectImages.length === 1 ? (
                <Image
                  src={projectImages[0]}
                  alt={proj.title}
                  fill
                  className="object-cover cursor-zoom-in hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  onClick={() => onImageClick?.(projectImages[0], proj.title)}
                />
              ) : (
                <ImageCarousel images={projectImages} title={proj.title} color={color} />
              )}
            </div>
          ) : (
            <>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                  className="rounded-full border"
                  style={{ width: 200, height: 200, borderColor: `${color}15` }}
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
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
            </>
          )}
        </div>

        {/* Right — content */}
        <div className="p-8 lg:p-10 flex flex-col justify-center">
          <div className="flex flex-wrap gap-2 mb-5">
            {proj.tags.map((tag: string, j: number) => (
              <span
                key={j}
                className="text-[11px] font-black tracking-widest uppercase px-4 py-2 rounded-full transition-all duration-300 hover:scale-105"
                style={{
                  color: j === 0 ? color : "var(--w55)",
                  background: j === 0 ? `linear-gradient(135deg, ${color}15, ${color}08)` : "rgba(255,255,255,0.03)",
                  border: j === 0 ? `1px solid ${color}30` : "1px solid var(--border)",
                  boxShadow: j === 0 ? `0 2px 8px ${color}20` : "none",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <h2 className="text-[24px] lg:text-[28px] font-black leading-tight tracking-tight mb-4" style={{ color: "var(--white)" }}>
            {proj.title}
          </h2>

          <div className="flex items-center gap-2 text-[13px] mb-5" style={{ color: "var(--w25)" }}>
            <MapPin size={13} />
            <span>{proj.location}</span>
          </div>

          <p className="text-[15px] lg:text-[16px] leading-[1.85] mb-5 font-medium" style={{ color: "var(--w65)" }}>
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
                    className="flex gap-3 items-start text-[14px] leading-relaxed font-medium"
                    style={{ color: "var(--w65)" }}
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
                className="inline-flex items-center gap-2 text-[14px] font-black tracking-wide transition-colors duration-200 hover:opacity-80 transform hover:scale-105"
                style={{ color }}
              >
                {expanded ? t.projects.showLess : t.projects.readMore}
                {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            )}

            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 text-[13px] font-bold transition-all duration-200 hover:opacity-70 transform hover:scale-105"
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

function LoadTrigger({ onVisible }: { onVisible: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "200px" });

  useEffect(() => {
    if (inView) onVisible();
  }, [inView, onVisible]);

  return <div ref={ref} className="h-1" />;
}

export default function ProjectsPage() {
  const { t } = useLang();
  const p = t.projects;
  const { dark } = useTheme();
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() =>
    activeFilter === "All"
      ? p.items
      : p.items.filter((proj: any) => getCategories(proj.tags).includes(activeFilter)),
    [activeFilter, p.items]
  );

  const visibleItems = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;
  const selected = selectedTitle ? filtered.find((proj: any) => proj.title === selectedTitle) : null;
  const selectedColor = selected ? (colorMap[selected.color] ?? "var(--blue)") : "var(--blue)";

  const handleFilterChange = useCallback((cat: string) => {
    setActiveFilter(cat);
    setVisibleCount(BATCH_SIZE);
    setSelectedTitle(null);
  }, []);

  const loadMore = useCallback(() => {
    setVisibleCount(prev => Math.min(prev + BATCH_SIZE, filtered.length));
  }, [filtered.length]);

  const handleCardClick = useCallback((title: string) => {
    setSelectedTitle(prev => prev === title ? null : title);
    setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 100);
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


        {/* Server room background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <Image
            src="/images/backgrounds/servers.jpg"
            alt=""
            fill
            className="hero-server-img object-cover object-center"
            style={{ 
              opacity: dark ? 0.10 : 0.40, 
              filter: "blur(1px) grayscale(15%)" 
            }}
            priority
          />
          {/* Gradient veil keeps text readable and unifies with brand palette */}
          <div className="hero-server-bg absolute inset-0" style={{ 
            background: dark 
              ? "linear-gradient(180deg, rgba(28,78,138,0.25) 0%, rgba(15,17,21,0.92) 100%)"
              : "linear-gradient(180deg, rgba(28,78,138,0.06) 0%, rgba(236,237,241,0.96) 100%)"
          }} />
        </div> 

        <div className="relative z-10 max-w-[1360px] mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center text-[11px] font-bold tracking-[0.2em] uppercase py-4 mb-16"
            style={{ color: "var(--w25)", borderBottom: "1px solid var(--border)" }}
          >
          
           
          </motion.div>

          <div className="max-w-2xl">
        
            <FadeIn delay={0.1}>
              <h1 className="headline-xl mb-8 bg-gradient-to-r from-white via-blue-50 to-cyan-50 bg-clip-text text-transparent">
                Real projects,<br />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">real results.</span>
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
                  className="px-6 py-3 text-[12px] font-black tracking-widest uppercase transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5"
                  style={{
                    color: activeFilter === cat ? "var(--white)" : "var(--w55)",
                    background: activeFilter === cat 
                      ? `linear-gradient(135deg, var(--blue), var(--cyan))` 
                      : "rgba(255,255,255,0.02)",
                    border: `1px solid ${activeFilter === cat ? "var(--blue)" : "var(--border)"}`,
                    borderRadius: 999,
                    boxShadow: activeFilter === cat 
                      ? "0 4px 16px rgba(59, 130, 246, 0.3)" 
                      : "0 2px 8px rgba(0,0,0,0.1)",
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
                    onImageClick={(src, alt) => setLightboxImage({ src, alt })}
                  />
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Infinite scroll grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
            {visibleItems.map((proj: any) => (
              <ProjectCard
                key={proj.title}
                proj={proj}
                color={colorMap[proj.color] ?? "var(--blue)"}
                onClick={() => handleCardClick(proj.title)}
                isSelected={selectedTitle === proj.title}
              />
            ))}
          </div>

          {/* Auto-load trigger */}
          {hasMore && <LoadTrigger onVisible={loadMore} />}

          {/* CTA */}
          <FadeIn delay={0.2} className="text-center mt-20">
            <Link href="/contact"><Button size="lg">{p.cta}</Button></Link>
          </FadeIn>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <Lightbox
            src={lightboxImage.src}
            alt={lightboxImage.alt}
            onClose={() => setLightboxImage(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}