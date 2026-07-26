export default function SortDropdown({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-4 py-2 rounded-lg bg-surface/60 border border-border-c text-text text-sm focus:outline-none focus:border-accent"
    >
      <option value="stars">Most stars</option>
      <option value="newest">Recently added</option>
    </select>
  );
}