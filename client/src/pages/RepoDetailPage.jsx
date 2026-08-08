import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Star, GitFork, ExternalLink, Copy, Check, Bookmark, ArrowLeft, Sparkles } from "lucide-react";
import api from "../lib/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LanguageBreakdown from "../components/LanguageBreakdown";
import LoadingScreen from "../components/LoadingScreen";
import ErrorFallback from "../components/ErrorFallback";
import { useAuthGate } from "../context/AuthGateContext";
import { useBookmarks } from "../context/BookmarkContext";

export default function RepoDetailPage() {
  const { githubId } = useParams();
  const navigate = useNavigate();
  const { requireAuth } = useAuthGate();
  const { bookmarkedIds, toggleBookmark } = useBookmarks();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);

  function load() {
    setLoading(true);
    setError(false);
    api
      .get(`/repos/detail/${githubId}`)
      .then((res) => setData(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }

  useEffect(load, [githubId]);

  if (loading) return <LoadingScreen message="Fetching repo details..." />;
  if (error || !data) {
    return <ErrorFallback title="Couldn't load this repo." onRetry={load} />;
  }

  const { repo, languages } = data;
  const isBookmarked = bookmarkedIds.has(repo.githubId);

  async function handleCopyClone() {
    await navigator.clipboard.writeText(`git clone https://github.com/${repo.fullName}.git`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="bg-bg min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20 max-w-4xl mx-auto px-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted hover:text-text text-sm mb-8 transition-colors"
        >
          <ArrowLeft size={15} /> Back
        </button>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="font-display font-bold text-2xl md:text-3xl text-text font-mono">
                {repo.fullName}
              </h1>
              <p className="text-muted mt-3 max-w-2xl leading-relaxed">
                {repo.description || "No description provided."}
              </p>
            </div>

            <button
              onClick={() => requireAuth(() => toggleBookmark(repo))}
              className={`shrink-0 w-11 h-11 rounded-full border flex items-center justify-center transition-colors ${
                isBookmarked
                  ? "border-accent/40 text-accent bg-accent/10"
                  : "border-border-c text-muted hover:text-text"
              }`}
            >
              <Bookmark size={18} fill={isBookmarked ? "currentColor" : "none"} />
            </button>
          </div>

          {repo.topics?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4">
              {repo.topics.map((t) => (
                <span key={t} className="text-xs font-mono px-2.5 py-1 rounded-full bg-accent/10 text-accent">
                  {t}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-5 mt-6 text-sm text-muted">
            <span className="flex items-center gap-1.5"><Star size={14} /> {repo.stars.toLocaleString()}</span>
            <span className="flex items-center gap-1.5"><GitFork size={14} /> {repo.forks.toLocaleString()}</span>
            {repo.license && <span>{repo.license}</span>}
            {repo.goodFirstIssueCount > 0 && (
              <span className="flex items-center gap-1.5 text-accent-purple">
                <Sparkles size={13} /> {repo.goodFirstIssueCount} good first issues
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-7">
            <motion.a
              whileTap={{ scale: 0.97 }}
              whileHover={{ y: -1 }}
              href={repo.url}
              onClick={(e) => { e.preventDefault(); requireAuth(() => window.open(repo.url, "_blank")); }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-black text-sm font-medium"
            >
              <ExternalLink size={15} /> View on GitHub
            </motion.a>
            <motion.a
              whileTap={{ scale: 0.97 }}
              whileHover={{ y: -1 }}
              href={`${repo.url}/fork`}
              onClick={(e) => { e.preventDefault(); requireAuth(() => window.open(`${repo.url}/fork`, "_blank")); }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-border-c text-text text-sm font-medium hover:border-accent/40 transition-colors"
            >
              <GitFork size={15} /> Fork
            </motion.a>
            <motion.button
              whileTap={{ scale: 0.97 }}
              whileHover={{ y: -1 }}
              onClick={() => requireAuth(handleCopyClone)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-border-c text-text text-sm font-medium hover:border-accent/40 transition-colors"
            >
              {copied ? <><Check size={15} className="text-accent" /> Copied</> : <><Copy size={15} /> Copy clone</>}
            </motion.button>
          </div>

          {Object.keys(languages).length > 0 && (
            <div className="mt-10 pt-8 border-t border-border-c">
              <h3 className="text-text font-medium mb-4">Languages</h3>
              <LanguageBreakdown languages={languages} />
            </div>
          )}
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}