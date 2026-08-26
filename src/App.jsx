import { useState } from "react";
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
} from "./components";
import "./App.css";

function Nav() {
  return (
    <nav className="nav">
      <div className="container nav__inner">
        <a href="#" className="nav__logo">
          <span className="nav__logo-mark">v</span> vibe-ui
        </a>
        <div className="nav__links">
          <a href="#components">Components</a>
          <a href="#install">Install</a>
          <Button variant="secondary" size="sm">GitHub</Button>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <header className="hero">
      <div className="container hero__inner">
        <Badge variant="accent" dot>Built for AI-generated apps</Badge>
        <h1 className="hero__title">
          The UI library your<br />
          <span className="hero__gradient">vibe-coded app</span> deserves
        </h1>
        <p className="hero__subtitle">
          Copy-paste React components with zero config and zero dependencies.
          Predictable class names, clean tokens, and markup that LLMs write
          correctly on the first try.
        </p>
        <div className="hero__actions">
          <Button size="lg">Get Started</Button>
          <Button variant="secondary" size="lg" onClick={() => document.getElementById("components")?.scrollIntoView({ behavior: "smooth" })}>
            Browse Components
          </Button>
        </div>
        <p className="hero__meta">
          Everything on this page is a live vibe-ui component — not a screenshot.
        </p>
      </div>
    </header>
  );
}

const codeSample = `npm install vibe-ui

import { Button, Card, Input } from "vibe-ui";

<Card title="Deploy">
  <Input label="Branch" placeholder="main" />
  <Button>Ship it</Button>
</Card>`;

function Install() {
  return (
    <section id="install" className="section">
      <div className="container">
        <h2 className="section__title">Ship in seconds</h2>
        <p className="section__subtitle">
          Paste this into your AI prompt or terminal — that's the whole setup.
        </p>
        <pre className="code-block"><code>{codeSample}</code></pre>
      </div>
    </section>
  );
}

function Preview({ name, children, span = false }) {
  return (
    <div className={`preview ${span ? "preview--span" : ""}`}>
      <div className="preview__label">{name}</div>
      <div className="preview__stage">{children}</div>
    </div>
  );
}

function Components() {
  return (
    <section id="components" className="section">
      <div className="container">
        <h2 className="section__title">Components, live</h2>
        <p className="section__subtitle">
          Rendered directly from the library. What you see is exactly what ships.
        </p>

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

          <Preview name="Badges">
            <div className="row wrap">
              <Badge>default</Badge>
              <Badge variant="accent" dot>v2.0</Badge>
              <Badge variant="success" dot>deployed</Badge>
              <Badge variant="warning" dot>pending</Badge>
              <Badge variant="error" dot>failed</Badge>
            </div>
          </Preview>

          <Preview name="Inputs">
            <Input id="email-demo" label="Email" placeholder="ada@lovelace.dev" hint="We never share your email." />
          </Preview>

          <Preview name="Input states">
            <Input id="err-demo" label="API key" defaultValue="sk-live-0000" error="Invalid key format." />
          </Preview>

          <Preview name="Textarea">
            <Textarea id="ta-demo" label="Prompt" placeholder="Describe what you want to build..." />
          </Preview>

          <Preview name="Alerts">
            <div className="stack">
              <Alert variant="success" title="Build passed">Deployed to production in 42s.</Alert>
              <Alert variant="warning" title="Rate limit">80% of your monthly tokens used.</Alert>
            </div>
          </Preview>

          <Preview name="Switches">
            <div className="stack-sm row-gap">
              {[
                ["Autosave", true],
                ["Streaming responses", true],
                ["Telemetry", false],
              ].map(([label, def]) => (
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

          <Preview name="Cards" span>
            <Card
              hoverable
              title="Pro plan"
              description="For teams shipping fast."
              footer={
                <>
                  <Button size="sm">Upgrade</Button>
                  <span style={{ color: "var(--text-faint)", fontSize: 13 }}>$20 / seat / month</span>
                </>
              }
            >
              Unlimited projects · Priority support · Custom themes
            </Card>
          </Preview>
        </div>
      </div>
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
        <p>vibe-ui — MIT licensed, built by the community.</p>
        <p className="footer__muted">Open an issue · Contribute · Star us on GitHub</p>
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
      <Components />
      <Footer />
    </>
  );
}
