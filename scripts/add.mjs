#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(__dirname, "../src");

const REGISTRY = {
  button: { file: "Button.tsx", css: ["button.css"] },
  "icon-button": { file: "Chip.tsx", css: ["chip.css"], exports: ["IconButton"] },
  "button-group": { file: "ButtonGroup.tsx", css: ["inputs2.css"], exports: ["ButtonGroup"] },
  "toggle-button": { file: "ButtonGroup.tsx", css: ["inputs2.css"], exports: ["ToggleButtonGroup"] },
  fab: { file: "ButtonGroup.tsx", css: ["inputs2.css"], exports: ["Fab", "SpeedDial"] },
  input: { file: "Input.tsx", css: ["input.css"], exports: ["Input", "Textarea"] },
  select: { file: "Select.tsx", css: ["select.css"], exports: ["Select"] },
  checkbox: { file: "Controls.tsx", css: ["controls.css"], exports: ["Checkbox"] },
  radio: { file: "Controls.tsx", css: ["controls.css"], exports: ["RadioGroup"] },
  switch: { file: "Misc.tsx", css: ["misc.css"], exports: ["Switch"] },
  slider: { file: "Controls.tsx", css: ["controls.css"], exports: ["Slider"] },
  rating: { file: "Extras.tsx", css: ["extras.css"], exports: ["Rating"] },
  badge: { file: "Badge.tsx", css: ["badge.css"], exports: ["Badge"] },
  chip: { file: "Chip.tsx", css: ["chip.css"], exports: ["Chip"] },
  avatar: { file: "Misc.tsx", css: ["misc.css"], exports: ["Avatar"] },
  card: { file: "Card.tsx", css: ["card.css"], exports: ["Card"] },
  alert: { file: "Alert.tsx", css: ["alert.css"], exports: ["Alert"] },
  toast: { file: "Toast.tsx", css: ["toast.css"], exports: ["Toast"] },
  modal: { file: "Modal.tsx", css: ["modal.css"], exports: ["Modal", "Dialog"] },
  tooltip: { file: "Tooltip.tsx", css: ["tooltip.css"], exports: ["Tooltip"] },
  tabs: { file: "Tabs.tsx", css: ["tabs.css"], exports: ["Tabs"] },
  accordion: { file: "Accordion.tsx", css: ["accordion.css"], exports: ["Accordion"] },
  table: { file: "DataDisplay.tsx", css: ["data.css"], exports: ["Table"] },
  pagination: { file: "DataDisplay.tsx", css: ["data.css"], exports: ["Pagination"] },
  breadcrumb: { file: "DataDisplay.tsx", css: ["data.css"], exports: ["Breadcrumb"] },
  skeleton: { file: "DataDisplay.tsx", css: ["data.css"], exports: ["Skeleton"] },
  menu: { file: "Navigation.tsx", css: ["navigation.css"], exports: ["Menu"] },
  drawer: { file: "Navigation.tsx", css: ["navigation.css"], exports: ["Drawer"] },
  icon: { file: "Icon.tsx", css: [], exports: ["Icon"] },
  typography: { file: "Typography.tsx", css: [], exports: ["Typography"] },
};

const [name] = process.argv.slice(2);

if (!name || name === "list") {
  console.log("hyperlime add — copy a component's source into your project\n");
  console.log("Usage:   npx hyperlime add <component>\n");
  console.log("Available:");
  for (const key of Object.keys(REGISTRY)) console.log(`  ${key}`);
  process.exit(0);
}

const entry = REGISTRY[name];
if (!entry) {
  console.error(`Unknown component "${name}". Run "npx hyperlime add list" to see options.`);
  process.exit(1);
}

const outDir = resolve(process.cwd(), "components/hyperlime");
const cssDir = join(outDir, "styles");
mkdirSync(cssDir, { recursive: true });

const rel = (from, to) =>
  "./" + join(relativeDir, to).replaceAll("\\", "/");
const relativeDir = "";

let source = readFileSync(join(SRC, "components", entry.file), "utf8");
source = source.replaceAll(/from ["'].*styles\/([\w-]+\.css)["']/g, 'from "./styles/$1"');

const outFile = join(outDir, entry.file);
writeFileSync(outFile, source);
console.log(`Created ${outFile.replace(process.cwd(), ".")}`);

for (const css of entry.css) {
  writeFileSync(join(cssDir, css), readFileSync(join(SRC, "styles", css)));
  console.log(`Created ${join("components/hyperlime/styles", css).replace(process.cwd(), ".")}`);
}

const exportsList = entry.exports ?? [name];
console.log(`\nImport with:`);
console.log(`import { ${exportsList.join(", ")} } from "./components/hyperlime/${entry.file.replace(/\.tsx$/, "")}";`);
