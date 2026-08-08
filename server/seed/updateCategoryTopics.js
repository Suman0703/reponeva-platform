import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "../models/Category.js";

dotenv.config();

// Keyed by slug (stable identifier), not name — this is what lets us
// update topics in place without touching _id or re-creating documents.
const topicUpdates = {
  "ai-machine-learning": ["machine-learning", "artificial-intelligence", "deep-learning", "neural-network"],
  nlp: ["nlp", "natural-language-processing", "text-processing", "llm"],
  mlops: ["mlops", "model-deployment", "ml-pipeline"],
  "web-development": ["web", "webapp", "full-stack", "website"],
  "frontend-frameworks": ["react", "vue", "angular", "svelte"],
  "backend-development": ["backend", "api", "rest-api", "server"],
  "mobile-development": ["android", "ios", "react-native", "flutter"],
  "blockchain-web3": ["blockchain", "web3", "smart-contracts", "ethereum"],
  "game-development": ["game-development", "gamedev", "unity", "godot"],
  "ar-vr": ["virtual-reality", "augmented-reality", "vr", "ar"],
  "cloud-devops": ["devops", "ci-cd", "cloud", "infrastructure"],
  "kubernetes-containers": ["kubernetes", "docker", "containers", "helm"],
  "data-engineering": ["data-engineering", "etl", "data-pipeline", "big-data"],
  "data-science": ["data-science", "data-analysis", "jupyter-notebook", "pandas"],
  databases: ["database", "sql", "nosql", "postgresql"],
  "developer-tooling": ["developer-tools", "cli", "productivity", "devtools"],
  cybersecurity: ["security", "cybersecurity", "penetration-testing", "vulnerability-scanner"],
  "testing-qa": ["testing", "automation-testing", "unit-testing", "e2e-testing"],
  "programming-languages": ["rust", "compiler", "interpreter", "programming-language"],
  "operating-systems": ["operating-system", "kernel", "linux", "os-dev"],
  networking: ["networking", "network-programming", "tcp-ip", "protocol"],
  "embedded-iot": ["iot", "embedded-systems", "arduino", "raspberry-pi"],
  robotics: ["robotics", "ros", "automation", "robot"],
  "ui-ux-design": ["design-system", "ui-components", "component-library", "design-tokens"],
  ecommerce: ["ecommerce", "e-commerce", "online-store", "shopping-cart"],
  fintech: ["fintech", "trading", "cryptocurrency", "payments"],
  "healthcare-tech": ["healthcare", "medical", "health-tech", "telemedicine"],
  "productivity-tools": ["productivity", "task-management", "note-taking", "todo-app"],
  "chat-communication": ["chat", "messaging", "chatbot", "discord-bot"],
  "content-management": ["cms", "headless-cms", "content-management", "blog"],
  "low-code-no-code": ["low-code", "no-code", "visual-programming", "automation"],
  "documentation-learning": ["awesome-list", "documentation", "learning-resources", "tutorial"],
};

async function updateTopics() {
  await mongoose.connect(process.env.MONGO_URI);

  let updatedCount = 0;
  for (const [slug, githubTopics] of Object.entries(topicUpdates)) {
    const result = await Category.findOneAndUpdate(
      { slug },
      { $set: { githubTopics } }
    );
    if (result) {
      updatedCount += 1;
    } else {
      console.warn(`No category found for slug "${slug}" — skipped.`);
    }
  }

  console.log(`Updated topics for ${updatedCount} categories.`);
  await mongoose.disconnect();
}

updateTopics();