import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-4 mt-10">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="p-2 rounded-lg border border-border-c text-muted disabled:opacity-40 disabled:cursor-not-allowed hover:text-text transition-colors"
      >
        <ChevronLeft size={18} />
      </button>
      <span className="text-sm text-muted font-mono">
        Page {page} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="p-2 rounded-lg border border-border-c text-muted disabled:opacity-40 disabled:cursor-not-allowed hover:text-text transition-colors"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}