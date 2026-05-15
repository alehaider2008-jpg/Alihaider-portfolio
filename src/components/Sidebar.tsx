"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail } from "lucide-react";

const NAV_LINKS = [
  { label: "About", href: "#about", id: "about" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Contact", href: "#contact", id: "contact" },
];

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

function useActiveSection() {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const handler = () => {
      const scrollY = window.scrollY + 120;
      let current = NAV_LINKS[0].id;
      for (const { id } of NAV_LINKS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) current = id;
      }
      setActive(current);
    };

    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return active;
}

function scrollTo(href: string) {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

// ─── Desktop Sidebar ────────────────────────────────────────────────────────

function DesktopSidebar({ active }: { active: string }) {
  return (
    <motion.aside
      initial={{ x: -30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="hidden md:flex fixed left-0 top-0 bottom-0 w-[240px] flex-col z-40
                 border-r border-white/[0.04] bg-[#0a0a0a]"
    >
      {/* Wordmark */}
      <div className="px-8 pt-10 pb-2">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-left group"
        >
          <p className="text-base font-bold tracking-tight text-white leading-tight group-hover:text-white/90 transition-colors">
            Ali Haider
          </p>
          <p className="text-[11px] font-mono text-white/30 mt-0.5 tracking-wider uppercase">
            AI Specialist
          </p>
        </button>

        {/* Divider */}
        <div className="mt-8 h-px bg-white/[0.06]" />
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-5 pt-4">
        <ul className="space-y-0.5">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.id;
            return (
              <li key={link.id}>
                <button
                  onClick={() => scrollTo(link.href)}
                  className="relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 group"
                >
                  {/* Active pill */}
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 rounded-lg bg-white/[0.05]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}

                  {/* Left accent bar */}
                  <span
                    className="relative z-10 w-0.5 h-4 rounded-full flex-shrink-0 transition-all duration-300"
                    style={{
                      background: isActive
                        ? "linear-gradient(180deg, #6366f1, #8b5cf6)"
                        : "transparent",
                    }}
                  />

                  <span
                    className={`relative z-10 transition-colors duration-200 ${
                      isActive
                        ? "text-white"
                        : "text-white/35 group-hover:text-white/70"
                    }`}
                  >
                    {link.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Social icons */}
      <div className="px-8 pb-10">
        <div className="h-px bg-white/[0.06] mb-6" />
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/alehaider2008-jpg"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-white/25 hover:text-white transition-colors duration-200"
          >
            <GithubIcon />
          </a>
          <a
            href="mailto:ale.haider2008@gmail.com"
            aria-label="Email"
            className="text-white/25 hover:text-white transition-colors duration-200"
          >
            <Mail className="w-[18px] h-[18px]" />
          </a>
        </div>
        <p className="text-[10px] font-mono text-white/15 mt-4 leading-relaxed">
          Lahore, Pakistan
        </p>
      </div>
    </motion.aside>
  );
}

// ─── Mobile top bar ──────────────────────────────────────────────────────────

function MobileNav({ active }: { active: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleLink = (href: string) => {
    setOpen(false);
    setTimeout(() => scrollTo(href), 10);
  };

  return (
    <>
      {/* Top bar */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`md:hidden fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-5 transition-all duration-300 ${
          scrolled || open ? "bg-[#0a0a0a] border-b border-white/[0.06]" : "bg-transparent"
        }`}
      >
        {/* Wordmark */}
        <button
          onClick={() => { setOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="text-left"
        >
          <span className="text-sm font-bold text-white tracking-tight">Ali Haider</span>
          <span className="ml-2 text-[10px] font-mono text-white/30 uppercase tracking-wider">
            AI Specialist
          </span>
        </button>

        {/* Hamburger */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative w-8 h-8 flex items-center justify-center"
        >
          <span
            className={`absolute block h-px w-5 bg-white transition-all duration-300 ease-in-out ${
              open ? "rotate-45" : "-translate-y-1.5"
            }`}
          />
          <span
            className={`absolute block h-px bg-white transition-all duration-300 ease-in-out ${
              open ? "w-0 opacity-0" : "w-5 opacity-100"
            }`}
          />
          <span
            className={`absolute block h-px w-5 bg-white transition-all duration-300 ease-in-out ${
              open ? "-rotate-45" : "translate-y-1.5"
            }`}
          />
        </button>
      </motion.header>

      {/* Dropdown drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden fixed top-14 left-0 right-0 bottom-0 z-40 bg-[#0a0a0a]/98 backdrop-blur-sm flex flex-col px-6 pt-8 pb-10"
          >
            {/* Nav links */}
            <nav className="flex-1">
              <ul className="space-y-1">
                {NAV_LINKS.map((link, i) => {
                  const isActive = active === link.id;
                  return (
                    <motion.li
                      key={link.id}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.25 }}
                    >
                      <button
                        onClick={() => handleLink(link.href)}
                        className={`w-full flex items-center gap-4 py-4 text-left border-b border-white/[0.04] transition-colors duration-200 ${
                          isActive ? "text-white" : "text-white/40 hover:text-white/70"
                        }`}
                      >
                        <span
                          className="w-px h-5 rounded-full flex-shrink-0 transition-all duration-300"
                          style={{
                            background: isActive
                              ? "linear-gradient(180deg, #6366f1, #8b5cf6)"
                              : "transparent",
                          }}
                        />
                        <span className="text-lg font-semibold tracking-tight">{link.label}</span>
                      </button>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            {/* Social + contact at bottom */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-5 pt-6"
            >
              <a
                href="https://github.com/alehaider2008-jpg"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-white/30 hover:text-white transition-colors"
              >
                <GithubIcon />
              </a>
              <a
                href="mailto:ale.haider2008@gmail.com"
                aria-label="Email"
                className="text-white/30 hover:text-white transition-colors"
              >
                <Mail className="w-[18px] h-[18px]" />
              </a>
              <span className="text-[11px] font-mono text-white/15 ml-auto">
                Lahore, PK
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Exports ─────────────────────────────────────────────────────────────────

export default function Sidebar() {
  const active = useActiveSection();
  return (
    <>
      <DesktopSidebar active={active} />
      <MobileNav active={active} />
    </>
  );
}
