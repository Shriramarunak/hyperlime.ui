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
  onClose?: () => void;
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
}

export default function Alert({ variant = "info", title, onClose, className = "", style, children }: AlertProps) {
  return (
    <div className={`vb-alert vb-alert--${variant} ${className}`} style={style} role="alert">
      <span className="vb-alert__icon">{icons[variant]}</span>
      <div style={{ flex: 1 }}>
        {title && <div className="vb-alert__title">{title}</div>}
        <div className="vb-alert__content">{children}</div>
      </div>
      {onClose && (
        <button
          className="vb-alert__close"
          onClick={onClose}
          aria-label="Dismiss"
        >
          ✕
        </button>
      )}
    </div>
  );
}
