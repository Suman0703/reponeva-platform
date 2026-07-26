import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "../models/Category.js";

dotenv.config();

const categories = [
  {
    name: "AI & Machine Learning",
    slug: "ai-machine-learning",
    description: "Projects in artificial intelligence and machine learning",
    githubTopics: ["machine-learning", "deep-learning"],
  },
  {
    name: "Developer Tooling",
    slug: "developer-tooling",
    description: "Tools that help developers build software",
    githubTopics: ["developer-tools", "cli"],
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await Category.deleteMany({}); // clean slate each time this script runs
  await Category.insertMany(categories);
  console.log(`Seeded ${categories.length} categories`);
  await mongoose.disconnect();
}

seed();