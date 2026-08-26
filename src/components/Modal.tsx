import { useEffect, type ReactNode } from "react";
import "./../styles/modal.css";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  footer?: ReactNode;
  children?: ReactNode;
}

export default function Modal({ open, onClose, title, footer, children }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="vb-modal-overlay" onClick={onClose}>
      <div
        className="vb-modal"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="vb-modal__header">
          <h3 className="vb-modal__title">{title}</h3>
          <button className="vb-modal__close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <div className="vb-modal__body">{children}</div>
        {footer && <div className="vb-modal__footer">{footer}</div>}
      </div>
    </div>
  );
}
