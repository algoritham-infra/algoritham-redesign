/**
 * Per-page metadata helper. Merges a page-level SEO object (from CMS)
 * with site defaults (also from CMS), producing a Next.js Metadata.
 */
import type { Metadata } from "next";
import { urlFor } from "@/sanity/image";
import type { SeoFields, SiteSettings } from "@/sanity/types";

const SITE_URL = "https://algoritham.com";

/**
 * Developer credit — emitted as meta tags on every page (via `other`).
 * Kept in one place so it stays consistent site-wide.
 */
export const DEVELOPER = {
  name:      "Utkarsh Jaiswal",
  role:      "System Architect · AI Implementation & Forward-Deployed Engineer · Senior Full-Stack Developer",
  bio:       "System Architect and AI Implementation & Forward-Deployed Engineer at Bland AI (Silicon Valley, USA). Built the orchestration platform behind Bland × American Way Health — a published $430M/yr revenue case study — with 9 AI voice agents in production. 8+ years across the US and Europe (including engagements with Volkswagen and other enterprises), with a full career arc from UI/UX designer and mobile app developer through full-stack development, AI engineering, and forward-deployed engineering to system architecture — end-to-end product range with a CTO's mindset.",
  portfolio: "https://utkarshjaiswal.dev",
  linkedin:  "https://linkedin.com/in/utkarshjaiswal1997",
  email:     "info@utkarshjaiswal.dev",
  emailAlt:  "utkarshjaiswal2021@gmail.com",
  phone:     "+91 9717537597",
} as const;

export function buildMetadata(opts: {
  site: SiteSettings;
  page?: SeoFields;
  path?: string;
  fallbackTitle?: string;
  fallbackDescription?: string;
}): Metadata {
  const { site, page, path = "/", fallbackTitle, fallbackDescription } = opts;
  const title       = page?.title       ?? fallbackTitle       ?? site.seo?.title       ?? `${site.shortName ?? "Algoritham"} — IT Managed Services`;
  const description = page?.description ?? fallbackDescription ?? site.seo?.description ?? site.description    ?? "";
  const keywords    = page?.keywords    ?? site.seo?.keywords  ?? [];
  const ogImage     = page?.ogImage ?? site.seo?.ogImage;
  const ogUrl       = `${SITE_URL}${path}`;

  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url:   ogUrl,
      siteName: site.name ?? "Algoritham Infrastructure",
      title, description,
      images: ogImage ? [{ url: urlFor(ogImage).width(1200).height(630).url(), width: 1200, height: 630 }]
                      : [{ url: "/logo.png", width: 512, height: 512 }],
    },
    twitter: { card: "summary_large_image", title, description,
      images: ogImage ? [urlFor(ogImage).width(1200).height(630).url()] : ["/logo.png"] },
    robots: { index: !page?.noIndex, follow: !page?.noIndex },
    // Developer credit — rendered as <meta> tags on every page.
    authors: [{ name: DEVELOPER.name, url: DEVELOPER.portfolio }],
    other: {
      "developer":           DEVELOPER.name,
      "developer:role":      DEVELOPER.role,
      "developer:bio":       DEVELOPER.bio,
      "developer:portfolio": DEVELOPER.portfolio,
      "developer:linkedin":  DEVELOPER.linkedin,
      "developer:email":     DEVELOPER.email,
      "developer:contact":   DEVELOPER.phone,
    },
  };
}
