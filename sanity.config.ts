import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schema } from "./src/sanity/schema";
import { structure } from "./src/sanity/structure";
import { apiVersion, dataset, projectId } from "./src/sanity/env";

// Singleton schema names — these documents must exist exactly once.
const SINGLETONS = [
  "siteSettings", "navigation", "footer", "home",
  "aboutPage", "servicesPage", "industriesPage", "caseStudiesPage",
  "contactPage", "missionVisionPage",
];

export default defineConfig({
  name: "algoritham",
  title: "Algoritham CMS",
  basePath: "/studio",
  projectId,
  dataset,
  schema: {
    ...schema,
    // Hide singletons from the "+ New document" menu so editors can't
    // accidentally create a second siteSettings, home, etc.
    templates: (templates) => templates.filter(({ schemaType }) => !SINGLETONS.includes(schemaType)),
  },
  document: {
    // Strip duplicate/delete actions on singletons — only edit/publish allowed.
    actions: (input, ctx) =>
      SINGLETONS.includes(ctx.schemaType)
        ? input.filter(({ action }) => !["duplicate", "delete", "unpublish"].includes(action ?? ""))
        : input,
  },
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
