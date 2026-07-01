import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "order",
      type: "number",
      description: "Display order in the scrolling testimonials marquee.",
    }),
    defineField({
      name: "quote",
      type: "text",
      rows: 3,
      description: "The quote in the person's own words. Keep it real — 1–3 sentences.",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "name",
      type: "string",
      description: "Name of the person quoted.",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "role",
      type: "string",
      description: "Job title (e.g. 'IT Director', 'CTO').",
    }),
    defineField({
      name: "company",
      type: "string",
      description: "Company they work at.",
    }),
    defineField({
      name: "avatar",
      type: "image",
      options: { hotspot: true },
      description: "Optional headshot. If empty, initials are rendered inside a gradient circle.",
    }),
  ],
  orderings: [{ name: "order", title: "Order", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "name", role: "role", company: "company", media: "avatar" },
    prepare: ({ title, role, company, media }) => ({
      title: title ?? "Unnamed",
      subtitle: [role, company].filter(Boolean).join(" · "),
      media,
    }),
  },
});
