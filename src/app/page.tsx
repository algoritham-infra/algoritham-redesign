import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Services } from "@/components/sections/Services";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Infrastructure } from "@/components/sections/Infrastructure";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Testimonials } from "@/components/sections/Testimonials";
import { EventGallery } from "@/components/sections/EventGallery";
import { Certifications } from "@/components/sections/Certifications";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";
import {
  siteSettings, navigation, footer, home, services, howItWorksSteps,
  infrastructureFeatures, coverageNodes, featuredCaseStudies, testimonials,
  partners, clients, oems, certifications, eventPhotos,
} from "@/sanity/content";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [site, page] = await Promise.all([siteSettings(), home()]);
  return buildMetadata({ site, page: page.seo, path: "/" });
}

export default async function HomePage() {
  const [
    site, nav, foot, h,
    servicesData, stepsData, featuresData, coverageData,
    casesData, testimonialsData, partnersData, clientsData, certsData, photosData,
  ] = await Promise.all([
    siteSettings(), navigation(), footer(), home(),
    services(), howItWorksSteps(), infrastructureFeatures(), coverageNodes(),
    featuredCaseStudies(), testimonials(), partners(), clients(), certifications(), eventPhotos(),
  ]);

  return (
    <main className="bg-[var(--bg-base)] min-h-screen">
      <Navbar navigation={nav} site={site} />
      <Hero home={h} uptimeSLA={site.uptimeSLA ?? "99.99%"} site={site} />
      <TrustBar heading={h.trustBarHeading ?? "Trusted by leading enterprises across India"} partners={partnersData} clients={clientsData} oems={oems()} site={site} />
      <Services home={h} services={servicesData} />
      <HowItWorks home={h} steps={stepsData} />
      <Infrastructure site={site} features={featuresData} coverage={coverageData} />
      <CaseStudies home={h} cases={casesData} />
      <Testimonials home={h} items={testimonialsData} />
      <EventGallery home={h} photos={photosData} />
      <Certifications home={h} items={certsData} />
      <CTA home={h} site={site} />
      <Footer footer={foot} site={site} />
    </main>
  );
}
