import { defineField, defineType } from "sanity";

export default defineType({
  name: "eventPhoto",
  title: "Event Photo",
  type: "document",
  fields: [
    defineField({
      name: "order",
      type: "number",
      description: "Display order in the bento gallery. Smaller = earlier.",
    }),
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
      description: "The photo itself. Uploaded assets automatically render on the home page gallery.",
    }),
    defineField({
      name: "caption",
      type: "string",
      description: "Short caption shown under the photo and in the lightbox.",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "alt",
      type: "string",
      description: "Alt text for accessibility and SEO. Describe the photo.",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "span",
      type: "string",
      options: {
        list: [
          { title: "Standard 1×1", value: "" },
          { title: "Wide 2×1",     value: "col-span-2" },
          { title: "Tall 1×2",     value: "row-span-2" },
          { title: "Hero 2×2",     value: "col-span-2 row-span-2" },
        ],
      },
      description: "Grid cell size in the bento layout.",
    }),
  ],
  preview: {
    select: { title: "caption", subtitle: "alt", media: "image" },
    prepare: ({ title, subtitle, media }) => ({
      title: title ?? "Untitled event",
      subtitle,
      media,
    }),
  },
});
