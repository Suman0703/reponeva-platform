import { useRef } from "react";
import { motion } from "motion/react";

export default function OtpInput({ value, onChange, error }) {
  const refs = useRef([]);

  function handleChange(index, rawChar) {
    const digit = rawChar.replace(/\D/g, "").slice(-1); // keep only the last typed digit, and only if numeric
    const next = value.split("");
    next[index] = digit || "";
    onChange(next.join(""));

    if (digit && index < 5) {
      refs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index, e) {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      // Empty box + backspace: jump back and clear the previous box too,
      // matching how OTP inputs behave on every app people already know
      refs.current[index - 1]?.focus();
      const next = value.split("");
      next[index - 1] = "";
      onChange(next.join(""));
    }
  }

  function handlePaste(e) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    onChange(pasted.padEnd(6, "").slice(0, 6).trimEnd());
    refs.current[Math.min(pasted.length, 5)]?.focus();
  }

  return (
    <div>
      <div className="flex gap-2 justify-between">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.input
            key={i}
            ref={(el) => (refs.current[i] = el)}
            value={value[i] || ""}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            inputMode="numeric"
            maxLength={1}
            animate={error ? { x: [0, -6, 6, -6, 0] } : {}}
            transition={{ duration: 0.3 }}
            className={`w-12 h-14 text-center text-xl font-mono rounded-lg border bg-surface/60 text-text focus:outline-none transition-colors ${
              error ? "border-red-500" : "border-border-c focus:border-accent"
            }`}
          />
        ))}
      </div>
      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
    </div>
  );
}