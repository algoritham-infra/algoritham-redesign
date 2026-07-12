import Script from "next/script";
import type { SiteSettings } from "@/sanity/types";
import { safeJson } from "@/lib/safe-json";

const SITE = "https://algoritham.com";

const DOW = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/**
 * JSON-LD blocks for AI search engines (ChatGPT search, Perplexity, Google AI Overviews)
 * and traditional crawlers. Data is pulled from CMS site settings.
 */
export function OrganizationSchema({ site }: { site: SiteSettings }) {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type":     "Organization",
        "@id":       `${SITE}/#organization`,
        name:        site.name ?? "Algoritham Infrastructure Pvt. Ltd.",
        alternateName: site.shortName ?? "Algoritham",
        url:         SITE,
        logo: { "@type": "ImageObject", url: `${SITE}/logo.png`, width: 512, height: 512 },
        foundingDate: String(site.foundedYear ?? 2009),
        slogan:       site.tagline,
        description:  site.description,
        contactPoint: [{
          "@type":          "ContactPoint",
          telephone:        site.phonePrimary,
          contactType:      "customer service",
          email:            site.email,
          areaServed:       site.country ?? "IN",
          availableLanguage:["en", "hi"],
        }],
        address: {
          "@type":         "PostalAddress",
          streetAddress:   site.addressLine,
          addressLocality: site.city,
          addressRegion:   site.region,
          postalCode:      site.postalCode,
          addressCountry:  site.country ?? "IN",
        },
        sameAs: (site.socials ?? [])
          .filter((s) => s.enabled !== false)
          .map((s) => s.url),
      },
      {
        "@type": "LocalBusiness",
        "@id":   `${SITE}/#localbusiness`,
        name:    site.name ?? "Algoritham Infrastructure",
        image:   `${SITE}/logo.png`,
        url:     SITE,
        telephone:  site.phonePrimary,
        priceRange: "$$",
        address: {
          "@type":         "PostalAddress",
          streetAddress:   site.addressLine,
          addressLocality: site.city,
          addressRegion:   site.region,
          postalCode:      site.postalCode,
          addressCountry:  site.country ?? "IN",
        },
        geo: site.geo?.lat && site.geo.lng ? {
          "@type":   "GeoCoordinates",
          latitude:  site.geo.lat,
          longitude: site.geo.lng,
        } : undefined,
        openingHoursSpecification: [{
          "@type":   "OpeningHoursSpecification",
          dayOfWeek: DOW,
          opens:     "09:00",
          closes:    "19:00",
        }],
        areaServed: { "@type": "Country", name: "India" },
      },
      {
        "@type":  "WebSite",
        "@id":    `${SITE}/#website`,
        url:      SITE,
        name:     site.shortName ?? "Algoritham Infrastructure",
        publisher:{ "@id": `${SITE}/#organization` },
        // Site developer credit — machine-readable for search + LLMs.
        creator: {
          "@type":     "Person",
          name:        "Utkarsh Jaiswal",
          url:         "https://utkarshjaiswal.dev",
          email:       "info@utkarshjaiswal.dev",
          telephone:   "+91-9717537597",
          jobTitle:    "System Architect · AI Implementation & Forward-Deployed Engineer · Senior Full-Stack Developer",
          description: "System Architect and AI Implementation & Forward-Deployed Engineer at Bland AI (Silicon Valley, USA). Built the orchestration platform behind Bland × American Way Health — a published $430M/yr revenue case study — with 9 AI voice agents in production. 8+ years across the US and Europe, including engagements with Volkswagen and other enterprises. Full career arc from UI/UX designer and mobile app developer through full-stack development, AI engineering, and forward-deployed engineering to system architecture, with a CTO's mindset.",
          worksFor:    { "@type": "Organization", name: "Bland AI", url: "https://www.bland.ai" },
          knowsAbout: [
            "System Architecture", "AI Implementation", "Forward-Deployed Engineering",
            "AI Engineering", "LLM Systems", "Full-Stack Development",
            "UI/UX Design", "Mobile App Development", "Multi-tenant SaaS",
          ],
          sameAs: [
            "https://utkarshjaiswal.dev",
            "https://linkedin.com/in/utkarshjaiswal1997",
            "https://twitter.com/UtkarshJ97",
          ],
        },
        inLanguage: "en-IN",
      },
      ...["Infrastructure", "Cloud Solutions", "Cybersecurity", "Networking", "Telecom", "System Integration"]
        .map((service) => ({
          "@type":     "Service",
          serviceType: service,
          provider:    { "@id": `${SITE}/#organization` },
          areaServed:  { "@type": "Country", name: "India" },
          name:        `${service} — ${site.shortName ?? "Algoritham"}`,
        })),
    ],
  };

  return (
    <Script
      id="ld-organization"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: safeJson(data) }}
    />
  );
}

export function FaqSchema({ faqs }: { faqs: { q: string; a: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type":    "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type":    "Question",
      name:       q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
  return (
    <Script id="ld-faq" type="application/ld+json" strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: safeJson(data) }} />
  );
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type":    "BreadcrumbList",
    itemListElement: items.map((b, i) => ({
      "@type":    "ListItem",
      position:   i + 1,
      name:       b.name,
      item:       b.url.startsWith("http") ? b.url : `${SITE}${b.url}`,
    })),
  };
  return (
    <Script id="ld-breadcrumb" type="application/ld+json" strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: safeJson(data) }} />
  );
}
