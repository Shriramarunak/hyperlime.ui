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

const p = (name, type, def, desc) => ({ name, type, def, desc });

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

function ToastDemo() {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button size="sm" onClick={() => setVisible(true)}>Trigger toast</Button>
      {visible && (
        <div className="toast-anchor">
          <Toast variant="success" title="Deployed" description="prod-eu-1 · rolling out" onClose={() => setVisible(false)} />
        </div>
      )}
    </>
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

function ToggleSingleDemo() {
  const [view, setView] = useState("Day");
  return <ToggleButtonGroup options={["Day", "Week", "Month"]} value={view} onChange={setView} />;
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

export const DOCS = [
  {
    category: "Inputs",
    components: [
      {
        id: "autocomplete",
        name: "Autocomplete",
        blurb: "A normal text input enhanced by a panel of suggested options, filtered as you type.",
        a11y: "The listbox uses role=\"listbox\" with role=\"option\" children. Options are selectable by mouse or touch; the input remains a standard focusable field.",
        props: [
          p("options", "string[]", "[]", "Suggested values, filtered by the current input."),
          p("label", "string", "—", "Visible label rendered above the input."),
          p("id", "string", "—", "DOM id, linked to the label for accessibility."),
          p("placeholder", "string", '"Start typing..."', "Placeholder text."),
        ],
        demos: [
          {
            title: "Basic",
            code: `<Autocomplete
  label="Framework"
  options={["React", "Vue", "Svelte", "Solid", "Qwik"]}
/>`,
            node: (
              <Autocomplete
                id="ac-demo"
                label="Framework"
                options={["React", "Vue", "Svelte", "Solid", "Qwik", "Preact", "Angular"]}
              />
            ),
          },
          {
            title: "Playground",
            code: `<Autocomplete
  label="Region"
  placeholder="Filter regions..."
  options={["eu-1", "eu-2", "us-1", "us-2", "ap-1"]}
/>`,
            node: (
              <Autocomplete
                id="ac-demo-2"
                label="Region"
                placeholder="Filter regions..."
                options={["eu-1 (Frankfurt)", "eu-2 (Paris)", "us-1 (Oregon)", "us-2 (Ohio)", "ap-1 (Tokyo)"]}
              />
            ),
          },
        ],
      },
      {
        id: "button",
        name: "Button",
        blurb: "Buttons trigger actions. Five variants, three sizes, loading and disabled states.",
        a11y: "Renders a native <button>. Focus-visible ring uses the accent token. Disabled buttons keep their aria attributes but ignore pointer events.",
        css: `.vb-btn--primary   /* lime fill, dark text */
.vb-btn--secondary /* outlined */
.vb-btn--ghost     /* transparent */
.vb-btn--danger    /* red outline */
.vb-btn--sm / --lg /* sizes */`,
        props: [
          p("variant", '"primary" | "secondary" | "ghost" | "danger"', '"primary"', "Visual style."),
          p("size", '"sm" | "md" | "lg"', '"md"', "Padding and font size."),
          p("disabled", "boolean", "false", "Disables interaction and dims."),
          p("children", "node", "—", "Content. Wrap a <Spinner /> for loading."),
          p("...rest", "button props", "—", "Forwards onClick, type, aria-*, etc."),
        ],
        demos: [
          {
            title: "Variants",
            code: `<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>`,
            node: (
              <div className="row wrap">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
              </div>
            ),
          },
          {
            title: "States",
            code: `<Button disabled>Disabled</Button>
<Button><Spinner /> Loading</Button>`,
            node: (
              <div className="row wrap">
                <Button disabled>Disabled</Button>
                <Button><Spinner /> Loading</Button>
              </div>
            ),
          },
          {
            title: "Sizes",
            code: `<Button size="sm" variant="secondary">Small</Button>
<Button>Medium</Button>
<Button size="lg">Large</Button>`,
            node: (
              <div className="row wrap">
                <Button size="sm" variant="secondary">Small</Button>
                <Button>Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            ),
          },
        ],
      },
      {
        id: "button-group",
        name: "Button Group",
        blurb: "Groups related buttons into a single joined segmented control.",
        a11y: "Uses role=\"group\". Keep the group's purpose clear from its buttons' labels.",
        css: `.vb-buttongroup            /* joins children */
.vb-buttongroup .vb-btn    /* radius collapsed */`,
        props: [
          p("children", "node", "—", "Two or more <Button> elements."),
          p("...rest", "div props", "—", "Forwards to the wrapper."),
        ],
        demos: [
          {
            title: "Joined",
            code: `<ButtonGroup>
  <Button variant="secondary">Left</Button>
  <Button variant="secondary">Center</Button>
  <Button variant="secondary">Right</Button>
</ButtonGroup>`,
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
        blurb: "Binary selection with a custom lime check mark.",
        a11y: "Native <input type=\"checkbox\"> with a visible focus ring. Label is linked via htmlFor.",
        css: `.vb-checkbox        /* label + box row */
input:checked       /* lime fill + check */`,
        props: [
          p("label", "string", "—", "Text next to the box."),
          p("checked", "boolean", "—", "Controlled state."),
          p("onChange", "function", "—", "Called with the change event."),
          p("id", "string", "—", "Links label and input."),
        ],
        demos: [
          {
            title: "Controlled",
            code: `const [on, setOn] = useState(true);

<Checkbox
  id="nl"
  label="Subscribe to changelog"
  checked={on}
  onChange={() => setOn(!on)}
/>`,
            node: <CheckboxDemo />,
          },
        ],
      },
      {
        id: "fab",
        name: "Floating Action Button",
        blurb: "A prominent circular action button, plus a SpeedDial that expands into labeled mini actions.",
        a11y: "Requires a label prop used as aria-label and title. SpeedDial trigger exposes aria-expanded.",
        css: `.vb-fab               /* 56px circle, lime */
.vb-speeddial         /* stack wrapper */
.vb-speeddial__mini   /* 40px action */`,
        props: [
          p("icon", "node", '"+"', "Content inside the circle."),
          p("label", "string", "—", "Accessible name."),
          p("onClick", "function", "—", "Click handler."),
        ],
        demos: [
          {
            title: "FAB",
            code: `<Fab icon="+" label="Create" onClick={create} />`,
            node: <Fab icon="+" label="Create" />,
          },
          {
            title: "Speed dial",
            code: `<SpeedDial
  actions={[
    { label: "New file", icon: "＋", onSelect: fn },
    { label: "Upload", icon: "↑", onSelect: fn },
    { label: "Share", icon: "↗", onSelect: fn },
  ]}
/>`,
            node: <SpeedDialDemo />,
          },
        ],
      },
      {
        id: "number-field",
        name: "Number Field",
        blurb: "Numeric input with clamped stepper buttons on both sides.",
        a11y: "Stepper buttons carry aria-labels (Increase / Decrease) and disable at bounds.",
        css: `.vb-numberfield        /* joined row */
.vb-numberfield button /* ± steppers */`,
        props: [
          p("value", "number", "—", "Controlled value."),
          p("onChange", "function", "—", "Called with the clamped number."),
          p("min / max", "number", "0 / 100", "Bounds for clamping."),
          p("step", "number", "1", "Increment per click."),
          p("label", "string", "—", "Visible label."),
        ],
        demos: [
          {
            title: "Steppers",
            code: `const [n, setN] = useState(4);

<NumberField label="Replicas" value={n}
  onChange={setN} min={1} max={12} step={1} />`,
            node: <NumberFieldDemo />,
          },
        ],
      },
      {
        id: "radio-group",
        name: "Radio Group",
        blurb: "Single selection from a small set of options.",
        a11y: "Native radio inputs share a name so arrow-key navigation works out of the box.",
        css: `.vb-radio           /* label row */
input:checked       /* thick lime ring */`,
        props: [
          p("name", "string", "required", "Shared radio group name."),
          p("options", "string[]", "required", "Option labels."),
          p("value", "string", "—", "Controlled selection."),
          p("onChange", "function", "—", "Called with the selected value."),
        ],
        demos: [
          {
            title: "Vertical",
            code: `const [plan, setPlan] = useState("Pro");

<RadioGroup name="plan" options={["Hobby", "Pro", "Team"]}
  value={plan} onChange={setPlan} />`,
            node: <RadioGroupDemo />,
          },
        ],
      },
      {
        id: "rating",
        name: "Rating",
        blurb: "Star rating with hover preview and keyboard support.",
        a11y: "role=\"radiogroup\" with per-star aria-labels; each star is a focusable button.",
        css: `.vb-rating__star--filled /* lime star */`,
        props: [
          p("value", "number", "0", "Controlled rating."),
          p("onChange", "function", "—", "Called with the clicked star."),
          p("max", "number", "5", "Number of stars."),
        ],
        demos: [
          {
            title: "Controlled",
            code: `const [stars, setStars] = useState(3);

<Rating value={stars} onChange={setStars} max={5} />`,
            node: <RatingDemo />,
          },
        ],
      },
      {
        id: "select",
        name: "Select",
        blurb: "Native dropdown styled to match the system, with chevron affordance.",
        a11y: "Uses the native <select> for full keyboard and screen-reader support.",
        css: `.vb-select__native  /* styled select */
.vb-select__chevron /* ▾ indicator */`,
        props: [
          p("options", "string[]", "[]", "Dropdown entries."),
          p("label", "string", "—", "Visible label."),
          p("id", "string", "—", "Links label and select."),
          p("...rest", "select props", "—", "value, onChange, etc."),
        ],
        demos: [
          {
            title: "Basic",
            code: `<Select label="Region"
  options={["eu-1 (Frankfurt)", "us-1 (Oregon)", "ap-1 (Tokyo)"]}
/>`,
            node: <Select id="sel-doc" label="Region" options={["eu-1 (Frankfurt)", "us-1 (Oregon)", "ap-1 (Tokyo)"]} />,
          },
        ],
      },
      {
        id: "slider",
        name: "Slider",
        blurb: "Range input with an optional live value readout.",
        a11y: "Native range input; arrow keys adjust the value.",
        css: `.vb-slider                    /* track */
.vb-slider::-webkit-slider-thumb /* lime knob */`,
        props: [
          p("value", "number", "0", "Controlled value."),
          p("onChange", "function", "—", "Called with the number."),
          p("min / max", "number", "0 / 100", "Range bounds."),
          p("label", "string", "—", "Shows a readout row above."),
        ],
        demos: [
          {
            title: "With readout",
            code: `const [t, setT] = useState(70);

<Slider label="Temperature" value={t}
  onChange={setT} min={0} max={100} />`,
            node: <SliderDemo />,
          },
        ],
      },
      {
        id: "switch",
        name: "Switch",
        blurb: "Toggle for settings that apply immediately.",
        a11y: "Native checkbox with role=\"switch\"; thumb animates between states.",
        css: `.vb-switch__track  /* pill background */
.vb-switch__thumb  /* sliding knob */`,
        props: [
          p("checked", "boolean", "—", "Controlled state."),
          p("onChange", "function", "—", "Change handler."),
          p("label", "string", "—", "Visually hidden label."),
          p("id", "string", "—", "Links the wrapping label."),
        ],
        demos: [
          {
            title: "Setting rows",
            code: `<div className="switch-row">
  <span>Autosave</span>
  <Switch id="autosave" checked={on}
    onChange={() => setOn(!on)} />
</div>`,
            node: <SwitchDemo />,
          },
        ],
      },
      {
        id: "text-field",
        name: "Text Field",
        blurb: "Labeled input with hint and error states, focus ring included.",
        a11y: "Label is linked via htmlFor; errors set aria-invalid and aria-describedby.",
        css: `.vb-input          /* base input */
.vb-input--error   /* red border */
.vb-field__hint    /* helper / error text */`,
        props: [
          p("label", "string", "—", "Visible label."),
          p("hint", "string", "—", "Helper text below."),
          p("error", "string", "—", "Error text; overrides hint and turns red."),
          p("id", "string", "—", "Links label and input."),
          p("...rest", "input props", "—", "value, placeholder, type, etc."),
        ],
        demos: [
          {
            title: "Default & hint",
            code: `<Input label="Email" placeholder="ada@lovelace.dev"
  hint="We never share your email." />`,
            node: <Input id="tf-doc" label="Email" placeholder="ada@lovelace.dev" hint="We never share your email." />,
          },
          {
            title: "Error",
            code: `<Input label="API key" defaultValue="sk-live-0000"
  error="Invalid key format." />`,
            node: <Input id="tf-err" label="API key" defaultValue="sk-live-0000" error="Invalid key format." />,
          },
        ],
      },
      {
        id: "textarea",
        name: "Textarea",
        blurb: "Multi-line input, fixed height or auto-growing.",
        a11y: "Standard textarea semantics; pair with a label.",
        css: `.vb-textarea  /* base, resizable vertical */`,
        props: [
          p("label", "string", "—", "Visible label."),
          p("hint / error", "string", "—", "Helper or error text."),
          p("rows", "number", "3", "Fixed height (Textarea)."),
          p("minRows / maxRows", "number", "2 / 10", "Growth bounds (TextareaAutosize)."),
        ],
        demos: [
          {
            title: "Fixed",
            code: `<Textarea label="Prompt"
  placeholder="Describe what you want to build..." />`,
            node: <Textarea id="ta-doc" label="Prompt" placeholder="Describe what you want to build..." />,
          },
          {
            title: "Autosize",
            code: `<TextareaAutosize minRows={2} maxRows={8}
  placeholder="Grows as you type..." />`,
            node: <TextareaAutosize placeholder="Grows as you type..." aria-label="Autosize textarea" />,
          },
        ],
      },
      {
        id: "toggle-button",
        name: "Toggle Button",
        blurb: "Segmented buttons for single or multiple selection.",
        a11y: "Buttons expose aria-pressed reflecting their state.",
        css: `.vb-togglegroup          /* pill container */
.vb-togglegroup__btn--active /* lime fill */`,
        props: [
          p("options", "string[]", "required", "Segment labels."),
          p("value", "string | string[]", "—", "Selection; array when multiple."),
          p("onChange", "function", "—", "Called with the new value."),
          p("multiple", "boolean", "false", "Allow multiple selections."),
        ],
        demos: [
          {
            title: "Single",
            code: `const [view, setView] = useState("Day");

<ToggleButtonGroup options={["Day", "Week", "Month"]}
  value={view} onChange={setView} />`,
            node: <ToggleSingleDemo />,
          },
          {
            title: "Multiple",
            code: `const [fmt, setFmt] = useState(["Bold"]);

<ToggleButtonGroup options={["Bold", "Italic", "Underline"]}
  value={fmt} onChange={setFmt} multiple />`,
            node: <ToggleDemo />,
          },
        ],
      },
      {
        id: "transfer-list",
        name: "Transfer List",
        blurb: "Move selected items between two lists with arrow buttons.",
        a11y: "Lists use role=\"listbox\" with aria-multiselectable; items announce selection.",
        css: `.vb-transfer              /* dual layout */
.vb-transfer__item--selected /* lime tint */`,
        props: [
          p("items", "string[]", "[]", "Items starting in the left list."),
        ],
        demos: [
          {
            title: "Dual list",
            code: `<TransferList
  items={["Design", "Frontend", "Backend", "Infra", "Docs"]}
/>`,
            node: <TransferList items={["Design", "Frontend", "Backend", "Infra", "Docs"]} />,
          },
        ],
      },
    ],
  },
  {
    category: "Data display",
    components: [
      {
        id: "avatar",
        name: "Avatar",
        blurb: "Initials in a lime circle, three sizes.",
        a11y: "Purely visual; pair with a visible or sr-only name when identity matters.",
        css: `.vb-avatar          /* lime circle */
.vb-avatar--sm/--lg /* sizes */`,
        props: [
          p("initials", "string", "—", "Shown in the circle."),
          p("size", '"sm" | "md" | "lg"', '"md"', "Diameter."),
        ],
        demos: [
          {
            title: "Sizes",
            code: `<Avatar initials="AL" />
<Avatar initials="KT" size="lg" />
<Avatar initials="+9" />`,
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
        blurb: "Small status pills in five variants with an optional status dot.",
        a11y: "Color is paired with the dot/text so status isn't color-only. Add sr-only text for critical statuses.",
        css: `.vb-badge--accent   /* lime fill */
.vb-badge--success  /* green */
.vb-badge--warning  /* yellow */
.vb-badge--error    /* red */
.vb-badge__dot      /* status dot */`,
        props: [
          p("variant", '"default" | "accent" | "success" | "warning" | "error"', '"default"', "Color scheme."),
          p("dot", "boolean", "false", "Prepends a status dot."),
          p("children", "node", "—", "Badge text."),
        ],
        demos: [
          {
            title: "Variants",
            code: `<Badge>default</Badge>
<Badge variant="accent">v2.0</Badge>
<Badge variant="success" dot>deployed</Badge>
<Badge variant="warning" dot>pending</Badge>
<Badge variant="error" dot>failed</Badge>`,
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
        blurb: "Compact tags for filters and metadata, optionally removable.",
        a11y: "Remove button carries aria-label=\"Remove\".",
        css: `.vb-chip--accent    /* lime tint */
.vb-chip__remove    /* ✕ button */`,
        props: [
          p("variant", '"default" | "accent"', '"default"', "Color scheme."),
          p("onRemove", "function", "—", "When set, shows the ✕ button."),
          p("children", "node", "—", "Chip text."),
        ],
        demos: [
          {
            title: "Removable",
            code: `<Chip>react</Chip>
<Chip variant="accent">wip</Chip>
<Chip onRemove={() => remove("legacy")}>legacy</Chip>`,
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
        blurb: "A hairline that separates content sections.",
        a11y: "Rendered as <hr>; add aria-hidden when purely decorative.",
        css: `.vb-divider  /* 1px line */`,
        props: [],
        demos: [
          {
            title: "Full width",
            code: `<Divider />`,
            node: <Divider />,
          },
        ],
      },
      {
        id: "icons",
        name: "Icons",
        blurb: "A tiny stroke-based SVG icon set that inherits currentColor.",
        a11y: "Icons are aria-hidden by default; provide text or aria-label when the icon is the only content.",
        css: `.vb-icon  /* inherits currentColor */`,
        props: [
          p("name", "string", "required", "One of ICON_NAMES."),
          p("size", "number", "20", "Width and height in px."),
        ],
        demos: [
          {
            title: "All icons",
            code: `import { Icon, ICON_NAMES } from "vibe-ui";

{ICON_NAMES.map((name) => (
  <Icon key={name} name={name} size={16} />
))}`,
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
        a11y: "Tiles are plain divs; supply your own alt text when using real images.",
        css: `.vb-image-list? — inline styles; wrap in your own grid`,
        props: [
          p("items", "{ label, hue }[]", "[]", "Tile label and gradient hue."),
          p("columns", "number", "3", "Grid column count."),
        ],
        demos: [
          {
            title: "Grid",
            code: `<ImageList columns={3}
  items={[
    { label: "sunset", hue: 20 },
    { label: "ocean", hue: 200 },
    { label: "forest", hue: 130 },
  ]}
/>`,
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
        name: "Keyboard Key",
        blurb: "Renders keyboard shortcuts as key caps.",
        a11y: "Rendered as <kbd> which assistive tech announces as a key.",
        css: `.vb-kbd  /* key cap */`,
        props: [p("children", "node", "—", "Key label, e.g. ⌘ or K.")],
        demos: [
          {
            title: "Shortcut",
            code: `<Kbd>⌘</Kbd> <Kbd>K</Kbd> to search`,
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
        blurb: "Stacked rows with optional secondary text and selection.",
        a11y: "Selectable items are clickable rows; add role=\"listbox\"/\"option\" for full semantics.",
        css: `.vb-list__item--selected  /* lime edge + tint */`,
        props: [
          p("selected", "boolean", "false", "Highlights the row."),
          p("secondary", "string", "—", "Right-aligned meta text."),
          p("onClick", "function", "—", "Makes the row clickable."),
        ],
        demos: [
          {
            title: "Selectable",
            code: `const [sel, setSel] = useState("web-prod");

<List>
  <ListItem selected={sel === "web-prod"}
    secondary="42s" onClick={() => setSel("web-prod")}>
    web-prod
  </ListItem>
</List>`,
            node: <ListDemo />,
          },
        ],
      },
      {
        id: "skeleton",
        name: "Skeleton",
        blurb: "Shimmering placeholder shown while content loads.",
        a11y: "Add aria-busy=\"true\" on the loading container and sr-only text describing the pending content.",
        css: `.vb-skeleton  /* shimmer gradient */`,
        props: [
          p("width", "number | string", '"100%"', "Tile width."),
          p("height", "number", "14", "Tile height in px."),
          p("style", "object", "—", "Extra styles, e.g. borderRadius."),
        ],
        demos: [
          {
            title: "Loading state",
            code: `<div aria-busy="true">
  <Skeleton width="60%" height={18} />
  <Skeleton width="100%" height={12} />
  <Skeleton width="90%" height={12} />
</div>`,
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
        blurb: "Compact data table with mono uppercase headers and hover rows.",
        a11y: "Uses semantic <table> markup with scoped headers.",
        css: `.vb-table th  /* mono header row */
.vb-table tr:hover  /* row hover */`,
        props: [
          p("columns", "string[]", "required", "Header labels."),
          p("rows", "any[][]", "required", "Row data; each inner array is one row."),
        ],
        demos: [
          {
            title: "Basic",
            code: `<Table
  columns={["Deployment", "Region", "Status"]}
  rows={[
    ["web-prod", "eu-1", "running"],
    ["worker-2", "us-1", "building"],
  ]}
/>`,
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
        blurb: "Label that appears above an element on hover or keyboard focus.",
        a11y: "Opens on focus-within so keyboard users see it; bubble has role=\"tooltip\".",
        css: `.vb-tooltip__bubble  /* lime bubble */`,
        props: [
          p("label", "string", "required", "Tooltip text."),
          p("children", "node", "required", "Trigger element."),
        ],
        demos: [
          {
            title: "Hover & focus",
            code: `<Tooltip label="Neon, as promised">
  <Button variant="secondary" size="sm">
    Hover me
  </Button>
</Tooltip>`,
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
        a11y: "Heading variants render real h1–h6 tags for correct document outline.",
        css: `.vb-typography? — inline styles via the variant map`,
        props: [
          p("variant", '"h1"..."h6" | "subtitle" | "body1" | "body2" | "caption" | "mono"', '"body1"', "Text style."),
          p("as", "string", "matches variant", "Override the rendered tag."),
        ],
        demos: [
          {
            title: "Scale",
            code: `<Typography variant="h2">h2 · Build fast</Typography>
<Typography variant="subtitle">Subtitle line</Typography>
<Typography variant="body2">Body text</Typography>
<Typography variant="mono">npm i vibe-ui</Typography>
<Typography variant="caption">fine print</Typography>`,
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
        blurb: "Inline callouts for statuses that need to stay visible.",
        a11y: "Uses role=\"alert\" so content is announced when it appears.",
        css: `.vb-alert--info / success / warning / error`,
        props: [
          p("variant", '"info" | "success" | "warning" | "error"', '"info"', "Severity color and icon."),
          p("title", "string", "—", "Bold headline."),
          p("children", "node", "—", "Body text."),
        ],
        demos: [
          {
            title: "Severities",
            code: `<Alert variant="success" title="Build passed">
  Deployed in 42s.
</Alert>
<Alert variant="warning" title="Rate limit">
  80% of tokens used.
</Alert>`,
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
        blurb: "Full-screen dimmed and blurred overlay that focuses content.",
        a11y: "Clicking the overlay calls onClose; wrap inner content in a focus trap for full modal semantics.",
        css: `.vb-backdrop  /* fixed overlay + blur */`,
        props: [
          p("open", "boolean", "required", "Controls visibility."),
          p("onClose", "function", "—", "Called on overlay click."),
          p("children", "node", "—", "Focused content."),
        ],
        demos: [
          {
            title: "With content",
            code: `<Backdrop open={open} onClose={close}>
  <Card>Focused content</Card>
</Backdrop>`,
            node: <BackdropDemo />,
          },
        ],
      },
      {
        id: "dialog",
        name: "Dialog",
        blurb: "Modal confirmation with header, body, and footer. Closes on Esc and outside click.",
        a11y: "role=\"dialog\" with aria-modal and aria-label; Esc is bound while open.",
        css: `.vb-modal           /* panel */
.vb-modal__footer   /* action row */`,
        props: [
          p("open", "boolean", "required", "Controls visibility."),
          p("onClose", "function", "required", "Called on Esc, overlay click, ✕."),
          p("title", "string", "—", "Header text."),
          p("footer", "node", "—", "Action buttons row."),
        ],
        demos: [
          {
            title: "Confirmation",
            code: `<Dialog open={open} onClose={close}
  title="Delete deployment?"
  footer={
    <>
      <Button variant="ghost">Cancel</Button>
      <Button variant="danger">Delete</Button>
    </>
  }>
  There is no undo.
</Dialog>`,
            node: <ModalDemo />,
          },
        ],
      },
      {
        id: "progress",
        name: "Progress",
        blurb: "Linear determinate progress bar.",
        a11y: "Exposes role=\"progressbar\" with aria-valuenow, min, and max.",
        css: `.vb-progress__bar  /* lime fill */`,
        props: [p("value", "number", "0", "Percentage 0–100.")],
        demos: [
          {
            title: "Determinate",
            code: `<Progress value={72} />`,
            node: <Progress value={72} />,
          },
        ],
      },
      {
        id: "snackbar",
        name: "Snackbar / Toast",
        blurb: "Transient notifications in five accent variants.",
        a11y: "Uses role=\"status\" so screen readers announce updates politely.",
        css: `.vb-toast__accent--success / error / warning / info`,
        props: [
          p("variant", '"default" | "success" | "warning" | "error" | "info"', '"default"', "Accent bar color."),
          p("title", "string", "required", "Headline."),
          p("description", "string", "—", "Secondary line."),
          p("onClose", "function", "—", "Shows the ✕ button."),
        ],
        demos: [
          {
            title: "All variants",
            code: `<Toast variant="success" title="Deployed"
  description="prod-eu-1 · 42s" onClose={close} />
<Toast variant="error" title="Build failed"
  description="Type error on line 12" onClose={close} />`,
            node: (
              <div className="stack-sm" style={{ maxWidth: 340 }}>
                <Toast variant="default" title="Saved" description="Draft stored locally" onClose={() => {}} />
                <Toast variant="success" title="Deployed" description="prod-eu-1 · 42s" onClose={() => {}} />
                <Toast variant="warning" title="Rate limit" description="80% of tokens used" onClose={() => {}} />
                <Toast variant="error" title="Build failed" description="Type error on line 12" onClose={() => {}} />
                <Toast variant="info" title="New version" description="v2.1 is available" onClose={() => {}} />
              </div>
            ),
          },
          {
            title: "Triggered",
            code: `const [show, setShow] = useState(false);

<Button onClick={() => setShow(true)}>Deploy</Button>
{show && (
  <div className="toast-anchor">
    <Toast variant="success" title="Deployed"
      onClose={() => setShow(false)} />
  </div>
)}`,
            node: <ToastDemo />,
          },
        ],
      },
      {
        id: "spinner",
        name: "Spinner",
        blurb: "Indeterminate loading indicator.",
        a11y: "Carries aria-label=\"Loading\"; pair with visible text when possible.",
        css: `.vb-spinner  /* rotating ring */`,
        props: [],
        demos: [
          {
            title: "Inline",
            code: `<Spinner />`,
            node: (
              <div className="row">
                <Spinner />
                <span style={{ color: "var(--text-faint)", fontSize: 13 }}>Loading…</span>
              </div>
            ),
          },
        ],
      },
    ],
  },
  {
    category: "Surfaces",
    components: [
      {
        id: "accordion",
        name: "Accordion",
        blurb: "Expandable sections; one open at a time by default.",
        a11y: "Triggers expose aria-expanded; content is conditionally rendered.",
        css: `.vb-accordion__icon--open  /* + rotates to × */`,
        props: [
          p("items", "{ title, content }[]", "[]", "Section definitions."),
          p("allowMultiple", "boolean", "false", "Keep other sections open."),
        ],
        demos: [
          {
            title: "Two items",
            code: `<Accordion items={[
  { title: "Zero dependencies?", content: "Yes." },
  { title: "AI-friendly?", content: "That is the point." },
]} />`,
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
        blurb: "Top bar for app shells — brand, status, and actions.",
        a11y: "Plain layout container; use <nav> or header landmarks around it as appropriate.",
        css: `.vb? — inline styles; compose with Badge / IconButton`,
        props: [p("children", "node", "—", "Bar content."), p("style", "object", "—", "Override styles.")],
        demos: [
          {
            title: "With actions",
            code: `<AppBar>
  <strong>vibe.ui</strong>
  <Badge variant="success" dot>live</Badge>
  <span style={{ marginLeft: "auto" }}>
    <IconButton label="Settings">
      <Icon name="settings" />
    </IconButton>
  </span>
</AppBar>`,
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
        blurb: "Surface with optional header, body, footer, and hover lift.",
        a11y: "hoverable only animates; it does not make the card focusable. Put a Button in the footer for actions.",
        css: `.vb-card--hoverable  /* lift on hover */
.vb-card__footer     /* top-bordered row */`,
        props: [
          p("title", "string", "—", "Header title."),
          p("description", "string", "—", "Header subtitle."),
          p("footer", "node", "—", "Footer row content."),
          p("hoverable", "boolean", "false", "Lift and highlight on hover."),
        ],
        demos: [
          {
            title: "Full anatomy",
            code: `<Card title="Pro plan" description="For teams shipping fast."
  hoverable footer={<Button size="sm">Upgrade</Button>}>
  Unlimited projects · Priority support
</Card>`,
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
        blurb: "Elevated surface with optional shadow depth (0–4).",
        a11y: "Purely presentational.",
        css: `.vb? — inline styles via the elevation prop`,
        props: [
          p("elevation", "number", "0", "Shadow depth; 0 is flat."),
          p("children", "node", "—", "Surface content."),
        ],
        demos: [
          {
            title: "Elevation",
            code: `<Paper elevation={0}>flat</Paper>
<Paper elevation={2}>elev 2</Paper>
<Paper elevation={4}>elev 4</Paper>`,
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
      {
        id: "empty-state",
        name: "Empty State",
        blurb: "Friendly placeholder for empty lists and zero-data screens.",
        a11y: "Announce the state change with an aria-live region if it appears after loading.",
        css: `.vb-empty  /* dashed frame, centered */`,
        props: [
          p("icon", "string", '"◇"', "Glyph above the title."),
          p("title", "string", "required", "Headline."),
          p("description", "string", "—", "Supporting copy."),
          p("action", "node", "—", "Call-to-action button."),
        ],
        demos: [
          {
            title: "With action",
            code: `<EmptyState icon="◇" title="No deployments yet"
  description="Connect a repo and ship your first build."
  action={<Button size="sm">Create deployment</Button>}
/>`,
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
    ],
  },
  {
    category: "Navigation",
    components: [
      {
        id: "bottom-navigation",
        name: "Bottom Navigation",
        blurb: "Mobile-style tab bar with icon and label per tab.",
        a11y: "Active tab gets aria-current=\"page\".",
        css: `.vb-bottomnav__item--active  /* lime tab */`,
        props: [
          p("items", "{ label, icon }[]", "required", "Tab definitions."),
          p("value", "string", "—", "Active tab label."),
          p("onChange", "function", "—", "Called with the selected label."),
        ],
        demos: [
          {
            title: "Tabs",
            code: `<BottomNavigation value={tab} onChange={setTab}
  items={[
    { label: "Home", icon: "⌂" },
    { label: "Search", icon: "⌕" },
    { label: "New", icon: "＋" },
    { label: "Profile", icon: "◉" },
  ]}
/>`,
            node: <BottomNavDemo />,
          },
        ],
      },
      {
        id: "breadcrumbs",
        name: "Breadcrumbs",
        blurb: "Hierarchy trail with the current page emphasized.",
        a11y: "Wrapped in a nav with aria-label=\"Breadcrumb\".",
        css: `.vb-breadcrumb__current  /* bold final crumb */`,
        props: [p("items", "string[]", "required", "Trail; the last item is the current page.")],
        demos: [
          {
            title: "Trail",
            code: `<Breadcrumb items={["Home", "Project", "Deployments"]} />`,
            node: <Breadcrumb items={["Home", "Project", "Deployments"]} />,
          },
        ],
      },
      {
        id: "drawer",
        name: "Drawer",
        blurb: "Sliding side panel with overlay, from the left or right edge.",
        a11y: "Panel has role=\"dialog\" and a labelled close button; overlay click closes.",
        css: `.vb-drawer--left / --right  /* slide direction */
.vb-drawer--open            /* visible state */`,
        props: [
          p("open", "boolean", "required", "Controls visibility."),
          p("onClose", "function", "required", "Called on overlay or ✕ click."),
          p("side", '"left" | "right"', '"left"', "Which edge it slides from."),
          p("title", "string", "—", "Header text."),
        ],
        demos: [
          {
            title: "Right side",
            code: `<Drawer open={open} onClose={close} side="right"
  title="Settings">
  Content
</Drawer>`,
            node: <DrawerDemo />,
          },
        ],
      },
      {
        id: "link",
        name: "Link",
        blurb: "Styled anchor with an optional accent color.",
        a11y: "Real <a> element; underline is always present, not hover-only.",
        css: `.vb? — inline styles; accent prop switches color`,
        props: [
          p("href", "string", '"#"', "Target URL."),
          p("accent", "boolean", "false", "Use the accent color."),
          p("children", "node", "—", "Link text."),
        ],
        demos: [
          {
            title: "Inline",
            code: `Read the <Link href="/docs">docs</Link> or go
<Link accent href="/pro">Pro</Link>.`,
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
        blurb: "Dropdown list of actions with icons; closes on outside click.",
        a11y: "Panel uses role=\"menu\" with role=\"menuitem\" children; trigger toggles visibility.",
        css: `.vb-menu__panel  /* floating panel */
.vb-menu__icon   /* lime icon */`,
        props: [
          p("trigger", "node", "required", "Element that toggles the menu."),
          p("items", "{ label, icon? }[]", "[]", "Menu entries."),
          p("onSelect", "function", "—", "Called with the selected label."),
        ],
        demos: [
          {
            title: "Dropdown",
            code: `<Menu
  trigger={<Button variant="secondary">Options ▾</Button>}
  items={[
    { label: "Duplicate", icon: "⧉" },
    { label: "Rename", icon: "✎" },
    { label: "Delete", icon: "✕" },
  ]}
  onSelect={console.log}
/>`,
            node: <MenuDemo />,
          },
        ],
      },
      {
        id: "pagination",
        name: "Pagination",
        blurb: "Numbered pages with previous and next controls.",
        a11y: "Wrapped in nav with aria-label=\"Pagination\"; current page gets aria-current.",
        css: `.vb-pagination__page--active  /* lime page */`,
        props: [
          p("page", "number", "required", "Current page (1-based)."),
          p("pageCount", "number", "required", "Total pages."),
          p("onChange", "function", "required", "Called with the new page."),
        ],
        demos: [
          {
            title: "Five pages",
            code: `const [page, setPage] = useState(2);

<Pagination page={page} pageCount={5}
  onChange={setPage} />`,
            node: <PaginationDemo />,
          },
        ],
      },
      {
        id: "stepper",
        name: "Stepper",
        blurb: "Visual progress through numbered steps.",
        a11y: "Completed steps render a ✓ mark; pair with text status for critical flows.",
        css: `.vb-stepper__step--done     /* lime, checked */
.vb-stepper__step--current  /* ring highlight */`,
        props: [
          p("steps", "string[]", "required", "Step labels."),
          p("current", "number", "0", "Index of the active step."),
        ],
        demos: [
          {
            title: "Step 2 of 3",
            code: `<Stepper steps={["Build", "Test", "Deploy"]} current={1} />`,
            node: <Stepper steps={["Build", "Test", "Deploy"]} current={1} />,
          },
        ],
      },
      {
        id: "tabs",
        name: "Tabs",
        blurb: "Switch between panels with an animated underline.",
        a11y: "Uses role=\"tablist\", role=\"tab\" with aria-selected, and role=\"tabpanel\".",
        css: `.vb-tabs__tab--active  /* lime underline */`,
        props: [
          p("tabs", "{ label, content }[]", "required", "Tab definitions."),
          p("initial", "number", "0", "Initially active index."),
        ],
        demos: [
          {
            title: "Three panels",
            code: `<Tabs tabs={[
  { label: "Preview", content: "Live preview." },
  { label: "Logs", content: "42s" },
  { label: "Settings", content: "eu-1" },
]} />`,
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
        a11y: "Renders a plain div; add roles as needed.",
        css: `.vb? — pass style directly`,
        props: [p("...rest", "div props", "—", "Everything, including style.")],
        demos: [
          {
            title: "Framed",
            code: `<Box style={{ padding: 20,
  border: "1px dashed var(--border-strong)" }}>
  A box.
</Box>`,
            node: <Box style={{ padding: 20, border: "1px dashed var(--border-strong)", borderRadius: "var(--radius-md)" }}>A box.</Box>,
          },
        ],
      },
      {
        id: "container",
        name: "Container",
        blurb: "Centered max-width wrapper for page content.",
        a11y: "Layout only.",
        css: `.vb? — maxWidth + auto margins`,
        props: [p("maxWidth", "number", "1100", "Max content width in px.")],
        demos: [
          {
            title: "Centered",
            code: `<Container maxWidth={400}>
  Page content
</Container>`,
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
        a11y: "Layout only.",
        css: `.vb? — display: grid via props`,
        props: [
          p("columns", "number", "2", "Column count."),
          p("spacing", "number", "2", "Gap in 8px units."),
        ],
        demos: [
          {
            title: "Three columns",
            code: `<Grid columns={3} spacing={2}>
  <Card>one</Card>
  <Card>two</Card>
  <Card>three</Card>
</Grid>`,
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
        a11y: "Layout only.",
        css: `.vb? — display: flex via props`,
        props: [
          p("direction", '"row" | "column"', '"column"', "Flex direction."),
          p("spacing", "number", "2", "Gap in 8px units."),
        ],
        demos: [
          {
            title: "Row",
            code: `<Stack direction="row" spacing={2}>
  <Button>A</Button>
  <Button>B</Button>
</Stack>`,
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
        blurb: "Fires a callback when clicking outside its children. Powers Menu and Popover.",
        a11y: "Listens on pointerdown so it works for mouse, touch, and pen.",
        css: `.vb? — renders an inline-flex wrapper`,
        props: [
          p("onClickAway", "function", "required", "Called on outside pointerdown."),
          p("children", "node", "required", "Wrapped content."),
        ],
        demos: [
          {
            title: "Wrapped",
            code: `<ClickAwayListener onClickAway={close}>
  <Button variant="secondary">Click outside me</Button>
</ClickAwayListener>`,
            node: <ClickAwayListener onClickAway={() => {}}><Button variant="secondary" size="sm">Click outside me</Button></ClickAwayListener>,
          },
        ],
      },
      {
        id: "css-baseline",
        name: "CSS Baseline",
        blurb: "Global reset — already applied via the library stylesheet. This component is a no-op kept for API familiarity.",
        a11y: "The reset normalizes box-sizing, margins, and selection colors.",
        css: `/* lives in index.css */
*, *::before, *::after { box-sizing: border-box; }`,
        props: [],
        demos: [],
      },
      {
        id: "init-color-scheme-script",
        name: "InitColorSchemeScript",
        blurb: "Inline script that applies the saved theme before first paint — prevents flash of the wrong theme.",
        a11y: "Respects the user's previously chosen theme.",
        css: `// renders <script> that sets data-theme
// from localStorage before React hydrates`,
        props: [],
        demos: [],
      },
      {
        id: "modal",
        name: "Modal",
        blurb: "Low-level modal — Dialog is the styled version. Portals to document.body.",
        a11y: "role=\"dialog\" with aria-modal; Esc closes while open.",
        css: `.vb-modal-overlay  /* fixed backdrop */
.vb-modal          /* centered panel */`,
        props: [
          p("open", "boolean", "required", "Controls visibility."),
          p("onClose", "function", "required", "Close handler."),
          p("title", "string", "—", "Used as aria-label."),
        ],
        demos: [
          {
            title: "Dialog alias",
            code: `import { Dialog } from "vibe-ui";
// Dialog is Modal with header/footer styling
<Dialog open={open} onClose={close} title="Title" />`,
            node: <ModalDemo />,
          },
        ],
      },
      {
        id: "no-ssr",
        name: "No SSR",
        blurb: "Renders children only after hydration, via useSyncExternalStore.",
        a11y: "Prevents hydration mismatches for client-only widgets.",
        css: `.vb? — render gate only`,
        props: [p("children", "node", "required", "Rendered after mount.")],
        demos: [
          {
            title: "Client only",
            code: `<NoSsr>
  <ClientOnlyWidget />
</NoSsr>`,
            node: <NoSsrDemo />,
          },
        ],
      },
      {
        id: "popover",
        name: "Popover",
        blurb: "Anchored floating panel; Popper is an alias. Closes on outside click.",
        a11y: "Closes on outside pointerdown; keep inner content keyboard-accessible.",
        css: `.vb-popover  /* anchored panel */`,
        props: [
          p("trigger", "node", "required", "Element that toggles the popover."),
          p("children", "node", "required", "Panel content."),
        ],
        demos: [
          {
            title: "Anchored",
            code: `<Popover trigger={<Button>Info</Button>}>
  Anchored content
</Popover>`,
            node: <PopoverDemo />,
          },
        ],
      },
      {
        id: "portal",
        name: "Portal",
        blurb: "Renders children into document.body, escaping the parent DOM tree.",
        a11y: "Escaped content is announced in DOM order of body — use sparingly.",
        css: `.vb? — createPortal(children, document.body)`,
        props: [p("children", "node", "required", "Content to portal.")],
        demos: [
          {
            title: "Escaped node",
            code: `<Portal>
  <span>Lives in document.body</span>
</Portal>`,
            node: <PortalDemo />,
          },
        ],
      },
      {
        id: "transitions",
        name: "Transitions",
        blurb: "Fade, Collapse, and Slide wrappers driven by a boolean, with cushioned easing.",
        a11y: "Content stays in the DOM; use conditional rendering instead if it should be removed.",
        css: `.vb? — inline transitions using var(--ease-out)
and var(--ease-spring) tokens`,
        props: [
          p("show", "boolean", "true", "Drives the transition."),
          p("duration", "number", "250", "Milliseconds."),
          p("direction (Slide)", '"up" | "down" | "left" | "right"', '"up"', "Slide origin."),
        ],
        demos: [
          {
            title: "Collapse",
            code: `<Collapse show={show}>
  <Alert variant="info">Collapsing smoothly.</Alert>
</Collapse>`,
            node: <CollapseDemo />,
          },
        ],
      },
      {
        id: "use-media-query",
        name: "useMediaQuery",
        blurb: "React hook for CSS media queries.",
        a11y: "Commonly used to swap layouts; keep content equivalent across breakpoints.",
        css: `const isNarrow = useMediaQuery("(max-width: 720px)");`,
        props: [p("query", "string", "required", "Any CSS media query.")],
        demos: [
          {
            title: "Live",
            code: `const isNarrow = useMediaQuery("(max-width: 720px)");

<Alert variant={isNarrow ? "warning" : "success"}>
  {isNarrow ? "Narrow viewport." : "Wide viewport."}
</Alert>`,
            node: <MediaQueryDemo />,
          },
        ],
      },
    ],
  },
];
