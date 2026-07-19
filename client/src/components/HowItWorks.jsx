import { motion } from "motion/react";

const steps = [
  { num: "01", title: "Tell us your stack", desc: "Pick your languages, frameworks, and interests." },
  { num: "02", title: "Get matched", desc: "AI surfaces repos that fit your skill level and goals." },
  { num: "03", title: "Start contributing", desc: "Jump into good-first-issues with AI-guided context." },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-bg">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-display font-bold text-3xl md:text-4xl text-text mb-12"
        >
          How it works
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {steps.map(function (step, i) {
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
                className="relative"
              >
                <span className="font-mono text-5xl text-accent/30 font-bold">
                  {step.num}
                </span>
                <h3 className="text-text font-medium text-lg mt-4">
                  {step.title}
                </h3>
                <p className="text-muted text-sm mt-2">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}