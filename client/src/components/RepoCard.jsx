import { motion } from "motion/react";
import { Star, GitFork, ExternalLink, Sparkles } from "lucide-react";

export default function RepoCard({ repo, index = 0 }) {
  return (
    <motion.a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: (index % 6) * 0.06 }}
      whileHover={{ y: -4 }}
      className="group rounded-xl border border-border-c bg-surface/40 p-5 flex flex-col justify-between hover:border-accent/40 transition-colors"
    >
      <div>
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-mono text-text text-sm truncate">
            {repo.fullName}
          </h3>
          <ExternalLink
            size={14}
            className="text-muted opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
          />
        </div>

        <p className="text-muted text-sm mt-2 line-clamp-2">
          {repo.description || "No description provided."}
        </p>

        {repo.topics?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {repo.topics.slice(0, 3).map((topic) => (
              <span
                key={topic}
                className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-accent/10 text-accent"
              >
                {topic}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="mt-5 pt-4 border-t border-border-c">
        <div className="flex items-center gap-3 text-xs text-muted">
          {repo.language && (
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-accent" />
              {repo.language}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Star size={12} /> {repo.stars.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <GitFork size={12} /> {repo.forks.toLocaleString()}
          </span>
        </div>

        {repo.goodFirstIssueCount > 0 && (
          <div className="flex items-center gap-1.5 mt-3 text-xs text-accent-purple">
            <Sparkles size={12} />
            {repo.goodFirstIssueCount} good first issue
            {repo.goodFirstIssueCount > 1 ? "s" : ""}
          </div>
        )}
      </div>
    </motion.a>
  );
}