"use client";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-8 text-center" style={{ background: "var(--bg0)" }}>
      <div className="text-8xl font-bold mb-4" style={{ color: "var(--blue)", opacity: 0.15 }}>404</div>
      <h1 className="text-4xl font-bold mb-3" style={{ color: "var(--white)" }}>Page Not Found</h1>
      <p className="text-base mb-8 max-w-md" style={{ color: "var(--w55)" }}>
        The page you're looking for doesn't exist. Let's get you back on track.
      </p>
      <Link href="/"><Button>Back to Home →</Button></Link>
    </div>
  );
}
