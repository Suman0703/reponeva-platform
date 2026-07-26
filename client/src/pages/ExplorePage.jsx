import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import api from "../lib/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NetworkBackground from "../components/NetworkBackground";
import RepoCard from "../components/RepoCard";
import RepoCardSkeleton from "../components/RepoCardSkeleton";
import CategoryFilter from "../components/CategoryFilter";
import SortDropdown from "../components/SortDropdown";
import Pagination from "../components/Pagination";
import { useCountUp } from "../hooks/useCountUp";

// Small wrapper so the header's total-repo number gets the same animated
// count-up treatment as the landing page's stats — reusing the existing
// hook rather than inventing a second way to animate a number.
function LiveCount({ value }) {
    const { ref, value: count } = useCountUp(value, 1000);
    return (
        <span ref={ref} className="font-mono text-accent">
            {count.toLocaleString()}
        </span>
    );
}

export default function ExplorePage() {
    const [categories, setCategories] = useState([]);
    const [repos, setRepos] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [sort, setSort] = useState("stars");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/categories").then((res) => setCategories(res.data));
    }, []);

    useEffect(() => {
        setLoading(true);
        const params = { sort, page };
        if (selectedCategory) params.category = selectedCategory;

        api
            .get("/repos", { params })
            .then((res) => {
                setRepos(res.data.repos);
                setTotalPages(res.data.totalPages);
                setTotal(res.data.total);
            })
            .finally(() => setLoading(false));
    }, [selectedCategory, sort, page]);

    function handleCategorySelect(id) {
        setSelectedCategory(id);
        setPage(1);
    }

    function handleSortChange(value) {
        setSort(value);
        setPage(1);
    }

    return (
        <div className="bg-bg min-h-screen">
            <Navbar />

            {/* Header — same network + glow treatment as the hero, scoped to
          just this section so it doesn't compete with the card grid below */}
            <section className="relative pt-32 pb-16 overflow-hidden">
                <div className="absolute inset-0 h-full opacity-60">
                    <NetworkBackground />
                </div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-accent-purple/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-c bg-surface/60 text-xs text-muted mb-5">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                            Live index, updated continuously
                        </span>

                        <h1 className="font-display font-bold text-4xl md:text-5xl text-text leading-tight">
                            Somewhere in here is the repo{" "}
                            <span className="text-accent">only you'll find</span>
                        </h1>

                        <p className="text-muted mt-4 text-lg">
                            <LiveCount value={total} /> repositories,{" "}
                            <LiveCount value={categories.length} /> categories, zero
                            guesswork — just filter and start shipping.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="relative max-w-7xl mx-auto px-6 pb-16">
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="rounded-2xl border border-border-c bg-surface/40 backdrop-blur-sm p-5 mb-8"
                >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                        <CategoryFilter
                            categories={categories}
                            selected={selectedCategory}
                            onSelect={handleCategorySelect}
                        />
                        <SortDropdown value={sort} onChange={handleSortChange} />
                    </div>
                </motion.div>

                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div
                            key="skeleton"
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                        >
                            {Array.from({ length: 6 }).map((_, i) => (
                                <RepoCardSkeleton key={i} />
                            ))}
                        </motion.div>
                    ) : repos.length === 0 ? (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-24"
                        >
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-surface/60 border border-border-c mb-4">
                                <span className="text-2xl">🔍</span>
                            </div>
                            <p className="text-muted">
                                No repositories found for this filter yet.
                            </p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key={`${selectedCategory}-${sort}-${page}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                        >
                            {repos.map((repo, i) => (
                                <RepoCard key={repo._id} repo={repo} index={i} />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
            </section>

            <Footer />
        </div>
    );
}