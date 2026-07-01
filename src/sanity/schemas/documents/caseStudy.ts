import { defineField, defineType } from "sanity";

export default defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    defineField({ name: "order",     type: "number", description: "Display order on the Case Studies page." }),
    defineField({ name: "num",       type: "string", description: "Display number (e.g. '01').", validation: (R) => R.required() }),
    defineField({ name: "industry",  type: "string", description: "Industry vertical (e.g. 'Financial Services').", validation: (R) => R.required() }),
    defineField({ name: "client",    type: "string", description: "Client name (can be anonymised).", validation: (R) => R.required() }),
    defineField({ name: "slug",      type: "slug",   options: { source: "client" }, description: "URL slug — auto-generated from client name." }),
    defineField({ name: "challenge", type: "text",   rows: 3, description: "The business problem before Algoritham arrived." }),
    defineField({ name: "solution",  type: "text",   rows: 4, description: "What Algoritham did (be specific about tech stack)." }),
    defineField({ name: "outcome",   type: "text",   rows: 3, description: "Measurable result (uptime %, cost saved, time to deploy, etc.)." }),
    defineField({
      name: "metrics",
      type: "array",
      of: [{ type: "metric" }],
      description: "Three key result numbers (shown as tiles under the case study).",
      validation: (R) => R.max(3),
    }),
    defineField({ name: "tags",      type: "array",  of: [{ type: "string" }], options: { layout: "tags" }, description: "Tech / practice tags (FortiGate, MPLS, AWS…)." }),
    defineField({ name: "featured",  type: "boolean", initialValue: false, description: "If true, appears in the highlighted case-studies row on the home page." }),
    defineField({ name: "seo",       type: "seo" }),
  ],
  orderings: [{ name: "order", title: "Order", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "client", subtitle: "industry", featured: "featured" },
    prepare: ({ title, subtitle, featured }) => ({
      title: `${title ?? "Untitled"}${featured ? " ⭐" : ""}`,
      subtitle,
    }),
  },
});
