"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Send, ArrowUpRight } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const CONTACTS = [
  {
    emoji: "📧",
    label: "Email",
    display: "ale.haider2008@gmail.com",
    href: "mailto:ale.haider2008@gmail.com",
  },
  {
    emoji: "📱",
    label: "Phone",
    display: "+92 330 555 4222",
    href: "tel:+923305554222",
  },
  {
    emoji: "🐙",
    label: "GitHub",
    display: "github.com/alehaider2008-jpg",
    href: "https://github.com/alehaider2008-jpg",
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
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const cardItem = {
  hidden: { opacity: 0, x: -16 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

// ─── Input component ──────────────────────────────────────────────────────────

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-[10px] font-mono tracking-[0.25em] text-white/25 uppercase mb-2.5">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 border border-white/[0.07] focus:outline-none focus:border-accent/40 transition-colors duration-200 font-light";
const inputStyle = { background: "rgba(255,255,255,0.025)" };

// ─── Section ──────────────────────────────────────────────────────────────────

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:ale.haider2008@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="contact"
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

      {/* Bottom-centre ambient glow */}
      <div
        aria-hidden
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(99,102,241,0.09) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">

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
            04 / Contact
          </motion.p>

          <motion.h2
            variants={riseUp}
            className="text-4xl sm:text-5xl font-bold leading-[1.05] tracking-tight mb-5"
          >
            Let&apos;s Build{" "}
            <span className="text-gradient">Something</span>
          </motion.h2>

          <motion.p
            variants={riseUp}
            className="text-[15px] text-white/35 font-light max-w-md"
          >
            Have a project in mind, want to collaborate, or just want to talk AI?
            Hit me up.
          </motion.p>
        </motion.div>

        {/* ── Two-column grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">

          {/* ── LEFT: contact details ── */}
          <div>
            <p className="text-[10px] font-mono tracking-[0.3em] text-white/20 uppercase mb-6">
              Ways to reach me
            </p>

            <motion.div
              variants={cardContainer}
              initial="hidden"
              animate={isInView ? "show" : "hidden"}
              className="flex flex-col gap-3 mb-10"
            >
              {CONTACTS.map((c) => (
                <motion.a
                  key={c.label}
                  variants={cardItem}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  whileHover={{
                    y: -3,
                    boxShadow: "0 0 28px rgba(99,102,241,0.13)",
                    borderColor: "rgba(99,102,241,0.25)",
                  }}
                  className="group flex items-center gap-4 px-5 py-4 rounded-2xl border border-white/[0.07] transition-colors duration-200"
                  style={{ background: "rgba(255,255,255,0.02)" }}
                >
                  {/* Emoji icon */}
                  <span
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
                    style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.12)" }}
                    role="img"
                    aria-label={c.label}
                  >
                    {c.emoji}
                  </span>

                  {/* Text */}
                  <div className="min-w-0">
                    <p className="text-[10px] font-mono tracking-[0.2em] text-white/20 uppercase mb-0.5">
                      {c.label}
                    </p>
                    <p className="text-[13px] font-medium text-white/60 group-hover:text-white/90 transition-colors duration-200 truncate">
                      {c.display}
                    </p>
                  </div>

                  {/* Arrow — slides in on hover */}
                  <ArrowUpRight
                    className="w-4 h-4 text-white/15 group-hover:text-accent/70 transition-all duration-200 shrink-0 ml-auto opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0"
                  />
                </motion.a>
              ))}
            </motion.div>

            {/* Availability note */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex items-start gap-3 px-5 py-4 rounded-2xl border border-white/[0.05]"
              style={{ background: "rgba(255,255,255,0.015)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0 mt-1.5" />
              <p className="text-[13px] text-white/30 font-light leading-relaxed">
                Currently open to freelance projects, consulting, and full-time AI roles.
                Based in Lahore — available worldwide.
              </p>
            </motion.div>
          </div>

          {/* ── RIGHT: form ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 p-8 rounded-2xl border border-white/[0.07]"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              {/* Name + Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Name">
                  <input
                    type="text"
                    required
                    placeholder="Ali Haider"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                    style={inputStyle}
                  />
                </Field>
                <Field label="Email">
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                    style={inputStyle}
                  />
                </Field>
              </div>

              {/* Message */}
              <Field label="Message">
                <textarea
                  required
                  rows={6}
                  placeholder="Tell me about your project, idea, or how I can help..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`${inputClass} resize-none`}
                  style={inputStyle}
                />
              </Field>

              {/* Submit */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="relative group/btn flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-semibold text-white overflow-hidden"
                style={{ background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)" }}
              >
                {/* Hover overlay */}
                <span
                  aria-hidden
                  className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 rounded-xl"
                  style={{ background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)" }}
                />
                {/* Glow ring */}
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                  style={{ boxShadow: "0 0 28px 4px rgba(99,102,241,0.4)" }}
                />
                <Send className="relative z-10 w-4 h-4" />
                <span className="relative z-10">Send Message</span>
              </motion.button>

              <p className="text-[10px] font-mono text-white/18 text-center leading-relaxed">
                Opens your mail client — no data stored on any server.
              </p>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
