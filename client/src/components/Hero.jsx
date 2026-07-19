import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import NetworkBackground from "./NetworkBackground";
import HeroVisual from "./HeroVisual";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-bg">
      <NetworkBackground />

      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-accent-purple/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-c bg-surface/60 text-xs text-muted mb-6"
          >
            <Sparkles size={14} className="text-accent" />
            AI-powered repo discovery
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-bold text-5xl md:text-6xl text-text leading-tight"
          >
            Find the repo you're{" "}
            <span className="text-accent">meant to contribute to</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg text-muted max-w-xl"
          >
            RepoNeva uses AI to match you with open-source projects that fit
            your skills and interests — across 40+ categories, so you spend
            less time searching and more time shipping.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <motion.button
              whileTap={{ scale: 0.96 }}
              whileHover={{ y: -2 }}
              className="px-6 py-3 rounded-lg bg-accent text-black font-medium flex items-center gap-2"
            >
              Explore Projects
              <ArrowRight size={16} />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.96 }}
              whileHover={{ y: -2 }}
              className="px-6 py-3 rounded-lg border border-border-c bg-surface/40 text-text font-medium backdrop-blur-sm"
            >
              Try AI Search
            </motion.button>
          </motion.div>
        </div>

        {/* Right column — hidden below lg so it never competes for space
            with the headline on tablet/mobile, where the network background
            alone is enough visual interest */}
        <div className="hidden lg:block">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}