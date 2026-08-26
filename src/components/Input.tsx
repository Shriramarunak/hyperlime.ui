import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
import "./../styles/input.css";

export interface FieldProps {
  label?: string;
  hint?: string;
  error?: string;
  id?: string;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement>, FieldProps {
  leading?: ReactNode;
  trailing?: ReactNode;
}

export default function Input({ label, hint, error, id, leading, trailing, ...props }: InputProps) {
  const hintId = id ? `${id}-hint` : undefined;
  const wrapped = !!(leading || trailing);
  const input = (
    <input
      id={id}
      className={`vb-input ${error ? "vb-input--error" : ""}`}
      aria-invalid={!!error || undefined}
      aria-describedby={error || hint ? hintId : undefined}
      {...props}
    />
  );
  return (
    <div className="vb-field">
      {label && (
        <label className="vb-field__label" htmlFor={id}>
          {label}
        </label>
      )}
      {wrapped ? (
        <div
          className={`vb-inputwrap ${error ? "vb-inputwrap--error" : ""}`}
          onClick={(e) => e.currentTarget.querySelector("input")?.focus()}
        >
          {leading && <span className="vb-inputwrap__adorn">{leading}</span>}
          {input}
          {trailing && <span className="vb-inputwrap__adorn vb-inputwrap__adorn--end">{trailing}</span>}
        </div>
      ) : (
        input
      )}
      {(error || hint) && (
        <span id={hintId} className={`vb-field__hint ${error ? "vb-field__hint--error" : ""}`}>
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
