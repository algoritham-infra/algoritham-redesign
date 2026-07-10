import type { MetadataRoute } from "next";

const SITE = "https://algoritham.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Allow general crawlers and AI search bots.
      // Block server surfaces that shouldn't be indexed.
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/studio", "/legal/"],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host:    SITE,
  };
}
