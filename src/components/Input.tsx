import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import "./../styles/input.css";

export interface FieldProps {
  label?: string;
  hint?: string;
  error?: string;
  id?: string;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement>, FieldProps {}

export default function Input({ label, hint, error, id, ...props }: InputProps) {
  const hintId = id ? `${id}-hint` : undefined;
  return (
    <div className="vb-field">
      {label && (
        <label className="vb-field__label" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        id={id}
        className={`vb-input ${error ? "vb-input--error" : ""}`}
        aria-invalid={!!error || undefined}
        aria-describedby={error || hint ? hintId : undefined}
        {...props}
      />
      {(error || hint) && (
        <span
          id={hintId}
          className={`vb-field__hint ${error ? "vb-field__hint--error" : ""}`}
        >
          {error || hint}
        </span>
      )}
    </div>
  );
}

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, FieldProps {}

export function Textarea({ label, hint, error, id, ...props }: TextareaProps) {
  const hintId = id ? `${id}-hint` : undefined;
  return (
    <div className="vb-field">
      {label && (
        <label className="vb-field__label" htmlFor={id}>
          {label}
        </label>
      )}
      <textarea
        id={id}
        className="vb-textarea"
        aria-invalid={!!error || undefined}
        aria-describedby={error || hint ? hintId : undefined}
        {...props}
      />
      {(error || hint) && (
        <span
          id={hintId}
          className={`vb-field__hint ${error ? "vb-field__hint--error" : ""}`}
        >
          {error || hint}
        </span>
      )}
    </div>
  );
}
