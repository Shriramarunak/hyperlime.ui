import type { SelectHTMLAttributes } from "react";
import "./../styles/select.css";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options?: string[];
  id?: string;
}

export default function Select({ label, options = [], id, ...props }: SelectProps) {
  return (
    <div className="vb-field">
      {label && (
        <label className="vb-field__label" htmlFor={id}>
          {label}
        </label>
      )}
      <span className="vb-select">
        <select id={id} className="vb-select__native" {...props}>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <span className="vb-select__chevron">▾</span>
      </span>
    </div>
  );
}
