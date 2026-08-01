import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import NetworkBackground from "./NetworkBackground";

export default function AboutHero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 h-full opacity-60 pointer-events-none">
        <NetworkBackground />
      </div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-accent-purple/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-c bg-surface/60 text-xs text-muted mb-5">
            <Sparkles size={13} className="text-accent" />
            Our mission
          </span>

          <h1 className="font-display font-bold text-4xl md:text-5xl text-text leading-tight">
            Open source has a discovery problem.{" "}
            <span className="text-accent">We're fixing it.</span>
          </h1>

          <p className="text-muted mt-5 text-lg leading-relaxed">
            Millions of repositories exist, but finding the right one to
            contribute to still means scrolling through awesome-lists and
            hoping. RepoNeva uses AI to match developers with projects that
            actually fit their skills, interests, and goals.
          </p>
        </motion.div>
      </div>
    </section>
  );
}