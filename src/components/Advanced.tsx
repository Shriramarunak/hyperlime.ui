import { useState, useMemo, useEffect } from "react";
import "./../styles/blocks.css";

export interface CalendarProps {
  value?: Date;
  onChange?: (date: Date) => void;
}

export function Calendar({ value, onChange }: CalendarProps) {
  const [cursor, setCursor] = useState(value ?? new Date());
  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  const days = useMemo(() => {
    const arr: (number | null)[] = Array(firstDay).fill(null);
    for (let d = 1; d <= daysInMonth; d++) arr.push(d);
    return arr;
  }, [firstDay, daysInMonth]);

  const isSelected = (d: number | null) =>
    d !== null && value && value.getDate() === d && value.getMonth() === month && value.getFullYear() === year;
  const isToday = (d: number | null) =>
    d !== null && today.getDate() === d && today.getMonth() === month && today.getFullYear() === year;

  return (
    <div className="vb-calendar">
      <div className="vb-calendar__header">
        <button className="vb-iconbtn vb-iconbtn--sm" onClick={() => setCursor(new Date(year, month - 1, 1))} aria-label="Previous month">‹</button>
        <span className="vb-calendar__title">
          {cursor.toLocaleString("default", { month: "long" })} {year}
        </span>
        <button className="vb-iconbtn vb-iconbtn--sm" onClick={() => setCursor(new Date(year, month + 1, 1))} aria-label="Next month">›</button>
      </div>
      <div className="vb-calendar__grid">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <span key={d} className="vb-calendar__weekday">{d}</span>
        ))}
        {days.map((d, i) => (
          <button
            key={i}
            className={`vb-calendar__day ${d === null ? "vb-calendar__day--empty" : ""} ${isToday(d) ? "vb-calendar__day--today" : ""} ${isSelected(d) ? "vb-calendar__day--selected" : ""}`}
            disabled={d === null}
            onClick={() => d !== null && onChange?.(new Date(year, month, d))}
          >
            {d ?? ""}
          </button>
        ))}
      </div>
    </div>
  );
}

export interface ColorPickerProps {
  value?: string;
  onChange?: (hex: string) => void;
  presets?: string[];
}

const PRESETS = ["#d6f32f", "#8b7cff", "#4cc9f0", "#ffa94d", "#ff7ac3", "#3ddc97", "#ff6b81", "#0c0c07"];

export function ColorPicker({ value = "#d6f32f", onChange, presets = PRESETS }: ColorPickerProps) {
  return (
    <div className="vb-colorpicker">
      <div className="vb-colorpicker__preview" style={{ background: value }} />
      <div className="vb-colorpicker__swatches">
        {presets.map((hex) => (
          <button
            key={hex}
            className={`vb-colorpicker__swatch ${value === hex ? "vb-colorpicker__swatch--active" : ""}`}
            style={{ background: hex }}
            onClick={() => onChange?.(hex)}
            aria-label={`Select ${hex}`}
          />
        ))}
      </div>
      <input
        className="vb-input"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder="#d6f32f"
        spellCheck={false}
      />
    </div>
  );
}

export interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
}

export interface TreeViewProps {
  nodes: TreeNode[];
  selected?: string;
  onSelect?: (id: string) => void;
}

function TreeNodeView({ node, depth, selected, onSelect, expanded, toggle }: {
  node: TreeNode;
  depth: number;
  selected?: string;
  onSelect?: (id: string) => void;
  expanded: Set<string>;
  toggle: (id: string) => void;
}) {
  const hasChildren = !!node.children?.length;
  const isExpanded = expanded.has(node.id);
  const isSelected = selected === node.id;
  return (
    <div>
      <div
        className={`vb-tree__row ${isSelected ? "vb-tree__row--selected" : ""}`}
        style={{ paddingLeft: 12 + depth * 16 }}
        onClick={() => {
          if (hasChildren) toggle(node.id);
          onSelect?.(node.id);
        }}
      >
        {hasChildren && <span className="vb-tree__chevron" style={{ transform: isExpanded ? "rotate(90deg)" : "none" }}>▸</span>}
        <span>{node.label}</span>
      </div>
      {hasChildren && isExpanded && (
        <div>
          {node.children!.map((child) => (
            <TreeNodeView key={child.id} node={child} depth={depth + 1} selected={selected} onSelect={onSelect} expanded={expanded} toggle={toggle} />
          ))}
        </div>
      )}
    </div>
  );
}

export function TreeView({ nodes, selected, onSelect }: TreeViewProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(nodes.map((n) => n.id)));
  const toggle = (id: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  return (
    <div className="vb-tree">
      {nodes.map((node) => (
        <TreeNodeView key={node.id} node={node} depth={0} selected={selected} onSelect={onSelect} expanded={expanded} toggle={toggle} />
      ))}
    </div>
  );
}

export interface DataGridColumn {
  key: string;
  label: string;
  sortable?: boolean;
}

export interface DataGridProps {
  columns: DataGridColumn[];
  rows: Record<string, unknown>[];
}

export function DataGrid({ columns, rows }: DataGridProps) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [dir, setDir] = useState<"asc" | "desc">("asc");

  const sorted = useMemo(() => {
    if (!sortKey) return rows;
    return [...rows].sort((a, b) => {
      const av = String(a[sortKey] ?? "");
      const bv = String(b[sortKey] ?? "");
      const cmp = av.localeCompare(bv, undefined, { numeric: true });
      return dir === "asc" ? cmp : -cmp;
    });
  }, [rows, sortKey, dir]);

  const toggleSort = (key: string) => {
    if (sortKey === key) setDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setDir("asc");
    }
  };

  return (
    <div className="vb-datagrid">
      <table className="vb-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} onClick={() => col.sortable && toggleSort(col.key)} style={{ cursor: col.sortable ? "pointer" : undefined, userSelect: "none" }}>
                {col.label}
                {col.sortable && sortKey === col.key && (dir === "asc" ? " ↑" : " ↓")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => (
            <tr key={i}>
              {columns.map((col) => (
                <td key={col.key}>{String(row[col.key] ?? "")}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export interface CarouselProps {
  items: string[];
  autoPlay?: boolean;
}

export function Carousel({ items, autoPlay = false }: CarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!autoPlay || paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), 3000);
    return () => clearInterval(id);
  }, [autoPlay, paused, items.length]);

  return (
    <div
      className="vb-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="vb-carousel__track" style={{ transform: `translateX(-${index * 100}%)` }}>
        {items.map((item, i) => (
          <div key={i} className="vb-carousel__slide">
            {item}
          </div>
        ))}
      </div>
      <div className="vb-carousel__controls">
        <button className="vb-iconbtn vb-iconbtn--sm" onClick={() => setIndex((i) => (i - 1 + items.length) % items.length)} aria-label="Previous">‹</button>
        <div className="vb-carousel__dots">
          {items.map((_, i) => (
            <button
              key={i}
              className={`vb-carousel__dot ${i === index ? "vb-carousel__dot--active" : ""}`}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        <button className="vb-iconbtn vb-iconbtn--sm" onClick={() => setIndex((i) => (i + 1) % items.length)} aria-label="Next">›</button>
      </div>
    </div>
  );
}
