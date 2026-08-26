# hyper.lime

Open-source React UI components designed for AI-generated ("vibe-coded") apps — in a neon-lime, terminal-inspired style.

- **Zero dependencies** — plain React + CSS
- **LLM-friendly** — predictable props and class names AI writes correctly on the first try
- **Light + dark themes** — CSS-variable driven, persisted, no flash on load
- **Live docs with search** — every component documented with variations and copyable code
- **Customizable** — accent color, radius, and all tokens changeable at runtime

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:5173. Press `/` in the nav to search components.

## Components (23+)

**Inputs** — Autocomplete, Button, IconButton, Button Group, Checkbox, FAB, Speed Dial, Number Field, Radio Group, Rating, Select, Slider, Switch, Text Field, Textarea, Textarea Autosize, Toggle Button, Transfer List

**Data display** — Avatar, Badge, Chip, Divider, Icons, Image List, Kbd, List, Skeleton, Table, Tooltip, Typography

**Feedback** — Alert, Backdrop, Dialog/Modal, Progress, Snackbar/Toast, Spinner

**Surfaces** — Accordion, App Bar, Card, Paper, Empty State

**Navigation** — Bottom Navigation, Breadcrumbs, Drawer, Link, Menu, Pagination, Stepper, Tabs

**Layout** — Box, Container, Grid, Stack

**Utils** — Click-Away Listener, Portal, Popover/Popper, Transitions (Fade/Collapse/Slide), NoSsr, useMediaQuery, InitColorSchemeScript

## Theming

All components read from CSS variables — override them globally or at runtime:

```css
:root {
  --accent: #d6f32f;
  --radius-md: 12px;
}
```

## AI-ready

- public/llms.txt — full component API reference in LLM-friendly markdown, served at /llms.txt
- **Prompt Pack** — one copy-paste block with the entire API, generated live from the docs at / (#prompt)

## License

MIT
