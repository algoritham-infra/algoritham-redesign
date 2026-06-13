import { defineField, defineType } from "sanity";

export default defineType({
  name: "infrastructureFeature",
  title: "Infrastructure Feature",
  type: "document",
  fields: [
    defineField({ name: "order",     type: "number" }),
    defineField({ name: "category",  type: "string",
      options: { list: [
        { title: "Hypervisor & Virtualization", value: "hypervisor" },
        { title: "Facility & Operations",       value: "facility"   },
      ] },
      initialValue: "facility" }),
    defineField({ name: "icon",      type: "string" }),
    defineField({ name: "title",     type: "string", validation: (R) => R.required() }),
    defineField({ name: "desc",      type: "text",   rows: 2 }),
    defineField({ name: "stat",      type: "string" }),
    defineField({ name: "statLabel", type: "string" }),
    defineField({ name: "accent",    type: "string", options: { list: ["rose", "violet", "cyan"] } }),
  ],
  orderings: [{ name: "order", title: "Order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "stat" } },
});
