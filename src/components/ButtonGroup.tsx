import { useState, type ReactNode } from "react";
import "./../styles/inputs2.css";

export interface ButtonGroupProps {
  children: ReactNode;
}

export default function ButtonGroup({ children, ...props }: ButtonGroupProps) {
  return (
    <div className="vb-buttongroup" role="group" {...props}>
      {children}
    </div>
  );
}

export interface ToggleButtonGroupProps {
  options: string[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
}

export function ToggleButtonGroup({ options, value, onChange, multiple = false }: ToggleButtonGroupProps) {
  const toggle = (opt: string) => {
    if (multiple) {
      const current = Array.isArray(value) ? value : [];
      onChange(current.includes(opt) ? current.filter((v) => v !== opt) : [...current, opt]);
    } else {
      onChange(opt);
    }
  };
  return (
    <div className="vb-togglegroup" role="group">
      {options.map((opt) => (
        <button
          key={opt}
          className={`vb-togglegroup__btn ${(multiple ? Array.isArray(value) && value.includes(opt) : value === opt) ? "vb-togglegroup__btn--active" : ""}`}
          aria-pressed={multiple ? Array.isArray(value) && value.includes(opt) : value === opt}
          onClick={() => toggle(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export interface FabProps {
  icon?: ReactNode;
  label: string;
  onClick?: () => void;
}

export function Fab({ icon = "+", label, onClick, ...props }: FabProps) {
  return (
    <button className="vb-fab" onClick={onClick} aria-label={label} title={label} {...props}>
      {icon}
    </button>
  );
}

export interface SpeedDialAction {
  label: string;
  icon: ReactNode;
  onSelect?: () => void;
}

export interface SpeedDialProps {
  actions?: SpeedDialAction[];
}

export function SpeedDial({ actions = [] }: SpeedDialProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="vb-speeddial">
      {open &&
        [...actions].reverse().map((a) => (
          <button
            key={a.label}
            className="vb-speeddial__action"
            onClick={() => {
              a.onSelect?.();
              setOpen(false);
            }}
          >
            <span className="vb-speeddial__label">{a.label}</span>
            <span className="vb-speeddial__mini">{a.icon}</span>
          </button>
        ))}
      <button className="vb-fab vb-speeddial__trigger" onClick={() => setOpen(!open)} aria-label="Speed dial" aria-expanded={open}>
        {open ? "✕" : "+"}
      </button>
    </div>
  );
}
