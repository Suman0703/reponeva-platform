import { useState } from "react";
import { motion } from "motion/react";
import { Star, GitFork, ExternalLink, Sparkles, Copy, Check } from "lucide-react";

export default function RepoCard({ repo, index = 0 }) {
    const [copied, setCopied] = useState(false);

    async function handleCopyClone() {
        const cloneCommand = `git clone https://github.com/${repo.fullName}.git`;
        await navigator.clipboard.writeText(cloneCommand);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: (index % 6) * 0.06 }}
            whileHover={{ y: -6 }}
            className="relative rounded-xl border border-border-c bg-surface/40 p-5 flex flex-col justify-between hover:border-transparent transition-colors overflow-hidden group/card"
        >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent/40 via-transparent to-accent-purple/40 opacity-0 group-hover/card:opacity-100 transition-opacity -z-10" />
            <div className="absolute inset-[1px] rounded-xl bg-surface/95 -z-10" />
            <div>
                <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start justify-between gap-2 group"
                >
                    <h3 className="font-mono text-text text-sm truncate group-hover:text-accent transition-colors">
                        {repo.fullName}
                    </h3>
                    <ExternalLink
                        size={14}
                        className="text-muted opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                    />
                </a>

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

                {/* Contribution actions — explicitly labeled rather than icon-only,
            since "fork" and "copy clone command" aren't universally
            self-explanatory icons to every visitor */}
                <div className="flex items-center gap-2 mt-4">
                    <a
                        href={`${repo.url}/fork`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 text-xs py-2 rounded-lg border border-border-c text-muted hover:text-text hover:border-accent/40 transition-colors"
                    >
                        <GitFork size={13} /> Fork
                    </a>
                    <button
                        onClick={handleCopyClone}
                        className="flex-1 flex items-center justify-center gap-1.5 text-xs py-2 rounded-lg border border-border-c text-muted hover:text-text hover:border-accent/40 transition-colors"
                    >
                        {copied ? (
                            <>
                                <Check size={13} className="text-accent" /> Copied
                            </>
                        ) : (
                            <>
                                <Copy size={13} /> Copy clone
                            </>
                        )}
                    </button>
                </div>
            </div >
        </motion.div >
    );
}