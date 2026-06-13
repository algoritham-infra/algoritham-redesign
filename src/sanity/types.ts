/**
 * Frontend-facing Sanity types. Hand-written to keep dependencies light;
 * regenerate with `sanity codegen` later if the schema grows.
 */
import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImageSource } from "@sanity/image-url";

export type SeoFields = {
  title?:       string;
  description?: string;
  keywords?:    string[];
  ogImage?:     SanityImageSource;
  noIndex?:     boolean;
};

export type Metric = { value: string; label: string };

export type Cta = { label: string; href: string; variant?: "primary" | "secondary" };

export type SocialLink = { platform: string; url: string };

export type NavLink = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

// ─── Site / global ───────────────────────────────────────────────────
export type SiteSettings = {
  name?:           string;
  shortName?:      string;
  tagline?:        string;
  description?:    string;
  logo?:           SanityImageSource;
  foundedYear?:    number;
  phonePrimary?:   string;
  phoneSecondary?: string[];
  email?:          string;
  addressLine?:    string;
  city?:           string;
  region?:         string;
  postalCode?:     string;
  country?:        string;
  openingHours?:   string;
  geo?:            { lat?: number; lng?: number };
  socials?:        SocialLink[];
  uptimeSLA?:      string;
  yearsInBusiness?:string;
  carriers?:       string;
  projectsDelivered?: string;
  seo?:            SeoFields;
};

export type Navigation = {
  primary?:  NavLink[];
  ctaLabel?: string;
  ctaHref?:  string;
};

export type FooterColumn = {
  heading: string;
  items:   { label: string; href: string }[];
};

export type Footer = {
  tagline?:           string;
  newsletterTitle?:   string;
  newsletterCopy?:    string;
  showNewsletter?:    boolean;
  columns?:           FooterColumn[];
  copyrightSuffix?:   string;
};

// ─── Home ────────────────────────────────────────────────────────────
export type HeroBadge = { icon?: string; label: string; color?: "purple" | "rose" | "cyan" };

export type Home = {
  heroEyebrow?: string;
  heroHeadlinePre?:      string;
  heroHeadlineGradient?: string;
  heroHeadlinePost?:     string;
  heroBrandLine?: string;
  heroSubhead?: string;
  heroPrimaryCta?:   Cta;
  heroSecondaryCta?: Cta;
  heroBadges?: HeroBadge[];

  trustBarHeading?: string;

  servicesEyebrow?:  string;
  servicesHeadline?: string;
  servicesSubhead?:  string;

  howEyebrow?:  string;
  howHeadline?: string;
  howSubhead?:  string;

  caseStudiesEyebrow?:  string;
  caseStudiesHeadline?: string;

  testimonialsEyebrow?:  string;
  testimonialsHeadline?: string;

  eventsEyebrow?:  string;
  eventsHeadline?: string;
  eventsSubhead?:  string;

  certsEyebrow?:  string;
  certsHeadline?: string;
  certsSubhead?:  string;

  ctaEyebrow?:  string;
  ctaHeadline?: string;
  ctaSubhead?:  string;
  ctaPrimary?:   Cta;
  ctaSecondary?: Cta;

  seo?: SeoFields;
};

// ─── Page singletons ─────────────────────────────────────────────────
export type AboutPage = {
  eyebrow?: string;
  headlinePre?:      string;
  headlineGradient?: string;
  intro?:  PortableTextBlock[];
  stats?:  Metric[];
  valuesHeadline?: string;
  values?: { icon?: string; title: string; desc?: string }[];
  journeyEyebrow?:  string;
  journeyHeadline?: string;
  milestones?: {
    year: string; title: string; body?: string; tags?: string[]; stat?: Metric;
  }[];
  missionVisionTeaser?: string;
  seo?: SeoFields;
};

export type ServicesPage = {
  eyebrow?: string;
  headlinePre?:      string;
  headlineGradient?: string;
  subhead?: string;
  seo?: SeoFields;
};

export type IndustriesPage = {
  eyebrow?: string;
  headlinePre?:      string;
  headlineGradient?: string;
  subhead?: string;
  heroStats?: Metric[];
  seo?: SeoFields;
};

export type CaseStudiesPage = {
  eyebrow?: string;
  headlinePre?:      string;
  headlineGradient?: string;
  subhead?: string;
  ctaHeadline?: string;
  ctaSubhead?:  string;
  seo?: SeoFields;
};

export type ContactPageDetail = {
  icon?: string; label: string; value: string; sub?: string; href?: string;
};

export type ContactPage = {
  eyebrow?: string;
  headlinePre?:      string;
  headlineGradient?: string;
  subhead?: string;
  detailsHeading?: string;
  detailsCopy?:    string;
  details?: ContactPageDetail[];
  mapEmbedUrl?: string;
  responsePromise?: string;
  seo?: SeoFields;
};

export type MissionVisionPage = {
  eyebrow?: string;
  headlinePre?:      string;
  headlineGradient?: string;
  intro?: string;

  missionEyebrow?:  string;
  missionHeadline?: string;
  missionBody?:    PortableTextBlock[];
  missionPillars?: { icon?: string; title: string; desc?: string }[];

  visionEyebrow?:  string;
  visionHeadline?: string;
  visionBody?:     PortableTextBlock[];

  principlesEyebrow?:  string;
  principlesHeadline?: string;
  principles?: { icon?: string; title: string; desc?: string }[];

  seo?: SeoFields;
};

// ─── List documents ──────────────────────────────────────────────────
export type Service = {
  _id?: string;
  order?: number;
  num?: string;
  slug?: { current: string };
  title: string;
  tagline?: string;
  icon?: string;
  summary?: string;
  detail?: string;
  tags?: string[];
  points?: string[];
  brands?: string[];
  metric?: Metric;
  accent?: "rose" | "violet" | "cyan" | "blue" | "pink";
  seo?: SeoFields;
};

export type HowItWorksStep = {
  _id?: string;
  order?: number;
  num: string;
  icon?: string;
  title: string;
  subtitle?: string;
  desc?: string;
  detail?: string;
  accent?: "rose" | "violet" | "cyan";
};

export type InfrastructureFeature = {
  _id?: string;
  category?: "hypervisor" | "facility";
  icon?: string;
  title: string;
  desc?: string;
  stat?: string;
  statLabel?: string;
  accent?: "rose" | "violet" | "cyan";
};

export type CoverageNode = {
  _id?: string;
  city: string;
  x?: number;
  y?: number;
  primary?: boolean;
  carriers?: number;
  pop?: string;
};

export type CaseStudy = {
  _id?: string;
  num: string;
  industry: string;
  client: string;
  slug?: { current: string };
  challenge?: string;
  solution?: string;
  outcome?: string;
  metrics?: Metric[];
  tags?: string[];
  featured?: boolean;
  seo?: SeoFields;
};

export type Testimonial = {
  _id?: string;
  quote: string;
  name: string;
  role?: string;
  company?: string;
  avatar?: SanityImageSource;
};

export type Partner = {
  _id?: string;
  name: string;
  designation?: string;
  logoKey?: string;
  logoImage?: SanityImageSource;
};

export type Client = { _id?: string; name: string };

export type Certification = {
  _id?: string;
  icon?: string;
  title: string;
  desc?: string;
};

export type Industry = {
  _id?: string;
  slug?: { current: string };
  title: string;
  icon?: string;
  accent?: "rose" | "violet" | "blue" | "cyan" | "pink" | "orange";
  desc?: string;
  services?: string[];
  stat?: Metric;
};

export type EventPhoto = {
  _id?: string;
  image?: SanityImageSource;
  caption: string;
  alt: string;
  span?: string;
};

export type LegalPage = {
  title: string;
  slug: { current: string };
  body?: PortableTextBlock[];
  seo?: SeoFields;
};
