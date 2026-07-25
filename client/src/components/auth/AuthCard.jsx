import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function AuthCard({ children, image, imageAlt }) {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-bg overflow-hidden px-4 py-8 lg:px-8">
      {/* Ambient glow behind the whole card — same technique as the hero,
          keeps this page feeling like part of the same site */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-accent-purple/10 rounded-full blur-3xl pointer-events-none" />

      <Link
        to="/"
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-muted hover:text-text text-sm transition-colors"
      >
        <ArrowLeft size={16} /> Back to Home
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-5xl grid lg:grid-cols-2 rounded-3xl border border-border-c bg-surface/50 backdrop-blur-xl shadow-2xl overflow-hidden"
      >
        {/* Left: the actual form, whatever page renders this */}
        <div className="p-8 sm:p-10 flex flex-col justify-center">
          <span className="font-display font-bold text-xl text-text block mb-6">
            RepoNeva
          </span>
          {children}
        </div>

        {/* Right: image panel — hidden below lg so mobile gets the form
            at full width instead of squeezing both into a narrow column */}
        <div className="hidden lg:block relative m-3 rounded-2xl overflow-hidden">
          <motion.img
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            src={image}
            alt={imageAlt}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Gradient wash in our own brand colors — ties an arbitrary
              downloaded image into the rest of the site's palette instead
              of it looking visually disconnected */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg/85 via-bg/10 to-accent-purple/25" />

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="absolute bottom-6 left-6 right-6 rounded-xl border border-white/10 bg-black/30 backdrop-blur-md px-4 py-3"
          >
            <p className="text-white text-sm font-medium">
              Discover. Contribute. Grow.
            </p>
            <p className="text-white/70 text-xs mt-1">
              Join developers finding their next open-source project.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}