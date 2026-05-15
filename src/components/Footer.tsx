"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <footer
      ref={ref}
      className="relative border-t border-white/[0.05] py-8 px-6 overflow-hidden"
    >
      {/* Subtle top glow */}
      <div
        aria-hidden
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(99,102,241,0.15) 40%, rgba(139,92,246,0.15) 60%, transparent)",
        }}
      />

      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-[11px] font-mono text-white/20 tracking-wide"
        >
          Built by{" "}
          <span className="text-gradient font-semibold">Ali Haider</span>
          {" "}· Lahore 2026
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[10px] font-mono text-white/12 tracking-wide"
        >
          Next.js · TypeScript · Tailwind · Framer Motion
        </motion.p>
      </div>
    </footer>
  );
}
