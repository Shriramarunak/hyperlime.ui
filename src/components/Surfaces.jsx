export function Paper({ elevation = 0, children, style, ...props }) {
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

export function AppBar({ children, style, ...props }) {
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
