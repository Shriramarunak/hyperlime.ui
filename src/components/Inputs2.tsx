import { useState, type TextareaHTMLAttributes } from "react";
import "./../styles/inputs2.css";

export interface NumberFieldProps {
  label?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  id?: string;
}

export default function NumberField({ label, value, onChange, min = 0, max = 100, step = 1, id }: NumberFieldProps) {
  const clamp = (v: number) => Math.min(max, Math.max(min, v));
  return (
    <div className="vb-field">
      {label && (
        <label className="vb-field__label" htmlFor={id}>
          {label}
        </label>
      )}
      <div className="vb-numberfield">
        <button type="button" onClick={() => onChange(clamp(value - step))} disabled={value <= min} aria-label="Decrease">
          −
        </button>
        <input
          id={id}
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => onChange(clamp(Number(e.target.value)))}
        />
        <button type="button" onClick={() => onChange(clamp(value + step))} disabled={value >= max} aria-label="Increase">
          +
        </button>
      </div>
    </div>
  );
}

export interface AutocompleteProps {
  options?: string[];
  label?: string;
  id?: string;
  placeholder?: string;
}

export function Autocomplete({ options = [], label, id, placeholder = "Start typing..." }: AutocompleteProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const matches = options.filter((o) => o.toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="vb-field">
      {label && (
        <label className="vb-field__label" htmlFor={id}>
          {label}
        </label>
      )}
      <div className="vb-autocomplete">
        <input
          id={id}
          className="vb-input"
          value={selected && query === "" ? selected : query}
          placeholder={placeholder}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelected(null);
            setOpen(true);
          }}
        />
        {open && matches.length > 0 && (
          <div className="vb-autocomplete__list" role="listbox">
            {matches.slice(0, 8).map((opt) => (
              <button
                key={opt}
                type="button"
                className="vb-autocomplete__option"
                role="option"
                aria-selected={selected === opt}
                onMouseDown={() => {
                  setSelected(opt);
                  setQuery("");
                  setOpen(false);
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export interface TextareaAutosizeProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  minRows?: number;
  maxRows?: number;
}

export function TextareaAutosize({ minRows = 2, maxRows = 10, ...props }: TextareaAutosizeProps) {
  return (
    <textarea
      className="vb-textarea"
      rows={minRows}
      onInput={(e) => {
        const target = e.currentTarget;
        target.style.height = "auto";
        const lines = Math.max(minRows, Math.min(maxRows, target.value.split("\n").length));
        target.style.height = `${lines * 24 + 26}px`;
      }}
      {...props}
    />
  );
}

export function TransferList({ items }: { items: string[] }) {
  const [left, setLeft] = useState<string[]>(items);
  const [right, setRight] = useState<string[]>([]);
  const [picked, setPicked] = useState<Set<string>>(new Set());

  const toggle = (item: string) =>
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(item)) {
        next.delete(item);
      } else {
        next.add(item);
      }
      return next;
    });

  const move = (from: string[]) => {
    const moving = [...picked];
    setLeft(from === left ? left.filter((i) => !moving.includes(i)) : [...left, ...moving]);
    setRight(from === left ? [...right, ...moving] : right.filter((i) => !moving.includes(i)));
    setPicked(new Set());
  };

  const renderList = (list: string[], side: string) => (
    <div className="vb-transfer__list" role="listbox" aria-multiselectable="true">
      {list.length === 0 && <div className="vb-transfer__item" style={{ opacity: 0.4 }}>Empty</div>}
      {list.map((item) => (
        <div
          key={item}
          className={`vb-transfer__item ${picked.has(item) ? "vb-transfer__item--selected" : ""}`}
          onClick={() => toggle(item)}
          role="option"
          aria-selected={picked.has(item)}
        >
          <span>{picked.has(item) ? "☑" : "☐"}</span>
          {item}
        </div>
      ))}
      <span style={{ display: "none" }}>{side}</span>
    </div>
  );

  return (
    <div className="vb-transfer">
      {renderList(left, "left")}
      <div className="vb-transfer__middle">
        <button className="vb-btn vb-btn--secondary vb-btn--sm" onClick={() => move(left)} disabled={picked.size === 0}>
          →
        </button>
        <button className="vb-btn vb-btn--secondary vb-btn--sm" onClick={() => move(right)} disabled={picked.size === 0}>
          ←
        </button>
      </div>
      {renderList(right, "right")}
    </div>
  );
}
