import { motion } from "motion/react";
// FIX: Import the entire library as an object to bypass the named export crash
import * as Icons from "lucide-react";
import NetworkBackground from "./NetworkBackground";

const REPO_URL = "https://github.com/Suman0703/reponova-platform"; // update with your real repo URL

export default function CollabHero() {
  // Safely grab the Github icon regardless of how your specific version spells it (Github vs GitHub)
  const GithubIcon = Icons.Github || Icons.GitHub;

  return (
    <section className="relative pt-32 pb-16 overflow-hidden">
      <div className="absolute inset-0 h-full opacity-60 pointer-events-none">
        <NetworkBackground />
      </div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-accent-purple/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-c bg-surface/60 text-xs text-muted mb-5">
            {/* Safely render the icon */}
            {GithubIcon && <GithubIcon size={13} className="text-accent" />}
            Open source
          </span>

          <h1 className="font-display font-bold text-4xl md:text-5xl text-text leading-tight">
            Help build{" "}
            <span className="text-accent">RepoNova</span>
          </h1>
          <p className="text-muted mt-5 text-lg leading-relaxed">
            RepoNova is open source — anyone can fork it, improve it, or fix
            what's broken. Here's exactly how to get your first contribution
            in, even if you've never opened a pull request before.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <motion.a
              whileTap={{ scale: 0.96 }}
              whileHover={{ y: -2 }}
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-black text-sm font-medium"
            >
              {GithubIcon && <GithubIcon size={16} />} View Repository
            </motion.a>
            
            <motion.a
              whileTap={{ scale: 0.96 }}
              whileHover={{ y: -2 }}
              href={`${REPO_URL}/issues`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-border-c text-text text-sm font-medium hover:border-accent/40 transition-colors"
            >
              <Icons.AlertCircle size={16} /> Open Issues
            </motion.a>

            <motion.a
              whileTap={{ scale: 0.96 }}
              whileHover={{ y: -2 }}
              href={`${REPO_URL}/fork`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-border-c text-text text-sm font-medium hover:border-accent/40 transition-colors"
            >
              <Icons.GitFork size={16} /> Fork the Repo
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}