"use client";
import { useRef, use } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { translations } from "@/lib/i18n";
import { Clock, ArrowLeft, User, Cloud, Server, Truck, Leaf } from "lucide-react";
import { notFound } from "next/navigation";

const t = translations.en;
const b = t.blog;

const catConfig: Record<string, { color: string; icon: typeof Cloud }> = {
  Cloud: { color: "var(--blue)", icon: Cloud },
  Infrastructure: { color: "var(--cyan)", icon: Server },
  Migration: { color: "var(--amber)", icon: Truck },
  Sustainability: { color: "var(--green)", icon: Leaf },
};

function AnimatedSection({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className={className}>{children}</motion.div>
  );
}

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const post = b.posts.find((p) => p.slug === slug);
  if (!post) return notFound();

  const cfg = catConfig[post.cat];
  const cc = cfg?.color ?? "var(--blue)";
  const Icon = cfg?.icon ?? Cloud;

  const relatedPosts = b.posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden section-depth" style={{ padding: "100px 24px 80px" }}>
        <div className="aurora" />
        <div className="blob blob-blue w-[500px] h-[500px] -top-40 -right-40 animate-blob" />
        <div className="blob blob-purple w-[350px] h-[350px] bottom-0 -left-32 animate-blob" style={{ animationDelay: "5s" }} />

        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold mb-8 transition-colors duration-200 hover:text-[var(--blue)]" style={{ color: "var(--w55)" }}>
              <ArrowLeft size={16} /> Back to Blog
            </Link>

            <div className="tag mb-5 w-fit" style={{ background: `${cc}0D`, color: cc, border: `1px solid ${cc}20` }}>
              <Icon size={11} />{post.cat}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-black leading-[1.1] tracking-tight mb-6" style={{ color: "var(--white)" }}>
              {post.title}
            </h1>

            <div className="flex items-center gap-5 flex-wrap">
              <span className="flex items-center gap-2 text-sm font-medium" style={{ color: "var(--w55)" }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(29,107,196,0.1)", border: "1px solid rgba(29,107,196,0.15)" }}>
                  <User size={12} style={{ color: "var(--blue)" }} />
                </div>
                {b.author}
              </span>
              <span className="flex items-center gap-1.5 text-sm" style={{ color: "var(--w25)" }}>
                <Clock size={14} />{post.date}
              </span>
              <span className="text-sm" style={{ color: "var(--w25)" }}>{post.read}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image Placeholder */}
      <div className="max-w-3xl mx-auto px-6 -mt-2 mb-12 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <div className="img-placeholder min-h-[300px] sm:min-h-[400px] relative rounded-2xl">
            {/* To add featured image: <Image src={`/images/blog/${post.slug}.jpg`} alt={post.title} fill className="object-cover rounded-2xl" /> */}
          </div>
        </motion.div>
      </div>

      <div className="section-divider" />

      {/* Article Body */}
      <section className="relative overflow-hidden section-deep" style={{ padding: "80px 24px 120px" }}>
        <div className="blob blob-cyan w-[350px] h-[350px] top-40 -right-48 animate-blob" style={{ animationDelay: "3s" }} />

        <div className="max-w-3xl mx-auto relative z-10">
          <AnimatedSection>
            <div className="float-panel rounded-3xl p-8 lg:p-12 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: `linear-gradient(90deg, ${cc}, transparent)` }} />

              <article className="prose-custom">
                {post.body.map((block: any, i: number) => {
                  if (block.type === "p") {
                    return <p key={i} className="text-[15px] leading-[1.9] mb-6" style={{ color: "var(--w55)" }}>{block.text}</p>;
                  }
                  if (block.type === "h2") {
                    return <h2 key={i} className="text-xl font-black mb-4 mt-10" style={{ color: "var(--white)" }}>{block.text}</h2>;
                  }
                  if (block.type === "ul") {
                    return (
                      <ul key={i} className="space-y-3 mb-6 ml-1">
                        {block.items.map((item: string, j: number) => (
                          <li key={j} className="flex gap-3 items-start text-[15px] leading-relaxed" style={{ color: "var(--w55)" }}>
                            <span className="w-1.5 h-1.5 rounded-full mt-2.5 shrink-0" style={{ background: cc }} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  if (block.type === "ol") {
                    return (
                      <ol key={i} className="space-y-4 mb-6">
                        {block.items.map((item: string, j: number) => (
                          <li key={j} className="flex gap-3 items-start text-[15px] leading-relaxed" style={{ color: "var(--w55)" }}>
                            <span className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5" style={{ background: `${cc}10`, color: cc, border: `1px solid ${cc}20` }}>
                              {j + 1}
                            </span>
                            <span className="flex-1">{item}</span>
                          </li>
                        ))}
                      </ol>
                    );
                  }
                  return null;
                })}
              </article>
            </div>
          </AnimatedSection>

          {/* Related Posts */}
          <AnimatedSection>
            <div className="mt-16">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black" style={{ color: "var(--white)" }}>Recent Posts</h3>
                <Link href="/blog" className="text-sm font-bold transition-colors duration-200 hover:text-[var(--blue)]" style={{ color: "var(--w55)" }}>See All</Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {relatedPosts.map((rp, i) => {
                  const rcfg = catConfig[rp.cat];
                  const rcc = rcfg?.color ?? "var(--blue)";
                  return (
                    <Link key={i} href={`/post/${rp.slug}`}>
                      <div className="glass-card overflow-hidden cursor-pointer group h-full" style={{ borderRadius: 20 }}>
                        <div className="h-32 relative" style={{ background: `linear-gradient(135deg, ${rcc}0A, var(--glass-card))` }}>
                          <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, ${rcc}, transparent)` }} />
                        </div>
                        <div className="p-4">
                          <h4 className="text-xs font-bold leading-snug mb-2 line-clamp-2 relative z-10" style={{ color: "var(--white)" }}>{rp.title}</h4>
                          <span className="text-[10px] font-medium" style={{ color: "var(--w25)" }}>{rp.date}</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
