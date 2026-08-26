import { useEffect, useMemo, useState } from "react";
import { Button, Badge, Card, Input, Kbd, Icon, Slider } from "./components";
import { DOCS } from "./docsData";
import "./App.css";

const ACCENTS = [
  { name: "lime", accent: "#d6f32f", hover: "#e4ff4d" },
  { name: "violet", accent: "#8b7cff", hover: "#a396ff" },
  { name: "cyan", accent: "#4cc9f0", hover: "#7dd8f5" },
  { name: "orange", accent: "#ffa94d", hover: "#ffbf7d" },
  { name: "pink", accent: "#ff7ac3", hover: "#ff9dd2" },
];

function useTheme() {
  const [theme, setTheme] = useState(() => localStorage.getItem("vb-theme") || "dark");
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
    root.style.setProperty("--accent-subtle", `color-mix(in srgb, ${accent.accent} 14%, transparent)`);
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

function Nav({ onToggleTheme, theme, query, onSearch }) {
  return (
    <nav className="nav">
      <div className="container nav__inner">
        <a href="#" className="nav__logo">
          vibe<span className="lime">.ui</span>
        </a>
        <div className="nav__search">
          <Icon name="search" size={15} />
          <input
            value={query}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search components..."
            aria-label="Search components"
          />
          {query ? (
            <button className="nav__search-clear" onClick={() => onSearch("")} aria-label="Clear search">
              <Icon name="close" size={13} />
            </button>
          ) : (
            <span className="nav__search-kbd">
              <Kbd>/</Kbd>
            </span>
          )}
        </div>
        <div className="nav__links">
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
        <span className="dot" /> {DOCS.reduce((n, c) => n + c.components.length, 0)} COMPONENTS · AN OPEN-SOURCE UI LIBRARY FOR VIBE-CODED APPS
      </div>
      <h1 className="hero__title">Hi, builders.</h1>
      <p className="hero__subtitle">
        <span className="lime">Zero config.</span> Components that LLMs write correctly on the first try.
      </p>
      <div className="note">
        <p>
          I asked an AI to build my app and it produced <strong>working UI</strong> on the first
          prompt. Total dumb luck — I just like <strong>.ui</strong> libraries.
        </p>
        <p className="mono-label note__aside">LEFT IS THE CODE. RIGHT IS THE LIVE RESULT.</p>
      </div>
      <div className="hero__actions">
        <Button size="lg" onClick={() => document.getElementById("install")?.scrollIntoView({ behavior: "smooth" })}>
          npm i vibe-ui
        </Button>
        <Button variant="secondary" size="lg" onClick={() => document.getElementById("docs")?.scrollIntoView({ behavior: "smooth" })}>
          BROWSE COMPONENTS ↓
        </Button>
      </div>
      <Playground />
    </header>
  );
}

function Marquee() {
  const items = ["ZERO DEPENDENCIES", "MIT LICENSED", "TOKEN-FRIENDLY MARKUP", "LIGHT + DARK", "CSS VARIABLES", "BUILT FOR PROMPTS"];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {[0, 1].map((half) => (
          <div key={half} className="marquee__half">
            {items.map((item, i) => (
              <span key={i} className="marquee__item mono-label">{item} ✦</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Sidebar({ docs, activeId }) {
  return (
    <aside className="docs__sidebar">
      {docs.map((cat) => (
        <div key={cat.category} className="docs__cat">
          <div className="docs__cat-label mono-label">{cat.category}</div>
          {cat.components.map((comp) => (
            <a
              key={comp.id}
              href={`#${comp.id}`}
              className={`docs__link ${activeId === comp.id ? "docs__link--active" : ""}`}
            >
              {comp.name}
            </a>
          ))}
        </div>
      ))}
    </aside>
  );
}

function DocSection({ comp, category }) {
  return (
    <section id={comp.id} className="doc">
      <div className="mono-label doc__cat">{category}</div>
      <h3 className="doc__name">{comp.name}</h3>
      <p className="doc__blurb">{comp.blurb}</p>
      {comp.demos.map((demo) => (
        <div key={demo.title} className="doc__demo">
          <div className="mono-label doc__demo-label">{demo.title}</div>
          <div className="doc__demo-stage">{demo.node}</div>
        </div>
      ))}
      <CodeBlock code={comp.code} />
    </section>
  );
}

function Docs({ query }) {
  const [activeId, setActiveId] = useState("");
  const q = query.trim().toLowerCase();

  const filtered = useMemo(
    () =>
      DOCS.map((cat) => ({
        ...cat,
        components: q
          ? cat.components.filter(
              (c) =>
                c.name.toLowerCase().includes(q) ||
                c.blurb.toLowerCase().includes(q) ||
                cat.category.toLowerCase().includes(q)
            )
          : cat.components,
      })).filter((cat) => cat.components.length > 0),
    [q]
  );

  const total = filtered.reduce((n, c) => n + c.components.length, 0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    filtered.forEach((cat) =>
      cat.components.forEach((comp) => {
        const el = document.getElementById(comp.id);
        if (el) observer.observe(el);
      })
    );
    return () => observer.disconnect();
  }, [filtered]);

  return (
    <section id="docs" className="docs">
      <div className="docs__layout container">
        <Sidebar docs={filtered} activeId={activeId} />
        <div className="docs__content">
          {q && (
            <div className="mono-label docs__results">
              {total} RESULT{total === 1 ? "" : "S"} FOR "{query.toUpperCase()}"
            </div>
          )}
          {filtered.map((cat) => (
            <div key={cat.category}>
              {cat.components.map((comp) => (
                <DocSection key={comp.id} comp={comp} category={cat.category} />
              ))}
            </div>
          ))}
          {total === 0 && (
            <div className="docs__empty">
              <p className="mono-label">NO COMPONENTS MATCH "{query.toUpperCase()}"</p>
              <Button size="sm" variant="secondary" onClick={() => {}}>
                Clear search
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
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
            Every component reads from CSS variables. Change a token once and the whole library
            follows — no rebuilds, no config files, no theme provider.
          </p>
          <p className="mono-label note__aside">TRY IT: PICK AN ACCENT AND DRAG THE RADIUS SLIDER</p>
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
          INDEPENDENT PROJECT · NO AFFILIATION WITH ANY AI LAB · THIS PAGE WAS BUILT WITH ITSELF, OBVIOUSLY
        </p>
      </div>
    </footer>
  );
}

export default function App() {
  const [theme, toggleTheme] = useTheme();
  const [accent, setAccent] = useAccent();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "/" && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName)) {
        e.preventDefault();
        document.querySelector(".nav__search input")?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <Nav theme={theme} onToggleTheme={toggleTheme} query={query} onSearch={setQuery} />
      <Hero />
      <Marquee />
      <Docs query={query} />
      <Customize accent={accent} onSelectAccent={setAccent} />
      <Install />
      <Footer />
    </>
  );
}
