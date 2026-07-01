"use client";
import { motion } from "framer-motion";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import {
  MicrosoftLogo, FortinetLogo, DellLogo,
  HPELogo, VMwareLogo, AWSLogo, IBMLogo,
} from "@/components/ui/partner-logo";
import type { Partner, Client, SiteSettings } from "@/sanity/types";
import type { ComponentType } from "react";

type Props = {
  heading: string;
  partners: Partner[];
  clients: Client[];
  oems: string[];
  site: SiteSettings;
};

const LOGO_REGISTRY: Record<string, ComponentType<{ className?: string }>> = {
  Microsoft: MicrosoftLogo,
  Fortinet:  FortinetLogo,
  Dell:      DellLogo,
  HPE:       HPELogo,
  VMware:    VMwareLogo,
  AWS:       AWSLogo,
  IBM:       IBMLogo,
};

export function TrustBar({ heading, partners, clients, oems, site }: Props) {
  const partnerLogos = partners.map((p, i) => ({
    id: i + 1,
    name: p.name,
    designation: p.designation ?? "",
    Logo: LOGO_REGISTRY[p.logoKey ?? ""] ?? MicrosoftLogo,
  }));

  const stats = [
    { value: site.yearsInBusiness  ?? "15+",    label: "Years in Business" },
    { value: site.uptimeSLA        ?? "99.99%", label: "Uptime SLA" },
    { value: site.carriers         ?? "40+",    label: "Telecom Carriers" },
    { value: site.projectsDelivered?? "500+",   label: "Projects Delivered" },
  ];

  const tickerNames = clients.map((c) => c.name);

  return (
    <section className="bg-[var(--bg-card)] border-y border-[var(--border)] py-14">
      <div className="max-w-7xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-[11px] font-semibold text-[var(--text-3)] uppercase tracking-widest mb-8"
        >
          {heading}
        </motion.p>

        <div className="flex flex-wrap items-center justify-center mb-10 px-2">
          <AnimatedTooltip items={partnerLogos} />
        </div>

        {/* OEM strip — full alliance roster as branded pill tiles scrolling
            right-to-left. Two copies concatenated for seamless loop. */}
        {oems.length > 0 && (
          <div className="mb-8">
            <p className="text-center text-[10px] font-semibold text-[var(--text-3)] uppercase tracking-widest mb-4 opacity-70">
              Trusted Industry Collaborations
            </p>
            <div className="relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[var(--bg-card)] to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[var(--bg-card)] to-transparent z-10" />
              <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: Math.max(40, oems.length * 1.4), repeat: Infinity, ease: "linear" }}
                className="flex gap-3 whitespace-nowrap"
              >
                {[...oems, ...oems].map((name, i) => (
                  <span
                    key={i}
                    className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[var(--text-2)] bg-[var(--bg-card-2)] border border-[var(--border)] hover:border-[var(--accent-violet-border)] hover:text-[var(--text-1)] transition-colors"
                  >
                    <span className="w-1 h-1 rounded-full bg-[var(--accent-violet)] opacity-60" />
                    {name}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        )}

        {/* Client ticker — real client names scrolling left-to-right (opposite
            direction from OEMs above for visual contrast). Duration scales
            with count so 25+ names stay readable. */}
        <div className="mb-12">
          <p className="text-center text-[10px] font-semibold text-[var(--text-3)] uppercase tracking-widest mb-4 opacity-70">
            Selected Clients
          </p>
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[var(--bg-card)] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[var(--bg-card)] to-transparent z-10" />
            <motion.div
              animate={{ x: ["-50%", "0%"] }}
              transition={{ duration: Math.max(35, tickerNames.length * 1.6), repeat: Infinity, ease: "linear" }}
              className="flex gap-10 whitespace-nowrap"
            >
              {[...tickerNames, ...tickerNames].map((c, i) => (
                <span key={i} className="text-[var(--text-2)] font-bold text-base tracking-wide shrink-0">{c}</span>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(({ value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="text-center"
            >
              <div className="text-3xl font-black text-[var(--text-1)] mb-1 brand-gradient">{value}</div>
              <div className="text-xs font-medium text-[var(--text-3)]">{label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
