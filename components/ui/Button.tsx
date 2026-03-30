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
          "inline-flex items-center gap-2 rounded-xl font-bold text-white transition-all duration-300",
          "hover:-translate-y-0.5 active:scale-[0.98]",
          sizeClasses[size],
          fullWidth && "w-full justify-center",
          className
        )}
        style={{
          background: "var(--gradient-brand)",
          boxShadow: "var(--shadow-blue)",
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
          "hover:-translate-y-0.5 active:scale-[0.98]",
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
        "inline-flex items-center gap-2 rounded-xl font-bold border-2 transition-all duration-300",
        "hover:-translate-y-0.5 hover:border-[var(--blue)] hover:text-[var(--blue)] active:scale-[0.98]",
        sizeClasses[size],
        fullWidth && "w-full justify-center",
        className
      )}
      style={{ borderColor: "var(--border-strong)", color: "var(--w85)", background: "transparent" }}
    >
      {children}
    </button>
  );
}
