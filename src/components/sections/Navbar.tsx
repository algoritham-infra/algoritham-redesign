"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight, Sun, Moon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/ThemeProvider";
import {
  Navbar as ResizableNavbar,
  NavBody,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarButton,
} from "@/components/ui/resizable-navbar";
import type { Navigation, SiteSettings } from "@/sanity/types";

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="w-9 h-9 rounded-full flex items-center justify-center text-[var(--text-2)] hover:text-[var(--text-1)] hover:bg-[var(--bg-card-2)] border border-[var(--border)] transition-all"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "sun" : "moon"}
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0,   opacity: 1, scale: 1   }}
          exit={{    rotate: 90,  opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.2 }}
        >
          {isDark ? <Sun size={15} /> : <Moon size={15} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

type Props = { navigation: Navigation; site: SiteSettings };

function BrandLogo({ site }: { site: SiteSettings }) {
  return (
    <Link href="/" className="relative z-20 flex items-center gap-2.5 px-2 py-1 group shrink-0">
      <Image
        src="/logo.png"
        alt={site.name ?? "Algoritham"}
        width={36} height={36}
        priority
        className="w-9 h-9 object-contain shrink-0 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3"
      />
      <div className="hidden sm:flex flex-col">
        <span className="font-bold text-[14px] text-[var(--text-1)] tracking-tight leading-tight">
          {site.shortName ?? "Algoritham"}
        </span>
        <span className="text-[8.5px] font-medium text-[var(--text-3)] uppercase tracking-widest leading-tight mt-1">
          {site.name?.replace(site.shortName ?? "", "").trim() || "Infrastructure Pvt. Ltd."}
        </span>
      </div>
    </Link>
  );
}

/**
 * Desktop nav row: brand logo + flex-grown link strip + right-side controls.
 * Flex-based layout replaces the prior magic-number absolute positioning,
 * so longer brand text or CTA labels no longer push links off-centre.
 */
function NavLinksRow({
  links, pathname,
}: { links: Navigation["primary"]; pathname: string | null }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href.split("#")[0]);

  return (
    <div
      onMouseLeave={() => { setHovered(null); setOpenDropdown(null); }}
      className="hidden lg:flex flex-1 items-center justify-center gap-0.5"
    >
      {(links ?? []).map((link, idx) => {
        const active = isActive(link.href);
        return (
          <div
            key={link.label}
            className="relative"
            onMouseEnter={() => {
              setHovered(idx);
              if (link.children?.length) setOpenDropdown(link.label);
              else setOpenDropdown(null);
            }}
          >
            <Link
              href={link.href}
              className={cn(
                "relative z-10 flex items-center gap-1 px-4 py-2 text-[13px] font-medium rounded-full transition-colors",
                active ? "text-[var(--text-1)]" : "text-[var(--text-2)] hover:text-[var(--text-1)]",
              )}
            >
              {hovered === idx && (
                <motion.span
                  layoutId="nav-hover-pill"
                  className="absolute inset-0 rounded-full bg-[var(--bg-card-2)] -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {link.label}
              {link.children?.length ? (
                <ChevronDown
                  size={12}
                  className={cn("transition-transform", openDropdown === link.label && "rotate-180")}
                />
              ) : null}
              {active && (
                <motion.span
                  layoutId="nav-active-underline"
                  className="absolute left-4 right-4 -bottom-1 h-0.5 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#06b6d4]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>

            <AnimatePresence>
              {link.children?.length && openDropdown === link.label && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.16 }}
                  className="absolute top-full left-0 mt-2 w-60 bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-1.5 shadow-2xl shadow-black/30 backdrop-blur-xl"
                >
                  {link.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      className="group/dd flex items-center gap-2 px-3.5 py-2.5 text-[13px] text-[var(--text-2)] hover:text-[var(--text-1)] hover:bg-[var(--bg-card-2)] rounded-xl transition-colors"
                    >
                      <span className="w-1 h-1 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] transition-transform group-hover/dd:scale-150" />
                      {child.label}
                      <ArrowRight size={11} className="ml-auto opacity-0 -translate-x-1 group-hover/dd:opacity-100 group-hover/dd:translate-x-0 transition-all text-[var(--accent-violet)]" />
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export function Navbar({ navigation, site }: Props) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const ctaLabel = navigation.ctaLabel ?? "Free Assessment";
  const ctaHref  = navigation.ctaHref  ?? "/contact";

  return (
    <ResizableNavbar>
      <NavBody>
        <div className="flex items-center w-full gap-4">
          <BrandLogo site={site} />
          <NavLinksRow links={navigation.primary} pathname={pathname} />
          <div className="relative z-20 flex items-center gap-2 ml-auto">
            <ThemeToggle />
            <NavbarButton href={ctaHref} variant="gradient">
              {ctaLabel}
              <ArrowRight size={12} />
            </NavbarButton>
          </div>
        </div>
      </NavBody>

      <MobileNav>
        <MobileNavHeader>
          <BrandLogo site={site} />
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <MobileNavToggle isOpen={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)} />
          </div>
        </MobileNavHeader>

        <MobileNavMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)}>
          {(navigation.primary ?? []).map((link, i) => {
            const active = pathname?.startsWith(link.href);
            return (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x:  0 }}
                transition={{ delay: i * 0.04 }}
                className="w-full"
              >
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center justify-between w-full py-3 px-3 rounded-xl text-[15px] font-medium transition-colors",
                    active
                      ? "bg-[var(--accent-violet-bg)] text-[var(--accent-violet)]"
                      : "text-[var(--text-2)] hover:text-[var(--text-1)] hover:bg-[var(--bg-card-2)]",
                  )}
                >
                  <span className="flex items-center gap-2">
                    {active && <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#06b6d4]" />}
                    {link.label}
                  </span>
                  <ArrowRight size={14} className="opacity-40" />
                </Link>
              </motion.div>
            );
          })}
          <Link
            href={ctaHref}
            onClick={() => setMobileOpen(false)}
            className="mt-3 w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-[14px] font-semibold text-white bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] rounded-xl shadow-lg shadow-violet-500/25"
          >
            {ctaLabel}
            <ArrowRight size={14} />
          </Link>
        </MobileNavMenu>
      </MobileNav>
    </ResizableNavbar>
  );
}
