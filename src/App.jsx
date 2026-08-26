import { useEffect, useState } from "react";
import {
  Button,
  Badge,
  Card,
  Alert,
  Input,
  Textarea,
  Switch,
  Progress,
  Avatar,
  Spinner,
  Tabs,
  Modal,
  Tooltip,
  Toast,
  Select,
  Accordion,
  Table,
  Pagination,
  Breadcrumb,
  Skeleton,
  Checkbox,
  RadioGroup,
  Slider,
  Kbd,
} from "./components";
import "./App.css";

const ACCENTS = [
  { name: "lime", accent: "#d6f32f", hover: "#e4ff4d" },
  { name: "violet", accent: "#8b7cff", hover: "#a396ff" },
  { name: "cyan", accent: "#4cc9f0", hover: "#7dd8f5" },
  { name: "orange", accent: "#ffa94d", hover: "#ffbf7d" },
  { name: "pink", accent: "#ff7ac3", hover: "#ff9dd2" },
];

function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    return localStorage.getItem("vb-theme") || "dark";
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("vb-theme", theme);
  }, [theme]);
  return [theme, () => setTheme((t) => (t === "dark" ? "light" : "dark"))];
}

function useAccent() {
  const [accent, setAccent] = useState(ACCENTS[0]);
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--accent", accent.accent);
    root.style.setProperty("--accent-hover", accent.hover);
    root.style.setProperty(
      "--accent-subtle",
      `color-mix(in srgb, ${accent.accent} 14%, transparent)`
    );
  }, [accent]);
  return [accent, setAccent];
}

function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };
  return (
    <div className="codeblock">
      <button className="codeblock__copy mono-label" onClick={copy}>
        {copied ? "COPIED" : "COPY"}
      </button>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}

function Preview({ name, code, children, span = false }) {
  const [showCode, setShowCode] = useState(false);
  return (
    <div className={`preview ${span ? "preview--span" : ""}`}>
      <div className="preview__bar">
        <span className="preview__label mono-label">{name}</span>
        {code && (
          <button
            className="preview__toggle mono-label"
            onClick={() => setShowCode(!showCode)}
          >
            {showCode ? "HIDE CODE" : "</> CODE"}
          </button>
        )}
      </div>
      {showCode && code ? <CodeBlock code={code} /> : null}
      <div className="preview__stage">{children}</div>
    </div>
  );
}

function Nav({ onToggleTheme, theme }) {
  return (
    <nav className="nav">
      <div className="container nav__inner">
        <a href="#" className="nav__logo">
          vibe<span className="lime">.ui</span>
        </a>
        <div className="nav__links">
          <a href="#components">COMPONENTS</a>
          <a href="#customize">CUSTOMIZE</a>
          <a href="#install">INSTALL</a>
          <Button variant="secondary" size="sm" onClick={onToggleTheme} aria-label="Toggle theme">
            {theme === "dark" ? "LIGHT" : "DARK"}
          </Button>
        </div>
      </div>
    </nav>
  );
}

function Playground() {
  return (
    <div className="playground">
      <div className="playground__chrome">
        <span /><span /><span />
        <span className="playground__title mono-label">APP.TSX — GENERATED FROM ONE PROMPT</span>
      </div>
      <div className="playground__panes">
        <pre className="playground__code"><code>{`<Card title="Deploy to production"
      description="main · build #421">
  <Badge variant="success" dot>passing</Badge>
  <Input label="Region" placeholder="eu-1" />
  <Button>Ship it</Button>
</Card>`}</code></pre>
        <div className="playground__result">
          <Card
            title="Deploy to production"
            description="main · build #421"
            footer={<Button size="sm">Ship it</Button>}
          >
            <div className="stack-sm">
              <Badge variant="success" dot style={{ alignSelf: "flex-start" }}>passing</Badge>
              <Input id="pg-region" label="Region" placeholder="eu-1" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <header className="hero">
      <div className="hero__label mono-label">
        <span className="dot" /> AN OPEN-SOURCE UI LIBRARY FOR VIBE-CODED APPS
      </div>
      <h1 className="hero__title">Hi, builders.</h1>
      <p className="hero__subtitle">
        <span className="lime">Zero config.</span> Components that LLMs write
        correctly on the first try.
      </p>

      <div className="note">
        <p>
          I asked an AI to build my app and it produced{" "}
          <strong>working UI</strong> on the first prompt. Total dumb luck — I
          just like <strong>.ui</strong> libraries.
        </p>
        <p className="mono-label note__aside">
          LEFT IS THE CODE. RIGHT IS THE LIVE RESULT.
        </p>
      </div>

      <div className="hero__actions">
        <Button size="lg" onClick={() => document.getElementById("install")?.scrollIntoView({ behavior: "smooth" })}>
          npm i vibe-ui
        </Button>
        <Button variant="secondary" size="lg" onClick={() => document.getElementById("components")?.scrollIntoView({ behavior: "smooth" })}>
          BROWSE COMPONENTS ↓
        </Button>
      </div>

      <Playground />
    </header>
  );
}

function Marquee() {
  const items = [
    "ZERO DEPENDENCIES",
    "MIT LICENSED",
    "TOKEN-FRIENDLY MARKUP",
    "LIGHT + DARK",
    "CSS VARIABLES",
    "BUILT FOR PROMPTS",
  ];
  const strip = [...items, ...items];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {[0, 1].map((half) => (
          <div key={half} className="marquee__half">
            {strip.map((item, i) => (
              <span key={i} className="marquee__item mono-label">{item} ✦</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Install() {
  return (
    <section id="install" className="section install">
      <div className="container">
        <h2 className="section__title">
          Ship in seconds<span className="lime">.</span>
        </h2>
        <div className="install-cmd">
          <code>$ npm i vibe-ui</code>
          <span className="mono-label">THAT'S THE WHOLE SETUP</span>
        </div>
        <CodeBlock code={`import { Button, Card, Input } from "vibe-ui";

export default function Deploy() {
  return (
    <Card title="Deploy to production">
      <Input label="Branch" placeholder="main" />
      <Button>Ship it</Button>
    </Card>
  );
}`} />
        <p className="install__note mono-label">
          OR PASTE THE IMPORT BLOCK STRAIGHT INTO YOUR AI PROMPT. IT KNOWS WHAT TO DO.
        </p>
      </div>
    </section>
  );
}

function ModalDemo({ open, onClose }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Delete deployment?"
      footer={
        <>
          <Button variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
          <Button variant="danger" size="sm" onClick={onClose}>Delete</Button>
        </>
      }
    >
      This will tear down <strong style={{ color: "var(--text)" }}>prod-eu-1</strong>.
      There is no undo. There never is.
    </Modal>
  );
}

function ToastDemo() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setVisible(false), 3200);
    return () => clearTimeout(t);
  }, [visible]);
  return (
    <>
      <Button size="sm" onClick={() => setVisible(true)}>Trigger toast</Button>
      {visible && (
        <div className="toast-anchor">
          <Toast
            title="Deployment queued"
            description="prod-eu-1 · rolling out now"
            onClose={() => setVisible(false)}
          />
        </div>
      )}
    </>
  );
}

const SNIPPETS = {
  buttons: `<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>
<Button disabled>Disabled</Button>
<Button><Spinner /> Loading</Button>`,
  badges: `<Badge>default</Badge>
<Badge variant="accent">v2.0</Badge>
<Badge variant="success" dot>deployed</Badge>
<Tooltip label="Neon, as promised">
  <Button variant="secondary" size="sm">Hover me</Button>
</Tooltip>`,
  tabs: `const tabs = [
  { label: "Preview", content: "Live preview." },
  { label: "Logs", content: "build finished in 42s" },
];

<Tabs tabs={tabs} initial={0} />`,
  inputs: `<Input label="Email" placeholder="ada@lovelace.dev"
       hint="We never share your email." />

<Input label="API key" error="Invalid key format." />

<Textarea label="Prompt" placeholder="Describe it..." />

<Select label="Region" options={["eu-1", "us-1"]} />`,
};

function Gallery() {
  const [plan, setPlan] = useState("Hobby");
  const [temp, setTemp] = useState(70);
  const [modalOpen, setModalOpen] = useState(false);
  const [newsletter, setNewsletter] = useState(true);
  const [page, setPage] = useState(2);

  return (
    <section id="components" className="section">
      <div className="container">
        <h2 className="section__title">
          Components<span className="lime">,</span> live
        </h2>

        <div className="preview-grid">
          <Preview name="Buttons" code={SNIPPETS.buttons}>
            <div className="row wrap">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button disabled>Disabled</Button>
              <Button><Spinner /> Loading</Button>
            </div>
          </Preview>

          <Preview name="Badges & tooltips" code={SNIPPETS.badges}>
            <div className="row wrap">
              <Badge>default</Badge>
              <Badge variant="accent">v2.0</Badge>
              <Badge variant="success" dot>deployed</Badge>
              <Badge variant="warning" dot>pending</Badge>
              <Badge variant="error" dot>failed</Badge>
              <Tooltip label="Neon, as promised">
                <Button variant="secondary" size="sm">Hover me</Button>
              </Tooltip>
            </div>
          </Preview>

          <Preview name="Tabs" code={SNIPPETS.tabs}>
            <Tabs
              tabs={[
                { label: "Preview", content: "Live preview of your app." },
                { label: "Logs", content: "▸ build finished in 42s" },
                { label: "Settings", content: "Region: eu-1 · Tier: free" },
              ]}
            />
          </Preview>

          <Preview name="Inputs" code={SNIPPETS.inputs}>
            <Input id="email-demo" label="Email" placeholder="ada@lovelace.dev" hint="We never share your email." />
            <div style={{ height: 16 }} />
            <Input id="err-demo" label="API key" defaultValue="sk-live-0000" error="Invalid key format." />
          </Preview>

          <Preview name="Textarea & select" code={SNIPPETS.inputs}>
            <Textarea id="ta-demo" label="Prompt" placeholder="Describe what you want to build..." />
            <div style={{ height: 16 }} />
            <Select id="region-demo" label="Region" options={["eu-1 (Frankfurt)", "us-1 (Oregon)", "ap-1 (Tokyo)"]} />
          </Preview>

          <Preview name="Accordion">
            <Accordion
              items={[
                { title: "Is it really zero dependencies?", content: "Yes. Plain React and plain CSS. The only imports are yours." },
                { title: "Can my AI write this markup?", content: "That is the whole point. Predictable props, predictable classes." },
              ]}
            />
          </Preview>

          <Preview name="Table">
            <Table
              columns={["Deployment", "Region", "Status"]}
              rows={[
                ["web-prod", "eu-1", "running"],
                ["worker-2", "us-1", "building"],
                ["cron-daily", "ap-1", "idle"],
              ]}
            />
          </Preview>

          <Preview name="Pagination & breadcrumb">
            <Breadcrumb items={["Home", "Project", "Deployments"]} />
            <div style={{ height: 16 }} />
            <Pagination page={page} pageCount={5} onChange={setPage} />
          </Preview>

          <Preview name="Skeleton loading">
            <div className="stack-sm">
              <Skeleton width="60%" height={18} />
              <Skeleton width="100%" height={12} />
              <Skeleton width="90%" height={12} />
              <div className="row">
                <Skeleton width={40} height={40} style={{ borderRadius: "50%" }} />
                <Skeleton width={120} height={14} />
              </div>
            </div>
          </Preview>

          <Preview name="Alerts">
            <div className="stack">
              <Alert variant="success" title="Build passed">Deployed to production in 42s.</Alert>
              <Alert variant="warning" title="Rate limit">80% of your monthly tokens used.</Alert>
            </div>
          </Preview>

          <Preview name="Switches">
            <div className="stack-sm">
              {[["Autosave", true], ["Streaming responses", true], ["Telemetry", false]].map(([label, def]) => (
                <SwitchRow key={label} label={label} defaultOn={def} />
              ))}
            </div>
          </Preview>

          <Preview name="Checkbox & radio">
            <div className="stack">
              <Checkbox id="nl" label="Subscribe to changelog" checked={newsletter} onChange={() => setNewsletter(!newsletter)} />
              <RadioGroup name="plan" options={["Hobby", "Pro", "Team"]} value={plan} onChange={setPlan} />
              <div className="row wrap">
                <Kbd>⌘</Kbd><Kbd>K</Kbd>
                <span style={{ color: "var(--text-faint)", fontSize: 13 }}>to search</span>
              </div>
            </div>
          </Preview>

          <Preview name="Slider & progress">
            <div className="stack">
              <Slider label="Temperature" value={temp} onChange={setTemp} />
              <Progress value={72} />
              <div className="row">
                <Avatar initials="AL" />
                <Avatar initials="KT" size="lg" />
                <Avatar initials="+9" />
              </div>
            </div>
          </Preview>

          <Preview name="Modal & toasts">
            <div className="row wrap">
              <Button variant="secondary" size="sm" onClick={() => setModalOpen(true)}>Open modal</Button>
              <ToastDemo />
            </div>
          </Preview>

          <Preview name="Cards" span>
            <Card
              hoverable
              title="Pro plan"
              description="For teams shipping fast."
              footer={
                <>
                  <Button size="sm">Upgrade</Button>
                  <span style={{ color: "var(--text-faint)", fontSize: 13 }}>$20 / seat / month</span>
                  <Badge variant="accent" style={{ marginLeft: "auto" }}>popular</Badge>
                </>
              }
            >
              Unlimited projects · Priority support · Custom themes
            </Card>
          </Preview>
        </div>
      </div>
      <ModalDemo open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}

function SwitchRow({ label, defaultOn }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="switch-row">
      <span>{label}</span>
      <Switch id={label.replace(/\s/g, "-").toLowerCase()} checked={on} onChange={() => setOn(!on)} />
    </div>
  );
}

const TOKENS = [
  ["--accent", "brand color for buttons, focus rings, highlights"],
  ["--bg / --bg-elevated / --bg-hover", "surfaces"],
  ["--border / --border-strong", "hairlines and outlines"],
  ["--radius-sm / md / lg", "corner rounding"],
  ["--font-sans / --font-mono", "typography"],
];

function Customize({ accent, onSelectAccent }) {
  const [radius, setRadius] = useState(12);
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--radius-sm", `${Math.max(radius - 4, 0)}px`);
    root.style.setProperty("--radius-md", `${radius}px`);
    root.style.setProperty("--radius-lg", `${radius + 4}px`);
  }, [radius]);

  return (
    <section id="customize" className="section">
      <div className="container customize">
        <div className="customize__intro">
          <h2 className="section__title section__title--left">
            Make it yours<span className="lime">.</span>
          </h2>
          <p>
            Every component reads from CSS variables. Change a token once and
            the whole library follows — no rebuilds, no config files, no
            theme provider.
          </p>
          <p className="mono-label note__aside">
            TRY IT: PICK AN ACCENT AND DRAG THE RADIUS SLIDER
          </p>
          <div className="swatches">
            {ACCENTS.map((a) => (
              <button
                key={a.name}
                className={`swatch ${accent.name === a.name ? "swatch--active" : ""}`}
                style={{ background: a.accent }}
                onClick={() => onSelectAccent(a)}
                aria-label={`Use ${a.name} accent`}
              />
            ))}
          </div>
          <div style={{ maxWidth: 320 }}>
            <Slider label="Border radius" value={radius} min={0} max={24} onChange={setRadius} />
          </div>
        </div>
        <div className="customize__tokens">
          {TOKENS.map(([token, desc]) => (
            <div key={token} className="token-row">
              <code>{token}</code>
              <span>{desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand-row">
          <span className="footer__brand">
            VIBE<span className="lime">.UI</span>
          </span>
          <span className="mono-label">© 2026</span>
        </div>
        <p className="footer__disclaimer mono-label">
          INDEPENDENT PROJECT · NO AFFILIATION WITH ANY AI LAB · THIS PAGE WAS
          BUILT WITH ITSELF, OBVIOUSLY
        </p>
      </div>
    </footer>
  );
}

export default function App() {
  const [theme, toggleTheme] = useTheme();
  const [accent, setAccent] = useAccent();
  return (
    <>
      <Nav theme={theme} onToggleTheme={toggleTheme} />
      <Hero />
      <Marquee />
      <Gallery />
      <Customize accent={accent} onSelectAccent={setAccent} />
      <Install />
      <Footer />
    </>
  );
}
