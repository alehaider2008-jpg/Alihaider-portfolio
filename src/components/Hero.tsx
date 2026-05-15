"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

// ─── Typewriter ───────────────────────────────────────────────────────────────

const ROLES = ["AI Specialist", "Vibe Coder", "Builder of Intelligent Systems"];
const TYPING_SPEED  = 75;   // ms / char
const DELETE_SPEED  = 38;   // ms / char
const PAUSE_TYPED   = 2200; // ms after full word appears
const PAUSE_DELETED = 480;  // ms before next word starts

type Phase = "typing" | "pausing" | "deleting" | "waiting";

function useTypewriter(words: string[]) {
  const [text, setText]         = useState("");
  const [wordIdx, setWordIdx]   = useState(0);
  const [phase, setPhase]       = useState<Phase>("typing");
  const timerRef                = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const word = words[wordIdx];

    const schedule = (fn: () => void, delay: number) => {
      timerRef.current = setTimeout(fn, delay);
    };

    if (phase === "typing") {
      if (text.length < word.length) {
        schedule(() => setText(word.slice(0, text.length + 1)), TYPING_SPEED);
      } else {
        schedule(() => setPhase("pausing"), PAUSE_TYPED);
      }
    }

    if (phase === "pausing") {
      schedule(() => setPhase("deleting"), 0);
    }

    if (phase === "deleting") {
      if (text.length > 0) {
        schedule(() => setText(text.slice(0, -1)), DELETE_SPEED);
      } else {
        schedule(() => {
          setWordIdx((i) => (i + 1) % words.length);
          setPhase("typing");
        }, PAUSE_DELETED);
      }
    }

    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [text, phase, wordIdx, words]);

  return text;
}

// ─── Background layers ────────────────────────────────────────────────────────

function DotGrid() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(255,255,255,0.13) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        maskImage:
          "radial-gradient(ellipse 75% 75% at 50% 50%, black 30%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 75% 75% at 50% 50%, black 30%, transparent 100%)",
      }}
    />
  );
}

type OrbProps = {
  style: React.CSSProperties;
  animate: Record<string, number[]>;
  duration: number;
  delay?: number;
};

function Orb({ style, animate, duration, delay = 0 }: OrbProps) {
  return (
    <motion.div
      aria-hidden
      className="absolute pointer-events-none rounded-full"
      style={{ filter: "blur(55px)", ...style }}
      animate={animate}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

// ─── Entrance variants ────────────────────────────────────────────────────────

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.15 } },
};

const riseUp = {
  hidden: { opacity: 0, y: 28 },
  show:   {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const fadeOnly = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 1, ease: "easeOut" as const } },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function Hero() {
  const typed = useTypewriter(ROLES);

  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-24"
    >
      {/* ── Background ── */}
      <DotGrid />

      {/* Primary indigo/violet orb — top-centre */}
      <Orb
        style={{
          top: "-5%", left: "30%", width: 560, height: 560,
          background:
            "radial-gradient(circle, rgba(99,102,241,0.32) 0%, rgba(139,92,246,0.12) 50%, transparent 72%)",
        }}
        animate={{ scale: [1, 1.14, 1], opacity: [0.6, 1, 0.6] }}
        duration={9}
      />

      {/* Blue orb — right */}
      <Orb
        style={{
          top: "35%", right: "-8%", width: 440, height: 440,
          background:
            "radial-gradient(circle, rgba(59,130,246,0.22) 0%, transparent 68%)",
        }}
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.5, 0.9, 0.5] }}
        duration={11}
        delay={3}
      />

      {/* Violet orb — bottom-left */}
      <Orb
        style={{
          bottom: "0%", left: "-5%", width: 380, height: 380,
          background:
            "radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 68%)",
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
        duration={13}
        delay={5}
      />

      {/* Bottom vignette so content doesn't fight the footer */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, #0a0a0a 0%, transparent 100%)",
        }}
      />

      {/* ── Content ── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-3xl w-full mx-auto text-center"
      >
        {/* Location chip */}
        <motion.div variants={riseUp} className="mb-8 flex justify-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.08] text-[11px] font-mono tracking-[0.22em] text-white/35 uppercase select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            Lahore, Pakistan
          </span>
        </motion.div>

        {/* Greeting line */}
        <motion.p
          variants={riseUp}
          className="text-xs sm:text-sm font-mono tracking-[0.3em] text-white/25 uppercase mb-5 select-none"
        >
          Hello, World. I&apos;m
        </motion.p>

        {/* ── Name ── */}
        <motion.h1
          variants={riseUp}
          className="name-shimmer font-bold leading-[0.92] tracking-[-0.04em] mb-8 select-none"
          style={{ fontSize: "clamp(3.4rem, 10vw, 6.5rem)" }}
        >
          Ali Haider
        </motion.h1>

        {/* ── Typewriter ── */}
        <motion.div
          variants={riseUp}
          /* fixed height so the layout never jumps between short/long roles */
          className="mb-9 h-10 flex items-center justify-center"
        >
          <p
            className="text-lg sm:text-xl md:text-2xl font-light tracking-wide"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            {typed}
            {/* blinking cursor bar */}
            <span
              aria-hidden
              className="cursor-blink inline-block w-[2px] h-[1.1em] rounded-full ml-[3px] align-middle translate-y-[-1px]"
              style={{
                background: "linear-gradient(180deg, #6366f1, #8b5cf6)",
                verticalAlign: "middle",
              }}
            />
          </p>
        </motion.div>

        {/* ── Bio ── */}
        <motion.p
          variants={riseUp}
          className="text-[15px] sm:text-base leading-[1.8] text-white/40 max-w-xl mx-auto mb-12 font-light"
        >
          I&apos;m an AI specialist from Lahore who builds intelligent,
          production-ready systems — from LLM-powered apps to custom automation
          tools. I don&apos;t just write code; I vibe with it until something
          remarkable ships.
        </motion.p>

        {/* ── CTAs ── */}
        <motion.div
          variants={riseUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5"
        >
          {/* Primary */}
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo("#projects")}
            className="relative group px-8 py-3.5 rounded-xl text-sm font-semibold text-white overflow-hidden"
            style={{ background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)" }}
          >
            {/* Hover shimmer overlay */}
            <span
              aria-hidden
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
              style={{ background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)" }}
            />
            {/* Glow ring */}
            <span
              aria-hidden
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ boxShadow: "0 0 28px 4px rgba(99,102,241,0.45)" }}
            />
            <span className="relative z-10">View Projects</span>
          </motion.button>

          {/* Secondary */}
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo("#contact")}
            className="px-8 py-3.5 rounded-xl text-sm font-semibold text-white/55 hover:text-white/90 border border-white/[0.09] hover:border-white/[0.2] transition-all duration-250"
          >
            Get in Touch
          </motion.button>
        </motion.div>

        {/* ── Scroll hint ── */}
        <motion.div variants={fadeOnly} className="mt-20 flex justify-center">
          <motion.button
            onClick={() => scrollTo("#about")}
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-white/15 hover:text-white/35 transition-colors duration-300 focus:outline-none"
            aria-label="Scroll to About"
          >
            <span className="text-[9px] font-mono tracking-[0.35em] uppercase">Scroll</span>
            <ArrowDown className="w-3 h-3" />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}
