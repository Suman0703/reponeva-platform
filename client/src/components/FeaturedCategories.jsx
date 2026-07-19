import { motion } from "motion/react";
import {
  Bot, Blocks, Smartphone, Gamepad2, Shield, Cloud, Database, Code2,
} from "lucide-react";

const categories = [
  { icon: Bot, name: "AI & Machine Learning", count: 8200, color: "text-accent" },
  { icon: Blocks, name: "Blockchain & Web3", count: 3100, color: "text-accent-purple" },
  { icon: Smartphone, name: "Mobile Development", count: 6400, color: "text-accent" },
  { icon: Gamepad2, name: "Game Development", count: 2800, color: "text-accent-purple" },
  { icon: Shield, name: "Security & DevSecOps", count: 1950, color: "text-accent" },
  { icon: Cloud, name: "Cloud & DevOps", count: 5300, color: "text-accent-purple" },
  { icon: Database, name: "Data Engineering", count: 4100, color: "text-accent" },
  { icon: Code2, name: "Developer Tooling", count: 7600, color: "text-accent-purple" },
];

export default function FeaturedCategories() {
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
          <span className="text-accent font-mono text-sm">40+ categories</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-text mt-2">
            Explore by what you're into
          </h2>
          <p className="mt-3 text-muted">
            From AI to game dev, every category is broken into detailed
            subcategories so you find projects that actually match your stack.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map(function (cat, i) {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.08 }}
                whileHover={{ y: -4 }}
                className="group rounded-xl border border-border-c bg-surface/40 p-6 cursor-pointer hover:border-accent/40 transition-colors"
              >
                <Icon className={`${cat.color} mb-4`} size={28} />
                <h3 className="text-text font-medium">{cat.name}</h3>
                <p className="text-muted text-sm font-mono mt-1">
                  {cat.count.toLocaleString()} repos
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}