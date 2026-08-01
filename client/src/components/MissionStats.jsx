import { motion } from "motion/react";
import { Target, Users, Heart } from "lucide-react";
import { useCountUp } from "../hooks/useCountUp";

const points = [
  {
    icon: Target,
    stat: 40,
    suffix: "+",
    label: "Categories mapped",
    desc: "From AI to embedded systems — organized so you can actually browse by what you care about.",
  },
  {
    icon: Users,
    stat: 100,
    suffix: "%",
    label: "Beginner-aware",
    desc: "Every repo is checked for good-first-issue signals, so new contributors aren't left guessing.",
  },
  {
    icon: Heart,
    stat: 0,
    suffix: "",
    label: "Ads, ever",
    desc: "RepoNeva exists to help people contribute — not to sell attention back to advertisers.",
  },
];

function StatPoint({ icon: Icon, stat, suffix, label, desc, index }) {
  const { ref, value } = useCountUp(stat, 1200);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="rounded-2xl border border-border-c bg-surface/40 p-6"
    >
      <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
        <Icon size={20} className="text-accent" />
      </div>
      <div className="font-mono text-3xl font-bold text-text">
        {value}
        <span className="text-accent">{suffix}</span>
      </div>
      <p className="text-text text-sm font-medium mt-2">{label}</p>
      <p className="text-muted text-sm mt-1 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

export default function MissionStats() {
  return (
    <section className="py-16 max-w-7xl mx-auto px-6">
      <div className="grid sm:grid-cols-3 gap-5">
        {points.map((p, i) => (
          <StatPoint key={p.label} {...p} index={i} />
        ))}
      </div>
    </section>
  );
}