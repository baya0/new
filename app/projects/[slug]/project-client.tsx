"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  ChevronLeft,
  ChevronRight,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useLang } from "@/lib/language-context";

export type ProjectView = {
  slug: string;
  title: string;
  category: string;
  color: string;
  desc: string;
  fullDesc: string;
  bullets: string[];
  tags: string[];
  location: string;
  year: string;
  keyResult: string;
  images: string[];
};

const colorMap: Record<string, string> = {
  blue: "var(--blue)",
  green: "var(--green)",
  amber: "var(--amber)",
  cyan: "var(--cyan)",
  purple: "var(--purple)",
};

function AnimatedSection({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function HeroGallery({
  images,
  title,
  color,
}: {
  images: string[];
  title: string;
  color: string;
}) {
  const [current, setCurrent] = useState(0);
  const prev = useCallback(
    () => setCurrent((i) => (i - 1 + images.length) % images.length),
    [images.length],
  );
  const next = useCallback(
    () => setCurrent((i) => (i + 1) % images.length),
    [images.length],
  );

  useEffect(() => {
    if (images.length < 2) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [images.length, prev, next]);

  if (!images.length) return null;

  return (
    <div>
      <div
        className="relative w-full rounded-2xl overflow-hidden"
        style={{ aspectRatio: "16/9", background: "var(--glass-deep)" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Image
              src={images[current]}
              alt={`${title} — ${current + 1}`}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 960px"
            />
          </motion.div>
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              aria-label="Previous image"
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)" }}
            >
              <ChevronLeft size={20} className="text-white" />
            </button>
            <button
              aria-label="Next image"
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)" }}
            >
              <ChevronRight size={20} className="text-white" />
            </button>
            <div
              className="absolute bottom-4 right-4 text-xs px-3 py-1.5 rounded-full font-semibold tabular-nums"
              style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", color: "#fff" }}
            >
              {current + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Show image ${i + 1}`}
              className="relative flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden transition-all duration-200"
              style={{
                opacity: i === current ? 1 : 0.45,
                outline: i === current ? `2px solid ${color}` : "2px solid transparent",
                outlineOffset: "2px",
              }}
            >
              <Image src={img} alt="" fill className="object-cover" sizes="80px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProjectDetailClient({ proj }: { proj: ProjectView }) {
  const { t } = useLang();
  const cc = colorMap[proj.color] ?? "var(--blue)";

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden section-deep"
        style={{ padding: "80px 24px 40px" }}
      >
        <div className="aurora" />
        <div
          className="blob blob-blue w-[500px] h-[500px] animate-blob"
          style={{ right: -160, top: -100 }}
        />
        <div
          className="blob blob-cyan w-[360px] h-[360px] animate-blob"
          style={{ left: -100, top: 60, animationDelay: "-4s" }}
        />

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-semibold mb-8 transition-colors duration-200 hover:text-[var(--blue)]"
              style={{ color: "var(--w55)" }}
            >
              <ArrowLeft size={16} /> Back to Projects
            </Link>

            <span
              className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black tracking-[0.2em] uppercase mb-5"
              style={{ color: cc, border: "1px solid var(--border)", background: "var(--glass)" }}
            >
              {proj.category}
            </span>

            <h1
              className="font-black leading-[1.1] tracking-tight mb-5"
              style={{ fontSize: "clamp(28px, 4vw, 44px)", color: "var(--white)" }}
            >
              {proj.title}
            </h1>

            <div
              className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm"
              style={{ color: "var(--w55)" }}
            >
              {proj.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} />
                  {proj.location}
                </span>
              )}
              {proj.year && (
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  {proj.year}
                </span>
              )}
              {proj.keyResult && (
                <span
                  className="flex items-center gap-1.5 font-semibold"
                  style={{ color: "var(--green)" }}
                >
                  · {proj.keyResult}
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hero gallery */}
      <div className="max-w-4xl mx-auto px-6 mb-14 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <HeroGallery images={proj.images} title={proj.title} color={cc} />
        </motion.div>
      </div>

      <div className="section-divider" />

      {/* Body */}
      <section
        className="relative overflow-hidden section-deep"
        style={{ padding: "64px 24px 120px" }}
      >
        <div
          className="blob blob-cyan w-[350px] h-[350px] top-40 -right-48 animate-blob"
          style={{ animationDelay: "3s" }}
        />

        <div className="max-w-3xl mx-auto relative z-10">
          <AnimatedSection>
            <div className="float-panel rounded-3xl p-8 lg:p-12 relative overflow-hidden">
              <div
                className="absolute top-0 left-0 right-0 h-[3px]"
                style={{ background: `linear-gradient(90deg, ${cc}, transparent)` }}
              />

              {proj.fullDesc &&
                proj.fullDesc.split("\n\n").map((para, i) => (
                  <p
                    key={i}
                    className="text-[15px] leading-[1.9] mb-6"
                    style={{ color: "var(--w55)" }}
                  >
                    {para}
                  </p>
                ))}

              {proj.bullets.length > 0 && (
                <>
                  <h2
                    className="text-lg font-bold mb-4 mt-10"
                    style={{ color: "var(--white)" }}
                  >
                    What we did
                  </h2>
                  <ul className="space-y-3">
                    {proj.bullets.map((b, i) => (
                      <li
                        key={i}
                        className="flex gap-3 items-start text-[15px] leading-relaxed"
                        style={{ color: "var(--w55)" }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full mt-[10px] shrink-0"
                          style={{ background: cc }}
                        />
                        <span className="flex-1">{b}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {proj.tags.length > 0 && (
                <div
                  className="mt-10 pt-6 border-t flex flex-wrap gap-2"
                  style={{ borderColor: "var(--border)" }}
                >
                  {proj.tags.map((tag, i) => (
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
              )}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="text-center mt-14">
              <Link href="/contact">
                <Button size="lg">{t.projects.cta}</Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
