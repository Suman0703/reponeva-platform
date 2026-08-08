import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

const guidelines = [
  "Keep pull requests focused — one feature or fix per PR is easier to review than a bundle of unrelated changes.",
  "Write clear commit messages (e.g. \"Fix: OTP resend cooldown not resetting\" rather than \"update\").",
  "Test your changes locally before opening a PR — make sure existing features still work.",
  "Follow the existing code style and folder structure rather than introducing a new pattern.",
  "For big changes, open an issue first to discuss the approach before writing code.",
  "Be kind in reviews and discussions — everyone here is learning, including the maintainer.",
];

export default function ContributionGuidelines() {
  return (
    <section className="py-20 max-w-3xl mx-auto px-6">
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="font-display font-bold text-3xl text-text mb-10 text-center"
      >
        Contribution guidelines
      </motion.h2>

      <div className="space-y-3">
        {guidelines.map((g, i) => (
          <motion.div
            key={g}
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            className="flex items-start gap-3 rounded-lg bg-surface/30 p-4"
          >
            <CheckCircle2 size={17} className="text-accent shrink-0 mt-0.5" />
            <p className="text-text text-sm leading-relaxed">{g}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}