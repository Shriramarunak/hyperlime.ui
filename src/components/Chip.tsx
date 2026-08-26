import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./../styles/chip.css";

export interface ChipProps {
  variant?: "default" | "accent";
  onRemove?: () => void;
  children?: ReactNode;
}

export function Chip({ variant = "default", onRemove, children }: ChipProps) {
  return (
    <span className={`vb-chip vb-chip--${variant}`}>
      {children}
      {onRemove && (
        <button className="vb-chip__remove" onClick={onRemove} aria-label="Remove">
          ✕
        </button>
      )}
    </span>
  );
}

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "accent";
  size?: "sm" | "md";
  label: string;
  children?: ReactNode;
}

export function IconButton({
  variant = "default",
  size = "md",
  label,
  children,
  ...props
}: IconButtonProps) {
  return (
    <button
      className={`vb-iconbtn vb-iconbtn--${size} ${variant === "accent" ? "vb-iconbtn--accent" : ""}`}
      aria-label={label}
      title={label}
      {...props}
    >
      {children}
    </button>
  );
}
