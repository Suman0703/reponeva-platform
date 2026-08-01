import { motion } from "motion/react";
import { UserPlus, Sliders, Search, GitFork } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create your account",
    desc: "Sign up in seconds with email OTP, or continue with Google or GitHub — no forms, no friction.",
  },
  {
    icon: Sliders,
    title: "Tell us what you're into",
    desc: "Pick languages, frameworks, and categories that match how you build — this shapes everything you see next.",
  },
  {
    icon: Search,
    title: "Explore or ask AI",
    desc: "Browse by category on Explore, or just describe what you want in plain language on AI Search.",
  },
  {
    icon: GitFork,
    title: "Fork and contribute",
    desc: "Found something? Fork it, clone it, and start shipping — directly from the repo card, no extra steps.",
  },
];

export default function HowToUseSection() {
  return (
    <section className="relative py-24 max-w-7xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-xl mx-auto mb-16"
      >
        <span className="text-accent font-mono text-sm">Getting started</span>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-text mt-2">
          How to use RepoNeva
        </h2>
        <p className="text-muted mt-3">
          Four steps between you and your next contribution.
        </p>
      </motion.div>

      <div className="relative">
        {/* Connecting line — only visible on desktop, where the steps sit
            in a row and a line genuinely reads as "a path between them."
            On mobile, where steps stack vertically, this would look like
            a stray horizontal bar with nothing to connect. */}
        <div className="hidden lg:block absolute top-11 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border-c to-transparent" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative flex flex-col items-center text-center lg:items-start lg:text-left"
              >
                <div className="relative z-10 w-[88px] h-[88px] rounded-2xl border border-border-c bg-surface flex items-center justify-center mb-5">
                  <motion.div
                    whileHover={{ scale: 1.08, rotate: 3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent-purple/20 flex items-center justify-center"
                  >
                    <Icon size={22} className="text-accent" />
                  </motion.div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent text-black text-xs font-mono font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>

                <h3 className="text-text font-medium">{step.title}</h3>
                <p className="text-muted text-sm mt-2 leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}