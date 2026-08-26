import "./../styles/badge.css";

export default function Badge({ variant = "default", dot = false, children }) {
  return (
    <span className={`vb-badge vb-badge--${variant}`}>
      {dot && <span className="vb-badge__dot" />}
      {children}
    </span>
  );
}
