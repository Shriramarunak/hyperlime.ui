import { useMemo, useState } from "react";
import { Button, Badge, Card, Alert, Input, Select, Checkbox, Switch, Chip, Avatar } from "./components";

function SelectControl({ label, value, options, onChange }) {
  return (
    <label className="pg-control">
      <span className="mono-label pg-control__label">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

function TextControl({ label, value, onChange, placeholder }) {
  return (
    <label className="pg-control">
      <span className="mono-label pg-control__label">{label}</span>
      <input value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

function codeForButton({ variant, size, disabled, children }) {
  const props = [];
  if (variant !== "primary") props.push(`variant="${variant}"`);
  if (size !== "md") props.push(`size="${size}"`);
  if (disabled) props.push("disabled");
  return `<Button${props.length ? " " + props.join(" ") : ""}>${children}</Button>`;
}

function codeForBadge({ variant, dot, children }) {
  const props = [];
  if (variant !== "default") props.push(`variant="${variant}"`);
  if (dot) props.push("dot");
  return `<Badge${props.length ? " " + props.join(" ") : ""}>${children}</Badge>`;
}

function ButtonPlayground() {
  const [variant, setVariant] = useState("primary");
  const [size, setSize] = useState("md");
  const [disabled, setDisabled] = useState(false);
  const [label, setLabel] = useState("Ship it");
  const code = useMemo(() => codeForButton({ variant, size, disabled, children: label }), [variant, size, disabled, label]);
  return (
    <div className="pg">
      <div className="pg-preview">
        <Button variant={variant} size={size} disabled={disabled}>{label}</Button>
      </div>
      <div className="pg-controls">
        <SelectControl label="variant" value={variant} options={["primary", "secondary", "ghost", "danger"]} onChange={setVariant} />
        <SelectControl label="size" value={size} options={["sm", "md", "lg"]} onChange={setSize} />
        <label className="pg-control pg-control--check">
          <input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} />
          <span className="mono-label">disabled</span>
        </label>
        <TextControl label="children" value={label} onChange={setLabel} placeholder="Label" />
      </div>
      <pre className="pg-code"><code>{code}</code></pre>
    </div>
  );
}

function BadgePlayground() {
  const [variant, setVariant] = useState("accent");
  const [dot, setDot] = useState(true);
  const [label, setLabel] = useState("v2.0");
  const code = useMemo(() => codeForBadge({ variant, dot, children: label }), [variant, dot, label]);
  return (
    <div className="pg">
      <div className="pg-preview"><Badge variant={variant} dot={dot}>{label}</Badge></div>
      <div className="pg-controls">
        <SelectControl label="variant" value={variant} options={["default", "accent", "success", "warning", "error"]} onChange={setVariant} />
        <label className="pg-control pg-control--check">
          <input type="checkbox" checked={dot} onChange={(e) => setDot(e.target.checked)} />
          <span className="mono-label">dot</span>
        </label>
        <TextControl label="children" value={label} onChange={setLabel} placeholder="Text" />
      </div>
      <pre className="pg-code"><code>{code}</code></pre>
    </div>
  );
}

function CardPlayground() {
  const [title, setTitle] = useState("Pro plan");
  const [description, setDescription] = useState("For teams shipping fast.");
  const [hoverable, setHoverable] = useState(true);
  const [accent, setAccent] = useState(false);
  return (
    <div className="pg">
      <div className="pg-preview">
        <Card title={title} description={description} hoverable={hoverable} accent={accent} style={{ maxWidth: 360 }}>
          Unlimited projects · Priority support
        </Card>
      </div>
      <div className="pg-controls">
        <TextControl label="title" value={title} onChange={setTitle} placeholder="Title" />
        <TextControl label="description" value={description} onChange={setDescription} placeholder="Subtitle" />
        <label className="pg-control pg-control--check"><input type="checkbox" checked={hoverable} onChange={(e) => setHoverable(e.target.checked)} /><span className="mono-label">hoverable</span></label>
        <label className="pg-control pg-control--check"><input type="checkbox" checked={accent} onChange={(e) => setAccent(e.target.checked)} /><span className="mono-label">accent</span></label>
      </div>
    </div>
  );
}

function AlertPlayground() {
  const [variant, setVariant] = useState("success");
  const [title, setTitle] = useState("Build passed");
  return (
    <div className="pg">
      <div className="pg-preview">
        <Alert variant={variant} title={title}>Deployed in 42s.</Alert>
      </div>
      <div className="pg-controls">
        <SelectControl label="variant" value={variant} options={["info", "success", "warning", "error"]} onChange={setVariant} />
        <TextControl label="title" value={title} onChange={setTitle} placeholder="Title" />
      </div>
    </div>
  );
}

const PLAYGROUNDS = {
  button: ButtonPlayground,
  badge: BadgePlayground,
  card: CardPlayground,
  alert: AlertPlayground,
};

export function ComponentPlayground({ id }) {
  const Playground = PLAYGROUNDS[id];
  if (!Playground) return null;
  return (
    <div className="docpage__playground">
      <h4 className="docpage__sub">Playground</h4>
      <Playground />
    </div>
  );
}
