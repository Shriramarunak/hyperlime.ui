import "./../styles/data.css";

export function Table({ columns, rows }) {
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

export function Pagination({ page, pageCount, onChange }) {
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
      {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          className={`vb-pagination__page ${p === page ? "vb-pagination__page--active" : ""}`}
          onClick={() => onChange(p)}
          aria-current={p === page ? "page" : undefined}
        >
          {p}
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

export function Breadcrumb({ items }) {
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

export function Skeleton({ width = "100%", height = 14, style }) {
  return <span className="vb-skeleton" style={{ width, height, ...style }} />;
}
