import { motion } from "motion/react";
import { useCountUp } from "../hooks/useCountUp";

export default function StatCard({ icon: Icon, label, value, suffix = "" }) {
  const { ref, value: count } = useCountUp(value);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-xl border border-border-c bg-surface/40 backdrop-blur-sm p-6 hover:border-accent/40 transition-colors"
    >
      <div className="flex items-center gap-2 text-muted text-sm mb-3">
        {Icon && <Icon size={16} className="text-accent" />}
        {label}
      </div>
      <div className="font-mono text-3xl md:text-4xl font-medium text-text">
        {count.toLocaleString()}
        <span className="text-accent">{suffix}</span>
      </div>
    </motion.div>
  );
}