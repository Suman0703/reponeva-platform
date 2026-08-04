import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    name: "RepoNova",
    desc: "AI-powered open-source repo discovery platform — the one you're using right now. MERN + GitHub API + Groq.",
    tags: ["React", "Node.js", "MongoDB", "AI"],
  },
  {
    name: "Campus Connect",
    desc: "MERN-based complaint/grievance platform built for Rayat-Bahra University.",
    tags: ["React", "Express", "MongoDB"],
  },
  {
    name: "Sentinel-IQ",
    desc: "AI-powered insider threat detection platform, built for a hackathon with Team PseudoCoders.",
    tags: ["MERN", "Python", "AI"],
  },
];

export default function CreatorProjects() {
  return (
    <section className="py-20 max-w-5xl mx-auto px-6">
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="font-display font-bold text-2xl md:text-3xl text-text mb-10"
      >
        Projects & Achievements
      </motion.h2>

      <div className="grid sm:grid-cols-3 gap-5">
        {projects.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            whileHover={{ y: -4 }}
            className="rounded-xl border border-border-c bg-surface/40 p-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between">
                <h3 className="text-text font-medium">{p.name}</h3>
                <ExternalLink size={14} className="text-muted" />
              </div>
              <p className="text-muted text-sm mt-2 leading-relaxed">
                {p.desc}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-4">
              {p.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-accent/10 text-accent"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}