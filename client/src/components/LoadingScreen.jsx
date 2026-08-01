import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import BrandBadge from "./BrandBadge";

const LOADING_MESSAGES = [
  "Waking up the repo index...",
  "Untangling open-source spaghetti...",
  "Counting stars (the GitHub kind)...",
  "Warming up the AI's search brain...",
  "Almost there — good things take a sync...",
];

export default function LoadingScreen() {
  const [messageIndex, setMessageIndex] = useState(0);

  // Cycles through a short list rather than showing one static line — if
  // a load happens to take a couple of seconds, this keeps the screen
  // feeling active instead of stuck on the same sentence the whole time.
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % LOADING_MESSAGES.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[200] bg-bg flex flex-col items-center justify-center px-6"
    >
      <BrandBadge />

      <div className="h-6 mt-6 relative w-full max-w-xs text-center">
        {/* AnimatePresence + a changing key lets each message crossfade
            out/in rather than snapping — matches the smoothness of
            everything else on the site instead of feeling like plain
            text popped in. */}
        <AnimatePresence mode="wait">
          <motion.p
            key={messageIndex}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 text-muted text-sm font-mono"
          >
            {LOADING_MESSAGES[messageIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}