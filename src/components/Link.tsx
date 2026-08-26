import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  accent?: boolean;
  children?: ReactNode;
}

export default function Link({ href = "#", accent = false, children, ...props }: LinkProps) {
  const hover = (e: MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.opacity = "0.7";
    props.onMouseEnter?.(e);
  };
  const leave = (e: MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.opacity = "1";
    props.onMouseLeave?.(e);
  };
  return (
    <a
      href={href}
      style={{
        color: accent ? "var(--accent)" : "var(--text)",
        textDecoration: "none",
        borderBottom: "1px solid currentColor",
        paddingBottom: 1,
        transition: "opacity 0.15s ease",
        cursor: "pointer",
      }}
      onMouseEnter={hover}
      onMouseLeave={leave}
      {...props}
    >
      {children}
    </a>
  );
}
