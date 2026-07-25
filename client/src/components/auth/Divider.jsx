export default function Divider() {
  return (
    <div className="flex items-center gap-3 my-4">
      <div className="flex-1 h-px bg-border-c" />
      <span className="text-xs text-muted font-mono">OR CONTINUE WITH</span>
      <div className="flex-1 h-px bg-border-c" />
    </div>
  );
}