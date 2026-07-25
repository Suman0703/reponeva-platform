export default function FormInput({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm text-muted mb-2">{label}</label>
      <input
        {...props}
        className="w-full px-4 py-3 rounded-lg bg-surface/60 border border-border-c text-text placeholder:text-muted/60 focus:outline-none focus:border-accent transition-colors"
      />
    </div>
  );
}