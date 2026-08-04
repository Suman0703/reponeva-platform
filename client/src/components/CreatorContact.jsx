import { motion } from "motion/react";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function CreatorContact() {
  return (
    <section className="py-24 max-w-2xl mx-auto px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-border-c bg-surface/60 backdrop-blur-sm p-10 relative overflow-hidden"
      >
        <div className="absolute -top-16 -right-16 w-56 h-56 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

        <h2 className="font-display font-bold text-2xl md:text-3xl text-text relative z-10">
          Let's connect
        </h2>
        <p className="text-muted mt-3 relative z-10">
          Open to internship and full-time opportunities — always happy to
          talk about RepoNova, MERN, or AI.
        </p>

        <div className="flex items-center justify-center gap-3 mt-7 relative z-10">
          <motion.a
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            href="mailto:placeholder@example.com"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-black text-sm font-medium"
          >
            <Mail size={15} /> Email me
          </motion.a>
          
          {/* Replaced Lucide Github with React Icons FaGithub */}
          <motion.a
            whileHover={{ y: -2 }}
            href="#"
            aria-label="GitHub"
            className="w-10 h-10 rounded-full border border-border-c flex items-center justify-center text-muted hover:text-text transition-colors"
          >
            <FaGithub size={17} />
          </motion.a>
          
          {/* Replaced Lucide Linkedin with React Icons FaLinkedin */}
          <motion.a
            whileHover={{ y: -2 }}
            href="#"
            aria-label="LinkedIn"
            className="w-10 h-10 rounded-full border border-border-c flex items-center justify-center text-muted hover:text-text transition-colors"
          >
            <FaLinkedin size={17} />
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}