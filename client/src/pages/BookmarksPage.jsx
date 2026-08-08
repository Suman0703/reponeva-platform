import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Bookmark as BookmarkIcon, Compass, ArrowRight } from "lucide-react";
import api from "../lib/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NetworkBackground from "../components/NetworkBackground";
import RepoCard from "../components/RepoCard";
import RepoCardSkeleton from "../components/RepoCardSkeleton";
import { useCountUp } from "../hooks/useCountUp";

function LiveCount({ value }) {
  const { ref, value: count } = useCountUp(value, 900);
  const displayValue = value < 20 ? value : count;

  return (
    <span ref={ref} className="font-mono text-accent">
      {displayValue}
    </span>
  );
}

export default function BookmarksPage() {
  const navigate = useNavigate();
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/bookmarks")
      .then((res) => setBookmarks(res.data))
      .catch((err) => console.error("Bookmarks fetch failed:", err.response?.status))
      .finally(() => setLoading(false));
  }, []);

  const repos = bookmarks.map((b) => ({
    _id: b._id,
    githubId: b.githubId,
    fullName: b.fullName,
    description: b.description,
    url: b.url,
    language: b.language,
    topics: b.topics,
    stars: b.stars,
    forks: b.forks,
    goodFirstIssueCount: 0,
  }));

  const repoCount = repos.length;

  const languageCounts = repos.reduce((acc, r) => {
    if (r.language) acc[r.language] = (acc[r.language] || 0) + 1;
    return acc;
  }, {});
  const topLanguage = Object.entries(languageCounts).sort((a, b) => b[1] - a[1])[0]?.[0];
  const totalStars = repos.reduce((sum, r) => sum + (r.stars || 0), 0);

  return (
    <div className="bg-bg min-h-screen">
      <Navbar />

      <section className="relative pt-32 pb-14 overflow-hidden">
        <div className="absolute inset-0 h-full opacity-50 pointer-events-none">
          <NetworkBackground />
        </div>
        <div className="absolute top-0 left-1/4 w-[400px] h-[350px] bg-accent-purple/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-c bg-surface/60 text-xs text-muted mb-5">
              <BookmarkIcon size={13} className="text-accent" />
              Your saved projects
            </span>

            <h1 className="font-display font-bold text-4xl md:text-5xl text-text leading-tight">
              Everything you've <span className="text-accent">bookmarked</span>
            </h1>

            {!loading && repoCount > 0 && (
              <p className="text-muted mt-4 text-lg">
                <LiveCount value={repoCount} /> project{repoCount !== 1 ? "s" : ""} saved
                {topLanguage && (
                  <>
                    , mostly <span className="text-text">{topLanguage}</span>
                  </>
                )}
                {totalStars > 0 && (
                  <> · <LiveCount value={totalStars} /> combined stars</>
                )}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      <section className="relative max-w-7xl mx-auto px-6 pb-20">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div key="skeleton" exit={{ opacity: 0 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 3 }).map((_, i) => (
                <RepoCardSkeleton key={i} />
              ))}
            </motion.div>
          ) : repoCount === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center text-center py-20 rounded-2xl border border-border-c bg-surface/30"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-5"
              >
                <BookmarkIcon size={26} className="text-accent" />
              </motion.div>
              <h3 className="text-text font-medium text-lg">Nothing saved yet</h3>
              <p className="text-muted text-sm mt-2 max-w-sm">
                When you find a repo worth coming back to, tap the bookmark
                icon on its card — it'll show up here.
              </p>
              <motion.button
                whileTap={{ scale: 0.96 }}
                whileHover={{ y: -2 }}
                onClick={() => navigate("/explore")}
                className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-accent to-accent-purple text-black text-sm font-medium"
              >
                <Compass size={15} /> Start exploring <ArrowRight size={14} />
              </motion.button>
            </motion.div>
          ) : (
            <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {repos.map((repo, i) => (
                <RepoCard key={repo._id} repo={repo} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <Footer />
    </div>
  );
}