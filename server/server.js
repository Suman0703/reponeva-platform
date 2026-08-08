import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import repoRoutes from "./routes/repoRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import syncRoutes from "./routes/syncRoutes.js";
import aiSearchRoutes from "./routes/aiSearchRoutes.js";
import bookmarkRoutes from "./routes/bookmarkRoutes.js"; // ← add this

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/repos", repoRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/sync", syncRoutes);
app.use("/api/ai", aiSearchRoutes);
app.use("/api/bookmarks", bookmarkRoutes); // ← add this

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "RepoNeva server is running" });
});

app.use("/api/auth", authRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("MongoDB connection error:", err));