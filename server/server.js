import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // parses incoming JSON request bodies into req.body

// Health check route — confirms the server is alive
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "RepoNeva server is running" });
});

// Connect to MongoDB, then start the server only if connection succeeds
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("MongoDB connection error:", err));