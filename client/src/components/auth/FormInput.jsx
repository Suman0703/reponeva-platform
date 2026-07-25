export default function FormInput({ label, icon: Icon, ...props }) {
  return (
    <div>
      {label && <label className="block text-sm text-muted mb-2">{label}</label>}
      <div className="relative">
        {Icon && (
          <Icon
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
          />
        )}
        <input
          {...props}
          className={`w-full ${Icon ? "pl-11" : "pl-4"} pr-4 py-2.5 rounded-full bg-bg/40 border border-border-c text-text placeholder:text-muted/60 focus:outline-none focus:border-accent transition-colors`}
        />
      </div>
    </div>
  );
}