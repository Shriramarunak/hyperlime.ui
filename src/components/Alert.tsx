import type { ReactNode } from "react";
import "./../styles/alert.css";

export type AlertVariant = "info" | "success" | "warning" | "error";

const icons: Record<AlertVariant, string> = {
  info: "ⓘ",
  success: "✓",
  warning: "⚠",
  error: "✕",
};

export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children?: ReactNode;
}

export default function Alert({ variant = "info", title, children }: AlertProps) {
  return (
    <div className={`vb-alert vb-alert--${variant}`} role="alert">
      <span className="vb-alert__icon">{icons[variant]}</span>
      <div>
        {title && <div className="vb-alert__title">{title}</div>}
        <div className="vb-alert__content">{children}</div>
      </div>
    </div>
  );
}
