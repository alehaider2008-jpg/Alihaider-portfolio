"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ─── Data ─────────────────────────────────────────────────────────────────────

const BIO =
  "I'm Ali Haider, an AI Specialist based in Lahore, Pakistan. I specialize in building AI-powered products — chatbots, automation tools, LLM integrations, and intelligent web apps. My approach is simple: vibe code until it works, then make it beautiful. When I'm not deep in a build, I'm experimenting with the latest in AI and shipping side projects that push what's possible.";

const BADGES = [
  { emoji: "📍", label: "Lahore, PK" },
  { emoji: "🤖", label: "AI Specialist" },
  { emoji: "⚡", label: "Vibe Coder" },
  { emoji: "🚀", label: "Builder" },
];

// ─── Shared animation variants ────────────────────────────────────────────────

const riseUp = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const textBlock = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

// ─── Avatar ───────────────────────────────────────────────────────────────────

function AvatarCircle() {
  return (
    /*
     * Sizing wrapper — all children are absolute so the parent
     * controls the layout footprint.
     */
    <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-60 md:h-60">

      {/* Diffused glow orb behind the circle */}
      <motion.div
        aria-hidden
        className="absolute -inset-6 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.45) 0%, rgba(139,92,246,0.2) 50%, transparent 72%)",
          filter: "blur(28px)",
        }}
        animate={{ opacity: [0.5, 1, 0.5], scale: [0.92, 1.06, 0.92] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Spinning conic-gradient — acts as the animated border */}
      <motion.div
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, #6366f1 100deg, #8b5cf6 180deg, #3b82f6 260deg, transparent 360deg)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
      />

      {/* Faint secondary ring (counter-spins, adds depth) */}
      <motion.div
        aria-hidden
        className="absolute rounded-full"
        style={{
          inset: "6px",
          background:
            "conic-gradient(from 180deg, transparent 0deg, rgba(99,102,241,0.25) 80deg, transparent 160deg)",
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      />

      {/* Dark fill — the 2 px gap between this and the spinner IS the border */}
      <div
        className="absolute rounded-full"
        style={{
          inset: "2px",
          background: "linear-gradient(145deg, #111114, #0d0d10)",
        }}
      />

      {/* Initials + subtitle */}
      <div
        className="absolute rounded-full flex flex-col items-center justify-center gap-1 select-none"
        style={{ inset: "2px" }}
      >
        <span
          className="text-gradient font-black leading-none"
          style={{ fontSize: "clamp(2.2rem, 6vw, 3.2rem)" }}
        >
          AH
        </span>
        <span className="text-[9px] font-mono text-white/20 tracking-[0.25em] uppercase">
          Ali Haider
        </span>
      </div>

      {/*
       * Corner dot — a small decorative accent at the bottom-right
       * of the ring; stays at the ring edge by using absolute + translate.
       */}
      <div
        aria-hidden
        className="absolute w-3 h-3 rounded-full border-2 border-[#0d0d10]"
        style={{
          right: "10%",
          bottom: "6%",
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          boxShadow: "0 0 8px rgba(99,102,241,0.8)",
        }}
      />
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-28 px-6 overflow-hidden"
    >
      {/* Top divider line */}
      <div
        aria-hidden
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)",
        }}
      />

      {/* Ambient background glow so the section feels alive */}
      <div
        aria-hidden
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-5xl mx-auto">

        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-[11px] font-mono tracking-[0.3em] text-accent/60 uppercase mb-16"
        >
          01 / About Me
        </motion.p>

        {/* ── Two-column grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* ── LEFT: Avatar column ── */}
          <motion.div
            initial={{ opacity: 0, x: -36, scale: 0.97 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-7"
          >
            {/* Floating wrapper */}
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <AvatarCircle />
            </motion.div>

            {/* Available status */}
            <motion.span
              initial={{ opacity: 0, scale: 0.88 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.55 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-[11px] font-mono tracking-[0.15em] text-white/35 border border-white/[0.07]"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0 animate-pulse" />
              Available for work
            </motion.span>

            {/*
             * Decorative grid card — gives the left column visual weight
             * so it doesn't feel empty on large screens.
             */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="w-full max-w-[240px] rounded-2xl border border-white/[0.06] p-4 flex flex-col gap-3"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              {[
                { label: "AI Projects", value: "20+" },
                { label: "Models Fine-tuned", value: "15+" },
                { label: "Years Building", value: "3+" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-white/25">{stat.label}</span>
                  <span className="text-sm font-bold text-gradient">{stat.value}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Text column ── */}
          <motion.div
            variants={textBlock}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
          >
            {/* Heading */}
            <motion.h2
              variants={riseUp}
              className="text-4xl sm:text-5xl font-bold leading-[1.05] tracking-tight mb-7"
            >
              About{" "}
              <span className="text-gradient">Me</span>
            </motion.h2>

            {/* Bio */}
            <motion.p
              variants={riseUp}
              className="text-[15px] sm:text-base leading-[1.9] text-white/45 mb-9 font-light"
            >
              {BIO}
            </motion.p>

            {/* Badges */}
            <motion.div variants={riseUp}>
              <p className="text-[10px] font-mono tracking-[0.25em] text-white/20 uppercase mb-3.5">
                Quick facts
              </p>
              <div className="flex flex-wrap gap-2.5">
                {BADGES.map((badge, i) => (
                  <motion.span
                    key={badge.label}
                    initial={{ opacity: 0, scale: 0.82, y: 8 }}
                    animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.38,
                      delay: 0.55 + i * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{
                      scale: 1.06,
                      backgroundColor: "rgba(99,102,241,0.08)",
                      borderColor: "rgba(99,102,241,0.3)",
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium border border-white/[0.08] text-white/55 hover:text-white/80 transition-colors duration-200 cursor-default select-none"
                    style={{ background: "rgba(255,255,255,0.025)" }}
                  >
                    <span role="img" aria-label={badge.label}>{badge.emoji}</span>
                    <span>{badge.label}</span>
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
