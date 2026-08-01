import { motion } from "motion/react";
import { Sparkles, MessageSquareText, Compass, Search } from "lucide-react";

const features = [
  {
    icon: Compass,
    title: "Smart Matching",
    desc: "AI reads your skills and past activity to surface repos you're actually likely to enjoy contributing to.",
  },
  {
    icon: MessageSquareText,
    title: "Natural Language Search",
    desc: "Search the way you'd ask a friend — \"beginner-friendly React projects with open issues\" just works.",
  },
  {
    icon: Sparkles,
    title: "Live GitHub Search",
    desc: "AI Search queries GitHub directly in real time, so results aren't limited to a stale, pre-built list.",
  },
];

export default function AiFeatures() {
  return (
    <section className="relative py-24 bg-bg overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent-purple/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-accent font-mono text-sm"
            >
              AI-powered
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-display font-bold text-3xl md:text-4xl text-text mt-2 mb-10"
            >
              Discovery that understands you
            </motion.h2>

            <div className="space-y-6">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Icon size={18} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="text-text font-medium">{f.title}</h3>
                      <p className="text-muted text-sm mt-1">{f.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Honest example mockup — labeled as an example, not presented
              as real analytics the way the old chart implied */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-border-c bg-surface/40 backdrop-blur-sm p-6"
          >
            <p className="text-muted text-xs font-mono mb-4">EXAMPLE SEARCH</p>

            <div className="flex items-center gap-3 rounded-full border border-border-c bg-bg/60 px-4 py-3 mb-5">
              <Search size={15} className="text-muted shrink-0" />
              <span className="text-text text-sm">
                "beginner friendly rust repos with open issues"
              </span>
            </div>

            <div className="space-y-3">
              {["vectorflow/core", "rust-cli-starter", "oxide-web"].map((name, i) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
                  className="flex items-center justify-between rounded-lg bg-bg/40 border border-border-c px-4 py-2.5"
                >
                  <span className="font-mono text-sm text-text">{name}</span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-accent/10 text-accent">
                    matched
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}