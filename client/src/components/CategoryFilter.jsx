export default function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect(null)}
        className={`px-4 py-2 rounded-full text-sm border transition-colors ${
          selected === null
            ? "bg-accent text-black border-accent"
            : "border-border-c text-muted hover:text-text"
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat._id}
          onClick={() => onSelect(cat._id)}
          className={`px-4 py-2 rounded-full text-sm border transition-colors ${
            selected === cat._id
              ? "bg-accent text-black border-accent"
              : "border-border-c text-muted hover:text-text"
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}