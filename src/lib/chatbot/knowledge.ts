/**
 * Chatbot knowledge base — server-only.
 *
 * Compiles the full grounding document the assistant answers from:
 *   1. Live Sanity content (site settings, services, industries, case
 *      studies, certifications, coverage) — editors update Sanity, the
 *      bot's answers update with it.
 *   2. Curated FAQs (faqs.ts).
 *
 * The corpus is small (~10–15 KB), so instead of vector retrieval we do
 * full-context grounding: the entire knowledge doc rides in the system
 * prompt. Zero retrieval misses, always on-topic. Cached in-module for
 * 10 minutes to avoid hitting Sanity on every chat message.
 */
import {
  siteSettings, services, industries, caseStudies,
  certifications, coverageNodes, howItWorksSteps,
} from "@/sanity/content";
import { FAQS } from "./faqs";

let cache: { doc: string; at: number } | null = null;
const TTL_MS = 10 * 60_000;

export async function knowledgeDoc(): Promise<string> {
  if (cache && Date.now() - cache.at < TTL_MS) return cache.doc;

  const [site, svc, inds, cases, certs, coverage, steps] = await Promise.all([
    siteSettings(), services(), industries(), caseStudies(),
    certifications(), coverageNodes(), howItWorksSteps(),
  ]);

  const lines: string[] = [];

  lines.push("# COMPANY");
  lines.push(`${site.name} ("Algoritham") — ${site.description}`);
  lines.push(`Founded: ${site.foundedYear}. HQ: ${site.addressLine}, ${site.city} ${site.postalCode}.`);
  lines.push(`Track record: ${site.projectsDelivered} enterprise projects, ${site.yearsInBusiness} years operating, ${site.uptimeSLA} uptime SLA, ${site.carriers} telecom carriers.`);
  lines.push(`Hours: ${site.openingHours} for new enquiries; 24/7 for managed-service clients.`);

  lines.push("\n# CONTACT (use these when someone wants to talk, schedule, or buy)");
  lines.push(`Primary phone: ${site.phonePrimary} (Princy Gupta).`);
  if (site.phoneSecondary?.length) lines.push(`Other lines: ${site.phoneSecondary.join(", ")}.`);
  lines.push(`Email: ${site.email}. Website contact form: /contact (free IT assessment, reply within 1 business day).`);

  lines.push("\n# SERVICES");
  for (const s of svc) {
    lines.push(`## ${s.title} — ${s.tagline ?? ""}`);
    lines.push(s.detail ?? s.summary ?? "");
    if (s.points?.length) lines.push("Includes: " + s.points.join("; "));
    if (s.brands?.length) lines.push("Vendors: " + s.brands.join(", "));
    if (s.metric) lines.push(`Key metric: ${s.metric.value} ${s.metric.label}`);
  }

  lines.push("\n# INDUSTRIES SERVED");
  for (const i of inds) {
    lines.push(`- ${i.title}: ${i.desc ?? ""} (${(i.services ?? []).join(", ")})`);
  }

  lines.push("\n# CASE STUDIES (real outcomes)");
  for (const c of cases) {
    lines.push(`- ${c.client} [${c.industry}] — Challenge: ${c.challenge} Solution: ${c.solution} Outcome: ${c.outcome}`);
  }

  lines.push("\n# ENGAGEMENT PROCESS");
  for (const st of steps) {
    lines.push(`${st.num}. ${st.title} (${st.subtitle ?? ""}): ${st.desc ?? ""} — ${st.detail ?? ""}`);
  }

  lines.push("\n# CERTIFICATIONS & TRUST");
  for (const c of certs) lines.push(`- ${c.title}: ${c.desc ?? ""}`);

  lines.push("\n# COVERAGE");
  lines.push("Metros: " + coverage.map((c) => c.city + (c.primary ? " (HQ + primary DC)" : "")).join(", "));

  lines.push("\n# FAQ");
  for (const f of FAQS) lines.push(`Q: ${f.q}\nA: ${f.a}`);

  const doc = lines.join("\n");
  cache = { doc, at: Date.now() };
  return doc;
}

/**
 * No-API-key fallback: score FAQs by keyword overlap and return the best
 * answer. Not generative — but grounded, instant, and free. Handles
 * greetings and, when nothing matches, gives a company overview rather
 * than a dead-end "call us" so broad questions still get a real answer.
 */
export function fallbackAnswer(question: string): string {
  const q = question.toLowerCase().trim();

  // Greetings / thanks
  if (/^(hi|hii+|hey+|hello|helo|yo|namaste|hola)\b/.test(q) || /good (morning|afternoon|evening)/.test(q)) {
    return "Hello! I'm Algoritham's assistant. Ask me about our IT services, coverage, certifications, or case studies — or use the buttons below to call us or schedule a meeting.";
  }
  if (/\b(thanks|thank you|thankyou|cheers)\b/.test(q)) {
    return "You're welcome! If you'd like to talk to someone, call Princy Gupta at +91 95942 67666 or tap 'Schedule a meeting' below.";
  }

  let best: { score: number; a: string } = { score: 0, a: "" };
  for (const f of FAQS) {
    let score = 0;
    for (const kw of f.keywords) if (q.includes(kw)) score += kw.length > 4 ? 2 : 1;
    if (score > best.score) best = { score, a: f.a };
  }
  if (best.score >= 2) return best.a;

  // Weak / no keyword match → give the company overview (covers broad
  // "what is this", "tell me more", one-word queries) instead of a dead end.
  return (
    "Algoritham Infrastructure is a Mumbai-based national IT integrator (since 2009) providing managed infrastructure, cloud, cybersecurity, networking, telecom, and system integration for enterprises across India — 1200+ projects and a 99.99% uptime SLA. " +
    "Ask me about a specific service or your industry, or reach the team at +91 95942 67666 (Princy Gupta) or info@algoritham.in."
  );
}
