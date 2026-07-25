import { motion } from "motion/react";

// Google/GitHub logins are full-page redirects to the backend, not fetch
// calls — the backend itself redirects to Google/GitHub's real consent
// screen. So this is a real `<a>`-style navigation, not an async handler.
export default function OAuthButton({ provider, icon, label }) {
  const apiBase = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  return (
    <motion.a
      whileTap={{ scale: 0.97 }}
      href={`${apiBase}/auth/${provider}`}
      className="w-full py-3 rounded-lg border border-border-c bg-surface/40 text-text font-medium flex items-center justify-center gap-2 hover:border-accent/40 transition-colors"
    >
      {icon}
      {label}
    </motion.a>
  );
}