import { motion } from "motion/react";

const skillGroups = [
  { label: "Frontend", skills: ["React", "Vite", "Tailwind CSS", "Redux Toolkit"] },
  { label: "Backend", skills: ["Node.js", "Express.js", "MongoDB", "REST APIs"] },
  { label: "AI & Cloud", skills: ["Generative AI", "Azure AI Services", "Grok / Groq APIs"] },
  { label: "Foundations", skills: ["SQL", "Python", "C++", "Git & GitHub"] },
];

export default function CreatorSkills() {
  return (
    <section className="py-20 max-w-5xl mx-auto px-6">
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="font-display font-bold text-2xl md:text-3xl text-text mb-10"
      >
        Skills & Technologies
      </motion.h2>

      <div className="grid sm:grid-cols-2 gap-5">
        {skillGroups.map((group, i) => (
          <motion.div
            key={group.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="rounded-xl border border-border-c bg-surface/40 p-5"
          >
            <p className="text-accent font-mono text-xs mb-3">{group.label}</p>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <motion.span
                  key={skill}
                  whileHover={{ y: -2, borderColor: "rgba(46,230,166,0.4)" }}
                  className="px-3 py-1.5 rounded-full border border-border-c text-text text-sm"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}