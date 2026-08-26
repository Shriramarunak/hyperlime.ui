import "./../styles/tooltip.css";

export default function Tooltip({ label, children }) {
  return (
    <span className="vb-tooltip" tabIndex={0}>
      {children}
      <span className="vb-tooltip__bubble" role="tooltip">
        {label}
      </span>
    </span>
  );
}
