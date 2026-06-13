/**
 * Static fallbacks — used whenever Sanity returns null/empty.
 * Keeps the site rendering before Studio is populated, and survives
 * accidental schema-document deletion in the CMS.
 * Edit values in Studio first; treat this file as a last-resort floor.
 */
import type {
  SiteSettings, Navigation, Footer, Home, AboutPage, ServicesPage,
  IndustriesPage, CaseStudiesPage, ContactPage, MissionVisionPage,
  Service, HowItWorksStep, InfrastructureFeature, CoverageNode,
  CaseStudy, Testimonial, Partner, Client, Certification, Industry,
  EventPhoto,
} from "./types";

// Primary contact = Princy Gupta. Other lines are secondary.
const PHONE_PRIMARY    = "+91 95942 67666";
const PHONE_SECONDARY  = ["+91 99301 81363", "022-35131125"];

export const SITE_SETTINGS_DEFAULT: SiteSettings = {
  name:       "Algoritham Infrastructure Pvt. Ltd.",
  shortName:  "Algoritham",
  tagline:    "End-to-end IT infrastructure, built to last.",
  description:"Algoritham Infrastructure is a Mumbai-based national technology integrator. Managed IT, cloud, cybersecurity, networking, and telecom for Indian enterprises since 2009.",
  foundedYear: 2009,
  phonePrimary:   PHONE_PRIMARY,
  phoneSecondary: PHONE_SECONDARY,
  email:       "info@algoritham.in",
  addressLine: "1102, 11th Floor, Chandak Chamber, Western Express Highway",
  city:        "Andheri East, Mumbai",
  region:      "Maharashtra",
  postalCode:  "400069",
  country:     "IN",
  openingHours:"Mon–Sat 09:00–19:00",
  geo:         { lat: 19.118, lng: 72.866 },
  socials: [
    { platform: "linkedin", url: "https://www.linkedin.com/company/algoritham-infrastructure" },
    { platform: "twitter",  url: "https://twitter.com/algoritham" },
    { platform: "facebook", url: "https://www.facebook.com/algoritham" },
    { platform: "whatsapp", url: "https://wa.me/919594267666" },
  ],
  uptimeSLA:           "99.99%",
  yearsInBusiness:     "15+",
  carriers:            "40+",
  projectsDelivered:   "1200+",
};

export const NAVIGATION_DEFAULT: Navigation = {
  primary: [
    {
      label: "Services", href: "/services",
      children: [
        { label: "Infrastructure",     href: "/services#infrastructure" },
        { label: "Cloud Solutions",    href: "/services#cloud"          },
        { label: "Cybersecurity",      href: "/services#security"       },
        { label: "Networking",         href: "/services#networking"     },
        { label: "Telecom",            href: "/services#telecom"        },
        { label: "System Integration", href: "/services#integration"    },
      ],
    },
    { label: "Industries",       href: "/industries"      },
    { label: "Case Studies",     href: "/case-studies"    },
    { label: "About",            href: "/about"           },
    { label: "Mission & Vision", href: "/mission-vision"  },
    { label: "Contact",          href: "/contact"         },
  ],
  ctaLabel: "Free Assessment",
  ctaHref:  "/contact",
};

export const FOOTER_DEFAULT: Footer = {
  tagline: "End-to-end IT managed services for enterprises across India. Established 2009 — and still building.",
  newsletterTitle: "IT operations insights, every month.",
  newsletterCopy:  "Cybersecurity advisories, uptime stats, and infrastructure case studies. No fluff, no spam.",
  showNewsletter:  true,
  columns: [
    { heading: "Services",   items: [
      { label: "Infrastructure",     href: "/services#infrastructure" },
      { label: "Cloud Solutions",    href: "/services#cloud" },
      { label: "Cybersecurity",      href: "/services#security" },
      { label: "Networking",         href: "/services#networking" },
      { label: "Telecom",            href: "/services#telecom" },
      { label: "System Integration", href: "/services#integration" },
    ]},
    { heading: "Industries", items: [
      { label: "Healthcare",         href: "/industries#healthcare" },
      { label: "Financial Services", href: "/industries#financial" },
      { label: "Manufacturing",      href: "/industries#manufacturing" },
      { label: "Transportation",     href: "/industries#transportation" },
      { label: "Energy",             href: "/industries#energy" },
      { label: "Government",         href: "/industries#government" },
    ]},
    { heading: "Company",    items: [
      { label: "About Us",         href: "/about" },
      { label: "Mission & Vision", href: "/mission-vision" },
      { label: "Case Studies",     href: "/case-studies" },
      { label: "Events",           href: "/#events" },
    ]},
    { heading: "Legal",      items: [
      { label: "Privacy Policy",     href: "/legal/privacy" },
      { label: "Terms of Service",   href: "/legal/terms"   },
      { label: "Refund Policy",      href: "/legal/refund"  },
    ]},
  ],
  copyrightSuffix: "Crafted with care in Mumbai",
};

export const HOME_DEFAULT: Home = {
  // Aceternity-inspired hero. Layout: HoverBorderGradient pill badge →
  // two-line headline (line 1 plain bold, line 2 gradient sweep) → single
  // description line → two CTAs → trust-signal strip.
  heroEyebrow:           "Est. 2009 · 1200+ Enterprise Projects · Mumbai HQ",
  heroHeadlinePre:       "Algoritham Infrastructure.",
  heroHeadlineGradient:  "Built to last.",
  heroHeadlinePost:      "",
  heroBrandLine:         "Mumbai's national IT integrator. End-to-end managed services for servers, cloud, security, networking, and telecom — for Indian enterprises since 2009.",
  heroSubhead:           "",
  heroPrimaryCta:   { label: "Get Free IT Assessment", href: "/contact",            variant: "primary"   },
  heroSecondaryCta: { label: "Talk to Princy",         href: "tel:+919594267666",   variant: "secondary" },
  heroBadges: [
    { icon: "Award",       label: "ISO 9001 Certified",   color: "purple" },
    { icon: "ShieldCheck", label: "ITIL Aligned",          color: "rose"   },
    { icon: "Activity",    label: "{uptime} Uptime SLA",   color: "cyan"   },
    { icon: "Layers",      label: "1200+ Projects",        color: "purple" },
  ],
  trustBarHeading:     "Trusted by leading enterprises across India",
  servicesEyebrow:     "What We Do",
  servicesHeadline:    "Everything your IT needs. Nothing it doesn't.",
  servicesSubhead:     "One partner across your entire technology stack — from the server room to the cloud edge.",
  howEyebrow:          "How It Works",
  howHeadline:         "Three steps. Infinite uptime.",
  howSubhead:          "From initial audit to fully managed infrastructure — we take ownership end-to-end.",
  caseStudiesEyebrow:  "Case Studies",
  caseStudiesHeadline: "Results our clients can measure.",
  testimonialsEyebrow:  "Client Feedback",
  testimonialsHeadline: "What our clients say.",
  eventsEyebrow:       "Events & Team Moments",
  eventsHeadline:      "Behind every project, a team that shows up.",
  eventsSubhead:       "Glimpses from training sessions, customer awareness meets, and partnership events with 3Gen Data Systems and friends.",
  certsEyebrow:        "Trust & Compliance",
  certsHeadline:       "Trust is non-negotiable.",
  certsSubhead:        "Enterprise-grade compliance isn't a checkbox. It's built into every layer of our service delivery.",
  ctaEyebrow:          "Get Started",
  ctaHeadline:         "Ready to modernize your IT infrastructure?",
  ctaSubhead:          "Join enterprises across India that trust Algoritham as their complete IT partner. Start with a free audit — no commitment required.",
  ctaPrimary:   { label: "Get Free IT Assessment", href: "/contact",          variant: "primary"   },
  ctaSecondary: { label: "Call Us Now",            href: "tel:+919594267666", variant: "secondary" },
};

export const SERVICES_DEFAULT: Service[] = [
  { num: "01", title: "Infrastructure", tagline: "The foundation your business runs on.", icon: "Server",  accent: "rose",   slug: { current: "infrastructure" },
    summary: "Enterprise servers, data center suites, and 24/7 managed infrastructure. x86, Blade, and Hyper-Converged solutions from leading OEMs.",
    detail:  "We design, deploy, and manage enterprise-grade IT infrastructure tailored to your workload. From single-CPU workstations to enterprise multi-CPU servers, our certified engineers ensure your systems are reliable, scalable, and secure 24/7.",
    tags:   ["Servers", "Data Center", "Virtualization", "Storage"],
    points: [
      "x86, Power, Blade, and Hyper-Converged server solutions",
      "Dedicated data center suites with high uptime SLAs",
      "Storage: SAN/NAS setup, clustering, failover, performance tuning",
      "Virtualization: server and desktop environments",
      "High-availability clustering — no single point of failure",
      "Enterprise OEMs: IBM, Lenovo, HP, Dell",
    ],
    brands: ["IBM", "Lenovo", "HP", "Dell"],
    metric: { value: "99.99%", label: "Uptime SLA" } },
  { num: "02", title: "Cloud Solutions", tagline: "Move fast. Scale freely. Pay for what you use.", icon: "Cloud", accent: "violet", slug: { current: "cloud" },
    summary: "IaaS, PaaS, and SaaS deployment and management. Architect, migrate, and run cloud workloads without large capital outlays.",
    detail:  "Avoid large capital outlays and let us architect, migrate, and manage your cloud workloads. Whether you need IaaS, PaaS, or SaaS — we handle the complexity so you focus on your business.",
    tags:   ["IaaS", "PaaS", "SaaS", "Cloud Migration"],
    points: [
      "Infrastructure as a Service (IaaS) deployment",
      "Platform and Software as a Service delivery",
      "Cloud migration strategy and execution",
      "Cost optimization and right-sizing",
      "Multi-cloud and hybrid cloud architecture",
      "AWS, Azure, Google Cloud — vendor neutral",
    ],
    brands: ["AWS", "Azure", "Google Cloud", "VMware"],
    metric: { value: "30–70%", label: "Cost saved" } },
  { num: "03", title: "Cybersecurity", tagline: "Comprehensive protection. Zero-trust by design.", icon: "Shield", accent: "cyan", slug: { current: "security" },
    summary: "FortiGate UTM, IPS, Web Filtering, Application Control, and FortiGuard subscription services. Zero-trust architecture across your full estate.",
    detail:  "We deploy and manage a comprehensive security framework that protects against internal and external threats across your entire IT estate — without adding unnecessary complexity.",
    tags:   ["FortiGate", "UTM", "Zero-Trust", "Compliance"],
    points: [
      "FortiGate UTM Bundle — complete threat protection",
      "IPS & Antivirus with FortiGuard real-time intelligence",
      "Web Filtering and Application Control",
      "End-to-end encryption (AES-256 at rest, TLS 1.3 in transit)",
      "Zero-trust architecture — every request authenticated",
      "Security audits and compliance reporting",
    ],
    brands: ["Fortinet", "Symantec", "McAfee", "Trend Micro"],
    metric: { value: "0", label: "Trust default" } },
  { num: "04", title: "Networking", tagline: "Reliable, secure, always-on connectivity.", icon: "Network", accent: "blue", slug: { current: "networking" },
    summary: "Proactive management of firewalls, routers, switches, and security gateways. Threshold alerts, error tracking, and uninterrupted access always.",
    detail:  "A well-managed IT network helps your business control costs, accelerate growth, ensure scalability, and mitigate risks. We provide proactive management across your full network estate.",
    tags:   ["Firewalls", "LAN/WAN", "MPLS", "SD-WAN"],
    points: [
      "Proactive management of firewalls, routers, and switches",
      "Device and resource utilization monitoring",
      "Error tracking and threshold alerts",
      "VLAN, LACP, trunking, and performance optimization",
      "MPLS and SD-WAN for multi-site private networks",
      "24/7 NOC with passive and active monitoring",
    ],
    brands: ["HP", "Juniper", "Fortinet", "Ubiquiti"],
    metric: { value: "<15m", label: "MTTR" } },
  { num: "05", title: "Telecom", tagline: "30–70% savings. 40+ carriers. One partner.", icon: "Radio", accent: "pink", slug: { current: "telecom" },
    summary: "30–70% savings negotiated across 40+ carriers. Hosted PBX, SIP, T1, Ethernet, MPLS, VOIP, and high-speed circuits — one partner for all connectivity.",
    detail:  "We negotiate on your behalf across a network of 40+ carriers to guarantee the lowest prices. From voice to high-speed data circuits — all your connectivity needs through a single point of contact.",
    tags:   ["Hosted PBX", "SIP", "MPLS", "VOIP"],
    points: [
      "Hosted PBX — cloud-based phone system, no hardware costs",
      "SIP trunks for PBX-compatible systems",
      "Voice T1 with up to 24 lines and PRI capabilities",
      "Internet T1, bonded T1 up to 12 Mbps",
      "Business Ethernet — symmetrical up to 135 Mbps",
      "MPLS, VOIP, DS3/OC3/OC12/OC48 enterprise circuits",
      "Colocation services",
    ],
    brands: ["40+ Carriers"],
    metric: { value: "40+", label: "Carriers" } },
  { num: "06", title: "System Integration", tagline: "One coherent IT environment. No silos.", icon: "GitMerge", accent: "violet", slug: { current: "integration" },
    summary: "Embedding new IT systems into existing environments. ISO 9001 and ITIL-certified engineers across Microsoft, IBM, and HP stacks.",
    detail:  "We embed new IT systems into your existing environment — whether that's within your organisation or across multiple entities. ISO 9001 and ITIL processes ensure consistent, auditable delivery.",
    tags:   ["ISO 9001", "ITIL", "FMS", "ERP"],
    points: [
      "In-house and cross-organisational integration",
      "Facility Management Services (FMS)",
      "Data center migration and Active Directory implementation",
      "Consultation and project management",
      "Corporate governance and IT policy frameworks",
      "ISO 9001 · ITIL certified delivery teams",
    ],
    brands: ["Microsoft", "IBM", "HP", "Fortinet"],
    metric: { value: "ITIL", label: "Aligned" } },
];

export const HOW_STEPS_DEFAULT: HowItWorksStep[] = [
  { num: "01", icon: "Search",  title: "Assess",           subtitle: "Free IT Environment Audit", desc: "Certified engineers review your infrastructure — servers, network, security posture, and cloud footprint. We identify gaps, risks, and optimization opportunities.", detail: "2–3 business days", accent: "rose" },
  { num: "02", icon: "PenTool", title: "Design",           subtitle: "Custom Strategy Session",   desc: "We design a tailored IT roadmap built around your business goals. Vendor selection, cost modelling, and phased rollout — no generic templates.", detail: "Aligned to your timeline", accent: "violet" },
  { num: "03", icon: "Rocket",  title: "Deploy & Manage",  subtitle: "Implementation + 24/7 Support", desc: "Dedicated teams handle installation, configuration, and go-live. Post-deployment: proactive monitoring, maintenance, and round-the-clock helpdesk.", detail: "99.99% Uptime SLA", accent: "cyan" },
];

export const INFRASTRUCTURE_FEATURES_DEFAULT: InfrastructureFeature[] = [
  // ── Hypervisor & Virtualization (compute / software stack) ────
  { category: "hypervisor", icon: "HardDrive",   accent: "cyan",   title: "Server & Desktop Virtualization", desc: "Hypervisor-grade VMware, Hyper-V & Citrix workloads — production-tested at scale.", stat: "3",     statLabel: "Hypervisors" },
  { category: "hypervisor", icon: "Layers",      accent: "violet", title: "HA Clustering",                   desc: "No single point of failure across compute, storage & network.",                      stat: "N+1",   statLabel: "Redundancy" },
  { category: "hypervisor", icon: "Cpu",         accent: "rose",   title: "Enterprise OEMs",                 desc: "IBM · Lenovo · HP · Dell — vendor-neutral architecture for any workload.",            stat: "4+",    statLabel: "OEMs" },
  // ── Facility & Operations (physical + monitoring) ─────────────
  { category: "facility",   icon: "ShieldCheck", accent: "violet", title: "Tier 3+ Power & Cooling",         desc: "Redundant UPS, N+1 cooling, 100% SLA on environment & access control.",               stat: "100%",  statLabel: "Power SLA" },
  { category: "facility",   icon: "Eye",         accent: "cyan",   title: "24/7 On-Site Security",           desc: "Mantraps, biometric screening, CCTV, security guards.",                              stat: "24/7",  statLabel: "Manned" },
  { category: "facility",   icon: "Activity",    accent: "rose",   title: "Round-the-Clock NOC",             desc: "Passive + active monitoring with sub-15-minute mean response.",                      stat: "<15m",  statLabel: "MTTR" },
];

export const COVERAGE_DEFAULT: CoverageNode[] = [
  { city: "Mumbai",     x: 222, y: 595, primary: true, carriers: 12, pop: "HQ + Primary DC" },
  { city: "Delhi NCR",  x: 350, y: 280,                carriers: 9,  pop: "North hub" },
  { city: "Bengaluru",  x: 348, y: 778,                carriers: 8,  pop: "Tech corridor" },
  { city: "Chennai",    x: 432, y: 768,                carriers: 7,  pop: "South coast" },
  { city: "Pune",       x: 258, y: 615,                carriers: 6,  pop: "West edge" },
  { city: "Hyderabad",  x: 400, y: 646,                carriers: 6,  pop: "Central south" },
  { city: "Kolkata",    x: 648, y: 498,                carriers: 7,  pop: "East gateway" },
  { city: "Ahmedabad",  x: 222, y: 490,                carriers: 5,  pop: "Gujarat" },
];

export const CASE_STUDIES_DEFAULT: CaseStudy[] = [
  { num: "01", industry: "Financial Services", client: "A Leading Investment Group",   featured: true,
    challenge: "Legacy on-premise infrastructure unable to scale with growing transaction volumes and strict compliance demands from regulators.",
    solution:  "We designed a hybrid cloud architecture with dedicated on-premise servers for sensitive data and AWS cloud for scalable workloads. Implemented FortiGate firewall policies, MPLS backbone, and a centralized NOC.",
    outcome:   "99.99% uptime achieved within 3 months. Compliance audit passed. 35% reduction in infrastructure OpEx.",
    metrics: [{ value: "99.99%", label: "Uptime" }, { value: "35%", label: "OpEx Savings" }, { value: "3 months", label: "Deployment" }],
    tags: ["Cloud Migration", "Disaster Recovery", "FortiGate", "Compliance"] },
  { num: "02", industry: "Financial Services", client: "Giant in Financial Services Sector", featured: true,
    challenge: "Fragmented IT estate across 12 offices with no centralized monitoring, inconsistent security policies, and frequent network outages disrupting trading operations.",
    solution:  "Deployed MPLS backbone connecting all offices, unified FortiGate UTM security layer across all sites, and set up a 24/7 NOC with passive and active monitoring. Migrated on-premise Exchange to Microsoft 365.",
    outcome:   "Network outages reduced to zero. Unified security posture across all 12 locations. IT team headcount reduced by 2 FTEs through managed services.",
    metrics: [{ value: "0", label: "Outages" }, { value: "12", label: "Sites covered" }, { value: "2", label: "FTE savings" }],
    tags: ["MPLS", "FortiGate", "NOC", "Microsoft 365"] },
  { num: "03", industry: "E-commerce", client: "Reputed Online Shopping Channel", featured: true,
    challenge: "Peak-season infrastructure failures causing revenue loss and customer attrition during high-traffic sale events.",
    solution:  "Implemented auto-scaling IaaS on AWS with load balancers, CDN configuration, and database read replicas. Set up real-time capacity monitoring with auto-trigger thresholds.",
    outcome:   "Zero downtime across next three major sale events. Peak concurrent users handled: 3x previous capacity. Customer complaints down 90%.",
    metrics: [{ value: "Zero", label: "Downtime" }, { value: "3×", label: "Traffic capacity" }, { value: "−90%", label: "Complaints" }],
    tags: ["IaaS", "Auto-scaling", "AWS", "Load Balancing"] },
  { num: "04", industry: "Technology", client: "Oracle Database on AWS", featured: true,
    challenge: "Oracle licensing complexity combined with high AWS infrastructure costs and degraded query performance as data volumes grew.",
    solution:  "Conducted a full license audit, right-sized EC2 instances to match actual workload, enabled Reserved Instances for predictable workloads, and optimised Oracle configuration for AWS storage.",
    outcome:   "40% reduction in monthly cloud spend. Query performance improved by 60%. License compliance achieved with no over-provisioning.",
    metrics: [{ value: "−40%", label: "Cloud spend" }, { value: "+60%", label: "Query speed" }, { value: "6 weeks", label: "Timeline" }],
    tags: ["Oracle", "AWS", "License Optimization", "Cost Reduction"] },
];

export const TESTIMONIALS_DEFAULT: Testimonial[] = [
  { quote: "We came in expecting a vendor and ended up with a partner. Algoritham now manages our entire NOC, and our uptime numbers speak for themselves.", name: "Satish R.",       role: "IT Director",        company: "GoodRich" },
  { quote: "The telecom audit alone paid for the engagement three times over. They renegotiated circuits across 14 sites and we never lost a day of connectivity.", name: "Manoj Shinde",      role: "Head of IT",         company: "Neo Nich" },
  { quote: "Our cloud migration was the smoothest project I've run in 12 years. Zero data loss, zero unplanned downtime, and the cutover happened on a Sunday night exactly as planned.", name: "Sachin Mestry",     role: "VP Engineering",     company: "CCI Group" },
  { quote: "When ransomware hit a sister company, ours stayed clean — because Algoritham had already segmented us, hardened FortiGate, and patched on a tight cycle.", name: "Rohin Patel",       role: "CISO",               company: "BFSI Conglomerate" },
  { quote: "They took complete ownership of a multi-site rollout across six hospitals. Critical-care systems didn't blink. That's the level of accountability healthcare needs.", name: "Priya Menon",       role: "Director of Operations", company: "Multi-Specialty Hospital Network" },
  { quote: "Year-end audit was painless. Every change, every patch, every access grant — fully logged in ITIL-aligned tickets. The auditors actually complimented our records.", name: "Vikram Iyer",       role: "CTO",                company: "Manufacturing Major" },
  { quote: "We trimmed 32% off our IT OpEx in the first year with no headcount change and no service degradation. Their right-sizing analysis was forensic.", name: "Anjali Deshmukh",  role: "CFO",                company: "Logistics & Distribution" },
  { quote: "Disaster recovery used to be a slide in a deck. Now it's a tested, documented playbook with RPO under 15 minutes for our core systems.", name: "Karan Mehta",       role: "Head of Infrastructure", company: "Insurance Group" },
  { quote: "Their helpdesk genuinely feels in-house. Tickets are picked up within minutes, engineers know our environment by name, and we never get bounced between L1 and L2.", name: "Shalini Rao",       role: "Operations Manager", company: "Retail Chain" },
  { quote: "Algoritham helped us go from a fragmented mess of office IT to a single MPLS-backed, monitored estate. Quarterly board reporting on IT is now a five-minute slide.", name: "Devansh Kapoor",    role: "Group CIO",          company: "Hospitality Group" },
];

export const PARTNERS_DEFAULT: Partner[] = [
  { name: "Microsoft",     designation: "Authorized Partner", logoKey: "Microsoft" },
  { name: "Fortinet",      designation: "Security Partner",   logoKey: "Fortinet"  },
  { name: "Dell EMC",      designation: "Storage Partner",    logoKey: "Dell"      },
  { name: "HP Enterprise", designation: "Server Partner",     logoKey: "HPE"       },
  { name: "VMware",        designation: "Virtualization",     logoKey: "VMware"    },
  { name: "AWS",           designation: "Cloud Practice",     logoKey: "AWS"       },
  { name: "IBM",           designation: "Enterprise Partner", logoKey: "IBM"       },
];

// Expanded list — editors can replace with real client names via Studio.
// Marquee/scroller handles 50+ entries comfortably.
export const CLIENTS_DEFAULT: Client[] = [
  { name: "GoodRich" }, { name: "Neo Nich" }, { name: "CCI Group" },
  { name: "A Leading Investment Group" }, { name: "Financial Services Giant" },
  { name: "Reputed Online Shopping Channel" }, { name: "Oracle Database on AWS" },
  { name: "Multi-Specialty Hospital Network" }, { name: "BFSI Conglomerate" },
  { name: "Manufacturing Major" }, { name: "Logistics & Distribution" },
  { name: "Insurance Group" }, { name: "Retail Chain" }, { name: "Hospitality Group" },
  { name: "Western India Distributor" }, { name: "Mumbai Pharma Major" },
  { name: "South India Logistics" }, { name: "Banking Cooperative" },
  { name: "Healthcare Trust" }, { name: "Mid-cap FMCG" }, { name: "EPC Contractor" },
  { name: "Education Group" }, { name: "Real Estate Developer" },
  { name: "Government Department" }, { name: "Energy Major" }, { name: "Aviation MRO" },
  { name: "Media House" }, { name: "Capital Markets Firm" }, { name: "Public Sector Utility" },
  { name: "Telecom Carrier" }, { name: "Co-operative Bank" }, { name: "Stock Brokerage" },
  { name: "Construction Conglomerate" }, { name: "Agro-Processing Giant" },
  { name: "Cement Producer" }, { name: "Specialty Chemicals" }, { name: "Auto-Components" },
  { name: "K-12 Education Network" }, { name: "Higher Education Trust" },
  { name: "Charity Foundation" }, { name: "Co-working Operator" }, { name: "Logistics Tech Firm" },
  { name: "Last-Mile Delivery" }, { name: "Hotel Chain" }, { name: "QSR Brand" },
  { name: "Luxury Retail" }, { name: "Beauty & Wellness Group" }, { name: "Apparel House" },
  { name: "BPO Services" }, { name: "Shared Services Centre" }, { name: "ITES Major" },
  { name: "Captive Finance Arm" }, { name: "NBFC" }, { name: "Asset Management Co" },
];

export const CERTIFICATIONS_DEFAULT: Certification[] = [
  { icon: "Award",        title: "ISO 9001 Certified",  desc: "Quality management systems ensuring consistent, auditable processes across all service delivery." },
  { icon: "ShieldCheck",  title: "ITIL Framework",      desc: "IT Infrastructure Library best practices for incident, change, and service management." },
  { icon: "Lock",         title: "Fortinet Authorized", desc: "Certified to deploy, configure, and manage FortiGate firewalls and FortiGuard security services." },
  { icon: "CheckCircle2", title: "Microsoft Partner",   desc: "Volume Licensing, Microsoft 365, Azure, and SQL Server — authorized reseller and support partner." },
];

export const INDUSTRIES_DEFAULT: Industry[] = [
  { slug: { current: "healthcare" },     title: "Healthcare",                  icon: "Heart",       accent: "rose",   desc: "Complete IT support for hospitals and healthcare facilities. EHR management, HIPAA-compliant infrastructure, and round-the-clock monitoring for critical care environments.", services: ["EHR management", "HIPAA compliance", "Remote Monitoring", "24×7 Help Desk"], stat: { value: "12+", label: "Hospitals served" } },
  { slug: { current: "financial" },      title: "Financial Services",          icon: "TrendingUp",  accent: "violet", desc: "Investment banking, brokerage, mortgage, banking. Data protection and disaster recovery expertise that keeps financial operations running without interruption.", services: ["Data storage", "Disaster recovery", "IT audit support", "Regulatory compliance"], stat: { value: "8+", label: "Banks & brokers" } },
  { slug: { current: "manufacturing" },  title: "Manufacturing & Distribution",icon: "Factory",     accent: "blue",   desc: "Improved reliability and reduced IT operating costs through managed cloud storage, Exchange Hosting, ERP integration, and robust network infrastructure.", services: ["Managed Cloud Storage", "Exchange Hosting", "ERP integration", "Network reliability"], stat: { value: "20+", label: "Plants connected" } },
  { slug: { current: "transportation" }, title: "Transportation",              icon: "Truck",       accent: "cyan",   desc: "Solutions addressing industry evolution and business challenges for carriers and logistics providers — fleet connectivity, IoT, and 24×7 support.", services: ["Fleet connectivity", "Route optimization IT", "IoT infrastructure", "24×7 support"], stat: { value: "5+", label: "Logistics co's" } },
  { slug: { current: "government" },     title: "Government & Municipal",      icon: "Building2",   accent: "violet", desc: "20+ years serving government bodies. Familiar with public-sector IT issues and budget cycles, with established references available for procurement teams.", services: ["Government IT support", "Budget cycle alignment", "Compliance", "Helpdesk"], stat: { value: "20yr", label: "Public sector" } },
  { slug: { current: "consumer" },       title: "Consumer Products",           icon: "ShoppingBag", accent: "pink",   desc: "Managed IT infrastructure hosting and management so internal IT staff can stay focused on business objectives, not day-to-day infrastructure maintenance.", services: ["Managed IT hosting", "Cloud infrastructure", "Helpdesk", "Scalable networking"], stat: { value: "30+", label: "Brands hosted" } },
  { slug: { current: "startups" },       title: "Start-ups",                   icon: "Lightbulb",   accent: "orange", desc: "Flexible, scalable IT management tailored to growth-stage companies. We reduce capital expenditure with award-winning solutions that scale with your headcount.", services: ["Flexible IT management", "Low CapEx solutions", "Scalable infrastructure", "Helpdesk"], stat: { value: "Low", label: "CapEx model" } },
  { slug: { current: "entertainment" },  title: "Entertainment",               icon: "Film",        accent: "rose",   desc: "Technology platform management, security, application development, and disaster recovery — maximising system performance for business growth.", services: ["Platform management", "Security", "App development", "Disaster recovery"], stat: { value: "100%", label: "Show-time SLA" } },
  { slug: { current: "energy" },         title: "Energy",                      icon: "Zap",         accent: "cyan",   desc: "Wind, solar, oil & gas. Managed cloud hosting, remote monitoring, and 24×7 helpdesk tailored to the unique demands of energy infrastructure.", services: ["Managed Cloud Hosting", "Remote Monitoring", "24×7 Help Desk", "SCADA support"], stat: { value: "24/7", label: "SCADA ops" } },
  { slug: { current: "technology" },     title: "Technology Companies",        icon: "Cpu",         accent: "blue",   desc: "IT infrastructure management for technology companies so they can focus on their core product — not the hardware and connectivity that supports it.", services: ["IT infrastructure management", "Cost optimization", "Cloud", "Security"], stat: { value: "Build", label: "Faster" } },
];

export const EVENT_PHOTOS_DEFAULT: EventPhoto[] = [
  // 2026 events — first because they're freshest
  { caption: "RNR Event 2026",                 alt: "Algoritham Infrastructure RNR Event 2026 — employees holding recognition certificates and trophies", span: "row-span-2" },
  { caption: "Adobe Immersion 2026",            alt: "Algoritham × Ingram Micro × Adobe Immersion Event 2026 — full team group photo",                   span: ""           },
  { caption: "Adobe AI Platform Briefing",      alt: "Adobe AI Platform briefing session in Algoritham boardroom — attendees viewing presentation",       span: ""           },
  { caption: "Adobe AI Platform Deep-Dive",     alt: "Wider view of Adobe AI Platform deep-dive session at Algoritham — conference table with team",     span: "row-span-2" },
  { caption: "Algoritham Team — Adobe 2026",    alt: "Algoritham team group photo at Adobe Immersion 2026 with 'Motivation On / Dedication On' wall",     span: ""           },
  // Earlier archive
  { caption: "Customer Awareness Training",     alt: "3Gen Data Systems Training Event — group photo",  span: "" },
  { caption: "Technical Training Sessions",     alt: "Technical Training Session collage",              span: "" },
  { caption: "Partnership Meet — Crimson",      alt: "Crimson 1&3 — partnership team photos",           span: "" },
  { caption: "Team Day & Workshop",             alt: "Team training and group photo",                   span: "" },
  { caption: "Customer Engagement Session",     alt: "Audience at training event",                      span: "" },
  { caption: "Technical Knowledge Transfer",    alt: "Training session collage",                        span: "" },
];

export const ABOUT_DEFAULT: AboutPage = {
  eyebrow: "About Us",
  headlinePre: "We love what",
  headlineGradient: "we do.",
  stats: [
    { value: "2009",  label: "Year Founded" },
    { value: "15+",   label: "Years of Operations" },
    { value: "1200+", label: "Projects Delivered" },
    { value: "40+",   label: "Telecom Carriers" },
  ],
  valuesHeadline: "What drives us.",
  values: [
    { icon: "Target", title: "Client-First",      desc: "Every solution is designed around your specific business needs — not a generic template." },
    { icon: "Award",  title: "Certified Experts", desc: "Our engineers are certified on the platforms they manage. No generalists on critical systems." },
    { icon: "Clock",  title: "24/7 Commitment",   desc: "We monitor and manage your infrastructure round the clock. Issues resolved before you notice them." },
    { icon: "Users",  title: "True Partnership",  desc: "We function as your complete IT department or as an extension of your in-house team." },
  ],
  journeyEyebrow:  "Our Journey",
  journeyHeadline: "15 years. Still building.",
  milestones: [
    { year: "2009", title: "Founded in Mumbai",          body: "Started as a small technology integrator with a single mission: be the most reliable IT partner for Indian enterprises. First office in Andheri East, three engineers, one customer.", tags: ["Mumbai HQ", "First customer", "Andheri East"],     stat: { value: "1", label: "Office" } },
    { year: "2011", title: "ISO 9001 Certified",         body: "Achieved ISO 9001 certification for quality management — every service delivery process audited, documented, and aligned with international standards.", tags: ["ISO 9001", "Quality Management", "Audited Processes"] },
    { year: "2013", title: "National Footprint",         body: "Expanded managed services to five major Indian cities. Built our first national NOC framework and started running 24/7 monitoring for clients across multiple time zones.", tags: ["5 Cities", "24/7 NOC", "Multi-region"],            stat: { value: "5",   label: "Cities live" } },
    { year: "2015", title: "Fortinet Authorized Partner",body: "Became authorized to deploy and manage Fortinet's full security stack — FortiGate firewalls, IPS, web filtering, application control, FortiGuard subscription services.",  tags: ["FortiGate", "UTM", "FortiGuard", "Zero-Trust"] },
    { year: "2018", title: "Cloud Practice Launched",    body: "Stood up dedicated cloud architects and engineers. Started delivering IaaS, PaaS, and SaaS workloads end-to-end across AWS and Azure — design, migration, and 24/7 operations.", tags: ["IaaS", "PaaS", "SaaS", "AWS", "Azure"] },
    { year: "2020", title: "40+ Telecom Carriers",       body: "Built India's most diverse single-vendor circuit catalogue. MPLS, ILL, broadband, voice, hosted PBX, SD-WAN — negotiated 30–70% cost savings for clients across 40+ providers.",  tags: ["MPLS", "ILL", "SD-WAN", "Hosted PBX"],          stat: { value: "40+", label: "Carriers" } },
    { year: "2023", title: "1200+ Enterprise Projects",  body: "Crossed 1200 enterprise project deliveries — from Fortune-listed financial services migrations to greenfield manufacturing rollouts. 99.99% uptime maintained across the managed estate.", tags: ["Enterprise", "99.99% Uptime", "Managed Services"], stat: { value: "1200+", label: "Projects" } },
    { year: "2026", title: "Still Building",             body: "Same values, bigger team. Today we serve enterprises across India with end-to-end IT — and we're investing in next-generation observability, security automation, and AI-assisted operations.", tags: ["AI Ops", "Security Automation", "Next-Gen Observability"], stat: { value: "Today", label: "And growing" } },
  ],
  missionVisionTeaser: "Why we exist, and where we're headed.",
};

export const MISSION_VISION_DEFAULT: MissionVisionPage = {
  eyebrow:           "Mission · Vision · Principles",
  headlinePre:       "Why",
  headlineGradient:  "Algoritham",
  intro:             "When we started in 2009, India's enterprise IT landscape was a stack of half-finished promises — and we built Algoritham to be the answer. Reliable infrastructure. Engineers you can name. Outcomes you can measure. That conviction shapes every line of code, every NOC ticket, every quarterly review.",
  missionEyebrow:    "Our Mission",
  missionHeadline:   "Be the most reliable IT partner for Indian enterprises — measured in uptime, response time, and renewals.",
  missionPillars: [
    { icon: "Target",  title: "Reliability is the product",  desc: "Architect for uptime, operate for uptime, measure for uptime. If a system goes down, the post-mortem becomes a permanent change in how we work." },
    { icon: "Award",   title: "Certified by default",         desc: "Every engineer is platform-certified before they touch your environment. No generalists on critical systems. No exceptions." },
    { icon: "Clock",   title: "Round-the-clock ownership",    desc: "Our NOC monitors and resolves, 24/7. You don't get a queue ticket — you get a named engineer who already knows your topology." },
    { icon: "Users",   title: "True partnership",             desc: "We function as your IT department, or as an extension of one. Either way, we own outcomes — not effort, not invoices, outcomes." },
    { icon: "ShieldCheck", title: "Security is the floor",   desc: "Zero-trust by design. Patch cycles measured in days, not quarters. Audit trails complete enough that auditors compliment them." },
    { icon: "Activity",    title: "Observable, always",      desc: "If we can't see it, we can't promise it. Every managed system has dashboards, alerting, and a runbook before it goes live." },
  ],
  visionEyebrow:     "Our Vision",
  visionHeadline:    "A future where Indian enterprises run on infrastructure that just works — invisible when it does, predictable when it stretches, explainable when it doesn't.",
  visionBody: undefined,
  principlesEyebrow:  "Operating Principles",
  principlesHeadline: "How we actually work.",
  principles: [
    { icon: "Shield",    title: "Security is non-negotiable", desc: "Zero-trust by design. Auditable by default. Patched within SLA." },
    { icon: "Cpu",       title: "Vendor-neutral architecture", desc: "We pick the right tool for the workload — not the one with the best margin." },
    { icon: "Activity",  title: "Observability over hope",     desc: "If we can't see it, we can't promise it. Every system gets dashboards before it gets traffic." },
    { icon: "GitMerge",  title: "Process before heroics",      desc: "ISO 9001 + ITIL aren't badges. They're how we avoid making the same mistake twice." },
    { icon: "Users",     title: "Engineers, not call-centres", desc: "When you call, you reach an engineer who knows your stack — not a triage queue." },
    { icon: "Layers",    title: "Document everything",         desc: "Every change, ticket, and configuration lives in a system the next person on shift can read." },
    { icon: "Sparkles",  title: "Bias to outcomes",            desc: "We track uptime, response time, OpEx delta, and renewals — not hours billed." },
    { icon: "Award",     title: "Continuous learning",         desc: "Every quarter, every engineer renews certifications and runs an incident replay. Always closer to mastery." },
  ],
};

export const SERVICES_PAGE_DEFAULT: ServicesPage = {
  eyebrow: "Our Services",
  headlinePre: "End-to-end IT.",
  headlineGradient: "One partner.",
  subhead: "From the server room to the cloud edge — we manage every layer of your technology stack so nothing falls through the cracks.",
};

export const INDUSTRIES_PAGE_DEFAULT: IndustriesPage = {
  eyebrow: "Industries",
  headlinePre: "We speak your",
  headlineGradient: "industry's language.",
  subhead: "Serving 10 sectors across India with deep domain expertise, sector-specific compliance knowledge, and IT solutions built around your operating model.",
  heroStats: [
    { value: "10",     label: "Sectors served"     },
    { value: "1200+",  label: "Enterprise projects"},
    { value: "15+",    label: "Years operating"    },
    { value: "99.99%", label: "Uptime SLA"         },
  ],
};

export const CASE_STUDIES_PAGE_DEFAULT: CaseStudiesPage = {
  eyebrow: "Case Studies",
  headlinePre: "Results you can",
  headlineGradient: "put a number on.",
  subhead: "Real challenges. Real solutions. Measurable outcomes from enterprises that trusted us with their IT.",
  ctaHeadline: "Want results like these?",
  ctaSubhead:  "Start with a free IT assessment. No commitment required.",
};

export const CONTACT_PAGE_DEFAULT: ContactPage = {
  eyebrow: "Get in touch",
  headlinePre: "Let's talk about",
  headlineGradient: "your IT.",
  subhead: "Free assessment, no commitment. Tell us what you're building — our certified engineers will reach out within 1 business day.",
  detailsHeading: "Direct line to engineers — not a call centre.",
  detailsCopy: "Whether you need a free IT audit, an emergency response, or to talk pricing — we're a phone call away.",
  details: [
    { icon: "Phone",  label: "Call us",      value: PHONE_PRIMARY,        sub: "Princy Gupta · 9594267666", href: "tel:+919594267666"        },
    { icon: "Phone",  label: "Alternate",    value: "+91 99301 81363",    sub: "022-35131125 · landline",  href: "tel:+919930181363"        },
    { icon: "Mail",   label: "Write to us",  value: "info@algoritham.in", sub: "Replies within 1 business day",  href: "mailto:info@algoritham.in" },
    { icon: "MapPin", label: "Office",       value: "Mumbai 400069",      sub: "1102, Chandak Chamber, Andheri E" },
    { icon: "Clock",  label: "Availability", value: "24/7 Managed Ops",   sub: "Mon–Sat 9am–7pm · new enquiries" },
  ],
  mapEmbedUrl: "https://maps.google.com/maps?q=Chandak+Chamber+Andheri+East+Mumbai&output=embed",
  responsePromise: "We respond within 1 business day · No spam, ever.",
};
