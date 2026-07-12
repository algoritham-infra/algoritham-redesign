import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { OrganizationSchema } from "@/components/SeoSchema";
import { ChatWidget } from "@/components/chatbot/ChatWidget";
import { siteSettings } from "@/sanity/content";
import { buildMetadata } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://algoritham.com";

export async function generateMetadata(): Promise<Metadata> {
  const site = await siteSettings();
  const base = buildMetadata({
    site,
    fallbackTitle: `${site.shortName ?? "Algoritham"} Infrastructure — End-to-End IT Managed Services in India`,
    fallbackDescription: site.description ?? "National technology integrator offering managed IT, cloud, cybersecurity, networking, and telecom services for enterprises across India.",
  });

  return {
    ...base,
    metadataBase: new URL(SITE_URL),
    title: {
      default:  base.title as string,
      template: `%s · ${site.shortName ?? "Algoritham"} Infrastructure`,
    },
    applicationName: site.name,
    // Developer credit as author (site by Utkarsh Jaiswal); company remains
    // the creator/publisher of the content.
    authors:    [{ name: "Utkarsh Jaiswal", url: "https://utkarshjaiswal.dev" }],
    creator:    site.name,
    publisher:  site.name,
    generator:  "Next.js",
    category:   "Information Technology Services",
    // Favicons are handled by the App Router file convention:
    //   src/app/favicon.ico, src/app/icon.png, src/app/apple-icon.png
    // (all generated from the company logo). No manual icons block needed —
    // a manual one would override the file convention.
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const site = await siteSettings();
  return (
    <html lang="en-IN" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Preconnect to Sanity CDN so image asset requests skip a handshake */}
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <OrganizationSchema site={site} />
      </head>
      <body className="bg-base text-1">
        <ThemeProvider>{children}</ThemeProvider>
        <ChatWidget
          phonePrimary={site.phonePrimary ?? "+91 95942 67666"}
          phoneOffice={site.phoneSecondary?.[0]}
          email={site.email}
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
