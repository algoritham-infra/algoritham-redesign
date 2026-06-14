/**
 * One-shot setup of Sanity CORS origins + revalidation webhook via the
 * Sanity management API. Requires a token with Administrator role (the
 * Editor token used for seeding is not enough).
 *
 *   npm run sanity:setup
 *
 * Idempotent: skips an origin or webhook if it already exists.
 */
import { config as dotenv } from "dotenv";
import { resolve } from "path";

dotenv({ path: resolve(__dirname, "../.env.local") });
dotenv({ path: resolve(__dirname, "../.env") });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "gphbi065";
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET    ?? "production";
const token     = process.env.SANITY_API_TOKEN;
const secret    = process.env.SANITY_REVALIDATE_SECRET;

if (!token)  { console.error("✗ SANITY_API_TOKEN is not set"); process.exit(1); }
if (!secret) { console.error("✗ SANITY_REVALIDATE_SECRET is not set"); process.exit(1); }

const ORIGINS = [
  "https://algoritham.com",
  "https://algoritham-redesign.vercel.app",
  "http://localhost:3000",
  "http://localhost:3001",
];

const WEBHOOK_URL = process.env.WEBHOOK_URL ?? "https://algoritham.com/api/revalidate";

const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};
const BASE = `https://api.sanity.io/v2025-01-01/projects/${projectId}`;

async function listJson(path: string) {
  const r = await fetch(`${BASE}${path}`, { headers });
  if (!r.ok) throw new Error(`${r.status} ${await r.text()}`);
  return r.json();
}

async function postJson(path: string, body: unknown) {
  const r = await fetch(`${BASE}${path}`, { method: "POST", headers, body: JSON.stringify(body) });
  if (!r.ok) throw new Error(`${r.status} ${await r.text()}`);
  return r.json();
}

async function setupCors() {
  console.log("\n→ CORS origins");
  const existing: { origin: string }[] = await listJson("/cors");
  const have = new Set(existing.map((c) => c.origin));
  for (const origin of ORIGINS) {
    if (have.has(origin)) { console.log(`  · ${origin} already added`); continue; }
    try {
      await postJson("/cors", { origin, allowCredentials: true });
      console.log(`  ✓ ${origin}`);
    } catch (e) {
      console.log(`  ✗ ${origin} — ${(e as Error).message.slice(0, 120)}`);
    }
  }
}

async function setupWebhook() {
  console.log("\n→ Revalidate webhook");
  // Webhook API lives under /v2021-10-04/hooks/projects/{projectId}, NOT
  // the standard /vYYYY-MM-DD/projects/{projectId}/hooks path.
  const HOOKS_BASE = `https://api.sanity.io/v2021-10-04/hooks/projects/${projectId}`;
  const r = await fetch(HOOKS_BASE, { headers });
  if (!r.ok) { console.log(`  ✗ list failed: ${r.status} ${await r.text()}`); return; }
  const existing: { url: string; name: string }[] = await r.json();
  const matched = existing.find((h) => h.url === WEBHOOK_URL);
  if (matched) {
    console.log(`  · already exists: ${matched.name} → ${matched.url}`);
    return;
  }
  const create = await fetch(HOOKS_BASE, {
    method: "POST", headers,
    body: JSON.stringify({
      type:     "document",
      name:     "Next.js revalidate",
      dataset,
      url:      WEBHOOK_URL,
      httpMethod: "POST",
      apiVersion: "v2021-03-25",
      includeDrafts: false,
      secret,
      rule: { on: ["create", "update", "delete"] },
    }),
  });
  if (create.ok) console.log(`  ✓ ${WEBHOOK_URL}`);
  else console.log(`  ✗ ${WEBHOOK_URL} — ${create.status} ${await create.text()}`);
}

(async () => {
  console.log(`\nConfiguring Sanity project ${projectId} (dataset: ${dataset})`);
  await setupCors();
  await setupWebhook();
  console.log("\n✓ Done.\n");
})().catch((e) => { console.error("\n✗ Setup failed:", e); process.exit(1); });
