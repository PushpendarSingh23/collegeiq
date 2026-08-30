import React from "react";
import { clsx } from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const variantStyles = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white shadow-sm active:bg-blue-800 focus-visible:ring-blue-500 border border-transparent",
    secondary:
      "bg-slate-100 hover:bg-slate-200 text-slate-900 focus-visible:ring-slate-400 border border-slate-200",
    outline:
      "bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 hover:border-slate-400 focus-visible:ring-blue-500 shadow-xs",
    ghost:
      "bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-900 border-transparent",
    danger:
      "bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 hover:border-rose-300",
  };

  const sizeStyles = {
    sm: "text-xs px-2.5 py-1.5 rounded-lg gap-1.5 font-medium",
    md: "text-sm px-4 py-2 rounded-lg gap-2 font-medium",
    lg: "text-base px-5 py-2.5 rounded-xl gap-2.5 font-semibold",
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={clsx(
        "inline-flex items-center justify-center transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none focus:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-1",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-1.5" />
      ) : (
        leftIcon
      )}
      {children}
      {!isLoading && rightIcon}
    </button>
  );
}
