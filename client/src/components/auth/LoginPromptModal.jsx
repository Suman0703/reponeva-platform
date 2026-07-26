import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Lock, X } from "lucide-react";
import { useAuthGate } from "../../context/AuthGateContext";

export default function LoginPromptModal() {
  const { promptOpen, setPromptOpen } = useAuthGate();
  const navigate = useNavigate();

  function goTo(path) {
    setPromptOpen(false);
    navigate(path);
  }

  return (
    <AnimatePresence>
      {promptOpen && (
        <>
          {/* Backdrop — clicking it dismisses, same as clicking the X */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPromptOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-sm rounded-2xl border border-border-c bg-surface/95 backdrop-blur-xl p-6"
          >
            <button
              onClick={() => setPromptOpen(false)}
              aria-label="Close"
              className="absolute top-4 right-4 text-muted hover:text-text transition-colors"
            >
              <X size={18} />
            </button>

            <div className="w-11 h-11 rounded-full bg-accent/10 flex items-center justify-center mb-4">
              <Lock size={18} className="text-accent" />
            </div>

            <h3 className="font-display font-bold text-lg text-text">
              Log in to continue
            </h3>
            <p className="text-muted text-sm mt-2">
              Create a free account to view repo details, fork projects, and
              track what you're contributing to.
            </p>

            <div className="flex flex-col gap-2 mt-6">
              <button
                onClick={() => goTo("/login")}
                className="w-full py-2.5 rounded-full bg-accent text-black text-sm font-medium"
              >
                Log in
              </button>
              <button
                onClick={() => goTo("/signup")}
                className="w-full py-2.5 rounded-full border border-border-c text-text text-sm font-medium hover:border-accent/40 transition-colors"
              >
                Create an account
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}