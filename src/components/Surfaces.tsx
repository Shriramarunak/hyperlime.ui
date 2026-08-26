import type { CSSProperties, ReactNode } from "react";

export interface PaperProps {
  elevation?: number;
  children?: ReactNode;
  style?: CSSProperties;
}

export function Paper({ elevation = 0, children, style, ...props }: PaperProps) {
  return (
    <div
      style={{
        background: "var(--bg-elevated)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        padding: 24,
        boxShadow:
          elevation > 0
            ? `0 ${elevation * 4}px ${elevation * 12}px var(--shadow)`
            : "none",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export interface AppBarProps {
  children?: ReactNode;
  style?: CSSProperties;
}

export function AppBar({ children, style, ...props }: AppBarProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "14px 20px",
        background: "var(--bg-elevated)",
        borderBottom: "1px solid var(--border)",
        borderRadius: "var(--radius-md) var(--radius-md) 0 0",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
