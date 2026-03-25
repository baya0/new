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
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  if (variant === "primary") {
    return (
      <button
        type={type}
        onClick={onClick}
        className={cn(
          "inline-flex items-center gap-2 rounded-xl font-bold text-white transition-all duration-200",
          "hover:opacity-90 hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98]",
          sizeClasses[size],
          fullWidth && "w-full justify-center",
          className
        )}
        style={{
          background: "linear-gradient(135deg, var(--blue), #0066CC)",
          boxShadow: "0 2px 16px rgba(15, 144, 255, 0.25)",
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
          "inline-flex items-center gap-2 rounded-xl font-medium transition-all duration-200",
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
        "inline-flex items-center gap-2 rounded-xl font-bold border-2 transition-all duration-200",
        "hover:-translate-y-0.5 hover:border-[var(--blue)] hover:text-[var(--blue)] active:scale-[0.98]",
        sizeClasses[size],
        fullWidth && "w-full justify-center",
        className
      )}
      style={{ borderColor: "var(--border)", color: "var(--w85)", background: "transparent" }}
    >
      {children}
    </button>
  );
}
