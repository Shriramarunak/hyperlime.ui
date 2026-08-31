import { useEffect, useMemo, useState } from "react";
import { Button, Badge, Card, Input, Kbd, Icon, Slider } from "./components";
import { DOCS } from "./docsData";
import { TEMPLATES } from "./templates";
import { highlight } from "./utils/highlight";
import { ComponentPlayground } from "./docsPlayground";
import "./App.css";
import "./styles/playground.css";

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

function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash.replace(/^#/, "") || "/");
  useEffect(() => {
    const onChange = () => {
      setHash(window.location.hash.replace(/^#/, "") || "/");
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return hash;
}

function navigate(path) {
  window.location.hash = path;
}

function CodeBlock({ code, filename = "example.jsx" }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };
  return (
    <div className="macwindow">
      <div className="macwindow__bar">
        <span className="macwindow__dots">
          <span /><span /><span />
        </span>
        <span className="macwindow__title mono-label">{filename}</span>
        <button className="macwindow__copy mono-label" onClick={copy}>
          {copied ? "COPIED" : "COPY"}
        </button>
      </div>
      <pre className="macwindow__body">
        <code>{highlight(code)}</code>
      </pre>
    </div>
  );
}

function Nav({ onToggleTheme, theme, query, onSearch, route }) {
  const onDocs = route.startsWith("/components");
  return (
    <nav className="nav">
      <div className="container nav__inner">
        <a href="#/" className="nav__logo">
          hyper<span className="lime">.lime</span>
        </a>
        {onDocs && (
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
        )}
        <div className="nav__links">
          <a href="#/components" className={onDocs ? "nav__link--active" : ""}>COMPONENTS</a>
          <a href="#/templates" className={route.startsWith("/templates") ? "nav__link--active" : ""}>TEMPLATES</a>
          <a href="#/prompt" className={route === "/prompt" ? "nav__link--active" : ""}>PROMPT PACK</a>
          <a href="#/changelog" className={route === "/changelog" ? "nav__link--active" : ""}>CHANGELOG</a>
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
        <div className="playground__code">
          <pre>
            <code>{highlight(`<Card title="Deploy to production"
      description="main · build #421">
  <Badge variant="success" dot>passing</Badge>
  <Input label="Region" placeholder="eu-1" />
  <Button>Ship it</Button>
</Card>`)}</code>
          </pre>
        </div>
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

function Hero({ total }) {
  return (
    <header className="hero">
      <div className="hero__label mono-label">
        <span className="dot" /> {total} COMPONENTS · AN OPEN-SOURCE UI LIBRARY FOR VIBE-CODED APPS
      </div>
      <h1 className="hero__title">Hi, builders.</h1>
      <p className="hero__subtitle">
        <span className="lime">Zero config.</span> Components that LLMs write correctly on the first try.
      </p>
      <div className="note">
        <p>
          I asked an AI to build my app and it produced <strong>working UI</strong> on the first
          prompt. Total dumb luck — I just like <strong>.lime</strong> libraries.
        </p>
        <p className="mono-label note__aside">LEFT IS THE CODE. RIGHT IS THE LIVE RESULT.</p>
      </div>
      <div className="hero__actions">
        <Button size="lg" onClick={() => navigate("/prompt")}>
          Copy the prompt pack
        </Button>
        <Button variant="secondary" size="lg" onClick={() => navigate("/components")}>
          BROWSE COMPONENTS →
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

function Home({ total }) {
  return (
    <>
      <Hero total={total} />
      <Marquee />
    </>
  );
}

function Sidebar({ docs, selected }) {
  return (
    <aside className="docs__sidebar">
      {docs.map((cat) => (
        <div key={cat.category} className="docs__cat">
          <div className="docs__cat-label mono-label">{cat.category}</div>
          {cat.components.map((comp) => (
            <a
              key={comp.id}
              href={`#/components/${comp.id}`}
              className={`docs__link ${selected === comp.id ? "docs__link--active" : ""}`}
            >
              {comp.name}
            </a>
          ))}
        </div>
      ))}
    </aside>
  );
}

function PropsTable({ props }) {
  if (!props || props.length === 0) {
    return <p className="doc__none mono-label">THIS COMPONENT TAKES NO PROPS.</p>;
  }
  return (
    <table className="props">
      <thead>
        <tr>
          <th>Prop</th>
          <th>Type</th>
          <th>Default</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {props.map((row) => (
          <tr key={row.name}>
            <td><code className="props__name">{row.name}</code></td>
            <td><code className="props__type">{row.type}</code></td>
            <td><code className="props__def">{row.def}</code></td>
            <td>{row.desc}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function DocPage({ comp, category, prev, next }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [comp.id]);

  return (
    <article className="docpage" key={comp.id}>
      <div className="mono-label doc__cat">{category}</div>
      <h3 className="doc__name">{comp.name}</h3>
      <p className="doc__blurb">{comp.blurb}</p>

      <ComponentPlayground id={comp.id} />

      {comp.demos.map((demo) => (
        <div key={demo.title} className="docpage__demo">
          <div className="docpage__demo-head">
            <span className="doc__demo-label mono-label">{demo.title}</span>
          </div>
          <div className="doc__demo-stage">{demo.node}</div>
          <CodeBlock code={demo.code} filename={`${comp.id}.jsx`} />
        </div>
      ))}

      <h4 className="docpage__sub">Props</h4>
      <PropsTable props={comp.props} />

      {comp.css && (
        <>
          <h4 className="docpage__sub">CSS classes</h4>
          <CodeBlock code={comp.css} filename="classes.css" />
        </>
      )}

      {comp.a11y && (
        <>
          <h4 className="docpage__sub">Accessibility</h4>
          <p className="doc__blurb doc__blurb--tight">{comp.a11y}</p>
        </>
      )}

      <div className="docpage__nav">
        {prev ? (
          <Button variant="secondary" size="sm" onClick={() => navigate(`/components/${prev.id}`)}>
            ← {prev.name}
          </Button>
        ) : <span />}
        {next && (
          <Button variant="secondary" size="sm" onClick={() => navigate(`/components/${next.id}`)}>
            {next.name} →
          </Button>
        )}
      </div>
    </article>
  );
}

function DocsPage({ query, route }) {
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

  const flat = useMemo(() => filtered.flatMap((c) => c.components), [filtered]);
  const requested = route.split("/")[2];
  const current = flat.find((c) => c.id === requested) || flat[0];
  const currentCat = filtered.find((cat) => cat.components.some((c) => c.id === current?.id));
  const idx = flat.findIndex((c) => c.id === current?.id);
  const total = filtered.reduce((n, c) => n + c.components.length, 0);

  return (
    <section className="docs">
      <div className="docs__layout">
        <Sidebar docs={filtered} selected={current?.id} />
        <div className="docs__content">
          {q && (
            <div className="mono-label docs__results">
              {total} RESULT{total === 1 ? "" : "S"} FOR "{query.toUpperCase()}"
            </div>
          )}
          {current ? (
            <DocPage
              comp={current}
              category={currentCat.category}
              prev={flat[idx - 1]}
              next={flat[idx + 1]}
            />
          ) : (
            <div className="docs__empty">
              <p className="mono-label">NO COMPONENTS MATCH "{query.toUpperCase()}"</p>
              <Button size="sm" variant="secondary" onClick={() => navigate("/components")}>
                Clear search
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function buildPromptPack(docs) {
  const lines = [
    "You are building UI with hyper.lime, a zero-dependency React component library.",
    "Follow these rules exactly:",
    "- Import from the package root: import { Button, Card } from \"hyperlime\".",
    "- Variants use the `variant` prop; sizes use `size` with \"sm\" | \"md\" | \"lg\".",
    "- Selection inputs are controlled: value/checked + onChange.",
    "- Form fields share: label, hint, error (error overrides hint), id.",
    "- Status colors: \"success\" | \"warning\" | \"error\" | \"info\" (Badge/Chip/Toast also \"default\"/\"accent\").",
    "- Theming is CSS variables: --accent, --bg, --border, --radius-md, etc. Never inline hex colors.",
    "",
    "## Components",
    "",
  ];
  for (const cat of docs) {
    lines.push(`# ${cat.category}`);
    for (const comp of cat.components) {
      lines.push("");
      lines.push(`## ${comp.name}`);
      lines.push(comp.blurb);
      if (comp.props?.length) {
        lines.push(
          "Props: " +
            comp.props.map((pr) => `${pr.name} (${pr.type}${pr.def && pr.def !== "—" ? `, default ${pr.def}` : ""})`).join("; ")
        );
      }
      const demo = comp.demos[0];
      if (demo) {
        lines.push("Example:");
        lines.push(demo.code);
      }
    }
  }
  return lines.join("\n");
}

function PromptPage() {
  const pack = useMemo(() => buildPromptPack(DOCS), []);
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(pack);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };
  return (
    <section className="section">
      <div className="container prompt">
        <div className="prompt__intro">
          <h1 className="section__title section__title--left">
            Prompt pack<span className="lime">.</span>
          </h1>
          <p>
            One block containing the entire hyper.lime API — every component, prop, and default.
            Paste it into Cursor, Claude, or ChatGPT and the model writes correct hyper.lime
            markup on the first try. It is generated live from the docs, so it never drifts.
          </p>
          <p className="mono-label note__aside">
            MACHINES READ IT TOO: <a href="/llms.txt" className="prompt__link">/llms.txt</a>
          </p>
          <Button onClick={copy}>{copied ? "Copied to clipboard" : "Copy prompt pack"}</Button>
          <p className="prompt__stats mono-label">
            {pack.split("\n").length} LINES · {pack.length.toLocaleString()} CHARS · {DOCS.reduce((n, c) => n + c.components.length, 0)} COMPONENTS
          </p>
        </div>
        <CodeBlock code={pack} filename="hyperlime-prompt.txt" />
      </div>
    </section>
  );
}

function TemplatesPage() {
  return (
    <section className="section">
      <div className="container">
        <h1 className="section__title section__title--left">
          Templates<span className="lime">.</span>
        </h1>
        <p className="section__subtitle" style={{ textAlign: "left", margin: "0 0 40px", maxWidth: 640 }}>
          Full page layouts assembled from hyper.lime components. Rendered live below — grab the
          code and make it yours.
        </p>
        <div className="stack" style={{ gap: 48 }}>
          {TEMPLATES.map((tpl) => (
            <div key={tpl.id}>
              <div className="row" style={{ justifyContent: "space-between", marginBottom: 12 }}>
                <div>
                  <h3 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em" }}>{tpl.name}</h3>
                  <p style={{ fontSize: 14, color: "var(--text-muted)" }}>{tpl.description}</p>
                </div>
              </div>
              <div className="docpage__demo">
                <div className="docpage__demo-head">
                  <span className="doc__demo-label mono-label">LIVE PREVIEW</span>
                </div>
                <div className="doc__demo-stage">{tpl.node}</div>
                <CodeBlock code={tpl.code} filename={`${tpl.id}.jsx`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const CHANGELOG = [
  {
    version: "v0.4.0",
    date: "Feb 2026",
    color: "accent",
    items: [
      "12 new components: Chat, Command Palette, OTP Input, Tag Input, File Upload, Avatar Group, Stat, Timeline, Sparkline, Progress Ring, Banner",
      "Input leading/trailing icon slots, dismissible Alert, Card accent variant",
      "New AI component category",
    ],
  },
  {
    version: "v0.3.0",
    date: "Jan 2026",
    color: "accent",
    items: [
      "TypeScript migration — fully typed library with exported prop types",
      "hyperlime CLI for copy-paste installs (npx hyperlime add button)",
      "GitHub Actions CI: typecheck + lint + build",
      "Multi-page docs: landing, /components, /prompt",
    ],
  },
  {
    version: "v0.2.0",
    date: "Dec 2025",
    color: "muted",
    items: [
      "Light + dark themes with persistence",
      "MUI-style docs: sidebar, search, props tables, a11y notes",
      "Runtime theming: accent swatches + radius slider",
      "llms.txt + Prompt Pack for AI tools",
    ],
  },
  {
    version: "v0.1.0",
    date: "Nov 2025",
    color: "muted",
    items: [
      "Initial release: 23 components, live-preview landing page, neon-lime design system",
    ],
  },
];

function ChangelogPage() {
  return (
    <section className="section">
      <div className="container changelog">
        <h1 className="section__title section__title--left">
          Changelog<span className="lime">.</span>
        </h1>
        <p className="section__subtitle" style={{ textAlign: "left", margin: "0 0 48px", maxWidth: 560 }}>
          Every release, what shipped, and why it matters.
        </p>
        <div style={{ maxWidth: 640 }}>
          {CHANGELOG.map((release) => (
            <div key={release.version} style={{ marginBottom: 48 }}>
              <div className="row" style={{ marginBottom: 16, gap: 14 }}>
                <Badge variant={release.color === "accent" ? "accent" : "default"}>{release.version}</Badge>
                <span className="mono-label">{release.date}</span>
              </div>
              <Timeline
                items={release.items.map((item) => ({
                  title: item,
                  color: release.color,
                }))}
              />
            </div>
          ))}
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

  const downloadTokens = () => {
    const css = `/* hyper.lime tokens — generated on the docs site */
:root {
  --accent: ${accent.accent};
  --accent-hover: ${accent.hover};
  --accent-subtle: color-mix(in srgb, ${accent.accent} 14%, transparent);
  --radius-sm: ${Math.max(radius - 4, 0)}px;
  --radius-md: ${radius}px;
  --radius-lg: ${radius + 4}px;
}

[data-theme="light"] {
  --accent-subtle: color-mix(in srgb, ${accent.accent} 18%, transparent);
}
`;
    const blob = new Blob([css], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "hyperlime-tokens.css";
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadTokensJson = () => {
    const json = JSON.stringify(
      {
        color: {
          accent: accent.accent,
          accentHover: accent.hover,
          bg: "#0c0c07",
          bgElevated: "#12120c",
          border: "#26261a",
          text: "#f2f2ea",
        },
        radius: {
          sm: `${Math.max(radius - 4, 0)}px`,
          md: `${radius}px`,
          lg: `${radius + 4}px`,
        },
      },
      null,
      2
    );
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "hyperlime-tokens.json";
    a.click();
    URL.revokeObjectURL(url);
  };

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
          <div className="row">
            <Button variant="secondary" size="sm" onClick={downloadTokens}>
              Download tokens.css
            </Button>
            <Button variant="ghost" size="sm" onClick={downloadTokensJson}>
              Download tokens.json
            </Button>
            <span className="mono-label">FIGMA / STYLE DICTIONARY READY</span>
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
          <code>$ npm i hyperlime</code>
          <span className="mono-label">THAT'S THE WHOLE SETUP</span>
        </div>
        <CodeBlock
          filename="deploy.jsx"
          code={`import { Button, Card, Input } from "hyperlime";

export default function Deploy() {
  return (
    <Card title="Deploy to production">
      <Input label="Branch" placeholder="main" />
      <Button>Ship it</Button>
    </Card>
  );
}`}
        />
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
            HYPER<span className="lime">.LIME</span>
          </span>
          <span className="mono-label">© 2026</span>
        </div>
        <p className="footer__disclaimer mono-label">
          INDEPENDENT PROJECT · NO AFFILIATION WITH ANY AI LAB · THIS PAGE WAS BUILT WITH ITSELF, OBVIOUSLY ·{" "}
          <a href="/llms.txt" style={{ color: "var(--accent)" }}>LLMS.TXT</a>
        </p>
      </div>
    </footer>
  );
}

export default function App() {
  const [theme, toggleTheme] = useTheme();
  const [accent, setAccent] = useAccent();
  const [query, setQuery] = useState("");
  const route = useHashRoute();

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

  const total = DOCS.reduce((n, c) => n + c.components.length, 0);

  let page;
  if (route.startsWith("/components")) {
    page = <DocsPage query={query} route={route} />;
  } else if (route === "/prompt") {
    page = <PromptPage />;
  } else if (route === "/templates") {
    page = <TemplatesPage />;
  } else if (route === "/changelog") {
    page = <ChangelogPage />;
  } else {
    page = <Home total={total} />;
  }

  return (
    <>
      <Nav onToggleTheme={toggleTheme} theme={theme} query={query} onSearch={setQuery} route={route} />
      {page}
      {route === "/" && (
        <>
          <Customize accent={accent} onSelectAccent={setAccent} />
          <Install />
          <Footer />
        </>
      )}
    </>
  );
}
