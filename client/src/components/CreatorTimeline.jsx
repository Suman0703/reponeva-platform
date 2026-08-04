import { motion } from "motion/react";
import { GraduationCap, Briefcase } from "lucide-react";

const timeline = [
  {
    icon: GraduationCap,
    title: "B.Tech, Computer Science",
    org: "Rayat-Bahra University, Punjab",
    period: "Batch 2027",
    desc: "Focused coursework and projects around full-stack development and applied AI.",
  },
  {
    icon: Briefcase,
    title: "Placement Coordinator",
    org: "CSE Department",
    period: "Current",
    desc: "Helping bridge students and recruiters — while building RepoNova on the side.",
  },
];

export default function CreatorTimeline() {
  return (
    <section className="py-20 max-w-4xl mx-auto px-6">
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="font-display font-bold text-2xl md:text-3xl text-text mb-10"
      >
        Education & Current Role
      </motion.h2>

      <div className="relative pl-8 border-l border-border-c space-y-10">
        {timeline.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
              className="relative"
            >
              <span className="absolute -left-[41px] top-0 w-8 h-8 rounded-full bg-surface border border-border-c flex items-center justify-center">
                <Icon size={14} className="text-accent" />
              </span>
              <p className="text-muted text-xs font-mono">{item.period}</p>
              <h3 className="text-text font-medium mt-1">{item.title}</h3>
              <p className="text-accent text-sm mt-0.5">{item.org}</p>
              <p className="text-muted text-sm mt-2 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}