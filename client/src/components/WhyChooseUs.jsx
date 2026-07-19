import { motion } from "motion/react";
import { Zap, Target, Users2, ShieldCheck } from "lucide-react";

const reasons = [
  { icon: Target, title: "Actually relevant", desc: "No more scrolling through hundreds of irrelevant repos." },
  { icon: Zap, title: "AI-first, not AI-washed", desc: "AI is core to the matching, not a bolted-on chatbot widget." },
  { icon: Users2, title: "Built for all levels", desc: "Skill-based filtering means beginners and experts both find their fit." },
  { icon: ShieldCheck, title: "Open-source friendly", desc: "Designed with maintainers and contributors in mind, not just traffic." },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-bg">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-display font-bold text-3xl md:text-4xl text-text mb-12 max-w-xl"
        >
          Why developers choose RepoNeva
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reasons.map(function (r, i) {
            const Icon = r.icon;
            return (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.08 }}
                className="rounded-xl border border-border-c bg-surface/40 p-6"
              >
                <Icon size={22} className="text-accent mb-4" />
                <h3 className="text-text font-medium">{r.title}</h3>
                <p className="text-muted text-sm mt-2">{r.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}