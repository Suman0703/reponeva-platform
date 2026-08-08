import { motion } from "motion/react";
import { Bug, Lightbulb, ArrowRight } from "lucide-react";

const REPO_URL = "https://github.com/your-username/reponova";

const cards = [
  {
    icon: Bug,
    title: "Found a bug?",
    desc: "Open an issue with steps to reproduce it, what you expected, and what actually happened.",
    linkLabel: "Report a bug",
    href: `${REPO_URL}/issues/new`,
  },
  {
    icon: Lightbulb,
    title: "Have an idea?",
    desc: "Feature requests are welcome — open an issue describing what you'd like to see and why it'd help.",
    linkLabel: "Suggest a feature",
    href: `${REPO_URL}/issues/new`,
  },
];

export default function IssuesAndFeatures() {
  return (
    <section className="py-20 max-w-4xl mx-auto px-6">
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="font-display font-bold text-3xl text-text mb-10 text-center"
      >
        Issues & feature requests
      </motion.h2>

      <div className="grid sm:grid-cols-2 gap-5">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-xl border border-border-c bg-surface/40 p-6"
            >
              <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                <Icon size={20} className="text-accent" />
              </div>
              <h3 className="text-text font-medium">{card.title}</h3>
              <p className="text-muted text-sm mt-2 leading-relaxed">{card.desc}</p>
              <a
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-accent text-sm font-medium mt-4"
              >
                {card.linkLabel} <ArrowRight size={14} />
              </a>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}