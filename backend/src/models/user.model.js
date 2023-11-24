const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    default: "user", // Assign 'user' as default role
  },
});

UserSchema.pre("save", async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) return next();

  // Hash the password with a cost factor of 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
