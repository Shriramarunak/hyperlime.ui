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
  Checkbox,
  RadioGroup,
  Slider,
  Kbd,
} from "./components";
import "./App.css";

function Nav() {
  return (
    <nav className="nav">
      <div className="container nav__inner">
        <a href="#" className="nav__logo">
          vibe<span className="lime">.ui</span>
        </a>
        <div className="nav__meta">
          OPEN SOURCE · MIT · ZERO DEPENDENCIES
        </div>
        <div className="nav__links">
          <a href="#components">COMPONENTS</a>
          <a href="#install">INSTALL</a>
        </div>
      </div>
    </nav>
  );
}

function Ticket() {
  return (
    <div className="ticket-wrap">
      <div className="ticket-ring" />
      <span className="orbit-dot orbit-dot--1" />
      <span className="orbit-dot orbit-dot--2" />
      <div className="ticket">
        <div className="ticket__top">
          <span className="mono-label">DUMB SIMPLE</span>
          <span className="ticket__spark">✦</span>
        </div>
        <h3 className="ticket__brand">
          vibe<span>.</span>ui
        </h3>
        <div className="ticket__divider" />
        <div className="ticket__stats">
          <div>
            <span className="mono-label">TOKENS WASTED</span>
            <strong>ZERO</strong>
          </div>
          <div>
            <span className="mono-label">SETUP TIME</span>
            <strong>T-0 SECONDS</strong>
          </div>
        </div>
        <div className="ticket__barcode" />
        <p className="ticket__fineprint mono-label">
          REDEEMABLE FOR SHIPPED FEATURES
        </p>
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
        correctly on the first try. 🚀 🎯 🙏
      </p>

      <div className="note">
        <p>
          I asked an AI to build my app and it produced{" "}
          <strong>working UI</strong> on the first prompt. Total dumb luck — I
          just like <strong>.ui</strong> libraries.
        </p>
        <p className="mono-label note__aside">
          EVERYTHING BELOW IS RENDERED LIVE BY THE LIBRARY ITSELF
        </p>
      </div>

      <div className="hero__actions">
        <Button size="lg">npm i vibe-ui</Button>
        <Button variant="secondary" size="lg" onClick={() => document.getElementById("components")?.scrollIntoView({ behavior: "smooth" })}>
          BROWSE COMPONENTS ↓
        </Button>
      </div>

      <Ticket />
    </header>
  );
}

const installCode = `npm install vibe-ui

import { Button, Card, Input } from "vibe-ui";

<Card title="Deploy">
  <Input label="Branch" placeholder="main" />
  <Button>Ship it</Button>
</Card>`;

function Install() {
  return (
    <section id="install" className="install">
      <div className="install__card">
        <div className="install__top mono-label">
          <span>GET THE LIBRARY</span>
          <span className="install__spark">✦</span>
        </div>
        <h2 className="install__price">$0</h2>
        <p className="install__headline">See it as free forever?</p>
        <hr className="install__rule" />
        <div className="install__row">
          <div>
            <span className="mono-label">TERMINAL</span>
            <code className="install__cmd">npm i vibe-ui</code>
            <span className="mono-label install__hint">THAT'S THE WHOLE SETUP</span>
          </div>
          <span className="install__arrow">→</span>
        </div>
        <pre className="install__code"><code>{installCode}</code></pre>
      </div>
      <p className="install__tagline mono-label">
        ONE UNUSUALLY HONEST README. ONE EXTREMELY PREDICTABLE API. AND ONE
        PROMISE TO KEEP THE BUNDLE UNDER 10KB.
      </p>
    </section>
  );
}

function Preview({ name, children, span = false }) {
  return (
    <div className={`preview ${span ? "preview--span" : ""}`}>
      <div className="preview__label mono-label">{name}</div>
      <div className="preview__stage">{children}</div>
    </div>
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

function Gallery() {
  const [plan, setPlan] = useState("Hobby");
  const [temp, setTemp] = useState(70);
  const [modalOpen, setModalOpen] = useState(false);
  const [newsletter, setNewsletter] = useState(true);

  return (
    <section id="components" className="section">
      <div className="container">
        <h2 className="section__title">
          Components<span className="lime">,</span> live
        </h2>

        <div className="preview-grid">
          <Preview name="Buttons">
            <div className="row wrap">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button disabled>Disabled</Button>
              <Button><Spinner /> Loading</Button>
            </div>
          </Preview>

          <Preview name="Badges & tooltips">
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

          <Preview name="Tabs">
            <Tabs
              tabs={[
                { label: "Preview", content: "Live preview of your app." },
                { label: "Logs", content: "▸ build finished in 42s" },
                { label: "Settings", content: "Region: eu-1 · Tier: free" },
              ]}
            />
          </Preview>

          <Preview name="Inputs">
            <Input id="email-demo" label="Email" placeholder="ada@lovelace.dev" hint="We never share your email." />
            <div style={{ height: 16 }} />
            <Input id="err-demo" label="API key" defaultValue="sk-live-0000" error="Invalid key format." />
          </Preview>

          <Preview name="Textarea & slider">
            <Textarea id="ta-demo" label="Prompt" placeholder="Describe what you want to build..." />
            <div style={{ height: 20 }} />
            <Slider label="Temperature" value={temp} onChange={setTemp} />
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

          <Preview name="Progress & avatars">
            <div className="stack">
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

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand-row">
          <span className="footer__brand">
            VIBE<span className="lime">.UI</span>
          </span>
          <span className="footer__copy mono-label">© 2026</span>
        </div>
        <p className="footer__disclaimer mono-label">
          INDEPENDENT PROJECT · NO AFFILIATION WITH ANY AI LAB · BUILT WITH
          ITSELF, OBVIOUSLY
        </p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <Install />
      <Gallery />
      <Footer />
    </>
  );
}
