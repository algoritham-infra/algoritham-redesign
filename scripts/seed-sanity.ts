/**
 * One-shot Sanity seeder. Pushes every default from src/sanity/defaults.ts
 * into the Sanity dataset so editors see populated documents in Studio.
 *
 *   npm run sanity:seed
 *
 * Idempotent: uses createOrReplace for singletons and createIfNotExists
 * (keyed by a stable _id) for list documents. Safe to re-run; will not
 * duplicate, but will overwrite singletons with the current defaults.
 * To force-overwrite list items, delete them in Studio first.
 *
 * Requires SANITY_API_TOKEN with write access (Editor or Administrator).
 */
import { config as dotenv } from "dotenv";
import { resolve } from "path";
import { createClient } from "next-sanity";
import * as D from "../src/sanity/defaults";

// Load .env.local first (Next.js convention), then fall back to .env
dotenv({ path: resolve(__dirname, "../.env.local") });
dotenv({ path: resolve(__dirname, "../.env") });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "gphbi065";
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET    ?? "production";
const token     = process.env.SANITY_API_TOKEN;

if (!token) {
  console.error("✗ SANITY_API_TOKEN is not set. Add it to .env.local and re-run.");
  process.exit(1);
}

const client = createClient({
  projectId, dataset, token,
  apiVersion: "2025-01-01",
  useCdn:     false,
});

const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

async function singleton(_id: string, type: string, doc: Record<string, unknown>) {
  await client.createOrReplace({ _id, _type: type, ...doc });
  console.log(`  ✓ singleton ${type} (${_id})`);
}

async function listItem(type: string, key: string, doc: Record<string, unknown>) {
  const _id = `${type}.${key}`;
  await client.createIfNotExists({ _id, _type: type, ...doc });
}

async function seedSingletons() {
  console.log("\n→ Singletons");
  await singleton("siteSettings",     "siteSettings",     D.SITE_SETTINGS_DEFAULT);
  await singleton("navigation",       "navigation",       D.NAVIGATION_DEFAULT);
  await singleton("footer",           "footer",           D.FOOTER_DEFAULT);
  await singleton("home",             "home",             D.HOME_DEFAULT);
  await singleton("aboutPage",        "aboutPage",        D.ABOUT_DEFAULT);
  await singleton("servicesPage",     "servicesPage",     D.SERVICES_PAGE_DEFAULT);
  await singleton("industriesPage",   "industriesPage",   D.INDUSTRIES_PAGE_DEFAULT);
  await singleton("caseStudiesPage",  "caseStudiesPage",  D.CASE_STUDIES_PAGE_DEFAULT);
  await singleton("contactPage",      "contactPage",      D.CONTACT_PAGE_DEFAULT);
  await singleton("missionVisionPage","missionVisionPage",D.MISSION_VISION_DEFAULT);
}

async function seedLists() {
  console.log("\n→ Services");
  for (const [i, s] of D.SERVICES_DEFAULT.entries()) {
    await listItem("service", s.slug?.current ?? slug(s.title), { ...s, order: i + 1 });
  }
  console.log(`  ✓ ${D.SERVICES_DEFAULT.length} services`);

  console.log("→ How-it-works steps");
  for (const [i, s] of D.HOW_STEPS_DEFAULT.entries()) {
    await listItem("howItWorksStep", `step-${s.num}`, { ...s, order: i + 1 });
  }
  console.log(`  ✓ ${D.HOW_STEPS_DEFAULT.length} steps`);

  console.log("→ Infrastructure features");
  for (const [i, f] of D.INFRASTRUCTURE_FEATURES_DEFAULT.entries()) {
    await listItem("infrastructureFeature", `feat-${slug(f.title)}`, { ...f, order: i + 1 });
  }
  console.log(`  ✓ ${D.INFRASTRUCTURE_FEATURES_DEFAULT.length} features`);

  console.log("→ Coverage cities");
  for (const [i, c] of D.COVERAGE_DEFAULT.entries()) {
    await listItem("coverageNode", slug(c.city), { ...c, order: i + 1 });
  }
  console.log(`  ✓ ${D.COVERAGE_DEFAULT.length} cities`);

  console.log("→ Case studies");
  for (const [i, c] of D.CASE_STUDIES_DEFAULT.entries()) {
    await listItem("caseStudy", `cs-${c.num}`, { ...c, order: i + 1 });
  }
  console.log(`  ✓ ${D.CASE_STUDIES_DEFAULT.length} case studies`);

  console.log("→ Testimonials");
  for (const [i, t] of D.TESTIMONIALS_DEFAULT.entries()) {
    await listItem("testimonial", `t-${slug(t.name)}`, { ...t, order: i + 1 });
  }
  console.log(`  ✓ ${D.TESTIMONIALS_DEFAULT.length} testimonials`);

  console.log("→ Partners");
  for (const [i, p] of D.PARTNERS_DEFAULT.entries()) {
    await listItem("partner", `p-${slug(p.name)}`, { ...p, order: i + 1 });
  }
  console.log(`  ✓ ${D.PARTNERS_DEFAULT.length} partners`);

  console.log("→ Clients");
  for (const [i, c] of D.CLIENTS_DEFAULT.entries()) {
    await listItem("client", `c-${slug(c.name)}-${i}`, { ...c, order: i + 1 });
  }
  console.log(`  ✓ ${D.CLIENTS_DEFAULT.length} clients`);

  console.log("→ Certifications");
  for (const [i, c] of D.CERTIFICATIONS_DEFAULT.entries()) {
    await listItem("certification", `cert-${slug(c.title)}`, { ...c, order: i + 1 });
  }
  console.log(`  ✓ ${D.CERTIFICATIONS_DEFAULT.length} certifications`);

  console.log("→ Industries");
  for (const [i, ind] of D.INDUSTRIES_DEFAULT.entries()) {
    await listItem("industry", ind.slug?.current ?? slug(ind.title), { ...ind, order: i + 1 });
  }
  console.log(`  ✓ ${D.INDUSTRIES_DEFAULT.length} industries`);

  console.log("→ Event photos");
  for (const [i, p] of D.EVENT_PHOTOS_DEFAULT.entries()) {
    await listItem("eventPhoto", `ev-${slug(p.caption)}-${i}`, { ...p, order: i + 1 });
  }
  console.log(`  ✓ ${D.EVENT_PHOTOS_DEFAULT.length} event photos`);
}

(async () => {
  console.log(`\nSeeding Sanity project ${projectId} (dataset: ${dataset})`);
  await seedSingletons();
  await seedLists();
  console.log("\n✓ Done. Open https://" + projectId + ".sanity.studio or /studio to verify.\n");
})().catch((e) => {
  console.error("\n✗ Seed failed:", e);
  process.exit(1);
});
