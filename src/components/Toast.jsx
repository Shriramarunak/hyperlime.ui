import "./../styles/toast.css";

export default function Toast({ variant = "default", title, description, onClose }) {
  return (
    <div className="vb-toast" role="status">
      <span className={`vb-toast__accent vb-toast__accent--${variant}`} />
      <div>
        <div className="vb-toast__title">{title}</div>
        {description && <div className="vb-toast__description">{description}</div>}
      </div>
      <button className="vb-toast__close" onClick={onClose} aria-label="Dismiss">
        ✕
      </button>
    </div>
  );
}
