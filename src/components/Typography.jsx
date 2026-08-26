const VARIANTS = {
  h1: { fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.1 },
  h2: { fontSize: "clamp(1.6rem, 3.4vw, 2.2rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15 },
  h3: { fontSize: "1.35rem", fontWeight: 700, letterSpacing: "-0.02em" },
  h4: { fontSize: "1.1rem", fontWeight: 700 },
  h5: { fontSize: "0.95rem", fontWeight: 700 },
  h6: { fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" },
  subtitle: { fontSize: "1.1rem", fontWeight: 500, color: "var(--text-muted)", lineHeight: 1.5 },
  body1: { fontSize: "1rem", color: "var(--text-muted)", lineHeight: 1.7 },
  body2: { fontSize: "0.875rem", color: "var(--text-muted)", lineHeight: 1.65 },
  caption: { fontSize: "0.75rem", color: "var(--text-faint)" },
  mono: { fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--text-muted)" },
};

export default function Typography({ variant = "body1", as, style, children, ...props }) {
  const Tag = as || (variant.startsWith("h") ? variant : "p");
  return (
    <Tag style={{ margin: 0, ...VARIANTS[variant], ...style }} {...props}>
      {children}
    </Tag>
  );
}
