import { motion } from "motion/react";
import { Quote } from "lucide-react";

export default function CreatorQuote() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Enhanced ambient background lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent-purple/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[200px] bg-accent/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Floating icon with glass wrapper */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", duration: 0.8, bounce: 0.4 }}
          className="w-14 h-14 mb-8 rounded-full bg-surface/50 border border-border-c/60 backdrop-blur-md flex items-center justify-center shadow-[0_0_30px_rgba(46,230,166,0.15)]"
        >
          <Quote size={22} className="text-accent" />
        </motion.div>

        {/* Animated Text */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-display text-2xl md:text-4xl text-text leading-relaxed md:leading-snug tracking-tight"
        >
          "Every great open-source project started with someone who decided to{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-purple font-semibold">
            just start
          </span>
          . This one's mine — I hope RepoNova helps you find yours."
        </motion.h2>

        {/* Minimalist Author tag */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex items-center gap-4"
        >
          <div className="h-[1px] w-12 bg-border-c/80" />
          <span className="text-muted text-sm uppercase tracking-widest font-medium">
            Suman
          </span>
          <div className="h-[1px] w-12 bg-border-c/80" />
        </motion.div>
      </div>
    </section>
  );
}