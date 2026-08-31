import type { CSSProperties, InputHTMLAttributes } from "react";
import "./../styles/misc.css";

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  id?: string;
}

export function Switch({ checked, onChange, label, id }: SwitchProps) {
  return (
    <label className="vb-switch" htmlFor={id}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        role="switch"
      />
      <span className="vb-switch__track">
        <span className="vb-switch__thumb" />
      </span>
      {label && <span className="sr-only">{label}</span>}
    </label>
  );
}

export interface ProgressProps {
  value?: number;
  color?: string;
  size?: "sm" | "md" | "lg";
  striped?: boolean;
  style?: CSSProperties;
}

export function Progress({ value = 0, color, size = "md", striped = false, style }: ProgressProps) {
  return (
    <div
      className={`vb-progress vb-progress--${size} ${striped ? "vb-progress--striped" : ""}`}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      style={style}
    >
      <div className="vb-progress__bar" style={{ width: `${value}%`, ...(color ? { background: color } : {}) }} />
    </div>
  );
}

export interface AvatarProps {
  initials: string;
  size?: "sm" | "md" | "lg";
  color?: string;
  status?: "online" | "offline" | "busy";
}

export function Avatar({ initials, size = "md", color, status }: AvatarProps) {
  return (
    <span className={`vb-avatar vb-avatar--${size} ${status ? `vb-avatar--${status}` : ""}`} style={color ? ({ "--accent": color } as React.CSSProperties) : undefined}>
      {initials}
      {status && <span className={`vb-avatar__status vb-avatar__status--${status}`} />}
    </span>
  );
}

export function Spinner() {
  return <span className="vb-spinner" aria-label="Loading" />;
}

export function Divider() {
  return <hr className="vb-divider" />;
}
