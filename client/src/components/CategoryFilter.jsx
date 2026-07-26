import { useState } from "react";
import { motion } from "motion/react";
import { Search } from "lucide-react";
import { categoryIcons, defaultCategoryIcon } from "../lib/categoryIcons";

export default function CategoryFilter({ categories, selected, onSelect }) {
  const [search, setSearch] = useState("");

  const filtered = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  function Pill({ id, label, Icon }) {
    const isActive = selected === id;
    return (
      <button
        onClick={() => onSelect(id)}
        className={`relative flex items-center gap-1.5 px-4 py-2 rounded-full text-sm transition-colors ${
          isActive ? "text-black" : "text-muted hover:text-text"
        }`}
      >
        {/* layoutId makes Motion animate this pill's background sliding
            from wherever it currently is to wherever the next selection
            is — a single shared element, not a fade on two separate ones */}
        {isActive && (
          <motion.span
            layoutId="active-category-pill"
            className="absolute inset-0 rounded-full bg-accent"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
        <span className="relative z-10 flex items-center gap-1.5">
          {Icon && <Icon size={14} />}
          {label}
        </span>
        {!isActive && (
          <span className="absolute inset-0 rounded-full border border-border-c" />
        )}
      </button>
    );
  }

  return (
    <div className="flex-1 min-w-0">
      <div className="relative mb-4 max-w-xs">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search categories..."
          className="w-full pl-10 pr-4 py-2 rounded-full bg-bg/40 border border-border-c text-sm text-text placeholder:text-muted/60 focus:outline-none focus:border-accent"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <Pill id={null} label="All" />
        {filtered.map((cat) => (
          <Pill
            key={cat._id}
            id={cat._id}
            label={cat.name}
            Icon={categoryIcons[cat.slug] || defaultCategoryIcon}
          />
        ))}
      </div>
    </div>
  );
}