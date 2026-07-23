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
      lowercase: true, // normalizes so "A@x.com" and "a@x.com" are the same account
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false, // never returned in queries unless explicitly requested
    },
  },
  { timestamps: true } // adds createdAt / updatedAt automatically
);

// Runs automatically before every .save() — hashes the password only if
// it's new or has just been changed. Checking isModified prevents re-hashing
// an already-hashed password every time the user updates their name/email.
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Instance method — lets us call user.matchPassword("typed123") in the
// controller instead of importing bcrypt logic everywhere it's needed.
userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;