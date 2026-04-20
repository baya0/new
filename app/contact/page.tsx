"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useLang } from "@/lib/language-context";
import { CheckCircle2, Clock, MapPin, Phone, Mail, Globe, Linkedin, Instagram, Facebook, Twitter, MessageSquare, ArrowUpRight, Send } from "lucide-react";

const contactIcons: Record<string, typeof Mail> = {
  "Email": Mail, "Phone": Phone, "Address": MapPin, "Locations": Globe,
  "البريد الإلكتروني": Mail, "الهاتف": Phone, "العنوان": MapPin, "المواقع": Globe,
  "E-posta": Mail, "Telefon": Phone, "Merkez Adres": MapPin, "Lokasyonlar": Globe,
};

const socialLinks = [
  { icon: Linkedin, label: "LinkedIn", url: "https://www.linkedin.com/company/67696474/", color: "#0A66C2" },
  { icon: Instagram, label: "Instagram", url: "https://www.instagram.com/supportivanet/", color: "#E4405F" },
  { icon: Facebook, label: "Facebook", url: "https://www.facebook.com/Supportiva/", color: "#1877F2" },
  { icon: Twitter, label: "X", url: "https://twitter.com/Supportiva25", color: "var(--white)" },
];

function AnimatedSection({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>{children}</motion.div>
  );
}

export default function ContactPage() {
  const { t } = useLang();
  const c = t.contact;
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", service: "", message: "" });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  return (
    <>
      {/* Hero — full-bleed with asymmetric layout */}
      <section className="relative overflow-hidden section-depth" style={{ padding: "120px 24px 80px" }}>
        <div className="aurora" />
        <div className="blob blob-blue w-[600px] h-[600px] -top-60 -right-60 animate-blob" />
        <div className="blob blob-cyan w-[400px] h-[400px] bottom-0 -left-40 animate-blob" style={{ animationDelay: "4s" }} />
        <div className="blob blob-purple w-[300px] h-[300px] top-20 left-1/2 animate-blob" style={{ animationDelay: "8s", opacity: 0.2 }} />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-6xl mx-auto relative z-10">
          <div className="max-w-2xl">
            <div className="badge mb-6"><MessageSquare size={12} />{c.eyebrow}</div>
            <h1 className="text-4xl sm:text-5xl lg:text-[60px] font-black leading-[1.08] tracking-tight" style={{ color: "var(--white)" }}>
              {c.h1[0]}<br /><span className="gradient-text">{c.h1[1]}</span>
            </h1>
            <p className="mt-6 text-base lg:text-lg leading-relaxed max-w-lg" style={{ color: "var(--w55)" }}>{c.sub}</p>
          </div>

          {/* Quick contact strip — inline, not cards */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 flex flex-wrap gap-8"
          >
            {c.info.slice(0, 3).map((item, i) => {
              const Icon = contactIcons[item.label] ?? Mail;
              const isEmail = (item.val as string).includes("@");
              return (
                <div key={i} className="flex items-center gap-3 group cursor-default">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ background: "var(--tint-blue)", border: "1px solid var(--tint-blue-border)" }}>
                    <Icon size={16} style={{ color: "var(--blue)" }} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider mb-0.5" style={{ color: "var(--w25)" }}>{item.label}</div>
                    <div className="text-sm font-semibold" style={{ color: isEmail ? "var(--blue)" : "var(--white)" }}>
                      {(item.val as string).split("\n")[0]}
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </section>

      <div className="section-divider" />

      {/* Main — Form + Side content in an immersive layout */}
      <section className="relative overflow-hidden section-deep" style={{ padding: "100px 24px 140px" }}>
        <div className="blob blob-cyan w-[400px] h-[400px] top-60 -right-48 animate-blob" style={{ animationDelay: "3s" }} />
        <div className="blob blob-blue w-[350px] h-[350px] bottom-40 -left-40 animate-blob" style={{ animationDelay: "7s" }} />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

            {/* Form Column */}
            <AnimatedSection className="lg:col-span-7">
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="float-panel rounded-3xl p-12 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: "linear-gradient(90deg, var(--green), var(--cyan))" }} />
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{ background: "rgba(26,122,84,0.08)", border: "1px solid rgba(26,122,84,0.15)" }}
                  >
                    <CheckCircle2 size={36} style={{ color: "var(--green)" }} />
                  </motion.div>
                  <h3 className="text-2xl font-black mb-3" style={{ color: "var(--white)" }}>Message Sent!</h3>
                  <p className="text-sm" style={{ color: "var(--w55)" }}>We typically respond within 4 business hours.</p>
                </motion.div>
              ) : (
                <div className="relative">
                  {/* Form with floating labels feel */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {[
                        { key: "name", label: c.form.name, type: "text", placeholder: "John Smith", required: true },
                        { key: "email", label: c.form.email, type: "email", placeholder: "john@company.com", required: true },
                        { key: "company", label: c.form.company, type: "text", placeholder: "Acme Corp", required: false },
                      ].map(({ key, label, type, placeholder, required }) => (
                        <div key={key} className={`relative group ${key === "company" ? "sm:col-span-2" : ""}`}>
                          <label className="block text-[11px] font-bold uppercase tracking-wider mb-2.5 transition-colors duration-200"
                            style={{ color: focusedField === key ? "var(--blue)" : "var(--w25)" }}>
                            {label}
                          </label>
                          <input
                            type={type}
                            required={required}
                            value={(form as any)[key]}
                            onChange={e => setForm({ ...form, [key]: e.target.value })}
                            onFocus={() => setFocusedField(key)}
                            onBlur={() => setFocusedField(null)}
                            placeholder={placeholder}
                            className="form-input"
                            style={{ borderRadius: 16 }}
                          />
                          {/* Animated bottom accent */}
                          <div className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full transition-all duration-300"
                            style={{
                              background: focusedField === key ? "var(--gradient-brand)" : "transparent",
                              transform: focusedField === key ? "scaleX(1)" : "scaleX(0)",
                            }} />
                        </div>
                      ))}
                    </div>

                    {/* Service select */}
                    <div className="relative group">
                      <label className="block text-[11px] font-bold uppercase tracking-wider mb-2.5 transition-colors duration-200"
                        style={{ color: focusedField === "service" ? "var(--blue)" : "var(--w25)" }}>
                        {c.form.service}
                      </label>
                      <select
                        value={form.service}
                        onChange={e => setForm({ ...form, service: e.target.value })}
                        onFocus={() => setFocusedField("service")}
                        onBlur={() => setFocusedField(null)}
                        className="form-input"
                        style={{ borderRadius: 16 }}
                      >
                        <option value="">Select a service...</option>
                        {c.form.services.map((sv, i) => <option key={i} value={sv}>{sv}</option>)}
                      </select>
                    </div>

                    {/* Message */}
                    <div className="relative group">
                      <label className="block text-[11px] font-bold uppercase tracking-wider mb-2.5 transition-colors duration-200"
                        style={{ color: focusedField === "message" ? "var(--blue)" : "var(--w25)" }}>
                        {c.form.message}
                      </label>
                      <textarea
                        required
                        value={form.message}
                        onChange={e => setForm({ ...form, message: e.target.value })}
                        onFocus={() => setFocusedField("message")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Tell us about your project, timeline, and goals..."
                        rows={6}
                        className="form-input resize-y"
                        style={{ minHeight: 160, borderRadius: 20 }}
                      />
                    </div>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.01, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl text-[14px] font-bold text-white transition-all duration-300"
                      style={{
                        background: "var(--gradient-brand)",
                        boxShadow: "0 2px 0 rgba(0,0,0,0.15), 0 4px 12px rgba(28,78,138,0.18)",
                      }}
                    >
                      <Send size={16} />
                      {c.form.btn}
                    </motion.button>
                  </form>
                </div>
              )}
            </AnimatedSection>

            {/* Right Side — organic flowing info, not cards */}
            <AnimatedSection className="lg:col-span-5 lg:sticky lg:top-32" delay={0.15}>
              <div className="space-y-10">

                {/* Response time badge */}
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-3 h-3 rounded-full" style={{ background: "var(--green)" }} />
                    <div className="absolute inset-0 w-3 h-3 rounded-full animate-ping" style={{ background: "var(--green)", opacity: 0.3 }} />
                  </div>
                  <span className="text-sm font-semibold" style={{ color: "var(--w85)" }}>{c.resp}</span>
                </div>

                {/* Locations — flowing text, not cards */}
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest mb-4" style={{ color: "var(--w25)" }}>
                    Global Presence
                  </div>
                  {c.info.filter(item => ["Locations", "المواقع", "Lokasyonlar"].includes(item.label)).map((item, i) => (
                    <div key={i} className="relative pl-6">
                      {/* Vertical accent line */}
                      <div className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full"
                        style={{ background: "linear-gradient(to bottom, var(--blue), var(--cyan), transparent)" }} />
                      <p className="text-sm leading-[2.2] whitespace-pre-line" style={{ color: "var(--w55)" }}>
                        {item.val}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Address */}
                {c.info.filter(item => ["Address", "العنوان", "Merkez Adres"].includes(item.label)).map((item, i) => (
                  <div key={i}>
                    <div className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: "var(--w25)" }}>
                      {item.label}
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin size={16} className="shrink-0 mt-0.5" style={{ color: "var(--blue)" }} />
                      <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: "var(--w55)" }}>{item.val}</p>
                    </div>
                  </div>
                ))}

                {/* Divider line */}
                <div className="h-px" style={{ background: "linear-gradient(90deg, var(--border), transparent)" }} />

                {/* Social — minimal inline row */}
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest mb-4" style={{ color: "var(--w25)" }}>
                    Connect
                  </div>
                  <div className="flex gap-3">
                    {socialLinks.map(s => (
                      <a
                        key={s.label}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 px-4 py-2.5 rounded-xl text-[12px] font-semibold transition-all duration-300 hover:-translate-y-1"
                        style={{
                          background: "var(--glass-card)",
                          border: "1px solid var(--glass-card-border)",
                          color: "var(--w55)",
                        }}
                      >
                        <s.icon size={14} className="transition-colors duration-200" />
                        <span className="hidden sm:inline">{s.label}</span>
                        <ArrowUpRight size={10} className="opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
