"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { translations } from "@/lib/i18n";
import { CheckCircle2, Clock, MapPin, Phone, Mail, Globe, Linkedin, Instagram, Facebook, Twitter, MessageSquare } from "lucide-react";

const t = translations.en;
const c = t.contact;

const contactIcons: Record<string, typeof Mail> = {
  "Email": Mail, "Phone": Phone, "Address": MapPin, "Locations": Globe,
  "البريد الإلكتروني": Mail, "الهاتف": Phone, "العنوان": MapPin, "المواقع": Globe,
  "E-posta": Mail, "Telefon": Phone, "Merkez Adres": MapPin, "Lokasyonlar": Globe,
};

const socialLinks = [
  { icon: Linkedin, label: "LinkedIn", url: "https://www.linkedin.com/company/67696474/" },
  { icon: Instagram, label: "Instagram", url: "https://www.instagram.com/supportivanet/" },
  { icon: Facebook, label: "Facebook", url: "https://www.facebook.com/Supportiva/" },
  { icon: Twitter, label: "X / Twitter", url: "https://twitter.com/Supportiva25" },
];

function AnimatedSection({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>{children}</motion.div>
  );
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", service: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden section-depth" style={{ padding: "100px 24px 120px" }}>
        {/* Floating blobs */}
        <div className="blob blob-blue w-[500px] h-[500px] -top-40 -right-40 animate-blob" />
        <div className="blob blob-cyan w-[400px] h-[400px] bottom-0 -left-32 animate-blob" style={{ animationDelay: "4s" }} />
        <div className="blob blob-purple w-[250px] h-[250px] top-10 left-1/3 animate-blob" style={{ animationDelay: "7s", opacity: 0.25 }} />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-6xl mx-auto relative z-10">
          <div className="badge mb-6"><MessageSquare size={12} />{c.eyebrow}</div>
          <h1 className="text-4xl sm:text-5xl lg:text-[60px] font-black leading-[1.08] tracking-tight" style={{ color: "var(--white)" }}>
            {c.h1[0]}<br /><span className="gradient-text">{c.h1[1]}</span>
          </h1>
          <p className="mt-6 text-base lg:text-lg leading-relaxed max-w-xl" style={{ color: "var(--w55)" }}>{c.sub}</p>
          <div className="accent-line w-24 mt-8" />
        </motion.div>
      </section>

      <section className="relative overflow-hidden section-depth" style={{ padding: "100px 24px 140px" }}>
        {/* Background blobs */}
        <div className="blob blob-cyan w-[400px] h-[400px] top-40 -right-48 animate-blob" style={{ animationDelay: "3s" }} />
        <div className="blob blob-blue w-[350px] h-[350px] bottom-60 -left-40 animate-blob" style={{ animationDelay: "7s" }} />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Form */}
            <AnimatedSection className="lg:col-span-3">
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="float-panel rounded-3xl p-12 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: "linear-gradient(90deg, var(--green), var(--cyan))" }} />
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "rgba(5,150,105,0.1)", border: "1px solid rgba(5,150,105,0.2)" }}>
                    <CheckCircle2 size={36} style={{ color: "var(--green)" }} />
                  </div>
                  <h3 className="text-2xl font-black mb-3" style={{ color: "var(--white)" }}>Message Sent!</h3>
                  <p className="text-sm" style={{ color: "var(--w55)" }}>We typically respond within 4 business hours.</p>
                </motion.div>
              ) : (
                <div className="float-panel rounded-3xl p-8 lg:p-10 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: "var(--gradient-brand)" }} />
                  <div className="relative">
                    <h3 className="text-lg font-black mb-6" style={{ color: "var(--white)" }}>Send us a message</h3>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold mb-2" style={{ color: "var(--w55)" }}>{c.form.name}</label>
                          <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="John Smith" className="form-input" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold mb-2" style={{ color: "var(--w55)" }}>{c.form.email}</label>
                          <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="john@company.com" className="form-input" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold mb-2" style={{ color: "var(--w55)" }}>{c.form.company}</label>
                          <input type="text" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Acme Corp" className="form-input" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold mb-2" style={{ color: "var(--w55)" }}>{c.form.service}</label>
                          <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })} className="form-input">
                            <option value="">Select a service...</option>
                            {c.form.services.map((sv, i) => <option key={i} value={sv}>{sv}</option>)}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold mb-2" style={{ color: "var(--w55)" }}>{c.form.message}</label>
                        <textarea required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your project..." rows={5} className="form-input resize-y" style={{ minHeight: 140 }} />
                      </div>
                      <Button type="submit" fullWidth size="lg">{c.form.btn}</Button>
                    </form>
                  </div>
                </div>
              )}
            </AnimatedSection>

            {/* Contact Info */}
            <AnimatedSection className="lg:col-span-2" delay={0.15}>
              <div className="flex flex-col gap-4">
                {c.info.map((item, i) => {
                  const Icon = contactIcons[item.label] ?? Mail;
                  return (
                    <div key={i} className="glass-card rounded-xl p-5 flex gap-4 items-start group" style={{ transform: "none" }}>
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110" style={{ background: "rgba(29,107,196,0.1)", border: "1px solid rgba(29,107,196,0.12)" }}>
                        <Icon size={18} style={{ color: "var(--blue)" }} />
                      </div>
                      <div>
                        <div className="text-xs font-bold mb-1" style={{ color: "var(--white)" }}>{item.label}</div>
                        <div className="text-xs whitespace-pre-line leading-relaxed" style={{ color: (item.val as string).includes("@") ? "var(--blue)" : "var(--w55)" }}>{item.val}</div>
                      </div>
                    </div>
                  );
                })}

                <div className="badge justify-center py-3 text-[11px]">
                  <Clock size={14} />{c.resp}
                </div>

                <div className="glass-card rounded-xl p-5" style={{ transform: "none" }}>
                  <p className="text-xs font-bold mb-3" style={{ color: "var(--white)" }}>Follow Us</p>
                  <div className="flex gap-2">
                    {socialLinks.map(s => (
                      <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center py-3 rounded-xl text-xs font-medium transition-all duration-300 hover:-translate-y-1"
                        style={{ background: "var(--glass-card)", backdropFilter: "blur(12px)", border: "1px solid var(--glass-card-border)", color: "var(--w55)" }}>
                        <s.icon size={15} />
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
