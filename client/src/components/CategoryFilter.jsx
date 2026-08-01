import { useState } from "react";
import { motion } from "motion/react";
import { Search, X } from "lucide-react";
import { categoryIcons, defaultCategoryIcon } from "../lib/categoryIcons";

// Moved OUTSIDE CategoryFilter — defined once, ever. Fixes the remount-
// on-every-keystroke bug and is also just correct React practice: a
// component that doesn't need to be redefined per-render, shouldn't be.
function Pill({ id, label, Icon, isActive, onSelect, index }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.02 }}
      onClick={() => onSelect(id)}
      className={`relative flex items-center gap-1.5 px-4 py-2 rounded-full text-sm transition-colors ${
        isActive ? "text-black font-medium" : "text-muted hover:text-text"
      }`}
    >
      {isActive && (
        <motion.span
          layoutId="active-category-pill"
          className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-accent shadow-[0_0_16px_rgba(46,230,166,0.4)]"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
      <span className="relative z-10 flex items-center gap-1.5">
        {Icon && <Icon size={14} />}
        {label}
      </span>
      {!isActive && (
        <span className="absolute inset-0 rounded-full border border-border-c group-hover:border-accent/30" />
      )}
    </motion.button>
  );
}

export default function CategoryFilter({ categories, selected, onSelect }) {
  const [search, setSearch] = useState("");

  const filtered = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between gap-4 mb-5">
        <div className="relative max-w-xs w-full">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search categories..."
            className="w-full pl-10 pr-9 py-2.5 rounded-full bg-bg/60 border border-border-c text-sm text-text placeholder:text-muted/60 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              aria-label="Clear search"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-text transition-colors"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Live count feedback — makes it obvious the search is actually
            doing something, instead of leaving the person to infer it
            purely from which pills disappeared */}
        <span className="text-xs text-muted font-mono whitespace-nowrap">
          {filtered.length} of {categories.length}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        <Pill id={null} label="All" isActive={selected === null} onSelect={onSelect} index={0} />
        {filtered.length === 0 ? (
          <p className="text-muted text-sm py-2">No categories match "{search}"</p>
        ) : (
          filtered.map((cat, i) => (
            <Pill
              key={cat._id}
              id={cat._id}
              label={cat.name}
              Icon={categoryIcons[cat.slug] || defaultCategoryIcon}
              isActive={selected === cat._id}
              onSelect={onSelect}
              index={i + 1}
            />
          ))
        )}
      </div>
    </div>
  );
}