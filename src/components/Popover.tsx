import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

export interface PortalProps {
  children: ReactNode;
}

export function Portal({ children }: PortalProps) {
  return createPortal(children, document.body);
}

export interface PopoverProps {
  trigger: ReactNode;
  children: ReactNode;
}

export default function Popover({ trigger, children }: PopoverProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!open) return;
    const handler = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", handler);
    return () => document.removeEventListener("pointerdown", handler);
  }, [open]);
  return (
    <span ref={ref} style={{ position: "relative", display: "inline-flex" }}>
      <span onClick={() => setOpen(!open)}>{trigger}</span>
      {open && (
        <span
          className="vb-popover"
          style={{
            position: "absolute",
            top: "calc(100% + 10px)",
            left: 0,
            zIndex: 70,
            display: "block",
            width: 240,
            background: "var(--bg-elevated)",
            border: "1px solid var(--border-strong)",
            borderRadius: "var(--radius-md)",
            boxShadow: "0 12px 32px var(--shadow)",
            padding: 16,
            fontSize: 13.5,
            color: "var(--text-muted)",
            animation: "vb-menu-in 0.15s ease",
          }}
        >
          {children}
        </span>
      )}
    </span>
  );
}

export { Popover as Popper };
