import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import NetworkBackground from "../NetworkBackground";

export default function AuthCard({ children }) {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-bg overflow-hidden px-6">
      <NetworkBackground />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-accent-purple/10 rounded-full blur-3xl pointer-events-none" />

      <Link
        to="/"
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-muted hover:text-text text-sm transition-colors"
      >
        <ArrowLeft size={16} /> Back to Home
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-md rounded-2xl border border-border-c bg-surface/60 backdrop-blur-md p-8"
      >
        <span className="font-display font-bold text-xl text-text block mb-8">
          RepoNeva
        </span>
        {children}
      </motion.div>
    </div>
  );
}