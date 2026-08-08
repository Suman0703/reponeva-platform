import { motion } from "motion/react";
import { GitFork, Download, GitBranch, FileEdit, Upload, GitPullRequest } from "lucide-react";

const steps = [
  { icon: GitFork, label: "Fork" },
  { icon: Download, label: "Clone" },
  { icon: GitBranch, label: "Branch" },
  { icon: FileEdit, label: "Commit" },
  { icon: Upload, label: "Push" },
  { icon: GitPullRequest, label: "Pull Request" },
];

export default function WorkflowDiagram() {
  return (
    <section className="py-16 max-w-5xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-border-c bg-surface/40 p-8 overflow-x-auto"
      >
        <div className="flex items-center min-w-[600px] justify-between">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.label} className="flex items-center flex-1 last:flex-none">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className="flex flex-col items-center gap-2 shrink-0"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <Icon size={18} className="text-accent" />
                  </div>
                  <span className="text-xs text-muted font-mono whitespace-nowrap">
                    {step.label}
                  </span>
                </motion.div>

                {i < steps.length - 1 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 + 0.15 }}
                    style={{ originX: 0 }}
                    className="flex-1 h-px bg-gradient-to-r from-accent/40 to-border-c mx-2"
                  />
                )}
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}