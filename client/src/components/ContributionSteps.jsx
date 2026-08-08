import { useState } from "react";
import { motion } from "motion/react";
import { Copy, Check } from "lucide-react";

const REPO_URL = "https://github.com/Suman0703/reponova-platform";

function CodeBlock({ command }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="flex items-center justify-between gap-3 rounded-lg bg-bg/60 border border-border-c px-4 py-3 mt-3">
      <code className="text-accent text-sm font-mono overflow-x-auto whitespace-pre">
        {command}
      </code>
      <button
        onClick={handleCopy}
        aria-label="Copy command"
        className="shrink-0 text-muted hover:text-text transition-colors"
      >
        {copied ? <Check size={15} className="text-accent" /> : <Copy size={15} />}
      </button>
    </div>
  );
}

const steps = [
  {
    title: "Fork the repository",
    desc: "Click \"Fork\" on the repo page to create your own copy under your GitHub account.",
  },
  {
    title: "Clone it locally",
    desc: "Download your fork onto your machine.",
    command: `git clone ${REPO_URL}.git`,
  },
  {
    title: "Create a new branch",
    desc: "Never work directly on main — a dedicated branch keeps your change isolated and easy to review.",
    command: "git checkout -b feature/your-feature-name",
  },
  {
    title: "Make your changes",
    desc: "Edit, add, or fix whatever you're working on — then stage and commit with a clear message.",
    command: 'git add .\ngit commit -m "Add: short description of your change"',
  },
  {
    title: "Push to your fork",
    desc: "Send your branch up to your own GitHub fork.",
    command: "git push origin feature/your-feature-name",
  },
  {
    title: "Open a Pull Request",
    desc: "Go to your fork on GitHub — you'll see a prompt to open a PR against RepoNova's main branch. Describe what you changed and why.",
  },
];

export default function ContributionSteps() {
  return (
    <section className="py-20 max-w-3xl mx-auto px-6">
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="font-display font-bold text-3xl text-text mb-10 text-center"
      >
        How to contribute, step by step
      </motion.h2>

      <div className="space-y-5">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="rounded-xl border border-border-c bg-surface/40 p-5"
          >
            <div className="flex items-start gap-3">
              <span className="shrink-0 w-7 h-7 rounded-full bg-accent/10 text-accent text-xs font-mono font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="text-text font-medium">{step.title}</h3>
                <p className="text-muted text-sm mt-1">{step.desc}</p>
                {step.command && <CodeBlock command={step.command} />}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}