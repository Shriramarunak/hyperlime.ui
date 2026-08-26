import type { CSSProperties, ReactNode } from "react";
import "./../styles/card.css";

export interface CardProps {
  title?: string;
  description?: string;
  footer?: ReactNode;
  hoverable?: boolean;
  accent?: boolean;
  children?: ReactNode;
  style?: CSSProperties;
}

export default function Card({ title, description, footer, hoverable, accent, children, style }: CardProps) {
  return (
    <div
      className={`vb-card ${hoverable ? "vb-card--hoverable" : ""} ${accent ? "vb-card--accent" : ""}`}
      style={style}
    >
      {(title || description) && (
        <div className="vb-card__header">
          {title && <h3 className="vb-card__title">{title}</h3>}
          {description && <p className="vb-card__description">{description}</p>}
        </div>
      )}
      {children && <div className="vb-card__body">{children}</div>}
      {footer && <div className="vb-card__footer">{footer}</div>}
    </div>
  );
}
