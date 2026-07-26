export default function RepoCardSkeleton() {
  return (
    <div className="rounded-xl border border-border-c bg-surface/40 p-5 animate-pulse">
      <div className="h-4 w-3/4 bg-border-c rounded" />
      <div className="h-3 w-full bg-border-c rounded mt-3" />
      <div className="h-3 w-2/3 bg-border-c rounded mt-2" />
      <div className="flex gap-2 mt-4">
        <div className="h-5 w-16 bg-border-c rounded-full" />
        <div className="h-5 w-16 bg-border-c rounded-full" />
      </div>
      <div className="h-px bg-border-c w-full mt-5 mb-3" />
      <div className="h-3 w-1/2 bg-border-c rounded" />
    </div>
  );
}