"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Lock } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const FEATURED = {
  name: "AUra.xx",
  description:
    "A premium hand-painted clothing brand from Lahore. Built a full Next.js storefront with an AI-powered customer support chatbot (Aura Assistant), WhatsApp order integration, and smooth editorial design.",
  tech: ["Next.js", "Tailwind CSS", "OpenAI API", "Vercel"],
  live: "https://theaura-xx.vercel.app/",
};

const PROJECTS = [
  {
    glyph: "☕",
    name: "Brew & Bloom",
    description:
      "Specialty coffee café brand from Lahore. Built an editorial storefront showcasing single-origin beans, artisan roasting philosophy, and an immersive café experience.",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion", "Vercel"],
    live: "https://brew-bloom-seven.vercel.app/",
  },
  {
    glyph: "⚡",
    name: "AApex Training",
    description:
      "Elite remote fitness coaching landing page for serious athletes. High-impact design with training tiers, nutrition guidance, and a conversion-focused layout.",
    tech: ["Next.js", "Tailwind CSS", "Vercel"],
    live: "https://fitness-landing-ten.vercel.app/",
  },
  {
    glyph: "🏋️",
    name: "Sultan Fitness",
    description:
      "Gym and fitness center website for Sultan Fitness. Clean dark aesthetic with service listings and membership call-to-action.",
    tech: ["Next.js", "Tailwind CSS", "Vercel"],
    live: "https://sultan-fitness-web.vercel.app/",
  },
];

// ─── Animation variants ───────────────────────────────────────────────────────

const headerBlock = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const riseUp = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

// ─── Featured card ────────────────────────────────────────────────────────────

function FeaturedCard() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
    >
      <motion.div
        whileHover={{
          y: -5,
          boxShadow: "0 0 48px rgba(99,102,241,0.2), 0 20px 60px rgba(0,0,0,0.5)",
        }}
        className="group relative rounded-2xl border border-white/[0.08] overflow-hidden"
        style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015))" }}
      >
        {/* Hover accent line */}
        <motion.div
          className="absolute top-0 inset-x-0 h-px"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(99,102,241,0.7) 30%, rgba(139,92,246,0.7) 70%, transparent)",
          }}
        />

        {/* Ambient corner glow */}
        <div
          aria-hidden
          className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
            filter: "blur(30px)",
          }}
        />

        {/* Dot-grid texture */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        <div className="relative p-8 sm:p-10">
          {/* Top row */}
          <div className="flex items-start justify-between mb-7">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-black select-none"
                style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.2)" }}
              >
                A
              </div>
              <span
                className="text-[10px] font-mono tracking-[0.2em] uppercase px-2.5 py-1 rounded-full"
                style={{
                  background: "rgba(99,102,241,0.1)",
                  color: "rgba(99,102,241,0.85)",
                  border: "1px solid rgba(99,102,241,0.18)",
                }}
              >
                Featured
              </span>
            </div>

            <motion.a
              href={FEATURED.live}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.06, y: -1 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-1.5 text-[11px] font-mono tracking-wide text-accent/70 hover:text-accent transition-colors duration-200"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live
              <ExternalLink className="w-3 h-3" />
            </motion.a>
          </div>

          {/* Name */}
          <h3
            className="font-black tracking-tight mb-4 leading-none"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
          >
            <span className="text-gradient">AUra</span>
            <span className="text-white/20">.xx</span>
          </h3>

          {/* Description */}
          <p className="text-[15px] sm:text-base leading-[1.85] text-white/45 font-light mb-8 max-w-2xl">
            {FEATURED.description}
          </p>

          {/* Bottom row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="flex flex-wrap gap-2">
              {FEATURED.tech.map((t) => (
                <span
                  key={t}
                  className="text-[11px] font-mono text-white/35 px-3 py-1.5 rounded-lg border border-white/[0.07]"
                  style={{ background: "rgba(255,255,255,0.02)" }}
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-white/20 select-none">
                <Lock className="w-3 h-3" />
                Private
              </span>

              <motion.a
                href={FEATURED.live}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="relative group/btn flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white overflow-hidden"
                style={{ background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)" }}
              >
                <span
                  aria-hidden
                  className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 rounded-xl"
                  style={{ background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)" }}
                />
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                  style={{ boxShadow: "0 0 24px 4px rgba(99,102,241,0.4)" }}
                />
                <ExternalLink className="relative z-10 w-3.5 h-3.5" />
                <span className="relative z-10">Visit Site</span>
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Regular project card ─────────────────────────────────────────────────────

function ProjectCard({
  project,
  delay,
}: {
  project: typeof PROJECTS[number];
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      className="h-full"
    >
      <motion.div
        whileHover={{
          y: -5,
          boxShadow: "0 0 36px rgba(99,102,241,0.15), 0 16px 48px rgba(0,0,0,0.4)",
          borderColor: "rgba(99,102,241,0.2)",
        }}
        className="group relative h-full flex flex-col rounded-2xl border border-white/[0.07] overflow-hidden"
        style={{ background: "rgba(255,255,255,0.02)" }}
      >
        {/* Hover accent line */}
        <motion.div
          className="absolute top-0 inset-x-0 h-px"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(99,102,241,0.6) 40%, rgba(139,92,246,0.6) 60%, transparent)",
          }}
        />

        <div className="relative flex flex-col flex-1 p-6">
          {/* Top row */}
          <div className="flex items-center justify-between mb-5">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl select-none"
              style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.12)" }}
              role="img"
              aria-label={project.name}
            >
              {project.glyph}
            </div>

            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white/25 hover:text-accent border border-white/[0.07] hover:border-accent/25 transition-colors duration-200"
              aria-label={`Visit ${project.name}`}
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </motion.a>
          </div>

          {/* Name */}
          <h3 className="text-base font-bold text-white/85 group-hover:text-white mb-2.5 transition-colors duration-200">
            {project.name}
          </h3>

          {/* Description */}
          <p className="text-[13px] leading-[1.75] text-white/40 font-light mb-5 flex-1">
            {project.description}
          </p>

          {/* Tech tags + live link */}
          <div className="flex items-end justify-between gap-3 mt-auto">
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-[10px] font-mono text-white/25 px-2 py-1 rounded-md border border-white/[0.06]"
                  style={{ background: "rgba(255,255,255,0.015)" }}
                >
                  {t}
                </span>
              ))}
            </div>

            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              className="shrink-0 flex items-center gap-1.5 text-[11px] font-mono text-accent/60 hover:text-accent transition-colors duration-200"
            >
              Live
              <ExternalLink className="w-3 h-3" />
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-28 px-6 overflow-hidden"
    >
      {/* Top divider */}
      <div
        aria-hidden
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)",
        }}
      />

      {/* Ambient glow — right side */}
      <div
        aria-hidden
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-5xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          variants={headerBlock}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="mb-14"
        >
          <motion.p
            variants={riseUp}
            className="text-[11px] font-mono tracking-[0.3em] text-accent/60 uppercase mb-5"
          >
            03 / Projects
          </motion.p>

          <motion.h2
            variants={riseUp}
            className="text-4xl sm:text-5xl font-bold leading-[1.05] tracking-tight mb-5"
          >
            Things I&apos;ve{" "}
            <span className="text-gradient">Built</span>
          </motion.h2>

          <motion.p
            variants={riseUp}
            className="text-[15px] text-white/35 font-light max-w-md"
          >
            Production-ready products shipped for real clients and brands.
          </motion.p>
        </motion.div>

        {/* ── Featured project ── */}
        <div className="mb-5">
          <FeaturedCard />
        </div>

        {/* ── Regular projects grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.name} project={project} delay={0.2 + i * 0.1} />
          ))}
        </div>

      </div>
    </section>
  );
}
