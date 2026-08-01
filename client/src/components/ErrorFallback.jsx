import { motion } from "motion/react";
import { RefreshCw } from "lucide-react";
import BrandBadge from "./BrandBadge";

export default function ErrorFallback({
  title = "Well, that didn't go as planned.",
  message = "Something on our end hiccuped. It's probably not you.",
  onRetry,
}) {
  return (
    <div className="fixed inset-0 z-[200] bg-bg flex flex-col items-center justify-center px-6">
      <BrandBadge variant="error" />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mt-6 max-w-sm"
      >
        <p className="text-text font-medium">{title}</p>
        <p className="text-muted text-sm mt-1.5">{message}</p>
        {onRetry && (
          <motion.button
            whileTap={{ scale: 0.96 }}
            whileHover={{ y: -1 }}
            onClick={onRetry}
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-black text-sm font-medium"
          >
            <RefreshCw size={14} /> Try again
          </motion.button>
        )}
      </motion.div>
    </div>
  );
}