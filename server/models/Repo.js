import mongoose from "mongoose";

const repoSchema = new mongoose.Schema(
  {
    // GitHub's own numeric ID — the real unique identifier. A repo can be
    // renamed or transferred to a new owner (changing fullName), but this
    // never changes, so it's what we upsert against, not the name.
    githubId: { type: Number, required: true, unique: true },

    name: { type: String, required: true },
    fullName: { type: String, required: true }, // "owner/repo"
    owner: { type: String, required: true },
    description: { type: String, default: "" },
    url: { type: String, required: true },

    language: { type: String, default: null },
    topics: [{ type: String }],

    stars: { type: Number, default: 0 },
    forks: { type: Number, default: 0 },
    openIssuesCount: { type: Number, default: 0 },

    // Cheap heuristic for "beginner-friendly" — we count issues tagged
    // good-first-issue in a separate lightweight call during sync, rather
    // than guessing from repo size/age which is far less reliable
    goodFirstIssueCount: { type: Number, default: 0 },

    license: { type: String, default: null },

    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    subcategorySlug: { type: String, default: null },

    // Where the AI summary (from your NVIDIA AI integration, later) will
    // live once that's built — present now so this schema doesn't need
    // another migration when that feature arrives
    aiSummary: { type: String, default: null },

    lastSyncedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Powers the Explore page's filter/sort options efficiently — without
// these, filtering by category+language or sorting by stars on a large
// collection means scanning every document instead of using an index.
repoSchema.index({ category: 1, language: 1 });
repoSchema.index({ stars: -1 });

const Repo = mongoose.model("Repo", repoSchema);
export default Repo;