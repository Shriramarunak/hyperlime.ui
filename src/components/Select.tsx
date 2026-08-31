import type { SelectHTMLAttributes } from "react";
import "./../styles/select.css";

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label?: string;
  options?: string[];
  id?: string;
  hint?: string;
  error?: string;
  size?: "sm" | "md" | "lg";
}

export default function Select({ label, options = [], id, hint, error, size = "md", ...props }: SelectProps) {
  return (
    <div className="vb-field">
      {label && (
        <label className="vb-field__label" htmlFor={id}>
          {label}
        </label>
      )}
      <span className={`vb-select vb-select--${size} ${error ? "vb-select--error" : ""}`}>
        <select id={id} className="vb-select__native" {...props}>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <span className="vb-select__chevron">▾</span>
      </span>
      {(error || hint) && <span className={`vb-field__hint ${error ? "vb-field__hint--error" : ""}`}>{error || hint}</span>}
    </div>
  );
}
