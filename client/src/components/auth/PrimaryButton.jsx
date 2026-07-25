import { motion } from "motion/react";
import { Loader2 } from "lucide-react";

export default function PrimaryButton({ children, loading, ...props }) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ y: -1 }}
      disabled={loading || props.disabled}
      {...props}
      className="w-full py-2.5 rounded-full bg-gradient-to-r from-accent to-accent-purple text-black font-medium flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {loading ? <Loader2 size={18} className="animate-spin" /> : children}
    </motion.button>
  );
}