import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Search, Loader2 } from "lucide-react";
import api from "../lib/api";
import { useAuthGate } from "../context/AuthGateContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NetworkBackground from "../components/NetworkBackground";
import RepoCard from "../components/RepoCard";

const EXAMPLE_QUERIES = [
  "rust command line tools",
  "machine learning projects using python",
  "CLI tools for developers",
  "React portfolio website with Tailwind CSS",
  "Next.js full stack authentication",
  "open source beginner-friendly JavaScript projects",
];

export default function AiSearchPage() {
    const { requireAuth } = useAuthGate();
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null); // { interpretation, repos }
    const [error, setError] = useState("");

    async function runSearch(q) {
        setLoading(true);
        setError("");
        setResult(null);
        try {
            const res = await api.post("/ai/search", { query: q });
            setResult(res.data);
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!query.trim()) return;
        // Gated: anonymous visitors get the login modal instead of a real
        // search — consistent with how repo actions are gated on Explore.
        requireAuth(() => runSearch(query.trim()));
    }

    return (
        <div className="bg-bg min-h-screen">
            <Navbar />

            <section className="relative pt-32 pb-16 overflow-hidden">
                <div className="absolute inset-0 h-full opacity-60">
                    <NetworkBackground />
                </div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-accent-purple/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-c bg-surface/60 text-xs text-muted mb-5">
                            <Sparkles size={13} className="text-accent-purple" />
                            Powered by Groq
                        </span>

                        <h1 className="font-display font-bold text-4xl md:text-5xl text-text leading-tight">
                            Search the way you'd{" "}
                            <span className="text-accent">ask a friend</span>
                        </h1>
                        <p className="text-muted mt-4 text-lg">
                            Describe what you're looking for in plain language — skill
                            level, language, whatever matters to you.
                        </p>
                    </motion.div>

                    <motion.form
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mt-8 relative"
                    >
                        <Search
                            size={18}
                            className="absolute left-5 top-1/2 -translate-y-1/2 text-muted"
                        />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="e.g. beginner-friendly react projects with open issues"
                            className="w-full pl-12 pr-32 py-4 rounded-full bg-surface/60 border border-border-c text-text placeholder:text-muted/60 focus:outline-none focus:border-accent backdrop-blur-sm transition-colors"
                        />
                        <motion.button
                            whileTap={{ scale: 0.96 }}
                            type="submit"
                            disabled={loading}
                            className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2.5 rounded-full bg-gradient-to-r from-accent to-accent-purple text-black text-sm font-medium disabled:opacity-60 flex items-center gap-2"
                        >
                            {loading ? <Loader2 size={16} className="animate-spin" /> : "Search"}
                        </motion.button>
                    </motion.form>

                    <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                        {EXAMPLE_QUERIES.map((ex) => (
                            <button
                                key={ex}
                                onClick={() => {
                                    setQuery(ex);
                                }}
                                className="text-xs text-muted hover:text-accent transition-colors px-3 py-1.5 rounded-full border border-border-c"
                            >
                                {ex}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative max-w-7xl mx-auto px-6 pb-20">
                <AnimatePresence mode="wait">
                    {loading && (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center py-16 text-center"
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                                className="w-10 h-10 rounded-full border-2 border-border-c border-t-accent mb-4"
                            />
                            <p className="text-muted text-sm">
                                Interpreting your search and matching repos...
                            </p>
                        </motion.div>
                    )}

                    {error && (
                        <motion.div
                            key="error"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-16"
                        >
                            <p className="text-red-400">{error}</p>
                        </motion.div>
                    )}

                    {result && !loading && (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            {/* Interpretation chip — shows Grok's understanding back to
                  the user, so a bad/zero-result search is explainable
                  rather than a silent mystery */}
                            <div className="rounded-xl border border-border-c bg-surface/40 p-4 mb-8 flex items-start gap-3">
                                <Sparkles size={16} className="text-accent-purple mt-0.5 shrink-0" />
                                <div>
                                    <p className="text-text text-sm">{result.interpretation.summary}</p>
                                    <div className="flex flex-wrap gap-1.5 mt-2">
                                        {result.interpretation.language && (
                                            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-accent/10 text-accent">
                                                {result.interpretation.language}
                                            </span>
                                        )}
                                        {result.interpretation.topics?.map((t) => (
                                            <span
                                                key={t}
                                                className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-accent-purple/10 text-accent-purple"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {result.repos.length === 0 ? (
                                <div className="text-center py-16">
                                    <p className="text-muted">
                                        No repos matched that yet — try broadening your search.
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                    {result.repos.map((repo, i) => (
                                        <RepoCard key={repo._id} repo={repo} index={i} />
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>

            <Footer />
        </div>
    );
}