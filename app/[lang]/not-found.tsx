"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Home, ArrowLeft } from "lucide-react";
import { useLang } from "@/lib/language-context";
import { useLocalizedHref } from "@/lib/use-localized-href";

export default function NotFound() {
  const { t } = useLang();
  const loc = useLocalizedHref();
  const n = t.notFound;
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center relative overflow-hidden" style={{ background: "var(--bg0)" }}>
      {/* Background effects */}
      <div className="absolute inset-0 dot-grid opacity-30" />
      <div className="glow-orb w-[400px] h-[400px] opacity-[0.05]" style={{ background: "radial-gradient(circle, var(--blue), transparent 70%)", left: "50%", top: "30%", transform: "translate(-50%, -50%)" }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <div className="text-[140px] font-extrabold leading-none mb-2 gradient-text" style={{ opacity: 0.15 }}>404</div>
        <h1 className="text-4xl font-extrabold mb-4 -mt-8" style={{ color: "var(--white)" }}>{n.title}</h1>
        <p className="text-base mb-8 max-w-md mx-auto" style={{ color: "var(--w55)" }}>
          {n.sub}
        </p>
        <div className="flex gap-3 justify-center">
          <Link href={loc("/")}><Button><Home size={16} /> {n.backHome}</Button></Link>
          <Button variant="secondary" onClick={() => window.history.back()}><ArrowLeft size={16} /> {n.goBack}</Button>
        </div>
      </motion.div>
    </div>
  );
}
