import type { ReactNode } from "react";
import "./../styles/blocks.css";
import { Avatar } from "./Misc";

export interface AvatarGroupProps {
  people: { initials: string }[];
  max?: number;
}

export function AvatarGroup({ people, max = 3 }: AvatarGroupProps) {
  const shown = people.slice(0, max);
  const extra = people.length - shown.length;
  return (
    <div className="vb-avatargroup">
      {shown.map((person, i) => (
        <Avatar key={i} initials={person.initials} />
      ))}
      {extra > 0 && <span className="vb-avatargroup__more">+{extra}</span>}
    </div>
  );
}

export interface ProgressRingProps {
  value?: number;
  size?: number;
  stroke?: number;
  color?: string;
  showValue?: boolean;
}

export function ProgressRing({ value = 0, size = 72, stroke = 6, color = "var(--accent)", showValue = true }: ProgressRingProps) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(100, Math.max(0, value)) / 100) * circumference;
  return (
    <span className="vb-progressring" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--bg-hover)" strokeWidth={stroke} />
        <circle
          className="vb-progressring__circle"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      {showValue && <span className="vb-progressring__value">{Math.round(value)}%</span>}
    </span>
  );
}

export interface StatProps {
  label: string;
  value: string;
  delta?: string;
  trend?: "up" | "down";
}

export function Stat({ label, value, delta, trend }: StatProps) {
  return (
    <div className="vb-stat">
      <span className="vb-stat__label">{label}</span>
      <div className="vb-stat__row">
        <span className="vb-stat__value">{value}</span>
        {delta && <span className={`vb-stat__delta vb-stat__delta--${trend === "down" ? "down" : "up"}`}>{trend === "down" ? "↓" : "↑"} {delta}</span>}
      </div>
    </div>
  );
}

export interface TimelineItem {
  title: string;
  description?: string;
  time?: string;
  color?: "accent" | "green" | "red" | "muted";
}

export interface TimelineProps {
  items?: TimelineItem[];
}

export function Timeline({ items = [] }: TimelineProps) {
  return (
    <div className="vb-timeline">
      {items.map((item, i) => (
        <div key={i} className="vb-timeline__item">
          <span className={`vb-timeline__dot ${item.color && item.color !== "accent" ? `vb-timeline__dot--${item.color}` : ""}`} />
          <div className="vb-timeline__content">
            <span className="vb-timeline__title">{item.title}</span>
            {item.description && <span className="vb-timeline__desc">{item.description}</span>}
            {item.time && <span className="vb-timeline__time">{item.time}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

export interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: "lime" | "green" | "red" | "blue";
  area?: boolean;
}

export function Sparkline({ data, width = 120, height = 36, color = "lime", area = false }: SparklineProps) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return [x, y] as const;
  });
  const line = points.map(([x, y]) => `${x},${y}`).join(" ");
  const areaPath = `M0,${height} L${line.replaceAll(" ", " L")} L${width},${height} Z`;
  return (
    <svg className={`vb-sparkline ${color !== "lime" ? `vb-sparkline--${color}` : ""}`} width={width} height={height} aria-hidden="true">
      {area && <path className="vb-sparkline__area" d={areaPath} />}
      <polyline className="vb-sparkline__line" points={line} />
    </svg>
  );
}

export interface BannerProps {
  variant?: "accent" | "dark";
  onClose?: () => void;
  children: ReactNode;
}

export function Banner({ variant = "accent", onClose, children }: BannerProps) {
  return (
    <div className={`vb-banner vb-banner--${variant}`} role="status">
      <span>{children}</span>
      {onClose && (
        <button className="vb-banner__close" onClick={onClose} aria-label="Dismiss">
          ✕
        </button>
      )}
    </div>
  );
}
