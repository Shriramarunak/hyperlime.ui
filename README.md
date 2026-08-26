# vibe-ui

Open-source React UI components designed for AI-generated ("vibe-coded") apps.

- **Zero dependencies** — plain React + CSS, no runtime libraries
- **LLM-friendly** — predictable class names and simple props that AI writes correctly on the first try
- **Design tokens** — CSS variables for colors, radii, and typography
- **Live docs** — every component on the landing page is rendered from the library itself

## Quick start

```bash
npm install
npm run dev
```

Then open http://localhost:5173 — the landing page doubles as the live component gallery.

## Components

`Button` · `Badge` · `Card` · `Alert` · `Input` · `Textarea` · `Switch` · `Progress` · `Avatar` · `Spinner`

## Usage

```jsx
import { Button, Card, Input } from "./components";

<Card title="Deploy" hoverable>
  <Input label="Branch" placeholder="main" />
  <Button>Ship it</Button>
</Card>
```

## License

MIT
