import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-bg">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl border border-border-c bg-surface/60 backdrop-blur-sm p-12 text-center overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
          <h2 className="font-display font-bold text-3xl md:text-4xl text-text relative z-10">
            Your next contribution is waiting
          </h2>
          <p className="text-muted mt-3 max-w-md mx-auto relative z-10">
            Join thousands of developers discovering projects that actually
            match how they build.
          </p>
          <motion.button
            whileTap={{ scale: 0.96 }}
            whileHover={{ y: -2 }}
            onClick={() => navigate("/explore")}
            className="relative z-10 mt-8 px-6 py-3 rounded-lg bg-accent text-black font-medium inline-flex items-center gap-2"
          >
            Explore Projects <ArrowRight size={16} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}