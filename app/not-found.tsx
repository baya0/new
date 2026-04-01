"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
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
        <h1 className="text-4xl font-extrabold mb-4 -mt-8" style={{ color: "var(--white)" }}>Page Not Found</h1>
        <p className="text-base mb-8 max-w-md mx-auto" style={{ color: "var(--w55)" }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/"><Button><Home size={16} /> Back to Home</Button></Link>
          <Button variant="secondary" onClick={() => window.history.back()}><ArrowLeft size={16} /> Go Back</Button>
        </div>
      </motion.div>
    </div>
  );
}
