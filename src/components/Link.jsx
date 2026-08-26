export default function Link({ href = "#", accent = false, children, ...props }) {
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
      onMouseEnter={(e) => (e.currentTarget.style.opacity = 0.7)}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = 1)}
      {...props}
    >
      {children}
    </a>
  );
}
