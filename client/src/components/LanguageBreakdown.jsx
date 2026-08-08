import { motion } from "motion/react";

const LANGUAGE_COLORS = {
  JavaScript: "#F7DF1E", TypeScript: "#3178C6", Python: "#3776AB",
  Rust: "#DEA584", Go: "#00ADD8", Java: "#B07219", CSS: "#563D7C",
  HTML: "#E34C26", C: "#555555", "C++": "#F34B7D",
};

export default function LanguageBreakdown({ languages }) {
  const entries = Object.entries(languages);
  const total = entries.reduce((sum, [, bytes]) => sum + bytes, 0);
  if (total === 0) return null;

  return (
    <div>
      <div className="flex h-2 rounded-full overflow-hidden bg-border-c">
        {entries.map(([lang, bytes], i) => (
          <motion.div
            key={lang}
            initial={{ width: 0 }}
            animate={{ width: `${(bytes / total) * 100}%` }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            style={{ backgroundColor: LANGUAGE_COLORS[lang] || "#9CA3AF" }}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3">
        {entries.map(([lang, bytes]) => (
          <span key={lang} className="flex items-center gap-1.5 text-xs text-muted">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: LANGUAGE_COLORS[lang] || "#9CA3AF" }}
            />
            {lang} {((bytes / total) * 100).toFixed(1)}%
          </span>
        ))}
      </div>
    </div>
  );
}