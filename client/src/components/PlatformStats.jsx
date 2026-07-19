import { motion } from "motion/react";
import { GitBranch, Layers, Users, Sparkles } from "lucide-react";
import StatCard from "./StatCard";

const stats = [
  { icon: GitBranch, label: "Repositories Indexed", value: 128400, suffix: "+" },
  { icon: Layers, label: "Categories & Subcategories", value: 42 },
  { icon: Users, label: "Active Contributors", value: 9600, suffix: "+" },
  { icon: Sparkles, label: "AI Recommendations Served", value: 340000, suffix: "+" },
];

export default function PlatformStats() {
  return (
    <section className="relative py-24 bg-bg">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mb-12"
        >
          <h2 className="font-display font-bold text-3xl md:text-4xl text-text">
            Built on real activity
          </h2>
          <p className="mt-3 text-muted">
            RepoNeva's index grows every day as contributors discover and
            engage with new projects.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map(function (stat) {
            return (
              <StatCard
                key={stat.label}
                icon={stat.icon}
                label={stat.label}
                value={stat.value}
                suffix={stat.suffix}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}