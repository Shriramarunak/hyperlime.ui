import type { HTMLAttributes, ReactNode } from "react";
import "./../styles/badge.css";

export type BadgeVariant = "default" | "accent" | "success" | "warning" | "error";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  dot?: boolean;
  children?: ReactNode;
}

export default function Badge({ variant = "default", dot = false, children, ...props }: BadgeProps) {
  return (
    <span className={`vb-badge vb-badge--${variant}`} {...props}>
      {dot && <span className="vb-badge__dot" />}
      {children}
    </span>
  );
}
