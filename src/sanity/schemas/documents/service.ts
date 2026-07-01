import { defineField, defineType } from "sanity";

export default defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "order",  type: "number", description: "Display order in the services grid." }),
    defineField({ name: "num",    type: "string", description: "Display number (e.g. '01', '02').", validation: (R) => R.required() }),
    defineField({ name: "slug",   type: "slug",   options: { source: "title" }, description: "URL slug — used for the anchor link on /services.", validation: (R) => R.required() }),
    defineField({ name: "title",  type: "string", description: "Service name (Infrastructure, Cloud Solutions, Cybersecurity…).", validation: (R) => R.required() }),
    defineField({ name: "tagline",type: "string", description: "One-line pitch under the title." }),
    defineField({ name: "icon",   type: "string", description: "Lucide icon name: Server, Cloud, Shield, Network, Radio, GitMerge." }),
    defineField({ name: "summary",type: "text",   rows: 3, description: "Short description shown on the home page card." }),
    defineField({ name: "detail", type: "text",   rows: 5, description: "Longer description shown on the /services page." }),
    defineField({ name: "tags",   type: "array",  of: [{ type: "string" }], options: { layout: "tags" }, description: "Small chips shown on the card (e.g. 'IaaS', 'FortiGate')." }),
    defineField({ name: "points", type: "array",  of: [{ type: "string" }], description: "Bulleted feature list on the /services page." }),
    defineField({ name: "brands", type: "array",  of: [{ type: "string" }], description: "Vendor brands you deploy for this service." }),
    defineField({ name: "metric", type: "metric", description: "Headline metric (uptime %, savings, MTTR…)." }),
    defineField({
      name: "accent",
      type: "string",
      options: { list: ["rose", "violet", "cyan", "blue", "pink"] },
      description: "Accent colour theme for the card.",
    }),
    defineField({ name: "seo",    type: "seo" }),
  ],
  orderings: [{ name: "order", title: "Order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "tagline" } },
});
