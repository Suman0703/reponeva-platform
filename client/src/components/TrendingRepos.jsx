import { motion } from "motion/react";
import { Star, GitFork, ArrowUpRight } from "lucide-react";

const repos = [
  {
    name: "vectorflow/core",
    desc: "Lightweight vector database built for edge AI inference.",
    lang: "Rust",
    stars: "12.4k",
    forks: "890",
  },
  {
    name: "opencanvas/ui",
    desc: "Composable React components for canvas-based design tools.",
    lang: "TypeScript",
    stars: "8.1k",
    forks: "540",
  },
  {
    name: "meshgraph/py",
    desc: "Graph neural network toolkit for scientific simulations.",
    lang: "Python",
    stars: "6.7k",
    forks: "410",
  },
];

export default function TrendingRepos() {
  return (
    <section className="relative py-24 bg-bg">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-12 flex-wrap gap-4"
        >
          <div>
            <span className="text-accent font-mono text-sm">Trending now</span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-text mt-2">
              Projects gaining momentum
            </h2>
          </div>
          <button className="flex items-center gap-1 text-sm text-muted hover:text-text transition-colors">
            View all <ArrowUpRight size={16} />
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {repos.map(function (repo, i) {
            return (
              <motion.div
                key={repo.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="rounded-xl border border-border-c bg-surface/40 p-6 flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-mono text-text text-sm">{repo.name}</h3>
                  <p className="text-muted text-sm mt-3">{repo.desc}</p>
                </div>
                <div className="flex items-center gap-4 mt-6 pt-4 border-t border-border-c text-xs text-muted">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    {repo.lang}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star size={12} /> {repo.stars}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork size={12} /> {repo.forks}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}