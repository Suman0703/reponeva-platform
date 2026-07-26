import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    // URL-safe identifier, e.g. "ai-machine-learning" — used in routes/filters
    // instead of the display name, which can contain spaces/punctuation
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, trim: true },
    // The actual GitHub topics we search by for this category — a category
    // like "AI & Machine Learning" might map to several GitHub topics
    // ("machine-learning", "deep-learning", "llm") to get broad coverage
    githubTopics: [{ type: String }],
    subcategories: [
      {
        name: { type: String, required: true },
        slug: { type: String, required: true },
        githubTopics: [{ type: String }],
      },
    ],
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);
export default Category;