import "./../styles/controls.css";

export function Checkbox({ label, checked, onChange, id }) {
  return (
    <label className="vb-checkbox" htmlFor={id}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
      />
      {label}
    </label>
  );
}

export function RadioGroup({ name, options, value, onChange }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {options.map((opt) => (
        <label key={opt} className="vb-radio">
          <input
            type="radio"
            name={name}
            value={opt}
            checked={value === opt}
            onChange={() => onChange(opt)}
          />
          {opt}
        </label>
      ))}
    </div>
  );
}

export function Slider({ value, onChange, min = 0, max = 100, label }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {label && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 13,
            fontWeight: 600,
            color: "var(--text-muted)",
          }}
        >
          <span>{label}</span>
          <span style={{ fontFamily: "var(--font-mono)", color: "var(--accent)" }}>
            {value}
          </span>
        </div>
      )}
      <input
        type="range"
        className="vb-slider"
        value={value}
        min={min}
        max={max}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}

export function Kbd({ children }) {
  return <kbd className="vb-kbd">{children}</kbd>;
}
