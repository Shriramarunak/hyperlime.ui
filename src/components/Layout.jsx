export function Container({ maxWidth = 1100, children, ...props }) {
  return (
    <div
      style={{ maxWidth, margin: "0 auto", padding: "0 24px", width: "100%" }}
      {...props}
    >
      {children}
    </div>
  );
}

export function Stack({ direction = "column", spacing = 2, children, ...props }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: direction,
        gap: `${spacing * 8}px`,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export function Grid({ columns = 2, spacing = 2, children, ...props }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap: `${spacing * 8}px`,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export function Box(props) {
  return <div {...props} />;
}
