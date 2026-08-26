import { useState } from "react";
import "./../styles/inputs2.css";

export default function ButtonGroup({ children, ...props }) {
  return (
    <div className="vb-buttongroup" role="group" {...props}>
      {children}
    </div>
  );
}

export function ToggleButtonGroup({ options, value, onChange, multiple = false }) {
  const toggle = (opt) => {
    if (multiple) {
      onChange(value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt]);
    } else {
      onChange(opt);
    }
  };
  return (
    <div className="vb-togglegroup" role="group">
      {options.map((opt) => (
        <button
          key={opt}
          className={`vb-togglegroup__btn ${ (multiple ? value.includes(opt) : value === opt) ? "vb-togglegroup__btn--active" : ""}`}
          aria-pressed={multiple ? value.includes(opt) : value === opt}
          onClick={() => toggle(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export function Fab({ icon = "+", label, onClick, ...props }) {
  return (
    <button className="vb-fab" onClick={onClick} aria-label={label} title={label} {...props}>
      {icon}
    </button>
  );
}

export function SpeedDial({ actions = [] }) {
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
