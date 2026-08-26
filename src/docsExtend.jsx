import { useState } from "react";
import {
  Input,
  Icon,
  Kbd,
  Button,
  Alert,
  Card,
  OTPInput,
  TagInput,
  FileUpload,
  AvatarGroup,
  Stat,
  Timeline,
  Sparkline,
  ProgressRing,
  Banner,
  ChatBubble,
  TypingIndicator,
  Chat,
  CommandPalette,
} from "./components";

function OTPDemo() {
  const [value, setValue] = useState("");
  return (
    <div className="stack-sm">
      <OTPInput length={6} value={value} onChange={setValue} onComplete={(v) => console.log("complete", v)} />
      <span className="mono-label">{value.length}/6 DIGITS</span>
    </div>
  );
}

function TagInputDemo() {
  const [tags, setTags] = useState(["react", "vite"]);
  return <TagInput tags={tags} onChange={setTags} placeholder="Add frameworks..." />;
}

function CommandPaletteDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="secondary" size="sm" onClick={() => setOpen(true)}>
        Open palette <Kbd>⌘K</Kbd>
      </Button>
      <CommandPalette
        open={open}
        onClose={() => setOpen(false)}
        commands={[
          { label: "Deploy to production", icon: "↑", hint: "⇧D" },
          { label: "Rollback deployment", icon: "↺", hint: "⇧R" },
          { label: "View logs", icon: "▤", hint: "⌘L" },
          { label: "Invite teammate", icon: "◉", hint: "⌘I" },
          { label: "Delete project", icon: "✕", hint: "⌘⌫" },
        ]}
      />
    </>
  );
}

function BannerDemo() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return <Banner onClose={() => setVisible(false)}>v2.0 is live — read the changelog →</Banner>;
}

function AlertDismissibleDemo() {
  const [visible, setVisible] = useState(true);
  if (!visible)
    return (
      <Button size="sm" variant="secondary" onClick={() => setVisible(true)}>
        Show alert
      </Button>
    );
  return (
    <Alert variant="success" title="Build passed" onClose={() => setVisible(false)}>
      Deployed to production in 42s.
    </Alert>
  );
}

const p = (name, type, def, desc) => ({ name, type, def, desc });

export function extendDocs(DOCS) {
  const cat = (name) => DOCS.find((c) => c.category === name);
  const comp = (category, id) => cat(category).components.find((c) => c.id === id);

  comp("Inputs", "text-field").demos.push({
    title: "With icons",
    code: `<Input
  label="Search docs"
  leading={<Icon name="search" size={16} />}
  placeholder="Try anything..."
  trailing={<Kbd>/</Kbd>}
/>`,
    node: (
      <Input
        id="tf-icons"
        label="Search docs"
        leading={<Icon name="search" size={16} />}
        placeholder="Try anything..."
        trailing={<Kbd>/</Kbd>}
      />
    ),
  });

  comp("Feedback", "alert").demos.push({
    title: "Dismissible",
    code: `const [show, setShow] = useState(true);

<Alert variant="success" title="Build passed"
  onClose={() => setShow(false)}>
  Deployed to production in 42s.
</Alert>`,
    node: <AlertDismissibleDemo />,
  });

  comp("Surfaces", "card").demos.push({
    title: "Accent",
    code: `<Card accent title="Pro plan"
  description="Highlighted with a lime top border.">
  Unlimited projects · Priority support
</Card>`,
    node: (
      <Card accent title="Pro plan" description="Highlighted with a lime top border." style={{ maxWidth: 360 }}>
        Unlimited projects · Priority support
      </Card>
    ),
  });

  cat("Inputs").components.push(
    {
      id: "otp-input",
      name: "OTP Input",
      blurb: "One-time-code boxes with auto-advance, backspace flow, and a completion callback.",
      a11y: "Each box is a labelled input (Digit 1..N); focus auto-advances as digits are typed.",
      css: ".vb-otp__box--filled  /* lime border when filled */",
      props: [
        p("length", "number", "6", "Number of digit boxes."),
        p("value", "string", "required", "Controlled digits entered so far."),
        p("onChange", "fn", "required", "Called with the updated digits."),
        p("onComplete", "fn", "—", "Fires when all boxes are filled."),
      ],
      demos: [
        {
          title: "Six digits",
          code: `const [code, setCode] = useState("");

<OTPInput length={6} value={code} onChange={setCode}
  onComplete={(v) => verify(v)} />`,
          node: <OTPDemo />,
        },
      ],
    },
    {
      id: "tag-input",
      name: "Tag Input",
      blurb: "Type and press Enter to add chips; Backspace removes the last tag.",
      a11y: "Input is labelled; chips expose per-tag Remove buttons.",
      css: ".vb-taginput:focus-within  /* lime focus ring */",
      props: [
        p("tags", "string[]", "required", "Controlled tag list."),
        p("onChange", "fn", "required", "Called with the new list."),
        p("placeholder", "string", '"Add a tag..."', "Shown when empty."),
      ],
      demos: [
        {
          title: "Frameworks",
          code: `const [tags, setTags] = useState(["react", "vite"]);

<TagInput tags={tags} onChange={setTags}
  placeholder="Add frameworks..." />`,
          node: <TagInputDemo />,
        },
      ],
    },
    {
      id: "file-upload",
      name: "File Upload",
      blurb: "Drag-and-drop zone with click-to-browse fallback and hover states.",
      a11y: 'Focusable with role="button"; Enter opens the file dialog.',
      css: ".vb-upload--over  /* drag-over highlight */",
      props: [
        p("onFiles", "fn", "—", "Receives the FileList on drop or select."),
        p("accept", "string", "—", 'e.g. "image/*" or ".pdf".'),
        p("multiple", "boolean", "true", "Allow multiple files."),
        p("title / hint", "string", '"Drop files here"', "Copy inside the zone."),
      ],
      demos: [
        {
          title: "Dropzone",
          code: `<FileUpload
  title="Drop your model here"
  hint="or click to browse"
  onFiles={(files) => upload(files)}
/>`,
          node: <FileUpload title="Drop your model here" hint="or click to browse" />,
        },
      ],
    }
  );

  cat("Data display").components.push(
    {
      id: "avatar-group",
      name: "Avatar Group",
      blurb: "Stacked avatars with overlap, hover lift, and an overflow counter.",
      a11y: "Decorative stacking; provide names elsewhere for screen readers.",
      css: ".vb-avatargroup__more  /* +N bubble */",
      props: [
        p("people", "{ initials: string }[]", "required", "Members to render."),
        p("max", "number", "3", "Avatars before the +N counter."),
      ],
      demos: [
        {
          title: "Team",
          code: `<AvatarGroup
  people={[
    { initials: "AL" }, { initials: "KT" },
    { initials: "MJ" }, { initials: "RS" },
    { initials: "TP" },
  ]}
  max={3}
/>`,
          node: (
            <AvatarGroup
              people={[{ initials: "AL" }, { initials: "KT" }, { initials: "MJ" }, { initials: "RS" }, { initials: "TP" }]}
              max={3}
            />
          ),
        },
      ],
    },
    {
      id: "stat",
      name: "Stat",
      blurb: "Metric card with label, big value, and an up/down delta.",
      a11y: "Delta arrows pair with color so the trend is not color-only.",
      css: ".vb-stat__delta--up / --down  /* green / red */",
      props: [
        p("label", "string", "required", "Small uppercase label."),
        p("value", "string", "required", "The big number."),
        p("delta", "string", "—", 'e.g. "12%" — shown with an arrow.'),
        p("trend", '"up" | "down"', '"up"', "Delta color."),
      ],
      demos: [
        {
          title: "Metrics",
          code: `<Stat label="Deploys this week" value="128" delta="12%" trend="up" />
<Stat label="Failed builds" value="3" delta="8%" trend="down" />`,
          node: (
            <div className="row wrap">
              <Stat label="Deploys this week" value="128" delta="12%" trend="up" />
              <Stat label="Failed builds" value="3" delta="8%" trend="down" />
            </div>
          ),
        },
        {
          title: "With sparkline",
          code: `<Stat label="Active users" value="8,412" delta="4.2%" trend="up" />
<Sparkline data={[3, 5, 4, 7, 6, 9, 8, 12]} color="green" area />`,
          node: (
            <div className="row" style={{ justifyContent: "space-between", gap: 24 }}>
              <Stat label="Active users" value="8,412" delta="4.2%" trend="up" />
              <Sparkline data={[3, 5, 4, 7, 6, 9, 8, 12]} color="green" area />
            </div>
          ),
        },
      ],
    },
    {
      id: "timeline",
      name: "Timeline",
      blurb: "Vertical event feed with connected dots and timestamps.",
      a11y: "Semantic order is visual top-to-bottom; keep items chronological.",
      css: ".vb-timeline__dot--green / --red / --muted",
      props: [
        p("items", "{ title, description?, time?, color? }[]", "[]", "Events; color: accent | green | red | muted."),
      ],
      demos: [
        {
          title: "Deploy history",
          code: `<Timeline items={[
  { title: "Build started", time: "14:02" },
  { title: "Tests passed", description: "214 tests · 42s", color: "green", time: "14:03" },
  { title: "Deployed to prod", description: "prod-eu-1", color: "green", time: "14:04" },
  { title: "Smoke check failed", description: "retrying", color: "red", time: "14:05" },
]} />`,
          node: (
            <Timeline
              items={[
                { title: "Build started", time: "14:02" },
                { title: "Tests passed", description: "214 tests · 42s", color: "green", time: "14:03" },
                { title: "Deployed to prod", description: "prod-eu-1", color: "green", time: "14:04" },
                { title: "Smoke check failed", description: "retrying", color: "red", time: "14:05" },
              ]}
            />
          ),
        },
      ],
    },
    {
      id: "sparkline",
      name: "Sparkline",
      blurb: "Tiny inline chart with optional area fill, in four colors.",
      a11y: "Decorative; provide the underlying data via aria-label or adjacent text.",
      css: ".vb-sparkline--green / --red / --blue",
      props: [
        p("data", "number[]", "required", "Y values, evenly spaced."),
        p("width / height", "number", "120 / 36", "Pixel size."),
        p("color", '"lime" | "green" | "red" | "blue"', '"lime"', "Stroke color."),
        p("area", "boolean", "false", "Fill under the line."),
      ],
      demos: [
        {
          title: "Colors",
          code: `<Sparkline data={[3, 5, 4, 7, 6, 9]} color="lime" area />
<Sparkline data={[5, 3, 6, 4, 8, 5]} color="green" area />
<Sparkline data={[8, 6, 9, 5, 7, 4]} color="red" />
<Sparkline data={[2, 4, 3, 6, 5, 8]} color="blue" area />`,
          node: (
            <div className="row wrap" style={{ gap: 24 }}>
              <Sparkline data={[3, 5, 4, 7, 6, 9]} color="lime" area />
              <Sparkline data={[5, 3, 6, 4, 8, 5]} color="green" area />
              <Sparkline data={[8, 6, 9, 5, 7, 4]} color="red" />
              <Sparkline data={[2, 4, 3, 6, 5, 8]} color="blue" area />
            </div>
          ),
        },
      ],
    }
  );

  cat("Feedback").components.push(
    {
      id: "progress-ring",
      name: "Progress Ring",
      blurb: "Circular progress with animated stroke and centered percentage.",
      a11y: 'role="progressbar" with aria-valuenow; the value is also visible as text.',
      css: ".vb-progressring__circle  /* animated stroke */",
      props: [
        p("value", "number", "0", "Percentage 0–100."),
        p("size", "number", "72", "Outer diameter in px."),
        p("stroke", "number", "6", "Ring thickness."),
        p("color", "string", '"var(--accent)"', "Any CSS color."),
        p("showValue", "boolean", "true", "Centered % label."),
      ],
      demos: [
        {
          title: "Colors & sizes",
          code: `<ProgressRing value={72} />
<ProgressRing value={45} color="var(--green)" />
<ProgressRing value={90} color="var(--red)" size={56} stroke={4} />
<ProgressRing value={30} color="var(--blue)" showValue={false} />`,
          node: (
            <div className="row wrap" style={{ gap: 24 }}>
              <ProgressRing value={72} />
              <ProgressRing value={45} color="var(--green)" />
              <ProgressRing value={90} color="var(--red)" size={56} stroke={4} />
              <ProgressRing value={30} color="var(--blue)" showValue={false} />
            </div>
          ),
        },
      ],
    },
    {
      id: "banner",
      name: "Banner",
      blurb: "Announcement strip — lime or dark — with optional dismiss.",
      a11y: 'role="status"; dismiss button is labelled.',
      css: ".vb-banner--accent / --dark",
      props: [
        p("variant", '"accent" | "dark"', '"accent"', "Lime fill or bordered dark."),
        p("onClose", "fn", "—", "Shows the ✕ button when set."),
        p("children", "node", "required", "Banner text."),
      ],
      demos: [
        {
          title: "Dismissible",
          code: `<Banner onClose={dismiss}>
  v2.0 is live — read the changelog →
</Banner>`,
          node: <BannerDemo />,
        },
        {
          title: "Dark",
          code: `<Banner variant="dark">
  Scheduled maintenance Sunday 02:00 UTC
</Banner>`,
          node: <Banner variant="dark">Scheduled maintenance Sunday 02:00 UTC</Banner>,
        },
      ],
    }
  );

  DOCS.push({
    category: "AI",
    components: [
      {
        id: "chat",
        name: "Chat",
        blurb: "Chat bubbles for user and assistant messages, with a bouncing typing indicator.",
        a11y: 'Wrap the thread in aria-live="polite" so new messages are announced.',
        css: ".vb-chat__bubble--user / --assistant",
        props: [
          p("variant", '"user" | "assistant"', '"assistant"', "Lime right-aligned vs bordered left."),
          p("time", "string", "—", "Small timestamp inside the bubble."),
          p("children", "node", "required", "Message content."),
        ],
        demos: [
          {
            title: "Thread",
            code: `<Chat>
  <ChatBubble variant="user" time="14:02">
    Deploy the API to prod
  </ChatBubble>
  <ChatBubble variant="assistant" time="14:02">
    Deploying prod-eu-1… build #421 passed.
  </ChatBubble>
  <TypingIndicator />
</Chat>`,
            node: (
              <Chat>
                <ChatBubble variant="user" time="14:02">Deploy the API to prod</ChatBubble>
                <ChatBubble variant="assistant" time="14:02">Deploying prod-eu-1… build #421 passed. Ship it?</ChatBubble>
                <TypingIndicator />
              </Chat>
            ),
          },
        ],
      },
      {
        id: "command-palette",
        name: "Command Palette",
        blurb: "⌘K-style launcher: fuzzy filter, arrow-key navigation, Enter to run.",
        a11y: 'Full keyboard support: ↑↓ to navigate, ↵ to select, Esc to close. role="listbox" with aria-selected.',
        css: ".vb-command__item--active  /* lime tint */",
        props: [
          p("open", "boolean", "required", "Controls visibility."),
          p("onClose", "fn", "required", "Called on Esc, overlay click, or selection."),
          p("commands", "{ label, icon?, hint?, onSelect? }[]", "[]", "Available commands."),
          p("placeholder", "string", '"Type a command..."', "Input placeholder."),
        ],
        demos: [
          {
            title: "Deploy commands",
            code: `const [open, setOpen] = useState(false);

<CommandPalette open={open} onClose={() => setOpen(false)}
  commands={[
    { label: "Deploy to production", icon: "↑", hint: "⇧D" },
    { label: "View logs", icon: "▤", hint: "⌘L" },
    { label: "Delete project", icon: "✕", hint: "⌘⌫" },
  ]}
/>`,
            node: <CommandPaletteDemo />,
          },
        ],
      },
    ],
  });
}
