import { defineField, defineType } from "sanity";

export default defineType({
  name: "partner",
  title: "OEM Partner",
  type: "document",
  fields: [
    defineField({
      name: "order",
      type: "number",
      description: "Display order in the flagship OEM tooltip row.",
    }),
    defineField({
      name: "name",
      type: "string",
      description: "Vendor name (Microsoft, Fortinet, HP Enterprise…).",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "designation",
      type: "string",
      description: "Type of partnership (e.g. 'Authorized Partner', 'Security Partner').",
    }),
    defineField({
      name: "logoKey",
      type: "string",
      description: "Key for the built-in inline SVG. Available: Microsoft, Fortinet, Dell, HPE, VMware, AWS, IBM. Leave empty and use Logo image below for custom vendors.",
    }),
    defineField({
      name: "logoImage",
      type: "image",
      options: { hotspot: true },
      description: "Optional custom logo (used when no logoKey matches).",
    }),
  ],
  orderings: [{ name: "order", title: "Order", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "name", subtitle: "designation", media: "logoImage" },
  },
});
