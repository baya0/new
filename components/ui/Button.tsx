"use client";
import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  fullWidth?: boolean;
}

export function Button({ children, variant = "primary", className, onClick, type = "button", fullWidth }: ButtonProps) {
  if (variant === "primary") {
    return (
      <button
        type={type}
        onClick={onClick}
        className={cn(
          "inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-85 hover:-translate-y-0.5 active:scale-95",
          fullWidth && "w-full justify-center",
          className
        )}
        style={{ background: "var(--blue)" }}
      >
        {children}
      </button>
    );
  }
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm border transition-all hover:-translate-y-0.5 active:scale-95",
        fullWidth && "w-full justify-center",
        className
      )}
      style={{ borderColor: "var(--border)", color: "var(--w85)", background: "transparent" }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--blue)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--blue)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--w85)"; }}
    >
      {children}
    </button>
  );
}
