import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Do I need permission before contributing?",
    a: "No — fork the repo and start working. For larger changes, opening an issue first to discuss the approach saves everyone time.",
  },
  {
    q: "I'm new to Git/GitHub — can I still contribute?",
    a: "Yes. Look for issues labeled \"good first issue\" — they're specifically chosen to be approachable for first-time contributors.",
  },
  {
    q: "How long until my PR gets reviewed?",
    a: "This is a small, actively maintained project — most PRs get a first response within a few days.",
  },
  {
    q: "What tech stack should I be comfortable with?",
    a: "RepoNova is built with React, Node.js/Express, and MongoDB. Familiarity with any of these helps, but focused fixes in one area don't require knowing the whole stack.",
  },
];

function FaqItem({ q, a, isOpen, onClick }) {
  return (
    <div className="border-b border-border-c">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="text-text font-medium text-sm">{q}</span>
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={16} className="text-muted shrink-0" />
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="text-muted text-sm pb-4 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CollabFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-20 max-w-2xl mx-auto px-6">
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="font-display font-bold text-3xl text-text mb-10 text-center"
      >
        Frequently asked questions
      </motion.h2>

      <div>
        {faqs.map((faq, i) => (
          <FaqItem
            key={faq.q}
            q={faq.q}
            a={faq.a}
            isOpen={openIndex === i}
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </section>
  );
}