import type { StructureResolver } from "sanity/structure";

/**
 * Studio sidebar layout for the Algoritham content team.
 *
 * Organised by editor mental model, not by schema alphabetical order:
 *   1. Global settings that touch every page (Site Settings, Nav, Footer)
 *   2. Per-page overrides (Home, About, Services page copy…)
 *   3. Content the team edits most often (Services, Industries, Case
 *      Studies, Testimonials, Certifications) up top for one-click access
 *   4. People/partners (OEMs, Clients)
 *   5. Home-page inner content that used to hide inside page fields
 *      (How-It-Works steps, Infrastructure features, Coverage cities,
 *      Event photos) — grouped under a "Home page content" folder
 *   6. Legal pages
 *   7. Inbox (Newsletter subscribers + Contact submissions) — sorted by
 *      newest first so the inbox reads like an actual inbox
 *
 * Emoji prefixes are used instead of icon components — no extra deps,
 * still gives a clear visual anchor per item.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Algoritham Studio")
    .items([
      // ── Global settings ─────────────────────────────────────────────
      S.listItem()
        .title("🌐  Site Settings")
        .id("siteSettings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Site Settings"),
        ),
      S.listItem()
        .title("🧭  Navigation")
        .id("navigation")
        .child(
          S.document()
            .schemaType("navigation")
            .documentId("navigation")
            .title("Navigation"),
        ),
      S.listItem()
        .title("👣  Footer")
        .id("footer")
        .child(
          S.document()
            .schemaType("footer")
            .documentId("footer")
            .title("Footer"),
        ),

      S.divider(),

      // ── Page content ────────────────────────────────────────────────
      S.listItem()
        .title("📄  Pages")
        .child(
          S.list()
            .title("Pages")
            .items([
              S.listItem()
                .title("🏠  Home page")
                .child(S.document().schemaType("home").documentId("home").title("Home page")),
              S.listItem()
                .title("👤  About page")
                .child(S.document().schemaType("aboutPage").documentId("aboutPage").title("About page")),
              S.listItem()
                .title("🎯  Mission & Vision page")
                .child(S.document().schemaType("missionVisionPage").documentId("missionVisionPage").title("Mission & Vision")),
              S.listItem()
                .title("⚡  Services page")
                .child(S.document().schemaType("servicesPage").documentId("servicesPage").title("Services page")),
              S.listItem()
                .title("🏢  Industries page")
                .child(S.document().schemaType("industriesPage").documentId("industriesPage").title("Industries page")),
              S.listItem()
                .title("📊  Case Studies page")
                .child(S.document().schemaType("caseStudiesPage").documentId("caseStudiesPage").title("Case Studies page")),
              S.listItem()
                .title("📬  Contact page")
                .child(S.document().schemaType("contactPage").documentId("contactPage").title("Contact page")),
            ]),
        ),

      S.divider(),

      // ── Business content the team edits most ────────────────────────
      S.listItem()
        .title("⚙️  Services")
        .child(
          S.documentTypeList("service")
            .title("Services")
            .defaultOrdering([{ field: "order", direction: "asc" }]),
        ),
      S.listItem()
        .title("🏭  Industries")
        .child(
          S.documentTypeList("industry")
            .title("Industries")
            .defaultOrdering([{ field: "order", direction: "asc" }]),
        ),
      S.listItem()
        .title("📈  Case Studies")
        .child(
          S.documentTypeList("caseStudy")
            .title("Case Studies")
            .defaultOrdering([{ field: "order", direction: "asc" }]),
        ),
      S.listItem()
        .title("💬  Testimonials")
        .child(
          S.documentTypeList("testimonial")
            .title("Testimonials")
            .defaultOrdering([{ field: "order", direction: "asc" }]),
        ),
      S.listItem()
        .title("🏆  Certifications")
        .child(
          S.documentTypeList("certification")
            .title("Certifications")
            .defaultOrdering([{ field: "order", direction: "asc" }]),
        ),

      S.divider(),

      // ── People / brand relationships ────────────────────────────────
      S.listItem()
        .title("🤝  OEM Partners")
        .child(
          S.documentTypeList("partner")
            .title("OEM Partners")
            .defaultOrdering([{ field: "order", direction: "asc" }]),
        ),
      S.listItem()
        .title("👥  Clients")
        .child(
          S.documentTypeList("client")
            .title("Clients")
            .defaultOrdering([{ field: "order", direction: "asc" }]),
        ),

      S.divider(),

      // ── Home-page inner content, grouped ────────────────────────────
      S.listItem()
        .title("🖥️  Home page content")
        .child(
          S.list()
            .title("Home page content")
            .items([
              S.listItem()
                .title("📸  Event photos")
                .child(
                  S.documentTypeList("eventPhoto")
                    .title("Event Photos")
                    .defaultOrdering([{ field: "order", direction: "asc" }]),
                ),
              S.listItem()
                .title("📋  How-It-Works steps")
                .child(
                  S.documentTypeList("howItWorksStep")
                    .title("How-It-Works Steps")
                    .defaultOrdering([{ field: "order", direction: "asc" }]),
                ),
              S.listItem()
                .title("🏗️  Infrastructure features")
                .child(
                  S.documentTypeList("infrastructureFeature")
                    .title("Infrastructure Features")
                    .defaultOrdering([{ field: "order", direction: "asc" }]),
                ),
              S.listItem()
                .title("🗺️  Coverage cities")
                .child(
                  S.documentTypeList("coverageNode")
                    .title("Coverage Cities")
                    .defaultOrdering([{ field: "order", direction: "asc" }]),
                ),
            ]),
        ),

      S.divider(),

      // ── Legal ───────────────────────────────────────────────────────
      S.listItem()
        .title("📜  Legal pages")
        .child(S.documentTypeList("legalPage").title("Legal Pages")),

      S.divider(),

      // ── Inbox — newest first ────────────────────────────────────────
      S.listItem()
        .title("📮  Contact submissions")
        .child(
          S.documentTypeList("contactSubmission")
            .title("Contact Submissions")
            .defaultOrdering([{ field: "createdAt", direction: "desc" }]),
        ),
      S.listItem()
        .title("✉️  Newsletter subscribers")
        .child(
          S.documentTypeList("subscriber")
            .title("Newsletter Subscribers")
            .defaultOrdering([{ field: "createdAt", direction: "desc" }]),
        ),
    ]);
