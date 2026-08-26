export function Fade({ show = true, duration = 250, children, ...props }) {
  return (
    <span
      style={{
        display: "inline-block",
        opacity: show ? 1 : 0,
        transition: `opacity ${duration}ms ease`,
        ...props.style,
      }}
    >
      {children}
    </span>
  );
}

export function Collapse({ show = true, duration = 250, children }) {
  return (
    <span
      style={{
        display: "grid",
        gridTemplateRows: show ? "1fr" : "0fr",
        transition: `grid-template-rows ${duration}ms ease`,
      }}
    >
      <span style={{ overflow: "hidden", display: "block" }}>{children}</span>
    </span>
  );
}

export function Slide({ show = true, duration = 250, direction = "up", children }) {
  const offsets = { up: "translateY(16px)", down: "translateY(-16px)", left: "translateX(16px)", right: "translateX(-16px)" };
  return (
    <span
      style={{
        display: "inline-block",
        opacity: show ? 1 : 0,
        transform: show ? "none" : offsets[direction],
        transition: `all ${duration}ms ease`,
      }}
    >
      {children}
    </span>
  );
}
