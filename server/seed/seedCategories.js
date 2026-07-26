import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "../models/Category.js";

dotenv.config();

const categories = [
  { name: "AI & Machine Learning", slug: "ai-machine-learning", description: "Projects in artificial intelligence and machine learning", githubTopics: ["machine-learning"] },
  { name: "Natural Language Processing", slug: "nlp", description: "Text processing, language models, and NLP tooling", githubTopics: ["nlp"] },
  { name: "MLOps", slug: "mlops", description: "Deploying, monitoring, and managing ML models in production", githubTopics: ["mlops"] },
  { name: "Web Development", slug: "web-development", description: "Full-stack and frontend web projects", githubTopics: ["web"] },
  { name: "Frontend Frameworks", slug: "frontend-frameworks", description: "React, Vue, Angular, and other UI frameworks", githubTopics: ["react"] },
  { name: "Backend Development", slug: "backend-development", description: "APIs, servers, and backend architecture", githubTopics: ["backend"] },
  { name: "Mobile Development", slug: "mobile-development", description: "Android, iOS, and cross-platform mobile apps", githubTopics: ["android"] },
  { name: "Blockchain & Web3", slug: "blockchain-web3", description: "Smart contracts, DeFi, and decentralized apps", githubTopics: ["blockchain"] },
  { name: "Game Development", slug: "game-development", description: "Game engines, tools, and full game projects", githubTopics: ["game-development"] },
  { name: "AR/VR", slug: "ar-vr", description: "Augmented and virtual reality experiences", githubTopics: ["virtual-reality"] },
  { name: "Cloud & DevOps", slug: "cloud-devops", description: "Infrastructure, CI/CD, and cloud-native tooling", githubTopics: ["devops"] },
  { name: "Kubernetes & Containers", slug: "kubernetes-containers", description: "Container orchestration and related tooling", githubTopics: ["kubernetes"] },
  { name: "Data Engineering", slug: "data-engineering", description: "Data pipelines, ETL, and large-scale data processing", githubTopics: ["data-engineering"] },
  { name: "Data Science", slug: "data-science", description: "Analysis, notebooks, and data visualization", githubTopics: ["data-science"] },
  { name: "Databases", slug: "databases", description: "SQL, NoSQL, and database tooling", githubTopics: ["database"] },
  { name: "Developer Tooling", slug: "developer-tooling", description: "CLIs, build tools, and productivity utilities for developers", githubTopics: ["developer-tools"] },
  { name: "Cybersecurity", slug: "cybersecurity", description: "Security tools, scanners, and research", githubTopics: ["security"] },
  { name: "Testing & QA", slug: "testing-qa", description: "Test automation and quality assurance tooling", githubTopics: ["testing"] },
  { name: "Programming Languages", slug: "programming-languages", description: "Compilers, interpreters, and language tooling", githubTopics: ["rust"] },
  { name: "Operating Systems & Kernels", slug: "operating-systems", description: "OS-level and kernel development", githubTopics: ["operating-system"] },
  { name: "Networking", slug: "networking", description: "Protocols, networking tools, and infrastructure", githubTopics: ["networking"] },
  { name: "Embedded Systems & IoT", slug: "embedded-iot", description: "Hardware-adjacent and Internet of Things projects", githubTopics: ["iot"] },
  { name: "Robotics", slug: "robotics", description: "Robotics frameworks and automation", githubTopics: ["robotics"] },
  { name: "UI/UX & Design Systems", slug: "ui-ux-design", description: "Component libraries and design systems", githubTopics: ["design-system"] },
  { name: "E-commerce", slug: "ecommerce", description: "Online store platforms and commerce tooling", githubTopics: ["ecommerce"] },
  { name: "Finance & Fintech", slug: "fintech", description: "Trading tools, fintech platforms, and crypto tooling", githubTopics: ["fintech"] },
  { name: "Healthcare Tech", slug: "healthcare-tech", description: "Health-focused software and medical tooling", githubTopics: ["healthcare"] },
  { name: "Productivity Tools", slug: "productivity-tools", description: "Note-taking, task management, and personal tooling", githubTopics: ["productivity"] },
  { name: "Chat & Communication", slug: "chat-communication", description: "Messaging platforms and communication bots", githubTopics: ["chat"] },
  { name: "Content Management", slug: "content-management", description: "CMS platforms and content tooling", githubTopics: ["cms"] },
  { name: "Low-Code / No-Code", slug: "low-code-no-code", description: "Visual builders and automation platforms", githubTopics: ["low-code"] },
  { name: "Documentation & Learning", slug: "documentation-learning", description: "Docs tooling, awesome-lists, and learning resources", githubTopics: ["awesome-list"] },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await Category.deleteMany({});
  await Category.insertMany(categories);
  console.log(`Seeded ${categories.length} categories`);
  await mongoose.disconnect();
}

seed();