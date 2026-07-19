import { motion } from "motion/react";
import { Sparkles, MessageSquareText, Compass } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from "recharts";

const techData = [
  { name: "JavaScript", value: 28 },
  { name: "Python", value: 24 },
  { name: "TypeScript", value: 18 },
  { name: "Rust", value: 12 },
  { name: "Go", value: 10 },
];

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
    title: "AI Summaries",
    desc: "Every repo gets an AI-generated summary of what it does, its structure, and where to start contributing.",
  },
];

export default function AiFeatures() {
  return (
    <section className="relative py-24 bg-bg overflow-hidden">
      {/* Ambient glow — same purple used sparingly in the hero, ties the
          sections together visually without repeating the network canvas */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent-purple/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: feature list */}
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
              {features.map(function (f, i) {
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

          {/* Right: real chart — Technology Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-border-c bg-surface/40 backdrop-blur-sm p-6"
          >
            <h4 className="text-text font-medium mb-1">
              Technology Distribution
            </h4>
            <p className="text-muted text-sm mb-6">
              Share of indexed repos by primary language
            </p>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={techData}>
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                  axisLine={{ stroke: "#262626" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                  axisLine={{ stroke: "#262626" }}
                  tickLine={false}
                  unit="%"
                />
                <Tooltip
                  contentStyle={{
                    background: "#151515",
                    border: "1px solid #262626",
                    borderRadius: 8,
                  }}
                  labelStyle={{ color: "#FFFFFF" }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {techData.map(function (entry, i) {
                    // Alternate the two brand accents across bars instead of
                    // one flat color — turns a plain bar chart into something
                    // that visually matches the rest of the brand.
                    return (
                      <Cell
                        key={entry.name}
                        fill={i % 2 === 0 ? "#2EE6A6" : "#A78BFA"}
                      />
                    );
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </section>
  );
}