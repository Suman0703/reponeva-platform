import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    githubId: { type: Number, required: true },

    // Denormalized snapshot — not a live reference — so a bookmark renders
    // correctly even for a repo that came from a live AI Search result
    // and hasn't necessarily finished being cached into Repo yet.
    fullName: { type: String, required: true },
    description: { type: String, default: "" },
    url: { type: String, required: true },
    language: { type: String, default: null },
    topics: [{ type: String }],
    stars: { type: Number, default: 0 },
    forks: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// One user can't bookmark the same repo twice — enforced at the DB level,
// not just checked in the controller, so it holds even under a race
// (e.g. a rapid double-click firing two requests almost simultaneously).
bookmarkSchema.index({ user: 1, githubId: 1 }, { unique: true });

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);
export default Bookmark;