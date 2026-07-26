import { useEffect, useState } from "react";
import { motion } from "motion/react";
import api from "../lib/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RepoCard from "../components/RepoCard";
import RepoCardSkeleton from "../components/RepoCardSkeleton";
import CategoryFilter from "../components/CategoryFilter";
import SortDropdown from "../components/SortDropdown";
import Pagination from "../components/Pagination";

export default function ExplorePage() {
  const [categories, setCategories] = useState([]);
  const [repos, setRepos] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sort, setSort] = useState("stars");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // Categories load once — they don't change based on filters
  useEffect(() => {
    api.get("/categories").then((res) => setCategories(res.data));
  }, []);

  // Repos re-fetch whenever any filter changes. Resetting to page 1 is
  // handled separately (below) rather than here, to avoid this effect
  // firing twice on a single filter change.
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

  // Changing category or sort while on page 3 should snap back to page 1 —
  // otherwise you can land on an empty "page 3 of 1" for a filter that
  // only has one page of results.
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

      <section className="pt-32 pb-16 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <span className="text-accent font-mono text-sm">Explore</span>
          <h1 className="font-display font-bold text-3xl md:text-4xl text-text mt-2">
            Find your next contribution
          </h1>
          <p className="text-muted mt-3">
            {total.toLocaleString()} repositories indexed and counting.
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <CategoryFilter
            categories={categories}
            selected={selectedCategory}
            onSelect={handleCategorySelect}
          />
          <SortDropdown value={sort} onChange={handleSortChange} />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <RepoCardSkeleton key={i} />
            ))}
          </div>
        ) : repos.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted">
              No repositories found for this filter yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {repos.map((repo, i) => (
              <RepoCard key={repo._id} repo={repo} index={i} />
            ))}
          </div>
        )}

        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </section>

      <Footer />
    </div>
  );
}