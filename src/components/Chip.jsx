import "./../styles/chip.css";

export function Chip({ variant = "default", onRemove, children }) {
  return (
    <span className={`vb-chip vb-chip--${variant}`}>
      {children}
      {onRemove && (
        <button className="vb-chip__remove" onClick={onRemove} aria-label="Remove">
          ✕
        </button>
      )}
    </span>
  );
}

export function IconButton({ variant = "default", size = "md", label, children, ...props }) {
  return (
    <button
      className={`vb-iconbtn vb-iconbtn--${size} ${variant === "accent" ? "vb-iconbtn--accent" : ""}`}
      aria-label={label}
      title={label}
      {...props}
    >
      {children}
    </button>
  );
}
