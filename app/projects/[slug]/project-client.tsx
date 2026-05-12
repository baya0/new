"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Sparkles,
  Tag as TagIcon,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useLang } from "@/lib/language-context";
import { useTheme } from "@/lib/theme-context";

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
        style={{
          aspectRatio: "16/9",
          background: "var(--glass-deep)",
          border: "1px solid var(--glass-card-border)",
          boxShadow: "var(--shadow-lg)",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={images[current]}
              alt={`${title} — ${current + 1}`}
              fill
              priority
              className="object-cover"
              style={{ objectPosition: "center 30%" }}
              sizes="(max-width: 1024px) 100vw, 960px"
            />
          </motion.div>
        </AnimatePresence>

        {/* Soft top/bottom glass gradient so controls + counter read clearly */}
        <div
          className="absolute inset-x-0 top-0 h-16 pointer-events-none"
          style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.25), transparent)" }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
          style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.35), transparent)" }}
        />

        {images.length > 1 && (
          <>
            <button
              aria-label="Previous image"
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:-translate-x-0.5"
              style={{
                background: "rgba(0,0,0,0.45)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <ChevronLeft size={20} className="text-white" />
            </button>
            <button
              aria-label="Next image"
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:translate-x-0.5"
              style={{
                background: "rgba(0,0,0,0.45)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <ChevronRight size={20} className="text-white" />
            </button>
            <div
              className="absolute bottom-4 right-4 text-xs px-3 py-1.5 rounded-full font-semibold tabular-nums flex items-center gap-2"
              style={{
                background: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "#fff",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: color }}
              />
              {current + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Show image ${i + 1}`}
              className="relative flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden transition-all duration-200"
              style={{
                opacity: i === current ? 1 : 0.4,
                outline: i === current ? `2px solid ${color}` : "2px solid transparent",
                outlineOffset: "2px",
              }}
            >
              <Image
                src={img}
                alt=""
                fill
                className="object-cover"
                style={{ objectPosition: "center 30%" }}
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function MetaTile({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div
      className="rounded-xl p-4 flex items-start gap-3"
      style={{
        background: "var(--glass)",
        border: "1px solid var(--border)",
      }}
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{
          background: accent ? `${accent}15` : "var(--tint-blue)",
          color: accent ?? "var(--blue)",
          border: `1px solid ${accent ? `${accent}25` : "var(--tint-blue-border)"}`,
        }}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p
          className="text-[10px] uppercase tracking-[0.18em] font-bold mb-1"
          style={{ color: "var(--w25)" }}
        >
          {label}
        </p>
        <p
          className="text-[13px] font-semibold leading-snug"
          style={{ color: "var(--white)" }}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

export default function ProjectDetailClient({ proj }: { proj: ProjectView }) {
  const { t } = useLang();
  const { dark } = useTheme();
  const cc = colorMap[proj.color] ?? "var(--blue)";

  return (
    <>
      {/* ───────────── HERO ───────────── */}
      <section
        className="relative overflow-hidden section-deep"
        style={{ padding: "64px 0 56px" }}
      >
        {/* Background image — same treatment as /projects */}
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src="/images/backgrounds/back1.jpg"
            alt=""
            fill
            className="object-cover object-top"
            style={{
              opacity: dark ? 0.14 : 0.07,
              filter: "blur(1px) grayscale(15%)",
            }}
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background: dark
                ? "linear-gradient(180deg, rgba(17,28,42,0) 0%, rgba(17,28,42,0.55) 30%, var(--glass-deep) 60%)"
                : "linear-gradient(180deg, rgba(227,228,234,0) 0%, rgba(227,228,234,0.6) 30%, var(--glass-deep) 60%)",
            }}
          />
        </div>

        {/* Ambient decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="aurora" />
          <div
            className="blob blob-blue w-[520px] h-[520px] animate-blob"
            style={{ right: -180, top: -120 }}
          />
          <div
            className="blob blob-cyan w-[380px] h-[380px] animate-blob"
            style={{ left: -120, top: 80, animationDelay: "-4s" }}
          />
          <div className="absolute inset-0 dot-grid opacity-25" />
        </div>

        <div className="relative z-10 max-w-[1180px] mx-auto px-6 lg:px-10">
          <FadeIn>
            <div className="flex items-center gap-4 mb-7 flex-wrap">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 hover:gap-3"
                style={{ color: "var(--w55)" }}
              >
                <ArrowLeft size={16} /> {t.projects.backToProjects}
              </Link>
              <span
                className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black tracking-[0.2em] uppercase"
                style={{
                  color: cc,
                  background: "var(--glass)",
                  border: "1px solid var(--border)",
                }}
              >
                {t.projects.categories[proj.category.toLowerCase() as keyof typeof t.projects.categories] ?? proj.category}
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <p
              className="text-[11px] font-bold tracking-[0.25em] uppercase mb-3 inline-flex items-center gap-2"
              style={{ color: cc }}
            >
              <Sparkles size={12} /> {t.projects.caseStudy}
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1
              className="font-black leading-[1.05] tracking-tight mb-6 max-w-4xl"
              style={{
                fontSize: "clamp(30px, 5vw, 56px)",
                color: "var(--white)",
              }}
            >
              {proj.title.split(" ").map((word, i, arr) => {
                const isLast = i >= arr.length - 2;
                return (
                  <span
                    key={i}
                    style={isLast ? { color: cc } : undefined}
                  >
                    {word}
                    {i < arr.length - 1 ? " " : ""}
                  </span>
                );
              })}
            </h1>
          </FadeIn>

          {proj.desc && (
            <FadeIn delay={0.15}>
              <p
                className="text-[16px] lg:text-[17px] leading-[1.7] max-w-3xl mb-8"
                style={{ color: "var(--w55)" }}
              >
                {proj.desc}
              </p>
            </FadeIn>
          )}

          {/* Meta tile strip */}
          <FadeIn delay={0.2}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-3xl">
              {proj.location && (
                <MetaTile
                  icon={<MapPin size={16} />}
                  label={t.projects.location}
                  value={proj.location}
                />
              )}
              {proj.year && (
                <MetaTile
                  icon={<Calendar size={16} />}
                  label={t.projects.year}
                  value={proj.year}
                />
              )}
              {proj.keyResult && (
                <MetaTile
                  icon={<CheckCircle2 size={16} />}
                  label={t.projects.outcome}
                  value={proj.keyResult}
                  accent="var(--green)"
                />
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ───────────── GALLERY ───────────── */}
      <section className="relative section-deep" style={{ padding: "0 0 56px" }}>
        <div className="relative z-10 max-w-[1180px] mx-auto px-6 lg:px-10">
          <FadeIn delay={0.1}>
            <HeroGallery images={proj.images} title={proj.title} color={cc} />
          </FadeIn>
        </div>
      </section>

      {/* ───────────── BODY — two columns on desktop ───────────── */}
      <section
        className="relative overflow-hidden section-deep"
        style={{ padding: "8px 0 96px" }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="blob blob-cyan w-[360px] h-[360px] animate-blob"
            style={{ right: -120, top: 80, animationDelay: "-6s" }}
          />
          <div
            className="blob blob-amber w-[300px] h-[300px] animate-blob"
            style={{ left: -100, bottom: 120, animationDelay: "-3s" }}
          />
        </div>

        <div className="relative z-10 max-w-[1180px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
            {/* Main column */}
            <FadeIn>
              <div className="float-panel rounded-3xl p-7 lg:p-10 relative overflow-hidden">
                <div
                  className="absolute top-0 left-0 right-0 h-[3px]"
                  style={{
                    background: `linear-gradient(90deg, ${cc}, transparent)`,
                  }}
                />

                {/* Overview */}
                <p
                  className="text-[11px] font-bold tracking-[0.25em] uppercase mb-3"
                  style={{ color: cc }}
                >
                  {t.projects.overview}
                </p>

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
                    <div
                      className="mt-10 mb-5 flex items-center gap-3"
                    >
                      <span
                        className="h-px flex-1"
                        style={{ background: "var(--border)" }}
                      />
                      <p
                        className="text-[11px] font-bold tracking-[0.25em] uppercase"
                        style={{ color: cc }}
                      >
                        {t.projects.whatWeDid}
                      </p>
                      <span
                        className="h-px flex-1"
                        style={{ background: "var(--border)" }}
                      />
                    </div>
                    <ul className="space-y-3">
                      {proj.bullets.map((b, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -8 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-30px" }}
                          transition={{ delay: i * 0.04, duration: 0.4 }}
                          className="flex gap-4 items-start p-3 rounded-xl transition-colors duration-200"
                          style={{
                            background: "var(--glass)",
                            border: "1px solid var(--border)",
                          }}
                        >
                          <span
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold flex-shrink-0 mt-0.5"
                            style={{
                              background: `${cc}15`,
                              color: cc,
                              border: `1px solid ${cc}25`,
                            }}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span
                            className="flex-1 text-[14px] leading-relaxed"
                            style={{ color: "var(--w55)" }}
                          >
                            {b}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </FadeIn>

            {/* Sticky sidebar */}
            <FadeIn delay={0.1}>
              <aside className="lg:sticky lg:top-24 space-y-4">
                {/* At-a-glance card */}
                <div
                  className="rounded-2xl p-5 relative overflow-hidden"
                  style={{
                    background: "var(--glass-card)",
                    border: "1px solid var(--glass-card-border)",
                    boxShadow: "var(--shadow)",
                  }}
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{ background: `linear-gradient(90deg, ${cc}, transparent)` }}
                  />
                  <p
                    className="text-[10px] font-bold tracking-[0.25em] uppercase mb-4"
                    style={{ color: "var(--w25)" }}
                  >
                    {t.projects.atAGlance}
                  </p>

                  <dl className="space-y-3">
                    {proj.location && (
                      <div className="flex items-center justify-between gap-3">
                        <dt
                          className="text-[12px] flex items-center gap-2"
                          style={{ color: "var(--w55)" }}
                        >
                          <MapPin size={12} /> {t.projects.location}
                        </dt>
                        <dd
                          className="text-[12px] font-semibold text-right"
                          style={{ color: "var(--white)" }}
                        >
                          {proj.location}
                        </dd>
                      </div>
                    )}
                    {proj.year && (
                      <div className="flex items-center justify-between gap-3">
                        <dt
                          className="text-[12px] flex items-center gap-2"
                          style={{ color: "var(--w55)" }}
                        >
                          <Calendar size={12} /> {t.projects.year}
                        </dt>
                        <dd
                          className="text-[12px] font-semibold"
                          style={{ color: "var(--white)" }}
                        >
                          {proj.year}
                        </dd>
                      </div>
                    )}
                    {proj.keyResult && (
                      <div className="pt-3 mt-3 border-t" style={{ borderColor: "var(--border)" }}>
                        <dt
                          className="text-[10px] font-bold tracking-[0.18em] uppercase mb-1.5"
                          style={{ color: "var(--w25)" }}
                        >
                          {t.projects.outcome}
                        </dt>
                        <dd
                          className="text-[13px] font-semibold leading-snug"
                          style={{ color: "var(--green)" }}
                        >
                          {proj.keyResult}
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>

                {/* Services / tags card */}
                {proj.tags.length > 0 && (
                  <div
                    className="rounded-2xl p-5"
                    style={{
                      background: "var(--glass-card)",
                      border: "1px solid var(--glass-card-border)",
                      boxShadow: "var(--shadow)",
                    }}
                  >
                    <p
                      className="text-[10px] font-bold tracking-[0.25em] uppercase mb-3 flex items-center gap-2"
                      style={{ color: "var(--w25)" }}
                    >
                      <TagIcon size={11} /> {t.projects.services}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {proj.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-[11px] px-2.5 py-1.5 rounded-md font-medium"
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
                  </div>
                )}

                {/* Mini CTA */}
                <div
                  className="rounded-2xl p-5 relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${cc}10, var(--glass-card))`,
                    border: `1px solid ${cc}25`,
                  }}
                >
                  <p
                    className="text-[14px] font-bold mb-1.5"
                    style={{ color: "var(--white)" }}
                  >
                    {t.projects.similarChallenge}
                  </p>
                  <p
                    className="text-[12px] mb-4 leading-relaxed"
                    style={{ color: "var(--w55)" }}
                  >
                    {t.projects.similarChallengeSub}
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-[13px] font-bold transition-all duration-200 hover:gap-3"
                    style={{ color: cc }}
                  >
                    {t.projects.startConversation} <ArrowRight size={14} />
                  </Link>
                </div>
              </aside>
            </FadeIn>
          </div>

          {/* Bottom CTA */}
          <FadeIn delay={0.15} className="mt-16">
            <div
              className="rounded-3xl p-8 lg:p-12 text-center relative overflow-hidden"
              style={{
                background: "var(--glass-card)",
                border: "1px solid var(--glass-card-border)",
                boxShadow: "var(--shadow-lg)",
              }}
            >
              <div
                className="absolute inset-x-0 top-0 h-[3px]"
                style={{
                  background: `linear-gradient(90deg, transparent, ${cc}, transparent)`,
                }}
              />
              <p
                className="text-[11px] font-bold tracking-[0.25em] uppercase mb-3"
                style={{ color: cc }}
              >
                {t.projects.nextStep}
              </p>
              <h3
                className="font-black leading-tight mb-3"
                style={{
                  fontSize: "clamp(22px, 3vw, 32px)",
                  color: "var(--white)",
                }}
              >
                {t.projects.readyHeadline}
              </h3>
              <p
                className="text-[14px] mb-7 max-w-xl mx-auto leading-relaxed"
                style={{ color: "var(--w55)" }}
              >
                {t.projects.readySub}
              </p>
              <Link href="/contact">
                <Button size="lg">{t.projects.cta}</Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
