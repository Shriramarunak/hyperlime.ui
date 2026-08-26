export function List({ children, ...props }) {
  return (
    <ul className="vb-list" style={{ listStyle: "none", margin: 0, padding: 0 }} {...props}>
      {children}
    </ul>
  );
}

export function ListItem({ selected, secondary, onClick, children, ...props }) {
  return (
    <li
      className={`vb-list__item ${selected ? "vb-list__item--selected" : ""}`}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 16px",
        fontSize: 14,
        color: selected ? "var(--text)" : "var(--text-muted)",
        cursor: onClick ? "pointer" : "default",
        borderLeft: selected ? "2px solid var(--accent)" : "2px solid transparent",
        background: selected ? "var(--accent-subtle)" : "none",
        transition: "all 0.15s ease",
      }}
      onClick={onClick}
      {...props}
    >
      <span style={{ flex: 1 }}>{children}</span>
      {secondary && <span style={{ fontSize: 12, color: "var(--text-faint)" }}>{secondary}</span>}
    </li>
  );
}

export function ImageList({ items = [], columns = 3 }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: 10,
      }}
    >
      {items.map((item) => (
        <div
          key={item.label}
          style={{
            aspectRatio: "4 / 3",
            borderRadius: "var(--radius-md)",
            background: `linear-gradient(135deg, hsl(${item.hue} 60% 45%), hsl(${item.hue + 40} 60% 35%))`,
            display: "flex",
            alignItems: "flex-end",
            padding: 10,
            color: "white",
            fontSize: 11,
            fontFamily: "var(--font-mono)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
}
