import "./../styles/button.css";

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}) {
  return (
    <button
      className={`vb-btn vb-btn--${variant} vb-btn--${size} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
