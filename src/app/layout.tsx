import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { OrganizationSchema } from "@/components/SeoSchema";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = "https://algoritham.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:  "Algoritham Infrastructure — End-to-End IT Managed Services in India",
    template: "%s · Algoritham Infrastructure",
  },
  description:
    "National technology integrator offering managed IT, cloud, cybersecurity, networking, and telecom services for enterprises across India. ISO 9001 · ITIL · Established 2009 · Mumbai HQ.",
  applicationName: "Algoritham Infrastructure",
  authors:    [{ name: "Algoritham Infrastructure Pvt. Ltd.", url: siteUrl }],
  creator:    "Algoritham Infrastructure Pvt. Ltd.",
  publisher:  "Algoritham Infrastructure Pvt. Ltd.",
  generator:  "Next.js",
  keywords: [
    "IT managed services India", "data center services Mumbai",
    "Fortinet partner Mumbai", "cloud solutions IaaS PaaS SaaS India",
    "cybersecurity services India", "enterprise networking",
    "telecom services India", "system integrator Mumbai",
    "ISO 9001 IT services", "ITIL managed IT",
  ],
  category: "Information Technology Services",

  alternates: {
    canonical: "/",
    languages: { "en-IN": "/" },
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Algoritham Infrastructure",
    title:  "Algoritham Infrastructure — End-to-End IT Managed Services in India",
    description:
      "Enterprise IT infrastructure, cloud, security, networking, and telecom — managed end-to-end since 2009.",
    images: [{
      url: "/logo.png",
      width: 512,
      height: 512,
      alt: "Algoritham Infrastructure logo",
    }],
  },

  twitter: {
    card: "summary_large_image",
    title: "Algoritham Infrastructure",
    description: "End-to-end IT managed services for enterprises across India.",
    images: ["/logo.png"],
  },

  robots: {
    index: true, follow: true,
    googleBot: {
      index: true, follow: true,
      "max-video-preview":   -1,
      "max-image-preview":   "large",
      "max-snippet":         -1,
    },
  },

  icons: {
    icon:     [{ url: "/logo.png", type: "image/png" }],
    shortcut: "/logo.png",
    apple:    "/logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${inter.variable} dark`} suppressHydrationWarning>
      <head>
        <OrganizationSchema />
      </head>
      <body className="bg-base text-1">
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
