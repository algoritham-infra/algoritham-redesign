import { defineField, defineType } from "sanity";

export default defineType({
  name: "subscriber",
  title: "Newsletter Subscriber",
  type: "document",
  fields: [
    defineField({ name: "email",     type: "string", validation: (R) => R.required().email() }),
    defineField({ name: "source",    type: "string", description: "Which form/page they signed up from." }),
    defineField({ name: "createdAt", type: "datetime", readOnly: true, description: "Set automatically when the subscription is created." }),
  ],
  orderings: [
    { name: "newest", title: "Newest first", by: [{ field: "createdAt", direction: "desc" }] },
  ],
  preview: {
    select: { title: "email", subtitle: "createdAt", source: "source" },
    prepare: ({ title, subtitle, source }) => ({
      title,
      subtitle: [subtitle ? new Date(subtitle).toLocaleString() : null, source].filter(Boolean).join(" · "),
    }),
  },
});
