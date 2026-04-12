"use client";
import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  fullWidth?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Button({
  children,
  variant = "primary",
  className,
  onClick,
  type = "button",
  fullWidth,
  size = "md",
}: ButtonProps) {
  const sizeClasses = {
    sm: "px-5 py-2 text-xs",
    md: "px-7 py-3 text-sm",
    lg: "px-9 py-4 text-base",
  };

  if (variant === "primary") {
    return (
      <button
        type={type}
        onClick={onClick}
        className={cn(
          "inline-flex items-center gap-2 rounded-xl font-bold text-white transition-all duration-250",
          "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
          sizeClasses[size],
          fullWidth && "w-full justify-center",
          className
        )}
        style={{
          background: "var(--gradient-brand)",
          boxShadow: "0 2px 0 rgba(0,0,0,0.15), 0 4px 12px rgba(28,78,138,0.18)",
        }}
      >
        {children}
      </button>
    );
  }

  if (variant === "ghost") {
    return (
      <button
        type={type}
        onClick={onClick}
        className={cn(
          "inline-flex items-center gap-2 rounded-xl font-semibold transition-all duration-200",
          "hover:underline hover:underline-offset-4 active:scale-[0.98]",
          sizeClasses[size],
          fullWidth && "w-full justify-center",
          className
        )}
        style={{ color: "var(--blue)" }}
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
        "inline-flex items-center gap-2 rounded-xl font-bold transition-all duration-250",
        "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
        sizeClasses[size],
        fullWidth && "w-full justify-center",
        className
      )}
      style={{
        background: "var(--glass-card)",
        border: "1.5px solid var(--border)",
        color: "var(--w85)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {children}
    </button>
  );
}
