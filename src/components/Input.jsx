import "./../styles/input.css";

export default function Input({ label, hint, error, id, ...props }) {
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

export function Textarea({ label, hint, error, id, ...props }) {
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
