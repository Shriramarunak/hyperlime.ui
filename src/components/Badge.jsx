import "./../styles/badge.css";

export default function Badge({ variant = "default", dot = false, children, ...props }) {
  return (
    <span className={`vb-badge vb-badge--${variant}`} {...props}>
      {dot && <span className="vb-badge__dot" />}
      {children}
    </span>
  );
}
