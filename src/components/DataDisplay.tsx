import type { CSSProperties, ReactNode } from "react";
import "./../styles/data.css";

export interface TableProps {
  columns: string[];
  rows: ReactNode[][];
}

export function Table({ columns, rows }: TableProps) {
  return (
    <table className="vb-table">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td key={j}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export interface PaginationProps {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
}

export function Pagination({ page, pageCount, onChange }: PaginationProps) {
  return (
    <nav className="vb-pagination" aria-label="Pagination">
      <button
        className="vb-pagination__page"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        aria-label="Previous page"
      >
        ←
      </button>
      {Array.from({ length: pageCount }, (_, i) => i + 1).map((pg) => (
        <button
          key={pg}
          className={`vb-pagination__page ${pg === page ? "vb-pagination__page--active" : ""}`}
          onClick={() => onChange(pg)}
          aria-current={pg === page ? "page" : undefined}
        >
          {pg}
        </button>
      ))}
      <button
        className="vb-pagination__page"
        disabled={page === pageCount}
        onClick={() => onChange(page + 1)}
        aria-label="Next page"
      >
        →
      </button>
    </nav>
  );
}

export interface BreadcrumbProps {
  items: string[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="vb-breadcrumb" aria-label="Breadcrumb">
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <span key={item} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            {last ? (
              <span className="vb-breadcrumb__current">{item}</span>
            ) : (
              <a
                className="vb-breadcrumb__link"
                onClick={(e) => e.preventDefault()}
                href="#"
              >
                {item}
              </a>
            )}
            {!last && <span className="vb-breadcrumb__sep">/</span>}
          </span>
        );
      })}
    </nav>
  );
}

export interface SkeletonProps {
  width?: number | string;
  height?: number;
  style?: CSSProperties;
}

export function Skeleton({ width = "100%", height = 14, style }: SkeletonProps) {
  return <span className="vb-skeleton" style={{ width, height, ...style }} />;
}
