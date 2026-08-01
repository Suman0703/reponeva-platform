import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { GitBranch, Layers, Tags } from "lucide-react";
import api from "../lib/api";
import StatCard from "./StatCard";

export default function PlatformStats() {
  const [stats, setStats] = useState({ repos: 0, categories: 0, topics: 0 });

  useEffect(() => {
    Promise.all([
      api.get("/repos", { params: { limit: 1 } }),
      api.get("/categories"),
    ]).then(([reposRes, categoriesRes]) => {
      const categories = categoriesRes.data;
      const topicCount = categories.reduce(
        (sum, cat) => sum + (cat.githubTopics?.length || 0),
        0
      );
      setStats({
        repos: reposRes.data.total,
        categories: categories.length,
        topics: topicCount,
      });
    });
  }, []);

  const cards = [
    { icon: GitBranch, label: "Repositories Indexed", value: stats.repos, suffix: "+" },
    { icon: Layers, label: "Categories Covered", value: stats.categories },
    { icon: Tags, label: "GitHub Topics Mapped", value: stats.topics },
  ];

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
            Every number here reflects RepoNeva's actual, continuously
            synced index — not a projection.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {cards.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}