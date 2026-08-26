import { useEffect, useRef, useState } from "react";
import "./../styles/navigation.css";

export function ClickAwayListener({ onClickAway, children }) {
  const ref = useRef(null);
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClickAway(e);
    };
    document.addEventListener("pointerdown", handler);
    return () => document.removeEventListener("pointerdown", handler);
  }, [onClickAway]);
  return (
    <span ref={ref} style={{ display: "inline-flex" }}>
      {children}
    </span>
  );
}

export default function Menu({ trigger, items = [], onSelect }) {
  const [open, setOpen] = useState(false);
  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <span className="vb-menu">
        <span onClick={() => setOpen(!open)}>{trigger}</span>
        {open && (
          <div className="vb-menu__panel" role="menu">
            {items.map((item) => (
              <button
                key={item.label}
                className="vb-menu__item"
                role="menuitem"
                onClick={() => {
                  onSelect?.(item.label);
                  setOpen(false);
                }}
              >
                {item.icon && <span className="vb-menu__icon">{item.icon}</span>}
                {item.label}
              </button>
            ))}
          </div>
        )}
      </span>
    </ClickAwayListener>
  );
}

export function Drawer({ open, onClose, side = "left", title, children }) {
  return (
    <>
      {open && <div className="vb-drawer__overlay" onClick={onClose} />}
      <div
        className={`vb-drawer vb-drawer--${side} ${open ? "vb-drawer--open" : ""}`}
        role="dialog"
        aria-label={title}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 20px 12px" }}>
          <strong style={{ fontSize: 15 }}>{title}</strong>
          <button className="vb-modal__close" onClick={onClose} aria-label="Close drawer">✕</button>
        </div>
        <div style={{ padding: "0 20px 20px", fontSize: 14, color: "var(--text-muted)" }}>{children}</div>
      </div>
    </>
  );
}

export function BottomNavigation({ items = [], value, onChange }) {
  return (
    <nav className="vb-bottomnav">
      {items.map((item) => (
        <button
          key={item.label}
          className={`vb-bottomnav__item ${value === item.label ? "vb-bottomnav__item--active" : ""}`}
          onClick={() => onChange(item.label)}
          aria-current={value === item.label ? "page" : undefined}
        >
          <span className="vb-bottomnav__icon">{item.icon}</span>
          {item.label}
        </button>
      ))}
    </nav>
  );
}

export function Backdrop({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="vb-backdrop" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
}
