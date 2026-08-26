import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./../styles/button.css";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children?: ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`vb-btn vb-btn--${variant} vb-btn--${size} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
