import type { ReactNode } from "react";
import "./../styles/tooltip.css";

export interface TooltipProps {
  label: string;
  children: ReactNode;
}

export default function Tooltip({ label, children }: TooltipProps) {
  return (
    <span className="vb-tooltip" tabIndex={0}>
      {children}
      <span className="vb-tooltip__bubble" role="tooltip">
        {label}
      </span>
    </span>
  );
}
