import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

export interface ContainerProps {
  maxWidth?: number;
  children?: ReactNode;
  style?: CSSProperties;
}

export function Container({ maxWidth = 1100, children, ...props }: ContainerProps) {
  return (
    <div
      style={{ maxWidth, margin: "0 auto", padding: "0 24px", width: "100%" }}
      {...props}
    >
      {children}
    </div>
  );
}

export interface StackProps {
  direction?: "row" | "column";
  spacing?: number;
  children?: ReactNode;
  style?: CSSProperties;
}

export function Stack({ direction = "column", spacing = 2, children, ...props }: StackProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: direction,
        gap: `${spacing * 8}px`,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export interface GridProps {
  columns?: number;
  spacing?: number;
  children?: ReactNode;
  style?: CSSProperties;
}

export function Grid({ columns = 2, spacing = 2, children, ...props }: GridProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap: `${spacing * 8}px`,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export type BoxProps = HTMLAttributes<HTMLDivElement>;

export function Box(props: BoxProps) {
  return <div {...props} />;
}
