import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./../styles/button.css";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: string;
  loading?: boolean;
  fullWidth?: boolean;
  children?: ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  color,
  loading = false,
  fullWidth = false,
  children,
  className = "",
  style,
  disabled,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;
  return (
    <button
      className={`vb-btn vb-btn--${variant} vb-btn--${size} ${fullWidth ? "vb-btn--full" : ""} ${loading ? "vb-btn--loading" : ""} ${className}`}
      style={color ? ({ "--accent": color, ...style } as React.CSSProperties) : style}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && <span className="vb-btn__spinner" aria-hidden="true" />}
      {children}
    </button>
  );
}
