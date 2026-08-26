import { useState } from "react";
import {
  Button, ButtonGroup, IconButton, Fab, SpeedDial, Input, Textarea, TextareaAutosize, Select,
  Checkbox, RadioGroup, Switch, Slider, Rating, NumberField, Autocomplete, ToggleButtonGroup,
  TransferList, Avatar, Badge, Chip, Divider, Icon, ICON_NAMES, ImageList, List, ListItem,
  Table, Tooltip, Typography, Skeleton, Kbd, Alert, Backdrop, Dialog, Progress, Toast,
  Accordion, AppBar, Card, Paper, BottomNavigation, Breadcrumb, Drawer, Link, Menu,
  Pagination, Stepper, Tabs, Box, Container, Grid, Stack, Popover, Portal, NoSsr,
  ClickAwayListener, Collapse, EmptyState, Spinner, useMediaQuery,
} from "./components";

function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="secondary" size="sm" onClick={() => setOpen(true)}>Open dialog</Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Delete deployment?"
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="danger" size="sm" onClick={() => setOpen(false)}>Delete</Button>
          </>
        }
      >
        This will tear down <strong style={{ color: "var(--text)" }}>prod-eu-1</strong>. There is no undo.
      </Dialog>
    </>
  );
}

function ToastVariantsDemo() {
  return (
    <div className="stack-sm" style={{ maxWidth: 340 }}>
      <Toast variant="default" title="Saved" description="Draft stored locally" onClose={() => {}} />
      <Toast variant="success" title="Deployed" description="prod-eu-1 · 42s" onClose={() => {}} />
      <Toast variant="warning" title="Rate limit" description="80% of tokens used" onClose={() => {}} />
      <Toast variant="error" title="Build failed" description="Type error on line 12" onClose={() => {}} />
      <Toast variant="info" title="New version" description="v2.1 is available" onClose={() => {}} />
    </div>
  );
}

function MenuDemo() {
  return (
    <Menu
      trigger={<Button variant="secondary" size="sm">Options ▾</Button>}
      items={[
        { label: "Duplicate", icon: "⧉" },
        { label: "Rename", icon: "✎" },
        { label: "Archive", icon: "▤" },
        { label: "Delete", icon: "✕" },
      ]}
      onSelect={(label) => console.log(label)}
    />
  );
}

function PopoverDemo() {
  return (
    <Popover trigger={<Button variant="secondary" size="sm">Show popover</Button>}>
      <strong style={{ color: "var(--text)" }}>Anchored panel</strong>
      <br />
      Portals to the body and closes on outside click.
    </Popover>
  );
}

function SpeedDialDemo() {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: 8 }}>
      <SpeedDial
        actions={[
          { label: "New file", icon: "＋", onSelect: () => {} },
          { label: "Upload", icon: "↑", onSelect: () => {} },
          { label: "Share", icon: "↗", onSelect: () => {} },
        ]}
      />
    </div>
  );
}

function DrawerDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="secondary" size="sm" onClick={() => setOpen(true)}>Open drawer</Button>
      <Drawer open={open} onClose={() => setOpen(false)} side="right" title="Settings">
        <Stack spacing={2}>
          <span>Navigation panels, filters, or settings live here.</span>
          <Switch id="drawer-demo" checked onChange={() => {}} />
        </Stack>
      </Drawer>
    </>
  );
}

function BackdropDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="secondary" size="sm" onClick={() => setOpen(true)}>Show backdrop</Button>
      <Backdrop open={open} onClose={() => setOpen(false)}>
        <Card title="Focused content" description="Everything behind is dimmed and blurred.">
          <Button size="sm" onClick={() => setOpen(false)}>Dismiss</Button>
        </Card>
      </Backdrop>
    </>
  );
}

function BottomNavDemo() {
  const [tab, setTab] = useState("Home");
  return (
    <BottomNavigation
      value={tab}
      onChange={setTab}
      items={[
        { label: "Home", icon: "⌂" },
        { label: "Search", icon: "⌕" },
        { label: "New", icon: "＋" },
        { label: "Profile", icon: "◉" },
      ]}
    />
  );
}

function PaginationDemo() {
  const [page, setPage] = useState(2);
  return <Pagination page={page} pageCount={5} onChange={setPage} />;
}

function RatingDemo() {
  const [value, setValue] = useState(3);
  return <Rating value={value} onChange={setValue} />;
}

function NumberFieldDemo() {
  const [value, setValue] = useState(4);
  return <NumberField label="Replicas" value={value} onChange={setValue} min={1} max={12} />;
}

function ToggleDemo() {
  const [single, setSingle] = useState("Day");
  const [multi, setMulti] = useState(["Bold"]);
  return (
    <div className="stack">
      <ToggleButtonGroup options={["Day", "Week", "Month"]} value={single} onChange={setSingle} />
      <ToggleButtonGroup options={["Bold", "Italic", "Underline"]} value={multi} onChange={setMulti} multiple />
    </div>
  );
}

function TransferDemo() {
  return <TransferList items={["Design", "Frontend", "Backend", "Infra", "Docs"]} />;
}

function CollapseDemo() {
  const [show, setShow] = useState(true);
  return (
    <>
      <Button variant="secondary" size="sm" onClick={() => setShow(!show)}>Toggle</Button>
      <div style={{ height: 12 }} />
      <Collapse show={show}>
        <Alert variant="info">Collapsing smoothly with grid-template-rows.</Alert>
      </Collapse>
    </>
  );
}

function MediaQueryDemo() {
  const isNarrow = useMediaQuery("(max-width: 720px)");
  return (
    <Alert variant={isNarrow ? "warning" : "success"}>
      {isNarrow ? "Viewport is narrow (≤ 720px)." : "Viewport is wide (> 720px)."}
    </Alert>
  );
}

function NoSsrDemo() {
  return (
    <NoSsr>
      <Alert variant="success">Rendered on the client only.</Alert>
    </NoSsr>
  );
}

function PortalDemo() {
  return (
    <Portal>
      <span className="mono-label" style={{ display: "block" }}>THIS SPAN LIVES IN DOCUMENT.BODY</span>
    </Portal>
  );
}

export const DOCS = [
  {
    category: "Inputs",
    components: [
      {
        id: "autocomplete",
        name: "Autocomplete",
        blurb: "A text input enhanced by a panel of suggested options, filtered as you type.",
        code: `<Autocomplete
  label="Framework"
  options={["React", "Vue", "Svelte", "Solid"]}
/>`,
        demos: [
          {
            title: "Basic",
            node: (
              <Autocomplete
                id="ac-demo"
                label="Framework"
                options={["React", "Vue", "Svelte", "Solid", "Qwik", "Preact", "Angular"]}
              />
            ),
          },
        ],
      },
      {
        id: "button",
        name: "Button",
        blurb: "Clickable actions in five variants and three sizes, with loading and disabled states.",
        code: `<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>
<Button disabled>Disabled</Button>
<Button><Spinner /> Loading</Button>
<IconButton label="Delete"><Icon name="trash" /></IconButton>`,
        demos: [
          {
            title: "Variants & states",
            node: (
              <div className="row wrap">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
                <Button disabled>Disabled</Button>
                <Button><Spinner /> Loading</Button>
              </div>
            ),
          },
          {
            title: "Icon buttons & sizes",
            node: (
              <div className="row wrap">
                <IconButton label="Search"><Icon name="search" /></IconButton>
                <IconButton label="Edit"><Icon name="edit" /></IconButton>
                <IconButton label="Delete"><Icon name="trash" /></IconButton>
                <IconButton variant="accent" label="Add"><Icon name="plus" /></IconButton>
                <Button size="sm" variant="secondary">Small</Button>
                <Button size="lg">Large</Button>
              </div>
            ),
          },
        ],
      },
      {
        id: "button-group",
        name: "Button Group",
        blurb: "Buttons joined into a single segmented control.",
        code: `<ButtonGroup>
  <Button variant="secondary">Left</Button>
  <Button variant="secondary">Center</Button>
  <Button variant="secondary">Right</Button>
</ButtonGroup>`,
        demos: [
          {
            title: "Joined",
            node: (
              <ButtonGroup>
                <Button variant="secondary">Left</Button>
                <Button variant="secondary">Center</Button>
                <Button variant="secondary">Right</Button>
              </ButtonGroup>
            ),
          },
        ],
      },
      {
        id: "checkbox",
        name: "Checkbox",
        blurb: "Binary selection with a custom lime check.",
        code: `<Checkbox id="nl" label="Subscribe to changelog"
  checked={on} onChange={() => setOn(!on)} />`,
        demos: [
          {
            title: "Controlled",
            node: <CheckboxDemo />,
          },
        ],
      },
      {
        id: "fab",
        name: "Floating Action Button",
        blurb: "A prominent circular action, plus a SpeedDial that expands into mini actions.",
        code: `<Fab icon="+" label="Create" onClick={create} />

<SpeedDial actions={[
  { label: "New file", icon: "＋", onSelect: fn },
  { label: "Upload", icon: "↑", onSelect: fn },
]} />`,
        demos: [
          { title: "FAB", node: <Fab icon="+" label="Create" /> },
          { title: "Speed dial", node: <SpeedDialDemo /> },
        ],
      },
      {
        id: "number-field",
        name: "Number Field",
        blurb: "Numeric input with clamped stepper buttons.",
        code: `<NumberField label="Replicas" value={n} onChange={setN}
  min={1} max={12} step={1} />`,
        demos: [{ title: "Steppers", node: <NumberFieldDemo /> }],
      },
      {
        id: "radio-group",
        name: "Radio Group",
        blurb: "Single selection from a set of options.",
        code: `<RadioGroup name="plan"
  options={["Hobby", "Pro", "Team"]}
  value={plan} onChange={setPlan} />`,
        demos: [{ title: "Vertical", node: <RadioGroupDemo /> }],
      },
      {
        id: "rating",
        name: "Rating",
        blurb: "Star rating with hover preview.",
        code: `<Rating value={stars} onChange={setStars} max={5} />`,
        demos: [{ title: "Controlled", node: <RatingDemo /> }],
      },
      {
        id: "select",
        name: "Select",
        blurb: "Native dropdown styled to match the system.",
        code: `<Select label="Region"
  options={["eu-1 (Frankfurt)", "us-1 (Oregon)"]} />`,
        demos: [
          {
            title: "Basic",
            node: <Select id="sel-doc" label="Region" options={["eu-1 (Frankfurt)", "us-1 (Oregon)", "ap-1 (Tokyo)"]} />,
          },
        ],
      },
      {
        id: "slider",
        name: "Slider",
        blurb: "Range input with a live value readout.",
        code: `<Slider label="Temperature" value={t} onChange={setT}
  min={0} max={100} />`,
        demos: [{ title: "With readout", node: <SliderDemo /> }],
      },
      {
        id: "switch",
        name: "Switch",
        blurb: "Toggle for instant on/off settings.",
        code: `<Switch id="autosave" checked={on}
  onChange={() => setOn(!on)} />`,
        demos: [{ title: "Rows", node: <SwitchDemo /> }],
      },
      {
        id: "text-field",
        name: "Text Field",
        blurb: "Labeled input with hint and error states.",
        code: `<Input label="Email" placeholder="ada@lovelace.dev"
  hint="We never share your email." />

<Input label="API key" error="Invalid key format." />`,
        demos: [
          {
            title: "States",
            node: (
              <div className="stack-sm">
                <Input id="tf-doc" label="Email" placeholder="ada@lovelace.dev" hint="We never share your email." />
                <Input id="tf-err" label="API key" defaultValue="sk-live-0000" error="Invalid key format." />
              </div>
            ),
          },
        ],
      },
      {
        id: "textarea",
        name: "Textarea",
        blurb: "Multi-line input, fixed or auto-growing.",
        code: `<Textarea label="Prompt" placeholder="Describe it..." />

<TextareaAutosize minRows={2} maxRows={8}
  placeholder="Grows as you type" />`,
        demos: [
          {
            title: "Fixed & autosize",
            node: (
              <div className="stack-sm">
                <Textarea id="ta-doc" label="Prompt" placeholder="Describe what you want to build..." />
                <TextareaAutosize placeholder="Grows as you type..." aria-label="Autosize textarea" />
              </div>
            ),
          },
        ],
      },
      {
        id: "toggle-button",
        name: "Toggle Button",
        blurb: "Single or multiple selection segmented buttons.",
        code: `<ToggleButtonGroup options={["Day", "Week"]}
  value={view} onChange={setView} />

<ToggleButtonGroup options={["Bold", "Italic"]}
  value={fmt} onChange={setFmt} multiple />`,
        demos: [{ title: "Single & multiple", node: <ToggleDemo /> }],
      },
      {
        id: "transfer-list",
        name: "Transfer List",
        blurb: "Move selected items between two lists.",
        code: `<TransferList items={["Design", "Frontend", "Backend"]} />`,
        demos: [{ title: "Dual list", node: <TransferDemo /> }],
      },
    ],
  },
  {
    category: "Data display",
    components: [
      {
        id: "avatar",
        name: "Avatar",
        blurb: "Initials in three sizes.",
        code: `<Avatar initials="AL" />
<Avatar initials="KT" size="lg" />`,
        demos: [
          {
            title: "Sizes",
            node: (
              <div className="row">
                <Avatar initials="AL" />
                <Avatar initials="KT" size="lg" />
                <Avatar initials="+9" />
              </div>
            ),
          },
        ],
      },
      {
        id: "badge",
        name: "Badge",
        blurb: "Status pills in five variants with optional dot.",
        code: `<Badge>default</Badge>
<Badge variant="accent">v2.0</Badge>
<Badge variant="success" dot>deployed</Badge>`,
        demos: [
          {
            title: "Variants",
            node: (
              <div className="row wrap">
                <Badge>default</Badge>
                <Badge variant="accent">v2.0</Badge>
                <Badge variant="success" dot>deployed</Badge>
                <Badge variant="warning" dot>pending</Badge>
                <Badge variant="error" dot>failed</Badge>
              </div>
            ),
          },
        ],
      },
      {
        id: "chip",
        name: "Chip",
        blurb: "Compact tags, optionally removable.",
        code: `<Chip>react</Chip>
<Chip variant="accent">wip</Chip>
<Chip onRemove={() => remove("legacy")}>legacy</Chip>`,
        demos: [
          {
            title: "Removable",
            node: (
              <div className="row wrap">
                <Chip>react</Chip>
                <Chip variant="accent">wip</Chip>
                <Chip onRemove={() => {}}>legacy</Chip>
              </div>
            ),
          },
        ],
      },
      {
        id: "divider",
        name: "Divider",
        blurb: "A hairline that separates content.",
        code: `<Divider />`,
        demos: [{ title: "Full width", node: <Divider /> }],
      },
      {
        id: "icons",
        name: "Icons",
        blurb: "A tiny inline SVG icon set — stroke-based, inherits currentColor.",
        code: `import { Icon, ICON_NAMES } from "vibe-ui";

<Icon name="search" size={20} />
<Icon name="trash" size={16} />`,
        demos: [
          {
            title: "All icons",
            node: (
              <div className="row wrap" style={{ gap: 16 }}>
                {ICON_NAMES.map((name) => (
                  <span key={name} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--text-faint)", fontFamily: "var(--font-mono)" }}>
                    <Icon name={name} size={16} /> {name}
                  </span>
                ))}
              </div>
            ),
          },
        ],
      },
      {
        id: "image-list",
        name: "Image List",
        blurb: "A responsive grid of media tiles.",
        code: `<ImageList columns={3}
  items={[{ label: "sunset", hue: 20 }, ...]} />`,
        demos: [
          {
            title: "Grid",
            node: (
              <ImageList
                columns={3}
                items={[
                  { label: "sunset", hue: 20 },
                  { label: "ocean", hue: 200 },
                  { label: "forest", hue: 130 },
                  { label: "neon", hue: 280 },
                  { label: "citrus", hue: 60 },
                  { label: "rose", hue: 330 },
                ]}
              />
            ),
          },
        ],
      },
      {
        id: "kbd",
        name: "Keyboard key",
        blurb: "Renders keyboard shortcuts.",
        code: `<Kbd>⌘</Kbd> <Kbd>K</Kbd>`,
        demos: [
          {
            title: "Shortcut",
            node: (
              <div className="row">
                <Kbd>⌘</Kbd>
                <Kbd>K</Kbd>
                <span style={{ color: "var(--text-faint)", fontSize: 13 }}>to search</span>
              </div>
            ),
          },
        ],
      },
      {
        id: "list",
        name: "List",
        blurb: "Simple stacked items with optional secondary text and selection.",
        code: `<List>
  <ListItem selected secondary="42s">web-prod</ListItem>
  <ListItem secondary="building">worker-2</ListItem>
</List>`,
        demos: [
          {
            title: "Selectable",
            node: <ListDemo />,
          },
        ],
      },
      {
        id: "skeleton",
        name: "Skeleton",
        blurb: "Shimmering placeholder while content loads.",
        code: `<Skeleton width="60%" height={18} />
<Skeleton width="100%" height={12} />`,
        demos: [
          {
            title: "Loading state",
            node: (
              <div className="stack-sm">
                <Skeleton width="60%" height={18} />
                <Skeleton width="100%" height={12} />
                <Skeleton width="90%" height={12} />
              </div>
            ),
          },
        ],
      },
      {
        id: "table",
        name: "Table",
        blurb: "Compact data table with mono headers and hover rows.",
        code: `<Table
  columns={["Deployment", "Region", "Status"]}
  rows={[["web-prod", "eu-1", "running"]]}
/>`,
        demos: [
          {
            title: "Basic",
            node: (
              <Table
                columns={["Deployment", "Region", "Status"]}
                rows={[
                  ["web-prod", "eu-1", "running"],
                  ["worker-2", "us-1", "building"],
                ]}
              />
            ),
          },
        ],
      },
      {
        id: "tooltip",
        name: "Tooltip",
        blurb: "Hover / focus label above any element.",
        code: `<Tooltip label="Neon, as promised">
  <Button variant="secondary">Hover me</Button>
</Tooltip>`,
        demos: [
          {
            title: "Hover",
            node: (
              <Tooltip label="Neon, as promised">
                <Button variant="secondary" size="sm">Hover me</Button>
              </Tooltip>
            ),
          },
        ],
      },
      {
        id: "typography",
        name: "Typography",
        blurb: "One component for every text style in the system.",
        code: `<Typography variant="h1">Heading</Typography>
<Typography variant="subtitle">Subtitle</Typography>
<Typography variant="body1">Body</Typography>
<Typography variant="mono">code</Typography>`,
        demos: [
          {
            title: "Scale",
            node: (
              <div className="stack-sm">
                <Typography variant="h2">h2 · Build fast</Typography>
                <Typography variant="subtitle">subtitle · A supporting line of copy.</Typography>
                <Typography variant="body2">body2 · Regular paragraph text.</Typography>
                <Typography variant="mono">mono · npm i vibe-ui</Typography>
                <Typography variant="caption">caption · fine print</Typography>
              </div>
            ),
          },
        ],
      },
    ],
  },
  {
    category: "Feedback",
    components: [
      {
        id: "alert",
        name: "Alert",
        blurb: "Inline callouts in four severities.",
        code: `<Alert variant="success" title="Build passed">
  Deployed in 42s.
</Alert>`,
        demos: [
          {
            title: "Severities",
            node: (
              <div className="stack-sm">
                <Alert variant="info" title="Heads up">A new version is available.</Alert>
                <Alert variant="success" title="Build passed">Deployed in 42s.</Alert>
              </div>
            ),
          },
        ],
      },
      {
        id: "backdrop",
        name: "Backdrop",
        blurb: "Full-screen dimmed overlay that focuses content.",
        code: `<Backdrop open={open} onClose={close}>
  <Card>Focused content</Card>
</Backdrop>`,
        demos: [{ title: "With content", node: <BackdropDemo /> }],
      },
      {
        id: "dialog",
        name: "Dialog",
        blurb: "Modal confirmation with header, body, and footer. Closes on Esc and outside click.",
        code: `<Dialog open={open} onClose={close} title="Delete?"
  footer={<Button variant="danger">Delete</Button>}>
  There is no undo.
</Dialog>`,
        demos: [{ title: "Confirmation", node: <ModalDemo /> }],
      },
      {
        id: "progress",
        name: "Progress",
        blurb: "Linear determinate bar.",
        code: `<Progress value={72} />`,
        demos: [{ title: "Determinate", node: <Progress value={72} /> }],
      },
      {
        id: "snackbar",
        name: "Snackbar / Toast",
        blurb: "Transient notifications in five accent variants.",
        code: `<Toast variant="success" title="Deployed"
  description="prod-eu-1 · 42s" onClose={close} />`,
        demos: [{ title: "All variants", node: <ToastVariantsDemo /> }],
      },
      {
        id: "spinner",
        name: "Spinner",
        blurb: "Indeterminate loading indicator.",
        code: `<Spinner />`,
        demos: [{ title: "Inline", node: <div className="row"><Spinner /><span style={{ color: "var(--text-faint)", fontSize: 13 }}>Loading…</span></div> }],
      },
    ],
  },
  {
    category: "Surfaces",
    components: [
      {
        id: "accordion",
        name: "Accordion",
        blurb: "Expandable sections, single or multi open.",
        code: `<Accordion items={[
  { title: "Zero dependencies?", content: "Yes." },
]} />`,
        demos: [
          {
            title: "Two items",
            node: (
              <Accordion
                items={[
                  { title: "Is it really zero dependencies?", content: "Yes. Plain React and plain CSS." },
                  { title: "Can my AI write this markup?", content: "That is the whole point." },
                ]}
              />
            ),
          },
        ],
      },
      {
        id: "app-bar",
        name: "App Bar",
        blurb: "Top bar for app shells.",
        code: `<AppBar>
  <strong>vibe.ui</strong>
  <Badge variant="success" dot>live</Badge>
</AppBar>`,
        demos: [
          {
            title: "With actions",
            node: (
              <AppBar>
                <strong style={{ fontSize: 16 }}>vibe.ui</strong>
                <Badge variant="success" dot>live</Badge>
                <span style={{ marginLeft: "auto" }}>
                  <IconButton label="Settings"><Icon name="settings" /></IconButton>
                </span>
              </AppBar>
            ),
          },
        ],
      },
      {
        id: "card",
        name: "Card",
        blurb: "Header, body, footer surface with hoverable option.",
        code: `<Card title="Pro plan" description="For teams."
  hoverable footer={<Button size="sm">Upgrade</Button>}>
  Unlimited projects
</Card>`,
        demos: [
          {
            title: "Full anatomy",
            node: (
              <Card
                hoverable
                title="Pro plan"
                description="For teams shipping fast."
                footer={<Button size="sm">Upgrade</Button>}
              >
                Unlimited projects · Priority support
              </Card>
            ),
          },
        ],
      },
      {
        id: "paper",
        name: "Paper",
        blurb: "Elevated surface with optional shadow depth.",
        code: `<Paper elevation={2}>Content</Paper>`,
        demos: [
          {
            title: "Elevation",
            node: (
              <div className="row wrap">
                <Paper elevation={0} style={{ width: 120, textAlign: "center" }}>flat</Paper>
                <Paper elevation={2} style={{ width: 120, textAlign: "center" }}>elev 2</Paper>
                <Paper elevation={4} style={{ width: 120, textAlign: "center" }}>elev 4</Paper>
              </div>
            ),
          },
        ],
      },
    ],
  },
  {
    category: "Navigation",
    components: [
      {
        id: "bottom-navigation",
        name: "Bottom Navigation",
        blurb: "Mobile-style tab bar with icon + label.",
        code: `<BottomNavigation value={tab} onChange={setTab}
  items={[{ label: "Home", icon: "⌂" }, ...]} />`,
        demos: [{ title: "Tabs", node: <BottomNavDemo /> }],
      },
      {
        id: "breadcrumbs",
        name: "Breadcrumbs",
        blurb: "Hierarchy trail with current page emphasis.",
        code: `<Breadcrumb items={["Home", "Project", "Deployments"]} />`,
        demos: [{ title: "Trail", node: <Breadcrumb items={["Home", "Project", "Deployments"]} /> }],
      },
      {
        id: "drawer",
        name: "Drawer",
        blurb: "Sliding side panel with overlay, left or right.",
        code: `<Drawer open={open} onClose={close} side="right"
  title="Settings">
  Content
</Drawer>`,
        demos: [{ title: "Right side", node: <DrawerDemo /> }],
      },
      {
        id: "link",
        name: "Link",
        blurb: "Styled anchor with optional accent color.",
        code: `<Link href="/docs">Docs</Link>
<Link accent href="/pro">Go Pro</Link>`,
        demos: [
          {
            title: "Inline",
            node: (
              <Typography variant="body1">
                Read the <Link href="#docs">docs</Link> or go <Link accent href="#pro">Pro</Link>.
              </Typography>
            ),
          },
        ],
      },
      {
        id: "menu",
        name: "Menu",
        blurb: "Dropdown with icons; closes on outside click.",
        code: `<Menu
  trigger={<Button variant="secondary">Options ▾</Button>}
  items={[
    { label: "Rename", icon: "✎" },
    { label: "Delete", icon: "✕" },
  ]}
  onSelect={console.log}
/>`,
        demos: [{ title: "Dropdown", node: <MenuDemo /> }],
      },
      {
        id: "pagination",
        name: "Pagination",
        blurb: "Numbered pages with prev / next.",
        code: `<Pagination page={page} pageCount={5}
  onChange={setPage} />`,
        demos: [{ title: "Five pages", node: <PaginationDemo /> }],
      },
      {
        id: "speed-dial",
        name: "Speed Dial",
        blurb: "See Floating Action Button — expands into labeled mini actions.",
        code: `<SpeedDial actions={[{ label: "Share", icon: "↗" }]} />`,
        demos: [{ title: "Expanded", node: <SpeedDialDemo /> }],
      },
      {
        id: "stepper",
        name: "Stepper",
        blurb: "Progress through numbered steps.",
        code: `<Stepper steps={["Build", "Test", "Deploy"]}
  current={1} />`,
        demos: [{ title: "Step 2 of 3", node: <Stepper steps={["Build", "Test", "Deploy"]} current={1} /> }],
      },
      {
        id: "tabs",
        name: "Tabs",
        blurb: "Switch between panels with an animated underline.",
        code: `<Tabs tabs={[
  { label: "Preview", content: "Live preview." },
  { label: "Logs", content: "42s" },
]} />`,
        demos: [
          {
            title: "Three panels",
            node: (
              <Tabs
                tabs={[
                  { label: "Preview", content: "Live preview of your app." },
                  { label: "Logs", content: "▸ build finished in 42s" },
                  { label: "Settings", content: "Region: eu-1" },
                ]}
              />
            ),
          },
        ],
      },
    ],
  },
  {
    category: "Layout",
    components: [
      {
        id: "box",
        name: "Box",
        blurb: "A styled div primitive — your escape hatch.",
        code: `<Box padding={4} border="1px solid var(--border)">
  Content
</Box>`,
        demos: [
          {
            title: "Framed",
            node: <Box style={{ padding: 20, border: "1px dashed var(--border-strong)", borderRadius: "var(--radius-md)" }}>A box.</Box>,
          },
        ],
      },
      {
        id: "container",
        name: "Container",
        blurb: "Centered max-width wrapper for page content.",
        code: `<Container maxWidth={1100}>
  Page content
</Container>`,
        demos: [
          {
            title: "Centered",
            node: (
              <div style={{ background: "var(--bg-hover)", borderRadius: "var(--radius-md)", padding: 8 }}>
                <Container maxWidth={400}>
                  <div style={{ background: "var(--accent-subtle)", textAlign: "center", borderRadius: 8, padding: 12, fontFamily: "var(--font-mono)", fontSize: 12 }}>maxWidth: 400</div>
                </Container>
              </div>
            ),
          },
        ],
      },
      {
        id: "grid",
        name: "Grid",
        blurb: "CSS grid with columns and spacing props.",
        code: `<Grid columns={3} spacing={2}>
  <Card>1</Card><Card>2</Card><Card>3</Card>
</Grid>`,
        demos: [
          {
            title: "Three columns",
            node: (
              <Grid columns={3} spacing={2}>
                {["one", "two", "three"].map((t) => (
                  <div key={t} style={{ background: "var(--bg-hover)", borderRadius: "var(--radius-md)", padding: 16, textAlign: "center", fontFamily: "var(--font-mono)", fontSize: 12 }}>{t}</div>
                ))}
              </Grid>
            ),
          },
        ],
      },
      {
        id: "stack",
        name: "Stack",
        blurb: "Flex layout with direction and spacing props.",
        code: `<Stack direction="row" spacing={2}>
  <Button>A</Button><Button>B</Button>
</Stack>`,
        demos: [
          {
            title: "Row & column",
            node: (
              <Stack direction="row" spacing={2}>
                <Button size="sm" variant="secondary">A</Button>
                <Button size="sm" variant="secondary">B</Button>
                <Button size="sm" variant="secondary">C</Button>
              </Stack>
            ),
          },
        ],
      },
    ],
  },
  {
    category: "Utils",
    components: [
      {
        id: "click-away-listener",
        name: "Click-Away Listener",
        blurb: "Fires a callback when clicking outside children. Powers Menu and Popover.",
        code: `<ClickAwayListener onClickAway={close}>
  <div>Content</div>
</ClickAwayListener>`,
        demos: [{ title: "Wrapped", node: <ClickAwayListener onClickAway={() => {}}><Button variant="secondary" size="sm">Click outside me</Button></ClickAwayListener> }],
      },
      {
        id: "css-baseline",
        name: "CSS Baseline",
        blurb: "Global reset — already applied via the library stylesheet. This component is a no-op kept for API familiarity.",
        code: `import { CssBaseline } from "vibe-ui";
// renders null; the reset lives in index.css
<CssBaseline />`,
        demos: [],
      },
      {
        id: "empty-state",
        name: "Empty State",
        blurb: "Friendly placeholder for empty lists and zero-data screens.",
        code: `<EmptyState icon="◇" title="No deployments yet"
  description="Ship your first build."
  action={<Button>Create</Button>} />`,
        demos: [
          {
            title: "With action",
            node: (
              <EmptyState
                icon="◇"
                title="No deployments yet"
                description="Connect a repo and ship your first build."
                action={<Button size="sm">Create deployment</Button>}
              />
            ),
          },
        ],
      },
      {
        id: "init-color-scheme-script",
        name: "InitColorSchemeScript",
        blurb: "Inline script that applies the saved theme before first paint — prevents flash of wrong theme.",
        code: `// in index.html <body>:
<InitColorSchemeScript />`,
        demos: [],
      },
      {
        id: "modal",
        name: "Modal",
        blurb: "Low-level modal — Dialog is the styled version. Portals to document.body.",
        code: `<Modal open={open} onClose={close} title="Title">
  Body
</Modal>`,
        demos: [{ title: "Dialog alias", node: <ModalDemo /> }],
      },
      {
        id: "no-ssr",
        name: "No SSR",
        blurb: "Renders children only after hydration.",
        code: `<NoSsr>
  <ClientOnlyWidget />
</NoSsr>`,
        demos: [{ title: "Client only", node: <NoSsrDemo /> }],
      },
      {
        id: "popover",
        name: "Popover",
        blurb: "Anchored floating panel; Popper is an alias.",
        code: `<Popover trigger={<Button>Info</Button>}>
  Anchored content
</Popover>`,
        demos: [{ title: "Anchored", node: <PopoverDemo /> }],
      },
      {
        id: "portal",
        name: "Portal",
        blurb: "Renders children into document.body.",
        code: `<Portal>
  <span>Escapes the DOM tree</span>
</Portal>`,
        demos: [{ title: "Escaped node", node: <PortalDemo /> }],
      },
      {
        id: "transitions",
        name: "Transitions",
        blurb: "Fade, Collapse, and Slide wrappers driven by a boolean.",
        code: `<Fade show={show}><Alert>Hi</Alert></Fade>
<Collapse show={show}><Alert>Hi</Alert></Collapse>
<Slide show={show}><Alert>Hi</Alert></Slide>`,
        demos: [{ title: "Collapse", node: <CollapseDemo /> }],
      },
      {
        id: "use-media-query",
        name: "useMediaQuery",
        blurb: "React hook for CSS media queries.",
        code: `const isNarrow = useMediaQuery("(max-width: 720px)");`,
        demos: [{ title: "Live", node: <MediaQueryDemo /> }],
      },
    ],
  },
];

function CheckboxDemo() {
  const [on, setOn] = useState(true);
  return <Checkbox id="nl-doc" label="Subscribe to changelog" checked={on} onChange={() => setOn(!on)} />;
}

function RadioGroupDemo() {
  const [plan, setPlan] = useState("Pro");
  return <RadioGroup name="plan-doc" options={["Hobby", "Pro", "Team"]} value={plan} onChange={setPlan} />;
}

function SliderDemo() {
  const [t, setT] = useState(70);
  return <Slider label="Temperature" value={t} onChange={setT} />;
}

function SwitchDemo() {
  return (
    <div className="stack-sm">
      {[["Autosave", true], ["Telemetry", false]].map(([label, def]) => (
        <SwitchRow key={label} label={label} defaultOn={def} />
      ))}
    </div>
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

function ListDemo() {
  const [sel, setSel] = useState("web-prod");
  return (
    <List>
      <ListItem selected={sel === "web-prod"} secondary="42s" onClick={() => setSel("web-prod")}>web-prod</ListItem>
      <ListItem selected={sel === "worker-2"} secondary="building" onClick={() => setSel("worker-2")}>worker-2</ListItem>
      <ListItem selected={sel === "cron"} secondary="idle" onClick={() => setSel("cron")}>cron-daily</ListItem>
    </List>
  );
}
