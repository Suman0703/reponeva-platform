import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      // Only required for accounts created via email/OTP or a future
      // password-based flow. Google/GitHub users never set one — this
      // function form lets the requirement depend on the document itself.
      required: function () {
        return !this.googleId && !this.githubId;
      },
      minlength: 6,
      select: false,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true, // allows many users with NO googleId, while still
                     // enforcing uniqueness for users who DO have one —
                     // a plain unique index would treat multiple `null`
                     // values as duplicates and break every OTP-only user
    },
    githubId: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  // Guard added: skip entirely if there's no password to hash at all
  // (a Google/GitHub-only user), not just "unchanged."
  if (!this.password || !this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  // Guard added: an OAuth-only user has no password hash to compare
  // against — calling bcrypt.compare on undefined would throw, not
  // just return false, so this needs an explicit check.
  if (!this.password) return false;
  return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;