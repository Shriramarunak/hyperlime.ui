import "./../styles/toast.css";

export type ToastVariant = "default" | "success" | "warning" | "error" | "info";

export interface ToastProps {
  variant?: ToastVariant;
  title: string;
  description?: string;
  onClose?: () => void;
}

export default function Toast({ variant = "default", title, description, onClose }: ToastProps) {
  return (
    <div className="vb-toast" role="status">
      <span className={`vb-toast__accent vb-toast__accent--${variant}`} />
      <div>
        <div className="vb-toast__title">{title}</div>
        {description && <div className="vb-toast__description">{description}</div>}
      </div>
      {onClose && (
        <button className="vb-toast__close" onClick={onClose} aria-label="Dismiss">
          ✕
        </button>
      )}
    </div>
  );
}
