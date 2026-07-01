/**
 * High-level content helpers. Each function fetches from Sanity and
 * falls back to a static default — so every page renders correctly
 * before Studio is populated. Server-only.
 */
import * as Q from "./queries";
import * as D from "./defaults";

export const siteSettings  = async () => (await Q.getSiteSettings())   ?? D.SITE_SETTINGS_DEFAULT;
export const navigation    = async () => (await Q.getNavigation())     ?? D.NAVIGATION_DEFAULT;
export const footer        = async () => (await Q.getFooter())         ?? D.FOOTER_DEFAULT;
export const home          = async () => (await Q.getHome())           ?? D.HOME_DEFAULT;
export const aboutPage     = async () => (await Q.getAboutPage())      ?? D.ABOUT_DEFAULT;
export const servicesPage  = async () => (await Q.getServicesPage())   ?? D.SERVICES_PAGE_DEFAULT;
export const industriesPage= async () => (await Q.getIndustriesPage()) ?? D.INDUSTRIES_PAGE_DEFAULT;
export const caseStudiesPg = async () => (await Q.getCaseStudiesPage())?? D.CASE_STUDIES_PAGE_DEFAULT;
export const contactPage   = async () => (await Q.getContactPage())    ?? D.CONTACT_PAGE_DEFAULT;
export const missionVisionPage = async () => (await Q.getMissionVisionPage()) ?? D.MISSION_VISION_DEFAULT;

const orEmpty = <T,>(arr: T[], fallback: T[]) => (arr.length ? arr : fallback);

export const services       = async () => orEmpty(await Q.getServices(),       D.SERVICES_DEFAULT);
export const howItWorksSteps= async () => orEmpty(await Q.getHowItWorksSteps(),D.HOW_STEPS_DEFAULT);
export const infrastructureFeatures = async () => orEmpty(await Q.getInfrastructureFeatures(), D.INFRASTRUCTURE_FEATURES_DEFAULT);
export const coverageNodes  = async () => orEmpty(await Q.getCoverageNodes(),  D.COVERAGE_DEFAULT);
export const caseStudies    = async () => orEmpty(await Q.getCaseStudies(),    D.CASE_STUDIES_DEFAULT);
export const featuredCaseStudies = async () => orEmpty(await Q.getFeaturedCaseStudies(), D.CASE_STUDIES_DEFAULT);
export const testimonials   = async () => orEmpty(await Q.getTestimonials(),   D.TESTIMONIALS_DEFAULT);
export const partners       = async () => orEmpty(await Q.getPartners(),       D.PARTNERS_DEFAULT);
export const clients        = async () => orEmpty(await Q.getClients(),        D.CLIENTS_DEFAULT);
// OEM roster is a plain string list (no per-item Sanity doc). Edit in defaults
// or promote to a Sanity list document later if the team needs to reorder.
export const oems           = () => D.OEMS_DEFAULT;
export const certifications = async () => orEmpty(await Q.getCertifications(), D.CERTIFICATIONS_DEFAULT);
export const industries     = async () => orEmpty(await Q.getIndustries(),     D.INDUSTRIES_DEFAULT);
export const eventPhotos    = async () => orEmpty(await Q.getEventPhotos(),    D.EVENT_PHOTOS_DEFAULT);
