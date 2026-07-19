import { motion } from "motion/react";
import { GitBranch, Star, GitFork, Sparkles, Search } from "lucide-react";

// A small circular progress ring for the AI match score — built with SVG
// stroke-dasharray rather than a library, since it's one simple ring and
// pulling in a whole progress-ring package for this would be overkill.
function MatchRing({ percent }) {
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative w-16 h-16 shrink-0">
      <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          stroke="#262626"
          strokeWidth="5"
        />
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          stroke="#2EE6A6"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-text text-xs font-mono font-medium">
        {percent}%
      </span>
    </div>
  );
}

export default function HeroVisual() {
  return (
    <div className="relative w-full h-[420px] flex items-center justify-center">
      {/* Main card — the primary "AI match" result */}
      <motion.div
        initial={{ opacity: 0, y: 30, rotate: -3 }}
        animate={{
          opacity: 1,
          y: [0, -12, 0],
          rotate: -3,
        }}
        transition={{
          opacity: { duration: 0.6, delay: 0.4 },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
        className="relative z-10 w-80 rounded-2xl border border-border-c bg-surface/60 backdrop-blur-md p-5 shadow-2xl"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
            <GitBranch size={16} className="text-accent" />
          </div>
          <div>
            <p className="text-text font-mono text-sm">vectorflow/core</p>
            <p className="text-muted text-xs">Rust · Vector database</p>
          </div>
        </div>

        <p className="text-muted text-sm mt-4 leading-relaxed">
          Lightweight vector database built for edge AI inference.
        </p>

        <div className="flex items-center justify-between mt-5 pt-4 border-t border-border-c">
          <div className="flex items-center gap-3 text-muted text-xs">
            <span className="flex items-center gap-1">
              <Star size={12} /> 12.4k
            </span>
            <span className="flex items-center gap-1">
              <GitFork size={12} /> 890
            </span>
          </div>
          <MatchRing percent={94} />
        </div>
      </motion.div>

      {/* Secondary card — represents AI Search, floats independently
          behind/above the main card so the two brand features (matching
          + search) both appear without cluttering one card */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: 1,
          y: [0, 10, 0],
        }}
        transition={{
          opacity: { duration: 0.6, delay: 0.6 },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
        }}
        className="absolute top-6 right-2 z-20 w-64 rounded-xl border border-border-c bg-surface/70 backdrop-blur-md p-4 shadow-xl"
      >
        <div className="flex items-center gap-2 text-muted text-xs mb-2">
          <Search size={13} className="text-accent-purple" />
          AI Search
        </div>
        <p className="text-text text-sm">
          "beginner friendly rust repos with open issues"
        </p>
      </motion.div>

      {/* Small floating badge — pure ambient detail, low opacity so it
          doesn't compete with the two real cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.4, 0.8, 0.4],
          y: [0, -8, 0],
        }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-4 left-0 z-0 flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-c bg-surface/50 backdrop-blur-sm text-xs text-muted"
      >
        <Sparkles size={12} className="text-accent-purple" />
        340k+ matches served
      </motion.div>
    </div>
  );
}