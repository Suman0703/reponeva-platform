import { motion } from "motion/react";
import logo from "../assets/logo.png";

export default function BrandBadge({ variant = "default", size = "md" }) {
  const ringColors =
    variant === "error"
      ? "#EF4444, #A78BFA, #EF4444"
      : "#2EE6A6, #A78BFA, #2EE6A6";

  const dims = size === "sm" ? "w-24 h-24" : "w-40 h-40 md:w-48 md:h-48";
  const logoDims = size === "sm" ? "w-14 h-14" : "w-24 h-24 md:w-28 md:h-28";

  return (
    <div className={`relative ${dims} flex items-center justify-center`}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full"
        style={{ background: `conic-gradient(from 0deg, ${ringColors})` }}
      />

      <div className="absolute inset-[6px] rounded-full bg-bg" />

      <motion.div
        animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.08, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute inset-2 rounded-full blur-xl ${
          variant === "error" ? "bg-red-500/20" : "bg-accent/20"
        }`}
      />

      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className={`relative z-10 ${logoDims} rounded-full overflow-hidden border border-border-c bg-surface shadow-2xl`}
      >
        <img src={logo} alt="RepoNova" className="w-full h-full object-cover" />
      </motion.div>

      {[0, 120, 240].map((startAngle, i) => (
        <motion.div
          key={startAngle}
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 6 + i * 2, repeat: Infinity, ease: "linear", delay: i * 0.3 }}
          style={{ rotate: startAngle }}
        >
          <span
            className={`absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full ${
              variant === "error"
                ? i % 2 === 0
                  ? "bg-red-400"
                  : "bg-accent-purple"
                : i % 2 === 0
                ? "bg-accent"
                : "bg-accent-purple"
            }`}
          />
        </motion.div>
      ))}
    </div>
  );
}