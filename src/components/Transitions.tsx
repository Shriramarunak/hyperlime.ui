import type { CSSProperties, ReactNode } from "react";

export interface TransitionProps {
  show?: boolean;
  duration?: number;
  children?: ReactNode;
  style?: CSSProperties;
}

export function Fade({ show = true, duration = 250, children, style }: TransitionProps) {
  return (
    <span
      style={{
        display: "inline-block",
        opacity: show ? 1 : 0,
        transition: `opacity ${duration}ms var(--ease-out)`,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

export function Collapse({ show = true, duration = 250, children }: TransitionProps) {
  return (
    <span
      style={{
        display: "grid",
        gridTemplateRows: show ? "1fr" : "0fr",
        transition: `grid-template-rows ${duration}ms var(--ease-out)`,
      }}
    >
      <span style={{ overflow: "hidden", display: "block" }}>{children}</span>
    </span>
  );
}

export interface SlideProps extends TransitionProps {
  direction?: "up" | "down" | "left" | "right";
}

export function Slide({ show = true, duration = 250, direction = "up", children }: SlideProps) {
  const offsets: Record<string, string> = { up: "translateY(16px)", down: "translateY(-16px)", left: "translateX(16px)", right: "translateX(-16px)" };
  return (
    <span
      style={{
        display: "inline-block",
        opacity: show ? 1 : 0,
        transform: show ? "none" : offsets[direction],
        transition: `all ${duration}ms var(--ease-out)`,
      }}
    >
      {children}
    </span>
  );
}
