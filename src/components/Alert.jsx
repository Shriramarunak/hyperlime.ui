import "./../styles/alert.css";

const icons = {
  info: "ⓘ",
  success: "✓",
  warning: "⚠",
  error: "✕",
};

export default function Alert({ variant = "info", title, children }) {
  return (
    <div className={`vb-alert vb-alert--${variant}`} role="alert">
      <span className="vb-alert__icon">{icons[variant]}</span>
      <div>
        {title && <div className="vb-alert__title">{title}</div>}
        <div className="vb-alert__content">{children}</div>
      </div>
    </div>
  );
}
