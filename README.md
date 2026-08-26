# hyper.lime ⚡

**The UI library your vibe-coded app deserves.** 40+ zero-dependency React components with a neon-lime, terminal-inspired aesthetic — designed so AI tools (Cursor, Claude, ChatGPT) write correct code on the first try.

- **Zero dependencies** — no Radix, no Tailwind, no Emotion. Plain React + plain CSS. React is the only peer dependency.
- **LLM-friendly** — predictable prop names (`variant`, `size`, `onChange`), stable `vb-*` class names, and a machine-readable API reference
- **AI-ready** — [`llms.txt`](public/llms.txt) at the site root + a copy-paste **Prompt Pack** with the entire API, generated live from the docs
- **Light + dark themes** — CSS-variable driven, persisted, no flash on load
- **MUI-style docs** — sidebar with search, per-component pages with live demos, props tables, CSS classes, and accessibility notes
- **Customizable** — accent color, border radius, and every token changeable at runtime

## Quick start

```bash
git clone https://github.com/Shriramarunak/hyperlime.ui.git
cd hyperlime.ui
npm install
npm run dev
```

Open http://localhost:5173. Press `/` in the nav to search components.

## Using the components

The docs double as the source of truth. Every component page shows live demos with copy-paste code:

```jsx
import { Button, Card, Input } from "./components";

<Card title="Deploy to production" hoverable footer={<Button size="sm">Ship it</Button>}>
  <Input label="Branch" placeholder="main" />
</Card>
```

### With AI tools

Paste the **Prompt Pack** (docs site → *Prompt Pack* section → *Copy prompt pack*) into your AI tool's context. It contains the complete API — every component, prop, and default — so the model emits valid hyper.lime markup immediately.

## Components

**Inputs** — Autocomplete, Button, IconButton, Button Group, Checkbox, FAB, Speed Dial, Number Field, Radio Group, Rating, Select, Slider, Switch, Text Field, Textarea, Textarea Autosize, Toggle Button, Transfer List

**Data display** — Avatar, Badge, Chip, Divider, Icons, Image List, Kbd, List, Skeleton, Table, Tooltip, Typography

**Feedback** — Alert, Backdrop, Dialog/Modal, Progress, Snackbar/Toast, Spinner

**Surfaces** — Accordion, App Bar, Card, Paper, Empty State

**Navigation** — Bottom Navigation, Breadcrumbs, Drawer, Link, Menu, Pagination, Stepper, Tabs

**Layout** — Box, Container, Grid, Stack

**Utils** — Click-Away Listener, Portal, Popover/Popper, Transitions (Fade/Collapse/Slide), NoSsr, useMediaQuery, InitColorSchemeScript

## Theming

Every component reads from CSS variables — override them globally in `src/index.css` or at runtime:

```css
:root {
  --accent: #d6f32f;      /* brand color */
  --bg: #0c0c07;          /* page background */
  --radius-md: 12px;      /* corner rounding */
}
```

Light mode is `[data-theme="light"]` on `<html>`; the theme toggle persists to `localStorage`.

## Project structure

```
src/
├── components/     # the library — one file per group, barrel at index.js
├── styles/         # component CSS (design tokens live in index.css)
├── utils/          # syntax highlighter for the docs
├── docsData.jsx    # single source of truth: demos, props, code snippets
├── App.jsx         # landing + docs site
└── App.css         # site styles
public/
└── llms.txt        # machine-readable API reference for AI tools
```

## AI integration

- **`/llms.txt`** — full component API reference in LLM-friendly markdown, served at the site root
- **Prompt Pack** — one copy-paste block containing the entire API, generated live from the docs data so it never drifts

## Contributing

Issues and PRs welcome. When adding a component:

1. Build it in `src/components/` with its CSS in `src/styles/`
2. Export it from `src/components/index.js`
3. Add a `vb-*` prefixed, BEM-style class name
4. Document it in `src/docsData.jsx` (demos, props, code) — the Prompt Pack and llms.txt conventions follow automatically

## License

MIT
