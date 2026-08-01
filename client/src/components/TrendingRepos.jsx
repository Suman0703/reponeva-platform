import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import api from "../lib/api";
import RepoCard from "./RepoCard";
import RepoCardSkeleton from "./RepoCardSkeleton";

export default function TrendingRepos() {
  const navigate = useNavigate();
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/repos", { params: { sort: "stars", limit: 3, page: 1 } })
      .then((res) => setRepos(res.data.repos))
      .finally(() => setLoading(false));
  }, []);

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
          <button
            onClick={() => navigate("/explore")}
            className="flex items-center gap-1 text-sm text-muted hover:text-text transition-colors"
          >
            View all <ArrowUpRight size={16} />
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <RepoCardSkeleton key={i} />)
            : repos.map((repo, i) => (
                <RepoCard key={repo._id} repo={repo} index={i} />
              ))}
        </div>
      </div>
    </section>
  );
}