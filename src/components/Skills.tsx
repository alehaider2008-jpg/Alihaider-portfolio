"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ─── Data ─────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    label: "AI / ML",
    skills: [
      { emoji: "🐍", name: "Python" },
      { emoji: "⛓️", name: "LangChain" },
      { emoji: "✨", name: "OpenAI API" },
      { emoji: "🤗", name: "Hugging Face" },
      { emoji: "🧠", name: "TensorFlow" },
    ],
  },
  {
    label: "Web",
    skills: [
      { emoji: "▲", name: "Next.js" },
      { emoji: "⚛️", name: "React" },
      { emoji: "🟢", name: "Node.js" },
      { emoji: "💨", name: "Tailwind CSS" },
    ],
  },
  {
    label: "Tools",
    skills: [
      { emoji: "🌿", name: "Git" },
      { emoji: "🐙", name: "GitHub" },
      { emoji: "▲", name: "Vercel" },
      { emoji: "🐳", name: "Docker" },
      { emoji: "💚", name: "Supabase" },
    ],
  },
  {
    label: "Other",
    skills: [
      { emoji: "💬", name: "Prompt Engineering" },
      { emoji: "🤖", name: "AI Agents" },
      { emoji: "🔗", name: "REST APIs" },
    ],
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

const cardContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const cardItem = {
  hidden: { opacity: 0, y: 14, scale: 0.93 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

// ─── Skill card ───────────────────────────────────────────────────────────────

function SkillCard({ emoji, name }: { emoji: string; name: string }) {
  return (
    <motion.div
      whileHover={{
        scale: 1.07,
        y: -3,
        boxShadow: "0 0 22px rgba(99,102,241,0.22), 0 0 6px rgba(99,102,241,0.1)",
        borderColor: "rgba(99,102,241,0.32)",
      }}
      className="group flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-white/[0.07] cursor-default select-none"
      style={{ background: "rgba(255,255,255,0.025)" }}
    >
      <span className="text-base leading-none" role="img" aria-label={name}>
        {emoji}
      </span>
      <span className="text-[13px] font-medium text-white/55 group-hover:text-white/85 transition-colors duration-200">
        {name}
      </span>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="skills"
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

      {/* Ambient glow — left side for balance */}
      <div
        aria-hidden
        className="absolute -top-32 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-5xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          variants={headerBlock}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="mb-16"
        >
          <motion.p
            variants={riseUp}
            className="text-[11px] font-mono tracking-[0.3em] text-accent/60 uppercase mb-5"
          >
            02 / Skills
          </motion.p>

          <motion.h2
            variants={riseUp}
            className="text-4xl sm:text-5xl font-bold leading-[1.05] tracking-tight mb-5"
          >
            Tech{" "}
            <span className="text-gradient">Stack</span>
          </motion.h2>

          <motion.p
            variants={riseUp}
            className="text-[15px] text-white/35 font-light max-w-md"
          >
            The tools I reach for when building AI-powered products.
          </motion.p>
        </motion.div>

        {/* ── 2 × 2 category grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
          {CATEGORIES.map((cat) => (
            <div key={cat.label}>
              {/* Category label */}
              <p className="text-[10px] font-mono tracking-[0.3em] text-white/20 uppercase mb-4">
                {cat.label}
              </p>

              {/* Staggered skill cards — each category triggers independently */}
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                variants={cardContainer}
                className="flex flex-wrap gap-2.5"
              >
                {cat.skills.map((skill) => (
                  <motion.div key={skill.name} variants={cardItem}>
                    <SkillCard emoji={skill.emoji} name={skill.name} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
