import {
  Button, Badge, Card, Input, Checkbox, AppBar, Stat, Sparkline, Table,
  Timeline, Avatar, AvatarGroup, Divider,
} from "./components";

function LoginTemplate() {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "32px 0" }}>
      <Card accent title="Welcome back" description="Sign in to your workspace" style={{ width: "100%", maxWidth: 380 }}>
        <div className="stack">
          <Input id="tpl-email" label="Email" type="email" placeholder="ada@lovelace.dev" leading="✉" />
          <Input id="tpl-pass" label="Password" type="password" placeholder="••••••••" leading="🔒" />
          <div className="row" style={{ justifyContent: "space-between" }}>
            <Checkbox id="tpl-remember" label="Remember me" checked onChange={() => {}} />
            <a href="#/templates" onClick={(e) => e.preventDefault()} style={{ color: "var(--accent)", fontSize: 13 }}>Forgot password?</a>
          </div>
          <Button style={{ width: "100%" }}>Sign in</Button>
          <Divider />
          <p style={{ textAlign: "center", fontSize: 13, color: "var(--text-faint)" }}>
            No account? <span style={{ color: "var(--accent)" }}>Request access</span>
          </p>
        </div>
      </Card>
    </div>
  );
}

function PricingTemplate() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
      <Card title="Hobby" description="For weekend projects" footer={<Button variant="secondary" size="sm" style={{ width: "100%" }}>Start free</Button>}>
        <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-0.03em" }}>$0</div>
        <Divider />
        <div className="stack-sm" style={{ fontSize: 13.5, color: "var(--text-muted)", paddingBlock: 12 }}>
          <span>✓ 1 project</span>
          <span>✓ Community support</span>
          <span>✓ 10k requests / mo</span>
        </div>
      </Card>
      <Card accent hoverable title="Pro" description="For serious builders" footer={<Button size="sm" style={{ width: "100%" }}>Go Pro</Button>}>
        <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-0.03em" }}>$20<span style={{ fontSize: 14, fontWeight: 400, color: "var(--text-faint)" }}> /mo</span></div>
        <Divider />
        <div className="stack-sm" style={{ fontSize: 13.5, color: "var(--text-muted)", paddingBlock: 12 }}>
          <span>✓ Unlimited projects</span>
          <span>✓ Priority support</span>
          <span>✓ 1M requests / mo</span>
        </div>
      </Card>
      <Card title="Team" description="For shipping together" footer={<Button variant="secondary" size="sm" style={{ width: "100%" }}>Contact us</Button>}>
        <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-0.03em" }}>$99<span style={{ fontSize: 14, fontWeight: 400, color: "var(--text-faint)" }}> /mo</span></div>
        <Divider />
        <div className="stack-sm" style={{ fontSize: 13.5, color: "var(--text-muted)", paddingBlock: 12 }}>
          <span>✓ Everything in Pro</span>
          <span>✓ SSO + audit log</span>
          <span>✓ Unlimited requests</span>
        </div>
      </Card>
    </div>
  );
}

function DashboardTemplate() {
  return (
    <div className="stack">
      <AppBar>
        <strong style={{ fontSize: 16 }}>acme.app</strong>
        <Badge variant="success" dot>all systems go</Badge>
        <span style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 12 }}>
          <AvatarGroup people={[{ initials: "AL" }, { initials: "KT" }, { initials: "MJ" }]} />
          <Avatar initials="AL" size="sm" />
        </span>
      </AppBar>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, alignItems: "center" }}>
        <Stat label="Requests today" value="84,201" delta="12%" trend="up" />
        <Stat label="Error rate" value="0.02%" delta="0.5%" trend="down" />
        <div className="row" style={{ justifyContent: "space-between", background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "16px 20px" }}>
          <Stat label="Traffic" value="1.2M" delta="4%" trend="up" />
          <Sparkline data={[4, 6, 5, 8, 7, 10, 9, 13]} area />
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16, alignItems: "start" }}>
        <Card title="Recent deployments">
          <Table
            columns={["Service", "Region", "Status"]}
            rows={[
              ["web-prod", "eu-1", "● running"],
              ["worker-2", "us-1", "● building"],
              ["cron-daily", "ap-1", "● idle"],
            ]}
          />
        </Card>
        <Card title="Activity">
          <Timeline
            items={[
              { title: "Deploy #421", description: "web-prod · eu-1", color: "green", time: "14:04" },
              { title: "Smoke check failed", description: "retrying", color: "red", time: "14:05" },
              { title: "Cache flushed", time: "13:40" },
            ]}
          />
        </Card>
      </div>
    </div>
  );
}

export const TEMPLATES = [
  {
    id: "login",
    name: "Login",
    description: "Centered auth card with email/password, remember-me, and social-ready footer.",
    node: <LoginTemplate />,
    code: `<Card accent title="Welcome back" description="Sign in to your workspace"
  style={{ maxWidth: 380 }}>
  <Stack spacing={3}>
    <Input label="Email" type="email" placeholder="ada@lovelace.dev" />
    <Input label="Password" type="password" placeholder="••••••••" />
    <Checkbox label="Remember me" checked onChange={fn} />
    <Button style={{ width: "100%" }}>Sign in</Button>
  </Stack>
</Card>`,
  },
  {
    id: "pricing",
    name: "Pricing",
    description: "Three-tier pricing grid with an accent-highlighted Pro plan.",
    node: <PricingTemplate />,
    code: `<Grid columns={3} spacing={3}>
  <Card title="Hobby" description="For weekend projects"
    footer={<Button variant="secondary" size="sm">Start free</Button>}>
    $0
  </Card>
  <Card accent hoverable title="Pro" description="For serious builders"
    footer={<Button size="sm">Go Pro</Button>}>
    $20 /mo
  </Card>
  <Card title="Team" description="For shipping together"
    footer={<Button variant="secondary" size="sm">Contact us</Button>}>
    $99 /mo
  </Card>
</Grid>`,
  },
  {
    id: "dashboard",
    name: "Dashboard",
    description: "App shell: AppBar, stat row with sparkline, deployments table, and activity timeline.",
    node: <DashboardTemplate />,
    code: `<AppBar>
  <strong>acme.app</strong>
  <Badge variant="success" dot>all systems go</Badge>
</AppBar>

<Stack spacing={3}>
  <Stat label="Requests today" value="84,201" delta="12%" trend="up" />
  <Card title="Recent deployments">
    <Table columns={["Service", "Region", "Status"]} rows={rows} />
  </Card>
  <Card title="Activity">
    <Timeline items={events} />
  </Card>
</Stack>`,
  },
];
