import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";
import { categoryIcons, defaultCategoryIcon } from "../lib/categoryIcons";

export default function FeaturedCategories() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get("/categories").then((res) => setCategories(res.data.slice(0, 8)));
  }, []);

  return (
    <section className="relative py-24 bg-bg">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mb-12"
        >
          <span className="text-accent font-mono text-sm">40+ categories</span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-text mt-2">
            Explore by what you're into
          </h2>
          <p className="mt-3 text-muted">
            From AI to game dev, every category is mapped to real GitHub
            topics so you find projects that actually match your stack.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat, i) => {
            const Icon = categoryIcons[cat.slug] || defaultCategoryIcon;
            return (
              <motion.div
                key={cat._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.08 }}
                whileHover={{ y: -4 }}
                onClick={() => navigate("/explore")}
                className="group rounded-xl border border-border-c bg-surface/40 p-6 cursor-pointer hover:border-accent/40 transition-colors"
              >
                <Icon className="text-accent mb-4" size={28} />
                <h3 className="text-text font-medium">{cat.name}</h3>
                <p className="text-muted text-sm mt-1 line-clamp-2">
                  {cat.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}